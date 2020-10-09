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
import "../../assets/js/urbanPublicSafety/china.js";

export default {
	data(){
		return{
			//用于存储对应地名对应的经纬度
			coordMap:'',
			cdInData:[],
			chinaGeoCoordMap:{},
            chinaDatas:[],
            targetCity:'成都市',
            targetCoord:[104.06, 30.67],
		}
	},
	mounted(){
		this.$nextTick(function(){
			this.baiduQx();//百度迁徙模拟加载
		})
	},
	watch: {
		chinaDatas(newValue, oldValue){
			if(newValue.length == this.cdInData.length && newValue.length>0){
				this.showData();
			}
		}
	},

	//利用watcher来监听数据
	methods: {
		//百度迁徙模拟
	async	baiduQx(){
			//连接后端接口获取数据
            this.cdInData = await this.getData();
            console.log(this.cdInData)
			var that = this;
		
	//根据获取的数据构造chinaGeoCoordMap 和 chinaDatas  注意：chinaDatas中的value需为获取后端value除以100
			for(let item of this.cdInData){
				var myGeo = new BMap.Geocoder();//注：该处要加上市才能正确的解析
			    myGeo.getPoint(item.province_name + item.city_name,function(point){
					 if(point){
                            var coord = [];
                            coord.push(point.lng);
                            coord.push(point.lat);
							that.chinaGeoCoordMap[item.city_name] = coord;
							var temp = {
								name:item.city_name,
								value:((item.value/10).toFixed(2))
                            }
                            var tempArr = [];
                            tempArr.push(temp)
							that.chinaDatas.push(tempArr);
					 }
			});
			}
		
		},

		showData(){
            var that = this;
            
            //往chinaGeoCoordMap里push进目标结点的坐标
            that.chinaGeoCoordMap[that.targetCity] = that.targetCoord;


            var myChart = this.$echarts.init(document.getElementById('map_qx'));
            

        var convertData = function(data) {
            var res = [];
            for(var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = that.chinaGeoCoordMap[dataItem[0].name];
                var toCoord = that.targetCoord;
                if(fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord,
                        value: dataItem[0].value,
                        name:dataItem[0].name
                    }, {
                        coord: toCoord,
                    }]);
                }
            }
            return res;
        };
        var series = [];
        [[that.targetCity, that.chinaDatas]].forEach(function(item, i) {
            series.push({
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 4, //箭头指向速度，值越小速度越快
                        trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                        symbol: 'arrow', //箭头图标
                        symbolSize: 5, //图标大小
                    },
                    lineStyle: {
                        normal: {
                            width: 1, //尾迹线条宽度
                            opacity: 1, //尾迹线条透明度
                            curveness: .3 //尾迹线条曲直度
                        }
                    },
                    data: convertData(item[1])
                }, {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: { //涟漪特效
                        period: 4, //动画时间，值越小速度越快
                        brushType: 'stroke', //波纹绘制方式 stroke, fill
                        scale: 4 //波纹圆环最大限制，值越大波纹越大
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right', //显示位置
                            offset: [5, 0], //偏移设置
                            formatter: function(params){//圆环显示文字
                                return params.data.name;
                            },
                            fontSize: 13
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    symbol: 'circle',
                    symbolSize: function(val) {
                        return 5+ val[2] * 5; //圆环大小
                    },
                    itemStyle: {
                        normal: {
                            show: false,
                            color: '#f00'
                        }
                    },
                    data: item[1].map(function(dataItem) {
                        return {
                            name: dataItem[0].name,
                            value: that.chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                        };
                    }),
                },
                //被攻击点
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        period: 4,
                        brushType: 'stroke',
                        scale: 4
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            //offset:[5, 0],
                            color: '#0f0',
                            formatter: '{b}',
                            textStyle: {
                                color: "#0f0"
                            }
                        },
                        emphasis: {
                            show: true,
                            color: "#f60"
                        }
                    },
                    symbol: 'pin',
                    symbolSize: 50,
                    data: [{
                        name: item[0],
                        value: that.chinaGeoCoordMap[item[0]].concat([10]),
                    }],
                }
            );
        });

       var option = {
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(166, 200, 76, 0.82)',
                borderColor: '#FFFFCC',
                showDelay: 0,
                hideDelay: 0,
                enterable: true,
                transitionDuration: 0,
                extraCssText: 'z-index:100',
                formatter: function(params, ticket, callback) {
                    //根据业务自己拓展要显示的内容
                    var res = "";
                    var name = params.name;
                    var value = params.value *10;
                    res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                    return res;
                }
            },
            /*backgroundColor:"#013954",*/
            visualMap: { //图例值控制
                min: 0,
                max: 1,
                calculable: true,
                show: false,
                color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: 'china',
                zoom: 1.2,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true, //是否允许缩放
                itemStyle: {
                    normal: {
                        color: 'rgba(51, 69, 89, .5)', //地图背景色
                        borderColor: '#516a89', //省市边界线00fcff 516a89
                        borderWidth: 1
                    },
                    emphasis: {
                        color: 'rgba(37, 43, 61, .5)' //悬浮背景
                    }
                }
            },
            series: series
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });

		},
		// async baiduQx() {
		// 	//从数据库中获取流入成都的相关数据
		// 	var cdInData = await this.getData();
		// 	//返回对应地名的经纬度 因为百度迁徙的数据中只有名字没有经纬度
		// 	//console.log(cdInData);

		// 	//存储迁入迁出城市的坐标
		// 	this.coordMap = new Map();

		// 	var transCoord = await this.getCoord(cdInData[0].city_name);

		// 	//console.log(cdInData);
		// 	//cdInData为一个数组，每一个数组元素为一个对象也就是一条消息，有以下属性字段：city_name:城市名 provice_name:省名 value：所占比例
		// 	//自我感觉百度慧眼的实现是通过百度地图加echarts实现的，所以可以先展示一个百度地图，然后看看怎么在百度地图上添加echarts图表
		// 	var map = new BMap.Map("map_qx"); // 创建Map实例
		// 	map.centerAndZoom(new BMap.Point(104.06, 30.67), 11); // 初始化地图,设置中心点坐标和地图级别
		// 	//添加地图类型控件
		// 	var size1 = new BMap.Size(10, 50);
		// 	map.addControl(
		// 	  new BMap.MapTypeControl({
		// 	    offset: size1,
		// 	    mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
		// 	  })
		// 	);
			
			
		// 	map.setCurrentCity("成都"); // 设置地图显示的城市 此项是必须设置的
		// 	map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
		// 	//设备地图颜色
		// 	var mapStyle = {
		// 	  style: "midnight",
		// 	};
		// 	map.setMapStyle(mapStyle);
			
		// 	//加载城市控件
		// 	var size = new BMap.Size(10, 50);
		// 	map.addControl(
		// 	  new BMap.CityListControl({
		// 	    anchor: BMAP_ANCHOR_TOP_LEFT,
		// 	    offset: size,
		// 	  })
		// 	);
			
		// },
		async getData(){
		  const {data: res} = await this.$http.get("LBS/baiduHy/cdIn");
		  return res.data;
		},
		//根据名字获取对应地名的坐标
		getCoord(name){
			var that = this;
			var myGeo = new BMap.Geocoder();
			myGeo.getPoint(name, async function(point){
				var coord = [point.lng,point.lat];
				that.coordMap.set(name,coord);
				//return point;
			});
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

#map_qx{
	width: 100%;
	height:92vh;
}
</style>