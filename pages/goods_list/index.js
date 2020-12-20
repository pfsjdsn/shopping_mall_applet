// pages/goods_list/index.js
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  // 接口所需要参数
  params: {
    query: '',
    cid: '',
    pagenum: '',
    pagesize: 10,
  },
  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid = options.cid
    this.getGoodsList()
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({url: "/goods/search",data: this.params})
    // 总页数 
    const total = res.total 
    console.log(total);
    
    // 计算总页数 
    this.totalPages = Math.ceil(total/this.params.pagesize) // Math.ceil向上取整
    console.log(this.totalPages )
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
    
  },
  // 标题点击事件
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
  // 触底事件
  onReachBottom() {
      // 判断当前页码是否大于总页数
      if (this.params.pagenum >= this.totalPages) {
        wx.showToast({
          title: '没有下一页数据！',
          icon: 'none'
        })
      } else {
        // 请求下一页数据
        this.params.pagenum++
        this.getGoodsList()
        
      }
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log('我下拉刷新了');
    // 重置数组
    this.setData({
      goodsList: []
    })
    // 重置页码
    this.params.pagenum = 1
    // 发送请求
    this.getGoodsList()
  }
 
})