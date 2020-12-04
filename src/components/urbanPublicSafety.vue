<template>
  <div id="urbanSafety">
    <meta charset="UTF-8" />
    <title>城市公共安全监测系统</title>
    <!--顶部-->
    <header class="header left">
      <div class="left nav left-box">
        <el-dropdown hide-on-click>
          <div class="menu_title">
            <i class="el-icon-s-unfold"></i>
            <span class="el-dropdown-link"
              >信息总览<i class="el-icon-arrow-down el-icon--right"></i
            ></span>
          </div>
          <el-dropdown-menu slot="dropdown" class="dropdown">
            <dropMenu></dropMenu>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="header_center left">
        <timeRecord></timeRecord>
      </div>
      <!-- 头部右侧区域 -->
      <div class="right nav text_right">
        <el-dropdown size="mini" hide-on-click placement="bottom-start">
          <titleRight></titleRight>
        </el-dropdown>
      </div>
    </header>
    <!--内容部分-->
    <div class="con left">
      <!--统计分析图-->
      <div class="div_any">
        <div class="left div_any01">
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/css/img/title_1.png" />话题评论量
            </div>
            <p id="char11" class="p_chart"></p>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/css/img/title_2.png" />话题信息
            </div>
            <div id="char21" class="p_chart">
              <div class="message_scroll_box">
                <div class="message_scroll">
                  <div class="scroll_top">
                    <span class="scroll_title">高锰酸盐超标警告</span>
                    <span class="scroll_level scroll_level01">一级</span>
                    <a class="localize"></a>
                    <span class="scroll_timer">17-09-13/9:52</span>
                  </div>
                  <div class="msg_cage">
                    <a class="localize_title">
                      <span> <label>编号</label>：GH32101 </span>
                      <span class="right">
                        <label>监测值</label>：1.1(mg/Ls)
                      </span>
                    </a>
                  </div>
                  <div class="msg_cage">
                    <a class="localize_msg">xx阳市沱江一段21号排污口处</a>
                  </div>
                </div>
                <div class="message_scroll">
                  <div class="scroll_top">
                    <span class="scroll_title">总磷超标警告</span>
                    <span class="scroll_level scroll_level03">三级</span>
                    <a class="localize"></a>
                    <span class="scroll_timer">17-09-13/9:52</span>
                  </div>
                  <div class="msg_cage">
                    <a class="localize_title">
                      <span> <label>编号</label>：GH32101 </span>
                      <span class="right">
                        <label>监测值</label>：1.1(mg/Ls)
                      </span>
                    </a>
                  </div>
                  <div class="msg_cage">
                    <a class="localize_msg">xx阳市沱江一段21号排污口处</a>
                  </div>
                </div>
                <div class="message_scroll">
                  <div class="scroll_top">
                    <span class="scroll_title">高锰酸盐超标警告</span>
                    <span class="scroll_level scroll_level02">二级</span>
                    <a class="localize"></a>
                    <span class="scroll_timer">17-09-13/9:52</span>
                  </div>
                  <div class="msg_cage">
                    <a class="localize_title">
                      <span> <label>编号</label>：GH32101 </span>
                      <span class="right">
                        <label>监测值</label>：1.1(mg/Ls)
                      </span>
                    </a>
                  </div>
                  <div class="msg_cage">
                    <a class="localize_msg">xx阳市沱江一段21号排污口处。</a>
                  </div>
                </div>
                <div class="message_scroll">
                  <div class="scroll_top">
                    <span class="scroll_title">高锰酸盐超标警告</span>
                    <span class="scroll_level scroll_level01">一级</span>
                    <a class="localize"></a>
                    <span class="scroll_timer">17-09-13/9:52</span>
                  </div>
                  <div class="msg_cage">
                    <a class="localize_title">
                      <span> <label>编号</label>：GH32101 </span>
                      <span class="right">
                        <label>监测值</label>：1.1(mg/Ls)
                      </span>
                    </a>
                  </div>
                  <div class="msg_cage">
                    <a class="localize_msg">xx阳市沱江一段21号排污口处</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/css/img/title_2.png" />情感等级分布
            </div>
            <p id="char31" class="p_chart"></p>
          </div>
        </div>
        <div class="div_any02 left">
          <div class="div_any_child div_height">
            <div class="div_any_title any_title_width">
              <img src="../assets/css/img/title_3.png" />情感空间分布
            </div>
            <div id="map_div"></div>
          </div>
        </div>
        <div class="right div_any01">
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/css/img/title_4.png" />空间情感等级分布
            </div>
            <p id="char41" class="p_chart"></p>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/css/img/title_5.png" />情感等级数量分布
            </div>
            <p id="char51" class="p_chart"></p>
          </div>
          <div class="div_any_child">
            <div class="div_any_title">
              <img src="../assets/css/img/title_5.png" />情感时间分布
            </div>
            <p id="char61" class="p_chart"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import "../assets/js/urbanPublicSafety/map.js";
import dropMenu from "./publicComponents/dropMenu";
import titleRight from "./publicComponents/titleRight";
import timeRecord from "./publicComponents/timeRecord";
export default {
  components: {
    dropMenu,
    titleRight,
    timeRecord,
  },
  data() {
    return {
      fontColor: "#fff",
      chartName: {
        chart1: "",
        chart2: "",
        chart3: "",
        chart4: "",
        chart5: "",
        chart6: "",
        center: "",
      },
    };
  },
  //进行相关图表的可视化
  mounted() {
    this.$nextTick(function () {
      this.test();
      this.char1();
      this.char2();
      this.char3();
      this.char4();
      this.char5();
      this.char6(); //20200821 用这个div来显示视频
      // this.center();
      //this.centerMap(); //利用mapbox进行三维地图展示
      this.amapCenter(); //利用高德地图进行地图展示
      window.addEventListener("resize", () => {
        this.chartName.chart1.resize();
        // this.chartName.chart2.resize();
        this.chartName.chart3.resize();
        this.chartName.chart4.resize();
        this.chartName.chart5.resize();
        //this.chartName.chart6.resize();
        // this.chartName.center.resize();
      });
    });
  },
  methods: {
    async test() {
      // 前端与模型进行交互
      var pythonTest = await this.test1();
      console.log(pythonTest);
	  console.log(typeof pythonTest)
	  if(pythonTest == '自然灾害'){
		  console.log('自然灾害');
	  }else if(pythonTest == '事故灾难'){
		  console.log('事故灾难');
	  }else if(pythonTest == '社会安全'){
		  console.log('社会安全');
	  }else if(pythonTest == '公共卫生'){
		  console.log('公共卫生');
	  }else{
		  console.log('出错');
	  }

      //webscoket测试
      /* var wsObj = new WebSocket("ws://127.0.0.1:8888");   //建立连接
        wsObj.onopen = function(){  //发送请求
            console.log("open");
            wsObj.send("Hello WebSocket");
        };
        wsObj.onmessage = function(ev){  //获取后端响应
            console.log(ev.data);
        };
        wsObj.onclose = function(ev){
            console.log("close");
        };
        wsObj.onerror = function(ev){
            console.log("error");
        }; */
    },
    async test1() {
     var queryObject = {
        "cmds" :'中国驻加蓬大使馆28日在其官方网站发布公告说，加蓬首都利伯维尔27日发生一起恶性案件，一名中国公民在家中遭歹徒持刀抢劫，遇刺身亡。'
      }
      const { data: res } = await this.$http.get("LBS/pythonModel/pythonTest", {
        params: queryObject,
      });
      return res.data;
    },

    //利用mapbox来实现3D地图  实现建筑的渐变色渲染
    centerMap() {
      console.log(1);
      // 模拟加载一个地图
      mapboxgl.accessToken =
        "pk.eyJ1IjoicWlhb3ppIiwiYSI6ImNrZXYwc2M0MzIxa2Uycm9mcmVmY2QwamwifQ.M8KsobLanr4VURNHLYJDHg";

      var map = new mapboxgl.Map({
        style: "mapbox://styles/mapbox/dark-v10",
        center: [104.06, 30.67],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: "map_div",
      });

      //立体建筑
      map.on("load", function () {
        console.log("加载三维建筑");
        // Insert the layer beneath any symbol layer.
        var layers = map.getStyle().layers;
        console.log(layers);

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
            labelLayerId = layers[i].id;
            break;
          }
        }

        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 5,
            paint: {
              //'fill-extrusion-color': '#fff', //原本只有一种颜色，通过设置渐变色进行渲染
              "fill-extrusion-color": [
                "interpolate",
                ["exponential", 0.99],
                ["get", "height"],
                0,
                "#52e5e7",
                500,
                "#130cb7",
              ],
              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              //使用插值表达式在用户放大时向建筑物添加平滑过渡效果
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayerId
        );
      });
    },
    //地图模块 利用高德地图实现
    center() {
      //利用高德地图展示3维地图
      var map = new AMap.Map("map_div", {
        mapStyle: "amap://styles/darkblue",
        //高德不兼容IE
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 10,
        //pitch:65,
        //rotation:45,
        viewMode: "3D", //开启3D视图,默认为关闭
        expandZoomRange: true,
        zooms: [3, 20],
        center: [104.06, 30.67],
      });

      //添加楼块图层
      var buildLayer = new AMap.Buildings({
        zooms: [14, 20],
        zIndex: 10,
        heightFactor: 2, //2倍于默认高度，3D下有效
      });

      //实时路况图层
      var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10,
        autoRefresh: true,
      });

      trafficLayer.setMap(map);

      // // 百度地图API功能
      // var map = new BMap.Map("map_div"); // 创建Map实例
      // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
      // //添加地图类型控件
      // var size1 = new BMap.Size(10, 50);
      // map.addControl(
      //   new BMap.MapTypeControl({
      //     offset: size1,
      //     mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
      //   })
      // );
      // // 编写自定义函数,创建标注
      // function addMarker(point) {
      //   var marker = new BMap.Marker(point);
      //   map.addOverlay(marker);
      // }
      // // 随机向地图添加25个标注
      // var bounds = map.getBounds();
      // var sw = bounds.getSouthWest();
      // var ne = bounds.getNorthEast();
      // var lngSpan = Math.abs(sw.lng - ne.lng);
      // var latSpan = Math.abs(ne.lat - sw.lat);
      // for (var i = 0; i < 25; i++) {
      //   var point = new BMap.Point(
      //     sw.lng + lngSpan * (Math.random() * 0.7),
      //     ne.lat - latSpan * (Math.random() * 0.7)
      //   );
      //   addMarker(point);
      // }

      // map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
      // map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      // //设备地图颜色
      // var mapStyle = {
      //   style: "midnight",
      // };
      // map.setMapStyle(mapStyle);

      // //加载城市控件
      // var size = new BMap.Size(10, 50);
      // map.addControl(
      //   new BMap.CityListControl({
      //     anchor: BMAP_ANCHOR_TOP_LEFT,
      //     offset: size,
      //   })
      // );
    },
    //地图模块 利用高德地图实现
    amapCenter() {
      //楼块图层
      var buildingLayer = new AMap.Buildings({
        zIndex: 130,
        merge: false,
        sort: false,
        zooms: [10, 20],
      });
      var options = {
        hideWithoutStyle: false, //是否隐藏设定区域外的楼块
        areas: [
          {
            //改变相应区域的楼块的图层
            color1: "ff4682b4",
            color2: "ff00bfff",
            path: [
              [102.9, 31.4333],
              [104.8333, 31.4333],
              [104.8333, 30.08333],
              [102.9, 30.08333],
              [102.9, 31.4333],
            ],
          },
        ],
      };
      buildingLayer.setStyle(options); //此配色优先级高于自定义mapStyle

      //初始化地图
      var map = new AMap.Map("map_div", {
        zoom: 17,
        pitch: 50,
        showIndoorMap: false,
        showLabel: false, //显示地图标注
        mapStyle: "amap://styles/darkblue",
        center: [104.06, 30.67],
        features: ["bg", "point", "road"],
        viewMode: "3D",
        layers: [new AMap.TileLayer(), buildingLayer],
      });

      //添加实时交通路况图层
      var traffic = new AMap.TileLayer.Traffic({
        autoRefresh: true, //是否自动刷新，默认为false
        interval: 180, //刷新间隔，默认180s
        zIndex: 130,
      });

      map.add(traffic); //通过add方法添加图层
    },
    async char1() {
      //获取数据实例

      // const { data: res1 } = await this.$http.get(
      //   "LBS/baiduHy/BJarea_data/migration"
      // );
      // var migrationData = res1.data;
      // console.log(migrationData);

      this.chartName.chart1 = this.$echarts.init(
        document.getElementById("char11")
      );
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          name: "时间",
          axisLabel: {
            rotate: 40,
          },
          splitLine: { show: false },
          data: [
            "3月31日上半日",
            "3月31日下半日",
            "4月1日上半日",
            "4月1日下半日",
            "4月2日上半日",
          ],
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          name: "数量",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "生活费",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
              fontSize: "24px",
            },
            data: [2500, 4100, 4900, 5000, 5100],
          },
        ],
      };
      this.chartName.chart1.setOption(option);
    },
    char2() {
      this.chartName.chart2 = this.$echarts.init(
        document.getElementById("char21")
      );
      var equipment = ["华为", "中兴", "爱立信", "索尼", "联想", "思科"];
      var project = [
        "华为",
        "中兴",
        "烽火",
        "阿尔卡特",
        "三星",
        "tplink",
        "惠普",
        "戴尔",
      ];
      var colorList = [
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
      ];
      let option = {
        //backgroundColor: '#fff',
        tooltip: {
          formatter: function (param) {
            if (param.data.type == null) {
              return param.data.name + ":" + param.value + "个";
            } else {
              return param.data.type + ":" + param.value + "个";
            }
          },
        },

        series: [
          {
            name: "整体分类",
            type: "pie",
            radius: [0, "30%"],
            label: {
              position: "inner",
            },
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 2,
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },

            selectedMode: "single",
            data: [
              {
                value: 875,
                name: "传输",
              },
              {
                value: 1239,
                name: "话务",
              },
            ],
          },
          {
            name: "招标方式",
            type: "pie",
            radius: ["40%", "55%"],

            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              normal: {
                formatter: function (params) {
                  if (params.value != 0)
                    return params.data.type + ":" + params.value + "个";
                  else return "";
                },
                show: true,
              },
            },

            data: [
              {
                value: 135,
                name: "传输",
                type: equipment[0],
              },
              {
                value: 200,
                name: "传输",
                type: equipment[1],
              },
              {
                value: 100,
                name: "传输",
                type: equipment[2],
              },
              {
                value: 50,
                name: "传输",
                type: equipment[3],
              },
              {
                value: 300,
                name: "传输",
                type: equipment[4],
              },
              {
                value: 90,
                name: "传输",
                type: equipment[5],
              },
              {
                value: 310,
                name: "话务",
                type: project[0],
              },
              {
                value: 234,
                name: "话务",
                type: project[1],
              },
              {
                value: 35,
                name: "话务",
                type: project[2],
              },
              {
                value: 100,
                name: "话务",
                type: project[3],
              },
              {
                value: 40,
                name: "话务",
                type: project[4],
              },
              {
                value: 400,
                name: "话务",
                type: project[5],
              },
              {
                value: 100,
                name: "话务",
                type: project[6],
              },
              {
                value: 20,
                name: "话务",
                type: project[7],
              },
            ],
          },
        ],
      };

      this.chartName.chart2.setOption(option);
    },
    //情感等级分布饼状图
    char3() {
      this.chartName.chart3 = this.$echarts.init(
        document.getElementById("char31")
      );

      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "13%",
          top: "15%",
        },
        legend: {
          left: "center",
          textStyle: {
            color: this.fontColor, //字体颜色
          },
          data: ["等级2", "等级1", "等级0", "等级-1", "等级-2"],
        },
        series: [
          {
            name: "情感等级分布",
            type: "pie",
            radius: [30, 80],
            roseType: "area",
            data: [
              { value: 10, name: "等级2" },
              { value: 5, name: "等级1" },
              { value: 15, name: "等级0" },
              { value: 25, name: "等级-1" },
              { value: 20, name: "等级-2" },
            ],
          },
        ],
      };
      this.chartName.chart3.setOption(option);
    },
    //情感空间分布
    char4() {
      this.chartName.chart4 = this.$echarts.init(
        document.getElementById("char41")
      );
      let option = {
        color: ["#FF6F3B"],
        grid: {
          top: "15%",
        },
        xAxis: {
          type: "category",
          name: "地域",
          axisLine: {
            lineStyle: {
              color: this.fontColor,
            },
          },
          data: [
            "福建",
            "湖北",
            "河北",
            "西藏",
            "四川",
            "贵州",
            "广西",
            "安徽",
            "浙江",
            "广东",
          ],
        },
        yAxis: {
          type: "value",
          name: "情感得分",
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: this.fontColor,
            },
          },
        },
        series: [
          {
            data: [1.7, 1.6, 1.5, 1.49, 1.48, 1.47, 1.46, 1.8, 1.75, 1.72],
            type: "bar",
            label: {
              show: true,
              color: "#fff",
              position: "top",
            },
          },
        ],
      };
      this.chartName.chart4.setOption(option);
    },
    //情感等级数量柱状图分布
    char5() {
      this.chartName.chart5 = this.$echarts.init(
        document.getElementById("char51")
      );
      let option = {
        color: ["#3B6FFF"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["数量"],
          textStyle: {
            color: this.fontColor, //字体颜色
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: this.fontColor,
              },
            },
            data: ["等级2", "等级1", "等级0", "等级-1", "等级-2"],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",
            axisLine: {
              lineStyle: {
                color: this.fontColor,
              },
            },
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            data: [0, 0, 2, 28, 4],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
        ],
      };
      this.chartName.chart5.setOption(option);
    },
    //情感时间分布
    char6() {
      this.chartName.chart6 = this.$echarts.init(
        document.getElementById("char61")
      );
      let option = {
        legend: {
          data: ["积极", "消极"],
          textStyle: {
            color: this.fontColor, //字体颜色
          },
        },
        grid: {
          right: "13%",
        },
        xAxis: {
          type: "category",
          name: "时间段",
          axisLine: {
            lineStyle: {
              color: this.fontColor,
            },
          },
          data: ["1", "2", "3", "4", "5"],
        },
        yAxis: {
          type: "value",
          name: "情感分数",
          nameTextStyle: {
            padding: [0, 0, 15, 0],
          },
          axisLine: {
            lineStyle: {
              color: this.fontColor,
            },
          },
        },
        series: [
          {
            data: [1.7, 1.78, 1.64, 1.68, 1.66],
            name: "积极",
            type: "line",
            symbol: "triangle",
            symbolSize: 20,
            label: {
              show: true,
              color: this.fontColor,
              position: "top",
            },
            lineStyle: {
              color: "green",
              width: 4,
              type: "dashed",
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: "yellow",
              color: "blue",
            },
          },
          {
            type: "line",
            name: "消极",
            smooth: true,
            symbolSize: 20,
            data: [0.3, 0.22, 0.36, 0.32, 0.34],
            label: {
              show: true,
              fontSize: 14,
              position: "top",
            },
          },
        ],
      };
      this.chartName.chart6.setOption(option);
    },
  },
};
</script>

<style scoped>
/* 引入外部css样式 */
@import "../assets/css/urbanPublicSafety/base.css";
@import "../assets/css/urbanPublicSafety/index.css";
@import "../assets/css/urbanPublicSafety/index01.css";
#urbanSafety {
  width: 100vw;
  height: 100vh;
  background-color: #070b0f !important;
}
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
  color: #fff;
}
.time_ {
  position: absolute;
  margin-top: 4px;
  margin-left: -70px;
}
/* 设置内容和表头占满全屏 */
.header {
  height: 8vh !important;
  border-bottom: 1px dashed #444;
}
.con {
  height: 92vh;
}
.div_any01 .div_any_child {
  height: 25.5vh !important;
}

.right {
  margin-right: 0% !important;
}

.div_any02 .div_any_child {
  height: 82vh !important;
}

.div_any02 {
  width: 50% !important;
}

#char31 {
  height: 24.5vh !important;
}
.scroll_title {
  color: white;
}
.scroll_level {
  color: red;
  padding: 10px;
}
.scroll_timer {
  color: white;
}
</style>
<style>
.BMap_cpyCtrl {
  display: none !important;
}

.anchorBL {
  display: none !important;
}
.title_left {
  position: absolute;
  left: 25%;
  top: 40px;
}

.title_right {
  position: absolute;
  right: 25%;
  top: 40px;
}
</style>