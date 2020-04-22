const App = getApp()
var util = require('../../../helpers/Md5.js')    // 引入md5.js文件
Page({
    data: {
    	show: !0,
    	form: {
			name   : '', 
			gender : 'male', 
			tel    : '', 
			address: '', 
			is_def : !1, 
        },
        radio: [
            {
            	name: '先生', 
            	value: 'male', 
            	checked: !0, 
            },
            {
            	name: '女士', 
            	value: 'female', 
            },
        ],
    },
    onLoad() {
    	this.WxValidate = App.WxValidate({
			name: {
				required: true, 
				minlength: 2, 
				maxlength: 10, 
			},
			tel: {
				required: true, 
				tel: true, 
			},
			address: {
				required: true, 
				minlength: 2, 
				maxlength: 100, 
			},
		}, {
			name: {
				required: '请输入收货人ff姓名', 
			},
			tel: {
				required: '请输入收货人电话', 
			},
			address: {
				required: '请输入收货人地址', 
			},
		})
  },
	submitForm(e) {
		const params = e.detail.value
    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const _self = this
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20016"
    const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
		console.log(params)

		if (!this.WxValidate.checkForm(e)) {
			const error = this.WxValidate.errorList[0]
			App.WxService.showModal({
				title: '友情提示', 
					content: `${error.param} : ${error.msg}`, 
					showCancel: !1, 
			})
			return false
		}

    App.HttpService.postAddress(
      {
        requestData: {
          "pack_no": pack_no,
          "date": timestamp,
          "user_id": uid,
          "deviceId": "357143046443542",
          "token": token,
          "roles": "",
          "data": {
            'params':params
          }
        }
      }
    )
      .then(data => {
        if (data.status.code == '000') {
          this.showToast(data.data.msg)
        }
      })
		// this.address.saveAsync(params)
		// .then(data => {
		// 	console.log(data)
		// 	if (data.meta.code == 0) {
		// 		this.showToast(data.meta.message)
		// 	}
		// })
	},
	showToast(message) {
		App.WxService.showToast({
			title   : message, 
			icon    : 'success', 
			duration: 1500, 
		})
		.then(() => App.WxService.navigateBack())
	},
	chooseLocation() {
		App.WxService.chooseLocation()
	    .then(data => {
	        console.log(data)
	        this.setData({
	        	'form.address': data.address
	        })
	    })
	},
})