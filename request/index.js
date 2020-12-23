// 同时发送异步代码的次数
let ajaxTimes = 0
export const request = (params) => {
  // 判断url中是否带有 /my/ 请求的是私有的路径 带上 header token
  let header = {...params.header}
  if (params.url.includes("/my/")) {
    // 拼接header 带上token
    header["Authorization"] = wx.getStorageSync('token')
  }
  ajaxTimes++
  // 显示加载中的效果
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success:(res) => {
        resolve(res.data.message)
      },
      fail:(err) => {
        reject(err)
      },
      complete: () => {
        ajaxTimes-- // 为0时触发下面的事件
        if (ajaxTimes === 0) {
          // 关闭正在等待的图标
          wx.hideLoading()
        }
      }
    })
  })
}