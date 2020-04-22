const App = getApp()
Page({
  data: {
    goods: {},
    prompt: {
      hidden: !0,
      icon: '../../../assets/images/iconfont-empty.png',
    },
  },
  onLoad(option) {
    const cate_id = option.cate_id
    const keyword = option.keyword
    this.setData({
      keyword:keyword,
      cate_id:cate_id
    })
    this.goods = App.HttpResource('',
    )
  },
  onShow() {
    this.onPullDownRefresh()
  },
  initData() {
    this.setData({
      goods: {
        items: [],
        params: {
          page: 1,
          limit: 8,
        },
        paginate: {}
      }
    })
  },
  navigateTo(e) {
    console.log(e)
    App.WxService.navigateTo('/pages/goods/detail/index', {
      id: e.currentTarget.dataset.id
    })
  },
  getGoods() {
    const goods = this.data.goods
    const params = goods.params
    const _self = this
    // //App.HttpService.getgoodsList(params)
    this.goods.queryAsync(
      {
        requestData: {
          "pack_no": "20011",
          "date": "1453433081",
          "user_id": "29a19\/vIvTNq27jFuUVhxo7A2bQNjeK|jia|Q\/BAn1\/MGDM",
          "deviceId": "357143046443542",
          "token": "441823d3118719bef32d6afeac554189",
          "roles": "",
          "data": {
            "cate_id": _self.data.cate_id,
            "keyword": _self.data.keyword,
            "params": params
          }
        }
      }
    )
      .then(data => {
        if (data.status.code == '000') {
          console.log(data)
          goods.items = [...goods.items, ...data.data.items]
          goods.paginate = data.data.paginate
          goods.params.page = data.data.paginate.next
          goods.params.limit = data.data.paginate.perPage
          this.setData({
            goods: goods,
            'prompt.hidden': goods.items.length,
          })
        }
      })
  },
  onPullDownRefresh() {
    this.initData()
    this.getGoods()
  },
  onReachBottom() {
    console.log(33)
    this.lower()
  },
  lower() {
    if (!this.data.goods.paginate.hasNext) return
    this.getGoods()
  },
})