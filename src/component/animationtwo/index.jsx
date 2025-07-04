// import React from 'react';
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useMemo } from 'react'
import './index.scss'

export default function Animaticomponone ({value}) {
  const [newvalue, setNewvalue] = useState(value)
  const {CarouselTop, CarouselBottom} = newvalue // eslint-disable-line no-unused-vars
  
  // 计算默认选中索引：CarouselTop长度的一半向上取整
  const defaultTopIndex = useMemo(() => {
    if (CarouselTop && CarouselTop.length > 0) {
      return Math.ceil(CarouselTop.length / 2) - 1; // -1是因为索引从0开始
    }
    return 0;
  }, [CarouselTop]);

  const [selectIndex, setSelectIndex] = useState({
    top: defaultTopIndex,
    bottom: 3,
  })

  // 处理项目点击事件
  const handleItemClick = (index) => {
    setSelectIndex(prev => ({
      ...prev,
      top: index
    }));
  };

  // 动态计算margin-left，使选中项始终在屏幕中间
  const topMarginLeft = () => {
    console.log(CarouselTop.length, 'selectIndex.top')
    // 项目尺寸配置
    const itemWidth = 230;        // 单个项目宽度
    const titwidth2 = itemWidth * 0.35
    const itemMarginRight = 100;  // 项目右边距
    const itemTotalWidth = itemWidth + itemMarginRight; // 330px
    // 向上取整
    let leng = Math.ceil(CarouselTop.length / 2)
    leng = leng - 2
    let offsetBeforeSelectedItem = leng * itemTotalWidth + titwidth2;
    console.log(offsetBeforeSelectedItem, 'offsetBeforeSelectedItem_offsetBeforeSelectedItem')
    
    // 使用CSS calc()进行计算，确保单位一致性
    return -offsetBeforeSelectedItem
  }
  const setWidths = () => {
    let wid = CarouselTop.length * 230 + (CarouselTop.length - 1) * 100
    return wid
  }
  const setLefts = (index) => {
    let left = (230 + 100) * index
    return left
  }
    // 上一张
  const changprev = () => {
    setSelectIndex({
      ...selectIndex,
      top: selectIndex.top - 1
    })
  }
  // 下一张
  const changnext = () => {
    // 取CarouselTop中的第一个元素放在最后的位置
    let newCarouselTop = [...CarouselTop]
    newCarouselTop.push(newCarouselTop[0])
    newCarouselTop.shift()
    setNewvalue({...newvalue, CarouselTop: newCarouselTop})
    // selectIndex.top 加1
    // setSelectIndex({
    //   ...selectIndex,
    //   top: selectIndex.top + 1
    // })
  }

  return (
    <View className='animationtwo_container'>
      {/* 轮播图样式 */}
      <View className='animationtwo_swiper'>
        <View className='backgroundone'></View>
        <View className='backgroundtwo'></View>
        <View className='animationtwo_swiper_content'>
          <View className='animationtwo_top'>
            <View style={{width: Taro.pxTransform(setWidths()), marginLeft: Taro.pxTransform(topMarginLeft())}} className={`animationtwo_all_top ${CarouselTop.length % 2 === 0 ? 'animationtwo_all_top_even' : 'animationtwo_all_top_odd'}`}>
              {
              CarouselTop && CarouselTop.map((item, index) => (
                <View 
                  style={{left: Taro.pxTransform(setLefts(index))}}
                  className={`animationtwo_all_item ${selectIndex.top === index ? 'animationtwo_all_item_active' : ''} ${(selectIndex.top === index + 1 || selectIndex.top === index - 1) ? 'animationtwo_all_item_scales' : ''}`} 
                  key={index}
                  onClick={() => handleItemClick(index)}
                >
                  <Image className='animationtwo_all_item_img' src={item.img} />
                </View>
              ))
              }
            </View>
          </View>

          {/* 下方轮播图 */}
          <View className='animationtwo_bottom'>
            <View onClick={() => changprev()}>上一张</View>
            <View onClick={() => changnext()}>下一张</View>
          </View>
        </View>
      </View>
    </View>
  );
}
