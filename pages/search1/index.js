const requestApi = require('../../utils/request.js')

const app = getApp()

Page({

  data: {

    isSearching: true,

    pageindex: 0,

    pagesize: 20,

    hotTag: ['群舞', '原创', '舞蹈', '唱歌'],

    historyTag: ['小舞蹈家', '最美童声'],

    searchData: []

  },

  onLoad(options) {



  },

  onShow() {

    this.setData({

      isSearching: true

    })

  },

  //点击搜索触发事件

  searchA(e) {

    let keywords = e.detail.value.keyword

    console.log("eeeee", e)

    if (!keywords.length) {

      wx.showToast({

        title: '不能为空',

        icon: 'loading',

        duration: 2000

      })

      return;

    }

    this.search(keywords)

  },

  //点击热门搜索触发事件

  searchHot(e) {

    let keywords = e.target.dataset.keyword;

    this.setData({

      inputVal: keywords,

    })

    this.search(keywords)

  },

  //接口配置

  search(keywords) {

    let params = {

      appid: app.appId,

      openid: app.openId,

      pageindex: this.data.pageindex,

      pagesize: this.data.pagesize,

      secret: app.secret,

      keywords

    }

    let urlPath = '/api/item/search'

    requestApi.doPost(urlPath, params, res => {

      console.log('搜索接口', res);

      this.setData({

        searchData: res.data,

        isSearching: false,

      });



    })

  },



})