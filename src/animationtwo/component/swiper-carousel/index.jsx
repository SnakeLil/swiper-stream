import { View, Image } from "@tarojs/components";
import { useState, useRef, useCallback } from "react";
import "./index.scss";

const CarouselNative = ({
  data,
  onChange,
  reverse = false,
  activeIndex: externalActiveIndex,
  defaultActiveIndex = 0,
  showOnlyActive,
  startAnim,
  isReturn,
}) => {
  const [internalActiveIndex, setInternalActiveIndex] =
    useState(defaultActiveIndex);
  let startXRef = useRef(null)
  // 判断是否为受控组件
  const isControlled = externalActiveIndex !== undefined;
  const activeIndex = isControlled ? externalActiveIndex : internalActiveIndex;
  const [translateX, setTranslateX] = useState(0);

  // 获取实际数据索引（处理负数和超出范围的情况）
  const getRealIndex = useCallback(
    (index) => {
      const len = data.length;
      return ((index % len) + len) % len;
    },
    [data.length]
  );
  // 获取当前实际显示的数据项
  const getCurrentItem = useCallback(() => {
    return data[getRealIndex(activeIndex)];
  }, [activeIndex, data, getRealIndex]);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const transitionRef = useRef(true);

  // 生成渲染项目列表 - 包含足够的虚拟项目以支持无限滚动
  const getRenderItems = () => {
    const items = [];
    const renderRange = 4; // 前后各渲染4个项目

    for (
      let i = activeIndex - renderRange;
      i <= activeIndex + renderRange;
      i++
    ) {
      const realIndex = getRealIndex(i);
      const item = data[realIndex];

      items.push({
        key: `${realIndex}-${i}`,
        virtualIndex: i,
        realIndex: realIndex,
        item: item,
      });
    }

    return items;
  };

  const updateActiveIndex = useCallback(
    (newIndex) => {
      if (!isControlled) {
        setInternalActiveIndex(newIndex);
      }
      onChange?.(data[getRealIndex(newIndex)], newIndex);
    },
    [isControlled, onChange, data, getRealIndex]
  );

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
    transitionRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;

    // 最大拖拽距离，需要修改的话可以直接改这里
    const maxMove = 300;
    const boundedDiff = Math.max(Math.min(diff, maxMove), -maxMove);

    setTranslateX(boundedDiff);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;

    const threshold = 50;
    transitionRef.current = true;

    if (Math.abs(translateX) > threshold) {
      const newIndex = translateX > 0 ? activeIndex - 1 : activeIndex + 1;
      updateActiveIndex(newIndex);
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
        visibility: "hidden",
      };
    }

    const baseScale = 0.7;
    const maxScale = 1;

    let translateXPercent = shortestDistance * 130;

    // 拖拽时的实时偏移
    if (isDraggingRef.current && translateX !== 0) {
      // 这里使用一个固定的转换比例来保持一致性
      const dragPercentage = (translateX / 280) * 130; // 280是图片宽度
      translateXPercent += dragPercentage;
    }

    // 根据当前位置计算缩放
    const currentDistance = Math.abs(translateXPercent / 130);
    let scale = currentDistance === 0
      ? maxScale
      : Math.max(baseScale, 1 - currentDistance * 0.3);

    let translateY = 0;
    if (currentDistance > 0.5) {
      // 0.5到1之间
      const yProgress = Math.min((currentDistance - 0.5) / 0.5, 1);
      translateY = (reverse ? 80 : -80) * yProgress;
    }

    return {
      transform: `
        translateX(calc(${translateXPercent}% + ${
        translateXPercent * 0.1 * Math.sign(translateXPercent)
      }px))
        translateY(${translateY}px)
        scale(${scale})
      `,
      transformOrigin: "center center",
      opacity: currentDistance > 1 ? 0.3 : 1,
      transition: transitionRef.current
        ? "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
        : "none",
      zIndex: 10 - realDistance,
      visibility: realDistance > 2 ? "hidden" : "visible",
    };
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
    updateActiveIndex(targetIndex);
  };

  return (
    <View className={`carousel-native ${reverse ? 'carousel-native-reverse' : ''}`}>
      <View className={`carousel-title transition-easeOutQuad ${reverse ? "reverse" : ""} ${startAnim ? 'opacity-1' : 'opacity-0'} `}>
        {getCurrentItem()?.name}
      </View>
      <View
        className={`carousel-container ${reverse ? (isReturn ? 'carousel-container-reverse-return' : 'carousel-container-reverse') : ''} ${startAnim ? 'anim' : ''} `}
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {getRenderItems().map(({ key, virtualIndex, item }) => (
          <View
            key={key}
            className={`carousel-item ${activeIndex !== virtualIndex && showOnlyActive ? 'opacity-0' : 'opacity-1'}`}
            style={{
              zIndex: activeIndex === virtualIndex ? 4 : 1,
              filter: activeIndex === virtualIndex ? '' : 'blur(1px)',
              opacity: isReturn && activeIndex !== virtualIndex ? '0 !important' : '',
            }}
            onClick={() => handleItemClick(virtualIndex)}
          >
            <Image
              className="carousel-image"
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
