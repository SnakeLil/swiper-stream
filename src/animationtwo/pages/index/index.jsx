import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState, useRef } from 'react'
// import AnimationComptwo from '@/component/animationtwo/index'
import AnimationComptwoTwo from '@/animationtwo/component/animationtwo/indextwo'
import './index.scss'
import IceCreamSelect from '../../component/ice-cream-select'

export default function animationtwoIndex () {
  const [showSwiper,setShowSwiper] = useState(false)


  return (
    <View className='index'>
      {/* <View className='index_top'></View> */}
      <IceCreamSelect />
    </View>
  )
}
