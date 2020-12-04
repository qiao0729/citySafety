<template>
  <div id="health">
    <meta charset="UTF-8" />
    <title>公共卫生安全</title>
    <!--顶部-->
    <div class="header">
      <div class="left nav left-box">
        <el-dropdown hide-on-click>
          <div class="menu_title">
            <i class="el-icon-s-unfold"></i>
            <span class="el-dropdown-link"
              >公共安全<i class="el-icon-arrow-down el-icon--right"></i
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
    <!-- 中间部分 -->
    <div class="mgs-handle">
      <el-row v-model="baiduQx_query">
        <el-col :span="1" class="msg-col"></el-col>
        <el-col :span="3" class="msg-col" @click.native="moveIn()"
          >迁入来源地</el-col
        >
        <el-col :span="1" class="msg-col"></el-col>
        <el-col :span="3" class="msg-col" @click.native="moveOut()"
          >迁出目的地</el-col
        >
        <el-col :span="1" class="msg-col"></el-col>
        <el-col :span="10" class="msg-col">城内出行强度</el-col>
        <el-col :span="3" class="msg-col">
          <div class="input_mgs">
            <el-select
              v-model="value"
              placeholder="请选择日期"
              @change="selectTrigger"
            >
              <el-option
                v-for="item in cdinOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 右侧列表区域 -->
    <div class="mgs-list">
      <div id="mgs-list-in">迁入成都来源地</div>
      <div id="mgs-list-out">成都迁出目的地</div>
      <div class="mgs-list-box">
        <table>
          <thead>
            <tr>
              <th style="width: 80px"></th>
              <el-radio-group v-model="radio" @change="handleChange">
                <th>
                  <el-radio label="1" @change.native="cityRank()"
                    >城市级别</el-radio
                  >
                </th>
                <th>
                  <el-radio label="2" @change.native="provinceRank()"
                    >省份级别</el-radio
                  >
                </th>
              </el-radio-group>
              <!-- <th style="width: 110px;text-align: left;" @click="handleChange1" > <input type="radio" name="1"  checked> <label for="1">城市级别</label></th>
                            <th style="width: 200px;text-align: center; " @click="handleChange1"><input type="radio" name="1"> <label for="1">省份级别</label></th> -->
            </tr>
            <tr>
              <th style="width: 80px"></th>
              <th
                style="
                  width: 80px;
                  text-align: left;
                  font-size: 18px;
                  color: #999;
                "
              >
                名称
              </th>
              <th
                style="
                  width: 100px;
                  text-align: left;
                  font-size: 18px;
                  color: #999;
                "
              >
                比例(%)
              </th>
            </tr>
          </thead>
          <!-- 城市级别区域数据 -->

          <tbody :data="cdInData" v-show="isShow">
            <tr v-for="(item, index) in cdInData" :key="index">
              <td style="width: 80px; height: 30px">
                <span v-text="index + 1" class="list-rank-icon"></span>
              </td>
              <td style="width: 80px; text-align: center; height: 30px">
                <div>
                  <span class="mgs-date-city">{{ item.city_name }}</span>
                  <span class="mgs-date-province">{{
                    item.province_name
                  }}</span>
                </div>
              </td>
              <td
                style="
                  width: 100px;
                  text-align: left;
                  height: 30px;
                  color: #999;
                "
              >
                {{ item.value }}
              </td>
            </tr>
          </tbody>

          <!-- 省份级别的数据  -->
          <tbody :data="cdInData" v-show="!isShow">
            <tr v-for="(item, index) in cdInData" :key="index">
              <td style="width: 80px; height: 30px">
                <span v-text="index + 1" class="list-rank-icon"></span>
              </td>
              <td
                style="width: 80px; text-align: left; height: 30px; color: #999"
              >
                {{ item.province_name }}
              </td>
              <td
                style="
                  width: 100px;
                  text-align: left;
                  height: 30px;
                  color: #999;
                "
              >
                {{ item.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--内容部分-->
    <!-- 准备dom放echarts图表 -->
    <div class="con left" id="map_qx"></div>
  </div>
</template>

<script>
import "../../assets/js/urbanPublicSafety/jquery-1.10.2.js";
import "../../assets/js/urbanPublicSafety/echarts-4.2.1.min.js";
import "../../assets/js/urbanPublicSafety/base.js";
import "../../assets/js/urbanPublicSafety/static.js";
import "../../assets/js/urbanPublicSafety/china.js";
import dropMenu from '../publicComponents/dropMenu'
import titleRight from '../publicComponents/titleRight'
import timeRecord from '../publicComponents/timeRecord'
export default {
		components: {
      dropMenu,
      titleRight,
      timeRecord
    },
  data() {
    return {
      //用于存储对应地名对应的经纬度
      coordMap: "",
      cdInData: [],
      chinaGeoCoordMap: {},
      chinaDatas: [],
      targetCity: "成都市",
      targetCoord: [104.06, 30.67],
      num: 0,
      radio: "1",
      isShow: true,
      cdinOptions: [
        {
          value: "20200315",
          label: "2020-03-15",
        },
        {
          value: "20200314",
          label: "2020-03-14",
        },
        {
          value: "20200313",
          label: "2020-03-13",
        },
        {
          value: "20200312",
          label: "2020-03-12",
        },
        {
          value: "20200311",
          label: "2020-03-11",
        },
        {
          value: "20200310",
          label: "2020-03-10",
        },
        {
          value: "20200309",
          label: "2020-03-09",
        },
        {
          value: "20200308",
          label: "2020-03-08",
        },
        {
          value: "20200307",
          label: "2020-03-07",
        },
        {
          value: "20200306",
          label: "2020-03-06",
        },
        {
          value: "20200305",
          label: "2020-03-05",
        },
        {
          value: "20200304",
          label: "2020-03-04",
        },
        {
          value: "20200303",
          label: "2020-03-03",
        },
        {
          value: "20200302",
          label: "2020-03-02",
        },
        {
          value: "20200301",
          label: "2020-03-01",
        },
        {
          value: "20200229",
          label: "2020-02-29",
        },
        {
          value: "20200228",
          label: "2020-02-28",
        },
        {
          value: "20200227",
          label: "2020-02-27",
        },
        {
          value: "20200226",
          label: "2020-02-26",
        },
        {
          value: "20200225",
          label: "2020-02-25",
        },
        {
          value: "20200224",
          label: "2020-02-24",
        },
        {
          value: "20200223",
          label: "2020-02-23",
        },
        {
          value: "20200222",
          label: "2020-02-22",
        },
        {
          value: "20200221",
          label: "2020-02-21",
        },
        {
          value: "20200220",
          label: "2020-02-20",
        },
        {
          value: "20200219",
          label: "2020-02-19",
        },
        {
          value: "20200218",
          label: "2020-02-18",
        },
        {
          value: "20200217",
          label: "2020-02-17",
        },
        {
          value: "20200216",
          label: "2020-02-16",
        },
        {
          value: "20200215",
          label: "2020-02-15",
        },
        {
          value: "20200214",
          label: "2020-02-14",
        },
        {
          value: "20200213",
          label: "2020-02-13",
        },
        {
          value: "20200212",
          label: "2020-02-12",
        },
        {
          value: "20200211",
          label: "2020-02-11",
        },
        {
          value: "20200210",
          label: "2020-02-10",
        },
        {
          value: "20200209",
          label: "2020-02-09",
        },
        {
          value: "20200208",
          label: "2020-02-08",
        },
        {
          value: "20200207",
          label: "2020-02-07",
        },
        {
          value: "20200206",
          label: "2020-02-06",
        },
        {
          value: "20200205",
          label: "2020-02-05",
        },
        {
          value: "20200204",
          label: "2020-02-04",
        },
        {
          value: "20200203",
          label: "2020-02-03",
        },
        {
          value: "20200202",
          label: "2020-02-02",
        },
        {
          value: "20200201",
          label: "2020-02-01",
        },
        {
          value: "20200131",
          label: "2020-01-31",
        },
        {
          value: "20200130",
          label: "2020-01-30",
        },
        {
          value: "20200129",
          label: "2020-01-29",
        },
        {
          value: "20200128",
          label: "2020-01-28",
        },
        {
          value: "20200127",
          label: "2020-01-27",
        },
        {
          value: "20200126",
          label: "2020-01-26",
        },
        {
          value: "20200125",
          label: "2020-01-25",
        },
        {
          value: "20200124",
          label: "2020-01-24",
        },
        {
          value: "20200123",
          label: "2020-01-23",
        },
        {
          value: "20200122",
          label: "2020-01-22",
        },
        {
          value: "20200121",
          label: "2020-01-21",
        },
        {
          value: "20200120",
          label: "2020-01-20",
        },
        {
          value: "20200119",
          label: "2020-01-19",
        },
        {
          value: "20200118",
          label: "2020-01-18",
        },
        {
          value: "20200117",
          label: "2020-01-17",
        },
        {
          value: "20200116",
          label: "2020-01-16",
        },
        {
          value: "20200115",
          label: "2020-01-15",
        },
        {
          value: "20200114",
          label: "2020-01-14",
        },
        {
          value: "20200113",
          label: "2020-01-13",
        },
        {
          value: "20200112",
          label: "2020-01-12",
        },
        {
          value: "20200111",
          label: "2020-01-11",
        },
      ],
      value: "",
      baiduQx_query: {
        date: "20200111", //日期
        type: "move_in", //类型：是迁入还是迁出
        rank: "city", //等级：是城市级别还是省级别
      },

      // 时间选择器
      //value1: '',
      //     pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   },
      //   shortcuts: [{
      //     text: '今天',
      //     onClick(picker) {
      //       picker.$emit('pick', new Date());
      //     }
      //   }, {
      //     text: '昨天',
      //     onClick(picker) {
      //       const date = new Date();
      //       date.setTime(date.getTime() - 3600 * 1000 * 24);
      //       picker.$emit('pick', date);
      //     }
      //   }, {
      //     text: '一周前',
      //     onClick(picker) {
      //       const date = new Date();
      //       date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      //       picker.$emit('pick', date);
      //     }
      //   }]
      // }
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.baiduQx(); //百度迁徙模拟加载
    })
  },
 
  watch: {
    chinaDatas(newValue, oldValue) {
      if (newValue.length == this.cdInData.length && newValue.length > 0) {
        this.showData();
      }
    },
  },

  //利用watcher来监听数据
  methods: {
    //城市级别和省份级别的切换
    handleChange(val) {
      let that = this;
      that.isShow = val === "1" ? true : false;
    },
    handleChange1() {
      this.num = this.num ? 0 : 1;
    },
    //切换单选框
    tabChange: function (e) {
      let tabid = e.target.dataset.id;
      this.tab = tabid;
    },
    //城市级别
    cityRank() {
      this.baiduQx_query.rank = "city";
      this.baiduQx();
    },

    // 省份级别
    provinceRank() {
      this.baiduQx_query.rank = "province";
      this.baiduQx();
    },

    //迁入来源地
    moveIn() {
      document.getElementById("mgs-list-in").style.display = "block";
      document.getElementById("mgs-list-out").style.display = "none";
      this.baiduQx_query.type = "move_in";
      this.baiduQx();
    },
    //迁出来源地
    moveOut() {
      document.getElementById("mgs-list-in").style.display = "none";
      document.getElementById("mgs-list-out").style.display = "block";
      this.baiduQx_query.type = "move_out";
      this.baiduQx();
    },
    selectTrigger(e) {
      // var dateOption = []
      // this.cdinOptions.forEach((item)=>{
      //     dateOption.push(item.label)
      // })
      //     console.log(dateOption[0])
      //     this.baiduQx_query.date = dateOption[0]
      //     debugger
      this.baiduQx_query.date = this.value;
      this.baiduQx();
      this.showData();
    },

    async getData() {
      const { data: res } = await this.$http.get("LBS/baiduHy/cdIn", {
        params: this.baiduQx_query,
      });
      console.log(res.data);
      return res.data;
    },
    //百度迁徙
    async baiduQx() {
      //连接后端接口获取数据
      this.cdInData = await this.getData();
      console.log(this.cdInData);
      var that = this;

      //chinaGeoCoordMap用于装各城市的坐标数据；
      // chinaDatas装城市的名字数据；
      // convertData这个方法控制箭头流向；
      //series里设置被攻击点（中心点）；
      // option中设置一些整体效果，tooltip中负责悬浮框内容和格式的设置;

      //根据获取的数据构造chinaGeoCoordMap 和 chinaDatas  注意：chinaDatas中的value需为获取后端value除以100
      for (let item of this.cdInData) {
        var myGeo = new BMap.Geocoder(); //注：该处要加上市才能正确的解析
        myGeo.getPoint(item.province_name + item.city_name, function (point) {
          if (point) {
            var coord = [];
            coord.push(point.lng);
            coord.push(point.lat);
            that.chinaGeoCoordMap[item.city_name] = coord;
            var temp = {
              name: item.city_name,
              value: (item.value / 10).toFixed(2),
            };
            var tempArr = [];
            tempArr.push(temp);
            that.chinaDatas.push(tempArr);
          }
        });
      }
    },
    //根据地址描述获得坐标,百度地图描述获得坐标 百度地图API提供Geocoder类进行地址解析 可以通过Geocoder.getPoint()方法将一段地址描述转换成一个坐标 这一段和上面重复 本质上都是获取坐标
    // getCoord(name){
    // 	var that = this;
    //     var myGeo = new BMap.Geocoder();//创建地址解析器实例
    // // 将地址解析结果显示在地图上,并调整地图视野
    // 	myGeo.getPoint(name, async function(point){
    // 		var coord = [point.lng,point.lat];
    // 		that.coordMap.set(name,coord);
    // 		//return point;
    // 	});
    // },
    showData() {
      var that = this;
      //往chinaGeoCoordMap里push进目标结点的坐标
      that.chinaGeoCoordMap[that.targetCity] = that.targetCoord;
      var myChart = this.$echarts.init(document.getElementById("map_qx")); //使用china.js地图初始化方式
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = that.chinaGeoCoordMap[dataItem[0].name];
          var toCoord = that.targetCoord;
          if (fromCoord && toCoord) {
            res.push([
              {
                coord: fromCoord,
                value: dataItem[0].value,
                name: dataItem[0].name,
              },
              {
                coord: toCoord,
              },
            ]);
          }
        }
        return res;
      };
      var series = [];
      [[that.targetCity, that.chinaDatas]].forEach(function (item, i) {
        series.push(
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 5, //图标大小
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: 0.3, //尾迹线条曲直度
              },
            },
            data: convertData(item[1]),
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 4, //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: function (params) {
                  //圆环显示文字
                  return params.data.name;
                },
                fontSize: 13,
              },
              emphasis: {
                show: true,
              },
            },
            symbol: "circle",
            symbolSize: function (val) {
              return 5 + val[2] * 5; //圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
                color: "#f00",
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[0].name,
                value: that.chinaGeoCoordMap[dataItem[0].name].concat([
                  dataItem[0].value,
                ]),
              };
            }),
          },
          //被攻击点
          {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4,
            },
            label: {
              normal: {
                show: true,
                position: "right",
                //offset:[5, 0],
                color: "#0f0",
                formatter: "{b}",
                textStyle: {
                  color: "#0f0",
                },
              },
              emphasis: {
                show: true,
                color: "#f60",
              },
            },
            symbol: "pin",
            symbolSize: 50,
            data: [
              {
                name: item[0],
                value: that.chinaGeoCoordMap[item[0]].concat([10]),
              },
            ],
          }
        );
      });

      var option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(166, 200, 76, 0.82)",
          borderColor: "#FFFFCC",
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          formatter: function (params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value * 10;
            res =
              "<span style='color:#fff;'>" +
              name +
              "</span><br/>数据：" +
              value;
            return res;
          },
        },
        /*backgroundColor:"#013954",*/
        visualMap: {
          //图例值控制
          min: 0,
          max: 1,
          calculable: true,
          show: false,
          color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
          textStyle: {
            color: "#fff",
          },
        },
        geo: {
          map: "china",
          zoom: 1.2,
          label: {
            emphasis: {
              show: false,
            },
          },
          roam: true, //是否允许缩放
          itemStyle: {
            normal: {
              color: "rgba(51, 69, 89, .5)", //地图背景色
              borderColor: "#516a89", //省市边界线00fcff 516a89
              borderWidth: 1,
            },
            emphasis: {
              color: "rgba(37, 43, 61, .5)", //悬浮背景
            },
          },
        },
        series: series,
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // async baiduQx() {
    // 	//从数据库中获取流入成都的相关数据
    // 	var cdInData = await this.getData();
    // 	//返回对应地名的经纬度 因为百度迁徙的数据中只有名字没有经纬度
    // 	//console.log(cdInData);

    // 	//存储迁入迁出城市的坐标
    // 	this.coordMap = new Map();

    // 	var transCoord = await this.getCoord(cdInData[0].city_name);

    // 	//console.log(cdInData);
    // 	//cdInData为一个数组，每一个数组元素为一个对象也就是一条消息，有以下属性字段：city_name:城市名 provice_name:省名 value：所占比例
    // 	//自我感觉百度慧眼的实现是通过百度地图加echarts实现的，所以可以先展示一个百度地图，然后看看怎么在百度地图上添加echarts图表
    // 	var map = new BMap.Map("map_qx"); // 创建Map实例
    // 	map.centerAndZoom(new BMap.Point(104.06, 30.67), 11); // 初始化地图,设置中心点坐标和地图级别
    // 	//添加地图类型控件
    // 	var size1 = new BMap.Size(10, 50);
    // 	map.addControl(
    // 	  new BMap.MapTypeControl({
    // 	    offset: size1,
    // 	    mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
    // 	  })
    // 	);

    // 	map.setCurrentCity("成都"); // 设置地图显示的城市 此项是必须设置的
    // 	map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    // 	//设备地图颜色
    // 	var mapStyle = {
    // 	  style: "midnight",
    // 	};
    // 	map.setMapStyle(mapStyle);

    // 	//加载城市控件
    // 	var size = new BMap.Size(10, 50);
    // 	map.addControl(
    // 	  new BMap.CityListControl({
    // 	    anchor: BMAP_ANCHOR_TOP_LEFT,
    // 	    offset: size,
    // 	  })
    // 	);

    // },
  },
};
</script>

<style scope>
/* 引入外部css样式 */
@import "../../assets/css/urbanPublicSafety/base.css";
@import "../../assets/css/urbanPublicSafety/zTreeStyle/zTreeStyle.css";
#health {
  width: 100vw;
  height: 100vh;
  background-color: #10171e !important;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: rgb(15, 41, 103) !important;
}
.input_mgs {
  width: 180px;
}
.el-input__inner {
  -webkit-appearance: none;
  background-color: rgb(7, 11, 15) !important;
  background-image: none;
  border-radius: 4px;
  border: 1px solid rgb(41, 115, 255) !important;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 29px !important;
  line-height: 30px !important;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100% !important;
}
.el-select-dropdown__list {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
  background-color: rgb(3, 8, 41);
  border: 1px solid #2977ff !important;
  vertical-align: center;
  width: 100%;
}
.el-select-dropdown {
  position: absolute;
  z-index: 1001;
  border: 1px solid #2977ff !important;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
}
/* 时间选择器 */
.mgs-list-box tr td {
  border-bottom: 1px solid rgb(108, 113, 118);
}
.el-input__icon {
  height: 100%;
  width: 90px !important ;
  text-align: center;
  transition: all 0.3s;
  line-height: 30px !important;
}
.el-picker-panel {
  color: #606266;
  border: 1px solid rgb(41, 115, 255) !important;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: rgb(7, 11, 15) !important;
  border-radius: 4px;
  line-height: 30px !important ;
  margin: 5px 0;
  /* left:1168px !important; */
}
.el-date-table td.disabled div {
  background-color: rgb(34, 46, 60) !important;
  opacity: 1;
  cursor: not-allowed;
  color: #c0c4cc;
}
.el-picker-panel [slot="sidebar"],
.el-picker-panel__sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 66px !important;
  border-right: 1px solid rgb(41, 115, 255) !important;
  box-sizing: border-box;
  padding-top: 6px;
  background-color: rgb(7, 11, 15) !important;
  overflow: auto;
}
.el-picker-panel [slot="sidebar"] + .el-picker-panel__body,
.el-picker-panel__sidebar + .el-picker-panel__body {
  margin-left: 53px !important;
}
.el-date-picker.has-sidebar {
  width: 365px !important;
}
.el-input__inner {
  -webkit-appearance: none;
  background-color: rgb(7, 11, 15) !important;
  background-image: none;
  border-radius: 4px;
  border: 1px solid rgb(41, 115, 255) !important;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 29px !important;
  line-height: 30px !important;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 80% !important;
}
.mgs-date-city {
  color: rgba(232, 195, 55, 0.8);
  text-decoration: underline;
  cursor: pointer;
  display: block;
  text-align: left;
  overflow: hidden;
  width: 100%;
  margin: 10px 0 0;
}
.mgs-date-province {
  color: #999;
  display: inline-block;
  text-align: left;
  width: 100%;
}
.list-rank-icon {
  display: inline-block;
  background: #e75843;
  color: #fff;
  margin-right: 5px;
  border-radius: 4px;
  font-size: 12px;
  width: 20px !important;
  height: 16px !important;
  line-height: 16px;
  text-align: center;
  box-sizing: border-box;
  margin-left: 10px;
}

#mgs-list-in {
  height: 30px;
  margin: 0;
  line-height: 10px;
  text-align: center;
  color: #ddd;
  font-size: 20px;
}
#mgs-list-out {
  height: 30px;
  margin: 0;
  line-height: 10px;
  text-align: center;
  color: #ddd;
  font-size: 20px;
  display: none;
}
.mgs-list {
  padding-top: 20px;
  font-family: PingFang SC, Microsoft Yahei, monospace;
  float: right;
  top: 75px;
  overflow: auto;
  right: 0;
  width: 360px;
  background: rgb(7, 11, 15);
  bottom: 35px;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.left-box {
  width: 25%;
  height: 58px !important;
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
  margin-top: 22px;
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
.centerTitle {
  font-size: 2rem !important;
  margin: 0 auto;
}
.mgs-handle {
  width: 100%;
  height: 46px;
  background-color: rgba(7, 11, 15);
  display: left;
  color: rgb(90, 155, 255);
  z-index: 1;
}
.msg-col {
  margin-top: 10px;
}
.msg-col:active {
  color: red;
}
.header_center {
  height: 58px;
}

.con {
  height: 92vh;
  background-color: #10171e !important;
}

#map_qx {
  width: 70%;
  height: 88vh;
}
</style>