/**
 * 订单接口
 * 小程序页面栈最大长度是10， 最多只能打开10个页面
 */

import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待收货',
        isActive: false
      },
      {
        id: 3,
        value: '退货/退款',
        isActive: false
      },
      
    ],
    orders: []
  },
  onShow(){
    // 获取订单列表之前要有token
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    // 获取当前页面栈
    let pages = getCurrentPages()
    // 数组中索引最大的就是当前页面
    let currentPage = pages[pages.length-1]
    const {type} = currentPage.options 
    this.changeTitleByIndex(type - 1)
    this.getOrders(type)
  },
  // 获取订单列表
  async getOrders(type) {
    const res = await request({url: "/my/orders/all", data: {type}})
    console.log(res);
    // 时间戳转换
    this.setData({
      orders: res.orders.map(v =>({...v, create_time:(new Date(v.create_time * 1000).toLocaleDateString())}))
    })
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    // 修改源数组
    let {tabs} = this.data
    tabs.forEach((v,i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 标题点击事件
  tabsItemChange(e) {
    //被选中的索引
    const {index} = e.detail
    this.changeTitleByIndex(index)
    // 选中不同的标题时，重新发送请求
    this.getOrders(index + 1)
  },
})