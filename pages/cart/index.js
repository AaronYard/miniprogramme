const App = getApp()
var util = require('../../helpers/Md5.js')    // 引入md5.js文件
Page({
  data: {
    item_path:'https://mini.gfdbm.com/data/attachment/item/',
    canEdit: !1,
    carts: {
      total_price:0,
      items: [{
        "amount": 12,
        "nums": 3,
        'name': '鱼香肉丝',
        'price': 10,
        "_id": "5cd5170a0d52d7133f936ad5",
        'item_id': 1,
        "thumb_url": "https://mini.gfdbm.com/data/attachment/item/1912/05/5de8639f9a6b6.png",

      },
      {
        "amount": 12,
        "nums": 1,
        'name': '鱼香肉4丝',
        'price': 10,
        "_id": "5cd5170a0d52d7133f936ad5",
        'item_id': 1,
        "thumb_url": "https://nanchangfannong.cn/data/attachment/item/1912/05/5de8639f9a6b6.png",
      }]
    },
    prompt: {
      hidden: !0,
      icon: '../../assets/images/iconfont-cart-empty.png',
      title: '购物车空空如也',
      text: '来挑几件好货吧',
      buttons: [
        {
          text: '随便逛',
          bindtap: 'bindtap',
        },
      ],
    },
  },
  bindtap: function (e) {
    const index = e.currentTarget.dataset.index

    switch (index) {
      case '0':
        App.WxService.navigateBack()
        break
      default:
        break
    }
  },
  onLoad() {
  },
  onShow() {
    this.getCarts()
  },
  getCarts() {
    if (!App.WxService.getStorageSync('user_id')){
      this.setData({
        'carts': '',
        'prompt.hidden': 0
      })
      return false
    }
    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const _self = this
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20014"
    const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
    App.HttpService.getCartByUser(
      {
        requestData: {
          "pack_no": pack_no,
          "date": timestamp,
          "user_id": uid,
          "deviceId": "357143046443542",
          "token": token,
          "roles": "",
          "data": {}
        }
      }
    )
      .then(data => {
        if (data.status.code == '000') {
          _self.setData({
            'carts': data.data,
            'prompt.hidden': parseInt(data.data.items.length)
          })
        }
      })
  },
  onPullDownRefresh() {
    this.getCarts()
  },
  navigateTo(e) {
    console.log(e)
    App.WxService.navigateTo('/pages/goods/detail/index', {
      id: e.currentTarget.dataset.id
    })
  },
  confirmOrder(e) {
    console.log(e)
    App.WxService.setStorageSync('confirmOrder', this.data.carts)
    App.WxService.navigateTo('/pages/order/confirm/index')
  },
  del(e) {
    const id = e.currentTarget.dataset.id

    App.WxService.showModal({
      title: '友情提示',
      content: '确定要删除这个宝贝吗？',
    })
      .then(data => {
        if (data.confirm == 1) {
          const timestamp = Date.parse(new Date());
          const key = App.Tools.rand_key()
          const _self = this
          const uid = App.WxService.getStorageSync('user_id')
          const pack_no = "20015"
          const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
          App.HttpService.getCartByUser(
            {
              requestData: {
                "pack_no": pack_no,
                "date": timestamp,
                "user_id": uid,
                "deviceId": "357143046443542",
                "token": token,
                "roles": "",
                "data": {
                  'id':id
                }
              }
            }
          )
            .then(data => {
              if (data.status.code == '000') {
                _self.getCarts()
              }
            })
        }
      })
  },
  clear() {
    App.WxService.showModal({
      title: '友情提示',
      content: '确定要清空购物车吗？',
    })
      .then(data => {
        if (data.confirm == 1) {
          const timestamp = Date.parse(new Date());
          const key = App.Tools.rand_key()
          const _self = this
          const uid = App.WxService.getStorageSync('user_id')
          const pack_no = "20015"
          const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
          App.HttpService.getCartByUser(
            {
              requestData: {
                "pack_no": pack_no,
                "date": timestamp,
                "user_id": uid,
                "deviceId": "357143046443542",
                "token": token,
                "roles": "",
                "data": {}
              }
            }
          )
            .then(data => {
              if (data.status.code == '000') {
                _self.getCarts()
              }
            })
        }
      })
  },
  onTapEdit(e) {
    this.setData({
      canEdit: !!e.currentTarget.dataset.value
    })
  },
  bindKeyInput(e) {
    const id = e.currentTarget.dataset.id
    const total = Math.abs(e.detail.value)
    if (total < 0 || total > 100) return
    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const _self = this
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20007"
    const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
    const params = {
      requestData: {
        "pack_no": pack_no,
        "date": timestamp,
        "user_id": uid,
        "deviceId": "357143046443542",
        "token": token,
        "roles": "",
        "data": {
          'nums': total,
          'id': id
        }
      }
    }
    this.putCartByUser(
      params
    )
  },
  putCartByUser(params) {
    App.HttpService.putCartByUser(params)
      .then(data => {
        console.log(data)
        if (data.status.code == '000') {
          this.getCarts()
        }
      })
  },
  decrease(e) {
    const id = e.currentTarget.dataset.id
    if (e.currentTarget.dataset.total == 1) return
    const total = Math.abs(e.currentTarget.dataset.total)-1
    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const _self = this
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20007"
    const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
    const params = {
      requestData: {
        "pack_no": pack_no,
        "date": timestamp,
        "user_id": uid,
        "deviceId": "357143046443542",
        "token": token,
        "roles": "",
        "data": {
          'nums': total,
          'id': id
        }
      }
    }
    this.putCartByUser(
      params
    )

    
  },
  increase(e) {
    const id = e.currentTarget.dataset.id
    const total = Math.abs(e.currentTarget.dataset.total)+1
    if (total == 100) return

    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const _self = this
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20007"
    const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
    const params = {
      requestData: {
        "pack_no": pack_no,
        "date": timestamp,
        "user_id": uid,
        "deviceId": "357143046443542",
        "token": token,
        "roles": "",
        "data": {
          'nums': total,
          'id': id
        }
      }
    }
    this.putCartByUser(
      params
    )
  },
})