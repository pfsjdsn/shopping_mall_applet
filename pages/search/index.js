/*
  搜索输入字符：防抖(防止抖动) 定时器
    防抖(防止抖动)，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
     - 用途：输入框中，防止重复输入，重复发送请求
     - 方案：只是在最后一次事件后才触发一次函
     - 思路：
          1 设置一个id（TimeId）为-1
          2 clearTimeout（TimeId）先清除定时器
          3 设置定时器 this.TimeId = setTimeout(() => {执行请求}, 1000);
    节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。
     - 方案：保证在规定时间内一定会执行一次真正的事件处理函数
     - 用途：页面上拉和下拉
**/

/**
 * 接口: /qsearch 搜索
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: 无
 * js: setTimeout 定时器、clearTimeout 清除定时器
 * async await 异步请求
 * 
 */


import regeneratorRuntime from '../../lib/runtime/runtime'; // 解决报错的包
import { request } from '../../request/index.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false,
    inpValue: ''
  },
  TimeId: -1, // setTimeout() 返回的 ID 值
  // 输入框输入内容
  handleInput(e) {
    // 获取输入框的值
    const {value} = e.detail
    // 检测合法性,就是确定搜索框中要有内容
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return
    }
    this.setData({isFocus: true})
    // 防抖
    // 以上操作通过后,清除定时器
    clearTimeout(this.TimeId)
    // 输入关键字暂停后1秒再执行搜索请求
    this.TimeId = setTimeout(() => {
      this.qsearch(value)
    }, 1000);
  },
  async qsearch(query) {
    // 发送搜索请求
    const res = await request({url: "/goods/qsearch", data: {query}})
    this.setData({goods: res})
  },
  // 取消
  handleCancel() {
   this.setData({
    inpValue: '',
    isFocus: false,
    goods: []
   })
  }
})