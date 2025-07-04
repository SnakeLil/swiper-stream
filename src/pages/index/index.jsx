import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState, useRef } from 'react'
import Animationone from '@/component/animationone/index'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
    console.log(useRef, 'useRef')
  })

  const [animationone, setAnimationone] = useState({
    name: '脆皮条冰淇淋2个装+纸杯2个装',
    desc: 'k满淋口点京幕，自前香奶，比利时巧克为...',
    price: 226,
    underlineprice: 398,
    isselect: false,
    leftSelectImageArry: [{
      name: '坚果味',
      titImg: require('@/assets/image/anione/leftonetit.png'),
      bigImg: require('@/assets/image/anione/leftone.png'),
      isshow: true, // 只展示一个的时候为true
      showClass: 'showoneClass',
      noshowClass: 'showoneNoClass',
      isShoTwo: false, // 单个数据这个为true，并且设置对应的样式
      isShowClassOne: 'ShowClassTwo',
      isShowClassNoOne: 'ShowClassNoTwo',
      isopaction: false, // 是否第一个切换，为渐变的切换效果
      sort: 1,
      id: 1
    },
    {
      name: '巧克力味',
      titImg: require('@/assets/image/anione/lefttwotit.png'),
      bigImg: require('@/assets/image/anione/lefttwo.png'),
      isshow: true,
      showClass: 'showtwoClass',
      noshowClass: 'showtwoNoClass',
      isShoTwo: false, // 单个数据这个为true，并且设置对应的样式
      isShowClassOne: 'ShowClassTwo',
      isShowClassNoOne: 'ShowClassNoTwo',
      isopaction: false,
      sort: 0,
      id: 2,
    }],
    RightSelectImageArry: [{
      name: '巧克力味',
      titImg: require('@/assets/image/anione/rightone.png'),
      bigImg: require('@/assets/image/anione/rightone.png'),
      isshow: true,
      showClass: 'showoneClass',
      noshowClass: 'showoneNoClass',
      isShoTwo: false, // 单个数据这个为true，并且设置对应的样式
      isShowClassOne: 'ShowClassTwo',
      isShowClassNoOne: 'ShowClassNoTwo',
      isopaction: false,
      sort: 1,
      id: 3
    },
    {
      name: '香草味',
      titImg: require('@/assets/image/anione/righttwo.png'),
      bigImg: require('@/assets/image/anione/righttwo.png'),
      isshow: true,
      showClass: 'showtwoClass',
      noshowClass: 'showtwoNoClass',
      isShoTwo: false, // 单个数据这个为true，并且设置对应的样式
      isShowClassOne: 'ShowClassTwo',
      isShowClassNoOne: 'ShowClassNoTwo',
      isopaction: false,
      sort: 0,
      id: 4
    }],
    TcIndex: 0,
    TcArry: [
      {
        tit: '脆皮冰淇淋',
        selectval: 2,
        maxselect: 2,
        selectID: [1,2],
        oldselectID: [1,2],
        selectvalarry: [
          {
            name: '坚果味',
            titImg: require('@/assets/image/anione/leftonetit.png'),
            bigImg: require('@/assets/image/anione/leftone.png'),
            isshow: true, // 两个数据用这个
            showClass: 'showoneClass',
            noshowClass: 'showoneNoClass',
            isShoTwo: false, // 单个数据这个为true，并且设置对应的样式
            isShowClassOne: 'ShowClassTwo',
            isShowClassNoOne: 'ShowClassNoTwo',
            isopaction: false, // 是否第一个切换，为渐变的切换效果
            count: 0,
            id: 1
          },
          {
            name: '巧克力味',
            titImg: require('@/assets/image/anione/lefttwotit.png'),
            bigImg: require('@/assets/image/anione/lefttwo.png'),
            isshow: true,
            showClass: 'showtwoClass',
            noshowClass: 'showtwoNoClass',
            isShoTwo: false, // 单个数据这个为true，并且设置对应的样式
            isShowClassOne: 'ShowClassTwo',
            isShowClassNoOne: 'ShowClassNoTwo',
            isopaction: false,
            count: 0,
            id: 2
          },
          {
            name: '测试口味',
            titImg: require('@/assets/image/anione/leftthreetit.png'),
            bigImg: require('@/assets/image/anione/leftthree.png'),
            isshow: true,
            showClass: 'showtwoClass',
            noshowClass: 'showtwoNoClass',
            isShoTwo: false, // 单个数据这个为true，并且设置对应的样式
            isShowClassOne: 'ShowClassTwo',
            isShowClassNoOne: 'ShowClassNoTwo',
            isopaction: false,
            count: 0,
            id: 10
          }
        ]
      },
      {
        tit: '原装小纸杯',
        selectval: 2,
        maxselect: 2,
        selectID: [3,4],
        oldselectID: [3,4],
        selectvalarry: [
          {
            name: '巧克力味',
            titImg: require('@/assets/image/anione/rightone.png'),
            bigImg: require('@/assets/image/anione/rightone.png'),
            isshow: true,
            showClass: 'showoneClass',
            noshowClass: 'showoneNoClass',
            isShoTwo: false, // 单个数据这个为true，并且设置对应的样式
            isShowClassOne: 'ShowClassTwo',
            isShowClassNoOne: 'ShowClassNoTwo',
            isopaction: false,
            count: 0,
            id: 3
          },
          {
            name: '香草味',
            titImg: require('@/assets/image/anione/righttwo.png'),
            bigImg: require('@/assets/image/anione/righttwo.png'),
            isshow: true,
            showClass: 'showtwoClass',
            noshowClass: 'showtwoNoClass',
            isShoTwo: false, // 单个数据这个为true，并且设置对应的样式
            isShowClassOne: 'ShowClassTwo',
            isShowClassNoOne: 'ShowClassNoTwo',
            isopaction: false,
            count: 0,
            id: 4
          }
        ]
      }
    ]
  })

  // 修改价格的函数
  const handlePriceChange = (newPrice) => {
    setAnimationone(prev => ({
      ...prev,
      price: newPrice
    }))
  }

  // 修改原价的函数
  const handleUnderlinePriceChange = (newUnderlinePrice) => {
    setAnimationone(prev => ({
      ...prev,
      underlineprice: newUnderlinePrice
    }))
  }

  return (
    <View className='index'>
      <Animationone
        value={animationone} 
        onPriceChange={handlePriceChange}
        onUnderlinePriceChange={handleUnderlinePriceChange}
      />
    </View>
  )
}
