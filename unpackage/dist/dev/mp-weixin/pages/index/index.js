"use strict";
const common_vendor = require("../../common/vendor.js");
const config_videoData = require("../../config/videoData.js");
const utils_cosService = require("../../utils/cosService.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const statusBarHeight = common_vendor.ref(44);
    const categories = common_vendor.ref(config_videoData.videoData.categories);
    const allSeries = common_vendor.ref(config_videoData.videoData.series);
    const currentCategory = common_vendor.ref("l0");
    const isLogin = common_vendor.ref(false);
    const userInfo = common_vendor.ref({});
    const resolvedCovers = common_vendor.ref({});
    const app = getApp();
    if (app.globalData && app.globalData.isLogin) {
      isLogin.value = true;
      userInfo.value = app.globalData.userInfo;
    }
    common_vendor.onReady(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      statusBarHeight.value = systemInfo.statusBarHeight || 44;
      resolveAllCovers();
    });
    function resolveAllCovers() {
      allSeries.value.forEach((s) => {
        if (!s.cover)
          return;
        const url = s.cover;
        if (resolvedCovers.value[url])
          return;
        if (!url.startsWith("cloud://") && !utils_cosService.isCOSUrl(url)) {
          resolvedCovers.value[url] = url;
          return;
        }
        if (url.startsWith("cloud://")) {
          common_vendor.wx$1.cloud.getTempFileURL({
            fileList: [url],
            success: (res) => {
              var _a, _b;
              if ((_b = (_a = res.fileList) == null ? void 0 : _a[0]) == null ? void 0 : _b.tempFileURL) {
                resolvedCovers.value[url] = res.fileList[0].tempFileURL;
              }
            },
            fail: () => {
            }
          });
          return;
        }
        if (utils_cosService.isCOSUrl(url)) {
          utils_cosService.getSignedVideoUrl(url).then((signed) => {
            resolvedCovers.value[url] = signed;
          }).catch(() => {
          });
        }
      });
    }
    function getCoverUrl(url) {
      if (!url)
        return "";
      return resolvedCovers.value[url] || url;
    }
    const filteredSeries = common_vendor.computed(() => {
      if (currentCategory.value === "setting")
        return [];
      return allSeries.value.filter((s) => s.categoryId === currentCategory.value);
    });
    function switchCategory(catId) {
      if (catId === "setting") {
        common_vendor.index.showToast({ title: "设置功能开发中", icon: "none" });
        return;
      }
      currentCategory.value = catId;
    }
    function openSeries(item) {
      if (!item.episodes || item.episodes.length === 0) {
        common_vendor.index.showToast({ title: "该系列视频资源整理中...", icon: "none" });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/video/video?seriesId=${item.id}&episodeId=${item.episodes[0].id}&title=${encodeURIComponent(item.title)}`
      });
    }
    function handleLogin() {
      common_vendor.index.getUserProfile({
        desc: "用于展示您的头像和昵称",
        success: (res) => {
          const info = res.userInfo;
          userInfo.value = info;
          isLogin.value = true;
          const app2 = getApp();
          app2.globalData.userInfo = info;
          app2.globalData.isLogin = true;
          common_vendor.index.setStorageSync("userInfo", info);
          common_vendor.index.showToast({ title: "登录成功", icon: "success" });
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/index/index.vue:174", "用户取消登录", err);
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLogin.value
      }, isLogin.value ? {
        b: userInfo.value.avatarUrl,
        c: common_vendor.t(userInfo.value.nickName)
      } : {
        d: common_vendor.o(handleLogin, "57")
      }, {
        e: statusBarHeight.value + "px",
        f: common_vendor.f(categories.value, (cat, k0, i0) => {
          return {
            a: common_vendor.t(cat.name),
            b: cat.id,
            c: currentCategory.value === cat.id ? 1 : "",
            d: common_vendor.o(($event) => switchCategory(cat.id), cat.id)
          };
        }),
        g: common_vendor.f(filteredSeries.value, (item, k0, i0) => {
          return {
            a: getCoverUrl(item.cover),
            b: common_vendor.t(item.episodeCount),
            c: common_vendor.t(item.title),
            d: item.id,
            e: common_vendor.o(($event) => openSeries(item), item.id)
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
