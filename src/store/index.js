import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localURL:'http://localhost:8089',
	  pointData:"",//轨迹点数据
	  chooseOrderID:'',//当前选择展示轨迹的订单ID
	  chooseCarID:'',//当前选择展示轨迹的司机ID
    orderData:'',//展示订单列表的数据
    orderDateMap:'',//订单对应的时间
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
