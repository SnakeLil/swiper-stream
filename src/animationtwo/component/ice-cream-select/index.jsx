import React, { useState } from "react";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";
import CarouselNative from "../swiper-carousel";

const iceBallImg = require("@/animationtwo/assets/image/anitwo/caomei.png");

const IceCreamSelect = () => {
  const [startAnim, setStartAnim] = useState(false);
  const [showOnlyActive, setShowOnlyActive] = useState(true);
  const [swiperStartAnim, setSwiperStartAnim] = useState(false);
  const [data, setData] = useState({
    name: "脆皮条冰淇淋2个装+纸杯2个装",
    desc: "k满淋口点京幕，自前香奶，比利时巧克为...",
    price: 226,
    underlineprice: 398,
    CarouselTop: [
      {
        name: "草莓",
        id: "1",
        img: require("@/animationtwo/assets/image/anitwo/caomei.png"),
      },
      {
        name: "罗姆酒",
        id: "2",
        img: require("@/animationtwo/assets/image/anitwo/langmujiu.png"),
      },
      {
        name: "抹茶",
        id: "3",
        img: require("@/animationtwo/assets/image/anitwo/mocha.png"),
      },
      {
        name: "巧克力冰",
        id: "4",
        img: require("@/animationtwo/assets/image/anitwo/qiaokelibinggan.png"),
      },
      {
        name: "巧克力双层",
        id: "5",
        img: require("@/animationtwo/assets/image/anitwo/qiaokelishuangpin.png"),
      },
      {
        name: "香草",
        id: "6",
        img: require("@/animationtwo/assets/image/anitwo/xiangcao.png"),
      },
      {
        name: "夏威夷果",
        id: "7",
        img: require("@/animationtwo/assets/image/anitwo/xiaweiyiguo.png"),
      },
    ],
    CarouselBottom: [
      {
        name: "草莓",
        id: "1",
        img: require("@/animationtwo/assets/image/anitwo/caomei.png"),
      },
      {
        name: "罗姆酒",
        id: "2",
        img: require("@/animationtwo/assets/image/anitwo/langmujiu.png"),
      },
      {
        name: "抹茶",
        id: "3",
        img: require("@/animationtwo/assets/image/anitwo/mocha.png"),
      },
      {
        name: "巧克力冰",
        id: "4",
        img: require("@/animationtwo/assets/image/anitwo/qiaokelibinggan.png"),
      },
      {
        name: "巧克力双层",
        id: "5",
        img: require("@/animationtwo/assets/image/anitwo/qiaokelishuangpin.png"),
      },
      {
        name: "香草",
        id: "6",
        img: require("@/animationtwo/assets/image/anitwo/caomei.png"),
      },
      {
        name: "夏威夷果",
        id: "7",
        img: require("@/animationtwo/assets/image/anitwo/xiaweiyiguo.png"),
      },
    ],
  });
  const [currentBalls, setCurrentBalls] = useState([
    {
      name: "草莓",
      id: "1",
      img: require("@/animationtwo/assets/image/anitwo/caomei.png"),
      showImg: require("@/animationtwo/assets/image/anitwo/show-caomei.png"),
    },
    {
      name: "罗姆酒",
      id: "2",
      img: require("@/animationtwo/assets/image/anitwo/langmujiu.png"),
      showImg: require("@/animationtwo/assets/image/anitwo/caomei.png"),
    },
  ]);
  const topBallIndex = data.CarouselTop.findIndex(
    (item) => item.id === currentBalls[0].id
  );
  const bottomBallIndex = data.CarouselBottom.findIndex(
    (item) => item.id === currentBalls[1].id
  );
  const handleChange = (item) => {
    setStartAnim(true);
    setTimeout(() => {
      setShowOnlyActive(false);
      setSwiperStartAnim(true);
    }, 800);
    console.log(item, "item");
  };

  return (
    <View className='ice-cream-select-container'>
      <View className={`ball-swiper-container `}>
        {/* 轮播图样式 */}
        <View className='ball-swiper'>
          <View className={`${startAnim ? "opacity-1" : "opacity-0"} transition-easeOutQuad`}>
            <CarouselNative
              startAnim={swiperStartAnim}
              showOnlyActive={showOnlyActive}
              defaultActiveIndex={topBallIndex}
              data={data.CarouselTop}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </View>
          {swiperStartAnim && <View className='ball-confirm'>确认修改</View>}
          <View className={`${swiperStartAnim ? "opacity-1" : "opacity-0"}`}>
            <CarouselNative
              startAnim={swiperStartAnim}
              showOnlyActive={false}
              defaultActiveIndex={bottomBallIndex}
              data={data.CarouselBottom}
              onChange={(value) => {
                console.log(value);
              }}
              reverse
            />
          </View>
        </View>
      </View>
      {/* 背景 */}
      <View className='background'>
        <Image
          className={`bg-image ${startAnim ? "translateY-anim" : ""} ${
            swiperStartAnim ? "disappear-anim" : ""
          }`}
          src='https://micvs-crm-test.oss-cn-shanghai.aliyuncs.com/hgds/testimage/leftselect.png'
          mode='aspectFill'
        />
      </View>
      <View className={`ball-select-container transition-easeOutQuad ${swiperStartAnim ? 'opacity-0' : ''}`}>
        {currentBalls.map((item) => {
          return (
            <View key={item.id} className='ball-select'>
              <Image className='ball-img' src={item.img} mode='aspectFit' />
              <View className='text-container'>
                <Text className='name'>{item.name}</Text>
                <Text onClick={() => handleChange(item)} className='change'>
                  更换
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <View className='ice-ball-container'>
        <Image
          className={`ice-ball  ${startAnim ? "translateY-anim" : ""} ${
            swiperStartAnim ? "hidden" : ""
          }`}
          src={currentBalls[1].img}
          mode='aspectFit'
        />
        <Image
          className={`ice-ball-double ${startAnim ? "opacity-0" : "opacity-1"}`}
          src={currentBalls[0].showImg}
          mode='aspectFit'
        />
      </View>
      {/* 冰淇淋展示区 */}
      <View
        className={`ice-cream-container ${startAnim ? "translateY-anim" : ""} ${
          swiperStartAnim ? "disappear-anim" : ""
        }`}
      >
        <Image
          className='ice-cream-image'
          src='https://micvs-crm-test.oss-cn-shanghai.aliyuncs.com/hgds/testimage/bottomicon.png'
          mode='aspectFit'
        />
      </View>

      {/* 底部选择区域 */}
      <View className={`bottom-section transition-easeOutQuad ${swiperStartAnim ? 'opacity-0' : ''}`}>
        <View className='product-info'>
          <Text className='product-title'>双球草莓奶冰淇淋</Text>
          <Text className='product-desc'>
            草莓口味 奶香 香草味 巧克力碎片口味
          </Text>
        </View>

        <View className='price-section'>
          <Text className='price'>¥28</Text>
        </View>
        <View className='action-button'>
          <Text className='button-text'>加入购物车</Text>
        </View>
      </View>
    </View>
  );
};

export default IceCreamSelect;
