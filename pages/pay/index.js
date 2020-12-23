
/**
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
  handleOrderPay() {
    // 判断缓存中是否有token
    const token  = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }  else {
      console.log(' 有token');
    }
  }
})