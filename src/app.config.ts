export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/dashboard/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: {
    'mp-tabs': '@miniprogram-component-plus/tabs'
  }
})
