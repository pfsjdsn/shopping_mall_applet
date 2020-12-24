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