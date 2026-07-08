"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/video/video.js";
}
const _sfc_main = {
  globalData: {
    userInfo: null,
    isLogin: false
  },
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:8", "App Launch");
    try {
      common_vendor.wx$1.cloud.init({
        env: "cloud1-d8gb4wooh8c8ad171",
        traceUser: true
      });
      common_vendor.index.__f__("log", "at App.vue:15", "微信云开发初始化成功");
    } catch (e) {
      common_vendor.index.__f__("log", "at App.vue:17", "微信云开发初始化失败:", e);
    }
    const cached = common_vendor.index.getStorageSync("userInfo");
    if (cached) {
      this.globalData.userInfo = cached;
      this.globalData.isLogin = true;
      common_vendor.index.__f__("log", "at App.vue:24", "已恢复登录状态:", cached.nickName);
    }
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:28", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:31", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
