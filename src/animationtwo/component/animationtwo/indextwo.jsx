// import React from 'react';
import { View } from "@tarojs/components";
import "./indextwo.scss";
import CarouselNative from "../swiper-carousel";

export default function Animaticomponone({ value }) {
  const { CarouselTop, CarouselBottom } = value; // eslint-disable-line no-unused-vars


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
