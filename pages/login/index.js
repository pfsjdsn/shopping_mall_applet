/**
 * 接口: 无
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: wx.navigateBack（返回上一页面或多级页面）、wx.setStorageSync（存入缓存）
 * 
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  handleGetUserInfo(e) {
    const {userInfo} = e.detail
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1,
    })
  }
 
})