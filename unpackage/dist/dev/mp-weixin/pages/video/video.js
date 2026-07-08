"use strict";
const common_vendor = require("../../common/vendor.js");
const config_videoData = require("../../config/videoData.js");
const utils_cosService = require("../../utils/cosService.js");
const _sfc_main = {
  __name: "video",
  setup(__props) {
    const videoUrl = common_vendor.ref("");
    const videoTitle = common_vendor.ref("");
    const seriesTitle = common_vendor.ref("");
    const loading = common_vendor.ref(false);
    const episodes = common_vendor.ref([]);
    const currentEpisodeId = common_vendor.ref(null);
    const currentEpisodeIdx = common_vendor.ref(0);
    async function resolveAndPlay(rawUrl) {
      if (!rawUrl) {
        videoUrl.value = "";
        return;
      }
      if (rawUrl.startsWith("cloud://")) {
        const playUrl = await new Promise((resolve, reject) => {
          common_vendor.wx$1.cloud.getTempFileURL({
            fileList: [rawUrl],
            success: (res) => {
              var _a, _b, _c, _d;
              if (((_b = (_a = res.fileList) == null ? void 0 : _a[0]) == null ? void 0 : _b.status) === 0 && res.fileList[0].tempFileURL) {
                resolve(res.fileList[0].tempFileURL);
              } else {
                reject(new Error(((_d = (_c = res.fileList) == null ? void 0 : _c[0]) == null ? void 0 : _d.errMsg) || "解析失败"));
              }
            },
            fail: reject
          });
        });
        videoUrl.value = playUrl;
      } else if (utils_cosService.isCOSUrl(rawUrl)) {
        const signedUrl = await utils_cosService.getSignedVideoUrl(rawUrl);
        videoUrl.value = signedUrl;
      } else {
        videoUrl.value = rawUrl;
      }
    }
    function switchEpisode(ep, index) {
      if (ep.id === currentEpisodeId.value && videoUrl.value)
        return;
      currentEpisodeId.value = ep.id;
      currentEpisodeIdx.value = index;
      videoTitle.value = ep.title;
      loading.value = true;
      common_vendor.index.showLoading({ title: "加载中..." });
      resolveAndPlay(ep.videoUrl).catch((err) => {
        common_vendor.index.__f__("error", "at pages/video/video.vue:126", "视频加载失败:", err);
        common_vendor.index.showModal({
          title: "播放失败",
          content: (err == null ? void 0 : err.message) || "视频加载失败",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
        loading.value = false;
      });
    }
    common_vendor.onLoad(async (options) => {
      const { seriesId, episodeId, title } = options;
      const series = config_videoData.videoData.series.find((s) => s.id == seriesId);
      if (!series)
        return;
      seriesTitle.value = series.title;
      episodes.value = series.episodes || [];
      if (episodes.value.length === 0)
        return;
      const targetIdx = episodes.value.findIndex((e) => e.id == episodeId);
      const startIdx = targetIdx >= 0 ? targetIdx : 0;
      const startEp = episodes.value[startIdx];
      currentEpisodeId.value = startEp.id;
      currentEpisodeIdx.value = startIdx;
      videoTitle.value = decodeURIComponent(title || "") || startEp.title;
      loading.value = true;
      common_vendor.index.showLoading({ title: "加载中..." });
      resolveAndPlay(startEp.videoUrl).catch((err) => {
        common_vendor.index.__f__("error", "at pages/video/video.vue:162", "视频加载失败:", err);
        common_vendor.index.showModal({
          title: "播放失败",
          content: (err == null ? void 0 : err.message) || "视频加载失败",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
        loading.value = false;
      });
      setTimeout(() => {
        common_vendor.index.createVideoContext("myVideo");
      }, 200);
    });
    function onVideoError(e) {
      common_vendor.index.__f__("error", "at pages/video/video.vue:181", "视频播放错误:", e);
      common_vendor.index.showModal({
        title: "播放失败",
        content: "视频加载失败，请检查网络或视频地址是否有效",
        showCancel: false
      });
    }
    function onTimeUpdate(e) {
    }
    function onVideoEnded() {
      const nextIdx = currentEpisodeIdx.value + 1;
      if (nextIdx < episodes.value.length) {
        switchEpisode(episodes.value[nextIdx], nextIdx);
      }
    }
    function goBack() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: videoUrl.value
      }, videoUrl.value ? {
        b: videoUrl.value,
        c: videoTitle.value,
        d: common_vendor.o(onVideoError, "13"),
        e: common_vendor.o(onTimeUpdate, "ff"),
        f: common_vendor.o(onVideoEnded, "50")
      } : {}, {
        g: common_vendor.o(goBack, "6c"),
        h: common_vendor.t(seriesTitle.value),
        i: common_vendor.t(currentEpisodeIdx.value + 1),
        j: common_vendor.t(episodes.value.length),
        k: common_vendor.f(episodes.value, (ep, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(index + 1),
            b: common_vendor.t(ep.title),
            c: ep.id === currentEpisodeId.value
          }, ep.id === currentEpisodeId.value ? {} : {}, {
            d: ep.id,
            e: ep.id === currentEpisodeId.value ? 1 : "",
            f: common_vendor.o(($event) => switchEpisode(ep, index), ep.id)
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-06518e47"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/video/video.js.map
