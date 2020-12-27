## 项目：canoe 商城

## 用途：个人测试demo

### 功能：

#### 商品详情、商品搜索、商品收藏、获取收货地址、加入购物车、获取订单、登录、意见反馈、支付功能暂未实现（个人小程序无法实现此功能，等待后续完善）

** 以下是此项目使用的技术栈

### 1、auth (支付授权页面)

技术栈: 

 ```vue 
/**
 * 接口: 登录接口 wxlogin
 * 微信小程序官方api: 登录api wx.login
 * 微信小程序官方事件: wx.navigateBack（返回上一页面或多级页面）wx.setStorageSync（存入缓存）
 * async await 异步请求、 try catch捕获异常
 * promise封装请求
 */

 ```

### 2、cart (购物车页面)

技术栈: 

```vue
/**
 * 接口: 无
 * 微信小程序官方api接口: 登录api wx.chooseAddress、调起客户端小程序设置界面api wx.openSetting
 * 微信小程序官方事件: wx.navigateBack（返回上一页面或多级页面）、wx.getStorageSync（取出缓存）、wx.setStorageSync（存入缓存）
 * async await 异步请求、 try catch捕获异常
 * array.findIndex 找到符合条件的索引、array.forEach 循环遍历数组
 * promise封装请求
 * 
 */
```

### 3、category (商品分类页面)

技术栈: 

```vue
/**
 * 接口: 分类商品 categories
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: wx.setStorageSync（存入缓存）
 * async await 异步请求、 try catch捕获异常
 * array.map 返回一个新数组
 * 
 */
```

### 4、collect (商品收藏页面)

技术栈: 

```vue
/**
 * 接口: 分类商品 无
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: wx.setStorageSync（存入缓存）
 * array.forEach 循环遍历数组
 * 
 */

```

### 5、feedback (意见反馈页面)

技术栈: 

```vue
/**
 * 接口: 分类商品 无
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: wx.chooseImage 上传图片、wx.uploadFile 上传文件
 * array.forEach 循环遍历数组
 * 
 */
```

### 6、goods_list (商品列表页面)

技术栈: 

```vue
/**
 * 接口: 搜索列表 search
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: wx.showToast （显示消息提示框）
 * js:  Math.ceil(向上取整)
 * async await 异步请求
 * array.forEach 循环遍历数组
 * onReachBottom (触底事件) 
 *   1 判断当前页码是否大于等于总页数
 *   2 如果否，当前页码++
 *   3 重新请求页面数据接口
 * onPullDownRefresh (下拉刷新)
 *   1 当前页面数据置空
 *   2 当前页码重置为1
 *   3 重新请求页面数据接口
 */
```

### 7、goos_detail (商品详情页面)

技术栈:

```vue
/**
 * 接口: 无
 * 微信小程序官方api接口: 登录api wx.chooseAddress
 * 微信小程序官方事件: getCurrentPages（获取当前页面栈） 、wx.setStorageSync（存入缓存）、 wx.getStorageSync（取出缓存）、wx.previewImage（预览图片）、wx.showToast
 * async await 异步请求、 try catch捕获异常
 * array.findIndex 找到符合条件的索引、、array.map 生成新数组、array.some 测试每个元素的函数(一真为真)
 * promise封装请求
 * 
 */

```

### 8、login (登录页面)

技术栈:

```vue
/**
 * 接口: 无
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: wx.navigateBack（返回上一页面或多级页面）、wx.setStorageSync（存入缓存）
 * 
 */

```

### 9、order(订单查询页面)

技术栈:

```vue

 /**
 * 接口: 订单列表 /all
 * 小程序页面栈最大长度是10， 最多只能打开10个页面
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: getCurrentPages（获取当前页面栈）
 * js: new Date( 时间戳 * 1000).toLocaleDateString() 时间戳转换
 * async await 异步请求
 * array.map 生成新数组元素、array.forEach 循环遍历数组
 * 
 */
```

### 10、pay (商品支付页面)

技术栈:

```vue
 /**
 * 接口: /create 获取订单编号 、/req_unifiedorder 预支付、/chkOrder 查询后台订单状态
 * 微信小程序官方api接口: 微信支付api wx.requestPayment、showToast
 * 微信小程序官方事件: wx.showToast （显示消息提示框）、wx.getStorageSync（取出缓存）、wx.setStorageSync（存入缓存）
 * async await 异步请求、 try catch捕获异常
 * array.filter 过滤数组中的值、array.forEach 循环遍历数组
 * promise封装请求
 * 微信支付流程： 
 *    1 创建订单（获取订单编号： 获取订单编号接口）
 *    2 准备预支付（获取支付参数pay： 预支付接口）
 *    3 发起微信支付（提交pay参数： 微信官方支付接口）
 *    4 查询订单 （查询后台订单状态接口）
 * 
 */
```

### 11、search (搜索中心页面)

技术栈:

```vue
/*
  搜索输入字符：防抖(防止抖动) 定时器
    防抖(防止抖动)，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
     - 用途：输入框中，防止重复输入，重复发送请求
     - 方案：只是在最后一次事件后才触发一次函
     - 思路：
          1 设置一个id（TimeId）为-1
          2 clearTimeout（TimeId）先清除定时器
          3 设置定时器 this.TimeId = setTimeout(() => {执行请求}, 1000);
    节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。
     - 方案：保证在规定时间内一定会执行一次真正的事件处理函数
     - 用途：页面上拉和下拉
**/

```

```vue
/**
 * 接口: /qsearch 搜索
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: 无
 * js: setTimeout 定时器、clearTimeout 清除定时器
 * async await 异步请求
 * 
 */
```

### 12、user (我的页面)

技术栈:

```vue
/**
 * 接口: 无
 * 微信小程序官方api接口: 无
 * 微信小程序官方事件: wx.getStorageSync（取出缓存）
 * array.findIndex 找到符合条件的索引、array.forEach 循环遍历数组
 * 
 */

```

