import {request} from "../../request/index.js"
import {login} from '../../untils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime'; // 解决报错的包

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户信息
  async handleGetUserInfo(e) {
    console.log(e);
    const {encryptedData, rawData, iv, signature} = e.detail
    // 获取登录后的code
    console.log(encryptedData, rawData, iv, signature);
    const {code} = await login()
    const loginParams =  {encryptedData, rawData, iv, signature,code}
    console.log(loginParams);
    const res = await request({url:"/users/wxlogin",data:loginParams,method:"post"});
    console.log(res);
  }
})