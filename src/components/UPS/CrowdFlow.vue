<template>

  <div class="content-body">
    <!-- 头部 -->
    <div class="header">
      <div class="left nav left-box">
        <el-dropdown hide-on-click>
          <div class="menu_title">
            <i class="el-icon-s-unfold"></i>
            <span class="el-dropdown-link"
              >人流监测<i class="el-icon-arrow-down el-icon--right"></i
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
    </div>

    <!-- 内容 -->
    <div class="content">
      <div class="content-con">
        <!-- 三栏布局 -->
        <div class="leftContent">
          <div class="rightTop leftPart rightPart">
            <h2>
              <b>天级别趋势</b>
              <img src="../../UI/总览-UI设计稿_slices/卡片标题装饰物_左开口.png"/>
            </h2>
            <div class="tipNum"> 
              <p>
                <span>{{nowName}}</span>
                <b>{{nowID}}</b>
              </p>
            </div>
            <div class="chartBox" id="chartTopL"></div>
            <img style="bottom:1rem;"  class="chartBottomR chartBottomL" src="../../UI/总览-UI设计稿_slices/右下.png"/>
          </div>
          <div class="rightBottom leftPart rightPart">
            <h2>
              <b>周级别趋势</b>
              <img src="../../UI/总览-UI设计稿_slices/卡片标题装饰物_左开口.png"/>
            </h2>
            <div class="tipNum"> 
              <p>
                <!-- <span>{{nowName}}</span>
                <b>{{nowID}}</b> -->
                <b style="color:red; margin-left:1rem">{{nowWeekDay}}</b>
              </p>
            </div>
            <div class="chartBox" id="chartBottomL"></div>
            <img class="chartBottomR chartBottomL" src="../../UI/总览-UI设计稿_slices/右下.png" />
          </div>
        </div>
        <div class="centerContent" id="centerContent">
          <div class="topNum">
            <!-- <p>
              654466
              <span>总数</span>
            </p> -->
            <ul>
              <li>
                <h3>天人流数</h3>
                <p>
                  6556
                  <b>c2</b>
                </p>
              </li>
              <li>
                 <h3>天人流数</h3>
                <p>
                  6556
                  <b>c2</b>
                </p>
              </li>
              <li>
                 <h3>天人流数</h3>
                <p>
                  6556
                  <b>c2</b>
                </p>
              </li>
            </ul>
          </div>
          <div id="map" class="gao-map"></div>
        </div>
        <div class="rightContent">
          <!-- <img class="imgTopL" src="../../UI/总览-UI设计稿_slices/左上.png" />
          <img class="imgBottomR" src="../../UI/总览-UI设计稿_slices/右下.png"/>  -->
          <div class="rightTop rightPart">
            <h2>
              <b>总体分布</b>
              <img src="../../UI/总览-UI设计稿_slices/卡片标题装饰物_左开口.png"/>
            </h2>
           
            <div class="chartBox" id="chartTopR"></div>
            <img class="chartBottomR" src="../../UI/总览-UI设计稿_slices/右下.png"/>
          </div>
          <div class="rightBottom rightPart">
            <h2>
              <b>周级别周期性</b>
              <img
                src="../../UI/总览-UI设计稿_slices/卡片标题装饰物_左开口.png"
              />
            </h2>
             <div class="tipNum"> 
              <p>
                <span>{{nowName}}</span>
                <b>{{nowID}}</b>
              </p>
            </div>
            <div class="chartBox" id="chartBottomR"></div>
            <img class="chartBottomR" src="../../UI/总览-UI设计稿_slices/右下.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dropMenu from "../publicComponents/dropMenu";
import titleRight from "../publicComponents/titleRight";
import timeRecord from "../publicComponents/timeRecord";
export default {
  components: {
    dropMenu,
    titleRight,
    timeRecord,
  },
  data() {
    return {
      //存储各个区域各个日期各个时刻的人流指数数据
      area_index_data: {},
      all_distribute_data:{},
      all_min:99999,//所有分布的数据中的最小值
      all_max:0,//所有分布的数据中的最大值
      area_idName_data:'',
      idToNameMap:'',//区域id与名称的对应关系
      idList:'',//区域id列表
      nowID:'1',//当前展示的区域id
      nowName:'天安门',//当前展示的区域的名称
      nowDay:'day1',
      //表名
      chartName:{
        chartLT:"", //左上 LeftTop
        chartLB:"",
        chartRT:"",
        chartRB:"",
      },
      //背景颜色
      bkColor:'#070b0f',
      map:'',
      nowWeekDay:'周一',//周级别趋势中展示周几的平均人流指数
      nowWeekIndex:0,
      weekList:['周一','周二','周三','周四','周五','周六','周日'],
      chartoption:{
        chartLBO:'',
        chartRBO:'',
      },
      nowIdIndex:0,//当前展示的区域id
      
    };
  },
  mounted() {
    this.$nextTick(function () {
      //读取每个区域每个时刻的人流指数数据
      var that = this;
      this.readIndexData();
      if(this.timer){
        clearInterval(this.timer);
      }else{
        	this.timer = setInterval(function(){
            that.nowWeekIndex = that.nowWeekIndex+1;
             if(that.nowWeekIndex >6){
               that.nowWeekIndex = 0;
             }

          that.nowIdIndex = that.nowIdIndex+1;
          //console.log(that.nowIdIndex)
          if(that.nowIdIndex>that.idList.length){
            that.nowIdIndex =0;
          }
          },3000)
      }
    });
  },
  watch:{
    nowWeekIndex(newVal,oldVal){
      this.changeWeekChart();
    },

    nowIdIndex(newVal,oldVal){
      this.changeDayInfo();
    }
  },
  methods: {
    //读取数据
    async readIndexData() {
      const that = this;
      //获取各区域的id对应的名称，类型，中心点等信息
      const { data: res1 } = await this.$http.get("LBS/baiduHy/BJarea_data/info");
      that.area_idName_data = res1.data;
      that.idToNameMap = new Map();
      that.idList = that.area_idName_data.idList;

      for(let item of that.area_idName_data.idList){
        that.idToNameMap.set(item,that.area_idName_data[item].name);
      }
     // console.log(that.idToNameMap)

      //获取北京市各区域人流数据
      const { data: res } = await this.$http.get("LBS/baiduHy/BJarea_data");
      that.area_index_data = res.data;
      /*区域人流指数处理过之后的数据格式为：
      result ={
        id1:{
          day1:[24小时数据]，
          day2:[24小时数据]，
          ...
        },
        id2:{
          day1:[24小时数据]，
          day2:[24小时数据]，
          ...
        },
        id3:{
          day1:[24小时数据]，
          day2:[24小时数据]，
          ...
        },
        ...
      }
      */
     // console.log(that.area_index_data);
     
      //allDistribution()整体密度分布：在进行整体密度分布时需要将数据进行处理，处理成对应天对应时间所有区域的人流指数
      for(let day of that.area_index_data.dayList){
        //当前是哪一天，比如说0117（从0117-0215）
        for(let i=0;i<24;i++){
          let allValue = 0;
          
           for(let id of that.area_index_data.idList){
             allValue += that.area_index_data[id][day][i];
           }
           allValue = allValue/that.idList.length;

            if(!that.all_distribute_data[day]){
            that.all_distribute_data[day] = [];
          }
         
          if(allValue>that.all_max){
            that.all_max = allValue;//记录最大值
          }
          if(allValue<that.all_min){
            that.all_min = allValue;//记录最小值
          }
          that.all_distribute_data[day].push(allValue);
          }
      }
       that.allDistribution();//展示整体分布

       that.showDayInfo();//展示每个区域每天的平均人流密度

       that.showDayTrend();//展示天级别的趋势性

       that.showWeekTrend();//展示周级别的趋势性

       that.showMap();//展示地图
    },

    changeDayInfo(){
      var that = this;
      that.nowID = that.idList[that.nowIdIndex];
      that.nowName = that.idToNameMap.get(that.nowID);
      var nowIdData = that.area_index_data[that.nowID];
      that.dayData = [];
      for(let day of that.area_index_data.dayList){
        let tempData = nowIdData[day];
        let value = 0;
        for(let item of tempData){
          value += item;
        }
        value = (value/24).toFixed(2);
        that.dayData.push(value);
      }

      that.chartoption.chartRBO.series[0].data = that.dayData;
      that.chartName.chartRB.setOption(that.chartoption.chartRBO);

    },

    //总体人群分布
    allDistribution() {
      var that = this;
      this.chartName.chartRT = this.$echarts.init(document.getElementById("chartTopR"),'dark');
      var hours = that.area_index_data.dayList;//日期
      var days =[];//时间0-23共24小时
      for(let i=0;i<24;i++){
        days.push(i)
      }

      var data1 = [];

      for (var z = 0; z < hours.length; z++) {
        let day = hours[z];
        for (var i = 0; i < days.length; i++) {
          data1.push([i,z,that.all_distribute_data[day][i]]);
        }
      }
      data1 = data1.map(function (item) {
        return [item[1], item[0], item[2] || "-"];
      });

      let option = {
        dataZoom: [
          {
            id: "dataZoomY",
            type: "slider",
            yAxisIndex: [0],
            startValue: 0,
            endValue: 24,
            filterMode: "empty",
          },
        ],
        backgroundColor: that.bkColor,
        tooltip: {
          position: "top",
          formatter: function (params) {
            return (
              "时间：" +
              days[params.value[1]] +
              "<br/>" +
              "人流指数：" +
              params.data[2].toFixed(2)
            );
          },
        },
        animation: true,
        grid: {
          left: "2%",
          right: "10%",
          bottom: "8%",
          top:"8%", 
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: hours,
          axisLine: {
            lineStyle: {
              color: "#000",
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 45,
          },
          splitArea: {
            show: true,
          },
          name: "日期",
          nameTextStyle:{
             padding:[40,0,0,-20]
          }
        },
        yAxis: {
          type: "category",
          data: days,
          axisLine: {
            lineStyle: {
              color: "#000",
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 0,
          },
          splitArea: {
            show: true,
          },
          name: "时间",
        },
        visualMap: {
          min: that.all_min,
          max: that.all_max,
          orient: "horizontal",
          left: "center",
          top: "-2%",
          //text: [Math.ceil(that.all_max), Math.ceil(that.all_min)], // 文本，默认为数值文本
          calculable: true,//是否显示标签
          color: ["red", "yellow", "green"],
        },
        series: [
          {
            type: "heatmap",
            data: data1,
          },
        ],
      };

       that.chartName.chartRT.setOption(option);
       window.addEventListener("resize",()=>{that.chartName.chartRT.resize()})
    },

    //区域每天的平均人流密度展示
    showDayInfo(){
      var that = this;
      this.chartName.chartRB = this.$echarts.init(document.getElementById("chartBottomR"),'dark');
      //数据处理
      var xData = that.area_index_data.dayList;
      var data1 =[]; 
      var nowIdData = that.area_index_data['1'];
      that.nowID = 1;
      that.nowName = that.idToNameMap.get( that.nowID);

      for(let day of xData){
        let tempData = nowIdData[day];
        let value = 0;
        for(let item of tempData){
          value += item;
        }
        value = (value/24).toFixed(2);
        data1.push(value);
      }

      that.dayData = data1;
      
      that.chartoption.chartRBO= {
          backgroundColor: that.bkColor,

          tooltip: {
              trigger: "axis",
              axisPointer: {
                  type: "shadow",
                  textStyle: {
                      color: "#fff"
                  }

              },
          },
          grid: {
              borderWidth: 0,
              bottom: "15%",
              top:"25%", 
              right:"2%", 
              textStyle: {
                  color: "#fff"
              }
          },
          legend: {
              x: '46%',
              top: '11%',
              textStyle: {
                  color: '#90979c',
              },
              data: ['平均人流指数']
          },


          calculable: true,
          xAxis: [{
              type: "category",
              axisLine: {
                  lineStyle: {
                      color: "rgba(204,187,225,0.5)",
                  }
              },
              splitLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                interval: 0,
                rotate: 45,
             },
              data: xData,
          }],

          yAxis: [{
              type: "value",
              splitLine: {
                  show: false
              },
              axisLine: {
                  lineStyle: {
                      color: "rgba(204,187,225,0.5)",
                  }
              },

          }],
          series: [ {
              name: "平均人流指数",
              type: "line",
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                  color: "#c257F6",
              },
              data:  that.dayData
          }, ]
      }
       that.chartName.chartRB.setOption(that.chartoption.chartRBO);

       window.addEventListener("resize",()=>{that.chartName.chartRB.resize()});

      //   window.addEventListener("resize", () => {
      //   if(that.chartName.chartRL){
      //     that.chartName.chartRL.resize();
      //     that.chartName.chartRB.resize();
      //   }
        
			// });
    },

    //展示天级别的周期性  展示一个区域一周的人流趋势，横坐标为一天24小时，纵坐标为人流指数，展示一周7天的曲线值
    showDayTrend(){
      var that = this;
      //x轴的数据
      var xData = [];
      for(let i=0;i<24;i++){
        xData.push(i);
      }

      this.chartName.chartLT = this.$echarts.init(document.getElementById("chartTopL"),'dark');

      let option = {
          backgroundColor: that.bkColor,
          color: ['#FF0000', '#FF7F00', '#FFFF00','#00FF00','#00FFFF','#0000FF','#8B00FF'],
          tooltip: {
              trigger: 'axis',
              show: true,
          },
          legend: {
              show: true,
              icon: 'circle',
              top: 5,
              textStyle: {
                  fontSize: 12,
                  color: '#c8c8c8'
              },
          },
          grid: {
              left: '5%',
              right: '0%',
              top: '18%',
              bottom: '8%',
              containLabel: true
          },
          xAxis: {
              axisLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                  interval: 4,
              },
              data: xData
          },
          yAxis: {
              axisLine: {
                  show: false,
              },
              axisTick: {
                  show: false
              },
          },
          series: []
      };

        //那就从1.17开始截取7天，剩余不够 7天的是几天就展示几天
      var nowData = that.area_index_data['1'];//以第一个区域开始展示，后面的根据区域来循环显示
      var maxDay = 7;//最多展示7天一周的数据
     
      var dayList = that.area_index_data.dayList;//从这个列表中起始开始每次截取7天
      var countNum=0;
      for(let day of dayList){
        if(countNum<7){
            let tempObj = {
              name:day,
              type: 'line',
              smooth: false,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle:{
                normal:{
                  lineStyle:{
                    width:1,
                    type:'dotted'
                  }
                }
              },
              data: nowData[day]
          }
          option.series.push(tempObj);
        }
        countNum++;
      }

      that.chartName.chartLT.setOption(option);

       window.addEventListener("resize",()=>{that.chartName.chartLT.resize()});
    },

    showWeekTrend(){
      var that = this;
      //x轴的数据--一天24小时，间隔一小时
      var xData = [];
      for(let i=0;i<24;i++){
        xData.push(i);
      }

      //展示的话暂时按照所有区域的平均人流指数进行展示
      console.log(that.all_distribute_data);//按日期24小时分布的所有区域的平均人流指数
      console.log(that.area_index_data.dayList);//日期列表

      that.dayDis = {
        "周一":[],
        "周二":[],
        "周三":[],
        "周四":[],
        "周五":[],
        "周六":[],
        "周日":[]
      }
      //将日期按照周几来进行数据处理
      for(let day of that.area_index_data.dayList){
        let dayResult = that.getWeek(day);
        //展示0117-0215共4周的人流趋势
        if( that.dayDis[dayResult].length<4){
            that.dayDis[dayResult].push(day)
        }
      }
      

      this.chartName.chartLB = this.$echarts.init(document.getElementById("chartBottomL"),'dark');

      this.chartoption.chartLBO = {
          backgroundColor: that.bkColor,
          color: ['#FF0000', '#FF7F00', '#FFFF00','#00FF00','#00FFFF','#0000FF','#8B00FF'],
          tooltip: {
              trigger: 'axis',
              show: true,
          },
          legend: {
              show: true,
              icon: 'circle',
              top: 5,
              textStyle: {
                  fontSize: 12,
                  color: '#c8c8c8'
              },
          },
          grid: {
              left: '5%',
              right: '0%',
              top: '18%',
              bottom: '8%',
              containLabel: true
          },
          xAxis: {
              axisLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                  interval: 4,
              },
              data: xData
          },
          yAxis: {
              axisLine: {
                  show: false,
              },
              axisTick: {
                  show: false
              },
          },
          series: []
      };

    //展示每周周一的数据
      var tempWeekDate = that.dayDis[that.nowWeekDay]

      //展示4周的趋势
      for(let i=0;i<4;i++){
        let tempObj = {
              name:`week${i}`,
              type: 'line',
              smooth: false,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle:{
                normal:{
                  lineStyle:{
                    width:1,
                    type:'dotted'
                  }
                }
              },
              data: that.all_distribute_data[tempWeekDate[i]]
          }
          this.chartoption.chartLBO.series.push(tempObj);
      }

      that.chartName.chartLB.setOption(this.chartoption.chartLBO);

       window.addEventListener("resize",()=>{that.chartName.chartLB.resize()});
      
    },

//改变列表显示，循环显示,周级别趋势即第一周到第四周的人流趋势
    changeWeekChart(){
      var that = this;
      this.nowWeekDay = this.weekList[this.nowWeekIndex];
      this.chartoption.chartLBO.series=[];

      var tempWeekDate = that.dayDis[that.nowWeekDay]

      //展示4周的趋势
      for(let i=0;i<4;i++){
        let tempObj = {
              name:`week${i}`,
              type: 'line',
              smooth: false,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle:{
                normal:{
                  lineStyle:{
                    width:1,
                    type:'dotted'
                  }
                }
              },
              data: that.all_distribute_data[tempWeekDate[i]]
          }
          this.chartoption.chartLBO.series.push(tempObj);
      }

      that.chartName.chartLB.setOption(this.chartoption.chartLBO);

    },

    async showMap(){
      var that = this;
      var opts = {
              subdistrict: 0,
              extensions: 'all',
              level: 'city'
          };
    //利用行政区查询获取边界构建mask路径
    //也可以直接通过经纬度构建mask路径
    var district = new AMap.DistrictSearch(opts);
    district.search('北京市', function(status, result) {
        var bounds = result.districtList[0].boundaries;
        var mask = []
        for(var i =0;i<bounds.length;i+=1){
            mask.push([bounds[i]])
        }
        that.map = new AMap.Map('map', {
            mask:mask,
            center:[116.472804,39.995725],
            disableSocket:true,
            viewMode:'3D',
            showLabel:true,
            labelzIndex:130,
            pitch:40,
            zoom:8.5,
            mapStyle: 'amap://styles/grey',
            skyColor: '#070b0f',
        });

        //添加高度面
        var object3Dlayer = new AMap.Object3DLayer({zIndex:1});
        that.map.add(object3Dlayer)
        var height = 50000;
        var color = '#0088ffcc';//rgba
        var wall = new AMap.Object3D.Wall({
            path:bounds,
            height:height,
            color:color
        });
        wall.transparent = true
        wall.backOrFront = 'both';
        object3Dlayer.add(wall)
        //添加描边
        for(var i =0;i<bounds.length;i+=1){
            new AMap.Polyline({
                path:bounds[i],
                strokeColor:'#99ffff',
                strokeWeight:4,
                map:that.map
            })
        }

 //地图添加图标 -- 每个区域的信息表中有对应的中心点坐标
     //模拟添加一个图标
    let overlayGroup = []//叠加层图层组
    let itemT = {
      'areaName':'北坞公园',
      'index':123,
      'lng':116.2565841674804700,
      'lat':39.9869117736816400
    }
    let overlay = that.createOverlay(itemT)

    // 以 icon URL 的形式创建一个途经点
    var viaMarker = new AMap.Marker({
        position: new AMap.LngLat(116.38,39.92),
        // 将一张图片的地址设置为 icon
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png',
        // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-13, -30)
    });

    // 创建一个 Icon
    var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3)
    });

    // 将 icon 传入 marker
    var startMarker = new AMap.Marker({
        position: new AMap.LngLat(116.35,39.89),
        icon: startIcon,
        offset: new AMap.Pixel(-13, -30)
    });

    // 创建一个 icon
    var endIcon = new AMap.Icon({
        size: new AMap.Size(25, 34),
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        imageSize: new AMap.Size(135, 40),
        imageOffset: new AMap.Pixel(-95, -3)
    });

    // 将 icon 传入 marker
    var endMarker = new AMap.Marker({
        position: new AMap.LngLat(116.45,39.93),
        icon: endIcon,
        offset: new AMap.Pixel(-13, -30)
    });

    // 将 markers 添加到地图
    that.map.add([startMarker, endMarker]);
  

    
     overlayGroup.push(overlay)

    // console.log(that.area_idName_data)
      // for(let id of that.area_idName_data.idList){

      // }

     // that.map.add(overlayGroup)

    });

    },

    //添加叠加层
    createOverlay(property){
    //   let content = `
    //     <div class="overlayContainer" style="box-sizing: border-box;
    // display:flex;
    // flex-direction: column;
    // box-orient:horizontal;">
    //       <div class="rectangle" style="width: rem(118);
    //             height: rem(73);
    //             background-image: url(../../UI/总览-UI设计稿_slices/overlay_back.png) no-repeat;
    //             background-size: 100% 100%;
    //             position: relative; z-index:888;">
    //         <span class="name" style="position: absolute;left: 50%;transform: translateX(-50%);color: #1890ff;">${property.areaName}</span>
    //         <span class="number" style="position: absolute;left: 50%;transform: translateX(-50%);color: #fff;">${property.index}</span>
    //       </div>
    //       <div class="footer" style="background-image: url('../../UI/总览-UI设计稿_slices/overlay_icon.png') no-repeat;
    //   background-size: 100% 100%;
    //   width: rem(26);
    //   height: rem(35);
    //   position: relative;
    //   left: 50%;
    //   transform: translateX(-50%);z-index:99999;"></div>
    //     </div>
    //   `


        var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(100, 100),
        // 图标的取图地址
        image: '../../UI/总览-UI设计稿_slices/overlay_icon.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 140),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(0, 3)
    });


        let pointMarker = new AMap.Marker({
        anchor: 'bottom-center',
        position: new AMap.LngLat(property.lng, property.lat),
        offset: new AMap.Pixel(0, 0),
        extData: property,
        icon:startIcon,
        imageSize: new AMap.Size(135, 40),
        label:{content:'北坞公园',
              direction:'top',
              offset:new AMap.Pixel(0,20)
              }
      })
      return pointMarker
    },

    //根据日期判断今天周几
    getWeek(dateString){
      var year = '2020';
      var month = dateString.slice(0,2);
      var day = dateString.slice(2);

     var  date = new Date(year, parseInt(month - 1), day);
      return "周" + "日一二三四五六".charAt(date.getDay());
    }

  },
};
</script>
<style>
/* #centerContent,
.gao-map{
  width: 100%;
  height: 100%;
  background: #070b0f !important
}

#centerContent,
.gao-map,
.overlayContainer{
box-sizing: border-box;
    display:flex;
    flex-direction: column;
    box-orient:horizontal;
}

#centerContent,
.gao-map,
.overlayContainer,
.rectangle{
      width: 200px;
      height: 200px;
      background: url('../../UI/总览-UI设计稿_slices/overlay_back.png') no-repeat;
      background-size: 100% 100%;
      position: relative;
}

#centerContent,
.gao-map,
.overlayContainer,
.rectangle,
span
{
      position: absolute;
        left: 50%;
        transform: translateX(-50%);
}

#centerContent,
.gao-map,
.overlayContainer,
.footer{
       background: url('../../UI/总览-UI设计稿_slices/overlay_icon.png') no-repeat;
      background-size: 100% 100%;
      width: 150px;
      height: 150px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
} */

</style>

<style scoped>
@import "../../static/hik/index.css";
/* 三栏布局样式设置 */
@import "../../static/hik/layout3.css";

#map {
  height: 100% !important;
  position: relative;
}
#showMsg {
  z-index: 2;
  position: absolute;
  left: 50%;
  bottom: 0.052083333333333rem;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 98%;
  height: 20%;
  border: 1px solid #000b38;
}

#showMsg .normal {
  margin-right: 0.078125rem;
  background: url("../../UI/总览-UI设计稿_slices/GIS地图_聚合图标背景.png")
    no-repeat;
  background-size: 100% 100%;
  padding: 0.078125rem 0.130208333333333rem;
  border-top-left-radius: 0.026041666666667rem;
  border-bottom-right-radius: 0.026041666666667rem;
  cursor: pointer;
  width: 20%;
  height: 70%;
  position: absolute;
}

#showMsg .normal:nth-child(1) {
  left: 3% !important;
}

#showMsg .normal:nth-child(2) {
  left: 27% !important;
}
#showMsg .normal:nth-child(3) {
  left: 52% !important;
}
#showMsg .normal:nth-child(4) {
  left: 78% !important;
}

.msgTitle {
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 2rem;
  padding-top: 0.5rem;
}

.msgContent {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

/* 右边分3栏 */
.rightPart {
  position: relative;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-flow: column;
  height: 70%;
  padding-right: 0.104166666666667rem;
}
.rightBottom {
  height: 30% !important;
}

.leftPart{
  height: 50% !important;
}

.rightPart h2 {
  position: relative;
  height: 0.260416666666667rem;
  font-size: 0.125rem;
  color: #1890ff;
}

.rightPart h2 b {
  margin-left: 2rem;
  font-size: 1.525rem;
  color: #1890ff;
}

.rightPart h2 img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 7.786458333333333rem;
  top: 0.95rem;
}
.rightPart .chartBox {
  height: 95%;
  width: 95%;
  margin-top: 2rem;
  margin-right: 1rem;
  background-color:#070b0f;
  /* border-top: 1px dashed #444; */
}
.chartBottomR {
  position: absolute;
  bottom: 0;
  right: 1.2rem;
  width: 3rem;
  height: 5.5rem;
}


.rightContent{
  width: 30% !important;
}

.centerContent{
  width: 45% !important;
  left:25% !important;
}
.tipNum{
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  top: 1.852083333333333rem;
  left: 13.804166666666667rem;
}

.tipNum p {
    font-size: 0.8625rem;
    font-weight: 700;
    color: #1890ff;
    margin-left: .052083333333333rem;
}

.tipNum p span{
  font-weight: 700;
  color: #1890ff;
  padding-right: 1rem;
}

.tipNum p b{
  color: #f7a43f;
}

.leftContent{
  left: 0.6rem !important;
}

/* 设置高低地图背景色 */
#centerContent,
.gao-map{
  background: #070b0f !important
}

.topNum{
    position: absolute;
    top: 0;
    left: .3125rem;
    right: .3125rem;
    height: 20%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 3;
}

.topNum p{
  position: relative;
    color: #00bfbf;
    /* font-size: .291666666666667rem; */
    font-weight: 700;
    /* border-right: 1px dashed #666; */
    padding-right: .15625rem;
}
.topNum p span{
    display: block;
    /* font-size: .083333333333333rem; */
    padding: .026041666666667rem 0;
    text-align: right;
    color: #fff;
}

.topNum ul{
   -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content:space-evenly;
    margin-left: .15625rem;
}
.topNum ul li{
    text-align: center;
    border-right: 1px dashed #666;
    padding-right: 3.15625rem;
}

.topNum ul li p{
    color: #ffe040;
    font-size: 1.725rem; 
    font-weight: 700;
    margin-top: .052083333333333rem;
}
.topNum ul li h3{
  font-size: 16px !important;
    color: #00BCD4 !important;;
}
    

.topNum ul li p b{
    /* font-size: .083333333333333rem; */
    font-weight: 400;
}
</style>
