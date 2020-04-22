import ServiceBase from 'ServiceBase'

class Service extends ServiceBase {
	constructor() {
		super()
		this.$$prefix = ''
		this.$$path = {
			wechatSignUp  : '/user/wechat/sign/up',
			//wechatSignIn: '/user/wechat/sign/in',
      wechatSignIn: '',
			//signIn      : '/user/sign/in',
      signIn        : '',
			//banner      : '/banner', 
      banner: '', 
			//classify    : '/classify', 
      classify      : '', 
			goods         : '/goods', 
			search        : '/goods/search/all', 
			cart          : '', 
			address       : '', 
			order         : '', 
      pay           : '', 
      getOpen       : '', 
      getFont: '', 
        }
	}

	wechatSignUp(params) {
		return this.postRequest(this.$$path.wechatSignUp, params)
	}

	wechatSignIn(params) {
		return this.postRequest(this.$$path.wechatSignIn, params)
	}
	
	signIn(params) {
		//return this.postRequest(this.$$path.signIn, params) 
    return this.getRequest(this.$$path.signIn, params) 
	}

	getBanners(params) {
		return this.getRequest(this.$$path.banner, params)
	}

	search(params) {
		return this.getRequest(this.$$path.search, params)
	}

	getGoods(params) {
		return this.getRequest(this.$$path.goods, params)
	}

	getClassify(params) {
		return this.getRequest(this.$$path.classify, params)
	}

	getDetail(id) {
		return this.getRequest(`${this.$$path.goods}/${id}`)
	}

	getCartByUser(params) {
		return this.getRequest(this.$$path.cart,params)
	}

	addCartByUser(params) {
		return this.getRequest(this.$$path.cart, params)
	}

	putCartByUser(params) {
		return this.getRequest(`${this.$$path.cart}`, params)
	}

	delCartByUser(id) {
		return this.deleteRequest(`${this.$$path.cart}/${id}`)
	}

	clearCartByUser() {
		return this.postRequest(`${this.$$path.cart}/clear`)
	}

	getAddressList(params) {
		return this.getRequest(this.$$path.address, params)
	}

	getAddressDetail(params) {
		return this.getRequest(`${this.$$path.address}`,params)
	}

	postAddress(params) {
		return this.getRequest(this.$$path.address, params)
	}

	putAddress(id, params) {
		return this.putRequest(`${this.$$path.address}/${id}`, params)
	}

	deleteAddress(id, params) {
		return this.deleteRequest(`${this.$$path.address}/${id}`)
	}

	getDefalutAddress(params) {
		return this.getRequest(`${this.$$path.address}`,params)
	}

	setDefalutAddress(id) {
		return this.postRequest(`${this.$$path.address}/default/${id}`)
	}

	getOrderList(params) {
		return this.getRequest(this.$$path.order, params)
	}

	getOrderDetail(id) {
		return this.getRequest(`${this.$$path.order}/${id}`)
	}

	postOrder(params) {
		return this.getRequest(this.$$path.order, params)
	}

  submitPay(params) {
    return this.getRequest(this.$$path.pay, params)
  }

  getOpen(params) {
    return this.getRequest(this.$$path.getOpen, params)
  }

  getFont(params) {
    return this.getRequest(this.$$path.getFont, params)
  }

	putOrder(id, params) {
		return this.putRequest(`${this.$$path.order}/${id}`, params)
	}

	deleteOrder(id, params) {
		return this.deleteRequest(`${this.$$path.order}/${id}`)
	}
}

export default Service