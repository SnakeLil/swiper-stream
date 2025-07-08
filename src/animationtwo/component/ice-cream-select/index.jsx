import { useState } from "react";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";
import CarouselNative from "../swiper-carousel";
import swiperBgImg from "@/animationtwo/assets/image/anitwo/swiper-bg.png";
import ArrowImg from "@/animationtwo/assets/image/anitwo/arrow-more.png";

const IceCreamSelect = () => {
  const [startAnim, setStartAnim] = useState(false);
  const [showOnlyActive, setShowOnlyActive] = useState(true);
  const [swiperStartAnim, setSwiperStartAnim] = useState(false);
  const [showBottomSwiper, setShowBottomSwiper] = useState(false);
  const [startReturn, setStartReturn] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState({
    name: "脆皮条冰淇淋2个装+纸杯2个装",
    desc: "k满淋口点京幕，自前香奶，比利时巧克为口点京幕，自前香奶，比利时巧克为口点京幕，自前香奶，比利时巧克为",
    price: 226,
    underlineprice: 398,
    CarouselTop: [
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
        showImg: require("@/animationtwo/assets/image/anitwo/langmujiu.png"),
      },
      {
        name: "抹茶",
        id: "3",
        img: require("@/animationtwo/assets/image/anitwo/mocha.png"),
        showImg: require("@/animationtwo/assets/image/anitwo/mocha.png"),
      },
      {
        name: "巧克力冰",
        id: "4",
        img: require("@/animationtwo/assets/image/anitwo/qiaokelibinggan.png"),
        showImg: require("@/animationtwo/assets/image/anitwo/qiaokelibinggan.png"),
      },
      {
        name: "巧克力双层",
        id: "5",
        img: require("@/animationtwo/assets/image/anitwo/qiaokelishuangpin.png"),
        showImg: require("@/animationtwo/assets/image/anitwo/qiaokelishuangpin.png"),
      },
      {
        name: "香草",
        id: "6",
        img: require("@/animationtwo/assets/image/anitwo/xiangcao.png"),
        showImg: require("@/animationtwo/assets/image/anitwo/xiangcao.png"),
      },
      {
        name: "夏威夷果",
        id: "7",
        img: require("@/animationtwo/assets/image/anitwo/xiaweiyiguo.png"),
        showImg: require("@/animationtwo/assets/image/anitwo/xiaweiyiguo.png"),
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
  const foldLength = 20;
  const needFold = data.desc.length > foldLength;
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
      setShowBottomSwiper(true);
    }, 800);
    console.log(item, "item");
  };
  const handleConfirmChange = () => {
    setSwiperStartAnim(false);
    setShowOnlyActive(true);
    setStartReturn(true);
    setTimeout(() => {
      setStartReturn(false);
    }, 1000);
    setTimeout(() => {
      setStartAnim(false);
      setShowBottomSwiper(false);
    }, 1000);
  };
  const handleShowMore = () => {
    setShowMore((pre) => !pre);
  };
  return (
    <>
      {/* 背景 */}
      <View className='background'>
        <Image
          className={`bg-image ${swiperStartAnim ? "opacity-0" : "opacity-1"}`}
          src='https://micvs-crm-test.oss-cn-shanghai.aliyuncs.com/hgds/testimage/homebackgrounds.png'
          mode='aspectFill'
        />
        <Image
          className={`bg-image ${swiperStartAnim ? "opacity-1" : "opacity-0"}`}
          src={swiperBgImg}
          mode='aspectFill'
        />
      </View>
      <View className='ice-cream-select-container'>
        <View
          className={`ball-swiper-container ${startAnim ? "" : "pointer-none"}`}
        >
          {/* 轮播图样式 */}
          <View className='ball-swiper'>
            <View
              className={`${
                startAnim ? "opacity-1" : "opacity-0"
              } transition-easeOutQuad`}
            >
              <CarouselNative
                startAnim={swiperStartAnim}
                // startReturn={startReturn}
                showOnlyActive={showOnlyActive}
                defaultActiveIndex={topBallIndex}
                data={data.CarouselTop}
                onChange={(value) => {
                  console.log(value, currentBalls);
                  setCurrentBalls((pre) => [value, pre[1]]);
                }}
              />
            </View>
            {swiperStartAnim && (
              <View onClick={handleConfirmChange} className='ball-confirm'>
                确认修改
              </View>
            )}
            <View className={`${showBottomSwiper ? "opacity-1" : "opacity-0"}`}>
              <CarouselNative
                startAnim={swiperStartAnim}
                showOnlyActive={false}
                isReturn={startReturn}
                defaultActiveIndex={bottomBallIndex}
                data={data.CarouselBottom}
                onChange={(value) => {
                  console.log(value);
                  setCurrentBalls((pre) => [pre[0], value]);
                }}
                reverse
              />
            </View>
          </View>
        </View>

        <View
          className={`ball-select-container transition-easeOutQuad ${
            swiperStartAnim ? "opacity-0 pointer-none" : ""
          }`}
        >
          {currentBalls.map((item, index) => {
            return (
              <View key={`${item.id}-${index}`} className='ball-select'>
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
            className={`ice-ball-double ${
              startAnim ? "opacity-0" : "opacity-1"
            }`}
            src={currentBalls[0].showImg}
            mode='aspectFit'
          />
          <Image
            className={`ice-ball  ${startAnim ? "translateY-anim" : ""} ${
              showBottomSwiper ? "hidden" : ""
            }  ${startReturn ? "translateY-0" : ""}`}
            src={currentBalls[1].img}
            mode='aspectFit'
          />
        </View>
        {/* 冰淇淋展示区 */}
        <View className={`ice-cream-container `}>
          <Image
            className={`ice-cream-image ${startAnim ? "translateY-anim" : ""} ${
              swiperStartAnim ? "disappear-anim" : ""
            }  ${startReturn ? "translateY-0" : ""}`}
            src='https://micvs-crm-test.oss-cn-shanghai.aliyuncs.com/hgds/testimage/bottomicon.png'
            mode='aspectFit'
          />
          <Image
            className={`ice-cream-base ${startAnim ? "translateY-anim" : ""} ${
              swiperStartAnim ? "disappear-anim" : ""
            }  ${startReturn ? "translateY-0" : ""}`}
            src='https://micvs-crm-test.oss-cn-shanghai.aliyuncs.com/hgds/testimage/homebottoms.png'
            mode='aspectFit'
          />
        </View>

        {/* 底部选择区域 */}
      </View>
      <View
        className={`bottom-section transition-easeOutQuad ${
          swiperStartAnim ? "opacity-0 pointer-none" : ""
        }`}
      >
        <View className='product-info'>
          <Text className='product-title'>{data.name}</Text>
          <View className={`desc-container ${showMore ? "high" : "short"}`}>
            <Text className='product-desc'>
              {needFold && !showMore
                ? `${data.desc.slice(0, foldLength)}...`
                : data.desc}
            </Text>
            {needFold && (
              <Image
                onClick={handleShowMore}
                className={`arrow ${showMore ? "rotate-180" : ""}`}
                src={ArrowImg}
                mode='aspectFit'
              />
            )}
          </View>
        </View>

        <View className='price-section'>
          <Text className='price'>¥{data.price}</Text>
        </View>
        <View className='action-button'>
          <Text className='button-text'>加入购物车</Text>
        </View>
      </View>
    </>
  );
};

export default IceCreamSelect;
