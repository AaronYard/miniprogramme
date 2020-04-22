const App = getApp()
var util = require('../../../helpers/Md5.js')    // 引入md5.js文件
Page({
    data: {
        hidden: !0,
        address: {
          items: [
            {
              _id: '5', name: 'fd', gender: 'female',
              tel: '159706051024', address: '青山湖', user: '', is_def: true
            },
            {
              _id: '7', name: 'fd', gender: 'female',
              tel: '159706051024', address: '青山湖', user: '', is_def: false
            },
            {
              _id: '8', name: 'fd', gender: 'female',
              tel: '159706051024', address: '青山湖', user: '', is_def: false
            },
          ],
          params: {
            page: 1,
            limit: 10,
          },
          paginate: {
            page: 1,
            pages: 1, perPage: 10, total: 2, prev: 1, next: 1, hasNext: false, hasPrev: false
          }
        }
    },
    onLoad(option) {
      this.address = App.HttpResource('',
      )
    },
    onShow() {
       this.onPullDownRefresh()
    },
    initData() {
        this.setData({
            address: {
                items: [],
                params: {
                    page : 1,
                    limit: 10,
                },
                paginate: {}
            }
        })
    },
    radioChange(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        App.WxService.redirectTo('/pages/order/confirm/index', {
            id: e.detail.value
        })
    },
  getAddressList() {
    const address = this.data.address
    const params = address.params
    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20017"
    const _self = this
    const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
    // App.HttpService.getAddressList(params)
    this.address.queryAsync(
      {
        requestData: {
          "pack_no": pack_no,
          "date": timestamp,
          "user_id": uid,
          "deviceId": "357143046443542",
          "token": token,
          "roles": "",
          "data": {
            'params': params
          }
        }
      }
    )
      .then(data => {
        if (data.status.code == '000') {
          console.log(data)
          address.items = [...address.items, ...data.data.items]
          address.paginate = data.data.paginate
          address.params.page = data.data.paginate.next
          address.params.limit = data.data.paginate.perPage
          this.setData({
            address: address,
            'prompt.hidden': address.items.length,
          })
        }
      })
    },
    onPullDownRefresh() {
        this.initData()
        this.getAddressList()
    },
    onReachBottom() {
        this.lower()
    },
    lower() {
        if (!this.data.address.paginate.hasNext) return
        this.getAddressList()
    },
})