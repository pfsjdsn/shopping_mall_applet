// 同时发送异步代码的次数
let ajaxTimes = 0
export const request = (params) => {
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