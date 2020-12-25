// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
      
    ],
    tipsList: [{title: '功能建议'},{title: '购买遇到的问题'},{title: '性能问题'},{title: '其它'}]
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