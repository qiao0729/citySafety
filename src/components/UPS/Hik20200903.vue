<template>
<!-- 该文件为在利用高德地图进行3D可视化时进行的备份 -->
  <div class="content-body">
    <div class="header">
      <div class="header-left">
        <span>天气情况实时监测预警系统</span>
      </div>
      <div class="header-time">
        <span id="time"></span>
      </div>
    </div>

    <div class="content">
      <div class="content-con">
        <div class="left-body">
          <div class="left-top public-bg">
            <div class="public-title">重点水量检测区</div>
            <div class="top-body">
              <div class="top-left">
                <div class="top-left-title">
                  <h6>注水量</h6>
                  <span>
                    <b>1756</b>m3/h
                  </span>
                  <img src="../../assets/css/img/pictre.png" alt />
                </div>
              </div>
              <div class="top-right">
                <div class="top-left-title">
                  <h6>泄水量</h6>
                  <span>
                    <b>3520</b>m3/h
                  </span>
                  <img src="../../assets/css/img/pictre.png" alt />
                </div>
              </div>
            </div>
          </div>
          <div class="left-con public-bg">
            <div class="public-title">雨量分布情况</div>
            <div class="title-nav" id="leida"></div>
          </div>
          <div class="left-bottom public-bg">
            <div class="public-title">恶劣天气情况</div>
            <div class="title-nav" id="wuran"></div>
          </div>
        </div>

        <div class="center-body">
          <div class="map" id="map"></div>
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
export default {
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
      mySelectWnd: 0, //当前选中的窗口
      g_bPTZAuto: false,
      iProtocol: 1,
      loginLoading: false,
      startPlayLoading: false,
      iStreamType: 1,
      bZeroChannel: false,
      iRtspPort: 0,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.char1();
      this.char2();
      this.char3();
      this.char4();
      this.center();
      this.videoInitPlugin(); // 初始化video界面
      this.onLogin(); //登录
      this.clickStartRealPlay(); //开始预览

      window.addEventListener("resize", () => {
        this.chartName.chart1.resize();
        this.chartName.chart2.resize();
        this.chartName.chart3.resize();
        this.chartName.chart4.resize();
      });
      let that = this;
      if (this.timer) {
        clearInterval(this.timer);
      } else {
        //前端定时刷新
        this.timer = setInterval(function () {
          that.getTime();
        }, 1000);
      }
    });
  },
  //vue实例销毁的时候清除定时器
  destroyed() {
    clearInterval(this.timer);
    this.clickStopRealPlay();
    this.onLogout();

    this.clickStopRealPlay1();
    this.onLogout1();
  },
  methods: {
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
        series: [
          {
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
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
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
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      };

      this.chartName.chart3.setOption(option);
    },
    char1() {
      this.chartName.chart1 = this.$echarts.init(
        document.getElementById("leida")
      );
      let option = {
        color: ["#00c2ff", "#f9cf67", "#e92b77"],
        legend: {
          show: true,
          // icon: 'circle',//图例形状
          bottom: 0,
          center: 0,
          itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
          itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
          itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: {
            fontSize: 12,
            color: "#ade3ff",
          },
          data: ["2016", "2017", "2018"],
        },
        radar: [
          {
            indicator: [
              {
                text: "重庆市",
                max: 100,
              },
              {
                text: "北京市",
                max: 100,
              },
              {
                text: "上海市",
                max: 100,
              },
              {
                text: "广东省",
                max: 100,
              },
              {
                text: "浙江省",
                max: 100,
              },
            ],

            textStyle: {
              color: "red",
            },
            center: ["50%", "50%"],
            radius: 60,
            startAngle: 90,
            splitNumber: 3,
            orient: "horizontal", // 图例列表的布局朝向,默认'horizontal'为横向,'vertical'为纵向.
            // shape: 'circle',
            // backgroundColor: {
            //     image:imgPath[0]
            // },
            name: {
              formatter: "{value}",
              textStyle: {
                fontSize: 12, //外圈标签字体大小
                color: "#5b81cb", //外圈标签字体颜色
              },
            },
            splitArea: {
              // 坐标轴在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: {
                // 分隔区域的样式设置。
                color: ["#141c42", "#141c42"], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              },
            },
            // axisLabel:{//展示刻度
            //     show: true
            // },
            axisLine: {
              //指向外圈文本的分隔线样式
              lineStyle: {
                color: "#153269",
              },
            },
            splitLine: {
              lineStyle: {
                color: "#113865", // 分隔线颜色
                width: 1, // 分隔线线宽
              },
            },
          },
        ],
        series: [
          {
            name: "雷达图",
            type: "radar",
            itemStyle: {
              emphasis: {
                lineStyle: {
                  width: 4,
                },
              },
            },
            data: [
              {
                name: "2016",
                value: [85, 65, 55, 90, 82],
                areaStyle: {
                  normal: {
                    // 单项区域填充样式
                    color: {
                      type: "linear",
                      x: 0, //右
                      y: 0, //下
                      x2: 1, //左
                      y2: 1, //上
                      colorStops: [
                        {
                          offset: 0,
                          color: "#00c2ff",
                        },
                        {
                          offset: 0.5,
                          color: "rgba(0,0,0,0)",
                        },
                        {
                          offset: 1,
                          color: "#00c2ff",
                        },
                      ],
                      globalCoord: false,
                    },
                    opacity: 1, // 区域透明度
                  },
                },
                symbolSize: 2.5, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                label: {
                  // 单个拐点文本的样式设置
                  normal: {
                    show: true, // 单个拐点文本的样式设置。[ default: false ]
                    position: "top", // 标签的位置。[ default: top ]
                    distance: 2, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
                    color: "#6692e2", // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
                    fontSize: 14, // 文字的字体大小
                    formatter: function (params) {
                      return params.value;
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    //图形悬浮效果
                    borderColor: "#00c2ff",
                    borderWidth: 2.5,
                  },
                },
                // lineStyle: {
                //     normal: {
                //         opacity: 0.5// 图形透明度
                //     }
                // }
              },
              {
                name: "2017",
                value: [50, 20, 45, 30, 75],
                symbolSize: 2.5,
                itemStyle: {
                  normal: {
                    borderColor: "#f9cf67",
                    borderWidth: 2.5,
                  },
                },
                areaStyle: {
                  normal: {
                    // 单项区域填充样式
                    color: {
                      type: "linear",
                      x: 0, //右
                      y: 0, //下
                      x2: 1, //左
                      y2: 1, //上
                      colorStops: [
                        {
                          offset: 0,
                          color: "#f9cf67",
                        },
                        {
                          offset: 0.5,
                          color: "rgba(0,0,0,0)",
                        },
                        {
                          offset: 1,
                          color: "#f9cf67",
                        },
                      ],
                      globalCoord: false,
                    },
                    opacity: 1, // 区域透明度
                  },
                },
                // lineStyle: {
                //     normal: {
                //         opacity: 0.5// 图形透明度
                //     }
                // }
              },
              {
                name: "2018",
                value: [37, 80, 12, 50, 25],
                symbolSize: 2.5,
                itemStyle: {
                  normal: {
                    borderColor: "#e92b77",
                    borderWidth: 2.5,
                  },
                },
                areaStyle: {
                  normal: {
                    // 单项区域填充样式
                    color: {
                      type: "linear",
                      x: 0, //右
                      y: 0, //下
                      x2: 1, //左
                      y2: 1, //上
                      colorStops: [
                        {
                          offset: 0,
                          color: "#e92b77",
                        },
                        {
                          offset: 0.5,
                          color: "rgba(0,0,0,0)",
                        },
                        {
                          offset: 1,
                          color: "#e92b77",
                        },
                      ],
                      globalCoord: false,
                    },
                    opacity: 1, // 区域透明度
                  },
                },
              },
            ],
          },
        ],
      };

      this.chartName.chart1.setOption(option);
    },
    char2() {
      this.chartName.chart2 = this.$echarts.init(
        document.getElementById("wuran")
      );

      let dataText = [
        {
          name: "大风",
          type: "line",
          smooth: true,
          symbolSize: 8,
          data: [127, 224, 120, 278, 227, 237],
          barWidth: "30%",
          itemStyle: {
            normal: {
              color: "#f0c725",
            },
          },
        },
        {
          name: "大雪",
          type: "line",
          smooth: true,
          symbolSize: 8,
          data: [27, 124, 70, 178, 127, 157],
          barWidth: "30%",
          itemStyle: {
            normal: {
              color: "#16f892",
            },
          },
        },
        {
          name: "冰雹",
          type: "line",
          smooth: true,
          symbolSize: 8,
          data: [127, 74, 120, 99, 130, 355],
          barWidth: "30%",
          itemStyle: {
            normal: {
              color: "#0BE3FF",
            },
          },
        },
      ];
      let dataObj = {
        year: ["2015", "2016", "2017", "2018", "2019", "2020"],
        data: {
          value: [
            {
              name: "大风",
              value: [127, 224, 250, 278, 227, 355],
            },
            {
              name: "大雪",
              value: [27, 124, 70, 178, 127, 157],
            },
            {
              name: "冰雹",
              value: [127, 74, 120, 99, 130, 50],
            },
          ],
        },
      };
      let dataArr = [];

      dataObj.data.value.map((item) => {
        let datachild = [];
        let newArr = {
          name: item.name,
          type: "line",
          smooth: true,
          symbolSize: 8,
          data: item.value,
          barWidth: "30%",
          itemStyle: {
            normal: {
              color:
                item.name === "大风"
                  ? "#f0c725"
                  : item.name === "大雪"
                  ? "#0BE3FF"
                  : "#16f892",
            },
          },
        };

        dataArr.push(newArr);
      });
      let option = {
        color: ["#f0c725", "#16f892"],
        title: {
          left: "center",
          text: "",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "14",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          x: "center",
          top: "25",
          textStyle: {
            color: "#c1cadf",
            fontSize: 14,
          },
        },
        grid: {
          left: "6%",
          right: "4%",
          top: "25%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          show: true,
          orient: "vertical",
          x: "right",
          y: "center",
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: dataObj.year,
            axisLine: {
              lineStyle: {
                color: "rgba(240,199,37,0.5)",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#c1cadf",
              fontSize: "15",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "(m3)",
            nameTextStyle: {
              color: "#c1cadf",
              align: "right",
              lineHeight: 10,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(240,199,37,0.5)",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#c1cadf",
              fontSize: "15",
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: dataArr,
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chartName.chart2.setOption(option);
    },

    //3D 地图
    center() {
      // 百度地图API功能
      var map = new BMap.Map("map"); // 创建Map实例
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
      //添加地图类型控件
      var size1 = new BMap.Size(10, 50);
      map.addControl(
        new BMap.MapTypeControl({
          offset: size1,
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        })
      );
      // 编写自定义函数,创建标注
      function addMarker(point) {
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
      }
      // 随机向地图添加25个标注
      var bounds = map.getBounds();
      var sw = bounds.getSouthWest();
      var ne = bounds.getNorthEast();
      var lngSpan = Math.abs(sw.lng - ne.lng);
      var latSpan = Math.abs(ne.lat - sw.lat);
      for (var i = 0; i < 25; i++) {
        var point = new BMap.Point(
          sw.lng + lngSpan * (Math.random() * 0.7),
          ne.lat - latSpan * (Math.random() * 0.7)
        );
        addMarker(point);
      }

      map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      //设备地图颜色
      var mapStyle = {
        style: "midnight",
      };
      map.setMapStyle(mapStyle);

      //加载城市控件
      var size = new BMap.Size(10, 50);
      map.addControl(
        new BMap.CityListControl({
          anchor: BMAP_ANCHOR_TOP_LEFT,
          offset: size,
        })
      );
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

      // 登录设备
      WebVideoCtrl.I_Login(
        that.hkvInfo.ip,
        that.iProtocol,
        that.hkvInfo.port,
        that.hkvInfo.username,
        that.hkvInfo.password,
        {
          async: false,
          success: function (xmlDoc) {
            // console.log('xmlDoc2', xmlDoc);//不能删除
            //TODO 获取通道信息
            that.getChannelInfo();
            that.getDevicePort(that.hkvInfo.ip + "_" + that.hkvInfo.port);
            that.loginLoading = false;

            that.$message({
              showClose: true,
              message: "登录成功",
              type: "success",
            });
          },
          error: function () {
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
    onLogout() {
      this.hkvInfo.channels = [];
      var szDeviceIdentify = this.hkvInfo.ip + "_" + this.hkvInfo.port;
      var iRet = WebVideoCtrl.I_Logout(szDeviceIdentify);
      if (0 == iRet) {
        this.$message({
          showClose: true,
          message: "退出成功",
          type: "success",
        });
      } else {
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
        setTimeout(
          that.startRealPlay(szDeviceIdentify, i, that.hkvInfo.channels[i]),
          500
        );
      }
      that.startPlayLoading = false;
    },
    videoInitPlugin: function () {
      var iRet = WebVideoCtrl.I_CheckPluginInstall();
      if (iRet === -1) {
        alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装");
        return;
      }
      this.initPlugin();
    },
    initPlugin: function () {
      var that = this;

      WebVideoCtrl.I_InitPlugin("100%", "100%", {
        bWndFull: true, //是否支持单窗口双击全屏，默I_CheckPluginInstall
        iWndowType: 1,
        myCbSelWnd: function (xmlStr) {
          //自己新增的方法
          var jsonObj = that.$x2js.xml2js(xmlStr);
          that.mySelectWnd = jsonObj.RealPlayInfo.SelectWnd;
          var szInfo = "当前选择的窗口编号：" + that.mySelectWnd;
          console.log(szInfo);
        },
        cbInitPluginComplete: function () {
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
    getDevicePort: function (szDeviceIdentify) {
      var oPort = WebVideoCtrl.I_GetDevicePort(szDeviceIdentify);
      this.iRtspPort = oPort.iRtspPort;
    },
    startRealPlay: function (szDeviceIdentify, iWndIndex, iChannelID) {
      var that = this;
      WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
        iRtspPort: that.iRtspPort,
        iWndIndex: iWndIndex,
        iStreamType: 1,
        iChannelID: iChannelID,
        bZeroChannel: that.bZeroChannel,
        success: function () {
          that.$notify({
            title: "成功",
            message: "开始预览通道" + iChannelID + "成功",
            type: "success",
          });
        },
        error: function (status, xmlDoc2) {
          console.log(xmlDoc2); //不能删除
          that.$notify({
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
    clickStopRealPlay: function () {
      var j =
        this.hkvInfo.channels.length > 4 ? 4 : this.hkvInfo.channels.length;
      for (var i = 0; i < j; i++) {
        setTimeout(this.stopRealPlay(i), 1000);
      }
    },
    stopRealPlay: function (iWndIndex) {
      var that = this;
      WebVideoCtrl.I_Stop({
        iWndIndex: iWndIndex,
        success: function () {
          that.$notify({
            title: "成功",
            message: "停止预览窗口" + iWndIndex + "成功",
            type: "success",
          });
        },
        error: function () {
          that.$notify({
            title: "失败",
            message: "停止预览窗口" + iWndIndex + "失败",
            type: "error",
          });
        },
      });
    },
    // 获取通道，实际上可以根据自己的项目，获取数字通道，模拟通道，零通道中的一个或多个，不用全部获取（提高效率）
    getChannelInfo: function () {
      var that = this;
      var szDeviceIdentify = this.hkvInfo.ip + "_" + this.hkvInfo.port;
      // debugger
      // 数字通道
      that.hkvInfo.channels = [];
      WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
        async: false,
        mysuccess: function (xmlStr) {
          console.log("mysuccess I_GetDigitalChannelInfo: ", xmlStr);
          var jsonObj = that.$x2js.xml2js(xmlStr);
          var list =
            jsonObj.InputProxyChannelStatusList.InputProxyChannelStatus;
          for (var x = 0; x < list.length; x++) {
            that.hkvInfo.channels.push(list[x].id);
          }
        },
        success: function (xmlDoc) {},
        error: function (status, xmlDoc) {
          console.log("获取数字通道失败");
        },
      });
      // TODO 模拟通道
      // 模拟通道
      WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
        async: false,
        mysuccess: function (xmlStr) {
          var jsonObj = that.$x2js.xml2js(xmlStr);
          console.log("模拟通道mysuccess", xmlStr);
          // var list = jsonObj.VideoInputChannelList;
          // for (var x = 0; x < list.length; x++) {
          //   that.hkvInfo.channels.push(list[x].VideoInputChannel.id);
          // }
          var id = jsonObj.VideoInputChannelList.VideoInputChannel.id;
          that.hkvInfo.channels.push(id);
        },
        success: function (xmlStr) {
          console.log("模拟通道success", xmlStr);
        },
        error: function (status, xmlDoc) {
          console.log("模拟通道error", xmlDoc);
        },
      });
      // TODO 零通道
    },
    mouseDownPTZControl: function (iPTZIndex) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd);

      if (oWndInfo !== null) {
        if (iPTZIndex === 9 && this.g_bPTZAuto) {
          iPTZSpeed = 0;
        } else {
          this.g_bPTZAuto = false;
        }

        WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
          iPTZSpeed: 4,
          mysuccess: function (xmlStr) {
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
          error: function (status, xmlDoc) {
            console.log(
              oWndInfo.szDeviceIdentify + " 开启云台失败！mouseDown",
              status,
              xmlDoc
            );
          },
        });
      }
    },
    mouseUpPTZControl: function () {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd);
      if (oWndInfo !== null) {
        WebVideoCtrl.I_PTZControl(1, true, {
          mysuccess: function (xmlStr) {
            console.log(
              oWndInfo.szDeviceIdentify + " 停止云台成功！mouseUp",
              xmlStr
            );
          },
          error: function (status, xmlDoc) {
            console.log(
              oWndInfo.szDeviceIdentify + " 停止云台失败！mouseUp",
              status,
              xmlDoc
            );
          },
        });
      }
    },

    //设备2
    onLogin1() {
      var that = this;
      that.loginLoading1 = true;

      // 登录设备
      WebVideoCtrl.I_Login(
        that.hkvInfo1.ip,
        that.iProtocol1,
        that.hkvInfo1.port,
        that.hkvInfo1.username,
        that.hkvInfo1.password,
        {
          async: false,
          success: function (xmlDoc) {
            // console.log('xmlDoc2', xmlDoc);//不能删除
            //TODO 获取通道信息
            that.getChannelInfo1();
            that.getDevicePort1(that.hkvInfo1.ip + "_" + that.hkvInfo1.port);
            that.loginLoading1 = false;

            that.$message({
              showClose: true,
              message: "登录成功",
              type: "success",
            });
          },
          error: function () {
            that.loginLoading1 = false;
            that.$message({
              showClose: true,
              message: "登录失败",
              type: "error",
            });
          },
        }
      );
    },
    onLogout1() {
      this.hkvInfo1.channels = [];
      var szDeviceIdentify = this.hkvInfo1.ip + "_" + this.hkvInfo1.port;
      var iRet = WebVideoCtrl.I_Logout(szDeviceIdentify);
      if (0 == iRet) {
        this.$message({
          showClose: true,
          message: "退出成功",
          type: "success",
        });
      } else {
        this.$message({
          showClose: true,
          message: "退出失败",
          type: "error",
        });
      }
    },
    clickStartRealPlay1() {
      // 开始预览
      var that = this;
      that.startPlayLoading1 = true;
      var szDeviceIdentify = that.hkvInfo1.ip + "_" + that.hkvInfo1.port;

      var j =
        that.hkvInfo1.channels.length > 4 ? 4 : that.hkvInfo1.channels.length;
      for (var i = 0; i < j; i++) {
        setTimeout(
          that.startRealPlay1(szDeviceIdentify, i, that.hkvInfo1.channels[i]),
          500
        );
      }
      that.startPlayLoading1 = false;
    },
    videoInitPlugin1: function () {
      var iRet = WebVideoCtrl.I_CheckPluginInstall();
      if (iRet === -1) {
        alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装");
        return;
      }
      this.initPlugin1();
    },
    initPlugin1: function () {
      var that = this;

      WebVideoCtrl.I_InitPlugin("100%", "100%", {
        bWndFull: true, //是否支持单窗口双击全屏，默I_CheckPluginInstall
        iWndowType: 1,
        myCbSelWnd: function (xmlStr) {
          //自己新增的方法
          var jsonObj = that.$x2js.xml2js(xmlStr);
          that.mySelectWnd1 = jsonObj.RealPlayInfo.SelectWnd;
          var szInfo = "当前选择的窗口编号：" + that.mySelectWnd1;
          console.log(szInfo);
        },
        cbInitPluginComplete: function () {
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
    getDevicePort1: function (szDeviceIdentify) {
      var oPort = WebVideoCtrl.I_GetDevicePort(szDeviceIdentify);
      this.iRtspPort1 = oPort.iRtspPort;
    },
    startRealPlay1: function (szDeviceIdentify, iWndIndex, iChannelID) {
      var that = this;
      WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
        iRtspPort: that.iRtspPort1,
        iWndIndex: iWndIndex,
        iStreamType: 1,
        iChannelID: iChannelID,
        bZeroChannel: that.bZeroChannel1,
        success: function () {
          that.$notify({
            title: "成功",
            message: "开始预览通道" + iChannelID + "成功",
            type: "success",
          });
        },
        error: function (status, xmlDoc2) {
          console.log(xmlDoc2); //不能删除
          that.$notify({
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
    clickStopRealPlay1: function () {
      var j =
        this.hkvInfo1.channels.length > 4 ? 4 : this.hkvInfo1.channels.length;
      for (var i = 0; i < j; i++) {
        setTimeout(this.stopRealPlay1(i), 1000);
      }
    },
    stopRealPlay1: function (iWndIndex) {
      var that = this;
      WebVideoCtrl.I_Stop({
        iWndIndex: iWndIndex,
        success: function () {
          that.$notify({
            title: "成功",
            message: "停止预览窗口" + iWndIndex + "成功",
            type: "success",
          });
        },
        error: function () {
          that.$notify({
            title: "失败",
            message: "停止预览窗口" + iWndIndex + "失败",
            type: "error",
          });
        },
      });
    },
    // 获取通道，实际上可以根据自己的项目，获取数字通道，模拟通道，零通道中的一个或多个，不用全部获取（提高效率）
    getChannelInfo1: function () {
      var that = this;
      var szDeviceIdentify = this.hkvInfo1.ip + "_" + this.hkvInfo1.port;
      // debugger
      // 数字通道
      that.hkvInfo1.channels = [];
      WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
        async: false,
        mysuccess: function (xmlStr) {
          console.log("mysuccess I_GetDigitalChannelInfo: ", xmlStr);
          var jsonObj = that.$x2js.xml2js(xmlStr);
          var list =
            jsonObj.InputProxyChannelStatusList.InputProxyChannelStatus;
          for (var x = 0; x < list.length; x++) {
            that.hkvInfo1.channels.push(list[x].id);
          }
        },
        success: function (xmlDoc) {},
        error: function (status, xmlDoc) {
          console.log("获取数字通道失败");
        },
      });
      // TODO 模拟通道
      // 模拟通道
      WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
        async: false,
        mysuccess: function (xmlStr) {
          var jsonObj = that.$x2js.xml2js(xmlStr);
          console.log("模拟通道mysuccess", xmlStr);
          // var list = jsonObj.VideoInputChannelList;
          // for (var x = 0; x < list.length; x++) {
          //   that.hkvInfo.channels.push(list[x].VideoInputChannel.id);
          // }
          var id = jsonObj.VideoInputChannelList.VideoInputChannel.id;
          that.hkvInfo1.channels.push(id);
        },
        success: function (xmlStr) {
          console.log("模拟通道success", xmlStr);
        },
        error: function (status, xmlDoc) {
          console.log("模拟通道error", xmlDoc);
        },
      });
      // TODO 零通道
    },
    mouseDownPTZControl1: function (iPTZIndex) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd1);

      if (oWndInfo !== null) {
        if (iPTZIndex === 9 && this.g_bPTZAuto1) {
          iPTZSpeed = 0;
        } else {
          this.g_bPTZAuto1 = false;
        }

        WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
          iPTZSpeed: 4,
          mysuccess: function (xmlStr) {
            console.log("I_PTZControl", xmlStr);
            if (iPTZIndex === 9 && this.g_bPTZAuto1) {
              console.log(
                oWndInfo.szDeviceIdentify + " 停止云台成功！mouseDown"
              );
            } else {
              console.log(
                oWndInfo.szDeviceIdentify + " 开启云台成功！mouseDown"
              );
            }
            if (iPTZIndex === 9) {
              this.g_bPTZAuto1 = !this.g_bPTZAuto1;
            }
          },
          error: function (status, xmlDoc) {
            console.log(
              oWndInfo.szDeviceIdentify + " 开启云台失败！mouseDown",
              status,
              xmlDoc
            );
          },
        });
      }
    },
    mouseUpPTZControl1: function () {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.mySelectWnd1);
      if (oWndInfo !== null) {
        WebVideoCtrl.I_PTZControl(1, true, {
          mysuccess: function (xmlStr) {
            console.log(
              oWndInfo.szDeviceIdentify + " 停止云台成功！mouseUp",
              xmlStr
            );
          },
          error: function (status, xmlDoc) {
            console.log(
              oWndInfo.szDeviceIdentify + " 停止云台失败！mouseUp",
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
</style>