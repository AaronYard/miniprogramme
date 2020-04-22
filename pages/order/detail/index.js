const App = getApp()
var util = require('../../../helpers/Md5.js')    // 引入md5.js文件
Page({
    data: {
      order: {
        item: {
          items: [
            {
              goods: {
                'create-at': '2019-10-16',
                'name': '月季花',
                'price': '15'
              },
              'meta': {
                'total': 1,
                'totalAmount': 15
              },

            },
            {
              goods: {
                'create-at': '2019-10-16',
                'name': '月季3花',
                'price': '15'
              },
              'meta': {
                'total': 1,
                'totalAmount': 13
              },

            }
          ]
        },
      },
    },
    onLoad(option) {
        this.order = App.HttpResource('', '')
        const id = option.id
        this.setData({
          id: id?id:1
        })
    },
    onShow() {
        this.getOrderDetail(this.data.id)
    },
    getOrderDetail(id) {
        // App.HttpService.getOrderDetail(id)
      const timestamp = Date.parse(new Date());
      const key = App.Tools.rand_key()
      const uid = App.WxService.getStorageSync('user_id')
      const pack_no = "20023"
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
            'id':id
          }
        }
      }
        this.order.getAsync(params)
        .then(data => {
            console.log(data)
            if (data.status.code == '000') {
                this.setData({
                    'order': data.data
                })
            }
        })
    },

  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '15970615124', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }
})