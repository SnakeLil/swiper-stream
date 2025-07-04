// import React from 'react';
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
import { useState, useRef, useEffect } from "react";
import "./index.scss";

export default function Carousel({ data, onChange }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayActiveIndex, setDisplayActiveIndex] = useState(0); // 用于显示的activeIndex
  const swiperRef = useRef(null);
  const [transitionProgress, setTransitionProgress] = useState(0); // 过渡进度
  const [isTransitioning, setIsTransitioning] = useState(false); // 是否正在过渡中
  const [isClickTransition, setIsClickTransition] = useState(false); // 是否是点击触发的过渡

  const easeOutBack = (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };

  const isNearIndex = (index) => {
    if (displayActiveIndex === 0) {
      return index === 1 || index === data.length - 1;
    } else if (displayActiveIndex === data.length - 1) {
      return index === 0 || index === data.length - 2;
    } else {
      return Math.abs(index - displayActiveIndex) <= 1;
    }
  };
  const isNearSecond = (index) => {
    if (activeIndex === 0) {
      return index === 2 || index === data.length - 2;
    } else if (activeIndex === data.length - 1) {
      return index === 1 || index === data.length - 3;
    }
    return Math.abs(index - activeIndex) <= 2;
  }

  // 点击某个item时的处理函数
  const handleItemClick = (clickedIndex) => {
    setActiveIndex(clickedIndex);
  };
  // 计算每个item的样式
  const getItemStyle = (index) => {
    const isActive = displayActiveIndex === index; // 使用displayActiveIndex
    const isNear = isNearIndex(index);
    const distance = Math.min(
      Math.abs(index - displayActiveIndex),
      data.length - Math.abs(index - displayActiveIndex)
    );
    if (distance > 2) {
      return {
        transform: `translateY(${-transitionProgress * 66}px) scale(0.5)`,
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        // opacity: 0, // 可选：降低非相邻元素透明度
        zIndex: 1,   // 确保在底层
      };
    }
    const isNearSec = isNearSecond(index);
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
      // opacity: isNearSec ? 0 : 1,
    };
  };

  return (
    <View className='swipers'>
      <View className='Swiper_bottom_img_content'>
        {data[displayActiveIndex].name}
      </View>
      <Swiper
        ref={swiperRef}
        current={activeIndex}
        cacheExtent={1}
        className='test-h'
        indicatorColor='#999'
        indicatorDots={false}
        previousMargin='100px'
        nextMargin='100px'
        indicatorActiveColor='#333'
        circular
        duration={500}
        acceleration={false}
        easingFunction='easeOutCubic'
        interval={2000}
        effectsProps={{
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
        }}
        onTransition={(e) => {
          const { dx, dy } = e.detail;
          const moveX = Math.abs(dx);
          const MaxMoveX = 190; // 每个item的宽度差
          // 如果是点击触发的过渡，不处理拖拽事件
          if (isClickTransition) return;

          // 计算过渡进度 (0-1)
          const progress = Math.min(moveX / MaxMoveX, 1);
          setTransitionProgress(progress);
          setIsTransitioning(true);
          console.log("onTransition:", { dx, dy, progress });
        }}
        onChange={(e) => {
          // 如果是点击触发的过渡，不处理onChange
          if (isClickTransition) return;
          // 不立即更新displayActiveIndex，只更新内部的activeIndex
          setActiveIndex(e.detail.current);
          onChange && onChange(data[e.detail.current] || null)
        }}
        onAnimationFinish={(e) => {
          console.log("动画完成:", e.detail.current);
          // 如果是点击触发的过渡，不处理onAnimationFinish
          if (isClickTransition) return;
          // 动画完成后更新displayActiveIndex
          setDisplayActiveIndex(e.detail.current);
          setActiveIndex(e.detail.current);
          setTransitionProgress(0);
          setIsTransitioning(false);
        }}
      >
        {data &&
          data.map((item, index) => {
            const itemStyle = getItemStyle(index);
            return (
              <SwiperItem key={index} className='Swiper_new_item'>
                <Image
                  style={itemStyle}
                  src={item.img}
                  className='Swiper_img'
                  onClick={() => handleItemClick(index)}
                ></Image>
              </SwiperItem>
            );
          })}
      </Swiper>
    </View>
  );
}
