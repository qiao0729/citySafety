<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  provide (){
	  return{
		  reload:this.reload
	  }
  },
  data() {
  	return {
  		isRouterAlive: true
  	}
  },
  mounted(){
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      window.addEventListener('hashchange', () => {
        debugger;
          let currentPath = window.location.hash.slice(1)
          if (this.$route.path !== currentPath) {
              this.$router.push(currentPath);// 主动更改路由界面
          }
      }, false);
  }
},
  methods: {
  	reload() {
  		this.isRouterAlive = false;
		this.$nextTick(function(){
			this.isRouterAlive = true;
		})
  	}
  },
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
