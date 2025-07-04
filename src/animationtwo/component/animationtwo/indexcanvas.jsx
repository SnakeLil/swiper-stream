// import React from 'react';
import { View, Canvas } from '@tarojs/components'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import './canvas.scss'

export default function Animaticomponone () {
  const [rotation, setRotation] = useState(0) // 旋转角度
  const [isDragging, setIsDragging] = useState(false) // 是否正在拖拽
  const [lastX, setLastX] = useState(0) // 上一次触摸点X坐标

  // 绘制可旋转圆形的函数
  const drawCircle = (rotateAngle = 0) => {
    const ctx = Taro.createCanvasContext('circleCanvas')
    
    // 清空画布
    ctx.clearRect(0, 0, 300, 300)
    
    // 保存当前变换状态
    ctx.save()
    
    // 移动到圆形中心
    ctx.translate(200, 150)
    
    // 应用旋转
    ctx.rotate(rotateAngle)
    ctx.beginPath();
    ctx.arc(0, -120, 220, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.setFillStyle('#FF0000')
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI * 2) / 8
      const x = Math.cos(angle) * 50
      const y = Math.sin(angle) * 50
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    }
    
    // 绘制中心文字
    ctx.setFillStyle('#FFFFFF')
    ctx.setFontSize(16)
    ctx.setTextAlign('center')
    ctx.fillText('草莓味', 0, 5)
    
    // 恢复变换状态
    ctx.restore()
    
    ctx.draw() // 执行绘制
  }

  // 触摸开始事件
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setLastX(e.touches[0].clientX)
  }

  // 触摸移动事件
  const handleTouchMove = (e) => {
    if (!isDragging) return
    
    const currentX = e.touches[0].clientX
    const deltaX = currentX - lastX
    
    // 根据拖拽距离计算旋转角度
    const rotationDelta = deltaX * 0.01 // 调整旋转灵敏度
    const newRotation = rotation + rotationDelta
    
    setRotation(newRotation)
    setLastX(currentX)
    
    // 重新绘制
    drawCircle(newRotation)
  }

  // 触摸结束事件
  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    // 组件挂载后绘制圆形
    setTimeout(() => {
      // drawCircle()
    }, 100) // 延迟100ms确保Canvas已经渲染
  }, [])

  return (
    <View className='animationtwo_container'>
      <View className='marintops'></View>
      <View className='canvasers'>
        <View className='yuanhu'></View>
        <View className='yuanhu'></View>
        <View className='yuanhu'></View>
        <View className='yuanhu'></View>
        <View className='yuanhu'></View>
        <View className='yuanhu'></View>
      </View>
    </View>
  );
}
