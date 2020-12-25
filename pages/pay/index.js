
 /**
 * 接口: /create 获取订单编号 、/req_unifiedorder 预支付、/chkOrder 查询后台订单状态
 * 微信小程序官方api接口: 微信支付api wx.requestPayment、showToast
 * 微信小程序官方事件: wx.showToast （显示消息提示框）、wx.getStorageSync（取出缓存）、wx.setStorageSync（存入缓存）
 * async await 异步请求、 try catch捕获异常
 * array.filter 过滤数组中的值、array.forEach 循环遍历数组
 * promise封装请求
 * 微信支付流程： 
 *    1 创建订单（获取订单编号： 获取订单编号接口）
 *    2 准备预支付（获取支付参数pay： 预支付接口）
 *    3 发起微信支付（提交pay参数： 微信官方支付接口）
 *    4 查询订单 （查询后台订单状态接口）
 * 
 */


import regeneratorRuntime from '../../lib/runtime/runtime'; // 解决报错的包
import {requestPayment, showToast} from '../../untils/asyncWx.js'
import {request} from "../../request/index.js";

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 获取缓存中的地址
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    // 获得选中的商品
    cart = cart.filter(v=> v.checked)
    this.setData({address})

    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
    });
    // 缓存和data中的数据都需要改变
    this.setData({
      cart,
      totalPrice,
      totalNum,
    })
  },
  // 支付
  async handleOrderPay() {
    try {
    // 判断缓存中是否有token
    const token  = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    } 
    const order_price = this.data.totalPrice
    const consignee_addr = this.data.address.all
    let goods = []
    cart.forEach(v => goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))
    const orderParams = { order_price, consignee_addr}
    // 获取订单编号 
    const {order_number} = await request({url: "/my/orders/create", method: "POST", data: orderParams})
    // 预支付接口
    const res1 = await request({url:"/my/orders/req_unifiedorder", method: "POST",data: {order_number}})
    // 微信支付
    const res = await requestPayment(pay)
    // 查询后台订单状态
    const res2 = await requst({url: "/my/orders/chkOrder", method: "POST", data: order_number})
    console.log(res2); // 如支付成功，会返回“支付成功”这4个字
    await showToast({title: "支付成功！"})
    // 删除缓存中已支付了的商品
    let newCart = wx.getStorageSync('cart')
    newCart = newCart.filter(v=> !v.checked)
    wx.setStorageSync('cart', newCart)
    // 支付成功，跳转到订单页面
    wx.navigateTo({
      url: '/pages/order/index',
    })
    } catch (error) {
      await showToast({title: "支付失败！"})
      console.log(error);
      
    }
  }
})