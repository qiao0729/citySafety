<template>
	<div class="content-body">
		<div class="header">
			<div class="left nav left-box">
				<el-dropdown hide-on-click>
					<div class="menu_title">
						<i class="el-icon-s-unfold"></i>
						<span class="el-dropdown-link">轨迹挖掘<i class="el-icon-arrow-down el-icon--right"></i></span>
					</div>
					<el-dropdown-menu slot="dropdown" class="dropdown">
						<li class="dhTitle">
							<router-link :to="{ name: 'urbanPublicSafety'}">信息总览</router-link>
						</li>
						<li class="dhTitle">
							<router-link :to="{ name: 'Hik'}">自然灾害</router-link>
						</li>
						<li class="dhTitle">
							<router-link :to="{ name: 'Accident'}">事故灾难</router-link>
						</li>
						<li class="dhTitle">
							<router-link :to="{ name: 'Health'}">公共安全</router-link>
						</li>
						<li class="dhTitle">
							<router-link :to="{ name: 'Social'}">社会安全</router-link>
						</li>
						<li class="dhTitle">
							<router-link :to="{ name: 'Warning'}">预警信息</router-link>
						</li>
						<li class="dhTitle">
							<router-link :to="{ name: 'Trace'}">轨迹挖掘</router-link>
						</li>
					</el-dropdown-menu>
				</el-dropdown>

			</div>
			<div class="header_center left">
				<h1 class="centerTitle">
					城市公共安全信息监测系统
					<img src="../../assets/img/title_left.png" class="title_left" />
					<img src="../../assets/img/title_right.png" class="title_right" />
				</h1>
				<!-- 时钟 -->
				<span class="time_">{{dateFormat(date)}}</span>
			</div>
			<!-- 头部右侧区域 -->
			<div class="right nav text_right">
				<el-dropdown size="mini" hide-on-click placement="bottom-start">
					<div class="el-dropdown-left">
						<span class="el-dropdown-link"><img src="../../assets/img/header.png" alt=""></span>
					</div>
					<el-dropdown-menu slot="dropdown" class="dropdown1">
						<li>
							<router-link class="dhTitle dhTitle1" :to="{ name: 'Login'}">退出系统</router-link>
						</li>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>

		<div class="content">
			<div class="content-con">
				<!-- 三栏布局 -->
				<div class="leftContent"></div>
				<div class="centerContent" id="centerContent">
					<div id="map"></div>
				</div>
				<div class="rightContent"></div>
			</div>
		</div>
	</div>
</template>

<script>
	// 使用L7  AntV 进行轨迹数据可视化
	//import * as L7 from '@antv/l7'
	export default {
		data() {
			return {
				date: new Date(),
				gps_query: {
					'tableName': 'gps_20161102'
				}
			};
		},
		mounted() {
			this.$nextTick(function() {
					this.showMap();
				}),
				//显示当前日期时间
				//let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
				this.timer = setInterval(() => {
					this.date = new Date(); // 修改数据date
				}, 1000)
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
			}
		},
		//vue实例销毁的时候清除定时器
		destroyed() {
			clearInterval(this.timer);
		},
		methods: {
			// 标题显示日期
			dateFormat(time) {
				var date = new Date(time);
				var year = date.getFullYear();
				/* 在日期格式中，月份是从0开始的，因此要加0
				 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				 * */
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			},
			async showMap() {
				const pointData = await this.getData();
				console.log(pointData);
				//使用腾讯地图位置服务来做
				var center = new TMap.LatLng(30.67, 104.06);
				var map = new TMap.Map('map', {
					center: center,
					zoom: 11,
					mapStyleId: "style1" //个性化样式
				})
			
				//初始化散点图并添加至map图层
				new TMap.visualization.Dot({
						faceTo: "screen", //散点固定的朝向

					})
					.addTo(map)
					.setData(pointData); //设置数据

			},
			async getData() {
				console.log(this.gps_query)
				const {
					data: res
				} = await this.$http.get("LBS/baiduHy/gps", {
					params: this.gps_query
				});

				return res.data;
			}

		},
	};
</script>

<style scoped>
	@import "../../static/hik/index.css";
	/* 三栏布局样式设置 */
	@import "../../static/hik/layout3.css";

	/* 标题栏左侧 */
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

	.el-dropdown-left {
		margin-right: 35px;
		margin-top: 30px;

	}

	.centerTitle {
		font-size: 2rem !important;
		margin: 0 auto;
		font-family: SourceHanSansCN-Bold, SourceHanSansCN;
		font-weight: 700;
		color: #666;
		letter-spacing: 2px;
		background: -webkit-gradient(linear,
			left top,
			left bottom,
			from(#fff),
			to(#4589ff));
		background: linear-gradient(180deg, #fff, #4589ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.dhTitle {
		font-size: 1rem;
		padding: 0.6rem;
		color: #c0c4cc;
	}

	.dhTitle a {
		color: #c0c4cc !important;
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
		background-color: rgb(3, 8, 41);
		/* opacity: 0.9; */
		border: 1px solid #2977ff;
		width: 135px;
		text-align: center;
	}

	.dropdown1 {
		background-color: rgb(3, 8, 41);
		/* opacity: 0.9; */
		border: 1px solid #2977ff;
		width: 95px;
		text-align: center;

	}

	li:hover {
		background-color: #0f2967;
		color: #fff
	}

	.time_ {
		position: absolute;
		margin-top: 4px;
		margin-left: -70px;
	}

	/* 设置内容 */
	.content-body {
		width: 100vw;
		height: 100vh;
		-webkit-text-size-adjust: 100%;
		-ms-text-size-adjust: 100%;
		font-size: 62.5% !important;
		background: #030829;
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content-con {
		height: 98%;
		width: 98%;
		background-color: #070b0f !important;
	}

	#time {
		font-size: 14px;
	}

	#map {
		width: 100%;
		height: 100%;
	}
</style>
