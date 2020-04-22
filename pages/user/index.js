const App = getApp()

Page({
	data: {
		userInfo: {},
    user_id:'',
		items: [
			{
				icon: '../../assets/images/iconfont-order.png',
				text: '我的订单',
				path: '/pages/order/list/index'
			}, 
			{
				icon: '../../assets/images/iconfont-addr.png',
				text: '收货地址',
				path: '/pages/address/list/index'
			}, 
			{
				icon: '../../assets/images/iconfont-kefu.png',
				text: '联系客服',
				path: '18521708248',
			}, 
			{
				icon: '../../assets/images/iconfont-help.png',
				text: '常见问题',
				path: '/pages/help/list/index',
			},
		],
		settings: [
			{
				icon: '../../assets/images/iconfont-clear.png',
				text: '清除缓存',
				path: '0.0KB'
			}, 
			{
				icon: '../../assets/images/iconfont-about.png',
				text: '关于我们',
				path: '/pages/about/index'
			}, 
      {
        icon: '../../assets/images/signature.png',
        text: '个性签名',
        path: '/pages/writing/index'
      },
		]
	},
	onLoad() {
		this.getUserInfo()
	},
	onShow() {
    this.getUserInfo()
		this.getStorageInfo()
	},
	navigateTo(e) {
		const index = e.currentTarget.dataset.index
		const path = e.currentTarget.dataset.path

		switch(index) {
			case 2:
				App.WxService.makePhoneCall({
					phoneNumber: path
				})
				break
			default:
				App.WxService.navigateTo(path)
		}
    },
    getUserInfo() {
    	const userInfo = App.globalData.userInfo
		if (userInfo) {
      console.log(1)
      console.log(App.WxService.getStorageSync('user_id'))
      console.log()
			this.setData({
        'user_id': App.WxService.getStorageSync('user_id'),
        'userInfo.nickName': userInfo.nickName,
        'userInfo.avatarUrl': userInfo.avatarUrl//:'../../assets/images/default_avatar.png'
			})
			return
		}

		App.getUserInfo()
		.then(data => {
			console.log(data)
			this.setData({
				userInfo: data
			})
		})
    },
    getStorageInfo() {
    	App.WxService.getStorageInfo()
    	.then(data => {
    		console.log(data)
    		this.setData({
    			'settings[0].path': `${data.currentSize}KB`
    		})
    	})
    },
    bindtap(e) {
    	const index = e.currentTarget.dataset.index
		const path = e.currentTarget.dataset.path

		switch(index) {
			case 0:
				App.WxService.showModal({
		            title: '友情提示', 
		            content: '确定要清除缓存吗？', 
		        })
		        .then(data => data.confirm == 1 && App.WxService.clearStorage())
				break
			default:
				App.WxService.navigateTo(path)
		}
    },

  onGotUserInfo: function (e) {
      if (e.detail.errMsg == 'getUserInfo:ok') {
        var rawData = e.detail.rawData;
        var signature = e.detail.signature;
        var encryptData = e.detail.encryptData;
        var _self = this
        var encryptedData = e.detail.rawData; //注意是encryptedData不是encryptData...坑啊
        var iv = e['iv'];
        if (App.WxService.getStorageSync('token')) return
        wx.login({
          success: function (res) {
            var code = res['code'];
            //3.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
            App.HttpService.signIn(
              {
                requestData: {
                  "pack_no": "20004",
                  "date": "1453433081",
                  "user_id": "29a19\/vIvTNq27jFuUVhxo7A2bQNjeK|jia|Q\/BAn1\/MGDM",
                  "deviceId": "357143046443542",
                  "token": "0cfe026ca00c70bb8fb8fb28eee5f139",
                  "roles": "",
                  "data":
                  {
                    "code": code,
                    "rawData": rawData,
                    "signature": signature,
                    "encryptData": encryptData,
                    'iv': iv,
                    'encryptedData': encryptedData
                  }
                }
              }
            )
              .then(data => {
                console.log(545454545)
                console.log(data.data.token)
                console.log(data.status.code)
                if (data.status.code == '000') {
                  App.WxService.setStorageSync('token', data.data.token)
                  App.WxService.setStorageSync('user_id', data.data.id)
                  _self.getUserInfo()
                  // App.WxService.switchTab({
                  //   url: '/pages/index/index'
                  // })
                }
              })
          }
        })


      }
  },
})