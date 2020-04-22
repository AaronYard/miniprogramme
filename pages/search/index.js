const App = getApp()
Page({
    data: {
      text:'土狗',
        inputShowed: false,
        inputVal: ""
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    goSearch(){
      const keyword = this.data.inputVal
      if(!keyword){
        this.showModal()
        return false;
      }
      App.WxService.navigateTo('/pages/goods/list/index', {
        keyword: keyword
      })
    },
  showModal() {
    App.WxService.showModal({
      title: '友情提示',
      content: '关键词不能为空',
      showCancel: !1,
    })
  },
    // 点击键盘上的搜索
  bindconfirm: function (e) {
    var that = this;
    var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    this.setData({
      inputVal: discountName
    })
    this.goSearch()
  },
});