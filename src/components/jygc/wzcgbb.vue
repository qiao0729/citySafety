<template>
	<div class="container-fluid container-bg office-efficiency-index" id="wzcgbb">
		<div class="row office-header">
			<div class="col-sm-12 col-md-12 pd title-info">物资采购报表</div>
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
			<!-- top 01 原材料购进情况  -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.top1}}</div>
					<div class="content base-info" id="yclgjqk"></div>
				</div>
			</div>
			<!-- top 02 原材料实时库存-->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.top2}}</div>
					<div class="content base-info" id="yclsskc"></div>
				</div>
			</div>
			<!-- bottom 01 原材料购进计划完成比例  -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.bottom1}}</div>
					<div class="content staff-info" id="yclgjjh"></div>
				</div>
			</div>
			<!-- bottom 02 原材料付款情况 -->
			<div class="col-sm-6 col-md-6 pd">
				<div class="col-info">
					<div class="title">{{title.bottom2}}</div>
					<div class="content staff-info" id="yclfkqk"></div>
				</div>
			</div>
		</div>

		<!-- 数据钻取弹出列表 -->
		<div id="layer" style="margin: 20px;" v-show="show">
			<div id="selectMenu" style="margin: 20px;">
				<span class="select_title">站点:</span>
				<select id="station" class="selectpicker" multiple data-style="btn-success" ref="station" @change="chooseChange"></select>

				<span class="select_title">物料名称:</span>
				<select id="yclname" class="selectpicker" data-live-search="true" data-style="btn-info" ref="yclname" @change="yclChange"></select>


				<span v-show="ejTable">
					<span class="select_title">供应商:</span>
					<select id="gysname" class="selectpicker" data-live-search="true" data-style="btn-primary" ref="gysname" @change="gysChange"></select>
				</span>

				<el-button style="margin-bottom:10px; float: right;" v-show="backShow" type="success" round @click="backLast">返回上一级</el-button>
			</div>

			<!-- 一级数据钻取显示表格 -->
			<el-table :data="tableData" :height="Height" border style="width: 100%;" v-show="yjTable" @row-click="openDetails">
				<af-table-column fixed prop="station" label="站点"></af-table-column>
				<af-table-column fixed prop="supplier" label="供应商"></af-table-column>
				<af-table-column prop="yclname" label="物料名称"></af-table-column>
				<af-table-column prop="price" label="单价"></af-table-column>
				<af-table-column prop="total" label="总量"></af-table-column>
				<af-table-column prop="car" label="车数"></af-table-column>
			</el-table>
			<!-- 二级数据钻取表格 -->
			<el-table :data="tableData" :height="Height" border style="width: 100%" v-show="ejTable">
				<af-table-column fixed prop="station" label="站点"></af-table-column>
				<af-table-column fixed prop="yclname" label="物料名称"></af-table-column>
				<af-table-column prop="number" label="供应商编号"></af-table-column>
				<af-table-column prop="gys" label="供应商"></af-table-column>
				<af-table-column prop="price" label="单价"></af-table-column>
				<af-table-column prop="shsl" label="收货数量"></af-table-column>
				<af-table-column prop="je" label="金额"></af-table-column>
				<af-table-column prop="shkf" label="收货库房"></af-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		inject: ['reload'],
		data() {
			return {
				Height: 500,
				//控制数据钻取中相应表格的显示，隐藏
				show: false,
				backShow: false,
				yjTable: true,
				ejTable: false,

				//表格数据
				theadStryj: "", //一级数据钻取表头
				trStr: "", //一级钻取数据列表内容
				theadStr: "", //二级钻表头
				tbStr: "", //二级钻取数据列表内容
				//各模块显示标题
				title: {
					top1: "原材料购进情况",
					top2: "原材料实时库存",
					bottom1: "原材料购进计划完成比例",
					bottom2: "原材料付款情况"
				},

				//图表名称
				chartName: {
					chartTop1: "",
					chartTop2: "",
					chartBottom1: "",
					chartbottom2: ""
				},
				//各图表配置项名称
				optionName: {
					optionTop1: "",
					optionTop2: "",
					optionBottom1: "",
					optionBottom2: ""
				},

				currentIndex: 0, //当前所选择的索引
				currentType: "D", //当前所展示的数据时间类型
				chooseMenu: [{
						id: 0,
						title: "日",
						type: "D",
						selectType: "day" //该类型设置用于时间范围下拉初始化
					},
					{
						id: 1,
						title: "月",
						type: "M",
						selectType: "month" //该类型设置用于时间范围下拉初始化
					},
					{
						id: 2,
						title: "年",
						type: "Y",
						selectType: "year" //该类型设置用于时间范围下拉初始化
					}
				],

				//各物料实时库存、购进情况等数据
				dataList: {},
				//站点id与名称之间的对应关系
				stationMap: "",
				//物料id与名称之间的关系
				yclMap: "",

				//供应商id与名称之间的对应关系
				gysMap: '',
				gysObject: [],
				//数据钻取表格内容
				tableData: [],
				//一级数据钻取数据
				yjTableData: [],

				//二级数据钻取数据
				ejTableData: [],
				watchNum:0,

				//物资采购报表请求后端接口需要携带的参数
				wzcgbb_Query: {
					a_dfrom: "20200424", //开始时间 格式为yyyymmdd
					a_dto: "20200425", //结束时间 格式为yyyymmdd
					a_userid: "ALL", //用户 ,传入ALL时返回所有站点数据，传入站点id则返回对应站点数据
					a_layer: 2, //层级（0大区、1小区、2站点）
					a_dayname: "mm01_01", //报表名字
					a_pos: 1, //位置
					a_reptype: "D", //时间类型
					RCT1: "" //返回数据表
				}
			};
		},
		async created() {
			await this.getMenuList();

			this.top1();
			this.top2();
			// this.bottom1();
			// this.bottom2();
			window.addEventListener("resize", () => {
				//设置表格的高度，使其自适应
				let h = document.documentElement.clientHeight;
				h = h * 0.6;
				this.Height = h;
				this.chartName.chartTop1.resize();
				this.chartName.chartTop2.resize();
				//this.chartName.chartBottom1.resize();
				// this.chartName.chartbottom2.resize();
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
				  				await that.getMenuList('mm01_01',type);
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
			async getMenuList(a_dayname = "mm01_01", a_reptype = "D") {
				//获取当日日期 --返回yyyymmdd格式
				let today = this.formatDate(new Date());
				let yesterday = this.getYesterdayDate();

				this.wzcgbb_Query.a_dfrom = yesterday;
				this.wzcgbb_Query.a_dto = today;

				//获取原材料购进情况、原材料实时库存信息
				this.dataList = await this.getData(a_dayname,a_reptype);

				//将原材料列表的名称及id用map结构存储起来
				this.yclMap = new Map();
				for (let item of this.dataList.yclListObj) {
					let id = item.id;
					let name = item.name;
					this.yclMap.set(name, id);
				}

				//获取bottom两个图表的数据
			},
			async getData(a_dayname = "mm01_01", a_reptype = "D") {
				this.wzcgbb_Query.a_dayname = a_dayname;
				this.wzcgbb_Query.a_reptype = a_reptype;
				const {
					data: res
				} = await this.$http.get("jygc_wzcgbb", {
					params: this.wzcgbb_Query
				});
				return res.data;
			},

			//格式化日期，返回yyyymmdd格式  获取当日日期
			formatDate(date) {
				var year = date.getFullYear();

				var month =
					date.getMonth() + 1 < 10 ?
					"0" + (date.getMonth() + 1) :
					date.getMonth() + 1;

				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

				var dateStr = `${year}${month}${day}`;
				return dateStr;
			},

			//获取昨天的日期
			getYesterdayDate() {
				//获取当前时间前一天
				var nowdate = new Date();
				nowdate.setDate(nowdate.getDate() - 1);
				var y = nowdate.getFullYear();
				var m =
					nowdate.getMonth() + 1 < 10 ?
					"0" + (nowdate.getMonth() + 1) :
					nowdate.getMonth() + 1;
				var d =
					nowdate.getDate() < 10 ? "0" + nowdate.getDate() : nowdate.getDate();
				var formatwdate = `${y}${m}${d}`;
				return formatwdate;
			},
			//初始化一级数据钻取下拉菜单
			initDropMenu(stationName, yclName) {
				//站点
				var stationSelect = $(this.$refs.station);

				this.$refs.station.options.length = 0;

				for (let i = 0; i < this.dataList.stationObj.length; i++) {
					let item = this.dataList.stationObj[i];

					let opt;
					if (item.name == stationName) {
						opt = `<option  data-id= ${item.id} value=${item.name} selected = "selected" >${item.name}</option>`;
					} else {
						opt = `<option  data-id= ${item.id} value=${item.name} >${item.name}</option>`;
					}

					stationSelect.append(opt);
				}
				stationSelect.selectpicker("refresh");

				//物料名称
				var yclSelect = $(this.$refs.yclname);

				this.$refs.yclname.options.length = 0;

				for (let i = 0; i < this.dataList.yclListObj.length; i++) {
					let item = this.dataList.yclListObj[i];

					let opt;
					if (item.name == yclName) {
						opt = `<option  data-id= ${item.id} value=${item.name} selected = "selected" >${item.name}</option>`;
					} else {
						opt = `<option  data-id= ${item.id} value=${item.name} >${item.name}</option>`;
					}

					yclSelect.append(opt);
				}
				yclSelect.selectpicker("refresh");
			},
			backHome() {
				this.$router.push("/home");
			},
			backLast() {
				this.backShow = !this.backShow;
				this.yjTable = !this.yjTable;
				this.ejTable = !this.ejTable;
				//拼接一级数据
				this.tableData = [];
				//console.log(this.yjTableData)
				this.tableData = this.yjTableData;
			},

			//各原材料购进情况 X轴：站点  y轴：购进量
			top1() {
				let that = this; //实例化echarts后，this指向不同

				//实例化图表
				this.chartName.chartTop1 = this.$echarts.init(
					document.getElementById("yclgjqk")
				);
				this.optionName.optionTop1 = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross",
							label: {
								backgroundColor: "#6a7985"
							}
						}
					},
					legend: {
						//各原材料名称，图例太多时利用分页展示
						type: "scroll", //分页类型
						data: (function() {
							var list = [];
							for (let yclName of that.dataList.yclList) {
								list.push(yclName);
							}
							return list;
						})()
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						boundaryGap: false,
						name: "站点",
						data: this.dataList.station
					}],
					yAxis: [{
						type: "value",
						name: "购进量"
					}],
					series: []
				};

				//将后台接口获取的数据push到series中
				for (let item of this.dataList.yclList) {
					let dataObj = {
						name: `${item}`,
						type: "line",
						stack: "总量",
						areaStyle: {},
						data: this.dataList.yclgjqk[item]
					};
					that.optionName.optionTop1.series.push(dataObj);
				}

				//渲染图表
				this.chartName.chartTop1.setOption(that.optionName.optionTop1);

				//添加点击原材料进行数据钻取事件
				this.chartName.chartTop1.on("click", function(params) {
					that.showYjData(params);
				});
			},

			//原材料实时库存情况
			top2() {
				let that = this; //实例化echarts后，this指向不同,故先将this变量赋值给that变量
				//实例化图表
				this.chartName.chartTop2 = this.$echarts.init(
					document.getElementById("yclsskc"),
					"light"
				);

				//配置项设置
				that.optionName.optionTop2 = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross",
							label: {
								backgroundColor: "#6a7985"
							}
						}
					},
					legend: {
						//各原材料名称，图例太多时利用分页展示
						type: "scroll", //分页类型
						data: (function() {
							var list = [];
							for (let yclName of that.dataList.yclList) {
								list.push(yclName);
							}
							return list;
						})()
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						boundaryGap: false,
						name: "站点",
						data: this.dataList.station
					}],
					yAxis: [{
						type: "value",
						name: "当前库存"
					}],
					series: []
				};

				//将后台接口获取的各原材料实时库存push井series中
				for (let item of this.dataList.yclList) {
					let dataObj = {
						name: `${item}`,
						type: "line",
						stack: "总量",
						areaStyle: {},
						data: this.dataList.yclsskc[item]
					};
					that.optionName.optionTop2.series.push(dataObj);
				}
				//渲染图表
				this.chartName.chartTop2.setOption(that.optionName.optionTop2);
			},
			bottom1() {
				this.chartName.chartBottom1 = this.$echarts.init(
					document.getElementById("yclgjjh")
				);
				this.chartName.chartBottom1.setOption({
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
						data: ["计划量", "进货量", "计划完成率"]
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						data: this.dataList.station,
						axisPointer: {
							type: "shadow"
						}
					}],
					yAxis: [{
							type: "value",
							name: "数量",
							min: 0,
							max: 250,
							interval: 25,
							axisLabel: {
								formatter: "{value}"
							}
						},
						{
							type: "value",
							name: "完成率",
							min: 0,
							max: 100,
							interval: 20,
							axisLabel: {
								formatter: "{value} %"
							}
						}
					],
					series: [{
							name: "计划量",
							type: "bar",
							data: this.dataGjqk.jhl
						},
						{
							name: "进货量",
							type: "bar",
							data: this.dataGjqk.wcl
						},
						{
							name: "计划完成率",
							type: "line",
							yAxisIndex: 1,
							data: this.dataGjqk.jhwcl
						}
					]
				});
			},
			bottom2() {
				this.chartName.chartbottom2 = this.$echarts.init(
					document.getElementById("yclfkqk")
				);
				let option = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross",
							label: {
								backgroundColor: "#6a7985"
							}
						}
					},
					legend: {
						data: this.dataList.yclList
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						boundaryGap: false,
						data: this.dataList.station
					}],
					yAxis: [{
						type: "value",
						name: "付款额"
					}],
					series: []
				};

				for (let item of this.dataList.yclList) {
					let dataObj = {
						name: `${item}`,
						type: "line",
						stack: "总量",
						areaStyle: {},
						data: this.dataList.yclfkqk[item]
					};
					option.series.push(dataObj);
				}

				this.chartName.chartbottom2.setOption(option);
			},

			//年、月、日时间切换
			async changeMenu(index, type) {
				//改变当前年月日选中的下标，类型
				this.currentIndex = index;
				this.currentType = type;

				//从后台接口获取相应类型的数据
				this.dataList = await this.getData("mm01_01", type);
				
				//更新图表
				this.dataChange();

			},
			
			//更新数据表格
			dataChange(){
				
				//更新相应的数据表
				//更新top1 原材料购进情况
				this.optionName.optionTop1.xAxis[0].data = this.dataList.station;
				this.optionName.optionTop1.series = [];
				for (let item of this.dataList.yclList) {
					let dataObj = {
						name: `${item}`,
						type: "line",
						stack: "总量",
						areaStyle: {},
						data: this.dataList.yclgjqk[item]
					};
					this.optionName.optionTop1.series.push(dataObj);
				}
				
				this.chartName.chartTop1.setOption(this.optionName.optionTop1);
				
				//更新top2 原材料实时库存情况
				this.optionName.optionTop2.xAxis[0].data = this.dataList.station;
				this.optionName.optionTop2.series = [];
				for (let item of this.dataList.yclList) {
					let dataObj = {
						name: `${item}`,
						type: "line",
						stack: "总量",
						areaStyle: {},
						data: this.dataList.yclgjqk[item]
					};
					this.optionName.optionTop2.series.push(dataObj);
				}
				
				this.chartName.chartTop2.setOption(this.optionName.optionTop2);
			},

			//一级数据钻取
			async showYjData(params) {
				let that = this;
				//console.log(params)
				//一级钻取
				let stationName = params.name; //点击选中的站点名
				let yclName = params.seriesName; //原材料名称

				// 初始化下拉菜单 --将点击选中的站点、原材料名称进行默认选中
				this.initDropMenu(stationName, yclName);

				//根据原材料名称获取原材料的ID用于从数据接口获取对应原材料的钻取数据
				let yclID = this.yclMap.get(yclName);


				//从后端接口获取数据 --利用物料id 
				let dataList = await this.getData('mm01_04', yclID); //利用物料id从后端接口获取的一级数据钻取数据

				let clickIndex = params.seriesIndex;
				this.show = true;

				//向表格中添加数据
				this.tableData = [];
				for (let i = 0; i < dataList.station.length; i++) {
					let pushData = {
						station: `${dataList.station[i]}`,
						supplier: `${dataList.gys[i]}`,
						yclname: `${yclName}`,
						price: dataList.price[i],
						total: dataList.total[i],
						car: dataList.car[i]
					};

					this.tableData.push(pushData);
				}

				this.yjTableData = this.tableData; //为了返回上一级时显示数据，所以将数据保存起来


				//建立供应商名称与id之间的对应关系

				this.gysObject = dataList.gysObject;
				this.gysMap = new Map();
				for (let item of this.gysObject) {
					this.gysMap.set(item.name, item.id)
				}

				//供应商去重
				let newobj = {};
				this.gysObject = this.gysObject.reduce((preVal, curVal) => {
					newobj[curVal.id] ? '' : newobj[curVal.id] = preVal.push(curVal);
					return preVal
				}, [])



				layer.open({
					type: 1,
					title: `${yclName}--采购统计清单`,
					area: ['80vw', '80vh'],
					shadeClose: true, //点击遮罩关闭
					//maxmin: true, //允许全屏最小化
					content: $("#layer"), //绑定一个DOM
					success: function(layero, index) {
						layer.iframeAuto(index);
						//设置表格的高度，使其自适应
						let h = document.documentElement.clientHeight;
						h = h * 0.6;
						that.Height = h;
						that.yjTable = true;
						that.ejTable = false;
					},
					end: function() {
						that.yjTable = true;
						that.ejTable = false;
						that.backShow = false;
						that.show = false;
					}
				});
			},
			//站点改变 
			chooseChange() {
				//获取所选的值
				let stationArr = $("#station").val();
				let yclName = $("#yclname").val();
				if (stationArr != null) {
					//更新列表清单内容
					this.changeTable(stationArr, yclName);
				}
			},

			//原材料改变
			yclChange() {
				let yclName = $("#yclname").val();
				//更新列表清单内容
				//判断当前显示的是一级表格还是二级表格
				if (this.yjTable) {
					//当前显示的是一级表格
					this.changeTable1(yclName);
				} else if (this.ejTable) {
					//当前显示的是二级表格
					let supplierName = $("#gysname").val();
					let yclID = this.yclMap.get(yclName);
					let supplierId = this.gysMap.get(supplierName);
					this.gysTableChange(yclID, supplierId, supplierName);
				}

			},

			//站点改变后更新数据表格
			changeTable(stationName, yclName) {
				$(".layui-layer-title")[0].innerText = `${yclName}--采购统计清单`;
				this.tableData = [];
				if (this.yjTable) {
					for (let station of stationName) {
						for (let data of this.yjTableData) {
							if (data.station == station) {
								this.tableData.push(data);
							}
						}
					}
				} else if (this.ejTable) {
					for (let station of stationName) {
						for (let data of this.ejTableData) {
							if (data.station == station) {
								this.tableData.push(data);
							}
						}
					}
				}

			},

			//原材料改变后更新数据表格
			async changeTable1(yclName) {
				$(".layui-layer-title")[0].innerText = `${yclName}--采购统计清单`;
				let yclID = this.yclMap.get(yclName);
				//从后端接口获取数据 --利用物料id 
				let dataList = await this.getData('mm01_04', yclID); //利用物料id从后端接口获取的一级数据钻取数据
				//console.log(dataList)
				
				this.gysObject = dataList.gysObject;
				this.gysMap = new Map();
				for (let item of this.gysObject) {
					this.gysMap.set(item.name, item.id)
				}

				//更新站点列表选择
				var stationSelect = $(this.$refs.station);

				this.$refs.station.options.length = 0;
				let newStation = [...new Set(dataList.station)]
				for (let i = 0; i < newStation.length; i++) {
					let item = newStation[i];
					let opt = `<option  value=${item} >${item}</option>`;
					stationSelect.append(opt);
				}
				stationSelect.selectpicker("refresh");

				//向表格中添加数据
				this.tableData = [];
				for (let i = 0; i < dataList.station.length; i++) {
					let pushData = {
						station: `${dataList.station[i]}`,
						supplier: `${dataList.gys[i]}`,
						yclname: `${yclName}`,
						price: dataList.price[i],
						total: dataList.total[i],
						car: dataList.car[i]
					};

					this.tableData.push(pushData);
				}

				this.yjTableData = this.tableData;
				this.$forceUpdate(); //强制更新视图
			},

			//二级数据钻取
			openDetails(row) {
				//row --所点击行的行数据
				//console.log(row)
				//用物料id和站点id查询送货明细
				this.backShow = !this.backShow;
				this.yjTable = !this.yjTable;
				this.ejTable = !this.ejTable;


				//拼接二级数据表格
				let yclName = row.yclname;
				let yclID = this.yclMap.get(yclName);
				//console.log(yclID)

				//供应商名称
				let supplierName = row.supplier;
				let supplierId = this.gysMap.get(supplierName);
				this.gysTableChange(yclID, supplierId, supplierName);

			},

			//供应商改变触发的事件
			gysChange() {
				//根据所选的供应商id以及物料id更新数据表格
				let yclName = $("#yclname").val();
				let supplierName = $("#gysname").val();
				let yclID = this.yclMap.get(yclName);
				let supplierId = this.gysMap.get(supplierName);
				this.gysTableChange(yclID, supplierId, supplierName);
			},

			//二级表格的更新
			async gysTableChange(yclID, supplierId, supplierName) {
				//console.log(2)
				//初始化供应商选择
				var gysSelect = $(this.$refs.gysname);

				this.$refs.gysname.options.length = 0;

				for (let i = 0; i < this.gysObject.length; i++) {
					let item = this.gysObject[i];

					let opt;
					if (item.name == supplierName) {
						opt = `<option  data-id= ${item.id} value=${item.name} selected = "selected" >${item.name}</option>`;
					} else {
						opt = `<option  data-id= ${item.id} value=${item.name} >${item.name}</option>`;
					}

					gysSelect.append(opt);
				}
				gysSelect.selectpicker("refresh");

				let queryInfo = `${yclID}@${supplierId}`
				let ejDataList = await this.getData('mm01_05', queryInfo);
				//console.log(queryInfo)
				//console.log(ejDataList)


				this.tableData = [];
				for (let i = 0; i < ejDataList.station.length; i++) {
					let pushData = {
						station: `${ejDataList.station[i]}`,
						yclname: `${ejDataList.yclname[i]}`,
						number: `${ejDataList.number[i]}`,
						gys: `${ejDataList.gys[i]}`,
						price: ejDataList.price[i],
						shsl: ejDataList.shsl[i],
						je: ejDataList.je[i],
						shkf: ejDataList.shkf[i]
					};

					this.tableData.push(pushData);
				}

				this.ejTableData = this.tableData;
			}
		}
	};
</script>

<style scoped>
	#wzcgbb {
		width: 100vw;
		height: 100vh;
		font-size: 62.5%;
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
		color: black !important;
	}

	.select_title {
		padding-left: 1rem;
		font-size: 1.4rem;
		padding-right: 1rem;
	}

	#layer {
		cursor: pointer !important;
	}

	/* 年、月、日切换按钮样式 */
	#choose-menu {
		padding: 0;
		width: 20%;
		margin: auto;
		margin-bottom: 1rem;
		margin-top: 2rem;
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

	#yclname div.dropdown-menu.open {
		max-height: 250px !important;
		overflow: hidden;
	}

	#yclname ul.dropdown-menu.inner {
		max-height: 200px !important;
		overflow-y: auto;
	}

	@import "../../assets/css/jygc/wzcgbb.css";
</style>
