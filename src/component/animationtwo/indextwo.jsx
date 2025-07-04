// import React from 'react';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { useState, useRef } from 'react'
import './indextwo.scss'

export default function Animaticomponone ({value}) {
  const {CarouselTop, CarouselBottom} = value // eslint-disable-line no-unused-vars
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTwoIndex, setActiveTwoIndex] = useState(0)
  const transitionTimer = useRef(null)
  
  // 节流处理滑动事件
  const handleTransition = (e) => {
    if (transitionTimer.current) {
      clearTimeout(transitionTimer.current)
    }
    
    transitionTimer.current = setTimeout(() => {
      console.log('滑动中的位置信息:', e.detail)
      // 在这里处理滑动中的逻辑
      // 例如：更新某些UI状态、计算滑动进度等
    }, 16) // 约60fps的更新频率
  }

  return (
    <View className='animationtwo_container'>
      {/* 轮播图样式 */}
      <View className='animationtwo_swiper'>
        <View className='backgroundone'></View>
        <View className='backgroundtwo'></View>
        <View className='swipers'>
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorDots={false}
            previousMargin='100px'
            nextMargin='100px'
            indicatorActiveColor='#333'
            circular
            duration={1000}
            interval={2000}
            onChange={(e) => setActiveIndex(e.detail.current)}
            onAnimationFinish={(e) => {
              // 动画完成时执行（比onChange更早）
              console.log('动画完成:', e.detail.current);
              setActiveIndex(e.detail.current);
            }}
          >
              {CarouselTop && CarouselTop.map((item, index) => (
                <SwiperItem key={index}>
                  <Image src={item.img}  className={`Swiper_img ${activeIndex === index ? 'active' : ''}`}></Image>
                </SwiperItem>
              ))}
          </Swiper>
        </View>
        <View className='animationtwo_bottom'>
          确认1-1
        </View>
        {/* <View className='swipers'>
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorDots={false}
            previousMargin='100px'
            nextMargin='100px'
            indicatorActiveColor='#333'
            circular
            duration={1000}
            interval={2000}
            onChange={(e) => setActiveTwoIndex(e.detail.current)}
            onAnimationFinish={(e) => {
              // 动画完成时执行（比onChange更早）
              console.log('动画完成:', e.detail.current);
              setActiveTwoIndex(e.detail.current);
            }}
          >
              {CarouselTop && CarouselTop.map((item, index) => (
                <SwiperItem key={index}>
                  <Image src={item.img}  className={`Swiper_bottom_img ${activeTwoIndex === index ? 'active' : ''}`}></Image>
                </SwiperItem>
              ))}
          </Swiper>
        </View> */}
      </View>
    </View>
  );
}
