// pages/category/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边数据
    leftMenuList: [],
    // 右边商品数据
    rightContent: [],
    // 左边被选中
    currentIndex: 0
  },
  // 接口返回数据
  Cates: [],
  // 获取分类数据
  getCatesList: function () {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then(res => {
      this.Cates = res.data.message
      // 把接口数据存入本地缓存中
      wx.setStorageSync('cates', {time: Date.now(), data: this.Cates})
      // 左边
      let leftMenuList =  this.Cates.map(v => v.cat_name)
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  // 左侧菜单点击事件
  handleItemTap (e) {
    let index = e.currentTarget.dataset.index
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    // web中的本地存储与小程序的本地存储的区别
    // web: 
    // 方式： localStorage.setItem("key", value) localStorage.getItem("key")
    // 类型： 会先调用toString()转换成字符串类型再存储
    // wxApp: 
    // 方式：wx.setStorageSync('key', value)  wx.getStorageSync("key")
    // 类型： 存储之前不做任何操作
    // 判断缓存
    // {time: Date.now(), data: [...]}
    const Cates = wx.getStorageSync('cates')
    if (!Cates) {
      // 不存在数据, 发请求
      that.getCatesList()
    } else {
      // 有旧数据(已过期)
      if (Date.now() - Cates.time * 1000 > 10) { // 如过期时间大于10秒
        // 重新发送请求
        that.getCatesList()
      } else {
        // 有旧数据(没有过期) 
        console.log('可使用旧数据!!!!');
        this.Cates = Cates.data
        let leftMenuList =  this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
        
      }
    }
  },  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})