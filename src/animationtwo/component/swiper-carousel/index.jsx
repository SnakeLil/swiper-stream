import { View, Image } from "@tarojs/components";
import { useState, useRef, useCallback } from "react";
import "./index.scss";

const CarouselNative = ({ data, onChange, reverse = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const transitionRef = useRef(true);

  // 获取实际数据索引（处理负数和超出范围的情况）
  const getRealIndex = useCallback((index) => {
    const len = data.length;
    return ((index % len) + len) % len;
  }, [data.length]);

  // 获取当前实际显示的数据项
  const getCurrentItem = useCallback(() => {
    return data[getRealIndex(activeIndex)];
  }, [activeIndex, data, getRealIndex]);

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
    transitionRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;

    const maxMove = 150;
    const boundedDiff = Math.max(Math.min(diff, maxMove), -maxMove);

    setTranslateX(boundedDiff);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;

    const threshold = 50;
    transitionRef.current = true;

    if (Math.abs(translateX) > threshold) {
      const newIndex = translateX > 0 ? activeIndex - 1 : activeIndex + 1;
      setActiveIndex(newIndex);
      onChange?.(data[getRealIndex(newIndex)]);
    }

    setTranslateX(0);
    isDraggingRef.current = false;
  };

  // 计算元素样式 - 支持无限循环
  const getItemStyle = (dataIndex) => {
    const distance = dataIndex - activeIndex;
    const absDistance = Math.abs(distance);

    // 考虑循环的最短距离
    const len = data.length;
    let shortestDistance = distance;

    if (absDistance > len / 2) {
      if (distance > 0) {
        shortestDistance = distance - len;
      } else {
        shortestDistance = distance + len;
      }
    }

    const realDistance = Math.abs(shortestDistance);

    // 只渲染可见范围内的元素
    if (realDistance > 2) {
      return {
        transform: `translateX(${shortestDistance * 160}%) scale(0)`,
        opacity: 0,
        visibility: 'hidden'
      };
    }

    const baseScale = 0.7;
    const maxScale = 1;
    let scale = realDistance === 0 ? maxScale : Math.max(baseScale, 1 - (realDistance * 0.3));

    // 添加拖拽时的偏移
    let translateX = shortestDistance * 130;
    if (isDraggingRef.current) {
      translateX += (translateX / Math.abs(translateX || 1)) * (translateX / 130) * 0.1;
    }

    let translateY = realDistance === 0 ? 0 : (reverse ? 80 : -80);

    return {
      transform: `
        translateX(calc(${translateX}% + ${translateX * 0.1 * Math.sign(translateX)}px))
        translateY(${translateY}px)
        scale(${scale})
      `,
      transformOrigin: "center center",
      opacity: realDistance > 1 ? 0.3 : 1,
      transition: transitionRef.current ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
      zIndex: 10 - realDistance,
      visibility: realDistance > 2 ? 'hidden' : 'visible'
    };
  };

  // 生成渲染项目列表 - 包含足够的虚拟项目以支持无限滚动
  const getRenderItems = () => {
    const items = [];
    const renderRange = 4; // 前后各渲染4个项目

    for (let i = activeIndex - renderRange; i <= activeIndex + renderRange; i++) {
      const realIndex = getRealIndex(i);
      const item = data[realIndex];

      items.push({
        key: `${realIndex}-${i}`, // 使用组合键确保唯一性
        virtualIndex: i,
        realIndex: realIndex,
        item: item
      });
    }

    return items;
  };

  const handleItemClick = (virtualIndex) => {
    if (virtualIndex === activeIndex) return;

    // 选择最短路径到目标索引
    const distance = virtualIndex - activeIndex;
    const len = data.length;
    let targetIndex = virtualIndex;

    if (Math.abs(distance) > len / 2) {
      if (distance > 0) {
        targetIndex = activeIndex - (len - Math.abs(distance));
      } else {
        targetIndex = activeIndex + (len - Math.abs(distance));
      }
    }

    transitionRef.current = true;
    setActiveIndex(targetIndex);
    onChange?.(data[getRealIndex(targetIndex)]);
  };

  return (
    <View className='carousel-native'>
      <View className={`carousel-title ${reverse ? 'reverse' : ''}`}>
        {getCurrentItem()?.name}
      </View>
      <View
        className='carousel-container'
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {getRenderItems().map(({ key, virtualIndex, item }) => (
          <View
            key={key}
            className='carousel-item'
            style={{
              zIndex: activeIndex === virtualIndex ? 2 : 1,
            }}
            onClick={() => handleItemClick(virtualIndex)}
          >
            <Image
              className='carousel-image'
              src={item.img}
              style={getItemStyle(virtualIndex)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CarouselNative;