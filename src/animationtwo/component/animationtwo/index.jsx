import { View, Image } from "@tarojs/components";
import { useState, useEffect, useRef } from "react";
import "./index.scss";

export default function Animaticomponone({ value }) {
  const [newvalue] = useState(value);
  const { CarouselTop } = newvalue;
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

  const itemCount = CarouselTop?.length || 0;
  const angleIncrement = 360 / itemCount;

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    const newAngle = currentAngle + (deltaX * 0.5);
    setCurrentAngle(newAngle);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Snap to nearest item
    const snapAngle = Math.round(currentAngle / angleIncrement) * angleIncrement;
    setCurrentAngle(snapAngle);
  };

  return (
    <View className='carousel-container'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
    >
      <View
        className='carousel-ring'
        style={{ transform: `rotateY(${currentAngle}deg)` }}
      >
        {CarouselTop &&
          CarouselTop.map((item, index) => (
            <View
              key={index}
              className='carousel-item'
              style={{
                transform: `rotateY(${index * angleIncrement}deg) translateZ(250px)`
              }}
            >
              <Image className='carousel-image' src={item.img} />
            </View>
          ))}
      </View>
    </View>
  );
}
