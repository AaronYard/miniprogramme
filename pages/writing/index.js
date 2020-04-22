const App = getApp()
var util = require('../../helpers/Md5.js')    // 引入md5.js文件
Page({
  data: {
    name:'选择字体样式',
    img:'http://190.lsal.cn/189/1106.gif?01081107308619',
    array: ['美国', '中国', '巴西', '日本'],
    string:'',
    index: '',
  },
  bindPickerChange: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)

    const _self = this
    this.setData({
      index: e.detail.value,
    })
    _self.getFont()

  },

  onLoad() {
  },
  onShow() {
    //this.getUserInfo()
    this.getFont()
  },
  getUserInfo() {
    const userInfo = App.globalData.userInfo
    if (userInfo) {
      this.setData({
        'string': userInfo.nickName,
      })
     }
    },
  getFont() {
    const timestamp = Date.parse(new Date());
    const key = App.Tools.rand_key()
    const _self = this
    const uid = App.WxService.getStorageSync('user_id')
    const pack_no = "20024"
    const token = util.hexMD5(pack_no + uid + timestamp + key);  // 使用加密
    App.HttpService.getFont(
      {
        requestData: {
          "pack_no": pack_no,
          "date": timestamp,
          "user_id": uid,
          "deviceId": "357143046443542",
          "token": token,
          "roles": "",
          "data": {
            'string':_self.data.string,
            'index':_self.data.index
          }
        }
      }
    )
      .then(data => {
        if (data.status.code == '000') {
          _self.setData({
            'array': data.data.font,
            'img':data.data.src,
            'string':data.data.string
          })
        }
      })
  },

  checkboxChange: function (e) {
    var that = this;
    let checkboxValues = null;
    let checkboxItems = this.data.checkboxItems, values = e.detail.value
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i].value == values[values.length - 1]) {
        checkboxItems[i].checked = true;
        checkboxValues = checkboxItems[i].value;
      }
      else {
        checkboxItems[i].checked = false;
      }
    }
    console.log(checkboxValues)
    that.setData({ checkboxItems, checkboxValues })
  },
  bindKeyInput(e) {
    const value = e.detail.value
    this.setData({
      'string':value
    })
    this.getFont()
  }
 
})