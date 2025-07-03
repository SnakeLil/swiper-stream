// import React from 'react';
import { View } from "@tarojs/components";
import "./indextwo.scss";
import CarouselNative from "../swiper-carousel";

export default function Animaticomponone({ value }) {
  const { CarouselTop, CarouselBottom } = value; // eslint-disable-line no-unused-vars

  const isNearIndex = (index) => {
    if (displayActiveIndex === 0) {
      return index === 1 || index === CarouselTop.length - 1;
    } else if (displayActiveIndex === CarouselTop.length - 1) {
      return index === 0 || index === CarouselTop.length - 2;
    } else {
      return Math.abs(index - displayActiveIndex) <= 1;
    }
  };

  // 点击某个item时的处理函数
  const handleItemClick = (clickedIndex) => {
    setActiveIndex(clickedIndex);
  };

  // 计算每个item的样式
  const getItemStyle = (index) => {
    const isActive = displayActiveIndex === index; // 使用displayActiveIndex
    const isNear = isNearIndex(index);

    // 基础样式
    let scale = 0.6;
    let translateY = 0;

    if (isTransitioning) {
      if (isClickTransition) {
        // 点击触发的过渡动画
        if (isActive) {
          scale = 1 - transitionProgress * 0.4;
          translateY = 110 - transitionProgress * 110;
        } else if (isNear) {
          // 被点击的元素（即将激活）：从小放大，向下移动
          scale = 0.6 + transitionProgress * 0.4;
          translateY = transitionProgress * 110;
        } else {
          // 其他元素保持小尺寸
          scale = 0.6;
          translateY = 0;
        }
      } else {
        // 拖拽触发的过渡动画（原逻辑）
        if (isActive) {
          // 当前激活元素：从大缩小，向上移动
          scale = 1 - transitionProgress * 0.4;
          translateY = 110 - transitionProgress * 110;
        } else if (isNear) {
          // 即将激活的相邻元素：从小放大，向下移动
          scale = 0.6 + transitionProgress * 0.4;
          translateY = transitionProgress * 110;
        } else {
          // 其他元素保持小尺寸
          scale = 0.6;
          translateY = 0;
        }
      }
    } else {
      // 非过渡状态，使用静态样式
      if (isActive) {
        scale = 1;
        translateY = 110;
      } else {
        scale = 0.6;
        translateY = 0;
      }
    }

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      transition: !isTransitioning
        ? "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
        : "none",
    };
  };

  return (
    <View className='animationtwo_container'>
      {/* 轮播图样式 */}
      <View className='animationtwo_swiper'>
        <View className='backgroundone'></View>
        <View className='backgroundtwo'></View>
        <CarouselNative data={CarouselTop} onChange={(value)=>{
          console.log(value)
        }}
        />
        <View className='animationtwo_bottom'>确认修改</View>
      </View>
    </View>
  );
}
