import { createSSRApp } from 'vue'
import App from './App.vue'

if (typeof wx !== 'undefined' && wx.cloud) {
  wx.cloud.init({
    env: 'cloud1-d8gb4wooh8c8ad171',
    traceUser: true,
  })
}

export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
