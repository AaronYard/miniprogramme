const App = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../../helpers/Md5.js')    // 引入md5.js文件
Page({
    data: {
      // 初始化一些默认值ß
      nums:1,
      total:1,
      item_id:0,
      activeIndex: 0,
      sliderOffset: 0,
      tabs: {
        type: [],
        value: ["商品详情", "购买记录"],
      },
      hideModal: true, //模态框的状态  true-隐藏  false-显示
      animationData: {},//
      sliderLeft: 0,
      indicatorDots: !0,
      vertical: !1,
      autoplay: !1,
      interval: 3000,
      duration: 1000,
      carts: {
        total_price: 30,
        items: [{
          "amount": 12,
          "nums": 3,
          'name': '鱼香肉丝',
          'price': 10,
          "_id": "5cd5170a0d52d7133f936ad5",
          'item_id': 1,
          "thumb_url": "https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png",

        },
        ]
      },
      cance_icon: "../../../assets/images/cancel.png",
      goods: {
          item: {
            images:[
              {
                "path": "../../../assets/images/banner/1.jpg"
              },
              {
                "path": "../../../assets/images/banner/2.jpg"
              },
              {
                "path": "../../../assets/images/banner/3.jpg"
              }
            ],
            
            title: "青椒小炒肉",
            price:80,
            id: "5cc061cc912b773b715663a2",
            remark:1,
          }
      },
    },
    swiperchange(e) {
        // console.log(e.detail.current)
    },
    onLoad(option) {
      const timestamp = Date.parse(new Date());
      const key = App.Tools.rand_key()
      const _self = this
      const uid = App.WxService.getStorageSync('user_id')
      const pack_no = "20012"
      const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
      var that = this;
      var item_id = option.id
      console.log((item_id))
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            item_id: item_id,
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
          });
        }
      });
      wx.request({
        url: 'https://mini.gfdbm.com/app.php',
        method: "GET",
        // 请求头部
        header: {
          'content-type': 'application/text'
        },
        data: {
          m: 'App',
          c: 'api',
          a: 'processing',
          requestData: {
            "pack_no": pack_no,
            "date": timestamp,
            "user_id": uid,
            "deviceId": "357143046443542",
            "token": token,
            "roles": "",
            "data":
            {
              "item_id": item_id,
            }
          }
        },
        success: function (res) {
          const nums = parseInt(res.data.data.item.nums ? res.data.data.item.nums : 1)
          const total = res.data.data.item.total ? res.data.data.item.total : 0
          const total_price = total * nums
          that.setData({
            nums: nums,
            total: total,
            'carts.total_price': res.data.data.item.price,
            'carts.items[0]':{
              nums:1,
              name: res.data.data.item.title,
              item_id:res.data.data.item.id,
              per_price: res.data.data.item.price,
              //thumb_url: res.data.data.item.title,
            },
            goods: res.data.data
          })
          
        }
      })


    },
    
    onShow() {
     //this.getDetail(this.data.id)
    },
    confirmOrder(e) {
      App.WxService.setStorageSync('confirmOrder', this.data.carts)
      App.WxService.navigateTo('/pages/order/confirm/index')
    },
    addCart(e) {
        const timestamp = Date.parse(new Date());
        const key = App.Tools.rand_key()
        const _self = this
        const goods = this.data.item_id
        const uid = App.WxService.getStorageSync('user_id')
        const pack_no = "20013"
        const token = util.hexMD5(pack_no+uid+timestamp+key);  // 使用加密
        App.HttpService.addCartByUser(
          {
            requestData: {
              "pack_no":pack_no,
              "date": timestamp,
              "user_id": uid,
              "deviceId": "357143046443542",
              "token": token,
              "roles": "",
              "data":
              {
                "item_id": goods,
                "price": _self.data.goods.item.price,
                "nums": _self.data.nums,
              }
            }
          }
        )
        .then(data => {
            console.log(data)
          if (data.status.code == '000') {
                this.showToast(data.data.msg)
                _self.setData({
                  total:data.data.total
                })
            }
        })
    },
    previewImage(e) {
        const urls =this.data.goods && this.data.goods.item.images.map(n => n.path)
        const index = e.currentTarget.dataset.index
      const current = urls[Number(index)]
        App.WxService.previewImage({
            current: current, 
            urls: urls, 
        })
    },
    showToast(message) {
        App.WxService.showToast({
            title   : message, 
            icon    : 'success', 
            duration: 1500, 
        })
    },
    getDetail(id) {
    	// App.HttpService.getDetail(id)
        this.goods.getAsync({id: id})
        .then(data => {
        	console.log(data)
        	if (data.meta.code == 0) {
                data.data.images.forEach(n => n.path = App.renderImage(n.path))
        		this.setData({
                    'goods.item': data.data
                })
        	}
        })
    },
  increase: function (e) {
    var nums = e.currentTarget.dataset.nums;
    this.setData({
      nums: parseInt(nums) + 1
    })
  },

  decrease: function (e) {
    var nums = e.currentTarget.dataset.nums;
    if (nums >= 2) {
      this.setData({
        nums: parseInt(nums) - 1
      })
    }
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
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
  btnClick3: function (options) {
    console.log(3333)
    wx.setTabBarBadge({
      index: 0,
      text: '99'
    })
  },
  // 按钮行为触发状态机变化
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  switch_page: function (e) {
    var url = e.currentTarget.dataset['url'];
    App.WxService.switchTab({
      url: url
    })

  }
})