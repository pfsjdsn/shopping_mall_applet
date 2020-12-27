

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航数据
    catesList: [],
    // 楼层数据
    floorList: []
  },
  // 获取轮播图数据
  getSwiperList:function ()  {
    request({
      url: '/home/swiperdata'
    }).then(res => {
      this.setData({
        swiperList: res
      })
    })
  },
  // 获取导航数据
  getCateList:function () {
    request({
      url: '/home/catitems'
    }).then(res => {
      this.setData({
        catesList: res
      })
    })
  },
  // 获取导航数据
  getFloorList:function () {
    request({
      url: '/home/floordata'
    }).then(res => {
      this.setData({
        floorList: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    that.getSwiperList()
    that.getCateList()
    that.getFloorList()
  },
  handleToDetailUrl(e) {
    let query = e.currentTarget.dataset.url
    query = query.substring(24)
    wx.navigateTo({
      url: '/pages/goods_list/index?query=' + query,
    })
  }
})