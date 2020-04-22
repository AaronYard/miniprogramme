const App = getApp()

Page({
	data: {
		logged: !1
	},
    onLoad() {},
    onShow() {
    	const token = App.WxService.getStorageSync('token')
    	this.setData({
    		logged: !!token
    	})
    	token && setTimeout(this.goIndex, 1500)
    },
    login() {
    	//this.signIn(this.goIndex)
      this.wxLogin(this.goIndex)
    },
    goIndex() {
    	App.WxService.switchTab({
    		url: '/pages/index/index'
    	})
    },
	showModal() {
		App.WxService.showModal({
            title: '友情提示', 
            content: '获取用户登录状态失败，请重新登录', 
            showCancel: !1, 
        })
	},
	wechatSignIn(cb) {
		if (App.WxService.getStorageSync('token')) return
		App.WxService.login()
		.then(data => {
			console.log('wechatSignIn', data.code)
			return App.HttpService.wechatSignIn({
				code: data.code
			})
		})
		.then(data => {
			console.log('wechatSignIn', data)
			if (data.meta.code == 0) {
				App.WxService.setStorageSync('token', data.data.token)
				cb()
			} else if(data.meta.code == 40029) {
				App.showModal()
			} else {
				App.wechatSignUp(cb)
			}
		})
	},
	wechatSignUp(cb) {
		App.WxService.login()
		.then(data => {
			console.log('wechatSignUp', data.code)
			return App.HttpService.wechatSignUp({
				code: data.code
			})
		})
		.then(data => {
			console.log('wechatSignUp', data)
			if (data.meta.code == 0) {
				App.WxService.setStorageSync('token', data.data.token)
				cb()
			} else if(data.meta.code == 40029) {
				App.showModal()
			}
		})
	},
  //登录
	signIn(cb) {
		if (App.WxService.getStorageSync('token')) return
		App.HttpService.signIn(
      { requestData: { "pack_no": "20004", "date": "1453433081", "user_id": "29a19\/vIvTNq27jFuUVhxo7A2bQNjeK|jia|Q\/BAn1\/MGDM", "deviceId": "357143046443542", "token": "0cfe026ca00c70bb8fb8fb28eee5f139", "roles": "", "data": { "name": "11", "title": "11", "member_name": "1112", "nums": "123456" } } }
    )
		.then(data => {
      console.log(data.data.token)
			if (data.status.code == '000') {
				App.WxService.setStorageSync('token', data.data.token)
				cb()
			}
		})
	},

  onGotUserInfo: function (e) {
    console.log(e)
    if (e.detail.errMsg =='getUserInfo:ok'){
      var rawData = e.detail.rawData;
      var signature = e.detail.signature;
      var encryptData = e.detail.encryptData;
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
                App.WxService.switchTab({
                  url: '/pages/index/index'
                })
              }
            })
        }
      })


    }
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  /**
* 登录
*/
  wxLogin(cb) {
    //调用登录接口
    //1.小程序调用wx.login得到code.
    if (App.WxService.getStorageSync('token')) return
    wx.login({
      success: function (res) {
        var code = res['code'];
        //2.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
        wx.getUserInfo({
          success: function (info) {
            var rawData = info['rawData'];
            var signature = info['signature'];
            var encryptData = info['encryptData'];
            var encryptedData = info['encryptedData']; //注意是encryptedData不是encryptData...坑啊
            var iv = info['iv'];
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
                console.log(5555555)
                console.log(data)
                if (data.status.code == '000') {
                  App.WxService.setStorageSync('token', data.data.token)
                  App.WxService.switchTab({
                    url: '/pages/index/index'
                  })
                }
              })
          }
        });
      }
    })
  }  
})