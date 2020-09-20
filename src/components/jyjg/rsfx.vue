<template>
	<div class="container-fluid container-bg office-efficiency-index" id="rsfx">
		<div class="row office-header">
			<div class="col-sm-12 col-md-12 pd title-info">人事分析</div>
			<div class="col-sm-7 col-md-7 pd analysis-filter">
				<a class="a-access" @click="backHome">
					<button class="button type1">返回首页</button>
				</a>
			</div>
		</div>
		<div class="row office-header-content">
			<div id="selectMenu" style="margin: 20px;">
				<span class="select_title">部门:</span>
				<select id="department" class="selectpicker" data-style="btn-success" ref="department" @change="departmentChange"></select>

				<span class="select_title">岗位:</span>
				<select id="position" class="selectpicker" data-style="btn-info" ref="position" @change="positionChange"></select>
			</div>
			<!-- top 01 员工总数  -->
			<div class="col-sm-4 col-md-4 pd">
				<div class="col-info">
					<div class="title">{{title.top1}}</div>
					<div class="content base-info" id="ygzs"></div>
				</div>
			</div>
			<!-- top 02 离职人员人数-->
			<div class="col-sm-4 col-md-4 pd">
				<div class="col-info">
					<div class="title">{{title.top2}}</div>
					<div class="content base-info" id="lzryrs"></div>
				</div>
			</div>
			<!-- top 03 入职人员人数-->
			<div class="col-sm-4 col-md-4 pd">
				<div class="col-info">
					<div class="title">{{title.top3}}</div>
					<div class="content base-info" id="rzryrs"></div>
				</div>
			</div>
			<!-- bottom 01 分部门离职与入职人员  -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.bottom1}}</div>
					<div class="content staff-info" id="fbmlzyrz"></div>
				</div>
			</div>
			<!-- bottom 02 分岗位离职与入职人员 -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.bottom2}}</div>
					<div class="content staff-info" id="fgwlzyrz"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: {
					top1: "员工总数",
					top2: "离职人员人数",
					top3: "入职人员人数",
					bottom1: "所有部门 离职与入职人员",
					bottom2: "所有岗位 离职与入职人员"
				},
				chartName: {
					chartTop1: "",
					chartTop2: "",
					chartTop3: "",
					chartBottom1: "",
					chartBottom2: ""
				},
				optionName: {
					optionTop1: "",
					optionTop2: "",
					optionTop3: "",
					optionBottom1: "",
					optionBottom2: ""
				},
				//公司总的人数分析  --员工总数，离职人数、入职人数
				dataList:{},
				//分部门请求条件
				departQuerInfo:{
					id:null
				},
				
				//分岗位查询条件
				//分部门请求条件
				positionQuerInfo:{
					id:null
				},
				
				//部门列表
				department: [],
				//部门下拉列表
				departmentList:[],
				//岗位列表
				position: [],
				//岗位下拉列表
				positionList:[],
				
				//分部门数据
				departmentData: {
					lzrs:[],
					rzrs:[]
				},
				//分岗位数据
				positionData: {
					lzrs:[],
					rzrs:[]
				},
				
				//下拉列表项
				//分部门
				dropDepartment:[],
				dropDepartmentData: {
					lzrs:[],
					rzrs:[]
				},
				
				//分岗位
				dropPosition:[],
				dropPositionData: {
					lzrs:[],
					rzrs:[]
				},
			};
		},
		async created() {
			await this.getMenuList();

			this.top1();
			this.top2();
			this.top3();
			this.bottom1();
			this.bottom2();
			window.addEventListener("resize", () => {
				this.chartName.chartTop1.resize();
				this.chartName.chartTop2.resize();
				this.chartName.chartTop3.resize();
				this.chartName.chartBottom1.resize();
				this.chartName.chartBottom2.resize();
			});
		},
		// mounted() {
		// 	this.$nextTick(function() {
		// 		this.initDropMenu();
				
		// 	});
		// },
		methods: {
			//更新下拉列表菜单
			initDropMenu(){
				
				//部门下拉菜单
				var departSlect = $(this.$refs.department);
				for(let i=0;i<this.departmentList.length;i++){
					let item = this.departmentList[i];
					let opt=`<option  data-id= ${item.id} value=${item.name}>${item.name}</option>`
					departSlect.append(opt);
				}
				departSlect.selectpicker('refresh');
				
				//岗位下拉菜单
				var positionSlect = $(this.$refs.position);
				for(let i=0;i<this.positionList.length;i++){
					let item = this.positionList[i];
					let opt=`<option data-id = ${item.id} value=${item.name}>${item.name}</option>`
					positionSlect.append(opt);
				}
				positionSlect.selectpicker('refresh');
			},
			backHome() {
				this.$router.push("/home");
			},
			async getMenuList() {
				//员工总数、离职人数、入职人数
				const {data: res} = await this.$http.get("rsfx/getAllData");
				this.dataList = res.data;
				
				//分部门离职与入职情况
				const {data: res2} = await this.$http.get("rsfx/getDataByDepart",{params:this.departQuerInfo});
				this.department = res2.data.departxAxis;
				this.departmentList = res2.data.departList;
				this.departmentList.unshift({
					id:null,
					name:'所有部门'
				})
				this.departmentData.lzrs = res2.data.lzrs;
				this.departmentData.rzrs = res2.data.rzrs;
				
				const {data: res3} = await this.$http.get("rsfx/getDataByPosition",{params:this.positionQuerInfo});
				this.position = res3.data.departxAxis;
				this.positionList = res3.data.departList;
				this.positionList.unshift({
					id:'',
					name:'所有岗位'
				})
				this.positionData.lzrs = res3.data.lzrs;
				this.positionData.rzrs = res3.data.rzrs;
				
			},
			//员工总数
			top1() {
				this.initDropMenu();
				this.chartName.chartTop1 = this.$echarts.init(
					document.getElementById("ygzs")
				);
				this.optionName.optionTop1 = {
					tooltip: {
						formatter: "{a} <br/>{c}"
					},
					series: [{
						name: "员工总数",
						type: "gauge",
						z: 3,
						min: 0,
						max: 3000,
						splitNumber: 15,
						radius: "100%",
						axisLine: {
							// 坐标轴线
							lineStyle: {
								// 属性lineStyle控制线条样式
								width: 10
							}
						},
						axisTick: {
							// 坐标轴小标记
							length: 15, // 属性length控制线长
							lineStyle: {
								// 属性lineStyle控制线条样式
								color: "auto"
							}
						},
						splitLine: {
							// 分隔线
							length: 20, // 属性length控制线长
							lineStyle: {
								// 属性lineStyle（详见lineStyle）控制线条样式
								color: "auto"
							}
						},
						axisLabel: {
							backgroundColor: "auto",
							borderRadius: 2,
							color: "#eee",
							padding: 3,
							textShadowBlur: 2,
							textShadowOffsetX: 1,
							textShadowOffsetY: 1,
							textShadowColor: "#222"
						},
						title: {
							fontWeight: "bolder",
							fontSize: 20,
							offsetCenter: [0, "30%"],
							fontStyle: "italic"
						},
						detail: {
							formatter: function(value) {
								return value;
							},
							fontWeight: "bolder",
							borderRadius: 3,
							backgroundColor: "#444",
							borderColor: "#aaa",
							shadowBlur: 5,
							shadowColor: "#333",
							shadowOffsetX: 0,
							shadowOffsetY: 3,
							borderWidth: 2,
							textBorderColor: "#000",
							textBorderWidth: 2,
							textShadowBlur: 2,
							textShadowColor: "#fff",
							textShadowOffsetX: 0,
							textShadowOffsetY: 0,
							fontFamily: "Arial",
							width: 100,
							color: "#eee",
							offsetCenter: [0, "60%"],
							padding: [5, 0, 0, 0],
							rich: {}
						},
						data: [{
							value: this.dataList.YGZS,
							name: "员工总数"
						}]
					}]
				};
				this.chartName.chartTop1.setOption(this.optionName.optionTop1);
			},
			//离职人员人数
			top2() {
				this.chartName.chartTop2 = this.$echarts.init(
					document.getElementById("lzryrs")
				);
				this.optionName.optionTop2 = {
					tooltip: {
						formatter: "{a} <br/>{c}"
					},
					series: [{
						name: "离职人员人数",
						type: "gauge",
						z: 3,
						radius: "100%",
						axisLine: {
							// 坐标轴线
							lineStyle: {
								// 属性lineStyle控制线条样式
								width: 10
							}
						},
						axisTick: {
							// 坐标轴小标记
							length: 15, // 属性length控制线长
							lineStyle: {
								// 属性lineStyle控制线条样式
								color: "auto"
							}
						},
						splitLine: {
							// 分隔线
							length: 20, // 属性length控制线长
							lineStyle: {
								// 属性lineStyle（详见lineStyle）控制线条样式
								color: "auto"
							}
						},
						axisLabel: {
							backgroundColor: "auto",
							borderRadius: 2,
							color: "#eee",
							padding: 3,
							textShadowBlur: 2,
							textShadowOffsetX: 1,
							textShadowOffsetY: 1,
							textShadowColor: "#222"
						},
						title: {
							// 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: "bolder",
							fontSize: 20,
							offsetCenter: [0, "30%"],
							fontStyle: "italic"
						},
						detail: {
							// 其余属性默认使用全局文本样式，详见TEXTSTYLE
							formatter: function(value) {
								return value;
							},
							fontWeight: "bolder",
							borderRadius: 3,
							backgroundColor: "#68c4d9",
							borderColor: "#aaa",
							shadowBlur: 5,
							shadowColor: "#333",
							shadowOffsetX: 0,
							shadowOffsetY: 3,
							borderWidth: 2,
							textBorderColor: "#000",
							textBorderWidth: 2,
							textShadowBlur: 2,
							textShadowColor: "#fff",
							textShadowOffsetX: 0,
							textShadowOffsetY: 0,
							fontFamily: "Arial",
							width: 100,
							color: "#eee",
							offsetCenter: [0, "60%"],
							padding: [5, 0, 0, 0],
							rich: {}
						},
						data: [{
							value: this.dataList.LZRS,
							name: "离职人员人数"
						}]
					}]
				};
				this.chartName.chartTop2.setOption(this.optionName.optionTop2);
			},
			//入职人员人数
			top3() {
				this.chartName.chartTop3 = this.$echarts.init(
					document.getElementById("rzryrs")
				);
				this.optionName.optionTop3 = {
					tooltip: {
						formatter: "{a} <br/>{c}"
					},
					series: [{
						name: "入职人员人数",
						type: "gauge",
						z: 3,
						radius: "100%",
						axisLine: {
							// 坐标轴线
							lineStyle: {
								// 属性lineStyle控制线条样式
								width: 10
							}
						},
						axisTick: {
							// 坐标轴小标记
							length: 15, // 属性length控制线长
							lineStyle: {
								// 属性lineStyle控制线条样式
								color: "auto"
							}
						},
						splitLine: {
							// 分隔线
							length: 20, // 属性length控制线长
							lineStyle: {
								// 属性lineStyle（详见lineStyle）控制线条样式
								color: "auto"
							}
						},
						axisLabel: {
							backgroundColor: "auto",
							borderRadius: 2,
							color: "#eee",
							padding: 3,
							textShadowBlur: 2,
							textShadowOffsetX: 1,
							textShadowOffsetY: 1,
							textShadowColor: "#222"
						},
						title: {
							// 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: "bolder",
							fontSize: 20,
							offsetCenter: [0, "30%"],
							fontStyle: "italic"
						},
						detail: {
							// 其余属性默认使用全局文本样式，详见TEXTSTYLE
							formatter: function(value) {
								return value;
							},
							fontWeight: "bolder",
							borderRadius: 3,
							backgroundColor: "#c2aa66",
							borderColor: "#aaa",
							shadowBlur: 5,
							shadowColor: "#333",
							shadowOffsetX: 0,
							shadowOffsetY: 3,
							borderWidth: 2,
							textBorderColor: "#000",
							textBorderWidth: 2,
							textShadowBlur: 2,
							textShadowColor: "#fff",
							textShadowOffsetX: 0,
							textShadowOffsetY: 0,
							fontFamily: "Arial",
							width: 100,
							color: "#eee",
							offsetCenter: [0, "60%"],
							padding: [5, 0, 0, 0],
							rich: {}
						},
						data: [{
							value: this.dataList.RZRS,
							name: "入职人员人数"
						}]
					}]
				};
				this.chartName.chartTop3.setOption(this.optionName.optionTop3);
			},
			//部门离职与入职人员情况
			bottom1() {
				this.chartName.chartBottom1 = this.$echarts.init(
					document.getElementById("fbmlzyrz"), 'light'
				);
				this.optionName.optionBottom1 = {
					tooltip: {
						trigger: "axis"
					},
					angleAxis: {},
					radiusAxis: {
						type: "category",
						data: this.department,
						z: 10
					},
					polar: {},
					series: [{
							type: "bar",
							data:this.departmentData.lzrs,
							coordinateSystem: "polar",
							name: "离职人员",
							stack: "a"
						},
						{
							type: "bar",
							data: this.departmentData.rzrs,
							coordinateSystem: "polar",
							name: "入职人员",
							stack: "a"
						}
					],
					legend: {
						show: true,
						data: ["离职人员", "入职人员"]
					}
				};
				this.chartName.chartBottom1.setOption(this.optionName.optionBottom1);
			},
			//岗位离职与入职情况
			bottom2() {
				this.chartName.chartBottom2 = this.$echarts.init(
					document.getElementById("fgwlzyrz")
				);
				this.optionName.optionBottom2 = {
					angleAxis: {
						type: "category",
						data: this.position
					},
					tooltip: {
						trigger: "axis"
					},
					radiusAxis: {},
					polar: {},
					series: [{
							type: "bar",
							data: this.positionData.lzrs,
							coordinateSystem: "polar",
							name: "离职人员",
							stack: "a"
						},
						{
							type: "bar",
							data: this.positionData.rzrs,
							coordinateSystem: "polar",
							name: "入职人员",
							stack: "入职人员"
						}
					],
					legend: {
						show: true,
						data: ["离职人员", "入职人员"]
					}
				};
				this.chartName.chartBottom2.setOption(this.optionName.optionBottom2);
			},
			async departmentChange() {
				//获取部门id
				let id = $(this.$refs.department).find("option:selected").attr("data-id");
				let departmentName = $(this.$refs.department).selectpicker('val');
				if(departmentName == "所有部门"){
					this.optionName.optionBottom1.radiusAxis.data = this.department;
					this.optionName.optionBottom1.series[0].data = this.departmentData.lzrs;
					this.optionName.optionBottom1.series[1].data = this.departmentData.rzrs;
				}else{
					//根据id调用接口获取数据
					this.departQuerInfo = {
						id:id
					}
					const {data: res} = await this.$http.get("rsfx/getDataByDepart",{params:this.departQuerInfo});
					this.dropDepartment = res.data.departxAxis;
					this.dropDepartmentData.lzrs = res.data.lzrs;
					this.dropDepartmentData.rzrs = res.data.rzrs;
					
					this.optionName.optionBottom1.radiusAxis.data = this.dropDepartment;
					this.optionName.optionBottom1.series[0].data = this.dropDepartmentData.lzrs;
					this.optionName.optionBottom1.series[1].data = this.dropDepartmentData.rzrs;
				}

				this.chartName.chartBottom1.setOption(this.optionName.optionBottom1);
				this.title.bottom1 = `${departmentName} 离职与入职人员`;
			},
			async positionChange() {
				//获取岗位id
				let id = $(this.$refs.position).find("option:selected").attr("data-id");
				let positionName = $(this.$refs.position).selectpicker('val');
				if(positionName == '所有岗位'){
					this.optionName.optionBottom2.angleAxis.data = this.position;
					this.optionName.optionBottom2.series[0].data = this.positionData.lzrs;
					this.optionName.optionBottom2.series[1].data = this.positionData.rzrs;
				}else{
					console.log(id)
					this.positionQuerInfo = {
						id:id
					}
					const {data: res} = await this.$http.get("rsfx/getDataByPosition",{params:this.positionQuerInfo});
					console.log(res)
					this.dropPosition = res.data.departxAxis;
					this.dropPositionData.lzrs = res.data.lzrs;
					this.dropPositionData.rzrs = res.data.rzrs;
					
					this.optionName.optionBottom2.angleAxis.data = this.dropPosition;
					this.optionName.optionBottom2.series[0].data = this.dropPositionData.lzrs;
					this.optionName.optionBottom2.series[1].data = this.dropPositionData.rzrs;
				}
				
				this.chartName.chartBottom2.setOption(this.optionName.optionBottom2);
				this.title.bottom2 = `${positionName} 离职与入职人员`;
			}
		}
	};
</script>

<style scoped>
	#rsfx {
		width: 100%;
		height: 100%;
	}

	.office-efficiency-index .col-info {
		background-color: #ffffff !important;
		height: 39vh !important;
	}

	.office-efficiency-index {
		background-color: #f5f5f5 !important;
	}

	.select_title {
		padding-left: 10px;
		font-size: 14px;
		padding-right: 10px;
	}

	.title {
		color: black !important;
	}

	@import "../../assets/css/jygc/wzcgbb.css";
</style>
