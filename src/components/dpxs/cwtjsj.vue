<template>
	<div class="banner-caption clearfix" id="cwtjsj">
		<div id="title">
			<div class="caption-title clearfix">
				<i class="title-left">
					<img src="../../assets/img/dpxs/title-left.png" />
				</i>
				<p class="title-left-title-font" id="cwtjsjTitle">{{title.pageTitle}}</p>
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
						<!-- left 01 -->
						<div class="data-box boxHeight" id="box1-box">
							<div class="t_top_box" style="height: 80%;">
								<img class="t_l_line" src="../../assets/img/dpxs/left_line.png" alt />
								<ul class="t_nav" id="zuo_info">
									<li :key="item.id" v-for="(item,index) in left01Menu" @click="showL1Data(item.title)">
										<span>{{item.title}}</span>
										<h1>{{item.value | NumFormat }}</h1>
										<i :class="index == left01Menu.length-1 ? 'hide':'show'"></i>
									</li>
								</ul>
								<img class="t_r_line" src="../../assets/img/dpxs/right_line.png" alt />
							</div>
						</div>
						<!-- left 02 -->
						<div class="data-box1 boxHeight1" id="box2-box" style="margin-top: 30px;">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span id="yclkcqk_title">{{title.left2}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div id="box2" class="box-echart"></div>
						</div>
						<!-- left 03 -->
						<div class="data-box1 boxHeight1" id="box3-box" style="margin-top: 30px;">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span id="xlqk_title">{{title.left3}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div id="box3" class="box-echart"></div>
						</div>
					</div>
					<!-- center -->
					<div id="title02" class="col-xs-12 col-sm-12 col-md-6 panel-top panel-bottom">
						<!-- center 01 -->
						<div class="data-box1 box1-back" id="box4-box" >
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span>{{title.center1}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div class="t_top_box">
								<!-- <img class="t_l_line" src="images/left_line.png" alt=""> -->
								<ul class="t_nav">
									<li :key="index" v-for="(item,index) in center01Menu.data">
										<span>{{item.title}}</span>
										<h1>{{item.value | NumFormat }}&nbsp;&nbsp;<sub>{{center01Menu.unit}}</sub></h1>
										<i :class="index == center01Menu.data.length-1 ? 'hide':'show'"></i>
									</li>
								</ul>
								<!-- <img class="t_r_line" src="images/right_line.png" alt=""> -->
							</div>
							<el-button id="cancle" v-show="cancleShow" type="success" round @click="cancleChoose">取消选中站点</el-button>
							<div id="box4" class="box-echart-china"></div>
						</div>
						<!-- center 02 -->
						<div class="data-box1 " id="box2-box" style="margin-top: 30px;height: 23vh;">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span id="yclkcqk_title">{{title.center2}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div id="box2" class="box-echart">
								<div class="navboxall">
									<div class="wraptit">
										<span :key="item.id" v-for="item in center02TableHead">{{item.name}}</span>
									</div>
									<div class="wrap">
										<ul>
											<li :key="index" v-for="(item,index) in center02Data">
												<p>
													<span>{{item.col1}}</span>
													<span>{{item.col2}}</span>
													<span>{{item.col3 | NumFormat }}</span>
													<span>{{item.col4 | NumFormat }}</span>
												</p>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- right -->
					<div id="title03" class="col-xs-12 col-sm-12 col-md-3">
						<!-- right 01 -->
						<div class="data-box boxHeight" id="box5-box">
							<div class="t_top_box" style="height: 80%;">
								<img class="t_l_line" src="../../assets/img/dpxs/left_line.png" alt />
								<ul class="t_nav" id="you_info">
									<li :key="item.id" v-for="(item,index) in right01Menu" @click="showL1Data(item.title)">
										<span :data-id="item.id">{{item.title}}</span>
										<h1 :id="item.id">{{item.value | NumFormat }}</h1>
										<i :class="index == right01Menu.length-1 ? 'hide':'show'"></i>
									</li>
								</ul>
								<img class="t_r_line" src="../../assets/img/dpxs/right_line.png" alt />
							</div>
						</div>
						<!-- right 02 -->
						<div class="data-box1 boxHeight1" id="box6-box" style="margin-top: 30px;">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span>{{title.right2}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div id="box6" class="box-echart tabcontent"></div>
						</div>
						<!-- right 03 -->
						<div class="data-box1 boxHeight1" id="box7-box" style="margin-top: 30px;">
							<i class="topL"></i>
							<i class="topR"></i>
							<i class="bottomL"></i>
							<i class="bottomR"></i>
							<div class="data-title">
								<b class="data-title-left">[</b>
								<span>{{title.right3}}</span>
								<b class="data-title-right">]</b>
							</div>
							<div id="box7" class="box-echart"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 数据钻取弹出框 -->
		<div id="layer" style="margin: 20px;">
			<div class="navboxall" id="layerInfo" v-if="layerShow">
				<el-button style="margin-bottom:10px; float: right;" v-show="backShow" type="success" round @click="backLast">返回上一级</el-button>
				<el-table :data="yjtableData" border style="width: 100%" v-show="yjTable" @row-click="showEjData">
					<el-table-column prop="station" label="站点"></el-table-column>
					<el-table-column prop="money" label="金额"></el-table-column>
				</el-table>
				<el-table :data="ejtableData" border style="width: 100%" v-show="ejTable">
					<el-table-column prop="station" label="站点"></el-table-column>
					<el-table-column prop="client" label="客户"></el-table-column>
					<el-table-column prop="details" label="明细"></el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				fontColor: "#fff",
				backShow: false,
				layerShow: false,
				yjTable: true,
				ejTable: false,
				cancleShow: false,
				yjtableData: [],
				ejtableData: [],
				zqType: "", //数据钻取类型
				//各模块显示标题
				title: {
					pageTitle: "xx有限公司财务统计数据",
					left2: "资金状况",
					left3: "税费情况",
					center1: "站点物理位置",
					center2: "项目亏损预警",
					right2: "盈利TOP5工地",
					right3: "应付TOP5供应商"
				},
				//right 01 显示内容
				right01Menu: [],
				//left 01 显示内容
				left01Menu: [],
				//center 01 显示内容
				center01Menu: {},
				mapTopData: '', //地图上方显示数据
				//center 02 表格表头内容
				center02TableHead: [{
						id: "1",
						name: "站点"
					},
					{
						id: "2",
						name: "项目"
					},
					{
						id: "3",
						name: "亏损总额(元)"
					},
					{
						id: "4",
						name: "单方亏损总额(元)"
					}
				],
				//center 02 显示内容
				center02Data: [],
				//各模块对应站点数据
				dataArr: {
					//盈利TOP5
					yl5: [
						[8000, 8230, 8590, 9045, 9500],
						[8200, 8430, 8990, 9745, 9500],
						[8300, 8530, 8880, 9765, 9500],
						[8400, 8630, 8770, 9845, 9500],
						[8500, 8730, 8660, 9945, 9500]
					],

					//供应商top5
					gys5: [
						[8000, 8230, 8590, 9045, 9500],
						[8200, 8430, 8990, 9745, 9500],
						[8300, 8530, 8880, 9765, 9500],
						[8400, 8630, 8770, 9845, 9500],
						[8500, 8730, 8660, 9945, 9500]
					]
				},
				chartName: {
					chartLeft2: "",
					chartLeft3: "",
					chartRight2: "",
					chartRight3: "",
					chartCenter: ""
				},
				optionName: {
					optionLeft2: "",
					optionLeft3: "",
					optionRight2: "",
					optionRight3: "",
					optionCenter: ""
				},
				//左、右上角显示内容查询条件
				lrQuery: {
					id: ''
				},
				//左、右上角显示内容查询数据
				lrData: '',
				zjsfData: '', //资金状况、税费情况相关数据
				yjTOP5Data: '', //盈利TOP5数据
				gysTOP5Data: '', //应付供应商TOP5数据
				stationData: '', //站点数据
				//lrIDtitleMap:'',//左、右上角显示类型的id与名称对应关系
				stationMap: '', //存储站点名称以及id之间的关系
				lrtitleMap: '', //左、右对应的title名称与数据名称之间的关系
				//left 01 ,right 01一级钻取数据
				yjData: {
					ysjsje: [{
							name: "站点1",
							value: "20000"
						},
						{
							name: "站点2",
							value: "30000"
						},
						{
							name: "站点3",
							value: "40000"
						},
						{
							name: "站点4",
							value: "50000"
						},
						{
							name: "站点5",
							value: "60000"
						}
					],
					skje: [{
							name: "站点1",
							value: "10000"
						},
						{
							name: "站点2",
							value: "20000"
						},
						{
							name: "站点3",
							value: "30000"
						},
						{
							name: "站点4",
							value: "40000"
						},
						{
							name: "站点5",
							value: "50000"
						}
					],
					yszkye: [{
							name: "站点1",
							value: "10000"
						},
						{
							name: "站点2",
							value: "10000"
						},
						{
							name: "站点3",
							value: "10000"
						},
						{
							name: "站点4",
							value: "10000"
						},
						{
							name: "站点5",
							value: "10000"
						}
					],
					yfzkye: [{
							name: "站点1",
							value: "10000"
						},
						{
							name: "站点2",
							value: "10000"
						},
						{
							name: "站点3",
							value: "10000"
						},
						{
							name: "站点4",
							value: "10000"
						},
						{
							name: "站点5",
							value: "10000"
						}
					],
					fkje: [{
							name: "站点1",
							value: "10000"
						},
						{
							name: "站点2",
							value: "10000"
						},
						{
							name: "站点3",
							value: "10000"
						},
						{
							name: "站点4",
							value: "10000"
						},
						{
							name: "站点5",
							value: "10000"
						}
					],
					yfjsje: [{
							name: "站点1",
							value: "10000"
						},
						{
							name: "站点2",
							value: "10000"
						},
						{
							name: "站点3",
							value: "10000"
						},
						{
							name: "站点4",
							value: "10000"
						},
						{
							name: "站点5",
							value: "10000"
						}
					]
				},
				//left 01,right 01二级钻取数据
				ejData: {
					ysjsje: [{
							name: "站点1",
							value: [{
									name: "客户1-1",
									value: "1200"
								},
								{
									name: "客户1-2",
									value: "1200"
								},
								{
									name: "客户1-3",
									value: "1200"
								},
								{
									name: "客户1-4",
									value: "1200"
								},
								{
									name: "客户1-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点2",
							value: [{
									name: "客户2-1",
									value: "1200"
								},
								{
									name: "客户2-2",
									value: "1200"
								},
								{
									name: "客户2-3",
									value: "1200"
								},
								{
									name: "客户2-4",
									value: "1200"
								},
								{
									name: "客户2-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点3",
							value: [{
									name: "客户3-1",
									value: "1200"
								},
								{
									name: "客户3-2",
									value: "1200"
								},
								{
									name: "客户3-3",
									value: "1200"
								},
								{
									name: "客户3-4",
									value: "1200"
								},
								{
									name: "客户3-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点4",
							value: [{
									name: "客户4-1",
									value: "1200"
								},
								{
									name: "客户4-2",
									value: "1200"
								},
								{
									name: "客户4-3",
									value: "1200"
								},
								{
									name: "客户4-4",
									value: "1200"
								},
								{
									name: "客户4-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点5",
							value: [{
									name: "客户5-1",
									value: "1200"
								},
								{
									name: "客户5-2",
									value: "1200"
								},
								{
									name: "客户5-3",
									value: "1200"
								},
								{
									name: "客户5-4",
									value: "1200"
								},
								{
									name: "客户5-5",
									value: "1200"
								}
							]
						}
					],
					skje: [{
							name: "站点1",
							value: [{
									name: "客户1-1",
									value: "1200"
								},
								{
									name: "客户1-2",
									value: "1200"
								},
								{
									name: "客户1-3",
									value: "1200"
								},
								{
									name: "客户1-4",
									value: "1200"
								},
								{
									name: "客户1-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点2",
							value: [{
									name: "客户2-1",
									value: "1200"
								},
								{
									name: "客户2-2",
									value: "1200"
								},
								{
									name: "客户2-3",
									value: "1200"
								},
								{
									name: "客户2-4",
									value: "1200"
								},
								{
									name: "客户2-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点3",
							value: [{
									name: "客户3-1",
									value: "1200"
								},
								{
									name: "客户3-2",
									value: "1200"
								},
								{
									name: "客户3-3",
									value: "1200"
								},
								{
									name: "客户3-4",
									value: "1200"
								},
								{
									name: "客户3-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点4",
							value: [{
									name: "客户4-1",
									value: "1200"
								},
								{
									name: "客户4-2",
									value: "1200"
								},
								{
									name: "客户4-3",
									value: "1200"
								},
								{
									name: "客户4-4",
									value: "1200"
								},
								{
									name: "客户4-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点5",
							value: [{
									name: "客户5-1",
									value: "1200"
								},
								{
									name: "客户5-2",
									value: "1200"
								},
								{
									name: "客户5-3",
									value: "1200"
								},
								{
									name: "客户5-4",
									value: "1200"
								},
								{
									name: "客户5-5",
									value: "1200"
								}
							]
						}
					],
					yszkye: [{
							name: "站点1",
							value: [{
									name: "客户1-1",
									value: "1200"
								},
								{
									name: "客户1-2",
									value: "1200"
								},
								{
									name: "客户1-3",
									value: "1200"
								},
								{
									name: "客户1-4",
									value: "1200"
								},
								{
									name: "客户1-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点2",
							value: [{
									name: "客户2-1",
									value: "1200"
								},
								{
									name: "客户2-2",
									value: "1200"
								},
								{
									name: "客户2-3",
									value: "1200"
								},
								{
									name: "客户2-4",
									value: "1200"
								},
								{
									name: "客户2-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点3",
							value: [{
									name: "客户3-1",
									value: "1200"
								},
								{
									name: "客户3-2",
									value: "1200"
								},
								{
									name: "客户3-3",
									value: "1200"
								},
								{
									name: "客户3-4",
									value: "1200"
								},
								{
									name: "客户3-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点4",
							value: [{
									name: "客户4-1",
									value: "1200"
								},
								{
									name: "客户4-2",
									value: "1200"
								},
								{
									name: "客户4-3",
									value: "1200"
								},
								{
									name: "客户4-4",
									value: "1200"
								},
								{
									name: "客户4-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点5",
							value: [{
									name: "客户5-1",
									value: "1200"
								},
								{
									name: "客户5-2",
									value: "1200"
								},
								{
									name: "客户5-3",
									value: "1200"
								},
								{
									name: "客户5-4",
									value: "1200"
								},
								{
									name: "客户5-5",
									value: "1200"
								}
							]
						}
					],
					yfzkye: [{
							name: "站点1",
							value: [{
									name: "客户1-1",
									value: "1200"
								},
								{
									name: "客户1-2",
									value: "1200"
								},
								{
									name: "客户1-3",
									value: "1200"
								},
								{
									name: "客户1-4",
									value: "1200"
								},
								{
									name: "客户1-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点2",
							value: [{
									name: "客户2-1",
									value: "1200"
								},
								{
									name: "客户2-2",
									value: "1200"
								},
								{
									name: "客户2-3",
									value: "1200"
								},
								{
									name: "客户2-4",
									value: "1200"
								},
								{
									name: "客户2-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点3",
							value: [{
									name: "客户3-1",
									value: "1200"
								},
								{
									name: "客户3-2",
									value: "1200"
								},
								{
									name: "客户3-3",
									value: "1200"
								},
								{
									name: "客户3-4",
									value: "1200"
								},
								{
									name: "客户3-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点4",
							value: [{
									name: "客户4-1",
									value: "1200"
								},
								{
									name: "客户4-2",
									value: "1200"
								},
								{
									name: "客户4-3",
									value: "1200"
								},
								{
									name: "客户4-4",
									value: "1200"
								},
								{
									name: "客户4-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点5",
							value: [{
									name: "客户5-1",
									value: "1200"
								},
								{
									name: "客户5-2",
									value: "1200"
								},
								{
									name: "客户5-3",
									value: "1200"
								},
								{
									name: "客户5-4",
									value: "1200"
								},
								{
									name: "客户5-5",
									value: "1200"
								}
							]
						}
					],
					fkje: [{
							name: "站点1",
							value: [{
									name: "客户1-1",
									value: "1200"
								},
								{
									name: "客户1-2",
									value: "1200"
								},
								{
									name: "客户1-3",
									value: "1200"
								},
								{
									name: "客户1-4",
									value: "1200"
								},
								{
									name: "客户1-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点2",
							value: [{
									name: "客户2-1",
									value: "1200"
								},
								{
									name: "客户2-2",
									value: "1200"
								},
								{
									name: "客户2-3",
									value: "1200"
								},
								{
									name: "客户2-4",
									value: "1200"
								},
								{
									name: "客户2-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点3",
							value: [{
									name: "客户3-1",
									value: "1200"
								},
								{
									name: "客户3-2",
									value: "1200"
								},
								{
									name: "客户3-3",
									value: "1200"
								},
								{
									name: "客户3-4",
									value: "1200"
								},
								{
									name: "客户3-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点4",
							value: [{
									name: "客户4-1",
									value: "1200"
								},
								{
									name: "客户4-2",
									value: "1200"
								},
								{
									name: "客户4-3",
									value: "1200"
								},
								{
									name: "客户4-4",
									value: "1200"
								},
								{
									name: "客户4-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点5",
							value: [{
									name: "客户5-1",
									value: "1200"
								},
								{
									name: "客户5-2",
									value: "1200"
								},
								{
									name: "客户5-3",
									value: "1200"
								},
								{
									name: "客户5-4",
									value: "1200"
								},
								{
									name: "客户5-5",
									value: "1200"
								}
							]
						}
					],
					yfjsje: [{
							name: "站点1",
							value: [{
									name: "客户1-1",
									value: "1200"
								},
								{
									name: "客户1-2",
									value: "1200"
								},
								{
									name: "客户1-3",
									value: "1200"
								},
								{
									name: "客户1-4",
									value: "1200"
								},
								{
									name: "客户1-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点2",
							value: [{
									name: "客户2-1",
									value: "1200"
								},
								{
									name: "客户2-2",
									value: "1200"
								},
								{
									name: "客户2-3",
									value: "1200"
								},
								{
									name: "客户2-4",
									value: "1200"
								},
								{
									name: "客户2-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点3",
							value: [{
									name: "客户3-1",
									value: "1200"
								},
								{
									name: "客户3-2",
									value: "1200"
								},
								{
									name: "客户3-3",
									value: "1200"
								},
								{
									name: "客户3-4",
									value: "1200"
								},
								{
									name: "客户3-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点4",
							value: [{
									name: "客户4-1",
									value: "1200"
								},
								{
									name: "客户4-2",
									value: "1200"
								},
								{
									name: "客户4-3",
									value: "1200"
								},
								{
									name: "客户4-4",
									value: "1200"
								},
								{
									name: "客户4-5",
									value: "1200"
								}
							]
						},
						{
							name: "站点5",
							value: [{
									name: "客户5-1",
									value: "1200"
								},
								{
									name: "客户5-2",
									value: "1200"
								},
								{
									name: "客户5-3",
									value: "1200"
								},
								{
									name: "客户5-4",
									value: "1200"
								},
								{
									name: "客户5-5",
									value: "1200"
								}
							]
						}
					]
				},

				//请求参数
				cwtj_Query:{
					a_dfrom: '20200424',
					a_dto: '20200425',
					a_userid: 'ADMIN',
					a_layer: 2,
					a_dayname: '01',
					a_pos: 1,
					a_reptype: 'D',
					RCT1: ''
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

			// this.scrool();
			// this.left2();
			// this.left3();
			// this.right2();
			// this.right3();
			// this.center();
			// window.addEventListener("resize", () => {
			// 	this.chartName.chartLeft2.resize();
			// 	this.chartName.chartLeft3.resize();
			// 	this.chartName.chartRight2.resize();
			// 	this.chartName.chartRight3.resize();
			// 	this.chartName.chartCenter.resize();
			// });
		},
		methods: {
			async getMenuList() {

					// //获取累计签约量等数据
				this.center01Menu = await this.getData('dp02_01','Y');
				console.log(this.center01Menu)
				//获取左上角以及右上角显示内容数据
				// const {data: res} = await this.$http.get("cwtj/lr", {params: this.lrQuery});
				// this.lrData = res.data;
				// this.lrtitleMap = new Map();
				// let tempArr = ['ysjsje','skje','yszkye','yfzkye','fkje','yfjsje']
				// for(let i=0;i<this.lrData.titleIDoBJ.length;i++){
				// 	let item=this.lrData.titleIDoBJ[i];
				// 	this.lrtitleMap.set(item.name,tempArr[i])
				// }

				// this.left01Menu = this.lrData.data.slice(0,3);
				// this.right01Menu = this.lrData.data.slice(3);

				// //获取资金状况、毛利情况、税费情况等数据
				// const {data: zjsfRes} = await this.$http.get("cwtj/zjsf");
				// this.zjsfData = zjsfRes.data;
				// //console.log(this.zjsfData )

				// //获取盈利TOP5数据
				// const {data: yjTOP5Res} = await this.$http.get("cwtj/yjTOP5");
				// this.yjTOP5Data = yjTOP5Res.data;


				// //获取应付供应商TOP5数据
				// const {data: gysTOP5Res} = await this.$http.get("cwtj/gysTOP5");
				// this.gysTOP5Data = gysTOP5Res.data;

				// //获取站点经纬度等信息
				// const {data: stationRes} = await this.$http.get("scjkc");
				// this.stationData = stationRes.data;
				// this.stationMap = new Map();
				// for(let item of this.stationData.stationObj){
				// 	this.stationMap.set(item.stationName,item.id);
				// }

				// //获取地图右上角显示内容
				// const {data: mapTOPRes} = await this.$http.get("cwtj/mapTOP");
				// this.mapTopData = mapTOPRes.data;
				// this.center01Menu = this.mapTopData.allStation;

				// //获取预警项目数据
				// const {data: xmyjRes} = await this.$http.get("cwtj/xmyj");
				// this.center02Data = xmyjRes.data;

			},
			async getData(a_dayname = 'dp02_01', a_reptype = 'D') {
				this.cwtj_Query.a_dayname = a_dayname;
				this.cwtj_Query.a_reptype = a_reptype;
				const {data: res} = await this.$http.get("cwtj", {params: this.cwtj_Query});
				return res.data;
			},

			scrool() {
				$("#box2 .wrap").liMarquee({
					direction: "up",
					runshort: true,
					scrollamount: 20
				});
			},
			//left 02 资金状况
			left2() {
				this.chartName.chartLeft2 = this.$echarts.init(
					document.getElementById("box2"),
					"light"
				);
				this.optionName.optionLeft2 = {
					grid: {
						left: "3%"
					},
					graphic: [{
							type: "text",
							top: "center",
							left: "22%",
							style: {
								text: `资金状况\n\n${this.zjsfData.allZjzk}元`,
								textAlign: "center",
								fill: "#fff",
								fontSize: 14
							}
						},
						{
							type: "text",
							top: "center",
							left: "65%",
							style: {
								text: `当月毛利情况\n\n${this.zjsfData.allMlqk}元`,
								textAlign: "center",
								fill: "#fff",
								fontSize: 14
							}
						}
					],

					series: [{
							type: "pie",
							center: ["30%", "50%"],
							radius: ["40%", "50%"],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
									position: "center"
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: "30",
										fontWeight: "bold"
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [{
								value: 20000000
							}]
						},
						{
							type: "pie",
							center: ["75%", "50%"],
							radius: ["40%", "50%"],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
									position: "center"
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: "30",
										fontWeight: "bold"
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [{
								value: 20000000
							}]
						}
					]
				};
				this.chartName.chartLeft2.setOption(this.optionName.optionLeft2);
			},
			//left 03 税务情况
			left3() {
				this.chartName.chartLeft3 = this.$echarts.init(
					document.getElementById("box3")
				);
				this.optionName.optionLeft3 = {
					tooltip: {
						formatter: "{a} <br/>{b} : {c}%"
					},
					series: [{
							center: ["30%", "50%"],
							radius: "50%",
							name: "本月税费情况",
							type: "gauge",
							axisLine: {
								lineStyle: {
									width: 20,
									color: [
										[0.8, "#ff7d01"],
										[1, "#C0C0C0"]
									]
								}
							},
							axisLabel: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							},
							title: {
								offsetCenter: [0, -10],
								color: this.fontColor
							},
							pointer: {
								show: false
							},
							detail: {
								formatter: "{value}%"
							},
							data: [{
								value: this.zjsfData.allYyjsf,
								name: "本月应交税费\n与已交税费百分比"
							}]
						},
						{
							center: ["75%", "50%"],
							radius: "50%",
							name: "本年税费情况",
							type: "gauge",
							axisLine: {
								lineStyle: {
									width: 20,
									color: [
										[0.9, "#c6c51d"],
										[1, "#C0C0C0"]
									]
								}
							},
							axisLabel: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							},
							title: {
								offsetCenter: [0, -10],
								color: this.fontColor
							},
							pointer: {
								show: false
							},
							detail: {
								formatter: "{value}%"
							},
							data: [{
								value: this.zjsfData.allNyjsf,
								name: "本年应交税费\n与已交税费百分比"
							}]
						}
					]
				};

				this.chartName.chartLeft3.setOption(this.optionName.optionLeft3);
			},
			//right 02 盈利TOP5
			right2() {
				this.chartName.chartRight2 = this.$echarts.init(
					document.getElementById("box6"),
					"light"
				);
				this.optionName.optionRight2 = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					legend: {
						data: ["2019年"]
					},
					grid: {
						left: "3%",
						right: "15%",
						bottom: "0%",
						containLabel: true
					},
					xAxis: {
						type: "value",
						name: "金额(元)",
						nameTextStyle: {
							padding: [40, 100, 0, 0]
						},
						boundaryGap: [0, 0.01],
						axisLabel: {
							rotate: 30
						},
						axisLine: {
							lineStyle: {
								color: this.fontColor
							}
						}
					},
					yAxis: {
						type: "category",
						name: "工地名称",
						axisLine: {
							lineStyle: {
								color: this.fontColor
							}
						},
						data: this.yjTOP5Data.gdName
					},
					series: [{
						name: "2019年利润总额",
						type: "bar",
						data: this.yjTOP5Data.value
					}]
				};

				this.chartName.chartRight2.setOption(this.optionName.optionRight2);
			},
			//right 03 应付供应商 TOP5
			right3() {
				this.chartName.chartRight3 = this.$echarts.init(
					document.getElementById("box7")
				);
				this.optionName.optionRight3 = {
					color: ["#f7e05b"],
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					legend: {
						data: ["2019年"]
					},
					grid: {
						left: "3%",
						right: "15%",
						bottom: "0%",
						containLabel: true
					},
					xAxis: {
						type: "value",
						name: "金额(元)",
						nameTextStyle: {
							padding: [60, 50, 0, -12]
						},
						boundaryGap: [0, 0.01],
						axisLabel: {
							rotate: 30
						},
						axisLine: {
							lineStyle: {
								color: "#fff"
							}
						}
					},
					yAxis: {
						type: "category",
						name: "供应商",
						axisLine: {
							lineStyle: {
								color: "#fff"
							}
						},
						data: this.gysTOP5Data.gysName
					},
					series: [{
						name: "2019应付供应商总额",
						type: "bar",
						data: this.gysTOP5Data.value
					}]
				};

				this.chartName.chartRight3.setOption(this.optionName.optionRight3);
			},
			//站点物理分布
			center() {
				let that = this;
				this.chartName.chartCenter = this.$echarts.init(
					document.getElementById("box4")
				);
				var geoCoordMap = {};
				var data = [];
				for (let item of this.stationData.stationObj) {
					let stationName = item.stationName;
					geoCoordMap[stationName] = [];
					geoCoordMap[stationName].push(item.lon);
					geoCoordMap[stationName].push(item.lat);

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
											color: "rgba(   47,79,79, .2)" // 100% 处的颜色
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

				//地图添加点击事件
				this.chartName.chartCenter.on("click", function(params) {
					that.changeView(params);
				});
			},
			//left 01 and right 01 点击进行数据钻取
			showL1Data(title) {
				//获取点击的类型
				let type = this.lrtitleMap.get(title);

				this.yjtableData = [];
				let data = this.yjData[type];
				for (let item of data) {
					let pushData = {
						station: item.name,
						money: item.value
					}
					this.yjtableData.push(pushData)
				}
				this.zqType = type;
				this.backShow = false;
				this.yjTable = true;
				this.ejTable = false;
				this.layerShow = true;


				let that = this;
				layer.open({
					type: 1,
					title: `各工地${title}明细`,
					area: ["800px", "600px"],
					shadeClose: true, //点击遮罩关闭
					content: $("#layer"), //绑定一个DOM
					end: function() {
						that.yjtableData = [];
						that.backShow = false;
						that.layerShow = false;
					}
				});
			},
			showEjData(row) {
				let type = this.zqType;
				let stationName = row.station;
				let index = this.ejData[type].findIndex((value, index) => {
					return value.name == stationName;
				})


				this.backShow = true;
				this.yjTable = false;
				this.ejTable = true;
				this.ejtableData = [];


				let data = this.ejData[type][index].value;
				for (let item of data) {
					let pushData = {
						station: stationName,
						client: item.name,
						details: item.value
					}
					this.ejtableData.push(pushData)
				}
			},
			//二级数据钻取时点击返回上一级
			backLast() {
				this.backShow = false;
				this.yjTable = true;
				this.ejTable = false;
			},
			//根据选择的站点切换相应的模块显示数据
			async changeView(params) {
				if (params.componentType == "series") {
					let index = params.dataIndex;
					this.cancleShow = true;
					//step 1 更改标题
					this.title.pageTitle = `xx有限公司财务统计数据-${params.name}`;

					//step 2 更改每个模块显示内容
					//获取所选站点id
					let stationName = params.name;
					let stationID = this.stationMap.get(stationName);
					//获取左上角及右上角数据
					this.lrQuery = {
						id: stationID
					}
					const {
						data: res
					} = await this.$http.get("cwtj/lr", {
						params: this.lrQuery
					});
					this.lrData = res.data;
					this.left01Menu = this.lrData.data.slice(0, 3);
					this.right01Menu = this.lrData.data.slice(3);


					//left 02
					this.optionName.optionLeft2.graphic[0].style.text = `资金状况\n\n${this.zjsfData.zjzk[stationName]}元`;
					this.optionName.optionLeft2.graphic[1].style.text = `当月毛利情况\n\n${this.zjsfData.mlqk[stationName]}元`;
					this.chartName.chartLeft2.setOption(this.optionName.optionLeft2);

					// //left 03
					this.optionName.optionLeft3.series[0].data[0].value = this.zjsfData.yyjsf[stationName];
					let value1 = this.zjsfData.yyjsf[stationName];
					value1 = value1 / 100;
					this.optionName.optionLeft3.series[0].axisLine.lineStyle.color[0][0] = value1;
					this.optionName.optionLeft3.series[1].data[0].value = this.zjsfData.nyjsf[stationName];
					let value2 = this.zjsfData.nyjsf[stationName];
					value2 = value2 / 100;
					this.optionName.optionLeft3.series[1].axisLine.lineStyle.color[0][0] = value2;
					this.chartName.chartLeft3.setOption(this.optionName.optionLeft3);


					// //right 02
					this.optionName.optionRight2.series[0].data = this.dataArr.yl5[index];
					this.chartName.chartRight2.setOption(this.optionName.optionRight2);

					// //right 03
					this.optionName.optionRight3.series[0].data = this.dataArr.gys5[index];
					this.chartName.chartRight3.setOption(this.optionName.optionRight3);
				}
			},
			//取消选中站点
			async cancleChoose() {
				this.cancleShow = false;

				//step 1 更改标题
				this.title.pageTitle = `xx有限公司财务统计数据`;

				//获取左上角及右上角数据
				this.lrQuery = {
					id: ''
				}
				const {
					data: res
				} = await this.$http.get("cwtj/lr", {
					params: this.lrQuery
				});
				this.lrData = res.data;
				this.left01Menu = this.lrData.data.slice(0, 3);
				this.right01Menu = this.lrData.data.slice(3);

				//left 02
				this.optionName.optionLeft2.graphic[0].style.text = `资金状况\n\n${this.zjsfData.allZjzk}元`;
				this.optionName.optionLeft2.graphic[1].style.text = `当月毛利情况\n\n${this.zjsfData.allMlqk}元`;
				this.chartName.chartLeft2.setOption(this.optionName.optionLeft2);

				// //left 03
				this.optionName.optionLeft3.series[0].data[0].value = this.zjsfData.allYyjsf;
				let value1 = this.zjsfData.allYyjsf;
				value1 = value1 / 100;
				this.optionName.optionLeft3.series[0].axisLine.lineStyle.color[0][0] = value1;
				this.optionName.optionLeft3.series[1].data[0].value = this.zjsfData.allNyjsf;
				let value2 = this.zjsfData.allNyjsf;
				value2 = value2 / 100;
				this.optionName.optionLeft3.series[1].axisLine.lineStyle.color[0][0] = value2;
				this.chartName.chartLeft3.setOption(this.optionName.optionLeft3);


				// //right 02
				this.optionName.optionRight2.series[0].data = this.yjTOP5Data.value;
				this.chartName.chartRight2.setOption(this.optionName.optionRight2);

				// //right 03
				this.optionName.optionRight3.series[0].data = this.gysTOP5Data.value;
				this.chartName.chartRight3.setOption(this.optionName.optionRight3);

			}
		}
	};
</script>

<style scoped>
	#cwtjsj {
		margin: 0px;
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

	.boxHeight{
		height: 15vh !important;
	}

	.boxHeight1{
		height: 34vh !important;
	}

	.hide {
		display: none;
	}

	.show {
		display: block;
	}

	.yjHead {
		color: black !important;
	}

	#showInfo {
		padding-top: 10px !important;
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

	.title-left img {
		width: 100%;
	}

	@media (max-width: 767px) {
		.title-left {
			float: left;
			display: none;
		}

		.title-left-title-font {
			text-align: center;
			margin: 0 10px;
			background: -webkit-linear-gradient(top, #fff, #65c4f1);
			/* 背景色渐变 */
			-webkit-background-clip: text;

			/* 规定背景的划分区域 */
			-webkit-text-fill-color: transparent;
			/* 防止字体颜色覆盖 */
		}

		.panel-bottom {
			margin-bottom: 30px;
		}

		.box9-1 {
			display: none;
		}

		.box9-2 {
			display: block;
		}
	}

	@media (min-width: 768px) and (max-width: 991px) {
		.title-left {
			float: left;
			display: none;
		}

		.title-left-title-font {
			text-align: center;
			margin: 0 10px;
			background: -webkit-linear-gradient(top, #fff, #65c4f1);
			/* 背景色渐变 */
			-webkit-background-clip: text;
			/* 规定背景的划分区域 */
			-webkit-text-fill-color: transparent;
			/* 防止字体颜色覆盖 */
		}

		.panel-bottom {
			margin-bottom: 30px;
		}

		.box9-1 {
			display: none;
		}

		.box9-2 {
			display: block;
		}
	}

	@media (min-width: 992px) and (max-width: 1199px) {
		.title-left {
			float: left;
			display: none;
		}

		.title-left-title-font {
			float: left;
			margin: 0 10px;
			background: -webkit-linear-gradient(top, #fff, #65c4f1);
			/* 背景色渐变 */
			-webkit-background-clip: text;
			/* 规定背景的划分区域 */
			-webkit-text-fill-color: transparent;
			/* 防止字体颜色覆盖 */
		}

		.panel-bottom {
			margin-bottom: 0px;
		}

		.box9-1 {
			display: block;
		}

		.box9-2 {
			display: none;
		}
	}

	@media (min-width: 1200px) {
		.title-left {
			float: left;
			display: block;
		}

		.title-left-title-font {
			float: left;
			margin: 0 10px;
			background: -webkit-linear-gradient(top, #fff, #65c4f1);
			/* 背景色渐变 */
			-webkit-background-clip: text;
			/* 规定背景的划分区域 */
			-webkit-text-fill-color: transparent;
			/* 防止字体颜色覆盖 */
		}

		.panel-bottom {
			margin-bottom: 0px;
		}

		.box9-1 {
			display: block;
		}

		.box9-2 {
			display: none;
		}
	}

	.caption-title {
		font-size: 3rem;
		font-weight: 900;
		line-height: 65px;
		max-width: 1080px;
		margin: 0 auto;
	}

	.data-box1 {
		border: 2px solid #032d60;
		-webkit-box-shadow: #07417a 0px 0px 10px;
		-moz-box-shadow: #07417a 0px 0px 10px;
		box-shadow: inset 0 0 30px #07417a;
		position: relative;
		height: 35vh;
	}

	.data-box {
		position: relative;
		height: 17vh;
		top: 30px;
	}

	.data-title-left,
	.data-title-right {
		color: #105eda;
		font-family: "微软雅黑";
		font-size: 20px;
	}

	.data-title {
		background-color: #000c3b;
		width: fit-content;
		margin: -18px auto 0 auto;
		/* color: #83c7e3; */
		color: #FFFFFF;
		font-size: 20px;
	}

	.data-title span {
		margin: 0 15px;
	}

	.box-bottom {
		border-bottom-width: 2px;
		border-bottom-color: #032d60;
		border-bottom-style: solid;
	}

	.topL {
		width: 20px;
		height: 20px;
		border-top-width: 2px;
		border-top-color: #26c6f0;
		border-top-style: solid;
		border-left-width: 2px;
		border-left-color: #26c6f0;
		border-left-style: solid;
		position: absolute;
		top: -2px;
		left: -2px;
	}

	.topR {
		width: 20px;
		height: 20px;
		border-top-width: 2px;
		border-top-color: #26c6f0;
		border-top-style: solid;
		border-right-width: 2px;
		border-right-color: #26c6f0;
		border-right-style: solid;
		position: absolute;
		top: -2px;
		right: -2px;
	}

	.bottomL {
		width: 20px;
		height: 20px;
		border-bottom-width: 2px;
		border-bottom-color: #26c6f0;
		border-bottom-style: solid;
		border-left-width: 2px;
		border-left-color: #26c6f0;
		border-left-style: solid;
		position: absolute;
		bottom: -2px;
		left: -2px;
	}

	.bottomR {
		width: 20px;
		height: 20px;
		border-bottom-width: 2px;
		border-bottom-color: #26c6f0;
		border-bottom-style: solid;
		border-right-width: 2px;
		border-right-color: #26c6f0;
		border-right-style: solid;
		position: absolute;
		bottom: -2px;
		right: -2px;
	}

	.panel-top {
		margin-top: 30px;
	}

	.box-echart {
		width: 100%;
		height: 90%;
		margin: 10px auto;
	}

	.box-echart-china {
		width: 92%;
		margin: 10px auto;
		height: 45vh !important;
		position: absolute;
		top: 20%;
		left: 5%;
	}

	* {
		padding: 0;
		margin: 0 auto;
	}

	.box1-back {
		height: 60vh;
	}

	.panel-table {
		text-align: center;
		color: #ccc;
		margin: 0 auto !important;
		width: 96%;
		margin-top: 20px !important;
		padding: 0.5rem 0 !important;
		font-size: 1.5rem;
	}

	.panel-table tr {
		height: 3rem;
		line-height: 2rem;
	}

	.panel-table th {
		text-align: center !important;
	}

	.panel-table thead tr {
		border-bottom: solid 1px #a8b4be;
		border-top: solid 2px #a8b4be;
	}

	.data-box1-data {
		padding: 0;
		margin: 0 5%;
	}

	.data-box1-data li {
		float: left;
		list-style-type: none;
		margin-right: 10px;
	}

	.data-box1-font1 {
		color: #83c7e3;
		font-size: 2rem;
	}

	.data-box1-panel {
		background-color: #214398;
		color: #fff;
		font-size: 2.4rem;
		padding: 0px 2%;
		letter-spacing: 5px;
	}

	@media (max-width: 767px) {
		.title-date {
			margin-bottom: 20px;
		}
	}

	@media (min-width: 768px) and (max-width: 991px) {
		.title-date {
			margin-bottom: 20px;
		}
	}

	/*@media (min-width: 992px) and (max-width: 1199px) {
	.title-date {
		height: 5%;
	}
	.panel-box1 {
		height: 30%;
	}
}

@media (min-width: 1200px) {
	.title-date {
		height: 5%;
	}
	.panel-box1 {
		height: 30%;
	}
}*/

	.title-date>p {
		color: #5b8bb6;
		/*background:linear-gradient(to bottom, #043768, #000c3b,#043768);*/
		box-shadow: inset 0 0 30px #07417a;
		border: solid 2px #032d60;
		border-radius: 10px;
		/*box-shadow:4px 2px 6px #033579, -4px -2px 6px #033579, 0px 0px 12px 5px #033579 inset;*/
		font-family: "微软雅黑";
		font-size: 2rem;
		line-height: 35px;
		line-height: 38px;
		max-width: 355px;
		margin: 5px auto;
	}

	.live-box {
		padding: 0;
		width: 90%;
		margin: 0 auto;
	}

	.live-box li {
		float: left;
		list-style-type: none;
		margin-bottom: 4%;
		font-size: 1.6rem;
		line-height: 1.4rem;
		width: 49%;
		background-color: #214398;
		color: #fff;
		padding: 2% 2% 0 2%;
	}

	.live-box-font1 {
		color: #f4e925;
	}

	.total-mn {
		font-size: 1.6rem;
		color: #fff;
		padding-left: 5%;
	}

	.ym-menu {
		padding: 0;
		width: 50%;
		margin: 5% auto 0 auto;
		border: 2px solid #032d60;
	}

	.ym-menu li {
		font-size: 1.6rem;
		color: #fff;
		width: 33.33%;
		text-align: center;
		list-style-type: none;
		float: left;
	}

	.ym-active {
		background-color: #214398;
		border: 1px solid #ccc;
	}

	.ym-active a {
		list-style-type: none;
		color: #fff;
	}

	.inner {
		position: absolute;
		top: -2.125rem;
		right: -1.583rem;
		bottom: -0.875rem;
		left: -5.5rem;
		padding: 1rem 1.5rem;
	}

	.fig {
		height: 45px;
		line-height: 45px;
		border-top: 1px solid #00b3fe;
		border-bottom: 1px solid #00b3fe;
		margin-bottom: 10px;
		padding-left: 15px;
		padding-right: 15px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		cursor: pointer;
	}

	.fig p {
		font-size: 18px;
		color: #fff;
		float: left;
	}

	.fig em {
		float: right;
		font-size: 22px;
		font-weight: 900;
	}

	.fig:nth-of-type(1) {
		color: #07f7f4;
	}

	.fig:nth-of-type(2) em {
		color: #fffe7d;
	}

	.fig:nth-of-type(3) em {
		color: #ff7d01;
	}

	.fig:nth-of-type(4) em {
		color: #00b5fe;
	}


	.fixedThead {
		display: block;
		width: 100%;
	}

	.scrollTbody {
		display: block;
		height: 20vh;
		overflow: hidden;
		width: 100%;
	}

	.table td {
		width: 300px;
		padding: 5px;
		color: #FFFFFF;
	}

	.table th {
		width: 500px;
		padding: 5px;
		color: #FFFFFF;
		line-height: 24px;
		text-align: center;
	}

	.table tr {
		line-height: 24px;
		padding: 5px;
	}

	/* 列表滚动显示 */
	ul,
	li {
		list-style-type: none;
		font-size: 15px;
	}

	a {
		color: #fff;
		text-decoration: none;
	}

	a:hover {
		color: #3366cc;
		text-decoration: underline;
	}

	.demopage {
		width: 730px;
		margin: 0 auto;
	}

	.demopage h2 {
		font-size: 14px;
		margin: 20px 0;
	}

	/* scrollDiv */
	.scrollDiv {
		height: 25px;
		line-height: 25px;
		overflow: hidden;
		margin-top: 10px;
		margin-left: 10px;
	}

	.scrollDiv li {
		height: 30px;
		padding-left: 10px;
	}

	#s2,
	#s3 {
		height: 20vh;
	}

	.red {
		color: red;
	}


	/* right 01弹出层 */
	.bgPop2 {
		display: none;
		position: absolute;
		z-index: 129;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .2);
	}

	.pop2 {
		display: none;
		width: 800px;
		min-height: 300px;
		max-height: 750px;
		height: 300px;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		padding: 25px;
		z-index: 130;
		border-radius: 3px;
		background-color: #23509a;
		border: #fff solid 1px;
		box-shadow: 0 5px 18px rgba(100, 0, 0, .5);
		cursor: pointer;
	}

	.pop-top {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		color: #ff6f05;
		height: 40px;
		width: 100%;
		background: url('../../assets/img/dpxs/line.png') no-repeat bottom center;
	}

	.pop-top span {
		float: right;
		cursor: pointer;
		color: #fff;
		font-weight: bold;
		display: black
	}

	.pop-foot {
		display: none;
		height: 50px;
		line-height: 50px;
		width: 100%;
		border-top: 1px #5682dc solid;
		text-align: right;
	}

	.pop-back {
		padding: 2px 5px;
		margin: 15px 5px;
		border: none;
		border-radius: 5px;
		background-color: #ff6f05;
		color: #fff;
		cursor: pointer;
	}

	.pop-content {
		height: 480px;
	}

	#pop-content li {
		color: #FFFFFF;
		font-size: 16px;
		margin-left: 20px;
	}

	#pop-content li:hover {
		color: red;
	}

	/* 地图模块上方显示的文字 */
	.t_top_box {
		width: 100%;
		height: 20%;
		overflow: hidden;
		position: relative;
		margin-bottom: 0.2rem;
		cursor: pointer;
	}

	.t_l_line {
		position: absolute;
		top: 0;
		left: 0;
	}

	.t_r_line {
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.t_nav {
		width: 100%;
		height: 100%;
	}

	.t_nav li {
		display: inline-block;
		width: 25%;
		height: 100%;
		text-align: center;
		position: relative;
	}

	.t_nav li span {
		font-size: 20px;
		color: #1AA1FD;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		top: 25%;
	}

	.t_nav li h1 {
		font-size: 23px;
		color: #fff;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		top: 50%;
		margin-top: 15px;
	}

	.t_nav li i {
		width: 1px;
		height: 100%;
		position: absolute;
		right: -0.2rem;
		background: url('../../assets/img/dpxs/sper.png') no-repeat;
		background-size: 100% 100%;
	}

	.t_nav li:nth-child(1) h1 {
		color: #07f7f4;
	}

	.t_nav li:nth-child(2) h1 {
		color: #fffe7d;
	}

	.t_nav li:nth-child(3) h1 {
		color: #ff7d01;
	}

	#zuo_info li {
		display: inline-block;
		width: 30%;
		height: 100%;
		text-align: center;
		position: relative;
		margin-right: 10px;
	}

	#you_info li {
		display: inline-block;
		width: 30%;
		height: 100%;
		text-align: center;
		position: relative;
		margin-right: 10px;
	}

	.navboxall {
		height: calc(100% - 30px);
		padding-left: 25px;
		padding-right: 25px;
		cursor: pointer;
	}

	.wrap {
		height: 82%;
		overflow: hidden;
	}

	.wrap li {
		line-height: 40px;
		height: 40px;
		color: black;
	}

	#zqContent li p span {
		color: black !important;
	}

	#zqContent li span:hover {
		color: #f77118 !important;
	}

	.wrap li p,
	.wraptit {
		font-size: 0;
	}

	.wrap li span,
	.wraptit span {
		display: inline-block;
		font-size: 18px;
		color: rgba(255, 255, 255, 0.8);
	}

	.wrap li span:hover {
		color: #f77118 !important;
	}


	.wraptit {
		border-bottom: 1px solid #242edd;
		padding: 0 0 10px 0;
		margin-bottom: 10px;
	}

	.wrap li span:nth-child(1),
	.wraptit span:nth-child(1) {
		width: 25%
	}

	.wrap li span:nth-child(2),
	.wraptit span:nth-child(2) {
		width: 25%
	}

	.wrap li span:nth-child(3),
	.wraptit span:nth-child(3) {
		width: 25%
	}

	.wrap li span:nth-child(4),
	.wraptit span:nth-child(4) {
		width: 25%
	}

	.str_wrap {
		overflow: hidden;
		width: 100%;
		position: relative;
		-moz-user-select: none;
		-khtml-user-select: none;
		user-select: none;
		white-space: nowrap;
	}


	.str_move {
		white-space: nowrap;
		position: absolute;
		top: 0;
		left: 0;
		cursor: move;
	}

	.str_move_clone {
		display: inline-block;
		vertical-align: top;
		position: absolute;
		left: 100%;
		top: 0;
	}

	.str_vertical .str_move_clone {
		left: 0;
		top: 100%;
	}

	.str_down .str_move_clone {
		left: 0;
		bottom: 100%;
	}

	.str_vertical .str_move,
	.str_down .str_move {
		white-space: normal;
		width: 100%;
	}

	.str_static .str_move,
	.no_drag .str_move,
	.noStop .str_move {
		cursor: inherit;
	}

	.str_wrap img {
		max-width: none !important;
	}

	@keyframes myfirst2 {
		from {
			width: 0
		}

		to {}
	}

	.yjName:hover {
		color: #0044CC;
	}

	#backLast {
		background-color: #eacaa2;
		margin: 5px;
		padding: 5px;
		border-radius: 5px;
		right: 20px;
		position: absolute;
	}

	#backLast:hover {
		background-color: #3366cc;
		color: #fff;
	}
</style>
