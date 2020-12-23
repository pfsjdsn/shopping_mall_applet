import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoosDetail( options.goods_id)
  },
  async getGoosDetail(goods_id) {
    const goodsObj = await request({url: "/goods/detail", data: {goods_id}})
    this.goodsInfo = goodsObj
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone 部分手机不识别webp图片格式
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
      }
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
    console.log(cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true防止用户手抖
      mask: true,
    })
  }
})