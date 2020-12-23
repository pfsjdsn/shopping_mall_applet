
import regeneratorRuntime from '../../lib/runtime/runtime'; // 解决报错的包
import {requestPayment, showToast} from '../../untils/asyncWx.js'
import {request} from "../../request/index.js";
/**
 * 微信支付流程： 
 *    1 创建订单（获取订单编号）
 *    2 准备预支付（获取支付参数pay）
 *    3 发起微信支付（提交pay参数）
 *    4 查询订单
 * 
 * 
 */
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
      console.log('dddddddddddddddd');
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
    // 获取床单编号 
    const {order_number} = await request({url: "/my/orders/create", method: "POST", data: orderParams})
    // 预支付接口
    const res1 = await request({url:"/my/orders/req_unifiedorder", method: "POST",data: {order_number}})
    // 微信支付
    const res = await requestPayment(pay)
    console.log(res);
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