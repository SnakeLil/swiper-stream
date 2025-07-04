import { View, Image } from "@tarojs/components";
import { useState, useRef } from "react";
import "./index.scss";

const CarouselNative = ({ data, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;

    const maxMove = 150; // 增加最大滑动距离限制
    const boundedDiff = Math.max(Math.min(diff, maxMove), -maxMove);

    setTranslateX(boundedDiff);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;

    const threshold = 50; // 降低阈值使滑动更灵敏

    if (Math.abs(translateX) > threshold) {
      const newIndex = translateX > 0
        ? Math.max(0, activeIndex - 1)
        : Math.min(data.length - 1, activeIndex + 1);

      setActiveIndex(newIndex);
      onChange?.(data[newIndex]);
    }

    setTranslateX(0);
    isDraggingRef.current = false;
  };

  const getItemStyle = (index) => {
    const distance = Math.abs(index - activeIndex);
    const baseScale = 0.7;
    const maxScale = 1;

    if (distance > 2) return {
      transform: `translateX(${(index - activeIndex) * 160}%) scale(0)`,
      opacity: 0
    };

    let scale = distance === 0 ? maxScale : Math.max(baseScale, 1 - (distance * 0.3));
    let translateX = (index - activeIndex) * 130;
    let translateY = distance === 0 ? 0 : -80;

    return {
      transform: `
        translateX(calc(${translateX}% + ${translateX * 0.1 * Math.sign(translateX)}px))
        translateY(${translateY}px)
        scale(${scale})
      `,
      transformOrigin: "center center",
      opacity: distance > 1 ? 0.3 : 1,
      transition: isDraggingRef.current ? 'none' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      zIndex: 10 - distance,
      visibility: distance > 2 ? 'hidden' : 'visible'
    };
  };

  return (
    <View className='carousel-native'>
      <View className='carousel-title'>
        {data[activeIndex]?.name}
      </View>
      <View
        className='carousel-container'
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {data.map((item, index) => (
          <View
            style={{
              zIndex: activeIndex === index ? 2 : 1,
            }}
            key={index}
            className='carousel-item'
            onClick={() => {
              if (index === activeIndex) return;
              setActiveIndex(index);
              onChange?.(data[index]);
            }}
          >
            <Image
              className='carousel-image'
              src={item.img}
              style={getItemStyle(index)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CarouselNative;
