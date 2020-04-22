const App = getApp()
var util = require('../../../helpers/Md5.js')    // 引入md5.js文件
Page({
    data: {
        activeIndex: 0,
        navList: [],
        order: {},
        prompt: {
            hidden: !0,
            icon: '../../../assets/images/iconfont-order-default.png',
            title: '您还没有相关的订单',
            text: '可以去看看有哪些想买的',
        },
    },
    onLoad() {
        this.order = App.HttpResource('','')
        this.setData({
            navList: [
                {
                    name: '全部',
                    _id: '0',
                },
                {
                    name: '待付款',
                    _id: '1',
                },
                {
                    name: '待发货',
                    _id: '2',
                },
                {
                    name: '待收货',
                    _id: '3',
                },
                {
                    name: '待评价',
                    _id: '4',
                },
                // {
                //   name: '退款',
                //   _id: 'withdraw',
                // },
            ]
        })
    },
    onShow() {
        this.onPullDownRefresh()
    },
    initData() {
        const order = this.data.order
        const params = order && order.params
        const type = params && params.type || 'all'

        this.setData({
            order: {
                items: [],
                params: {
                    page : 1,
                    limit: 10,
                    type : type,
                },
                paginate: {}
            }
        })
    },
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/order/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    getOrderList() {
        const order = this.data.order
        const params = order.params

        const timestamp = Date.parse(new Date());
        const key = App.Tools.rand_key()
        const uid = App.WxService.getStorageSync('user_id')
        const pack_no = "20021"
        const _self = this
        const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
        if(!uid){
          this.setData({
            order: '',
            'prompt.hidden': 0,
          })
          return false
        }
        // App.HttpService.getOrderList(params)
        this.order.queryAsync(
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
            console.log(data)
            if (data.status.code == '000') {
                order.items = [...order.items, ...data.data.items]
                order.paginate = data.data.paginate
                order.params.page = data.data.paginate.next
                order.params.limit = data.data.paginate.perPage
                this.setData({
                    order: order,
                    'prompt.hidden': order.items.length,
                })
            }
        })
    },
    onPullDownRefresh() {
        this.initData()
        this.getOrderList()
    },
    onReachBottom() {
        this.lower()
    },
    lower() {
        if (!this.data.order.paginate.hasNext) return
        this.getOrderList()
    },
    onTapTag(e) {
        const type = e.currentTarget.dataset.type
        const index = e.currentTarget.dataset.index
        this.initData()
        this.setData({
            activeIndex: index,
            'order.params.type': type,
        })
        this.getOrderList()
    },
})