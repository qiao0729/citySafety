<template>
	<div class="banner-caption clearfix" id="scjkc">
		<div id="title">
			<div class="caption-title clearfix">
				<i class="title-left">
					<img src="../../assets/img/dpxs/title-left.png" />
				</i>
				<p class="title-left-title-font" style="color:white">成都精准商品混凝土有限公司</p>
				<i class="title-left">
					<img src="../../assets/img/dpxs/title-right.png" />
				</i>
			</div>
		</div>
		<div id="main">
			<div class="col-md-12">
				<div class="row">
					<!-- left -->
					<div id="title01" class="col-xs-12 col-sm-12 col-md-3">
						<ul class="ym-menu clearfix" id="choose-menu">
							<li @click="changeData(index,item.type,item.id)" :data-type="item.type" :class="currentIndex == index ? 'ym-active':'taba'"
							 :key="item.id" v-for="(item,index) in timeSelecItem">{{item.title}}</li>
						</ul>
						<!-- left 01 计划量、销量-->
						<div class="data-box1" id="box1-box">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span id="jhlxl_title">{{title.left1}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div id="jhlxl" class="box-echart"></div>
						</div>
						<!-- left 02  销量情况-->
						<div class="data-box1" id="box3-box" style="margin-top: 30px;">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span id="xlqk_title">{{title.left2}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div id="xlqk" class="box-echart"></div>
						</div>

						<!-- left 03  原材料库存情况-->
						<div class="data-box1" id="box2-box" style="margin-top: 30px;">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span id="yclkcqk_title">{{title.left3}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div ref="yclkc" class="box-echart"></div>
						</div>
					</div>
					<!-- center  站点物理位置及信息显示-->
					<div id="title02" class="col-xs-12 col-sm-12 col-md-6 panel-top panel-bottom">
						<div class="data-box1 box1-back" id="box4-box">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span>{{title.center}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div class="t_top_box">
								<ul class="t_nav">
									<li>
										<span>累计签约量</span>
										<h1>{{mapTopData.qyl | NumFormat}}&nbsp;&nbsp;<sub>{{mapTopData.unit}}</sub></h1>
										<i></i>
									</li>
									<li>
										<span>累计销售量</span>
										<h1>{{mapTopData.xsl | NumFormat}}&nbsp;&nbsp;<sub>{{mapTopData.unit}}</sub></h1>
										<i></i>
									</li>
									<li>
										<span>累计签约剩余量</span>
										<h1>{{mapTopData.qysyl | NumFormat}}&nbsp;&nbsp;<sub>{{mapTopData.unit}}</sub></h1>
									</li>
								</ul>
							</div>
							<button type="button" id="cancle" v-show="cancleShow" @click="cancleChoose">取消选中站点</button>
							<div id="box4" class="box-echart-china"></div>
						</div>
					</div>
					<!-- right -->
					<div id="title03" class="col-xs-12 col-sm-12 col-md-3">
						<!-- right 01  当前任务概况-->
						<div class="right-box" id="box5-box">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span id="dqrw_title">{{title.right1}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div id="box5" class="box-echart tabcontent">
								<div class="wrap" ref="warp">
									<div class="fig dqrwgkDiv" :key="index" :data-id="item.id" :data-name="item.name" v-for="(item,index) in dqrwgkData" @click="showData(item.id,item.name)"
									 ><!-- @click="showData(item.id,item.name)" -->
										<p>{{item.name}}</p>
										<em>{{item.value}}</em>
									</div>
									<!-- <vue-seamless-scroll :data="dqrwgkData" :class-option="optionSingleHeight"> -->

									<!-- </vue-seamless-scroll> -->
								</div>
							</div>
						</div>
						<!-- right 02 实时开工数据-->
						<div class="right-box" id="box6-box" style="margin-top: 30px;">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span id="sskg_title">{{title.right2}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div id="box6" class="box-echart tabcontent">
								 <table class="table">
									<thead class="fixedThead">
										<tr>
											<th>站点</th>
											<th>工地</th>
											<th>计划量</th>
											<th>生产量</th>
											<th>完成率(%)</th>
										</tr>
									</thead>
									<tbody id="box6_content" class="scrollTbody" align="center" ref="box6_content"></tbody>
								</table> 
								<!-- 利用elementui进行表格展示 -->
								<!-- <el-table :data="tableData" height="26vh" style="width: 100%" :row-style="getRowClass" :header-row-style="getRowClass"
								 :header-cell-style="getRowClass">
									<el-table-column prop="station" label="站点" width="65%"></el-table-column>
									<el-table-column prop="worksite" label="工地"></el-table-column>
									<el-table-column prop="jhl" label="计划量" width="55%"></el-table-column>
									<el-table-column prop="scl" label="生产量" width="55%"></el-table-column>
									<el-table-column prop="wcl" label="完成率(%)" width="55%"></el-table-column>
								</el-table> -->
							</div>
						</div>
						<!-- right 03 项目预警-->
						<div class="right-box" id="box7-box" style="margin-top: 30px;">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span id="xmyj_title">{{title.right3}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div id="xmyj" class="box-echart">
								<div class="wrap" ref="xmyj">
									<ul ref="yjContent">
										<li :key="index" v-for="(item,index) in xmyjData" :class="item.yjType ==0 ? 'white':'red' ">{{item.yjName}}:{{item.yjContent}}</li>
									</ul>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 利用layer进行弹出 风格比较一致 -->
		<div id="layer" style="margin: 20px;" v-show="layerShow">
			<el-button style="margin-bottom:10px; float: right;" v-show="backShow" type="success" round @click="backLast">返回上一级</el-button>
			<!-- 数据展示表格 -->
			<el-table :data="yjPopData" :height="Height" border style="width: 100%" v-show="yjShow" @row-click="ejShowData">
				<af-table-column fixed prop="station" label="站点"></af-table-column>
				<af-table-column prop="worksite" label="工地名称"></af-table-column>
				<af-table-column prop="grade" label="强度等级"></af-table-column>
				<af-table-column prop="fl" label="方量"></af-table-column>
				<af-table-column prop="jhrq" label="计划日期"></af-table-column>
				<af-table-column prop="jzfs" label="浇筑方式"></af-table-column>
				<af-table-column prop="jzbw" label="浇筑部位"></af-table-column>
			</el-table>
			<el-table :data="ejPopData" :height="Height" border style="width: 100%" v-show="ejShow">
				<af-table-column fixed prop="station" label="站点"></af-table-column>
				<af-table-column fixed prop="worksite" label="工地名称"></af-table-column>
				<af-table-column prop="grade" label="强度等级"></af-table-column>
				<af-table-column prop="shl" label="送货量"></af-table-column>
				<af-table-column prop="shrq" label="送货日期"></af-table-column>
				<af-table-column prop="ljfl" label="累计方量"></af-table-column>
				<af-table-column prop="ljfl" label="累计方量"></af-table-column>
				<af-table-column prop="jzfs" label="浇筑方式"></af-table-column>
				<af-table-column prop="jzbw" label="浇筑部位"></af-table-column>
				<af-table-column prop="shdh" label="送货单号"></af-table-column>
				<af-table-column prop="hth" label="合同号"></af-table-column>
				<af-table-column prop="jhh" label="计划号"></af-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	//存在一个问题  当前任务概况中，因为利用liMarquee滚动表单，所以clone之后的元素没有绑定点击事件，导致有些元素点击无效
	export default {
		inject: ['reload'],
		data() {
			return {
				Height: 450,
				yjShow: true,
				ejShow: false,
				layerShow: false,
				backShow: false,
				//right 01 当前任务概况一、二级钻取数据
				yjPopData: [],
				ejPopData: [],
				popTitle: "",

				//当前任务概况中钻取的类型id
				currentPopID: "",

				//当前任务概况中钻取的类型name
				currentPopName: "",
				clickFlag:false,//当前任务状况是否点击

				currentIndex: 0,
				currentType: "D",
				cancleShow: false,
				stationChoose: "null", //地图交互点击所选择的站点
				mapClickIndex: "",
				mapClickFlag: false,
				mapClickID: '',
				dqrwMap: "", //存储当前任务概况对应关系
				dqrwIDMap: '', //存储当前任务概况中id与模拟数据名称之间的关系
				stationIDMap: '', //存储站点与站点id之间的关系
				title: {
					left1: "计划量/销量",
					left2: "销量情况",
					left3: "原材料库存情况",
					center: "站点物理位置",
					right1: "当前任务概况",
					right2: "实时开工数据",
					right3: "项目预警"
				},
				timeSelecItem: [{
						id: 'D',
						title: "日",
						type: "day"
					},
					{
						id: 'M',
						title: "月",
						type: "month"
					},
					{
						id: 'Y',
						title: "年",
						type: "year"
					}
				],

				//后端API接口获取数据进行存储
				//站点名称、id、经纬度信息
				stationData: {},
				//地图顶端显示数据 --签约量等数据
				mapTopData: {},

				fontColor: "#fff",
				chartName: {
					chartLeft1: "",
					chartLeft2: "",
					chartLeft3: "",
					chartCenter: ""
				},
				optionName: {
					optionLeft1: "",
					optionLeft2: "",
					optionLeft3: "",
					optionCenter: ""
				},
				//显示年的计划量、销量数据

				//计划量、完成量数据
				jhwclData: {},

				//原材料库存数据
				yclkcData: {},

				//销量情况数据
				xlqkData: {},

				//当前任务概况数据
				dqrwgkData: [],

				dqrwgkMap: '', //存储站点名称及id之间的对应关系
				jhhMap: '', //存储工地与计划号之间的对应关系

				//实时开工数据
				tableData: [],

				sskgScroll: '', //实时开工数据滚动实例

				//项目预警数据
				xmyjData: [],

				right01Menu: [],
				jhlxlNum: 0,
				xlqkNum: 0,
				yclkcNum: 0,
				tableNum: 0,
				//timer:'',

				//连接数据库之后，调用存储过程之后的接口设计
				//查询参数 
				dpxs_1Query: {
					a_dfrom: '20200424', //开始时间 格式为yyyymmdd
					a_dto: '20200425', //结束时间 格式为yyyymmdd
					a_userid: 'ALL', //用户 ,传入ALL时返回所有站点数据，传入站点id则返回对应站点数据
					a_layer: 2, //层级（0大区、1小区、2站点）
					a_dayname: '01', //报表名字（01产量表、02主材表、03 C30单方成本表、04单方效益、05质量表）
					a_pos: 1, //位置
					a_reptype: 'D', //时间类型
					RCT1: '' //返回数据表
				}
			};
		},
		//过滤器
		filters: {
			NumFormat: function(value) {
				if (!value) return "0.00";

				var intPart = Number(value) - (Number(value) % 1); //获取整数部分（这里是windy93的方法）
				var intPartFormat = intPart
					.toString()
					.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); //将整数部分逢三一断

				var floatPart = ".00"; //预定义小数部分
				var value2Array = value.toString().split(".");

				//=2表示数据有小数位
				if (value2Array.length == 2) {
					floatPart = value2Array[1].toString(); //拿到小数部分

					if (floatPart.length == 1) {
						//补0,实际上用不着
						return intPartFormat + "." + floatPart + "0";
					} else {
						return intPartFormat + "." + floatPart;
					}
				} else {
					return intPartFormat;
				}
			}
		},
		async created() {
			await this.getMenuList();


			this.initTable() //根据后台获取数据，初始化表格
			this.scrool();
			this.jhlxl();
			this.xlqk();
			this.location()
			this.yclkc();
			window.addEventListener("resize", () => {
				let h = document.documentElement.clientHeight;
				h = h * 0.6;
				this.Height = h;
				this.chartName.chartLeft1.resize();
				this.chartName.chartLeft2.resize();
				this.chartName.chartLeft3.resize();
				this.chartName.chartCenter.resize();
			});
		},
		computed: {
			optionSingleHeight() {
				return {
					singleHeight: 26
				}
			}
		},

		mounted() {
			this.$nextTick(function() {
				let that = this;
				if (this.timer) {
					clearInterval(this.timer);
				} else {
					//前端定时刷新
					this.timer = setInterval(async function() {
						//获取当前选择的时间类型
						let type = that.currentType;
						await that.getMenuList(type);
						//给当前任务概况添加点击事件
						$('.dqrwgkDiv').click(function(){
							let id = $(this).attr('data-id');
							let name =  $(this).attr('data-name');
							if(!that.clickFlag){
								that.showData(id,name);
							}
							
						})
					}, 60000)
				}
			});
		},
		//vue实例销毁的时候清除定时器
		destroyed() {
			clearInterval(this.timer);
		},


		//监听数据的变化
		watch: {
			//计划量/销量
			jhwclData(newValue, oldValue) {
				//console.log(this.dataList);
				//数据变化之后，更新相应的图表展示
				this.jhlxlNum++;
				if (this.jhlxlNum > 2) {
					this.jhlxlChange(newValue); //改变计划量/销量
				}
			},

			//销量情况
			xlqkData(newValue, oldValue) {
				//console.log(this.dataList);
				//数据变化之后，更新相应的图表展示
				this.xlqkNum++;
				if (this.xlqkNum > 2) {
					this.xlqkNumChange(newValue); //改变计划量/销量
				}
			},

			//原材料库存
			yclkcData(newValue, oldValue) {
				//console.log(this.yclkcData);
				//数据变化之后，更新相应的图表展示
				this.yclkcNum++;
				if (this.yclkcNum > 2) {
					this.yclkcChange(); //改变计划量/销量
				}
			},
			
			// dqrwgkData(newValue, oldValue){
			// 	console.log(newValue)
			// },

			// //实时开工数据
			// tableData(newValue, oldValue) {
			// 	//console.log(this.yclkcData);
			// 	//数据变化之后，更新相应的图表展示
			// 	this.tableNum++;
			// 	if(this.tableNum>2){
			// 		this.initTable();//改变计划量/销量
			// 	}
			// },
			deep: true
		},


		methods: {
			//请求后端API接口获取数据
			async getMenuList(a_reptype = 'D') {
				//获取当日日期 --返回yyyymmdd格式
				let today = this.formatDate(new Date());
				let yesterday = this.getYesterdayDate();

				this.dpxs_1Query.a_dfrom = yesterday;
				this.dpxs_1Query.a_dto = today;

				//获取站点坐标和名称
				//地图中显示的是所有站点的名称，所以就算在点击选中了某个站点之后，还是需要获取所有站点的坐标信息
				this.dpxs_1Query.a_userid = 'ALL';

				this.stationData = await this.getData('dp01_01');
				//console.log(this.stationData)
				if (this.mapClickFlag) {
					this.dpxs_1Query.a_userid = this.mapClickID;
				}

				//获取计划量、销量数据
				this.jhwclData = await this.getData('01', a_reptype);
				//console.log(this.jhwclData);

				//获取原材料库存情况数据
				this.yclkcData = await this.getData('dp01_04');

				//获取销量情况数据
				this.xlqkData = await this.getData('dp01_05');
				//console.log(this.xlqkData)


				// //获取累计签约量等数据

				this.mapTopData = await this.getData('dp01_02', 'Y');
				//console.log(this.mapTopData);

				//当前任务概况
				this.dqrwgkData = await this.getData('dp01_06');

				//实时开工数据
				this.tableData = await this.getData('dp01_07');

				//项目预警信息
				this.xmyjData = await this.getData('dp01_08');
				//console.log(this.xmyjData)

			},

			//获取生产及库存各模块数据
			async getData(a_dayname = '01', a_reptype = 'D', a_pos = 1) {
				this.dpxs_1Query.a_dayname = a_dayname;
				this.dpxs_1Query.a_reptype = a_reptype;
				this.dpxs_1Query.a_pos = a_pos;
				const {
					data: res
				} = await this.$http.get("scjkc/dpxs_1", {
					params: this.dpxs_1Query
				});
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

			getRowClass({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				return "background:#000c3b;";
			},

			//初始化实时开工数据表格
			initTable() {
				 let tbody = $(this.$refs.box6_content);
				//清空表格
				tbody.html('');
				for (let data of this.tableData) {
					let opt =`<tr>
					<td width="50">${data.station}</td>
					<td >${data.worksite}</td>
					<td width="50" class="trThree">${data.jhl}</td>
					<td width="50">${data.scl}</td>
					<td width="50">${data.wcl}</td>
					</tr>`
					tbody.append(opt);
				} 

				// if (this.Tabletimer) {
				// 	clearInterval(this.Tabletimer);
				// } else {
				// 	//前端定时刷新
				// 	this.Tabletimer = setInterval(() => {

				// 		//获取当前选择的时间类型
				// 		let first = this.tableData[0];
				// 		this.tableData.shift()
				// 		this.tableData.push(first);
				// 	}, 6000)
				// }
			},
			//内容滚动显示 right 01 right 02 right 03
			scrool() {
				//当前任务概况
				$("#box5 .wrap").liMarquee({
					direction: "up",
					runshort: false, //内容不足不滚动
					scrollamount: 10 /*速度*/
				});


				// $(".el-table--scrollable-y").Scroll({line:1,speed:1,timer:3000,up:"but_up",down:"but_down"}); 
				//
				//实时开工数据
				this.sskgScroll = $("#box6_content").liMarquee({
					direction: "up",
					runshort: false, //内容不足不滚动
					scrollamount: 10
				});

				//预警数据
				//if(this.$refs.yjContent.offsetHeight>=this.$refs.xmyj.offsetHeight){
				$("#xmyj .wrap").liMarquee({
					direction: "up",
					runshort: false, //内容不足不滚动
					scrollamount: 10
				});
				//}
			},
			//left 01 计划量/销量
			jhlxl() {
				this.chartName.chartLeft1 = this.$echarts.init(
					document.getElementById("jhlxl")
				);
				this.optionName.optionLeft1 = {
					tooltip: {
						trigger: "axis"
					},
					legend: {
						textStyle: {
							color: this.fontColor //字体颜色
						},
						data: ["计划量", "销量", "计划完成率"]
					},
					grid: {
						left: "2%",
						bottom: "5%",
						right: "3%",
						containLabel: true
					},
					xAxis: [{
						type: "category",
						name: "站点",
						nameTextStyle: {
							padding: [40, 100, 0, 0]
						},
						axisTick: {
							alignWithLabel: true
						},
						data: this.jhwclData.company,
						axisPointer: {
							type: "shadow"
						},
						axisLine: {
							lineStyle: {
								color: this.fontColor
							}
						}
					}],
					yAxis: [{
							type: "value",
							name: "数量(吨)",
							min: 0,
							max: 3000,
							interval: 500,
							splitNumber: 6,
							axisLabel: {
								formatter: "{value}",
								textStyle: {
									color: this.fontColor
								}
							},
							axisLine: {
								lineStyle: {
									color: this.fontColor
								}
							}
						},
						{
							type: "value",
							name: "完成率(%))",
							min: 0,
							max: 60,
							splitNumber: 6,
							interval: 10,
							axisLabel: {
								formatter: "{value}%",
								textStyle: {
									color: this.fontColor
								}
							},
							axisLine: {
								lineStyle: {
									color: this.fontColor
								}
							}
						}
					],
					series: [{
							name: "计划量",
							type: "bar",
							data: this.jhwclData.dataList.jhl
						},
						{
							name: "销量",
							type: "bar",
							data: this.jhwclData.dataList.xl
						},
						{
							name: "计划完成率",
							type: "line",
							symbol: "circle", //拐点样式
							symbolSize: 12, //拐点大小
							yAxisIndex: 1,
							smooth: true,
							data: this.jhwclData.dataList.wcl
						}
					]
				};

				//设置y轴两个类目的最大值，最小值，以及分割数
				let yMax = this.calMax(this.jhwclData.dataList.jhl); //计划量最大值
				let rateMax;
				let flag = this.jhwclData.dataList.wcl.find(value => value == '100.00'); //如果有100 ，则完成率最大为100
				if (flag) {
					rateMax = 100;
				} else {
					rateMax = this.calMax(this.jhwclData.dataList.wcl); //完成率最大值
				}

				//坐标分割数
				let splitNumber = rateMax / 10;
				//将销量的最大值根据分割数进行调整
				let ySplitNum = Math.ceil(yMax / splitNumber);
				yMax = ySplitNum * splitNumber;

				//设置划分的最大值
				this.optionName.optionLeft1.yAxis[0].max = yMax;
				this.optionName.optionLeft1.yAxis[1].max = rateMax;

				//设置划分的分割数
				this.optionName.optionLeft1.yAxis[0].splitNumber = splitNumber;
				this.optionName.optionLeft1.yAxis[1].splitNumber = splitNumber;

				//设置分割值
				this.optionName.optionLeft1.yAxis[0].interval = yMax / splitNumber;
				this.optionName.optionLeft1.yAxis[1].interval = rateMax / splitNumber;

				this.chartName.chartLeft1.setOption(this.optionName.optionLeft1);
				//this.$forceUpdate();//强制更新视图
			},
			//left 02 销量情况
			xlqk() {
				this.chartName.chartLeft2 = this.$echarts.init(
					document.getElementById("xlqk"), 'light'
				);


				var data = [];
				//this.xlqkData.xAxis 为销量情况的统计时间
				for (let item of this.xlqkData.xAxis) {
					let name = `${item}:00`;
					let obj = {
						name: name,
						value: []
					}
					obj.value.push(item);
					obj.value.push(this.xlqkData.xlqk[item]);
					data.push(obj)
				}
				var anchor = [];

				let name1 = `${this.xlqkData.xAxis[0]}:00`;
				let name2 = `${this.xlqkData.xAxis[this.xlqkData.xAxis.length-1]}:00`;
				anchor.push({
					name: name1,
					value: [name1, 0]
				})

				anchor.push({
					name: name2,
					value: [name2, 0]
				})

				this.optionName.optionLeft2 = {
					tooltip: {
						trigger: 'axis',
						formatter: function(params) {
							params = params[0];
							var date = new Date(params.name);
							return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '  ' + date.getHours() +
								':00' + ' - ' + Number(params.value[1]).toFixed(2)
						},
						axisPointer: {
							animation: false
						}
					},
					grid: {
						left: '3%',
						right: '8%',
						bottom: '2%',
						top: '15%',
						containLabel: true
					},
					xAxis: {
						type: 'time',
						name: "日",
						nameTextStyle: {
							color: this.fontColor
						},
						axisLabel: {
							textStyle: {
								color: this.fontColor
							}
						},
						axisLine: {
							lineStyle: {
								color: this.fontColor
							}
						},
						splitLine: {
							show: false
						}
					},
					yAxis: {
						type: 'value',
						boundaryGap: [0, '100%'],
						name: "销量(吨)",
						nameTextStyle: {
							color: this.fontColor
						},
						axisLabel: {
							textStyle: {
								color: this.fontColor
							}
						},
						axisLine: {
							lineStyle: {
								color: this.fontColor
							}
						},
						splitLine: {
							show: false
						}
					},
					series: [{
							name: '销量情况',
							type: 'line',
							showSymbol: false,
							hoverAnimation: false,
							data: data
						},
						{
							name: '.anchor',
							type: 'line',
							showSymbol: false,
							data: anchor,
							itemStyle: {
								normal: {
									opacity: 0
								}
							},
							lineStyle: {
								normal: {
									opacity: 0
								}
							}
						}
					]
				};



				this.chartName.chartLeft2.setOption(this.optionName.optionLeft2);
			},
			//left 03 原材料库存情况
			yclkc() {
				this.chartName.chartLeft3 = this.$echarts.init(this.$refs.yclkc, "light");
				this.optionName.optionLeft3 = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						left: '0%',
						right: '8%',
						bottom: '2%',
						top: '15%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						boundaryGap: [0, 0.01],
						name: "吨",
						nameTextStyle: {
							color: this.fontColor
						},
						axisLabel: {
							rotate: 40,
							textStyle: {
								color: this.fontColor
							}
						},
						axisLine: {
							lineStyle: {
								color: this.fontColor
							}
						},
					},
					yAxis: {
						type: 'category',
						name: "原材料名称",
						nameTextStyle: {
							color: this.fontColor
						},
						axisLabel: {
							textStyle: {
								color: this.fontColor
							}
						},
						axisLine: {
							lineStyle: {
								color: this.fontColor
							}
						},
						data: this.yclkcData.yclName
					},
					series: [{
						type: 'bar',
						data: []
					}]
				};
				this.yclkcChange();
			},

			//center 站点物理分布
			location() {
				let that = this;
				this.chartName.chartCenter = this.$echarts.init(
					document.getElementById("box4")
				);
				var geoCoordMap = {};
				var data = [];
				for (let item of this.stationData.stationObj) {
					let stationName = item.stationName;
					geoCoordMap[stationName] = [];
					let lon = parseFloat(item.lon);
					let lat = parseFloat(item.lat);
					geoCoordMap[stationName].push(lon);
					geoCoordMap[stationName].push(lat);

					let obj = {
						name: stationName,
						value: [150]
					}
					obj.value.push(stationName);

					data.push(obj);
				}

				var max = 480,
					min = 9;
				var maxSize4Pin = 50,
					minSize4Pin = 20;
				var convertData = function(data) {
					var res = [];
					for (var i = 0; i < data.length; i++) {
						var geoCoord = geoCoordMap[data[i].name];

						if (geoCoord) {
							res.push({
								name: data[i].name,
								value: geoCoord.concat(data[i].value)
							});
						}
					}
					return res;
				};
				this.optionName.optionCenter = {
					tooltip: {
						trigger: "item",
						formatter: function loadData(result) {
							return result.name + "<br />" + result.value[3];
						}
					},
					geo: {
						zoom: 1.2,
						show: true,
						map: "成都",
						mapType: "成都",
						label: {
							normal: {
								show: true,
								textStyle: {
									color: "#4bf316"
								}
							},
							emphasis: {
								show: true,
								textStyle: {
									color: "#fff"
								}
							}
						},
						roam: true,
						itemStyle: {
							normal: {
								borderColor: "rgba(147, 235, 248, 1)",
								borderWidth: 2,
								areaColor: {
									type: "radial",
									x: 0.5,
									y: 0.5,
									r: 0.8,
									colorStops: [{
											offset: 0,
											color: "rgba(175,238,238, 0)" // 0% 处的颜色
										},
										{
											offset: 1,
											color: "rgba(47,79,79, .2)" // 100% 处的颜色
										}
									],
									globalCoord: false // 缺省为 false
								},
								shadowColor: "rgba(128, 217, 248, 1)",
								shadowOffsetX: -2,
								shadowOffsetY: 2,
								shadowBlur: 10
							},
							emphasis: {
								areaColor: "#389BB7",
								borderWidth: 0
							}
						}
					},
					series: [{
							name: "站点物理位置",
							type: "scatter",
							coordinateSystem: "geo",
							symbol: "pin",
							symbolSize: function(val) {
								var a = (maxSize4Pin - minSize4Pin) / (max - min);
								var b = minSize4Pin - a * min;
								b = maxSize4Pin - a * max;
								return a * val[2] + b;
							},
							label: {
								normal: {
									formatter: "{b}",
									show: true,
									textStyle: {
										color: "#fff",
										fontSize: 10
									}
								}
							},
							itemStyle: {
								normal: {
									color: "red" //标志颜色
								}
							},
							zlevel: 6,
							data: convertData(data)
						},
						{
							type: "effectScatter",
							coordinateSystem: "geo",
							data: convertData(
								data
								.sort(function(a, b) {
									return b.value - a.value;
								})
								.slice(0, 47)
							),
							symbolSize: function(val) {
								return val[2] / 10;
							},
							showEffectOn: "render",
							rippleEffect: {
								brushType: "stroke"
							},
							hoverAnimation: true,
							itemStyle: {
								normal: {
									color: "#05C3F9",
									shadowBlur: 10,
									shadowColor: "#05C3F9"
								}
							},
							zlevel: 1
						}
					]
				};
				this.chartName.chartCenter.setOption(this.optionName.optionCenter);

				//给地图中的站点添加点击事件
				this.chartName.chartCenter.on("click", function(params) {
					that.changeView(params);
				});
			},
			//根据年、月、日时间范围的不同更改数据表 -- 计划量/销量  销量情况
			async changeData(index, type, id) {
				this.currentIndex = index;
				this.currentType = id;

				//日
				let today = this.formatDate(new Date());
				let yesterday = this.getYesterdayDate();
				//月
				let monthDate = this.getMonthDate();

				//年
				let yearDate = this.getYearDate();

				this.dpxs_1Query.a_dfrom = yesterday;
				this.dpxs_1Query.a_dto = today;


				//根据当前选择的是年、月、日改变查询参数
				switch (id) {
					case 'D':
						this.dpxs_1Query.a_reptype = 'D';
						this.optionName.optionLeft2.xAxis.name = '日';
						break;
					case 'M':
						this.dpxs_1Query.a_reptype = 'M';
						this.optionName.optionLeft2.xAxis.name = '月';
						break;
					case 'Y':
						this.dpxs_1Query.a_reptype = 'Y';
						this.optionName.optionLeft2.xAxis.name = '年';
						break;
				}


				//获取对应时间类型的计划量销量数据
				this.dpxs_1Query.a_dayname = '01';
				const {
					data: jhlres
				} = await this.$http.get("scjkc/dpxs_1", {
					params: this.dpxs_1Query
				});
				this.jhwclData = jhlres.data;

				//获取对应时间类型的销量情况数据
				this.dpxs_1Query.a_dayname = 'dp01_05';
				const {
					data: xlqkres
				} = await this.$http.get("scjkc/dpxs_1", {
					params: this.dpxs_1Query
				});
				this.xlqkData = xlqkres.data;

				//left 01 计划量/销量更新
				this.jhlxlChange();

				//left 02 销量情况
				this.xlqkNumChange();

				// if (this.mapClickFlag) {
				// 	//计算计划量/销量的横坐标分隔数
				// 	let yMax = jhlxlData[0][this.mapClickIndex];
				// 	let rateMax = jhlxlData[2][this.mapClickIndex];
				// 	if (rateMax != '-') {
				// 		rateMax = rateMax
				// 	} else {
				// 		rateMax = 60;
				// 	}

				// 	//坐标分割数
				// 	let splitNumber = rateMax / 10;
				// 	let ySplitNum = Math.ceil(yMax / splitNumber);
				// 	yMax = ySplitNum * splitNumber;

				// 	//设置划分的最大值
				// 	this.optionName.optionLeft1.yAxis[0].max = yMax;
				// 	this.optionName.optionLeft1.yAxis[1].max = rateMax;

				// 	//设置划分的分割数
				// 	this.optionName.optionLeft1.yAxis[0].splitNumber = splitNumber;
				// 	this.optionName.optionLeft1.yAxis[1].splitNumber = splitNumber;

				// 	//设置分割值
				// 	this.optionName.optionLeft1.yAxis[0].interval = yMax / splitNumber;
				// 	this.optionName.optionLeft1.yAxis[1].interval = rateMax / splitNumber;

				// 	let seriesData1 = [];
				// 	let seriesData2 = [];
				// 	let seriesData3 = [];

				// 	seriesData1.push(jhlxlData[0][this.mapClickIndex])
				// 	seriesData2.push(jhlxlData[1][this.mapClickIndex])
				// 	seriesData3.push(jhlxlData[2][this.mapClickIndex])

				// 	this.optionName.optionLeft1.series[0].data = seriesData1;
				// 	this.optionName.optionLeft1.series[1].data = seriesData2;
				// 	this.optionName.optionLeft1.series[2].data = seriesData3;

				// 	//left 02 销量情况更新
				// 	this.optionName.optionLeft2.series[0].name = `站点${this.mapClickIndex+1}`;
				// 	this.optionName.optionLeft2.series[1].name = `站点${this.mapClickIndex+1}`;
				// 	this.optionName.optionLeft2.series[2].name = `站点${this.mapClickIndex+1}`;
				// 	this.optionName.optionLeft2.series[3].name = `站点${this.mapClickIndex+1}`;
				// 	this.optionName.optionLeft2.series[4].name = `站点${this.mapClickIndex+1}`;

				// 	this.optionName.optionLeft2.series[0].data = xlqkData[this.mapClickIndex];
				// 	this.optionName.optionLeft2.series[1].data = xlqkData[this.mapClickIndex];
				// 	this.optionName.optionLeft2.series[2].data = xlqkData[this.mapClickIndex];
				// 	this.optionName.optionLeft2.series[3].data = xlqkData[this.mapClickIndex];
				// 	this.optionName.optionLeft2.series[4].data = xlqkData[this.mapClickIndex];
				// } else {



				//}


			},

			//计划量，销量图表更新
			jhlxlChange() {
				let yMax = this.calMax(this.jhwclData.dataList.jhl); //计划量最大值
				let rateMax;
				let flag = this.jhwclData.dataList.wcl.find(value => value == '100.00'); //如果有100 ，则完成率最大为100
				if (flag) {
					rateMax = 100;
				} else {
					rateMax = this.calMax(this.jhwclData.dataList.wcl); //完成率最大值
				}

				//坐标分割数
				let splitNumber = rateMax / 10;
				//将销量的最大值根据分割数进行调整
				let ySplitNum = Math.ceil(yMax / splitNumber);
				yMax = ySplitNum * splitNumber;

				//设置划分的最大值
				this.optionName.optionLeft1.yAxis[0].max = yMax;
				this.optionName.optionLeft1.yAxis[1].max = rateMax;
				//设置划分的分割数
				this.optionName.optionLeft1.yAxis[0].splitNumber = splitNumber;
				this.optionName.optionLeft1.yAxis[1].splitNumber = splitNumber;
				//设置分割值
				this.optionName.optionLeft1.yAxis[0].interval = yMax / splitNumber;
				this.optionName.optionLeft1.yAxis[1].interval = rateMax / splitNumber;


				//将值设置到 图表中
				this.optionName.optionLeft1.series[0].data = this.jhwclData.dataList.jhl;
				this.optionName.optionLeft1.series[1].data = this.jhwclData.dataList.xl;
				this.optionName.optionLeft1.series[2].data = this.jhwclData.dataList.wcl;

				this.chartName.chartLeft1.setOption(this.optionName.optionLeft1);
			},

			//销量情况更新
			xlqkNumChange() {
				let xlqkdata = [];
				let xlqkanchor = [];


				for (let item of this.xlqkData.xAxis) {
					let name = `${item}:00:00`;
					let obj = {
						name: name,
						value: []
					}
					obj.value.push(item);
					obj.value.push(this.xlqkData.xlqk[item]);
					xlqkdata.push(obj)
				}

				let name1 = `${this.xlqkData.xAxis[0]}:00:00`;
				let name2 = `${this.xlqkData.xAxis[this.xlqkData.xAxis.length-1]}:00:00`;
				xlqkanchor.push({
					name: name1,
					value: [name1, 0]
				})

				xlqkanchor.push({
					name: name2,
					value: [name2, 0]
				})

				this.optionName.optionLeft2.series[0].data = xlqkdata;
				this.optionName.optionLeft2.series[1].data = xlqkanchor;

				this.chartName.chartLeft2.setOption(this.optionName.optionLeft2);
			},

			//原材料库存数据变化
			yclkcChange() {
				for (let i = 0; i < this.yclkcData.yclName.length; i++) {
					let yclName = this.yclkcData.yclName[i];
					let data = this.yclkcData.yclObj[yclName][0].kcl;
					this.optionName.optionLeft3.series[0].data.push(data);
				}
				this.chartName.chartLeft3.setOption(this.optionName.optionLeft3);
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

			//改变每个模块标题 --根据所选站点
			async changeView(params) {
				if (params.componentType == "series") {
					//显示取消选择按钮
					this.cancleShow = true;
					this.mapClickFlag = true;
					this.stationChoose = params.name; //当前选中的站点名称
					//console.log(this.stationChoose)
					let type = this.currentType; //年、月、日时间选择类型

					//更改相关模块的显示内容
					let xAxisArr = [];
					xAxisArr.push(this.stationChoose);
					this.mapClickIndex = params.dataIndex;


					//获取点击的站点对应的ID
					let stationData = this.stationData.stationObj;

					let clickStation = stationData.find(ele => {
						return ele.stationName == this.stationChoose;
					})
					let clickStationID = clickStation.id;
					this.mapClickID = clickStationID;

					//left 01 计划量/销量
					this.optionName.optionLeft1.xAxis[0].data = xAxisArr;
					this.chartName.chartLeft1.setOption(this.optionName.optionLeft1);

					//left 02 销量情况
					//从后端接口获取对应站点的销量情况
					this.dpxs_1Query.a_userid = clickStationID;
					let xlqkData = await this.getData('dp01_05', type);

					//更新销量情况图表
					//更新x轴显示内容
					var data = [];
					//this.xlqkData.xAxis 为销量情况的统计时间
					for (let item of xlqkData.xAxis) {
						let name = `${item}:00`;
						let obj = {
							name: name,
							value: []
						}
						obj.value.push(item);
						obj.value.push(xlqkData.xlqk[item]);
						data.push(obj)
					}
					var anchor = [];

					let name1 = `${xlqkData.xAxis[0]}:00`;
					let name2 = `${xlqkData.xAxis[xlqkData.xAxis.length-1]}:00`;
					anchor.push({
						name: name1,
						value: [name1, 0]
					})

					anchor.push({
						name: name2,
						value: [name2, 0]
					})
					this.optionName.optionLeft2.series = [];
					this.optionName.optionLeft2.series.push({
						name: '销量情况',
						type: 'line',
						showSymbol: false,
						hoverAnimation: false,
						data: data
					})
					this.optionName.optionLeft2.series.push({
						name: '.anchor',
						type: 'line',
						showSymbol: false,
						data: anchor,
						itemStyle: {
							normal: {
								opacity: 0
							}
						},
						lineStyle: {
							normal: {
								opacity: 0
							}
						}
					})

					this.chartName.chartLeft2.setOption(this.optionName.optionLeft2, true);


					//left 03 原材料库存

					//从后端接口获取对应站点的原材料库存信息
					let yclkcData = await this.getData('dp01_04', type);

					//更新y轴原材料名称
					this.optionName.optionLeft3.yAxis.data = yclkcData.yclName;
					this.optionName.optionLeft3.series[0].data = [];
					for (let i = 0; i < yclkcData.yclName.length; i++) {
						let yclName = yclkcData.yclName[i];
						let data = yclkcData.yclObj[yclName][0].kcl;
						this.optionName.optionLeft3.series[0].data.push(data);
					}

					this.chartName.chartLeft3.setOption(this.optionName.optionLeft3, true);

					//right 01 当前任务概况
					//从后端API接口获取数据
					this.dqrwgkData = await this.getData('dp01_06');

					//数据视图不更新之后不得已使用的方法
					// $(this.$refs.warp).empty();
					// for (let item of dqrwgkData) {
					// 	let opt =
					// 		`
					// 	<div class="fig dqrwgkDiv"  :data-id="item.id" :data-name="item.name">
					// 		<p>${item.name}</p>
					// 		<em>${item.value}</em>
					// 	</div>
					// 	`
					// 	$(this.$refs.warp).append(opt)
					// }

					// $("#box5 .wrap").liMarquee({
					// 	direction: "up",
					// 	runshort: false,
					// 	scrollamount: 10 /*速度*/
					// });


					//更改显示名称
					this.title.left1 = `${this.stationChoose}计划量/销量`;
					this.title.left2 = `${this.stationChoose}销量情况`;
					this.title.left3 = `${this.stationChoose}原材料库存情况`;
					this.title.right1 = `${this.stationChoose}当前任务概况`;

					//right 02 实时开工数据
					this.title.right2 = `${this.stationChoose}实时开工数据`;
					this.title.right3 = `${this.stationChoose}项目预警`;


					//right 02 实时开工数据

					//从后端接口获取对应站点的实时开工数据
					this.tableData = await this.getData('dp01_07');
					this.initTable();
					//更新滚动
					this.sskgScroll.liMarquee('update');

					//right 03 项目预警	
					this.xmyjData = await this.getData('dp01_08');
					//console.log('项目预警数据')
					//console.log(this.xmyjData)


					// console.log(this.tableData)
					// console.log(this.xmyjData)
					this.$forceUpdate(); //强制更新视图

				}
			},
			//取消已经选择的站点
			async cancleChoose() {
				this.cancleShow = false;
				this.mapClickFlag = false;
				let type = this.currentType;
				this.dpxs_1Query.a_userid = 'ALL';



				//修改相关模块显示内容
				//left 01 计划量/销量
				this.jhwclData = await this.getData('01', type);
				this.optionName.optionLeft1.xAxis[0].data = this.jhwclData.company;
				this.optionName.optionLeft1.series[0].data = this.jhwclData.dataList.jhl;
				this.optionName.optionLeft1.series[1].data = this.jhwclData.dataList.xl;
				this.optionName.optionLeft1.series[2].data = this.jhwclData.dataList.wcl;
				//设置y轴两个类目的最大值，最小值，以及分割数
				let yMax = this.calMax(this.jhwclData.dataList.jhl); //计划量最大值
				let rateMax;
				let flag = this.jhwclData.dataList.wcl.find(value => value == '100.00'); //如果有100 ，则完成率最大为100
				if (flag) {
					rateMax = 100;
				} else {
					rateMax = this.calMax(this.jhwclData.dataList.wcl); //完成率最大值
				}

				//坐标分割数
				let splitNumber = rateMax / 10;
				//将销量的最大值根据分割数进行调整
				let ySplitNum = Math.ceil(yMax / splitNumber);
				yMax = ySplitNum * splitNumber;

				//设置划分的最大值
				this.optionName.optionLeft1.yAxis[0].max = yMax;
				this.optionName.optionLeft1.yAxis[1].max = rateMax;

				//设置划分的分割数
				this.optionName.optionLeft1.yAxis[0].splitNumber = splitNumber;
				this.optionName.optionLeft1.yAxis[1].splitNumber = splitNumber;

				//设置分割值
				this.optionName.optionLeft1.yAxis[0].interval = yMax / splitNumber;
				this.optionName.optionLeft1.yAxis[1].interval = rateMax / splitNumber;
				this.chartName.chartLeft1.setOption(this.optionName.optionLeft1);

				//left 02 销量情况
				//更新销量情况图表
				//更新x轴显示内容
				this.xlqkData = await this.getData('dp01_05', type);
				var data = [];
				//this.xlqkData.xAxis 为销量情况的统计时间
				for (let item of this.xlqkData.xAxis) {
					let name = `${item}:00`;
					let obj = {
						name: name,
						value: []
					}
					obj.value.push(item);
					obj.value.push(this.xlqkData.xlqk[item]);
					data.push(obj)
				}
				var anchor = [];

				let name1 = `${this.xlqkData.xAxis[0]}:00`;
				let name2 = `${this.xlqkData.xAxis[this.xlqkData.xAxis.length-1]}:00`;
				anchor.push({
					name: name1,
					value: [name1, 0]
				})

				anchor.push({
					name: name2,
					value: [name2, 0]
				})
				this.optionName.optionLeft2.series = [];
				this.optionName.optionLeft2.series.push({
					name: '销量情况',
					type: 'line',
					showSymbol: false,
					hoverAnimation: false,
					data: data
				})
				this.optionName.optionLeft2.series.push({
					name: '.anchor',
					type: 'line',
					showSymbol: false,
					data: anchor,
					itemStyle: {
						normal: {
							opacity: 0
						}
					},
					lineStyle: {
						normal: {
							opacity: 0
						}
					}
				})

				this.chartName.chartLeft2.setOption(this.optionName.optionLeft2, true);

				//left 03 原材料库存
				//从后端接口获取对应站点的原材料库存信息
				let yclkcData = await this.getData('dp01_04', type);

				//更新y轴原材料名称
				this.optionName.optionLeft3.yAxis.data = yclkcData.yclName;
				this.optionName.optionLeft3.series[0].data = [];
				for (let i = 0; i < yclkcData.yclName.length; i++) {
					let yclName = yclkcData.yclName[i];
					let data = yclkcData.yclObj[yclName][0].kcl;
					this.optionName.optionLeft3.series[0].data.push(data);
				}

				this.chartName.chartLeft3.setOption(this.optionName.optionLeft3, true);

				//right 01 当前任务概况
				//从后端API接口获取数据
				this.dqrwgkData = await this.getData('dp01_06');

				//数据视图不更新之后不得已使用的方法
				// $(this.$refs.warp).empty();
				// for (let item of dqrwgkData) {
				// 	let opt =
				// 		`
				// 		<div class="fig dqrwgkDiv"  :data-id="item.id" :data-name="item.name">
				// 			<p>${item.name}</p>
				// 			<em>${item.value}</em>
				// 		</div>
				// 		`
				// 	$(this.$refs.warp).append(opt)
				// }

				// $("#box5 .wrap").liMarquee({
				// 	direction: "up",
				// 	runshort: false,
				// 	scrollamount: 10 /*速度*/
				// });
				//修改标题
				this.title.left1 = "计划量/销量";
				this.title.left2 = "销量情况";
				this.title.left3 = "原材料库存情况";
				this.title.center = "站点物理位置";
				this.title.right1 = "当前任务概况";
				this.title.right2 = "实时开工数据";
				this.title.right3 = "项目预警";


				//right 02 实时开工数据


				//从后端接口获取对应站点的实时开工数据
				this.tableData = await this.getData('dp01_07');
				this.initTable()
				this.sskgScroll.liMarquee('update');

				//right 03 项目预警
				this.xmyjData = await this.getData('dp01_08');
				//console.log('项目预警数据')
				//console.log(this.xmyjData)
				this.$forceUpdate(); //强制更新视图

			},

			//right 01 当前任务概况，点击进行数据钻取
			async showData(id, name) {
				//由id获取当前任务概况一级数据钻取内容
				console.log(1)
				let that = this;
				if (this.mapClickFlag) {
					this.dpxs_1Query.a_userid = this.mapClickID;
				}
				this.yjShow = true;
				this.ejShow = false;
				this.backShow = false;
				this.clickFlag = true;

				this.currentPopID = id;
				this.currentPopName = name;

				//this.dpxs_1Query.a_pos = id;

				this.yjPopData = [];
				let yjData = await this.getData('dp01_09', 'D', id);
				this.yjPopData = yjData.data;

				// 将站点id与name利用Map进行映射，在二级数据钻取时，根据点击的行的工地名，获取计划号
				this.dqrwgkMap = new Map();
				this.jhhMap = new Map();

				for (let item of yjData.IdAndName) {
					let stationId = item.stationId;
					let station = item.station;
					let worksite = item.worksite;
					let worksiteId = item.worksiteId;
					this.dqrwgkMap.set(station, stationId);
					this.jhhMap.set(worksite, worksiteId);
				}

				layer.open({
					type: 1,
					title: `${name}明细`,
					area: ['80vw', '80vh'],
					shadeClose: true, //点击遮罩关闭
					//maxmin: true, //允许全屏最小化
					content: $("#layer"), //绑定一个DOM
					success: function(layero, index) {
						layer.iframeAuto(index);
						let h = document.documentElement.clientHeight;
						h = h * 0.7;
						that.Height = h;
					},
					end: function() {
						that.layerShow = false;
						that.clickFlag = false;
					}
				});

			},
			//当前任务概况二级数据钻取
			async ejShowData(row) {
				this.yjShow = !this.yjShow;
				this.ejShow = !this.ejShow;
				this.backShow = true;
				this.ejPopData = [];
				let station = row.station;
				let stationID = this.dqrwgkMap.get(station);
				if (this.mapClickFlag) {
					this.dpxs_1Query.a_userid = this.mapClickID;
				}

				this.dpxs_1Query.a_userid = stationID;

				//获取工地名称从而获取计划号
				let worksite = row.worksite;
				let worksiteID = this.jhhMap.get(worksite);

				this.ejPopData = await this.getData('dp01_10', worksiteID);
			},
			//返回上一级
			backLast() {
				this.yjShow = true;
				this.ejShow = false;
				this.backShow = false;
			}
		}
	};
</script>

<style scoped>
	@import "../../assets/css/dpxs/scjkc.css";

	#title {
		display: flex;
		display: -webkit-flex;
		display: -webkit-box;
		display: -moz-flex;
		display: -moz-box;
		display: -ms-flexbox;
	}

	#scjkc {
		margin: 0px;
		/* height: 100vh; */
		width: 100vw;
		height: 100vh;
		font-family: sans-serif;
		-webkit-text-size-adjust: 100%;
		-ms-text-size-adjust: 100%;
		font-size: 62.5%;
		line-height: 1.5;
		color: #333333;
		background-color: #000c3b;
		position: relative;
		font-family: "微软雅黑";
	}

	#xmyj ul li {
		font-size: 1.8rem;
	}

	.trThree {
		margin-right: 20px !important;
	}

	#box6 {
		background-color: #000c3b !important;
	}
</style>
