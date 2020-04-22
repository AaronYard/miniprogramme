const App = getApp()
var util = require('../../../helpers/Md5.js')    // 引入md5.js文件
Page({
    data: {
    	show: !0,
      edit_address:'',
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
    onLoad(option) {
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
				required: '请输入收货人姓名', 
			},
			tel: {
				required: '请输入收货人电话', 
			},
			address: {
				required: '请输入收货人地址', 
			},
		})

    	this.address = App.HttpResource('')
    	this.setData({
    		id: option.id
    	})
    },
    onShow() {
    	this.renderForm(this.data.id)
    },
    renderForm(id) {
      const timestamp = Date.parse(new Date());
      const key = App.Tools.rand_key()
      const uid = App.WxService.getStorageSync('user_id')
      const pack_no = "20018"
      const _self = this
      const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
    	this.address.getAsync(
        {
          requestData: {
            "pack_no": pack_no,
            "date": timestamp,
            "user_id": uid,
            "deviceId": "357143046443542",
            "token": token,
            "roles": "",
            "data": {
              'id': id
            }
          }
        }
      )
		.then(data => {
      console.log(43434)
			console.log(data)
			if (data.status.code == '000') {
				const params = {
					name   : data.data.info.name, 
					gender : data.data.info.gender, 
					tel    : data.data.info.tel, 
          address: _self.data.edit_address ? _self.data.edit_address:data.data.info.address, 
					is_def : data.data.info.is_def, 
				}

				const radio = this.data.radio
				radio.forEach(n => n.checked = n.value === data.data.info.gender)

				this.setData({
					show : !params.is_def, 
					radio: radio, 
					form : params, 
				})
			}
		})
    },
	submitForm(e) {
		const params = e.detail.value
    params.id = this.data.id

    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20016"
    const _self = this
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

		// App.HttpService.putAddress(id, params)
		this.address.getAsync(
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
				this.showToast(data.data.msg)
			}
		})
	},
  delete() {
    const id = this.data.id

    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20019"
    const _self = this
    const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
    this.address.getAsync(
      {
        requestData: {
          "pack_no": pack_no,
          "date": timestamp,
          "user_id": uid,
          "deviceId": "357143046443542",
          "token": token,
          "roles": "",
          "data": {
            'id': id
          }
        }
      }
    )
      .then(data => {
        console.log(data)
        if (data.status.code == '000') {
          this.showToast(data.data.msg)
        }
      })
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
	        	'edit_address': data.address
	        })
	    })
	},
})