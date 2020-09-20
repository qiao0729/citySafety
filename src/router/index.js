import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'

//城市公共安全
import urbanPublicSafety from '../components/urbanPublicSafety.vue'

//城市公共安全监测系统下的详情页面
import Nature from '../components/UPS/Nature.vue'
import Accident from '../components/UPS/Accident.vue'
import Health from '../components/UPS/Health.vue'
import Social from '../components/UPS/Social.vue'
import Warning from '../components/UPS/Warning.vue'

//海康威视视频展示
import Hik from '../components/UPS/Hik.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    
    //城市公共安全
	{
		path: '/urbanPublicSafety',
		name: 'urbanPublicSafety',
		component: urbanPublicSafety
  },
  //城市公共安全监测系统下的详情页面
	//自然灾害
	{
		path: '/Nature',
		name: 'Nature',
		component: Nature
	},

	//事故灾难
	{
		path: '/Accident',
		name: 'Accident',
		component: Accident
	},

	//公共卫生
	{
		path: '/Health',
		name: 'Health',
		component: Health
	},

	//社会安全
	{
		path: '/Social',
		name: 'Social',
		component: Social
	},

	//预警
	{
		path: '/Warning',
		name: 'Warning',
		component: Warning
	},
  	//海康威视视频展示
	{
		path: '/Hik',
		name: 'Hik',
		component: Hik
	},
  

]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === '/login') {
    window.sessionStorage.clear();
    return next()
  } else {
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) {
      return next('/login')
    } else {
      next()
    }
  }
  })

export default router
