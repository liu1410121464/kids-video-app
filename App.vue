<script>
export default {
  globalData: {
    userInfo: null,
    isLogin: false
  },
  onLaunch: function () {
    console.log('App Launch')
    // 微信云开发初始化（用于解析 cloud:// 地址）
    try {
      wx.cloud.init({
        env: 'cloud1-d8gb4wooh8c8ad171',
        traceUser: true,
      })
      console.log('微信云开发初始化成功')
    } catch (e) {
      console.log('微信云开发初始化失败:', e)
    }
    // 尝试从本地缓存恢复登录状态
    const cached = uni.getStorageSync('userInfo')
    if (cached) {
      this.globalData.userInfo = cached
      this.globalData.isLogin = true
      console.log('已恢复登录状态:', cached.nickName)
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
page {
  background-color: #a8d5ba;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
