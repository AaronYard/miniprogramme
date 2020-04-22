const App = getApp()
var util = require('../../../helpers/Md5.js')    // 引入md5.js文件
Page({
    data: {
        hidden: !0,
        carts: {},
        totalAmount: 0, 
        address: {}
    },
    onLoad(option) {
        this.setData({
            address_id: option.id
        })
      
        const carts = {
            items: App.WxService.getStorageSync('confirmOrder')
        }

     // carts.items.forEach(n => carts.totalAmount += (n.price * n.nums))
        
        this.setData({
            carts: carts.items
        })
        console.log(545456467)
        console.log(this.data.carts)
    },
    onShow() {
        const address_id = this.data.address_id
        if (address_id) {
            this.getAddressDetail(address_id)
        } else {
            this.getDefalutAddress()
        }
    },
    redirectTo(e) {
        console.log(e)
        App.WxService.redirectTo('/pages/address/confirm/index', {
            //ret: this.data.address_id
        })
    },
    getDefalutAddress() {
      const timestamp = Date.parse(new Date());
      const key = App.Tools.rand_key()
      const uid = App.WxService.getStorageSync('user_id')
      const pack_no = "20020"
      const _self = this
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
          }
        }
      }
        App.HttpService.getDefalutAddress(params)
        .then(data => {
            console.log(data)
          if (data.status.code == '000' && data.data.info) {
                this.setData({
                    address_id: data.data.info._id, 
                    'address.item': data.data.info, 
                })
            } else {
                this.showModal()
            }
        })
    },
    showModal() {
        App.WxService.showModal({
            title: '友情提示', 
            content: '没有收货地址，请先设置', 
        })
        .then(data => {
            console.log(data)
            if (data.confirm == 1) {
                App.WxService.redirectTo('/pages/address/add/index')
            } else {
                App.WxService.navigateBack()
            }
        })
    },
    getAddressDetail(id) {
      const timestamp = Date.parse(new Date());
      const key = App.Tools.rand_key()
      const uid = App.WxService.getStorageSync('user_id')
      const pack_no = "20018"
      const _self = this
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
            'id': id
          }
        }
      }
        App.HttpService.getAddressDetail(params)
        .then(data => {
          console.log(35434343)
            console.log(data)
            if (data.status.code == '000') {
              console.log(data.data.info.address)
              console.log(34335434)
                _self.setData({
                    'address.item':data.data.info
                })
            }
        })
    },
    addOrder() {
      const address_id = this.data.address_id
      const timestamp = Date.parse(new Date());
      const key = App.Tools.rand_key()
      const uid = App.WxService.getStorageSync('user_id')
      const pack_no = "20005"
      const _self = this
      const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
      const param = {
          items: [], 
          address_id: address_id, 
      }
      
        this.data.carts.items.forEach(n => {
            param.items.push({
                id: n.id,
                item_id:n.item_id,
                price:n.per_price,
                total: n.nums,
            })
        })
      const params = {
        requestData: {
          "pack_no": pack_no,
          "date": timestamp,
          "user_id": uid,
          "deviceId": "357143046443542",
          "token": token,
          "roles": "",
          "data": {
            'total_price':_self.data.carts.total_price,
            'param':param
          }
        }
      }
      App.HttpService.postOrder(params)
        .then(data => {
            if (data.status.code =='000') {
                App.WxService.redirectTo('/pages/order/detail/index', {
                    id: data.data.order_id
                })
            }
        })
    },
    clear() {
        App.HttpService.clearCartByUser()
        .then(data => {
            console.log(data)
        })
    },
    //支付
  setLoading: function () {
    var that = this
    wx.login({
      success: function (res) {
        // 成功的话会返回：
        // {errMsg: "login:ok", code: "获取用户OpenID的ticket"}
        that.getOpenId(res.code)
      }
    })
  },
  getOpenId: function (jsCode) {
    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20006"
    const _self = this
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
          'js_code': jsCode // wx.login()时得到的ticket
        }
      }
    }
    App.HttpService.getOpen(params)
      .then(data => {
        console.log(data)
        if (data.status.code == '000') {
          console.log(757567)
          _self.getPrePayId(data.data.output.openid)
        }
      })
  },
  getPrePayId: function (openId) {
    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20022"
    const _self = this
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
          'open_id': openId,
        }
      }
    }
    App.HttpService.submitPay(params)
      .then(data => {
        console.log(65656)
        if (data.status.code == '000') {
          that.pay(data.data.response)
        }
      })
  },
  pay: function (data) {
    data.success = function (res) {
      // 用户支付成功后的代码
    }
    data.fail = function (res) {
      // 用户支付失败后的代码
    }
    wx.requestPayment(data)
  }
})