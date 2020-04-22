const App = getApp()
var util = require('../../../helpers/Md5.js')    // 引入md5.js文件
Page({
  data: {
    address: {},
    prompt: {
      hidden: !0,
      icon: '../../../assets/images/iconfont-addr-empty.png',
      title: '还没有收货地址呢',
      text: '暂时没有相关数据',
    },
  },
  onLoad() {
    this.setData({
      'user_id': App.WxService.getStorageSync('user_id')
    })
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
          page: 1,
          limit: 2,
        },
        paginate: {}
      }
    })
  },
  toAddressEdit(e) {
    console.log(e)
    App.WxService.navigateTo('/pages/address/edit/index', {
      id: e.currentTarget.dataset.id
    })
  },
  toAddressAdd(e) {
    console.log(e)
    App.WxService.navigateTo('/pages/address/add/index')
  },
  setDefalutAddress(e) {
    const id = e.currentTarget.dataset.id
    App.HttpService.setDefalutAddress(id)
      .then(data => {
        console.log(data)
        if (data.meta.code == 0) {
          this.onPullDownRefresh()
        }
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
    if (!uid) {
      this.setData({
        address: '',
        'prompt.hidden': 0,
      })
      return false
    }
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