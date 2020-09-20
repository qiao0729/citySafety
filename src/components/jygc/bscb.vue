<template>
	<div class="container-fluid container-bg office-efficiency-index" id="bscb">
		<div class="row office-header">
			<div class="col-sm-12 col-md-12 pd title-info">泵送成本</div>
			<div class="col-sm-7 col-md-7 pd analysis-filter">
				<a class="a-access" @click="backHome">
					<button class="button type1">返回首页</button>
				</a>
			</div>
		</div>
		<div class="row office-header-content">
			<!-- top 01 泵送方量  -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.top1}}</div>
					<div class="content base-info" id="bsfl"></div>
				</div>
			</div>
			<!-- top 02 泵送费用-->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.top2}}</div>
					<div class="content base-info" id="bsfy"></div>
				</div>
			</div>
			<!-- bottom 01 泵送准点率  -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.bottom1}}</div>
					<div class="content staff-info" id="bszdl"></div>
				</div>
			</div>
			<!-- bottom 02 平均单方 -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.bottom2}}</div>
					<div class="content staff-info" id="pjdf"></div>
				</div>
			</div>
			<!-- 数据钻取弹出列表 -->
			<div id="layer" style="margin: 20px;" v-show="layerShow">
				<span class="select_title">站点:</span>
				<select id="station" class="selectpicker" multiple data-style="btn-success" ref="station" @change="stationChange">
					<!--  <option
            :key="item.value"
            :value="item.label"
            v-for="item in stationSelecItem"
          >{{item.label}}</option> -->
				</select>

				<span class="select_title">物流商:</span>
				<select id="wls" class="selectpicker" multiple data-style="btn-info" ref="wls" @change="wlsChange">
					<!-- <option :key="item.value" :value="item.label" v-for="item in wlsSelecItem">{{item.label}}</option> -->
				</select>

				<div style="margin-top:20px;">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="station" label="站点" width="150"></el-table-column>
						<el-table-column label="泵送方量">
							<el-table-column prop="bsflType1" label="车载泵"></el-table-column>
							<el-table-column prop="bsflType2" label="车泵"></el-table-column>
							<el-table-column prop="bsflType3" label="电泵"></el-table-column>
						</el-table-column>
						<el-table-column label="泵送费用">
							<el-table-column prop="bsfyType1" label="车载泵"></el-table-column>
							<el-table-column prop="bsfyType2" label="车泵"></el-table-column>
							<el-table-column prop="bsfyType3" label="电泵"></el-table-column>
						</el-table-column>
						<el-table-column label="泵送准点率" id="wlsZdl" v-show="bszdlShow">
							 <el-table-column v-for="item in this.wlsShowList" :key = "item.id" :prop="item.bindDataName" :label="item.name" ></el-table-column> 
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				layerShow: false,
				//物流商筛选
				bszdlShow: true,
				title: {
					top1: "泵送方量",
					top2: "泵送费用",
					bottom1: "泵送准点率",
					bottom2: "平均单方"
				},
				chartName: {
					chartTop1: "",
					chartTop2: "",
					chartBottom1: "",
					chartbottom2: ""
				},
				station: [],
				wls: [],
				//单方成本数据
				dfcbData: [],
				//不同泵送方式对应站点数据
				bsfsData: {},
				//不同物流商对应站点数据
				wlsData: {},
				//站点下拉选项
				stationSelecItem: [],
				//物流商下拉选项
				wlsSelecItem: [],
				tableData: [],
				//物流商显示动态数据
				wlsShowList:[]
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
		methods: {
			async getMenuList() {
				//获取单方成本数据
				const {data: res} = await this.$http.get("jjgc_bscb/dfcb");
				this.station = res.data.station;
				this.dfcbData = res.data.dfcb;

				//获取不同泵送方式对应站点数据
				const {data: res2} = await this.$http.get("jjgc_bscb/bsfs");
				this.bsfsData = res2.data;
				this.stationSelecItem = res2.data.stationID;


				//获取不同物流商对应站点数据
				const {data: res3} = await this.$http.get("jjgc_bscb/wls");
				this.wlsData = res3.data;
				this.wlsSelecItem = res3.data.wlsID;
				this.wlsShowList = this.wlsSelecItem;
				console.log(this.wlsSelecItem)
				this.wls = res3.data.wlsList;
			},
			backHome() {
				this.$router.push("/home");
			},
			//初始化下拉菜单显示内容
			initDropMenu(stationName) {
				//站点选择下拉菜单
				var stationSelect = $(this.$refs.station);

				this.$refs.station.options.length = 0;
				for (let i = 0; i < this.stationSelecItem.length; i++) {
					let item = this.stationSelecItem[i];

					let opt;
					if (item.name == stationName) {
						//设置点击时下拉菜单的默认选项
						opt = `<option  data-id= ${item.id} value=${item.name} selected = "selected" >${item.name}</option>`
					} else {
						opt = `<option  data-id= ${item.id} value=${item.name} >${item.name}</option>`
					}


					stationSelect.append(opt);
				}
				stationSelect.selectpicker('refresh');

				//物流商选择下拉菜单
				var wlsSelect = $(this.$refs.wls);
				this.$refs.wls.options.length = 0
				for (let i = 0; i < this.wlsSelecItem.length; i++) {
					let item = this.wlsSelecItem[i];
					//默认显示全部的物流商信息
					let opt = `<option  data-id= ${item.id} value=${item.name} selected = "selected">${item.name}</option>`

					wlsSelect.append(opt);
				}
				wlsSelect.selectpicker('refresh');
			},
			//泵送方量
			top1() {
				let that = this;
				this.chartName.chartTop1 = this.$echarts.init(
					document.getElementById("bsfl")
				);

				let option = {
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
						data: ["车载泵", "车泵", "电泵"]
					},
					grid: {
						left: "0%",
						bottom: "5%",
						right: "8%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						name: "站点",
						data: this.station,
						axisPointer: {
							type: "shadow"
						}
					}],
					yAxis: [{
						type: "value",
						name: "方量",
						axisLabel: {
							formatter: "{value}"
						}
					}],
					series: [{
							name: "车载泵",
							type: "bar",
							data: this.bsfsData.bsfl.czb
						},
						{
							name: "车泵",
							type: "bar",
							data: this.bsfsData.bsfl.cb
						},
						{
							name: "电泵",
							type: "bar",
							data: this.bsfsData.bsfl.db
						}
					]
				};

				this.chartName.chartTop1.setOption(option);

				this.chartName.chartTop1.on("click", function(param) {
					that.clickEvent(param);
				});
			},
			//泵送费用
			top2() {
				let that = this;
				this.chartName.chartTop2 = this.$echarts.init(
					document.getElementById("bsfy"),
					"light"
				);
				let option = {
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
						data: ["车载泵", "车泵", "电泵"]
					},
					grid: {
						left: "0%",
						bottom: "5%",
						right: "8%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						name: "站点",
						data: this.station,
						axisPointer: {
							type: "shadow"
						}
					}],
					yAxis: [{
						type: "value",
						name: "费用金额",
						axisLabel: {
							formatter: "{value}"
						}
					}],
					series: [{
							name: "车载泵",
							type: "bar",
							data: this.bsfsData.bsfy.czb
						},
						{
							name: "车泵",
							type: "bar",
							data: this.bsfsData.bsfy.cb
						},
						{
							name: "电泵",
							type: "bar",
							data: this.bsfsData.bsfy.db
						}
					]
				};

				this.chartName.chartTop2.setOption(option);
				this.chartName.chartTop2.on("click", function(param) {
					that.clickEvent(param);
				});
			},
			//泵送准点率
			bottom1() {
				let that = this;
				this.chartName.chartBottom1 = this.$echarts.init(
					document.getElementById("bszdl"),
					"light"
				);

				let option = {
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
						data: this.wls
					},
					grid: {
						left: "0%",
						bottom: "5%",
						right: "8%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						name: "站点",
						data: this.station,
						axisPointer: {
							type: "shadow"
						}
					}],
					yAxis: [{
						type: "value",
						name: "百分比",
						axisLabel: {
							formatter: "{value}%"
						}
					}],
					series: []
				};

				for (let item of this.wls) {
					let obj = {
						name: `${item}`,
						type: "bar",
						data: this.wlsData.bszdl[item]
					}
					option.series.push(obj)
				}
				this.chartName.chartBottom1.setOption(option);
				this.chartName.chartBottom1.on("click", function(param) {
					that.clickEvent(param);
				});
			},
			//平均单方
			bottom2() {
				let that = this;
				this.chartName.chartBottom2 = this.$echarts.init(
					document.getElementById("pjdf")
				);
				let option = {
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
						data: this.wls
					},
					grid: {
						left: "0%",
						bottom: "5%",
						right: "8%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						name: "站点",
						nameTextStyle: {
							padding: [25, 0, 0, 0]
						},
						data: this.station,
						axisPointer: {
							type: "shadow"
						}
					}],
					yAxis: [{
							type: "value",
							name: "单价（元）",
							min: 0,
							max: 1000,
							interval: 50,
							splitNumber: 5,
							axisLabel: {
								formatter: "{value}"
							}
						},
						{
							type: "value",
							name: "单价（元）",
							min: 0,
							max: 1000,
							interval: 50,
							splitNumber: 5,
							axisLabel: {
								formatter: "{value}"
							}
						}
					],
					series: [{
						name: "平均单方",
						type: "line",
						yAxisIndex: 1,
						data: this.dfcbData
					}]
				};

				for (let item of this.wls) {
					let obj = {
						name: `${item}`,
						type: "bar",
						data: this.wlsData.pjdf[item]
					}
					option.series.push(obj)
				}

				this.chartName.chartBottom2.setOption(option);
				this.chartName.chartBottom2.on("click", function(param) {
					that.clickEvent(param);
				});
			},
			//数据钻取
			clickEvent(param) {
				//初始下拉菜单，默认什么都不选
				$(this.$refs.station).selectpicker('deselectAll');
				$(this.$refs.wls).selectpicker('deselectAll');
				
				let that = this;
				this.layerShow = true;
				let stationName = param.name;

				//点击时初始化下拉菜单 --设置点击选中的默认初始值
				this.initDropMenu(stationName);

				let index = this.station.findIndex((value, index) => {
					return value == stationName;
				});


				let pushData = {
					station: `${stationName}`,
					bsflType1: this.bsfsData.bsfl.czb[index],
					bsflType2: this.bsfsData.bsfl.cb[index],
					bsflType3: this.bsfsData.bsfl.db[index],
					bsfyType1: this.bsfsData.bsfy.czb[index],
					bsfyType2: this.bsfsData.bsfy.cb[index],
					bsfyType3: this.bsfsData.bsfy.db[index]
				};

				//物流商数据绑定
				for(let j=0; j<this.wlsSelecItem.length; j++){
					let item = this.wlsSelecItem[j];
					let wlsName = item.name;
					let propName = item.bindDataName;
					pushData[propName] = this.wlsData.bszdl[wlsName][index];
				}
				
				this.tableData = [];
				this.tableData.push(pushData);

				

				//根据点击的站点拼接数据
				layer.open({
					type: 1,
					title: `${stationName}--泵送明细`,
					area: ["1200px", "600px"],
					shadeClose: true, //点击遮罩关闭
					content: $("#layer"), //绑定一个DOM
					end: function() {
						that.layerShow = true;
					}
				});


			},
			//根据所选站点的变化进行数据表格的更新
			stationChange() {
				let stationArr = $("#station").val();
				let wlsArr = $("#wls").val();
				if (stationArr != null) {
				  this.changeTable(stationArr, wlsArr);
				}
			},
			wlsChange() {
				let stationArr = $("#station").val();
				let wlsArr = $("#wls").val();
				 if (stationArr != null) {
				  this.changeTable(stationArr, wlsArr);
				}
			},
			changeTable(stationArr, wlsArr) {	
				this.tableData = [];
				//拼接对应站点的数据
				for (let stationName of stationArr) {
					let index = this.station.findIndex((value, index) => {
						return value == stationName;
					});
				
					let pushData = {
						station: `${stationName}`,
						bsflType1: this.bsfsData.bsfl.czb[index],
						bsflType2: this.bsfsData.bsfl.cb[index],
						bsflType3: this.bsfsData.bsfl.db[index],
						bsfyType1: this.bsfsData.bsfy.czb[index],
						bsfyType2: this.bsfsData.bsfy.cb[index],
						bsfyType3: this.bsfsData.bsfy.db[index]
					};
					
				//进行物流商列表的动态修改
				if (wlsArr.length == 0) {
					this.wlsShowList = this.wlsSelecItem;
				} else {
					//动态改变数组
					let tempArr = [];//临时保存选择的物流商
					for (let wls of wlsArr) {
						let wlsIndex = this.wls.findIndex((value, index) => {
							return value == wls;
						});
						
						tempArr.push(this.wlsSelecItem[wlsIndex]);
					}
					this.wlsShowList = tempArr;
				}
				
				for(let j=0; j<this.wlsShowList.length; j++){
					let item = this.wlsShowList[j];
					let wlsName = item.name;
					let propName = item.bindDataName;
					pushData[propName] = this.wlsData.bszdl[wlsName][index];
				}
					this.tableData.push(pushData);
				}
			}
		}
	};
</script>

<style scoped>
	.select_title {
		padding-left: 30px;
		font-size: 14px;
		padding-right: 10px;
	}

	.title {
		color: #000000 !important;
	}

	#bscb {
		width: 100%;
		height: 100%;
	}

	.office-efficiency-index .col-info {
		background-color: #ffffff !important;
		height: 43vh !important;
	}

	.office-efficiency-index {
		background-color: #f5f5f5 !important;
	}

	.analysis-filter {
		height: 4rem;
	}

	@import "../../assets/css/jygc/wzcgbb.css";
</style>
