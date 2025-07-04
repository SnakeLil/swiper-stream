import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState, useRef } from 'react'
// import AnimationComptwo from '@/component/animationtwo/index'
import AnimationComptwoTwo from '@/animationtwo/component/animationtwo/indextwo'
import './index.scss'

export default function animationtwoIndex () {
  useLoad(() => {
    console.log('Page loaded.')
    console.log(useRef, 'useRef')
  })

  const [animationtwo, setAnimationtwo] = useState({
    name: '脆皮条冰淇淋2个装+纸杯2个装',
    desc: 'k满淋口点京幕，自前香奶，比利时巧克为...',
    price: 226,
    underlineprice: 398,
    CarouselTop: [
      {name: '草莓', id: '1', img: require('@/animationtwo/assets/image/anitwo/caomei.png')},
      {name: '罗姆酒', id: '2', img: require('@/animationtwo/assets/image/anitwo/langmujiu.png')},
      {name: '抹茶', id: '3', img: require('@/animationtwo/assets/image/anitwo/mocha.png')},
      {name: '巧克力冰', id: '4', img: require('@/animationtwo/assets/image/anitwo/qiaokelibinggan.png')},
      {name: '巧克力双层', id: '5', img: require('@/animationtwo/assets/image/anitwo/qiaokelishuangpin.png')},
      {name: '香草', id: '6', img: require('@/animationtwo/assets/image/anitwo/xiangcao.png')},
      {name: '夏威夷果', id: '7', img: require('@/animationtwo/assets/image/anitwo/xiaweiyiguo.png')},
      // {name: '夏威夷果', id: '8', img: require('@/assets/image/anitwo/xiaweiyiguo.png')},
      // {name: '夏威夷果', id: '9', img: require('@/assets/image/anitwo/xiaweiyiguo.png')},
      // {name: '夏威夷果', id: '10', img: require('@/assets/image/anitwo/xiaweiyiguo.png')},
      // {name: '夏威夷果', id: '11', img: require('@/assets/image/anitwo/xiaweiyiguo.png')},
      // {name: '夏威夷果', id: '12', img: require('@/assets/image/anitwo/xiaweiyiguo.png')},
    ],
    CarouselBottom: [
      {name: '草莓', id: '1', img: require('@/animationtwo/assets/image/anitwo/caomei.png')},
      {name: '罗姆酒', id: '2', img: require('@/animationtwo/assets/image/anitwo/caomei.png')},
      {name: '抹茶', id: '3', img: require('@/animationtwo/assets/image/anitwo/caomei.png')},
      {name: '巧克力冰', id: '4', img: require('@/animationtwo/assets/image/anitwo/caomei.png')},
      {name: '巧克力双层', id: '5', img: require('@/animationtwo/assets/image/anitwo/caomei.png')},
      {name: '香草', id: '6', img: require('@/animationtwo/assets/image/anitwo/caomei.png')},
      {name: '夏威夷果', id: '7', img: require('@/animationtwo/assets/image/anitwo/caomei.png')},
    ],
  })

  return (
    <View className='index'>
      {/* <View className='index_top'></View> */}
      <AnimationComptwoTwo
        value={animationtwo}
      />
    </View>
  )
}
