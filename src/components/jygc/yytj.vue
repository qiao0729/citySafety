<template>
	<div class="container-fluid container-bg office-efficiency-index" id="yytj">
		<div class="row office-header">
			<div class="col-sm-12 col-md-12 pd title-info">运营统计</div>
			<div class="col-sm-7 col-md-7 pd analysis-filter">
				<a class="a-access" @click="backHome">
					<button class="button type1">返回首页</button>
				</a>
			</div>
		</div>
		<div class="row office-header-content">
			<!-- 年 月 日 切换 -->
			<ul class="choose-menu clearfix" id="choose-menu">
				<li @click="changeMenu(index,item.type)" :data-type="item.type" :class="currentIndex == index ? 'active':'inactive'"
				 :key="item.id" v-for="(item,index) in chooseMenu">{{item.title}}</li>
			</ul>
			<!-- top 01 营销方量  -->
			<div class="col-sm-3 col-md-3 pd">
				<div class="col-info">
					<div class="title">{{title.top1}}</div>
					<div class="content base-info" id="yxfl"></div>
				</div>
			</div>
			<!-- top 02 营销方量同期对比-->
			<div class="col-sm-3 col-md-3 pd">
				<div class="col-info">
					<div class="title">{{title.top2}}</div>
					<div class="content base-info" id="yxfltqdb"></div>
				</div>
			</div>
			<!-- top 03 产值  -->
			<div class="col-sm-3 col-md-3 pd">
				<div class="col-info">
					<div class="title">{{title.top3}}</div>
					<div class="content base-info" id="cz"></div>
				</div>
			</div>
			<!-- top 04 产值同期对比-->
			<div class="col-sm-3 col-md-3 pd">
				<div class="col-info">
					<div class="title">{{title.top4}}</div>
					<div class="content base-info" id="cztqdb"></div>
				</div>
			</div>
			<!-- bottom 01 单方均价  -->
			<div class="col-sm-4 col-md-4 pd">
				<div class="col-info">
					<div class="title">{{title.bottom1}}</div>
					<div class="content staff-info" id="dfjj"></div>
				</div>
			</div>
			<!-- bottom 02 签单余量 -->
			<div class="col-sm-4 col-md-4 pd">
				<div class="col-info">
					<div class="title">{{title.bottom2}}</div>
					<div class="content staff-info" id="qdyl"></div>
				</div>
			</div>
			<!-- bottom 03 签单余量同期对比 -->
			<div class="col-sm-4 col-md-4 pd">
				<div class="col-info">
					<div class="title">{{title.bottom3}}</div>
					<div class="content staff-info" id="qdyltqdb"></div>
				</div>
			</div>
			<!-- 弹出层 -->
			<div id="layer" style="margin: 20px;" v-show="layerShow">
				<div id="selectMenu" style="margin: 20px;">
					<span class="select_title">站点:</span>
					<select id="station" class="selectpicker" multiple data-style="btn-success" ref="station" @change="stationChange"></select>

					<span class="select_title">客户:</span>
					<select id="client" class="selectpicker" data-live-search="true" data-style="btn-primary" ref="client" @change="stationChange"></select>

					<span class="select_title">统计时间范围:</span>
					<select id="time" class="selectpicker" data-style="btn-info" ref="timeType" @change="timeChange"></select>

					<span class="select_title">时间范围选择:</span>
					<div id="dateInput" style="display: inline;" ref="dateInput">
						<input type="text" id="dateChoose" class="demo-input" placeholder="日期范围" v-if="dateShow" />
					</div>
				</div>

				<!-- 数据展示表格 -->
				<el-table :data="tableData" class='layerTable' :height="Height" border style="width: 100%" :default-sort = "{order: 'descending'}">
					<af-table-column prop="client" label="客户"  fixed sortable></af-table-column>
					<af-table-column prop="worksite" label="工地" sortable></af-table-column>
					<af-table-column prop="xsl" label="销售量" sortable></af-table-column>
					<af-table-column prop="cz" label="产值(万元)" sortable></af-table-column>
					<af-table-column prop="xsjj" label="销售均价" sortable></af-table-column>
					<af-table-column prop="pjqd" label="平均强度(MP)" sortable></af-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		inject:['reload'],
		data() {
			return {
				dateShow: true,
				layerShow: false,
				Height:500,//表格高度
				title: {
					top1: "营销方量",
					top2: "营销方量同期对比",
					top3: "产值",
					top4: "产值同期对比",
					bottom1: "单方均价",
					bottom2: "计划量",
					bottom3: "同期计划量"
				},
				
				//图表名称
				chartName: {
					chartTop1: "",
					chartTop2: "",
					chartTop3: "",
					chartTop4: "",
					chartBottom1: "",
					chartBottom2: "",
					chartBottom3: ""
				},

				//各图表配置项名称
				optionName: {
					optionTop1: "",
					optionTop2: "",
					optionTop3: "",
					optionTop4: "",
					optionBottom1: "",
					optionBottom2: "",
					optionBottom3: ""
				},
				//后端接口获取数据
				queryInfo: {
					type: 0
				},
				currentIndex: 0, //当前所选择的索引
				currentType: "D", //当前所展示的数据时间类型
				chooseMenu: [{
						id: 0,
						title: "日",
						type: 'D',
						selectType:'day' //该类型设置用于时间范围下拉初始化
					},
					{
						id: 1,
						title: "月",
						type: 'M',
						selectType:'month' //该类型设置用于时间范围下拉初始化
					},
					{
						id: 2,
						title: "年",
						type: 'Y',
						selectType:'year' //该类型设置用于时间范围下拉初始化
					}
				],

				//存储时间类型与时间范围下拉中初始化的对应关系
				timeSelectMap:'',
				//存储后端获取到的所有模块的数据
				dataList: {},

				//存储下拉菜单中客户列表信息
				clientList:[],
				//表格数据
				tableData: [],
				//存储站点名称与id直进的关系
				stationMap: '',

				//客户名与id之间的对应关系
				clientMap:'',
				watchNum :0,
				
				//查询参数
				yytj_Query: {
					a_dfrom: '20200424', //开始时间 格式为yyyymmdd
					a_dto: '20200425', //结束时间 格式为yyyymmdd
					a_userid: 'ALL', //用户 ,传入ALL时返回所有站点数据，传入站点id则返回对应站点数据
					a_layer: 2, //层级（0大区、1小区、2站点）
					a_dayname: '01', //报表名字
					a_pos: 1, //位置
					a_reptype: 'D', //时间类型
					RCT1: '' //返回数据表
				},

				//二级数据钻取请求参数
				ejdata_Query: {
					a_dfrom: '20200424', //开始时间 格式为yyyymmdd
					a_dto: '20200425', //结束时间 格式为yyyymmdd
					a_userid: 'ALL', //用户 ,传入ALL时返回所有站点数据，传入站点id则返回对应站点数据
					a_layer: 2, //层级（0大区、1小区、2站点）
					a_dayname: '01', //报表名字
					a_pos: 1, //位置
					a_reptype: 'D', //时间类型
					RCT1: '' //返回数据表
				}

			};
		},
		async created() {
			await this.getMenuList();
			
			this.top1();
			this.top2();
			this.top3();
			this.top4();
			this.bottom1();
			this.bottom2();
			this.bottom3();
			window.addEventListener("resize", () => {
				let h = document.documentElement.clientHeight;
				h = h*0.6;
				this.Height = h;
				//console.log(this.Height)
				
				this.chartName.chartTop1.resize();
				this.chartName.chartTop2.resize();
				this.chartName.chartTop3.resize();
				this.chartName.chartTop4.resize();
				this.chartName.chartBottom1.resize();
				this.chartName.chartBottom2.resize();
				this.chartName.chartBottom3.resize();
			});
		},
		
		mounted() {
			this.$nextTick(function() {
				let that = this;
				if(this.timer){
					clearInterval(this.timer);
				}else{
					//前端定时刷新
					this.timer = setInterval(async function (){
						//获取当前选择的时间类型
						let type = that.currentType;
						that.yytj_Query.a_userid = 'ALL';
						await that.getMenuList('sales01_01',type);
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
			//获取数据
			async getMenuList(a_dayname = 'sales01_01', a_reptype = 'D') {
				//获取当日日期 --返回yyyymmdd格式
				let today = this.formatDate(new Date());
				let yesterday = this.getYesterdayDate();
				
				this.yytj_Query.a_dfrom = yesterday;
				this.yytj_Query.a_dto = today;
				
				this.dataList = await this.getData(a_dayname,a_reptype);
				console.log(this.dataList)
				
				//站点id与站点名称之间的对应关系
				this.stationMap = new Map();
				for (let item of this.dataList.stationObj) {
					let id = item.id;
					let name = item.name;
					this.stationMap.set(name, id);
				}

				//年月日时间选择与id之间的关系
				this.timeSelectMap = new Map();
				for(let item of this.chooseMenu){
					let type = item.type;
					let selectType = item.selectType;
					this.timeSelectMap.set(type,selectType);
				}

				
			},
			
			//运营统计
			async getData(a_dayname = 'sales01_01', a_reptype = 'D') {
				this.yytj_Query.a_dayname = a_dayname;
				this.yytj_Query.a_reptype = a_reptype;
				const {data: res} = await this.$http.get("jygc_yytj", {params: this.yytj_Query});
				return res.data;
			},

			//格式化日期，返回yyyymmdd格式  获取当日日期
			formatDate(date) {
				var year = date.getFullYear();

				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

				var dateStr = `${year}${month}${day}`;
				return dateStr;

			},

			//获取昨天的日期
			getYesterdayDate() { //获取当前时间前一天
				var nowdate = new Date();
				nowdate.setDate(nowdate.getDate() - 1);
				var y = nowdate.getFullYear();
				var m = nowdate.getMonth() + 1 < 10 ? "0" + (nowdate.getMonth() + 1) : nowdate.getMonth() + 1;
				var d = nowdate.getDate() < 10 ? "0" + nowdate.getDate() : nowdate.getDate();
				var formatwdate = `${y}${m}${d}`;
				return formatwdate;
			},

			//获取当月起止日期
			getMonthDate() {
				var tempArr = [];
				var date = new Date(),
					y = date.getFullYear(),
					m = date.getMonth();
				var firstDay = new Date(y, m, 1);
				var lastDay = new Date(y, m + 1, 0);

				tempArr.push(this.formatDate(firstDay));
				tempArr.push(this.formatDate(lastDay));
				return tempArr;
			},

			//获取年份日期
			getYearDate() {
				var date = new Date();
				var year = date.getFullYear();
				var tempArr = [];
				var firstDate = `${year}0101`;
				var lastDate = `${year}1231`;
				tempArr.push(firstDate);
				tempArr.push(lastDate);
				return tempArr;
			},
			
			//初始化数据钻取中的下拉菜单选项
			initDropMenu(stationName, timeType) {
				let that = this;
				//更新站点下拉菜单
				var stationSelect = $(this.$refs.station);

				//将select下的option清空
				this.$refs.station.options.length = 0;

				for (let i = 0; i < this.dataList.stationObj.length; i++) {
					let item = this.dataList.stationObj[i];

					let opt;
					if (item.name == stationName) {
						opt = `<option  data-id= ${item.id} value=${item.name} selected = "selected" >${item.name}</option>`
					} else {
						opt = `<option  data-id= ${item.id} value=${item.name} >${item.name}</option>`
					}

					stationSelect.append(opt);
				}
				stationSelect.selectpicker('refresh');

				//更新客户下拉菜单
				var clientSelect =  $(this.$refs.client);
				this.$refs.client.options.length = 0;

				for (let i = 0; i < this.clientList.length; i++) {
					let item = this.clientList[i];

					let	opt = `<option  data-id= ${item.custid} value=${item.customer} >${item.customer}</option>`

					clientSelect.append(opt);
				}
				clientSelect.selectpicker('refresh');


				//更新统计时间范围下拉菜单
				var timeSelect = $(this.$refs.timeType);

				this.$refs.timeType.options.length = 0;

				for (let i = 0; i < this.chooseMenu.length; i++) {
					let item = this.chooseMenu[i];

					let opt;
					if (item.type == timeType) {
						opt = `<option  data-type= ${item.type} value=${item.title} selected = "selected" >${item.title}</option>`
					} else {
						opt = `<option  data-type= ${item.type} value=${item.title} >${item.title}</option>`
					}

					timeSelect.append(opt);
				}
				timeSelect.selectpicker('refresh');
				
				$(this.$refs.dateInput).html('');
				let opt =
					`<input type="text" id="dateChoose" 
						style= "padding-left: 10px;
								height: 38px;
								min-width: 262px;
								line-height: 38px;
								border: 1px solid #e6e6e6;
								background-color: #fff;
								border-radius: 2px;" placeholder="日期范围" v-if="dateShow" />`
				$(this.$refs.dateInput).append(opt)


				let selectType = this.timeSelectMap.get(timeType);
				//更新时间范围选择下拉菜单
				if (timeType == "D") {
					this.dateShow = false;
					this.dateShow = true;
					laydate.render({
						elem: "#dateChoose",
						range: "至",
						theme: "molv",
						done: function(value, date, endDate) {
							that.changeTable(date, endDate);
						}
					});
				} else {
					this.dateShow = false;
					this.dateShow = true;
					laydate.render({
						elem: "#dateChoose",
						range: "至",
						type: `${selectType}`,
						theme: "molv",
						done: function(value, date, endDate) {
							that.changeTable(date, endDate);
						}
					});
				}

			},
			backHome() {
				this.$router.push("/home");
			},
			//营销方量
			top1() {
				let that = this;
				this.chartName.chartTop1 = this.$echarts.init(
					document.getElementById("yxfl")
				);
				this.optionName.optionTop1 = {
					color: ["#3398DB"],
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					grid: {
						left: "0%",
						bottom: "5%",
						right: "15%",
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
						name: "销量",
						nameTextStyle: {
							padding: [0, 25, 0, 0]
						}
					}],
					series: [{
						name: "营销方量",
						type: "bar",
						barWidth: "60%",
						data: this.dataList.yxfl,
						label: {
							show: true,
							position: "top",
							color: "#37a2da"
						}
					}]
				};
				this.chartName.chartTop1.setOption(this.optionName.optionTop1);
				this.chartName.chartTop1.on("click", function(params) {
					that.showTable(params);
				});
			},
			//营销方量同期对比
			top2() {
				let that = this;
				this.chartName.chartTop2 = this.$echarts.init(
					document.getElementById("yxfltqdb")
				);
				this.optionName.optionTop2 = {
					color: ["#3398DB", "#e87319"],
					tooltip: {
						trigger: "axis"
					},
					legend: {
						textStyle: {
							color: "#000" //字体颜色
						},
						data: ["营销方量", "同期营销方量"]
					},
					grid: {
						left: "0%",
						right: "15%",
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
						name: "销量"
					}],
					series: [{
							name: "营销方量",
							type: "bar",
							data: this.dataList.yxfl,
							label: {
								show: true,
								position: "top",
								color: "#37a2da"
							}
						},
						{
							name: "同期营销方量",
							type: "bar",
							data: this.dataList.tqyxfl,
							label: {
								show: true,
								position: "top",
								color: "#e87319"
							}
						}
					]
				};
				this.chartName.chartTop2.setOption(this.optionName.optionTop2);
				this.chartName.chartTop2.on("click", function(params) {
					that.showTable(params);
				});
			},
			//产值
			top3() {
				let that = this;
				this.chartName.chartTop3 = this.$echarts.init(
					document.getElementById("cz")
				);
				this.optionName.optionTop3 = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					grid: {
						left: "0%",
						right: "15%",
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
						name: "金额(万元)",
						nameTextStyle: {
							padding: [0, 0, 0, 25]
						}
					}],
					series: [{
						name: "产值",
						type: "bar",
						barWidth: "60%",
						data: this.dataList.cz,
						label: {
							show: true,
							position: "top",
							color: "#c23531"
						}
					}]
				};
				this.chartName.chartTop3.setOption(this.optionName.optionTop3);
				this.chartName.chartTop3.on("click", function(params) {
					that.showTable(params);
				});
			},
			//产值同期对比
			top4() {
				let that = this;
				this.chartName.chartTop4 = this.$echarts.init(
					document.getElementById("cztqdb")
				);
				this.optionName.optionTop4 = {
					tooltip: {
						trigger: "axis"
					},
					legend: {
						textStyle: {
							color: "#000" //字体颜色
						},
						data: ["产值", "同期产值"]
					},
					grid: {
						left: "0%",
						right: "15%",
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
						name: "销量"
					}],
					series: [{
							name: "产值",
							type: "bar",
							label: {
								show: true,
								position: "top",
								color: "#37a2da"
							},
							data: this.dataList.cz
						},
						{
							name: "同期产值",
							type: "bar",
							label: {
								show: true,
								position: "top",
								color: "#67e0e3"
							},
							data: this.dataList.tqcz
						}
					]
				};
				this.chartName.chartTop4.setOption(this.optionName.optionTop4);
				this.chartName.chartTop4.on("click", function(params) {
					that.showTable(params);
				});
			},
			//单方均价
			bottom1() {
				let that = this;
				this.chartName.chartBottom1 = this.$echarts.init(
					document.getElementById("dfjj")
				);
				this.optionName.optionBottom1 = {
					tooltip: {
						trigger: "axis"
					},
					grid: {
						left: "0%",
						right: "15%",
						bottom: "5%",
						containLabel: true
					},
					legend: {
						textStyle: {
							color: "#000" //字体颜色
						},
						data: ["单方均价", "平均强度"]
					},
					xAxis: [{
						type: "category",
						name: "站点",
						nameTextStyle: {
							padding: [30, 25, 0, 0]
						},
						axisTick: {
							alignWithLabel: true
						},
						data: this.dataList.station,
						axisPointer: {
							type: "shadow"
						},
						axisLabel: {
							textStyle: {
								color: "#000"
							}
						},
						axisLine: {
							lineStyle: {
								color: "#000"
							}
						}
					}],
					yAxis: [{
							type: "value",
							name: "单价(元)",
							min: 0,
							max: 30000,
							splitNumber:6,
							interval: 5000,
							axisLabel: {
								formatter: "{value}",
								textStyle: {
									color: "#000"
								}
							},
							axisLine: {
								lineStyle: {
									color: "#000"
								}
							}
						},
						{
							type: "value",
							name: "平均强度(MP)",
							min: 0,
							max: 60,
							splitNumber:6,
							interval: 10,
							axisLabel: {
								formatter: "{value}",
								textStyle: {
									color: "#000"
								}
							},
							axisLine: {
								lineStyle: {
									color: "#000"
								}
							}
						}
					],
					series: [{
							name: "单方均价",
							type: "bar",
							label: {
								show: true,
								position: "top",
								color: "#37a2da"
							},
							data: this.dataList.dfjj
						},
						{
							name: "平均强度",
							type: "line",
							label: {
								show: true,
								position: "top",
								formatter: "{c}",
								color: "#cd514e"
							},
							symbol: "circle", //拐点样式
							symbolSize: 12, //拐点大小
							yAxisIndex: 1,
							data: this.dataList.pjqd
						}
					]
				};
				//根据y轴两个变量的值，设置坐标轴分割数
				
				this.chartName.chartBottom1.setOption(this.optionName.optionBottom1);
				this.chartName.chartBottom1.on("click", function(params) {
					that.showTable(params);
				});
			},
			//计划量
			bottom2() {
				let that = this;
				this.chartName.chartBottom2 = this.$echarts.init(
					document.getElementById("qdyl")
				);
				this.optionName.optionBottom2 = {
					color: ["#ffdb5c"],
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					grid: {
						left: "0%",
						right: "15%",
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
						name: "方量 (方)"
					}],
					series: [{
						name: "计划量",
						type: "bar",
						barWidth: "60%",
						data: this.dataList.jhl,
						label: {
							show: true,
							position: "top",
							color: "#37a2da"
						}
					}]
				};
				this.chartName.chartBottom2.setOption(this.optionName.optionBottom2);
				this.chartName.chartBottom2.on("click", function(params) {
					that.showTable(params);
				});
			},
			//计划量同期对比
			bottom3() {
				let that = this;
				this.chartName.chartBottom3 = this.$echarts.init(
					document.getElementById("qdyltqdb")
				);
				this.optionName.optionBottom3 = {
					color: ["#ffdb5c", "#ff9f7f"],
					tooltip: {
						trigger: "axis"
					},
					legend: {
						textStyle: {
							color: "#000" //字体颜色
						},
						data: ["计划量", "同期计划量"]
					},
					grid: {
						left: "3%",
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
						name: "销量",
						nameTextStyle: {
							padding: [0, 25, 0, 0]
						}
					}],
					series: [{
							name: "计划量",
							type: "bar",
							label: {
								show: true,
								position: "top",
								color: "#37a2da"
							},
							data: this.dataList.jhl
						},
						{
							name: "同期计划量",
							type: "bar",
							label: {
								show: true,
								position: "top",
								color: "#67e0e3"
							},
							data: this.dataList.tqjhl
						}
					]
				};
				this.chartName.chartBottom3.setOption(this.optionName.optionBottom3);
				this.chartName.chartBottom3.on("click", function(params) {
					that.showTable(params);
				});
			},
	
			async changeMenu(index, type) {


				this.currentIndex = index;
				this.currentType = type;

				this.dataList = await this.getData('sales01_01',type);
				this.dataChange(this.dataList);
			},
			
			// 当数据变化时更新图表
			dataChange(dataList){
				//更新数据表
				//营销方量
				this.optionName.optionTop1.series[0].data = dataList.yxfl;
				this.optionName.optionTop1.xAxis[0].data = dataList.station;
				this.chartName.chartTop1.setOption(this.optionName.optionTop1);
				
				//营销方量同期对比
				this.optionName.optionTop2.series[0].data = dataList.yxfl;
				this.optionName.optionTop2.series[1].data = dataList.tqyxfl;
				this.optionName.optionTop2.xAxis[0].data = dataList.station;
				this.chartName.chartTop2.setOption(this.optionName.optionTop2);
				
				//产值
				this.optionName.optionTop3.series[0].data = dataList.cz;
				this.optionName.optionTop3.xAxis[0].data = dataList.station;
				this.chartName.chartTop3.setOption(this.optionName.optionTop3);
				
				//产值同期对比
				this.optionName.optionTop4.series[0].data = dataList.cz;
				this.optionName.optionTop4.series[1].data = dataList.tqcz;
				this.optionName.optionTop4.xAxis[0].data = dataList.station;
				this.chartName.chartTop4.setOption(this.optionName.optionTop4);
				
				//单方均价
				this.optionName.optionBottom1.series[0].data = dataList.dfjj;
				this.optionName.optionBottom1.series[1].data = dataList.pjqd;
				this.optionName.optionBottom1.xAxis[0].data = dataList.station;
				
				this.setSplitNumber(dataList);//更新纵坐标的分割数
				
				this.chartName.chartBottom1.setOption(this.optionName.optionBottom1);
				
				//计划量
				this.optionName.optionBottom2.series[0].data = dataList.jhl;
				this.optionName.optionBottom2.xAxis[0].data = dataList.station;
				this.chartName.chartBottom2.setOption(this.optionName.optionBottom2);
				
				//计划量同期对比
				this.optionName.optionBottom3.series[0].data = dataList.jhl;
				this.optionName.optionBottom3.series[1].data = dataList.tqjhl;
				this.optionName.optionBottom3.xAxis[0].data = dataList.station;
				this.chartName.chartBottom3.setOption(this.optionName.optionBottom3);
			},
			
			//设置bottom1 单方均价中的纵坐标分割数
			setSplitNumber(data){
				//单方均价，平均强度y坐标分割数动态设置
				let pjqdMax = this.calMax(data.pjqd); //平均强度最大值
				let dfjjMax = this.calMax(data.dfjj); //单方均价最大值
				
				//坐标分割数
				let splitNumber = pjqdMax / 10;
				
				//将单方均价的最大值根据分割数进行调整
				let dfjjSplitNum = Math.ceil(dfjjMax / splitNumber);
				dfjjMax = dfjjSplitNum * splitNumber;
				
				//设置划分的最大值
				this.optionName.optionBottom1.yAxis[0].max = dfjjMax;
				this.optionName.optionBottom1.yAxis[1].max = pjqdMax;
				//设置划分的分割数
				this.optionName.optionBottom1.yAxis[0].splitNumber = splitNumber;
				this.optionName.optionBottom1.yAxis[1].splitNumber = splitNumber;
				//设置分割值
				this.optionName.optionBottom1.yAxis[0].interval = dfjjMax / splitNumber;
				this.optionName.optionBottom1.yAxis[1].interval = pjqdMax / splitNumber;
				
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

			//数据钻取表格展示 --showTable一级数据钻取
			async showTable(params) {
				this.layerShow = true;
				let that = this;
				let stationName = params.name;

				//获取当前统计的时间类型
				var timeType = this.currentType;

				//初始化下拉菜单
				//初始默认什么都不选
				$(this.$refs.station).selectpicker('deselectAll');
				//$(this.$refs.timeType).selectpicker('deselectAll');

				//获取客户列表下拉菜单
				this.clientList = await this.getData('sales01_02',timeType);
				this.clientList.unshift({
					custid:'',
					customer:'无'
				})
				this.clientMap = new Map();
				for(let item of this.clientList){
					this.clientMap.set(item.customer,item.custid);
				}
				this.initDropMenu(stationName, timeType);

				//获取站点ID，利用ID获取对应的客户、工地信息
				var stationID = this.stationMap.get(stationName);

				//调用后端接口获取一级数据钻取信息
				this.yytj_Query.a_userid = stationID;
				this.tableData = [];
			  let yjData = await this.getData('sales01_03',timeType);
				for(let item of yjData){
					let pushData = {
						client: item.client,
						worksite: item.worksite,
						xsl: item.xsl,
						cz: item.cz,
						xsjj: item.xsjj,
						pjqd:item.pjqd
				};
				this.tableData.push(pushData);
				}


				layer.open({
					type: 1,
					title: `${stationName}--列表清单`,
					area: ['80vw','80vh'],
					shadeClose: true, //点击遮罩关闭
					//maxmin: true, //允许全屏最小化
					content: $("#layer"), //绑定一个DOM
					success:function(layero,index){
						layer.iframeAuto(index);
						//设置表格的高度，使其自适应
						let h = document.documentElement.clientHeight;
						h = h*0.6;
						that.Height = h;
						//console.log(that.Height)
					},
					end: function() {
						that.layerShow = false;
					}
				});
				
			},
			stationChange() {
				//获取所选的值
				let stationArr = $("#station").val(); //站点
				let client = $("#client").val();
				let time = $("#time").val(); //时间
			
				if (stationArr != null) {
					//更新列表清单内容
					this.changeList(stationArr, time, client);
				}
			},
			//年、月、日筛选框
			timeChange() {
				let that = this;
				let stationArr = $("#station").val(); //站点
				let client = $("#client").val();
				let time = $("#time").val(); //时间

				if (stationArr != null) {
					this.changeList(stationArr, time, client);
				}

				$(this.$refs.dateInput).html('');
				let opt =
					`<input type="text" id="dateChoose" 
						style= "padding-left: 10px;
								height: 38px;
								min-width: 262px;
								line-height: 38px;
								border: 1px solid #e6e6e6;
								background-color: #fff;
								border-radius: 2px;" placeholder="日期范围" v-if="dateShow" />`
				$(this.$refs.dateInput).append(opt)
				let timeIndex = this.chooseMenu.findIndex((value, index) => {
					return value.title == time;
				})
				//获取当前时间类型的数据
				let timeType = this.chooseMenu[timeIndex].selectType;
			
				if (timeType == "day") {
					that.dateShow = false;
					that.dateShow = true;
					laydate.render({
						elem: "#dateChoose",
						range: "至",
						theme: "molv",
						done: function(value, date, endDate) {
							that.changeTable(date, endDate);
						}
					});
				} else {
					that.dateShow = false;
					that.dateShow = true;
					laydate.render({
						elem: "#dateChoose",
						range: "至",
						type: `${timeType}`,
						theme: "molv",
						done: function(value, date, endDate) {
							that.changeTable(date, endDate);
						}
					});
				}
			},

			async changeList(stationArr, type, client,startDate=null, endDate=null) {
				this.tableData = [];
				let dataList;

				if (stationArr.length == 0) {
					return;
				} else {
					let timeIndex = this.chooseMenu.findIndex((value, index) => {
						return value.title == type;
					})
					//获取当前时间类型，并设置对应的请求参数
					let timeType = this.chooseMenu[timeIndex].type;
					if(startDate && endDate){
						//根据当前时间范围进行了选择
						switch (timeType){
							case 'D':
								let startDay = `${startDate.year}${startDate.month}${startDate.date}`;
								let endDay = `${endDate.year}${endDate.month}${endDate.date}`;
								this.ejdata_Query.a_dfrom = startDay;
								this.ejdata_Query.a_dto = endDay;
								break;
							case 'M':
								let startYear = startDate.year;
								let startMonth = startDate.month;

								let endYear = endDate.year;
								let endMonth = endDate.month+1;

								let startDay_m = this.formatDate(new Date(startYear, startMonth, 1));
								let endDay_m = this.formatDate(new Date(endYear, endMonth, 0));;
								this.ejdata_Query.a_dfrom = startDay_m;
								this.ejdata_Query.a_dto = endDay_m;
								break;
							case 'Y':
								let startYear_y =  startDate.year;
								let endYear_y = endDate.year;

								this.ejdata_Query.a_dfrom = `${startYear_y}0101`;
								this.ejdata_Query.a_dto = `${endYear_y}1231`;
								break;
						}
					}else{
						switch (timeType){
							case 'D':
								let today = this.formatDate(new Date());
								let yesterday = this.getYesterdayDate();
								this.ejdata_Query.a_dfrom = yesterday;
								this.ejdata_Query.a_dto = today;
								break;
							case 'M':
								let monthDate = this.getMonthDate(); 
								this.ejdata_Query.a_dfrom = monthDate[0];
								this.ejdata_Query.a_dto = monthDate[1];
								break;
							case 'Y':
								let yearDate = this.getYearDate();
								this.ejdata_Query.a_dfrom = yearDate[0];
								this.ejdata_Query.a_dto = yearDate[1];
								break;
						}
					}

					if(client.length > 0){
							let clientID = this.clientMap.get(client);
							this.ejdata_Query.a_reptype = clientID;
					}else{
						this.ejdata_Query.a_reptype = '';
					}
				

					//根据所选站点，获取其ID
					let stationIdArr = [];
					for(let item of stationArr){
						let id = this.stationMap.get(item);
						stationIdArr.push(id)
					}
					let stationIdString = stationIdArr.toString();
					this.ejdata_Query.a_userid = stationIdString;

					$(".layui-layer-title")[0].innerText=`${stationArr.toString()}--列表清单`;
					
					//从后台接口获取数据
					this.ejdata_Query.a_dayname = 'sales01_04';
				  const {data: res} = await this.$http.get("jygc_yytj", {params: this.ejdata_Query});
					let ejData =res.data;
					for(let item of ejData){
						let pushData = {
							client: item.client,
							worksite: item.worksite,
							xsl: item.xsl,
							cz: item.cz,
							xsjj: item.xsjj,
							pjqd:item.pjqd
					};
						this.tableData.push(pushData);
					}
				
				}
			},
			changeTable(date, endDate) {
				let stationArr = $("#station").val(); //站点
				let client = $("#client").val();
				let time = $("#time").val(); //时间
			
				if (stationArr != null) {
					//更新列表清单内容
					this.changeList(stationArr, time, client,date, endDate);
				}
			}
		}
	};
</script>

<style scoped>
	#yytj {
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
	#choose-menu {
		padding: 0;
		width: 20%;
		margin: auto;
		margin-bottom: 10px;
		margin-top: 20px;
	}

	#choose-menu li {
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

	/* table */
	.tb th {
		padding: 10px 5px;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		background-color: #f4f5f6;
		line-height: 20px;
		color: #999;
		vertical-align: middle;
	}

	.tb td {
		padding: 10px 5px;
		line-height: 25px;
		background-color: #fff;
		border-bottom: 1px solid #ddd;
		word-wrap: break-word;
		word-break: break-all;
		color: #666;
		vertical-align: middle;
	}

	.tb th.small {
		padding: 5px;
	}

	.tb .hover td {
		background-color: #fafafa;
	}

	.tb-b {
		border: 1px solid #ddd;
	}

	.tb-b th,
	.tb-b td {
		border-color: #ddd;
		border-left: 1px solid #ddd;
	}

	.tb-n th,
	.tb-n td {
		border: 0;
		background: none;
		vertical-align: middle;
		padding: 10px;
		color: #666;
	}

	tr.hover td {
		background-color: #fcfcfc;
	}

	.tb-s {
		border-left: 1px solid #ddd;
		border-top: 1px solid #ddd;
	}

	.tb-s th {
		background-color: #f8f8f8;
		color: #333;
		border-bottom: 1px solid #ddd;
		border-right: 1px solid #ddd;
		padding: 15px 10px;
		width: 120px;
	}

	.tb-s td {
		border-bottom: 1px solid #ddd;
		border-right: 1px solid #ddd;
		padding: 15px 10px;
	}

	.tb-skin1 th {
		position: relative;
		padding: 5px;
		border-top: 0 none;
		border-bottom: 0 none;
		background-color: #f4f5f6;
	}

	.tb-skin1 th:before {
		content: "";
		position: absolute;
		right: -1px;
		top: 5px;
		bottom: 5px;
		display: block;
		width: 1px;
		background-color: #ddd;
		font-size: 0;
		z-index: 1;
	}

	.tb-skin1 th:last-child {
		overflow: hidden;
		*zoom: 1;
	}

	.tb-min th,
	.tb-min td {
		padding: 1px 4px;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	.c-100 {
		width: 100%;
	}

	.c-t-center {
		text-align: center;
	}

	.mt30 {
		margin-top: 30px;
	}

	.mb10 {
		margin-bottom: 10px;
	}

	.ptb20 {
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.c-main {
		width: 1000px;
		margin: 0 auto;
	}

	#process-demo-1 th,
	tr {
		text-align: center;
	}

	.selectpicker {
		width: 50px !important;
	}

	.jeinpbox {
		width: 230px;
		margin-right: 10px;
		float: left;
		vertical-align: middle;
		position: relative;
	}

	.select_title {
		padding-left: 10px;
		font-size: 14px;
		padding-right: 10px;
	}

	#dateChoose::-webkit-input-placeholder {
		color: white;
	}

	#dateChoose:-moz-placeholder {
		color: white;
	}

	#dateChoose::-moz-placeholder {
		color: white;
	}

	#dateChoose:-ms-input-placeholder {
		color: white;
	}

	.demo-input {
		padding-left: 10px;
		height: 38px;
		min-width: 262px;
		line-height: 38px;
		border: 1px solid #e6e6e6;
		background-color: #fff;
		border-radius: 2px;
	}
	.layerTable{
		bottom: 2rem;
		top:15px;
	}

	@import "../../assets/css/jygc/wzcgbb.css";
</style>
