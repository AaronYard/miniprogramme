
//index.js
var app = getApp();
var util = require('../../helpers/Md5.js')    // 引入md5.js文件
Page({
  data: {
    item_cate_path: app.Config.fileBasePath +'/data/attachment/item_cate/',
    item_path: app.Config.fileBasePath + '/data/attachment/item/',
    total:1,
    headerBgOpacity: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    show: 'block',
    hide: 'none',
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},//
    item_name:'赣南脐橙',
    item_price:"10",
    rest_nums:10,
    item_id:1,
    'user_id':'',
    item_cate_width:'',
    currentTabsIndex: 0,
    hasUserInfo: false,
    cateList:[
      {
        name:'3434',
        url:'https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png',
      },
      {
        name: '3434',
        url: 'https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png',
      },
      {
        name: '3434',
        url: 'https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png',
      },
      {
        name: '3434',
        url: 'https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png',
      },
      {
        name: '3434',
        url: 'https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png',
      },
      {
        name: '3434',
        url: 'https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png',
      },
      {
        name: '3434',
        url: 'https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png',
      },
      {
        name: '3434',
        url: 'https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png',
      },
      {
        name: '3434',
        url: 'https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png',
      },
      {
        name: '更多分类',
        url: 'https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png',
      },
      
    ],
    
    imgUrls: [
      '../../static/images/banner/1.jpg',
      '../../static/images/banner/2.jpg',
      '../../static/images/banner/3.jpg'
    ],
    floor: [{
      bg_img: '5de769df0c07d_thumb.jpg',
        alias: 'FRESHROZEN',
        name: '蔬菜',
        items_cate:[
          {
            cate_id:2,
            items:[
              {
                name: '测试数据33',
                price: '10',
                id: '1',
                img: ''
              },
              {
                name: '测试数据3',
                price: '10',
                id: '1',
                img: ''
              },
              {
                name: '测试数据',
                price: '10',
                id: '1',
                img: ''
              },
            ]
          },
          {
            cate_id: 2,
            items: [
              {
                name: '测试数据33',
                price: '10',
                id: '1',
                img: ''
              },
              {
                name: '测试数据',
                price: '10',
                id: '1',
                img: ''
              },
              {
                name: '测试数据335',
                price: '10',
                id: '1',
                img: ''
              },
            ]
          },
          {
            cate_id: 2,
            items: [
              {
                name: '测试数据',
                price: '10',
                id: '1',
                img: ''
              },
              {
                name: '测试数据',
                price: '10',
                id: '1',
                img: ''
              },
              {
                name: '测试数据',
                price: '10',
                id: '1',
                img: ''
              },
            ]
          }
        ],
      }],
    footer: [
      {
        url: '',
        name: '首页'
      }, {
        url: '',
        name: '分类'
      }, {
        url: '',
        name: '购物车'
      }, {
        url: '',
        name: '我的'
      }
    ],
    showCheckBox: true, // 显示选择框
    // 商品列表
    itemList: [
      {
        sku_id: 10001,
        name: "可口可乐碳酸饮料330ml/听*24",
        boamTags: [
          { name: '畅销商品', color: '#19BEAE' }
        ],
        tags: [
          { name: '满减', color: '#19BEAE' },
          { name: '特价', color: '#A1D569' }
        ],
        errorCode: -10000,
        errorInfo: '赠品不足',
        checked: true
      }, {
        name: "可口可乐碳酸饮料330ml/听*24可口可乐碳酸饮料330ml/听*24可口可乐碳酸饮料330ml/听*24",
        errorCode: -10000,
        errorInfo: '赠品不足',
        checked: true
      },
      { sku_id: 10002, name: "xxx", errorCode: 0, errorInfo: '赠品不足', checked: false },
      { sku_id: 10003, name: "xxx", errorCode: -10000, errorInfo: '赠品不足', checked: true },
      { sku_id: 10004, name: "xxx", errorCode: 0, errorInfo: '赠品不足', checked: false },
      { sku_id: 10005, name: "xxx", errorCode: -10000, errorInfo: '赠品不足', checked: true },
      { sku_id: 10006, name: "xxx", errorCode: -10000, errorInfo: '赠品不足', checked: true, disabled: true }
    ]
  },




  // header跳转到搜索页面
  jumpToSearch: function (e) {
    const cate_id = e.currentTarget.dataset.cate
    wx.navigateTo({
      url: '../goods/classify/index?cate_id='+cate_id
    })
  },
  // 滚动时颜色改变
  scrollChangeBgColor: function (e) {
    console.log(e);
  },
  scrollBottom: function (e) {
    console.log(e);
    
  },

  // 增加操作
  actionAdd: function (e) {
    itemList.add(e);
  },
  onLoad:function(e) {
    this.banner = app.HttpResource('', { requestData: { "pack_no": "20003", "date": "1453433081", "user_id": "29a19\/vIvTNq27jFuUVhxo7A2bQNjeK|jia|Q\/BAn1\/MGDM", "deviceId": "357143046443542", "token": "5e6358ad8b92101853a711047906a296", "roles": "", "data": { "name": "11", "title": "11", "member_name": "1112", "nums": "123456" } } })
  },
  onShow() {
    this.setData({
      'user_id': app.WxService.getStorageSync('user_id')
    })
    console.log(app.Tools.splitFileName('5de8639f9a6b6.png','_s'))
    this.getBanners()
    this.getUserLocation();
  },
  getBanners() {
    const _self = this
    // App.HttpService.getBanners({is_show: !0})
    this.banner.queryAsync({ is_show: !0 })
      .then(data => {
        if (data.status.code == '000') {
          this.setData({ 
            'imgUrls': data.data.img,
            'cateList': data.data.item_cate_list,
            'item_cate_width': 100 / (data.data.item_cate_list.length/2),
            'floor': data.data.item
            });
        }
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  /*
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    that.setData({ 'show': 'block' })
    // 页数+1
    //page = page + 1;
    wx.request({
      url: 'http://47.98.43.205/app.php',
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      data: {
        m: 'App',
        c: 'api',
        a: 'processing',
        requestData: { "pack_no": "20003", "date": "1453433081", "user_id": "29a19\/vIvTNq27jFuUVhxo7A2bQNjeK|jia|Q\/BAn1\/MGDM", "deviceId": "357143046443542", "token": "5e6358ad8b92101853a711047906a296", "roles": "", "data": { "name": "11", "title": "11", "member_name": "1112", "nums": "123456" } },
      },
      success: function (res) {
        that.setData({ 'show': 'none' })
        that.setData({ 'hide': 'block' })
        wx.hideLoading();
      }
    })

  },
  login:function(e){
    wx.login({
      success: function (res) {
        console.log(res.code)
        //发送请求
        wx.request({
          url: '自己的域名', //仅为示例，并非真实的接口地址
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
          }
        })
      }
    })
  },
*/
  //验证登录是否过期
  checksession: function () {
    wx.checkSession({
      success: function (res) {
        console.log(res, '登录未过期')
        wx.showToast({
          title: '登录未过期啊',
        })
      },
      fail: function (res) {
        console.log(res, '登录过期了')
        wx.showModal({
          title: '提示',
          content: '你的登录信息过期了，请重新登录',
        })
        //再次调用wx.login()
        wx.login({
          success: function (res) {
            console.log(res.code)
            //发送请求
            wx.request({
              url: '自己的域名', //仅为示例，并非真实的接口地址
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res)
              }
            })
          }
        })
      }
    })
  },

  //获取用户的信息
  info: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
        var city = res.userInfo.city
        var country = res.userInfo.country
        var nickName = res.userInfo.nickName
        var province = res.userInfo.province
        that.setData({
          city: city,
          country: country,
          nickName: nickName,
          province: province
        })
      }
    })
  },

  increase:function(e){
     var total=parseInt(e.currentTarget.dataset.total);
      this.setData({
        total:total+1
      })
  },

  decrease:function(e){
    var total=e.currentTarget.dataset.total;
    if(total>=2){
      this.setData({
        total:total-1
      })
    }
  },
  // 显示遮罩层
  show_model: function () {
    var that = this;
    console.log(11)
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 200)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720)//先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  }, 

  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://xxx/?page=0',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        that.setData({
          moment: res.data.data
        });
        // 设置数组元素
        that.setData({
          moment: that.data.moment
        });
        console.log(that.data.moment);
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  add_cart: function (options) {
    console.log(3333)
    wx.setTabBarBadge({
      index: 3,
      text: '99'
    })
  },
  showModal: function (e) {
    // 显示遮罩层
    const item_info = e.currentTarget.dataset
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      item_id:item_info.id,
      total:1,
      item_name:item_info.name,
      item_price:item_info.price,
      img: item_info.url,
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  addCart(e) {
    const timestamp = Date.parse(new Date());
    const key = app.Tools.rand_key()
    const _self = this
    const goods = this.data.item_id
    const uid = app.WxService.getStorageSync('user_id')
    const pack_no = "20013"
    const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
    app.HttpService.addCartByUser(
      {
        requestData: {
          "pack_no": pack_no,
          "date": timestamp,
          "user_id": uid,
          "deviceId": "357143046443542",
          "token": token,
          "roles": "",
          "data":
          {
            "item_id": _self.data.item_id,
            "price": _self.data.item_price,
            "nums": _self.data.total,
          }
        }
      }
    )
      .then(data => {
        console.log(data)
        if (data.status.code == '000') {
          this.showToast(data.data.msg)
          _self.setData({
            total: data.data.total
          })
          this.hideModal()
        }
      })
  },

  showToast(message) {
    app.WxService.showToast({
      title: message,
      icon: 'success',
      duration: 1500,
    })
  },

  onGotUserInfo: function (e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      var rawData = e.detail.rawData;
      var signature = e.detail.signature;
      var encryptData = e.detail.encryptData;
      var _self = this
      var encryptedData = e.detail.rawData; //注意是encryptedData不是encryptData...坑啊
      var iv = e['iv'];
      //if (app.WxService.getStorageSync('token')) return
      wx.login({
        success: function (res) {
          var code = res['code'];
          //3.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
          app.HttpService.signIn(
            {
              requestData: {
                "pack_no": "20004",
                "date": "1453433081",
                "user_id": "29a19\/vIvTNq27jFuUVhxo7A2bQNjeK|jia|Q\/BAn1\/MGDM",
                "deviceId": "357143046443542",
                "token": "0cfe026ca00c70bb8fb8fb28eee5f139",
                "roles": "",
                "data":
                {
                  "code": code,
                  "rawData": rawData,
                  "signature": signature,
                  "encryptData": encryptData,
                  'iv': iv,
                  'encryptedData': encryptedData
                }
              }
            }
          )
            .then(data => {
              if (data.status.code == '000') {
                app.WxService.setStorageSync('token', data.data.token)
                app.WxService.setStorageSync('user_id', data.data.id)
                _self.setData({
                  'user_id': data.data.id
                })
                _self.showModal(e)
                // App.WxService.switchTab({
                //   url: '/pages/index/index'
                // })
              }
            })
        }
      })


    }
  },

  //定位方法
  getUserLocation: function () {
    var _this = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          //未授权
          wx.showModal({
            title: '四季优源需要获取你的地理位置',
            content: '你的位置信息将用于获取附件门店',
            success: function (res) {
              if (res.cancel) {
                //取消授权
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                //确定授权，通过wx.openSetting发起授权请求
                wx.openSetting({
                  success: function (res) {
                    if (res.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      _this.geo();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //用户首次进入页面,调用wx.getLocation的API
          _this.geo();
        }
        else {
          console.log('授权成功')
          //调用wx.getLocation的API
          _this.geo();
        }
      }
    })

  },

  // 获取定位城市
  geo: function () {
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
  },           
  

})
