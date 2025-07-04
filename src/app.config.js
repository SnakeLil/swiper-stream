// import { defineAppConfig } from '@tarojs/taro'

// export default defineAppConfig({
//   pages: [
//     'pages/index/index'
//   ],
//   window: {
//     navigationStyle: 'custom', // 使用自定义导航栏
//     navigationBarTextStyle: 'black', // 设置导航栏文字颜色为黑色
//     navigationBarBackgroundColor: '#ffffff', // 设置导航栏背景色为白色
//     // backgroundColor: '#ffffff',
//     navigationBarTitleText: ''
//   }
// })
export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  window: {
    navigationStyle: 'custom', // 使用自定义导航栏
    navigationBarTextStyle: 'black', // 设置导航栏文字颜色为黑色
    navigationBarBackgroundColor: '#ffffff', // 设置导航栏背景色为白色
    // backgroundColor: '#ffffff',
    navigationBarTitleText: ''
  },
  subPackages: [
    {
      root: 'animationtwo',
      pages: [
        'pages/index/index'
      ]
    },
    {
      root: 'animationThree',
      pages: [
        'pages/index/index'
      ]
    }
  ]
})

