
import {getSetting,chooseAddress,openSetting,showModal,showToast} from '../../untils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime'; // 解决报错的包

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 获取缓存中的地址
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []
    this.setData({address})
    this.setCart(cart)
  },
  // 获取收货地址
  async handleChooseAddress() {
    try {
      // 1 获取权限
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting['scope.address']
      // 2 判断权限状态
      if (scopeAddress === false) {
        // 3 引导用户打开授权页面
        await openSetting()
      }
      // 4 调用收货地址api 
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      // 把地址存入缓存
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error);
    }
  },
  // 商品选中 
  handItemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v => v.goods_id == goods_id)
    // 选中取反
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 封装购物车状态，全选、总价格、购买数量
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    });
    // 防止是空数组
    allChecked = cart.length ? allChecked : false
    // 缓存和data中的数据都需要改变
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart', cart)
  },
  // 全选
  handleItemAllCheck() {
    let {cart, allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked=allChecked);
    this.setCart(cart)
  },
  // 加减操作
  async handleItemNumEdit(e) {
    const {operation, id} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(v => v.goods_id == id)
      // 删除操作
    if(cart[index].num == 1 && operation == -1) {
      // 弹窗提示
      const res = await showModal({content: "您是否要删除?" })
      if (res.confirm) {
        cart.splice(index, 1) // 删除
        this.setCart(cart)
      } else if (res.cancel) {
        console.log('取消');
      }
    } else {
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  // 结算
  async handlePay() {
    // 判断是否有收货地址
    const {address, totalNum} = this.data
    if (!address.userName) {
      await showToast({title: "您还没有选择收货地址！"})
      return
    }
    // 判断是否勾选了商品
    if (totalNum == 0) {
      await showToast({title: "您还没有勾选商品！"})
      return
    }
    // 跳转到支付
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})