/**
 * 接口: 无
 * 微信小程序官方api接口: 登录api wx.chooseAddress
 * 微信小程序官方事件: getCurrentPages（获取当前页面栈） 、wx.setStorageSync（存入缓存）、 wx.getStorageSync（取出缓存）、wx.previewImage（预览图片）、wx.showToast
 * async await 异步请求、 try catch捕获异常
 * array.findIndex 找到符合条件的索引、、array.map 生成新数组、array.some 测试每个元素的函数(一真为真)
 * promise封装请求
 * 
 */



import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length -1]
    let options = currentPage.options
    const {goods_id} = options
    this.getGoosDetail( goods_id)
  },
  async getGoosDetail(goods_id) {
    const goodsObj = await request({url: "/goods/detail", data: {goods_id}})
    this.goodsInfo = goodsObj
    // 获取缓存中商品收藏的数组 
    let collect = wx.getStorageSync('collect') || []
    // 判断当前商品是否被收藏 some 方法 一真为真
    let isCollect = collect.some(v => v.goods_id == this.goodsInfo.goods_id)
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone 部分手机不识别webp图片格式
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
      },
      isCollect
    })
    
  },
  // 放大轮播图
  handlePrevewImage(e) {
    const urls = this.goodsInfo.pics.map(v =>v.pics_mid)
    const current = e.currentTarget.dataset.urls
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  // 添加购物车
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || []
    // 判断商品是否存在购物车当中
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
    if (index === -1) {
      // 不存在 第一次添加
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
    } else {
      // 已存在, num++
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true防止用户手抖
      mask: true,
    })
  },
  // 收藏
  handleCollect() {
    let isCollect = false
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || []
    // 判断商品是否被收藏过
    let index = collect.findIndex(v => v.goods_id == this.goodsInfo.goods_id)
    // index=-1, 表示不存在，就是未收藏
    // 已收藏
    if(index !== -1) {
      // 已收藏需要去删除商品
      collect.splice(index, 1) 
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })

    } else {
      // 未收藏, 需要去添加商品
      collect.push(this.goodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    // 把数组存入缓存中
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  },
})