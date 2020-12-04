<template>
	<div class="content-body">
		<div class="header">
		<div class="left nav left-box">
            <el-dropdown hide-on-click>
              <div class="menu_title">
              <i class="el-icon-s-unfold"></i>
           <span class="el-dropdown-link">自然灾害<i class="el-icon-arrow-down el-icon--right"></i></span>
           </div>
           <el-dropdown-menu slot="dropdown" class="dropdown" >
						 	<dropMenu></dropMenu>
            </el-dropdown-menu>
         </el-dropdown>
         
      </div>
      <div class="header_center left">
        <timeRecord></timeRecord>
      </div>
      <!-- 头部右侧区域 -->
      <div class="right nav text_right" >
          <el-dropdown size="mini" hide-on-click placement="bottom-start" >
            <titleRight></titleRight>
         </el-dropdown>
         </div>
		</div>

		<div class="content">
			<div class="content-con">
				<div class="left-body">
					<div class="left-top public-bg">
						<div class="public-title">成都实时天气</div>
						<div class="title-nav" id="sstq">
							<!-- 显示天气 -->
							<div class="weather">
								<img id="wheatherImg" :src="weatherImgURL" />
								<div id="wheather">
									<p>{{weatherCity }}</p>
									<p>{{weatherTemp}}℃</p>
								</div>
								<div id="wheatherContent">
									<p>{{weather}}</p>
									<p>{{weatherTemp2}} ~ {{weatherTemp1}}℃</p>
								</div>
							</div>
							<!-- 分割线 -->
							<div style="background:linear-gradient(to left,#AFEEEE,	#0000FF,#AFEEEE);height:1px;"></div>
							<!-- 展示湿度等 -->
							<div class="weatherDetal">
								<p>{{weatherDetal}}</p>
							</div>
						</div>
					</div>
					<div class="left-con public-bg">
						<div class="public-title">一周天气</div>
						<div class="title-nav" id="wltq">
							<!-- 利用table来展示 -->
							<div class="head">
								<span class="col">时间</span>
								<span class="col">天气</span>
								<span class="col">温度</span>
								<span class="col">描述</span>
							</div>
							<div class="content">
								<div class="marquee">
									<div class="row" :key="index" v-for="(item,index) in hoursData">
										<span class="col">{{item.hour}}</span>
										<img class="wheatherImg1 col colImg" :src="item.weatherImgURL" />
										<span class="col col1">{{item.tem}}</span>
										<span class="col col1 col2">{{item.wea}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="left-bottom public-bg">
						<div class="public-title" style="display:none">降水量</div>
						<div class="title-nav" id="jsl"></div>
					</div>
				</div>

				<div class="center-body">
					<div class="map" id="container"></div>
				</div>

				<div class="right-body">
					<div class="right-top public-bg">
						<div class="public-title">视频监控区域1</div>
						<div class="title-nav" id="divPlugin"></div>
					</div>
					<div class="right-con public-bg">
						<div class="public-title">视频监控区域2</div>
						<div class="title-nav" id="divPlugin1"></div>
					</div>
					<div class="right-bottom public-bg">
						<div class="public-title">视频监控区域3</div>
						<div class="title-nav" id="divPlugin2"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import "../../static/hik/china.js";
	import "../../static/hik/index.js";
	import { WebVideoCtrl } from "../../static/webVideoCtrl.js";
	import echarts from 'echarts';
	import dropMenu from '../publicComponents/dropMenu'
	import titleRight from '../publicComponents/titleRight'
  import timeRecord from '../publicComponents/timeRecord'
	export default {
		components: {
      dropMenu,
      titleRight,
      timeRecord
    },
		data() {
			return {
				fontColor: "#fff",
				chartName: {
					chart1: "",
					chart2: "",
					chart3: "",
					chart4: "",
					center: "",
				},
				hkvInfo: {
					ip: "192.168.128.64", //海康威视摄像头/硬盘录像机的ip地址
					port: "80", //海康威视摄像头/硬盘录像机的端口
					username: "admin", //海康威视摄像头/硬盘录像机的用户名
					password: "scuimage508", //海康威视摄像头/硬盘录像机的密码
					channels: [], //海康威视摄像头/硬盘录像机的通道
				},

				//摄像头列表
				camreaList: [{
						lng: 104.068916,
						lat: 30.667522,
						title: "ip64",
						id: "192.168.128.64",
					},
					{
						lng: 103.984979,
						lat: 30.709261,
						title: "ip65",
						id: "192.168.128.65",
					},
					{
						lng: 103.987278,
						lat: 30.627754,
						title: "ip162",
						id: "192.168.128.162",
					},
					{
						lng: 104.070066,
						lat: 30.594932,
						title: "ip201",
						id: "192.168.128.201",
					}, //有时候调不出来，所以目前就先屏蔽
					{
						lng: 104.153429,
						lat: 30.69386,
						title: "ip110",
						id: "192.168.128.110",
					},
				],
				mySelectWnd: 0, //当前选中的窗口  20200913 利用nvr登录，然后选择不同的窗口
				g_bPTZAuto: false,
				iProtocol: 1,
				loginLoading: false,
				startPlayLoading: false,
				iStreamType: 1,
				bZeroChannel: false,
				iRtspPort: 0,

				// 天气API获取的相关数据
				timeWheather: "", //实况天气
				sevenDaysWheather: "", //未来7日天气
				precipitation: "", //降水量

				//天气图片
				weatherImgURL: require("../../static/img/durian/qing.png"),
				weatherCity: "成都", //当前显示天气的城市
				weatherTemp: "0", //实时温度
				weatherTemp1: "0", //高温
				weatherTemp2: "0", //低温
				weather: "晴", //今天的天气描述
				// air:'0',
				// air_level:"良",
				// air_tips:'',
				// air_pm25:'0'
				weatherDetal: "fetea",

				//展示一天实时的天气时的数据
				hoursData: [],
			};
		},
		mounted() {
			this.$nextTick(function() {
				this.getWeatherData();
				this.char3();
				this.char4();
				this.center();
				//this.centerMap();
				this.videoInitPlugin(); // 初始化video界面
				this.onLogin(); //登录 20200904 添加ip参数
				this.clickStartRealPlay(); //开始预览

				window.addEventListener("resize", () => {
					console.log("尺寸变化");
					this.chartName.chart1.resize();
					// this.chartName.chart2.resize();
					this.chartName.chart3.resize();
					this.chartName.chart4.resize();
				});

				let that = this;
				if (this.timer) {
					clearInterval(this.timer);
				} else {
					//前端定时刷新
					this.timer = setInterval(function() {
						that.getTime();
					}, 1000);
				}
			})
    },
		//vue实例销毁的时候清除定时器
		destroyed() {
			clearInterval(this.timer);
			this.clickStopRealPlay();
			this.onLogout();
		},
		methods: {
			getWeatherData() {
				var self = this;
				//调用的天气API 的免费实况天气接口
				$.getJSON(
					"https://tianqiapi.com/api?version=v6&appid=29985174&appsecret=8hqwDY6K",
					function(res) {
						self.timeWheather = res;
						self.sktq();
					}
				);

				//未来7天的数据
				$.getJSON(
					"https://tianqiapi.com/api?version=v1&appid=29985174&appsecret=8hqwDY6K",
					function(res) {
						self.sevenDaysWheather = res;
						self.wltq();
					}
				);

				//降水量
				$.getJSON(
					"https://tianqiapi.com/api?version=v8&appid=29985174&appsecret=8hqwDY6K",
					function(res) {
						self.precipitation = res;
					}
				);
			},
			char4() {
				this.chartName.chart4 = this.$echarts.init(
					document.getElementById("divPlugin1")
				);

				let option = {
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b}: {c} ({d}%)",
					},
					legend: {
						orient: "vertical",
						left: 10,
						textStyle: {
							color: "#c1cadf",
							fontSize: 10,
						},
						data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
					},
					grid: {
						left: "6%",
						right: "4%",
						top: "25%",
						bottom: "3%",
						containLabel: true,
					},
					series: [{
						name: "访问来源",
						type: "pie",
						radius: ["50%", "70%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center",
						},
						emphasis: {
							label: {
								show: true,
								fontSize: "30",
								fontWeight: "bold",
							},
						},
						labelLine: {
							show: false,
						},
						data: [{
								value: 335,
								name: "直接访问"
							},
							{
								value: 310,
								name: "邮件营销"
							},
							{
								value: 234,
								name: "联盟广告"
							},
							{
								value: 135,
								name: "视频广告"
							},
							{
								value: 1548,
								name: "搜索引擎"
							},
						],
					}, ],
				};

				this.chartName.chart4.setOption(option);
			},

			char3() {
				this.chartName.chart3 = this.$echarts.init(
					document.getElementById("divPlugin")
				);
				let option = {
					grid: {
						left: "6%",
						right: "4%",
						top: "25%",
						bottom: "3%",
						containLabel: true,
					},
					xAxis: {
						type: "category",
						axisLine: {
							lineStyle: {
								color: "rgba(255,255,255,0.5)",
							},
						},
						data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					},
					yAxis: {
						type: "value",
						axisLine: {
							lineStyle: {
								color: "rgba(255,255,255,0.5)",
							},
						},
					},
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: "bar",
						showBackground: true,
						backgroundStyle: {
							color: "rgba(220, 220, 220, 0.8)",
						},
					}, ],
				};

				this.chartName.chart3.setOption(option);
			},
			//实况天气
			sktq() {
				console.log(this.timeWheather);
				var result = this.timeWheather;
				var self = this;
				//进行实时天气的展示
				//根据天气类型获取天气图标
				self.weatherImgURL = require("../../static/img/durian/" +
					result.wea_img +
					".png");
				//设置相应的展示信息
				self.weatherCity = result.city;
				self.weatherTemp = result.tem;
				self.weatherTemp1 = result.tem1;
				self.weatherTemp2 = result.tem2;
				self.weather = result.wea;

				self.weatherDetal = `空气质量：${result.air_level} ${result.air_tips}`;
			},
			//未来7天天气
			wltq() {
				console.log(this.sevenDaysWheather);
				var result = this.sevenDaysWheather.data;

				//折线的x轴：
				var xData = [];
				var tem1Data = []; //最高温
				var tem2Data = []; //最低温
				for (let item of result) {
					xData.push(item.day); //20200907 是否需要将后面的哪一天去掉
					tem1Data.push(Number(item.tem1.slice(0, 2)));
					tem2Data.push(Number(item.tem2.slice(0, 2)));
				}

				//只展示当天的实时天气，将相应需要展示的信息push进hoursData
				for (let item of result[0].hours) {
					var tempObj = {};
					tempObj.hour = item.day;
					var wea_img = this.getWeaImg(item.wea);
					tempObj.weatherImgURL = require("../../static/img/durian/" +
						wea_img +
						".png");
					tempObj.tem = item.tem;
					tempObj.wea = item.wea;

					this.hoursData.push(tempObj);
				}

				console.log(this.hoursData);

				//展示从今日起未来一周的天气
				this.chartName.chart1 = this.$echarts.init(
					document.getElementById("jsl")
				);
				var option = {
					//backgroundColor: "rgba(12,26,63,0.3)",
					legend: {
						textStyle: {
							color: this.fontColor, //字体颜色
						},
						data: ["最高温度", "最低温度"],
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							lineStyle: {
								color: {
									type: "linear",
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
											offset: 0,
											color: "rgba(0, 255, 233,0)",
										},
										{
											offset: 0.5,
											color: "rgba(255, 255, 255,1)",
										},
										{
											offset: 1,
											color: "rgba(0, 255, 233,0)",
										},
									],
									global: false,
								},
							},
						},
					},
					grid: {
						top: "25%",
						left: "12%",
						right: "12%",
						bottom: "35%",
						// containLabel: true
					},
					xAxis: [{
						type: "category",
						axisLine: {
							show: true,
						},
						splitArea: {
							// show: true,
							color: "#f00",
							lineStyle: {
								color: "#f00",
							},
						},
						axisLabel: {
							rotate: -60,
							color: "#fff",
						},
						splitLine: {
							show: false,
						},
						boundaryGap: false,
						data: xData,
					}, ],

					yAxis: [{
						type: "value",
						min: 0,
						// max: 140,
						splitNumber: 4,
						splitLine: {
							show: true,
							lineStyle: {
								color: "rgba(255,255,255,0.1)",
							},
						},
						axisLine: {
							show: true,
						},
						axisLabel: {
							show: true,
							margin: 20,
							textStyle: {
								color: "#d1e6eb",
							},
						},
						axisTick: {
							show: false,
						},
					}, ],
					series: [{
							name: "最高温度",
							type: "line",
							// smooth: true, //是否平滑
							showAllSymbol: true,
							// symbol: 'image://./static/images/guang-circle.png',
							symbol: "circle",
							symbolSize: 15,
							lineStyle: {
								normal: {
									color: "#6c50f3",
									shadowColor: "rgba(0, 0, 0, .3)",
									shadowBlur: 0,
									shadowOffsetY: 5,
									shadowOffsetX: 5,
								},
							},
							label: {
								show: true,
								position: "top",
								textStyle: {
									color: "#ff0000",
								},
							},
							itemStyle: {
								color: "#6c50f3",
								borderColor: "#fff",
								borderWidth: 3,
								shadowColor: "rgba(0, 0, 0, .3)",
								shadowBlur: 0,
								shadowOffsetY: 2,
								shadowOffsetX: 2,
							},
							tooltip: {
								show: false,
							},
							areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(
										0,
										0,
										0,
										1,
										[{
												offset: 0,
												color: "rgba(108,80,243,0.3)",
											},
											{
												offset: 1,
												color: "rgba(108,80,243,0)",
											},
										],
										false
									),
									shadowColor: "rgba(108,80,243, 0.9)",
									shadowBlur: 20,
								},
							},
							data: tem1Data,
						},
						{
							name: "最低温度",
							type: "line",
							// smooth: true, //是否平滑
							showAllSymbol: true,
							// symbol: 'image://./static/images/guang-circle.png',
							symbol: "circle",
							symbolSize: 15,
							lineStyle: {
								normal: {
									color: "#00ca95",
									shadowColor: "rgba(0, 0, 0, .3)",
									shadowBlur: 0,
									shadowOffsetY: 5,
									shadowOffsetX: 5,
								},
							},
							label: {
								show: true,
								position: "bottom",
								textStyle: {
									color: "#7FFF00",
								},
							},

							itemStyle: {
								color: "#00ca95",
								borderColor: "#fff",
								borderWidth: 3,
								shadowColor: "rgba(0, 0, 0, .3)",
								shadowBlur: 0,
								shadowOffsetY: 2,
								shadowOffsetX: 2,
							},
							tooltip: {
								show: false,
							},
							areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(
										0,
										0,
										0,
										1,
										[{
												offset: 0,
												color: "rgba(0,202,149,0.3)",
											},
											{
												offset: 1,
												color: "rgba(0,202,149,0)",
											},
										],
										false
									),
									shadowColor: "rgba(0,202,149, 0.9)",
									shadowBlur: 20,
								},
							},
							data: tem2Data,
						},
					],
				};
				this.chartName.chart1.setOption(option);
			},

			//获取对应天气的展示图片
			getWeaImg(type) {
				var imgName;
				switch (type) {
					case "雷":
						imgName = "lei";
						break;
					case "晴":
						imgName = "qing";
						break;
					case "沙尘":
						imgName = "shachen";
						break;
					case "雾":
						imgName = "wu";
						break;
					case "雪":
						imgName = "xue";
						break;
					case "阴":
						imgName = "yin";
						break;
					case "雨":
						imgName = "yu";
						break;
					case "雨夹雪":
						imgName = "yujiaxue";
						break;
					case "云":
						imgName = "yun";
						break;
					case "阵雨":
						imgName = "zheyu";
						break;
					default:
						imgName = "qing";
				}
				return imgName;
			},

			//利用mapbox来实现3D地图
			centerMap() {
				// 模拟加载一个地图
				mapboxgl.accessToken =
					"pk.eyJ1IjoicWlhb3ppIiwiYSI6ImNrZXYwc2M0MzIxa2Uycm9mcmVmY2QwamwifQ.M8KsobLanr4VURNHLYJDHg";

				var map = new mapboxgl.Map({
					style: 'mapbox://styles/mapbox/dark-v10',
					center: [104.06, 30.67],
					zoom: 15.5,
					pitch: 45,
					bearing: -17.6,
					container: 'container'
				});

				//立体建筑
				map.on('load', function() {
					console.log('加载三维建筑')
					// Insert the layer beneath any symbol layer.
					var layers = map.getStyle().layers;
					console.log(layers)

					var labelLayerId;
					for (var i = 0; i < layers.length; i++) {
						if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
							labelLayerId = layers[i].id;
							break;
						}
					}

					map.addLayer({
						'id': '3d-buildings',
						'source': 'composite',
						'source-layer': 'building',
						'filter': ['==', 'extrude', 'true'],
						'type': 'fill-extrusion',
						'minzoom': 15,
						'paint': {
							'fill-extrusion-color': '#fff',

							// use an 'interpolate' expression to add a smooth transition effect to the
							// buildings as the user zooms in
							'fill-extrusion-height': [
								"interpolate", ["linear"],
								["zoom"],
								15, 0,
								15.05, ["get", "height"]
							],
							'fill-extrusion-base': [
								"interpolate", ["linear"],
								["zoom"],
								15, 0,
								15.05, ["get", "min_height"]
							],
							'fill-extrusion-opacity': .6
						}
					}, labelLayerId);
				});
			},

			//3D 地图
			center() {
				var self = this;
				var map = new AMap.Map("container", {
					mapStyle: "amap://styles/darkblue",
					//因为高德不兼容IE，故先不用3D模式
					// resizeEnable: true,
					// rotateEnable:true,
					// pitchEnable:true,
					// zoom: 10,
					// pitch:65,
					// rotation:45,
					// viewMode:'3D',//开启3D视图,默认为关闭
					zoom: 10,
					expandZoomRange: true,
					zooms: [3, 20],
					center: [104.06, 30.67],
				});

				//实时路况图层
				var trafficLayer = new AMap.TileLayer.Traffic({
					zIndex: 10,
					autoRefresh: true,
				});

				trafficLayer.setMap(map);

				//添加几个摄像头的位置
				var markerArr = [];
				for (let item of this.camreaList) {
					markerArr.push(this.createMark(item, map));
				}

				//console.log(markerArr);
				map.add(markerArr);

				//给标注添加点击事件
				for (let marker of markerArr) {
					marker.on("click", function(e) {
						self.MarkerClick(marker);
					});
				}
			},
			MarkerClick(marker) {
				var cameraId = marker.id;
				console.log("摄像头" + cameraId);
				this.hkvInfo.ip = cameraId;

				//先退出
				this.clickStopRealPlay();
				this.onLogout();

				//this.videoInitPlugin(); // 初始化video界面
				this.onLogin(); //登录 20200904 添加ip参数
				this.clickStartRealPlay(); //开始预览
			},

			//给地图添加点标注
			//参数说明：lng:经度 lat:纬度 id：进行唯一标识marker map添加在哪一个地图上
			createMark(item, map) {
				var lng = item.lng;
				var lat = item.lat;
				var id = item.id;
				var title = item.title;

				//添加摄像头ICon
				var cameraIcon = new AMap.Icon({
					// 图标尺寸
					size: new AMap.Size(50, 50),
					// 图标的取图地址
					image: require("../../static/img/camera.png"),
					// 图标所用图片大小
					imageSize: new AMap.Size(50, 50),
					// 图标取图偏移量
				});

				var marker = new AMap.Marker({
					position: new AMap.LngLat(lng, lat),
					icon: cameraIcon,
					title: title,
					clickable: true,
					map: map,
				});

				marker.id = id;
				return marker;
			},
			getTime() {
				var myDate = new Date();
				var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
				var myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				var myToday = myDate.getDate(); //获取当前日(1-31)
				var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
				var myHour = myDate.getHours(); //获取当前小时数(0-23)
				var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
				var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
				var week = [
					"星期日",
					"星期一",
					"星期二",
					"星期三",
					"星期四",
					"星期五",
					"星期六",
				];
				var nowTime;

				nowTime =
					myYear +
					"年" +
					this.fillZero(myMonth) +
					"月" +
					this.fillZero(myToday) +
					"日" +
					"&nbsp;&nbsp;" +
					this.fillZero(myHour) +
					":" +
					this.fillZero(myMinute) +
					":" +
					this.fillZero(mySecond) +
					"&nbsp;&nbsp;" +
					week[myDay] +
					"&nbsp;&nbsp;";
				//console.log(nowTime);
				$("#time").html(nowTime);
			},
			fillZero(str) {
				var realNum;
				if (str < 10) {
					realNum = "0" + str;
				} else {
					realNum = str;
				}
				return realNum;
			},
			//设备1
			onLogin() {
				var that = this;
				that.loginLoading = true;
				// console.log(that.hkvInfo.ip);

				// 登录设备
				WebVideoCtrl.I_Login(
					that.hkvInfo.ip,
					that.iProtocol,
					that.hkvInfo.port,
					that.hkvInfo.username,
					that.hkvInfo.password, {
						async: false,
						success: function(xmlDoc) {
							// console.log('xmlDoc2', xmlDoc);//不能删除
							//TODO 获取通道信息
							that.getChannelInfo();
							that.getDevicePort(that.hkvInfo.ip + "_" + that.hkvInfo.port);
							that.loginLoading = false;
							console.log("登录成功");
							that.$message({
								showClose: true,
								message: "登录成功",
								type: "success",
							});
						},
						error: function() {
							console.log("登录成功");
							that.loginLoading = false;
							that.$message({
								showClose: true,
								message: "登录失败",
								type: "error",
							});
						},
					}
				);
			},
			//如果这个切换能成功，那么退出的时候也需要加相应的ip
			onLogout() {
				this.hkvInfo.channels = [];
				var szDeviceIdentify = this.hkvInfo.ip + "_" + this.hkvInfo.port;
				var iRet = WebVideoCtrl.I_Logout(szDeviceIdentify);
				console.log(iRet);
				if (0 == iRet) {
					console.log("退出成功");
					this.$message({
						showClose: true,
						message: "退出成功",
						type: "success",
					});
				} else {
					console.log("退出失败");
					this.$message({
						showClose: true,
						message: "退出失败",
						type: "error",
					});
				}
			},
			clickStartRealPlay() {
				// 开始预览
				var that = this;
				that.startPlayLoading = true;
				var szDeviceIdentify = that.hkvInfo.ip + "_" + that.hkvInfo.port;

				var j =
					that.hkvInfo.channels.length > 4 ? 4 : that.hkvInfo.channels.length;
				for (var i = 0; i < j; i++) {
					// setTimeout(
					//   that.startRealPlay(szDeviceIdentify, i, that.hkvInfo.channels[i]),
					//   500
					// );
					that.startRealPlay(szDeviceIdentify, i, that.hkvInfo.channels[i]);
				}
				that.startPlayLoading = false;
			},
			videoInitPlugin: function() {
				var iRet = WebVideoCtrl.I_CheckPluginInstall();
				if (iRet === -1) {
					alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装");
					return;
				}
				this.initPlugin();
			},
			initPlugin: function() {
				var that = this;

				WebVideoCtrl.I_InitPlugin("100%", "100%", {
					bWndFull: true, //是否支持单窗口双击全屏，默I_CheckPluginInstall
					iWndowType: 1,
					myCbSelWnd: function(xmlStr) {
						//自己新增的方法
						var jsonObj = that.$x2js.xml2js(xmlStr);
						that.mySelectWnd = jsonObj.RealPlayInfo.SelectWnd;
						var szInfo = "当前选择的窗口编号：" + that.mySelectWnd;
						//  console.log(szInfo);
					},
					cbInitPluginComplete: function() {
						WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin2");
						// 检查插件是否最新
						if (WebVideoCtrl.I_CheckPluginVersion() === -1) {
							alert(
								"检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！"
							);
							return;
						}
					},
				});
			},
			getDevicePort: function(szDeviceIdentify) {
				var oPort = WebVideoCtrl.I_GetDevicePort(szDeviceIdentify);
				this.iRtspPort = oPort.iRtspPort;
			},
			startRealPlay: function(szDeviceIdentify, iWndIndex, iChannelID) {
				var that = this;
				// console.log(that.iRtspPort);
				WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
					iRtspPort: that.iRtspPort,
					iWndIndex: iWndIndex,
					iStreamType: 1,
					iChannelID: iChannelID,
					bZeroChannel: that.bZeroChannel,
					success: function() {
						console.log("开始预览通道成功");
						that.$message({
							title: "成功",
							message: "开始预览通道" + iChannelID + "成功",
							type: "success",
						});
					},
					error: function(status, xmlDoc2) {
						console.log("开始预览通道失败");
						console.log(xmlDoc2); //不能删除
						that.$message({
							title: "失败",
							message: "开始预览通道" + iChannelID + "失败",
							type: "error",
						});
						if (status === 403) {
							console.log("szInfo 设备不支持Websocket取流！");
						} else {
							console.log("开始预览失败 ", status, xmlDoc2);
						}
					},
				});
			},
			clickStopRealPlay: function() {
				var j =
					this.hkvInfo.channels.length > 4 ? 4 : this.hkvInfo.channels.length;
				for (var i = 0; i < j; i++) {
					//setTimeout(this.stopRealPlay(i), 1000);
					this.stopRealPlay(i);
				}
			},
			stopRealPlay: function(iWndIndex) {
				var that = this;
				WebVideoCtrl.I_Stop({
					iWndIndex: iWndIndex,
					success: function() {
						console.log("停止预览窗口成功");
						that.$message({
							title: "成功",
							message: "停止预览窗口" + iWndIndex + "成功",
							type: "success",
						});
					},
					error: function() {
						console.log("停止预览窗口失败");
						that.$message({
							title: "失败",
							message: "停止预览窗口" + iWndIndex + "失败",
							type: "error",
						});
					},
				});
			},
			// 获取通道，实际上可以根据自己的项目，获取数字通道，模拟通道，零通道中的一个或多个，不用全部获取（提高效率）
			getChannelInfo: function() {
				var that = this;
				var szDeviceIdentify = this.hkvInfo.ip + "_" + this.hkvInfo.port;
				// debugger
				// 数字通道
				that.hkvInfo.channels = [];
				WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
					async: false,
					mysuccess: function(xmlStr) {
						console.log("mysuccess I_GetDigitalChannelInfo: ", xmlStr);
						var jsonObj = that.$x2js.xml2js(xmlStr);
						var list =
							jsonObj.InputProxyChannelStatusList.InputProxyChannelStatus;
						for (var x = 0; x < list.length; x++) {
							that.hkvInfo.channels.push(list[x].id);
						}
					},
					success: function(xmlDoc) {},
					error: function(status, xmlDoc) {
						console.log("获取数字通道失败");
					},
				});
				// TODO 模拟通道
				// 模拟通道
				WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
					async: false,
					mysuccess: function(xmlStr) {
						var jsonObj = that.$x2js.xml2js(xmlStr);
						console.log("模拟通道mysuccess", xmlStr);
						// var list = jsonObj.VideoInputChannelList;
						// for (var x = 0; x < list.length; x++) {
						//   that.hkvInfo.channels.push(list[x].VideoInputChannel.id);
						// }
						var id = jsonObj.VideoInputChannelList.VideoInputChannel.id;
						that.hkvInfo.channels.push(id);
					},
					success: function(xmlStr) {
						console.log("模拟通道success", xmlStr);
					},
					error: function(status, xmlDoc) {
						console.log("模拟通道error", xmlDoc);
					},
				});
				// TODO 零通道
			},
			mouseDownPTZControl: function(iPTZIndex) {
				var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd);

				if (oWndInfo !== null) {
					if (iPTZIndex === 9 && this.g_bPTZAuto) {
						iPTZSpeed = 0;
					} else {
						this.g_bPTZAuto = false;
					}

					WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
						iPTZSpeed: 4,
						mysuccess: function(xmlStr) {
							console.log("I_PTZControl", xmlStr);
							if (iPTZIndex === 9 && this.g_bPTZAuto) {
								console.log(
									oWndInfo.szDeviceIdentify + " 停止云台成功！mouseDown"
								);
							} else {
								console.log(
									oWndInfo.szDeviceIdentify + " 开启云台成功！mouseDown"
								);
							}
							if (iPTZIndex === 9) {
								this.g_bPTZAuto = !this.g_bPTZAuto;
							}
						},
						error: function(status, xmlDoc) {
							console.log(
								oWndInfo.szDeviceIdentify + " 开启云台失败！mouseDown",
								status,
								xmlDoc
							);
						},
					});
				}
			},
		},
	};
</script>

<style scoped>
	@import "../../static/hik/index.css";
	.left-box {
    width: 25%;
    height: 80px;
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 0.104167rem;
    margin: 0 auto;
}

 .el-dropdown-link {
    cursor: pointer;
    color: #c0c4cc;
  }
.el-dropdown-left{
  margin-right: 35px;
  margin-top:30px;
  
}
.centerTitle {
  font-size: 2rem !important;
  margin: 0 auto;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: 700;
  color: #666;
  letter-spacing: 2px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#fff),
    to(#4589ff)
  );
  background: linear-gradient(180deg, #fff, #4589ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.dhTitle {
  font-size: 1rem;
  padding:0.6rem;
  color:#c0c4cc;
}

.dhTitle a{
  color:#c0c4cc !important; 
}
.menu_title {
        /* margin: 0 auto; */
        /* margin-top:22px; */
        margin-left: 20px;
        vertical-align: middle;
        line-height: 0.166667rem !important;
        /* color:  #034c6a ; */
        font-size: 22px;
        border: 1px solid #2977ff;
}
.dropdown {
  background-color:rgb(3,8,41);
  /* opacity: 0.9; */
  border: 1px solid #2977ff;
  width: 135px;
  text-align: center;
}
.dropdown1 {
  background-color:rgb(3,8,41);
  /* opacity: 0.9; */
  border: 1px solid #2977ff;
  width: 95px;
  text-align: center;
  
}
 li:hover{
  background-color:#0f2967;
  color:#fff
}
.time_{
  position: absolute;
    margin-top: 4px;
    margin-left: -70px;
}

	.content-body {
		width: 100vw;
		height: 100vh;
		-webkit-text-size-adjust: 100%;
		-ms-text-size-adjust: 100%;
		font-size: 62.5% !important;
	}

	/* 设置左上角的天气实况的样式 */
	.weather {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: flex-start;
		width: 100%;
		height: 50%;
	}

	.weather img {
		display: inline-block;
		border: none;
		height: 60%;
	}

	.weather div {
		color: aliceblue;
		font-size: 20px;
	}

	.weatherDetal {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 50%;
	}

	.weatherDetal p {
		color: aliceblue;
		font-size: 16px;
	}

	#wltq {
		flex: 1;
		position: relative;
	}

	#wltq .head {
		background: rgba(255, 255, 255, 0.1);
		font-size: 12px;
		padding: 0.5rem 1.5rem;
		color: #68d8fe;
		display: flex;
		justify-content: space-between;
		line-height: 1.05;
	}

	#wltq .col {
		width: 2.5rem;
	}

	#wltq .content {
		position: absolute;
		width: 100%;
		height: calc(100% - 25px) !important;
		bottom: 0;
		overflow: hidden;
	}

	#wltq .marquee {
		animation: row 10s linear infinite;
	}

	@keyframes row {
		0% {}

		100% {
			transform: translateY(-50%);
		}
	}

	#wltq .marquee .row {
		line-height: 1.05;
		/* padding: .5rem .5rem; */
		color: #61a8ff;
		font-size: 12px !important;
		position: relative;
		display: flex;
		justify-content: space-between;
	}

	#wltq .marquee .col {
		width: 5.5rem;
	}

	#wltq .marquee .col1 {
		padding: 0rem 1.6rem;
	}

	#wltq .marquee .col2 {
		padding: 0rem 2.5rem;
	}

	#wltq .marquee .colImg {
		width: auto;
		height: 33px !important;
	}

	#time {
		font-size: 14px;
	}
</style>
