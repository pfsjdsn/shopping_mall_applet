/**
 * 接口: 分类商品 无
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: wx.chooseImage 上传图片、wx.uploadFile 上传文件
 * array.forEach 循环遍历数组
 * 
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
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
    tipsList: [{
      title: '功能建议'
    }, {
      title: '购买遇到的问题'
    }, {
      title: '性能问题'
    }, {
      title: '其它'
    }],
    chooseImgs: [],
    textValue: '',
  },
  // 服务器上传的图片组件
  UpLoadImgs: [],
  tabsItemChange(e) {
    //被选中的索引
    const {
      index
    } = e.detail
    // 修改源数组
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 选择图片
  handleChooseImg() {
    wx.chooseImage({
      // 最多可选几张图片
      count: 9,
      // 源图片还是压缩
      sizeType: ['original', 'compressed'],
      // 图片来源相册或者相机
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths]
        })
      }
    })
  },
  // 删除图片
  handleRemoveImg(e) {
    console.log(e.target.dataset)
    const {
      index
    } = e.target.dataset
    const {
      chooseImgs
    } = this.data
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },
  // 获取文本内容
  handleTextInput(e) {
    this.setData({
      textValue: e.detail.value
    })
  },
  handleFormSubmit() {
    const {
      textValue,
      chooseImgs
    } = this.data
    if (!textValue.trim()) {
      wx.showToast({
        title: '请输入您要描述的问题!',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '正在上传',
      mask: true
    })
    if (chooseImgs.length != 0) {
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
    } else {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log('只上传了文本！');
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})