<template>
  <div class="content-body">
    <!-- 头部 -->
    <div class="header">
      <div class="left nav left-box">
        <el-dropdown hide-on-click>
          <div class="menu_title">
            <i class="el-icon-s-unfold"></i>
            <span class="el-dropdown-link"
              >轨迹挖掘<i class="el-icon-arrow-down el-icon--right"></i
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
        <!-- <div class="leftContent"></div> src='../../UI/car.png'-->
        <div class="centerContent" id="centerContent">
          <div id="map"></div>
          <div id="showMsg">
            <div v-for="(item, index) in showMsg" :key="index" class="normal">
              <div class="wrapper">
                <div class="msgTitle">{{ item.title }}</div>
                <div class="msgContent">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="rightContent">
          <img class="imgTopL" src="../../UI/总览-UI设计稿_slices/左上.png" />
          <img
            class="imgBottomR"
            src="../../UI/总览-UI设计稿_slices/右下.png"
          />
          <div class="mgs-list-box">
            <table>
              <thead>
                <tr>
                  <th style="width: 20px"></th>
                  <th
                    style="
                      width: 150px;
                      text-align: center;
                      font-size: 18px;
                      color: #999;
                    "
                  >
                    订单ID
                  </th>
                  <th
                    style="
                      width: 150px;
                      text-align: center;
                      font-size: 18px;
                      color: #999;
                    "
                  >
                    司机ID
                  </th>
                </tr>
              </thead>
              <!-- 城市级别区域数据 -->
              <tbody :data="orderData">
                <tr
                  v-for="(item, index) in orderData"
                  :key="index"
                  @click="showTraceChange(item.orderID, item.carID)"
                >
                  <td style="width: 20px; height: 5px">
                    <span v-text="index + 1" class="list-rank-icon"></span>
                  </td>
                  <td style="width: 150px; text-align: center; height: 50px">
                    <span class="mgs-date-city">{{ item.orderID }}</span>
                  </td>
                  <td
                    style="
                      width: 150px;
                      text-align: center;
                      height: 50px;
                      color: #999;
                    "
                  >
                    {{ item.carID }}
                  </td>
                </tr>
              </tbody>
            </table>
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
      orderData: "",
      coordinates: [], //汽车轨迹坐标
      pathSimplifierIns: "",
      //实时展示轨迹时显示起始点、当前时间、位置信息
      showMsg: [
        {
          title: "起点",
          content: "四川大学",
        },
        {
          title: "终点",
          content: "成都东站",
        },
        {
          title: "路程全长",
          content: "2020-11-1-12:00",
        },
        {
          title: "订单开始时间",
          content: "磨子桥",
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.showTrace(); //展示车辆轨迹
    });
  },
  methods: {
    showTraceChange(orderID, carID) {
      var that = this;
      this.coordinates = [];
      var chooseItem = this.$store.state.pointData[orderID];
      //debugger
      for (let item of chooseItem) {
        let temp = [];
        temp.push(item.lng);
        temp.push(item.lat);
        this.coordinates.push(temp);
      }

      //console.log(this.orderStartTime)

      that.orderStartTime = new Date(parseInt(chooseItem[0].date) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");

      that.showMsg[3].content = that.orderStartTime;
      //console.log(that.showMsg[3].content)

      AMapUI.load(["ui/misc/PathSimplifier", "lib/$"], function (
        PathSimplifier,
        $
      ) {
        if (!PathSimplifier.supportCanvas) {
          alert("当前环境不支持 Canvas！");
          return;
        }

        that.pathSimplifierIns.setData([
          {
            name: "测试",
            path: that.coordinates,
          },
        ]);

        var navg1 = that.pathSimplifierIns.createPathNavigator(0, {
          loop: true, //循环播放
          speed: 500, //巡航速度，单位千米/小时
        });

        navg1.start();

        that.getAddress(that.coordinates[0], 0);

        that.getAddress(that.coordinates[that.coordinates.length - 1], 1);

        that.getDistance(that.coordinates, 2); //计算长度
      });
    },

    showTrace() {
      var that = this;
      this.orderData = this.$store.state.orderData;
      this.$store.state.orderDateMap = new Map();

      //console.log(this.$store.state.pointData)
      var chooseItem = this.$store.state.pointData[
        this.$store.state.chooseOrderID
      ];
      //存储对应时间 -- 后期如果轨迹纠偏，以及根据时间来展示轨迹信息，就可以用这个map来记录轨迹点的位置与时间
      // if(this.$store.state.orderDateMap.get(this.pointData.orderList[i])){
      // 		//map中存在这个数组，直接push进去
      // 		this.$store.state.orderDateMap.get(this.pointData.orderList[i]).push(this.pointData[this.pointData.orderList[i]])
      // 	}else{
      // 		//先建立，再push进去
      // 		let arr = new Array();
      // 		this.$store.state.orderDateMap.set(this.pointData.orderList[i],arr);
      // 		this.$store.state.orderDateMap.get(this.pointData.orderList[i]).push(this.pointData.orderList[i])
      // 	}
      //debugger
      //测试轨迹纠偏
      var jpCoord = [];
      this.orderStartTime = new Date(parseInt(chooseItem[0].date) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " "); //第一个开始的时间
      that.showMsg[3].content = this.orderStartTime;

      jpCoord.push({
        x: chooseItem[0].lng,
        y: chooseItem[0].lat,
        sp: 10,
        ag: 20,
        tm: chooseItem[0].date,
      });

      for (let item of chooseItem) {
        let temp = [];
        temp.push(item.lng);
        temp.push(item.lat);
        this.coordinates.push(temp);
        let diff = item.date - chooseItem[0].date;

        //轨迹纠偏
        // let jpObj = {
        //   "x":
        //   "y":
        //   "sp":
        //   "ag":
        //   "tm":
        // }
      }

      this.map = new AMap.Map("map", {
        center: [104.06, 30.67],
        zoom: 13,
        mapStyle: "amap://styles/grey",
        resizeEnable: true,
        rotateEnable: true,
        viewMode: "2D",
      });

      new AMap.DistrictSearch({
        extensions: "all",
        subdistrict: 0,
      }).search("成都市", function (status, result) {
        // 外多边形坐标数组和内多边形坐标数组
        var outer = [
          new AMap.LngLat(-180, 90, true),
          new AMap.LngLat(-180, -90, true),
          new AMap.LngLat(180, -90, true),
          new AMap.LngLat(180, 90, true),
        ];
        var holes = result.districtList[0].boundaries;

        var pathArray = [outer];
        pathArray.push.apply(pathArray, holes);
        var polygon = new AMap.Polygon({
          pathL: pathArray,
          //线条颜色，使用16进制颜色代码赋值。默认值为#006600
          strokeColor: "rgb(20,164,173)",
          strokeWeight: 4,
          //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
          strokeOpacity: 0.5,
          //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
          fillColor: "rgba(0,0,0)",
          //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
          fillOpacity: 1,
        });
        polygon.setPath(pathArray);
        that.map.add(polygon);
      });

      //轨迹纠偏

      AMapUI.load(["ui/misc/PathSimplifier", "lib/$"], function (
        PathSimplifier,
        $
      ) {
        if (!PathSimplifier.supportCanvas) {
          alert("当前环境不支持 Canvas！");
          return;
        }
        that.pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          map: that.map, //所属的地图实例

          getPath: function (pathData, pathIndex) {
            return pathData.path;
          },
          // getHoverTitle: function(pathData, pathIndex, pointIndex) {

          // 	if (pointIndex >= 0) {
          // 		//point
          // 		return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
          // 	}

          // 	return pathData.name + '，点数量' + pathData.path.length;
          // },
          renderOptions: {
            pathLineStyle: {
              dirArrowStyle: true,
            },
            getPathStyle: function (pathItem, zoom) {
              var lineWidth = Math.round(2 * Math.pow(1.1, zoom - 3));

              return {
                pathLineStyle: {
                  strokeStyle: "#ff0000",
                  lineWidth: lineWidth,
                },
                pathLineSelectedStyle: {
                  lineWidth: lineWidth + 2,
                },
                pathNavigatorStyle: {
                  fillStyle: "#ff0000",
                },
              };
            },
          },
        });

        that.pathSimplifierIns.setData([
          {
            name: "测试",
            path: that.coordinates,
          },
        ]);

        var navg1 = that.pathSimplifierIns.createPathNavigator(0, {
          loop: true, //循环播放
          speed: 500, //巡航速度，单位千米/小时
        });

        navg1.start();
      });

      //先显示一个起点终点全长，暂时不知道轨迹如何根据时间来进行动（知道了轨迹怎么跟着时间来动之后，就可以实时解析地点了）

      that.getAddress(that.coordinates[0], 0); //寻找起点

      that.getAddress(that.coordinates[that.coordinates.length - 1], 1); //寻找终点

      that.getDistance(that.coordinates, 2); //计算长度
    },

    //高德地图API进行地址解析
    getAddress(lnglat, index) {
      var that = this;
      AMap.plugin("AMap.Geocoder", function () {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: "028",
        });

        geocoder.getAddress(lnglat, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // result为对应的地理位置详细信息
            //console.log(result.regeocode.formattedAddress.substr(0,6))
            let adressResult;
            if (
              result.regeocode.formattedAddress.substr(0, 6) == "四川省成都市"
            ) {
              adressResult = result.regeocode.formattedAddress.substr(6);
            } else {
              adressResult = result.regeocode.formattedAddress;
            }

            that.showMsg[index].content = adressResult;
          }
        });
      });
    },

    //计算路径的长度
    getDistance(coordinates, index) {
      var that = this;
      var arr = new Array();
      for (let item of coordinates) {
        arr.push(new AMap.LngLat(item[0], item[1]));
      }

      let distance = Math.round(AMap.GeometryUtil.distanceOfLine(arr));
      that.showMsg[index].content = distance + "米";
    },
  },
};
</script>

<style scoped>
@import "../../static/hik/index.css";
/* 三栏布局样式设置 */
@import "../../static/hik/layout3.css";

#map {
  height: 80% !important;
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
</style>
