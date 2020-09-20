<template>
	<div class="container-fluid container-bg office-efficiency-index" id="sccbtj">
		<div class="row office-header">
			<div class="col-sm-12 col-md-12 pd title-info">生产成本统计</div>
			<div class="col-sm-7 col-md-7 pd analysis-filter">
				<a class="a-access" @click="backHome">
					<button class="button type1">返回首页</button>
				</a>
			</div>
		</div>
		<div class="row office-header-content">
			<!-- 年 月 日 切换 -->
			<ul class="choose-menu clearfix" id="choose-menu">
				<li @click="changeMenu(index,item.type)" :data-type='item.type' :class='currentIndex == index ? "active":"inactive"'
				 :key="item.id" v-for='(item,index) in chooseMenu'>{{item.title}}</li>
			</ul>
			<!-- top 01 生产方量  -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.top1}}</div>
					<div class="content base-info" id="scfl"></div>
				</div>
			</div>
			<!-- top 02 生产成本-->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.top2}}</div>
					<div class="content base-info" id="sccb"></div>
				</div>
			</div>
			<!-- bottom 01 单方成本  -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.bottom1}}</div>
					<div class="content staff-info" id="dfcb"></div>
				</div>
			</div>
			<!-- bottom 02 计划完成方量比例 -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.bottom2}}</div>
					<div class="content staff-info" id="jhwcfl"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		inject:['reload'],
		data() {
			return {
				title: {
					top1: "生产方量",
					top2: "生产成本",
					bottom1: "单方成本",
					bottom2: "计划完成方量比例"
				},
				chartName: {
					chartTop1: "",
					chartTop2: "",
					chartBottom1: "",
					chartBottom2: ""
				},
				optionName: {
					optionTop1: '',
					optionTop2: '',
					optionBottom1: '',
					optionBottom2: ''
				},
				currentIndex: 0, //当前所选择的索引
				currentType: 'day', //当前所展示的数据时间类型
			  chooseMenu: [{
						id: 0,
						title: "日",
						type: 'D'
					},
					{
						id: 1,
						title: "月",
						type: 'M'
					},
					{
						id: 2,
						title: "年",
						type: 'Y'
					}
				],
				watchNum:0,

				//存储数据
				dataList: {},
				//查询参数
				sccbtj_Query: {
					a_dfrom: '20200424', //开始时间 格式为yyyymmdd
					a_dto: '20200425', //结束时间 格式为yyyymmdd
					a_userid: 'ALL', //用户 ,传入ALL时返回所有站点数据，传入站点id则返回对应站点数据
					a_layer: 2, //层级（0大区、1小区、2站点）
					a_dayname: 'sales02_01', //报表名字
					a_pos: 1, //位置
					a_reptype: 'D', //时间类型
					RCT1: '' //返回数据表
				},
			};
		},
		async created() {
			await this.getMenuList();

			this.top1();
			this.top2();
			this.bottom1();
			this.bottom2();
			window.addEventListener("resize", () => {
				this.chartName.chartTop1.resize();
				this.chartName.chartTop2.resize();
				this.chartName.chartBottom1.resize();
				this.chartName.chartBottom2.resize();
			});
		},
		mounted() {
			this.$nextTick(function() {
				let that = this;
				 if(this.timer){
					clearInterval(this.timer);
				}else{
					//前端定时刷新
					this.timer = setInterval(function (){
						let type = that.currentType;
						that.getMenuList(type);
					},60000)
				} 
			});
		},
		//vue实例销毁的时候清除定时器
		destroyed() {
			clearInterval(this.timer);
		},
		//监听数据的变化
		watch: {
			dataList(newValue, oldValue) {
				//console.log(this.dataList);
				//数据变化之后，更新相应的图表展示
				this.watchNum++;
				if(this.watchNum>1){
					this.dataChange(newValue);
				}
			},
			deep:true
		},
		
		methods: {
			backHome() {
				this.$router.push("/home");
			},
			async getMenuList(a_reptype = 'D') {
				this.dataList = await this.getData(a_reptype);
			},
			//从后端接口获取数据
			async getData( a_reptype = 'D') {
				this.sccbtj_Query.a_reptype = a_reptype;
				const {data: res} = await this.$http.get("jygc_sccbtj", {params: this.sccbtj_Query});
				return res.data;
			},

			top1() {
				this.chartName.chartTop1 = this.$echarts.init(
					document.getElementById("scfl")
				);

				this.optionName.optionTop1 = {
					color: ["#3398DB"],
					tooltip: {
						trigger: "axis",
						axisPointer: {
							// 坐标轴指示器，坐标轴触发有效
							type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: "3%",
						right: "6%",
						bottom: "5%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						name: "站点",
						data:this.dataList.station,
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: "value",
						name: "生产方量"
					}],
					series: [{
						name: "生产方量",
						type: "bar",
						barWidth: "60%",
						data: this.dataList.scfl
					}]
				};
				this.chartName.chartTop1.setOption(this.optionName.optionTop1);
			},
			top2() {
				this.chartName.chartTop2 = this.$echarts.init(
					document.getElementById("sccb")
				);
				this.optionName.optionTop2 = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					grid: {
						left: "3%",
						right: "6%",
						bottom: "5%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						name: "站点",
						data: this.dataList.station,
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: "value",
						name: "生产成本"
					}],
					series: [{
						name: "生产成本",
						type: "bar",
						barWidth: "60%",
						data: this.dataList.sccb
					}]
				};
				this.chartName.chartTop2.setOption(this.optionName.optionTop2);
			},
			bottom1() {
				this.chartName.chartBottom1 = this.$echarts.init(
					document.getElementById("dfcb")
				);
				this.optionName.optionBottom1 = {
					color: ["#df791a"],
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					grid: {
						left: "3%",
						right: "6%",
						bottom: "5%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						name: "站点",
						data:this.dataList.station,
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: "value",
						name: "单方成本"
					}],
					series: [{
						name: "单方成本",
						type: "bar",
						barWidth: "60%",
						data: this.dataList.dfcb
					}]
				};
				this.chartName.chartBottom1.setOption(this.optionName.optionBottom1);
			},
			
			//计划完成量比例
			bottom2() {
				this.chartName.chartBottom2 = this.$echarts.init(
					document.getElementById("jhwcfl")
				);
				this.optionName.optionBottom2 = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross",
							crossStyle: {
								color: "#999"
							}
						}
					},
					legend: {
						data: ["计划量", "完成量", "完成率"]
					},
					grid: {
						left: "3%",
						right: "6%",
						bottom: "5%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						name: '站点',
						nameTextStyle: {
							padding: [25, 0, 0, 0]
						},
						data: this.dataList.station,
						axisPointer: {
							type: "shadow"
						}
					}],
					yAxis: [{
							type: "value",
							name: "方量",
							min: 0,
							max: 80,
							splitNumber: 4,
							interval: 20,
							axisLabel: {
								formatter: "{value}"
							}
						},
						{
							type: "value",
							name: "完成率",
							min: 0,
							max: 100,
							splitNumber: 4,
							interval: 25,
							axisLabel: {
								formatter: "{value} %"
							}
						}
					],
					series: [{
							name: "计划量",
							type: "bar",
							data: this.dataList.jhl
						},
						{
							name: "完成量",
							type: "bar",
							data: this.dataList.wcl
						},
						{
							name: "完成率",
							type: "line",
							symbol: "circle", //拐点样式
							symbolSize: 12, //拐点大小
							yAxisIndex: 1,
							smooth: true,
							data: this.dataList.wczb
						}
					]
				};
				//设置y轴分割数
				this.setSplitNumber();
				this.chartName.chartBottom2.setOption(this.optionName.optionBottom2);
			},
			//计算计划完成比例的y轴分割数
			setSplitNumber(){
				//需要根据实际数据进行y轴的分割数设置
				//设置y轴两个类目的最大值，最小值，以及分割数
				let jhlMax = this.calMax(this.dataList.jhl); //计划量最大值
				let wclMax = this.calMax(this.dataList.wcl); //完成量最大值
				let yMax;//y轴最大值
				if(jhlMax>wclMax){
					yMax = jhlMax;
				}else{
					yMax = wclMax;
				}
				let rateMax;
				let flag = this.dataList.wczb.find(value=>value=='100.00'); //如果有100 ，则完成率最大为100
				if(flag){
					rateMax = 100;
				}else{
					rateMax = this.calMax(this.dataList.wczb); //完成率最大值
				}
				
				//坐标分割数
				let splitNumber = rateMax / 10;
				//将销量的最大值根据分割数进行调整
				let ySplitNum = Math.ceil(yMax / splitNumber);
				yMax = ySplitNum * splitNumber;
				
				//设置划分的最大值
				this.optionName.optionBottom2.yAxis[0].max = yMax;
				this.optionName.optionBottom2.yAxis[1].max = rateMax;
				
				//设置划分的分割数
				this.optionName.optionBottom2.yAxis[0].splitNumber = splitNumber;
				this.optionName.optionBottom2.yAxis[1].splitNumber = splitNumber;
				
				//设置分割值
				this.optionName.optionBottom2.yAxis[0].interval = yMax / splitNumber;
				this.optionName.optionBottom2.yAxis[1].interval = rateMax / splitNumber;
			},
			//计算最大值
			calMax(arr) {
				let max = 0;
				arr.forEach((el) => {
					if (!(el === undefined || el === '-' || el === '')) {
						if (max < el) {
							max = el;
						}
					}
				})
				let maxint = Math.ceil(max / 9.5); //不让最高的值超过最上面的刻度
				let maxval = maxint * 10; //让显示的刻度是整数
				return maxval;
			},
			
			async changeMenu(index, type) {
				this.currentIndex = index;
				this.currentType = type;
				
				this.dataList = await this.getData(type);
				this.dataChange();
			},
			
			//更新图表
			dataChange(){
				//生产方量
				this.optionName.optionTop1.series[0].data = this.dataList.scfl;
				this.optionName.optionTop1.xAxis[0].data = this.dataList.station;
				
				this.chartName.chartTop1.setOption(this.optionName.optionTop1);
				
				//生产成本
				this.optionName.optionTop2.series[0].data = this.dataList.sccb;
				this.optionName.optionTop2.xAxis[0].data = this.dataList.station;
				this.chartName.chartTop2.setOption(this.optionName.optionTop2);
				
				//单方成本
				this.optionName.optionBottom1.series[0].data = this.dataList.dfcb;
				this.optionName.optionBottom1.xAxis[0].data = this.dataList.station;
				this.chartName.chartBottom1.setOption(this.optionName.optionBottom1);
				
				//计划完成量比例
				this.optionName.optionBottom2.series[0].data = this.dataList.jhl;
				this.optionName.optionBottom2.series[1].data = this.dataList.wcl;
				this.optionName.optionBottom2.series[2].data = this.dataList.wczb;
				this.optionName.optionBottom2.xAxis[0].data = this.dataList.station;
				
				//设置y轴分割数
				this.setSplitNumber();
				this.chartName.chartBottom2.setOption(this.optionName.optionBottom2);
			},
		},
	};
</script>

<style scoped>
	#sccbtj {
		width: 100vw;
		height: 100vh;
	}

	.office-efficiency-index .col-info {
		background-color: #ffffff !important;
		height: 38vh !important;
	}

	.office-efficiency-index {
		background-color: #f5f5f5 !important;
	}

	.analysis-filter {
		height: 4rem;
	}

	.title {
		color: #000 !important;
	}

	/* 年、月、日切换按钮样式 */
	.choose-menu {
		padding: 0;
		width: 20%;
		margin: auto;
		margin-bottom: 10px;
		margin-top: 20px;
	}

	.choose-menu li {
		font-size: 1.6rem;
		color: #000;
		width: 25%;
		text-align: center;
		list-style-type: none;
		float: left;
		cursor: pointer;
	}

	.clearfix:before,
	.clearfix:after {
		content: "";
		display: table;
	}

	.clearfix:after {
		clear: both;
		overflow: hidden;
	}

	.clearfix {
		*zoom: 1;
	}

	.active {
		background-color: #49d6da;
		border: 1px solid #ccc;
		color: #fff !important;
	}

	.active a {
		list-style-type: none;
		color: #fff;
	}

	@import "../../assets/css/jygc/wzcgbb.css";
</style>
