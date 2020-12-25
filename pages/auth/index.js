/**
 * 接口: 登录接口 wxlogin
 * 微信小程序官方api: 登录api wx.login
 * 微信小程序官方事件: wx.navigateBack（返回上一页面或多级页面）wx.setStorageSync（存入缓存）
 * async await 异步请求、 try catch捕获异常
 * promise封装请求
 */

import {request} from "../../request/index.js"
import {login} from '../../untils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime'; // 解决报错的包

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo',
  },
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      const {encryptedData, rawData, iv, signature} = e.detail
    // 获取登录后的code
    const {code} = await login()
    const loginParams =  {encryptedData, rawData, iv, signature, code}
    const {token} = (await request({url:"/users/wxlogin", data:loginParams, method:"post"})) || []
    wx.setStorageSync('token', this.data.defaultToken)
    // 返回上一层
    wx.navigateBack({
      delta: 1,
    })
    } catch (error) {
      console.log(error);
      
    }
  }
})