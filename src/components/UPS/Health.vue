<template>
  <div id="health">
    <meta charset="UTF-8">
    <title>公共卫生安全</title>
     <!--顶部-->
    <header class="header left">
      <div class="left nav">
        <ul>
          <li >
            <i class="nav_1"></i>
            <router-link class="dhTitle" :to="{ name: 'urbanPublicSafety'}">信息总览</router-link>
          </li>
          <li>
            <i class="nav_2"></i>
             <router-link class="dhTitle" :to="{ name: 'Nature'}">自然灾害</router-link>
          </li>
          <li>
            <i class="nav_3"></i>
            <router-link class="dhTitle" :to="{ name: 'Accident'}">事故灾难</router-link>
          </li>
        </ul>
      </div>
      <div class="header_center left">
       <span class='centerTitle'>
          城市公共安全信息监测系统
        </span> 
      </div>
      <div class="right nav text_right">
        <ul>
          <li class="nav_active">
            <i class="nav_7"></i>
            <router-link class="dhTitle" :to="{ name: 'Health'}">公共安全</router-link>
          </li>
          <li>
            <i class="nav_8"></i>
             <router-link class="dhTitle" :to="{ name: 'Social'}">社会安全</router-link>
          </li>
          <li>
            <i class="nav_4"></i>
           <router-link class="dhTitle" :to="{ name: 'Warning'}">预警信息</router-link>
          </li>
        </ul>
      </div>
    </header>
    <!--内容部分-->
<div class="con left" id="map_qx">
</div>
  </div>
</template>

<script>
import "../../assets/js/urbanPublicSafety/jquery-1.10.2.js";
import "../../assets/js/urbanPublicSafety/echarts-4.2.1.min.js";
import "../../assets/js/urbanPublicSafety/base.js";
import "../../assets/js/urbanPublicSafety/static.js";
export default {
	data(){
		return{
			
		}
	},
	mounted(){
		this.$nextTick(function(){
			this.baiduQx();//百度迁徙模拟加载
		})
	},
	methods: {
		//百度迁徙模拟
		async baiduQx() {
			//从数据库中获取流入成都的相关数据
			var cdInData = await this.getData();
			//返回对应地名的
			//console.log(cdInData);
			//cdInData为一个数组，每一个数组元素为一个对象也就是一条消息，有以下属性字段：city_name:城市名 provice_name:省名 value：所占比例
			//自我感觉百度慧眼的实现是通过百度地图加echarts实现的，所以可以先展示一个百度地图，然后看看怎么在百度地图上添加echarts图表
			var map = new BMap.Map("map_qx"); // 创建Map实例
			map.centerAndZoom(new BMap.Point(104.06, 30.67), 11); // 初始化地图,设置中心点坐标和地图级别
			//添加地图类型控件
			var size1 = new BMap.Size(10, 50);
			map.addControl(
			  new BMap.MapTypeControl({
			    offset: size1,
			    mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
			  })
			);
			
			
			map.setCurrentCity("成都"); // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
			//设备地图颜色
			var mapStyle = {
			  style: "midnight",
			};
			map.setMapStyle(mapStyle);
			
			//加载城市控件
			var size = new BMap.Size(10, 50);
			map.addControl(
			  new BMap.CityListControl({
			    anchor: BMAP_ANCHOR_TOP_LEFT,
			    offset: size,
			  })
			);
			
		},
		async getData(){
		  const {data: res} = await this.$http.get("LBS/baiduHy/cdIn");
		  return res.data;
		},
		//根据名字获取对应地名的坐标
		getCoord(name){
			var myGeo = new BMap.Geocoder();
			var point = myGeo.getPoint(myGeo);
		}
	},
}
</script>

<style scope>
  /* 引入外部css样式 */
  @import "../../assets/css/urbanPublicSafety/base.css";
  @import "../../assets/css/urbanPublicSafety/zTreeStyle/zTreeStyle.css";
#health {
    width: 100vw;
    height: 100vh;
    background-color: #10171E !important;
  }
.centerTitle{
  font-size:2rem !important;
  margin:0 auto;
}
.dhTitle{
  font-size:1.5rem;
}

.header {
  height: 8vh !important;
}

.con{
	height: 92vh;
	background-color: #10171E !important;
}
</style>