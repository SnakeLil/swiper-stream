import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState, useRef } from 'react'
import './index.scss'

export default function Animationone ({ value }) {
  const [isSelected, setIsSelected] = useState({
    leftselect: false,
    rightselect: false
  })
  // 记录第一次点击是左侧还是右侧
  const [isLeftClick, setIsLeftClick] = useState(false)
  const [isShowBottom, setIsShowBottom] = useState(false)
  const [data, setData] = useState(value)
  let oldIndex = useRef(0)
  let isAddClick = useRef(false)

  useLoad(() => {
    console.log('Page loaded.')
  })
  //  判断整体类型当前是展示一个还是两个
  // const isshowcounts = () => {
  //   let count = 0
  //   for (let i = 0; i < data.TcArry.length; i++) {
  //     if (data.TcArry[i].selectval > 0) {
  //       count ++
  //     }
  //   }
  //   return count
  // }
  // 判断左侧或者右侧展示一个或者两个-左侧
  const showTypeCounts = () => {
    return data.TcArry[0].selectval
  }
  const showRightTypeCounts = () => {
    return data.TcArry[1].selectval
  }
  // 点击更换
  const changisselect = (type) => {
    setIsShowBottom(true)
    let oldselect = isSelected
    if (type === 'left') {
      setIsLeftClick(true)
      oldselect.leftselect = true
      oldselect.rightselect = false
    } else if (type === 'right') {
      setIsLeftClick(false)
      oldselect.rightselect = true
      oldselect.leftselect = false
    }
    console.log(oldselect, 'oldselect_oldselect')
    // 修改isselect状态
    setIsSelected({
      ...oldselect
    })
    let olddata = data
    if (type === 'left') {
      olddata.leftSelectImageArry[1].isshow = !oldselect.leftselect
      olddata.TcIndex = 0
      oldIndex.current = 0
    } else if (type === 'right') {
      olddata.RightSelectImageArry[1].isshow = !oldselect.rightselect
      olddata.TcIndex = 1
      oldIndex.current = 1
    }
    // 清空选中的值
    for (let i = 0; i < olddata.TcArry.length; i++) {
      olddata.TcArry[i].selectval = 0
      olddata.TcArry[i].selectID = []
      for (let j = 0; j < olddata.TcArry[i].selectvalarry.length; j++) {
        olddata.TcArry[i].selectvalarry[j].count = 0
      }
    }
    setData(olddata)
  }
  // 最外层的整体类名
  const setParentClassfun = () => {
    // 两个都展示
    //  类名一共有8中类型，分别是
    /**
     * 1，左1 右0-, showOnlyLeftOne 2，左2 右0-, showOnlyLeftTwo
     * 3，左0 右1-, showOnlyRightOne 4, 左0 右2, showOnlyRightTwo
     * 5，左1 右1-, showLeftOneRightOne 6, 左2 右1-, showLeftTwoRightOne
     * 7，左1 右2-, showLeftOneRightTwo 8, 左2 右2-, showLeftTwoRightTwo
     */
    // if (isSelected.leftselect && isSelected.rightselect) {
    //   return 'animationtops_select showAllData'
    // }
    // 两个都为false的时候为最初的样式
    console.log(isSelected, '左右侧是否选中')
    if (!isSelected.leftselect && !isSelected.rightselect) {
      return 'animationtops_select showLeftTwoRightTwo defaultclass'
    }
    // defaultclass
    // 只展示其中一个
    let counts = showTypeCounts() // 左侧选中数量
    let countsright = showRightTypeCounts() // 右侧选中数量
    if (isSelected.leftselect && !isSelected.rightselect) { // 只展示左侧
      if (counts === 1 || counts === 0) { // 一个数据的时候
        // return 'animationtops_select showLeftData'
        return 'animationtops_select showOnlyLeftOne'
      } else { // 两个数据的时候
        return 'animationtops_select showOnlyLeftTwo'
      }
    }
    if (!isSelected.leftselect && isSelected.rightselect) { // 只展示右侧
      if (countsright === 1 || countsright === 0) { // 右侧只展示一个
        return 'animationtops_select showOnlyRightOne'
      } else { // 右侧展示两个
        return 'animationtops_select showOnlyRightTwo'
      }
    }
    if (isSelected.leftselect && isSelected.rightselect) { // 两个都展示
      if (counts === 0 && countsright === 0) { // 左右都减少最终保留左侧或右侧
        if (isLeftClick) {
          return 'animationtops_select showOnlyLeftOne'
        } else {
          return 'animationtops_select showOnlyRightOne'
        }
      }
      if (counts === 1 && countsright === 1) { // 左1 右1
        return 'animationtops_select showLeftOneRightOne'
      } else if (counts === 1 && (countsright === 2)) { // 左1 右2
        return 'animationtops_select showLeftOneRightTwo'
      } else if ((counts === 2) && countsright === 1) { // 左2 右1
        return 'animationtops_select showLeftTwoRightOne'
      } else if ((counts === 2) && (countsright === 2)) { // 左2 右2
        return 'animationtops_select showLeftTwoRightTwo'
      } else if (counts === 0 && countsright === 1) { // 左0 右1
        return 'animationtops_select showOnlyRightOne'
      } else if (counts === 0 && countsright === 2) { // 左0 右2
        return 'animationtops_select showOnlyRightTwo'
      } else if (counts === 1 && countsright === 0) { // 左1 右0
        return 'animationtops_select showOnlyLeftOne'
      } else if (counts === 2 && countsright === 0) { // 左2 右0
        return 'animationtops_select showOnlyLeftTwo'
      } else if (counts === 0 && countsright === 0) { // 左2 右2
        return 'animationtops_select showLeftTwoRightTwo'
      }
    }

  }
  // 左侧位置类名一个的逻辑
  const getLeftItemClass = (index, item) => {
    /**
     * 新增的时候，的一些判断
     * 当为一个类型展示的时候，此时默认只展示一个数据，此时数据为居中展示，当为两个数据的时候，此时从左侧加进来一个数据，所有的数据居中展示
     * ，类型1和类型2的展示效果是不同的
     * 档位两个类型的时候，此时需要注意到其中的增加与减少的判断
     */
    /**
     * 减少的时候，逐渐减少的时候，首先判断是否是展示两个类型，
     * 展示一个类型的时候，为一个的时候，再进行减少，此时取旧的值，,两个选中减少，此时元剩余的一个元素居中展示
     * 展示两个类型的时候，此时是点击了修改进来的，减少一个只是改变位置，减少两个的话，此时只有一个类型了
     */
    // 根据实际业务逻辑返回相应的类名
    // let counts = isshowcounts()
    // 判断展示的是左侧数据还是右侧数据
    if (item.isshow) {
      return item.showClass
    } else {
      return item.noshowClass
    }
    
    return '' // 默认无额外类名
  }
  const getLeftTwoItemClass = (index,item) => {
    // 单个类型，两个数据此时进行设置
    let counts = showTypeCounts()
    if (counts > 1) {
      if (item.isShoTwo) {
        return item.isShowClassOne
      } else {
        return item.isShowClassNoOne
      }
    }
    return ''
  }
  const getRightItemClass = (index, item) => {
    if (item.isshow) {
      return item.showClass
    } else {
      return item.noshowClass
    }
  }
  // 单个渐变切换类名
  const setClassfunopaction = (index, item) => {
    if (item.isopaction) {
      return 'opactionClassSelect'
    }
  }
  // 操作--类型切换
  const changselectTypescheck = (item, index) => {
    if (oldIndex.current === index) {
      return
    }
    oldIndex.current = index
    if (item.selectval === 0) {
      // if (index === 0) {
      //   setIsSelected({
      //     ...isSelected,
      //     leftselect: isSelected.rightselect ? false : true,
      //   })
      // } else {
      //   setIsSelected({
      //     ...isSelected,
      //     rightselect: isSelected.leftselect ? false : true,
      //   })
      // }
    }
    setData({
      ...data,
      TcIndex: index
    })
  }
  // 计算总和
  const getallCounts = (dataval, arrykey, key) => {
    let num = 0
    for (let i = 0; i < dataval[arrykey].length; i++) {
      num+=dataval[arrykey][i][key]
    }
    if (num === dataval.maxselect) {
      return {
        type: false,
        count: num
      }
    } else {
      return {
        type: true,
        count: num
      }
    }
  }
  // 设置新增或者删除图片
  const setOpactionImageFun = (val, type) => {
    // 先重置所有动画状态
    data.leftSelectImageArry = data.leftSelectImageArry.map(item => ({
      ...item,
      isopaction: false
    }))
    data.RightSelectImageArry = data.RightSelectImageArry.map(item => ({
      ...item,
      isopaction: false
    }))

    // 获取当前选中的数量
    const currentSelectVal = data.TcArry[data.TcIndex].selectval
    
    // 确定操作的数组
    let targetArray = data.TcIndex === 0 ? 'leftSelectImageArry' : 'RightSelectImageArry'
    
    if (type === 'add') {
      console.log('新增商品', val)
      
      // 根据当前选中数量确定更新的索引位置
      let updateIndex = 0
      if (currentSelectVal === 0) {
        // 第一次添加，更新索引0的位置
        updateIndex = 0
      } else if (currentSelectVal === 1) {
        // 第二次添加，更新索引1的位置
        updateIndex = 1
      } else {
        // 已经达到最大数量，不再更新
        return
      }

      // 如果是第一次添加且需要动画效果
      if (currentSelectVal === 0) {
        // 如果只是
        data[targetArray][0].isopaction = true
        data[targetArray][updateIndex].bigImg = val.bigImg
        data[targetArray][updateIndex].titImg = val.titImg
        data[targetArray][updateIndex].id = val.id
        data[targetArray][updateIndex].name = val.name
        // setTimeout(() => {
        //   data[targetArray][updateIndex].bigImg = val.bigImg
        //   data[targetArray][updateIndex].titImg = val.titImg
        //   data[targetArray][updateIndex].id = val.id
        //   data[targetArray][updateIndex].name = val.name
        //   setData({ ...data })
        // }, 500)
      } else {
        // 直接更新，无动画
        data[targetArray][updateIndex].bigImg = val.bigImg
        data[targetArray][updateIndex].titImg = val.titImg
        data[targetArray][updateIndex].id = val.id
        data[targetArray][updateIndex].name = val.name
      }
      
    } else if (type === 'reduce') {
      console.log('减少商品', val)
      
      // 删除逻辑：找到要删除的商品在数组中的位置
      const targetIndex = data[targetArray].findIndex(item => item.id === val.id)
      
      if (targetIndex !== -1) {
        // 如果只剩一个商品，将其移到索引0位置
        if (currentSelectVal === 1) {
          // 清空索引1的数据
          if (data[targetArray][1]) {
            data[targetArray][1].bigImg = val.bigImg
            data[targetArray][1].titImg = ''
            data[targetArray][1].id = ''
            data[targetArray][1].name = ''
          }
        } else if (currentSelectVal === 2) {
          // 如果有两个商品，删除指定的商品
          if (targetIndex === 0) {
            // 删除第一个，将第二个移到第一个位置
            data[targetArray][0] = { ...data[targetArray][1] }
            data[targetArray][1].bigImg = val.bigImg
            data[targetArray][1].titImg = ''
            data[targetArray][1].id = ''
            data[targetArray][1].name = ''
          } else {
            // 删除第二个，直接清空
            data[targetArray][1].bigImg = val.bigImg
            data[targetArray][1].titImg = ''
            data[targetArray][1].id = ''
            data[targetArray][1].name = ''
          }
        }
      }
    }
    
    console.log('更新后的数据', data)
  }
  // 设置新增或者删除ID后，对数据进行排序
  const setSortData = (val, type) => {
    if (type === 'add') {
      data.TcArry[data.TcIndex].selectID.push(val.id)
    } else {
      data.TcArry[data.TcIndex].selectID = data.TcArry[data.TcIndex].selectID.filter(item => item !== val.id)
    }
    // 为什么重置数组，因为可能存在重复的情况，所以需要重置数组
    // if (data.TcIndex === 0) {
    //   let newleftSelectArry = []
    //   for (let i = 0; i < data.TcArry[data.TcIndex].selectvalarry.length; i++) {
    //     let itemval = data.TcArry[data.TcIndex].selectvalarry[i]
    //     if (data.TcArry[data.TcIndex].selectID.includes(itemval.id)) {
    //       newleftSelectArry.push(itemval)
    //     }
    //   }
    //   data.leftSelectImageArry = newleftSelectArry
    // } else {
      
    // }
    console.log(data, '查询当前选中的ID数据——')
    setData({
      ...data
    })
  }
  // 操作-添加商品
  const changAddshoppings = (val, index, type) => {
    console.log(val, 'val_val')
    if (isAddClick.current) {
      return
    }
    isAddClick.current = true
    setTimeout(() => {
      isAddClick.current = false
    }, 800)
    let oldselect = isSelected
    
    if (type === 'add') {
      if (!getallCounts(data.TcArry[data.TcIndex], 'selectvalarry', 'count').type) {
        // 提示最多两个
        return
      }
      
      // 先设置图片数据（在更新selectval之前）
      setOpactionImageFun(val, type)
      
      // 更新商品数量
      data.TcArry[data.TcIndex].selectvalarry[index].count ++
      
      // 设置选择状态
      if (data.TcIndex === 0) {
        oldselect.leftselect = true
        setIsSelected({
          ...oldselect
        })
      } else {
        oldselect.rightselect = true
        setIsSelected({
          ...oldselect
        })
      }
      
    } else if (type === 'reduce') {
      if (data.TcArry[data.TcIndex].selectvalarry[index].count === 0) {
        return
      }
      
      // 更新商品数量
      data.TcArry[data.TcIndex].selectvalarry[index].count --
      
      // 先设置图片数据（在更新selectval之前）
      setOpactionImageFun(val, type)
    }
    
    // 重新计算总数量并更新selectval
    const countval = getallCounts(data.TcArry[data.TcIndex], 'selectvalarry', 'count')
    data.TcArry[data.TcIndex].selectval = countval.count
    
    // 对数据进行排序
    setSortData(val, type)
    
    // 更新数据状态
    setData({ ...data })
  }
  // 确认
  const changOkClick = (count) => {
    // changisselect('left')
    if (count === 0) {
      return
    }
    console.log(data, 'data_data')
    setIsShowBottom(false)
  }

  return (
    <View className='animation_one'>
      <View className='index_top'></View>
       {data && (
          <View className='one_centers'>
            <View className={`animationtops_top_type_select ${isShowBottom ? 'animationtops_top_type_select_active' : ''}`}>
              <View className='animationtops_top_type_item'>
                <Text className='selectTypeClass' onClick={() => changisselect('left')}>
                  更换
                </Text>
              </View>
              <View className='animationtops_top_type_item'>
                <Text className='selectTypeClass' onClick={() => changisselect('right')}>
                  更换
                </Text>
              </View>
            </View>
            <View className={`animationtops ${setParentClassfun()} ${!isShowBottom ? 'defaultclass' : ''}`}>
              <View className='animationtops_left'>
                  {/* <Text className='selectTypeClass' onClick={() => changisselect('left')}>
                    更换
                  </Text> */}
                  {
                    data.leftSelectImageArry.map((item, index) => (
                      <View key={index} className={`animationtops_left_item ${setClassfunopaction(index,item)} ${getLeftTwoItemClass(index, item)} ${getLeftItemClass(index, item)}`}>
                        <Image className='animationtops_left_item_img' src={item.bigImg} />
                      </View>
                    ))
                  }
              </View>
              <View className='animationtops_right'>
                {/* <Text className='selectTypeClass' onClick={() => changisselect('right')}>
                  更换
                </Text> */}
                {
                  data.RightSelectImageArry.map((item, index) => (
                    <View key={index} className={`animationtops_left_item ${setClassfunopaction(index,item)} ${getLeftTwoItemClass(index, item)} ${getRightItemClass(index, item)}`}>
                      <Image className='animationtops_left_item_img' src={item.bigImg} />
                    </View>
                  ))
                }
              </View>
            </View>
              <View className='one_centers_bottomtext'>
                <View className='titles'>
                  <View className='name'>{data.name}</View>
                  <View className='desc'>
                    <View className='desc_text'>
                      {data.desc}
                    </View>
                  </View>
                </View>
                <View className='priceOperate'>
                  <View className='priceOperate_left'>
                    <View className='price'>
                      <Text className='price_text'>￥{data.price}</Text>
                    </View>
                    <View className='price_line'>
                      <Text className='price_line_text'>￥{data.underlineprice}</Text>
                    </View>
                  </View>
                <View className='priceOperate_right'>
                  <View className='previcon'>
                    <Image className='previcon_img' src={require('@/assets/image/icon/shoppingReduceIcon.svg')} />
                  </View>
                  <View className='pricenum'>
                    1
                  </View>
                  <View className='nexticon'>
                    <Image className='nexticon_img' src={require('@/assets/image/icon/shoppingAddIcon.svg')} />
                  </View>
                </View>
              </View>
              <View className='AddShoppingCard'>
                <Text className='AddShoppingCard_text'>加入购物车</Text>
              </View>
            </View>
            <View className={`one_centersbottom_chang ${isShowBottom ? 'one_centersbottom_active_chang' : ''}`}>
              <View className='select_tops'>
                <View className='select_tops_left'>
                  {
                    data.TcArry.map((item, index) => (
                      <View key={index} onClick={() => changselectTypescheck(item, index)}>
                        <Text className={`${data.TcIndex === index ? 'active_select' : ''}`}>
                          {item.tit}
                        </Text>
                        {index !==data.TcArry.length - 1 && <Text className='xian'>|</Text>}
                      </View>
                    ))
                  }
                </View>
                <View className='select_tops_right'>
                  <View className='select_tops_right_item select_tops_right_left_item'>
                    <Text>已选：</Text>
                    <Text>{data.TcArry[data.TcIndex].selectval}个</Text>
                  </View>
                  <View className='select_tops_right_item'>
                    <Text>任选{data.TcArry[data.TcIndex].maxselect}个口味</Text>
                  </View>
                </View>
              </View>
              <View className='select_cent'>
                <View className='select_cent_all'>
                  {
                    data.TcArry && data.TcArry[data.TcIndex].selectvalarry.map((item, index) => (
                      <View key={index} className='select_cent_item'>
                        <View className='select_cent_img'>
                          <Image src={item.titImg}></Image>
                        </View>
                        <View className='select_cent_name'>
                          <Text>{item.name}</Text>
                        </View>
                        <View className='select_cent_options'>
                          {
                            item.count ? (
                              <View className='options_icon'>
                                <Image onClick={() => changAddshoppings(item, index, 'reduce')} className='previmg' src={require('@/assets/image/icon/shoppingReduceIcon.svg')} />
                                <Text>{item.count}</Text>
                                <Image onClick={() => changAddshoppings(item, index, 'add')} className='nextimg' src={require('@/assets/image/icon/shoppingAddIcon.svg')} />
                              </View>
                            ) : (<Image onClick={() => changAddshoppings(item, index, 'add')} className='images' src={require('@/assets/image/icon/adddefaulticon.svg')} />)
                          }
                        </View>
                      </View>
                    ))
                  }
                </View>
              </View>
              <View onClick={() => changOkClick(data.TcArry[data.TcIndex].selectval)} className={`AddShoppingCard ${data.TcArry[data.TcIndex].selectval === 0 ? 'successoNohanges' : ''}`}>
                <Text>确认</Text>
              </View>
            </View>
          </View>
        )}
    </View>
  )
}
