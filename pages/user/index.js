/**
 * 接口: 无
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: wx.getStorageSync（取出缓存）
 * array.findIndex 找到符合条件的索引、array.forEach 循环遍历数组
 * 
 */


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    ordersList: [{
      id: 1,
      iconfontName: 'iconquanbu',
      title: '全部',
    }, {
      id: 2,
      iconfontName: 'iconfukuan',
      title: '待付款'
    }, {
      id: 3,
      iconfontName: 'iconshouhuo',
      title: '待收货'
    }, {
      id: 4,
      iconfontName: 'icontuihuo',
      title: '退货/退款'
    }],
    collectList: [
      {number: 0, title: '收藏的店铺'},
      {number: 0, title: '收藏的商品', url: '/pages/collect/index'},
      {number: 0, title: '关注的店铺'},
      {number: 0, title: '我的足迹'},
    ],
    collectNums: 0

  },
  onShow() {
    const userInfo = wx.getStorageSync('userInfo')
    const collect = wx.getStorageSync('collect') || []
    this.setData({
      userInfo,
      collectNums: collect.length
    })
    const {collectList}  = this.data
    collectList.forEach((v,i) => i == 1 ? v.number = collect.length :  v.number = 0);
    this.setData({collectList})
          chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          filePath: v,
          name: 'name',
          url: 'https://images.ac.cn/Home/Index/UploadAction/', // 此图床路径已经失效
          success: (res) => {
            console.log(res)
            // let url = JSON.parse(res.data).url
            let url = '我是路径'
            this.UpLoadImgs.push(url)
            // 前端模拟数据发送到后台，并没有做出实际后台操作
            // 模拟所有图片都上传完
            if (i == chooseImgs.length - 1) {
              wx.hideLoading()
              console.log('图片已提交到后台');
              // 重置页面
              this.setData({
                textValue: '',
                chooseImgs: []
              })
              // 返回上一个页面
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      });
  },
  aa () {
    chooseImgs.forEach((v, i) => {
      wx.uploadFile({
        filePath: v,
        name: 'name',
        url: 'https://images.ac.cn/Home/Index/UploadAction/', // 此图床路径已经失效
        success: (res) => {
          console.log(res)
        }
      })
    });
  }
})