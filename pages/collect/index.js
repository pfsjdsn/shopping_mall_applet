/**
 * 接口: 分类商品 无
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: wx.setStorageSync（存入缓存）
 * array.forEach 循环遍历数组
 * 
 */


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      },
      
    ],
    collect: []
  },
  onShow() {
    let collect = wx.getStorageSync('collect') || []
    this.setData({collect})
  },
  tabsItemChange(e) {
    //被选中的索引
    const {index} = e.detail
    // 修改源数组
    let {tabs} = this.data
    tabs.forEach((v,i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
})