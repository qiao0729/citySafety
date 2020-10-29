import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import echarts from 'echarts'

//导入字体图标
import './assets/fonts/iconfont.css'


import $ from 'jquery';

import layer from 'layui-layer'
//import laydate from 'layui-laydate'

import './static/bootstrap-select/bootstrap-select.js'

//引入jquery.liMarquee滚动插件
import './static/jquery.liMarquee.js'


//引入成都地图
import './assets/js/dpxs/chengdu.js'

//引入bootstarap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './static/bootstrap-select/bootstrap-select.css'
//import 'font-awesome/css/font-awesome.css'

import x2js from 'x2js' //xml数据处理插件
Vue.prototype.$x2js = new x2js() //创建x2js对象，挂到vue原型上

//引入element ui列宽自适应组件
import ElementUI from 'element-ui'
import AFTableColumn from 'af-table-column'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(AFTableColumn)
Vue.use(ElementUI)

//导入首页粒子插件
import VueParticles from 'vue-particles'
Vue.use(VueParticles)



//导入DataV组件
//方式1：全局导入
// import DataV from '@jiaminghi/data-view'
// Vue.use(DataV)

//方式2：按需导入
// import {borderBox1} from '@jiaminghi/data-view'
// Vue.use(borderBox1)

//全局配置axios
import axios from 'axios'
//设置请求的路径
var hostname = location.hostname;


switch (hostname){
	case '222.210.108.176':
		if (!window.location.origin) {
		  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		}
		//axios.defaults.baseURL = 'http://222.210.108.176:8888/api/private/v1/';
		axios.defaults.baseURL = location.origin + "/api/private/v1/";
		break;
	case '192.168.11.254':
		axios.defaults.baseURL = 'http://192.168.11.254:8888/api/private/v1/';
		break;
	case 'localhost':
		axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
		break;
	case '192.168.128.9':
		axios.defaults.baseURL = 'http://192.168.128.9:8888/api/private/v1/';
		break;
	
}


//设置请求前的拦截器，相当于请求之前的预处理
axios.interceptors.request.use(config =>{
  var token = window.sessionStorage.getItem('token');
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
