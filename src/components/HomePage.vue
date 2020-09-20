<template>
  <div class="body-bg">
    <div class="header">
      <div class="home-btn" title="退出登录" @click="exit"></div>

      <!-- <img src="../assets/img/home\logo.png" alt="">
      
      可在此加上公司logo-->
     <p>ERP系统可视化平台</p>
    </div>

    <img class="sci-wheel" src="../assets/img/home\sci.gif" alt />

    <div class="center">
      <span class="list fn_1 moveUpDownFla1 menu menu-title">
        <p class="menu-title">大屏显示</p>
        <ul class="menu-dropdown">
          <li :key="index" v-for="(item,index) in dropMenu.dpxs">
             <router-link :to="item.to"> {{item.title}}</router-link>
           </li>
        </ul>
      </span>
      <span class="list fn_2 moveUpDownFla1 menu menu-title">
        <p class=" menu-title">经营过程实时图表</p>
        <ul class="menu-dropdown">
          <li :key="index" v-for="(item,index) in dropMenu.jygc">
           <router-link :to="item.to"> {{item.title}}</router-link>
          </li>
        </ul>
      </span>
      <span class="list fn_3 moveUpDownFla1 menu menu-title">
        <p class="menu-title ">经营结果图表</p>
        <ul class="menu-dropdown">
          <li :key="index" v-for="(item,index) in dropMenu.jyjg">
            <router-link :to="item.to"> {{item.title}}</router-link>
          </li>
        </ul>
      </span>
      <span class="list fn_4 moveUpDownFla1 menu menu-title">
        <p class="menu-title ">大数据趋势分析及智慧工厂</p>
        <ul class="menu-dropdown">
          <li :key="index" v-for="(item,index) in dropMenu.dsjfx">
            <router-link :to="item.to"> {{item.title}}</router-link>
          </li>
        </ul>
      </span>
    </div>

    <!--流星-->
    <div class="liuxing liuxing1 liuxingFla"></div>
    <div class="liuxing liuxing2 liuxingFla2"></div>
    <div class="liuxing liuxing3 liuxingFla3"></div>
    <div class="liuxing liuxing4 liuxingFla4"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropMenu: {
        dpxs:[
        {
          title:'生产及库存',
          to:'/dpxs/scjkc'
        },
        {
          title:'财务统计数据',
          to:'/dpxs/cwtjsj'
        }],
        jygc:[
        {
          title:'运营统计',
          to:'/jygc/yytj'
        },
        {
          title:'生产成本统计',
          to:'/jygc/sccbtj'
        },
        {
           title:'物资采购报表',
          to:'/jygc/wzcgbb'
        },
        {
           title:'搅拌车物流费',
          to:'/jygc/jbcwlf'
        },
        {
          title:'泵送成本',
          to:'/jygc/bscb'
        },
        ],
        jyjg:[
        {
          title:'参加大屏2界面',
          to:'/jyjg/dp2'
        },
         {
          title:'人事分析',
          to:'/jyjg/rsfx'
        }],
        dsjfx:[{
          title:'混凝土成本预测',
          to:'/dsjfx/hntcbyc'
        }]
      }
    }
  },
  methods: {
    exit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
 @import "../assets/css/home/dropMenu.css"; 
 .router-link-active {    
  text-decoration: none !important;
  color: inherit !important;
}
 a {
  text-decoration: none !important;
  color:inherit !important;
 }
.body-bg {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background: url(../assets/img/home/bg_1.jpg);
  background-size: cover;
  font-size: 62.5%;
}
.fn_1 {
  width: 25rem;
  height: 22rem;
  background: url(../assets/img/home/fn_1.png);
  background-size: cover;
}
.fn_1:hover {
  background: url(../assets/img/home/fn_1_h.png);
  background-size: cover;
}

.fn_2 {
  width: 25rem;
  height: 22rem;
  background: url(../assets/img/home/fn_2.png);
  background-size: cover;
}
.fn_2:hover {
  background: url(../assets/img/home/fn_2_h.png);
  background-size: cover;
}

.fn_3 {
  width: 25rem;
  height: 22rem;
  background: url(../assets/img/home/fn_3.png);
  background-size: cover;
}
.fn_3:hover {
  background: url(../assets/img/home/fn_3_h.png);
  background-size: cover;
}
.fn_4 {
  width: 29rem;
  height: 22rem;
  background: url(../assets/img/home/fn_3.png);
  background-size: cover;
}
.fn_4:hover {
  background: url(../assets/img/home/fn_3_h.png);
  background-size: cover;
}
.moveUpDownFla1{
    transition: 0.3s background-color;
}

.sci-wheel {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
}

.header {
  width: 100%;
  height: 100px;
  line-height: 100px;
  padding: 0 40px;
  background: rgba(0, 0, 0, 0.3);
}
.header img {
  float: left;
  margin: 10px 10px;
  width: 100px;
}
.header p {
  float: inherit;
  text-align: center;
  font-size: 50px; color: white;
  text-shadow: 0 0 1px #999,    
             1px 1px 1px #888,    
             2px 2px 1px #777,    
             3px 3px 1px #666,    
             4px 4px 1px #555,    
             5px 5px 1px #444; 
  letter-spacing: 3px;
}
.header .home-btn {
  float: left;
  margin-top: 20px;
  width: 74px;
  height: 74px;
  border: 1px solid #102262;
  border-radius: 5px;
  background: url(../assets/img/home/login/icon.png) no-repeat center center;
  background-size: 45% 45%;
  cursor: pointer;
}
.home-btn:hover{
  border: 1px solid #616210;
}
.center {
  position: absolute;
   top: -10px;
  bottom: 10px; 
  left: 0px;
  right: 9rem;
  margin: auto;
  width: 90vw;
  height: 250px;
  /* bottom: 300px; */
  margin-top: 230px;
  display: flex !important;
  flex-wrap: nowrap !important;
  justify-content: space-around !important;
  align-items:center !important;
}
.center .list {
  display: block;
  float: left;
  margin: 0 2rem;
}
.center .list p {
  text-align: center;
  color: #00baf1;
  font-size: 24px;
  margin-top: 24rem;
}

/* 修改下拉列表的线的样式，使其居中 */
.menu-dropdown{
  margin-left: auto !important;
  margin-right: auto !important;
  border: 2px solid #032d60;
  box-shadow: inset 0 0 10px #07417a;
  background-color: #0b0b1d !important;
}

.menu-dropdown li{
	font-size: 20px;
	color: white;
	line-height: 30px;
}

.menu-dropdown li:hover{
	color: #00baf1;
	font-size: 22px;
}
</style>