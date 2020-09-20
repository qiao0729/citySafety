<template>
  <div class="container-fluid container-bg office-efficiency-index" id="dp2">
    <div class="row office-header">
      <div class="col-sm-12 col-md-12 pd title-info">参加大屏2界面</div>
      <div class="col-sm-7 col-md-7 pd analysis-filter">
        <a class="a-access" @click="backHome">
          <button class="button type1">返回首页</button>
        </a>
      </div>
    </div>
    <div class="row office-header-content">
      <!-- top 01 回款总额  -->
      <div class="col-sm-6 col-md-6 pd">
        <div class="col-info">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="title">{{title.top1}}</div>
          <div class="content base-info" id="hkze"></div>
        </div>
      </div>
      <!-- top 02 支付总额 -->
      <div class="col-sm-6 col-md-6 pd">
        <div class="col-info">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="title">{{title.top2}}</div>
          <div class="content base-info" id="zfze"></div>
        </div>
      </div>
      <!-- top 03 应收、应付账款情况-->
      <div class="col-sm-4 col-md-4 pd">
        <div class="col-info">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="title">{{title.top3}}</div>
          <div class="content base-info" id="yfysfkze"></div>
        </div>
      </div>
      <!-- bottom 01 资金与毛利情况  -->
      <div class="col-sm-4 col-md-4 pd">
        <div class="col-info">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="title">{{title.bottom1}}</div>
          <div class="content staff-info" id="zjyml"></div>
        </div>
      </div>
      <!-- bottom 02 应交、已交税费情况 -->
      <div class="col-sm-4 col-md-4 pd">
        <div class="col-info">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="title">{{title.bottom2}}</div>
          <div class="content staff-info" id="yfyjsf"></div>
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
        top1: "回款总额",
        top2: "支付总额",
        top3: "应收、应付账款余额",
        bottom1: "资金、毛利情况",
        bottom2: "税费情况"
      },
      chartName: {
        chartTop1: "",
        chartTop2: "",
        chartTop3: "",
        chartBottom1: "",
        chartBottom2: ""
      },
      //后端接口获取的数据列表
      dataList: {}
    };
  },
  //请求接口获取数据
  created() {
    this.getMenuList();
  },
  // mounted() {
  //   this.$nextTick(function() {
  //     this.getMenuList();
  //     this.top1();
  //     this.top2();
  //     this.top3();
  //     this.bottom1();
  //     this.bottom2();
  //     window.addEventListener("resize", () => {
  //       this.chartName.chartTop1.resize();
  //       this.chartName.chartTop2.resize();
  //       this.chartName.chartTop3.resize();
  //       this.chartName.chartBottom1.resize();
  //       this.chartName.chartBottom2.resize();
  //     });
  //   });
  // },
  methods: {
    //获取所有的数据
    async getMenuList() {
      const { data: res } = await this.$http.get("dp2");
      //console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      //this.dataList = res.data;

      console.log(this.dataList);
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
    backHome() {
      this.$router.push("/home");
    },
    top1() {
      this.chartName.chartTop1 = this.$echarts.init(
        document.getElementById("hkze")
      );
      let option = {
        tooltip: {
          formatter: "{a} <br/>{c}元"
        },
        series: [
          {
            name: "回款总额",
            type: "gauge",
            z: 3,
            min: 0,
            max: 100000000,
            splitNumber: 10,
            radius: "100%",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                width: 20
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 20, // 属性length控制线长
              lineStyle: {
                color: "auto"
              }
            },
            splitLine: {
              length: 25,
              lineStyle: {
                color: "auto"
              }
            },
            axisLabel: {
              //backgroundColor: "auto",
              borderRadius: 2,
              color: "#eee",
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 2,
              textShadowColor: "#222"
            },
            title: {
              fontWeight: "bolder",
              fontSize: 20,
              fontStyle: "italic",
              color: "#fff",
              offsetCenter: [0, "20%"]
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
              width: 180,
              offsetCenter: [0, "75%"],
              color: "#eee",
              padding: [5, 0, 0, 0],
              rich: {}
            },
            data: [
              {
                value: this.dataList.HKZE,
                name: "回款总额（元）"
              }
            ]
          }
        ]
      };

      this.chartName.chartTop1.setOption(option);
    },
    top2() {
      this.chartName.chartTop2 = this.$echarts.init(
        document.getElementById("zfze")
      );
      let option = {
        tooltip: {
          formatter: "{a} <br/>{c}元"
        },
        series: [
          {
            name: "支付总额",
            type: "gauge",
            z: 3,
            min: 0,
            max: 100000000,
            splitNumber: 10,
            radius: "100%",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                width: 20
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                color: "auto"
              }
            },
            splitLine: {
              length: 25,
              lineStyle: {
                color: "auto"
              }
            },
            axisLabel: {
              //backgroundColor: "auto",
              borderRadius: 2,
              color: "#eee",
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 2,
              textShadowColor: "#222"
            },
            title: {
              fontWeight: "bolder",
              fontSize: 20,
              fontStyle: "italic",
              color: "#fff",
              offsetCenter: [0, "20%"]
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
              width: 180,
              offsetCenter: [0, "75%"],
              color: "#eee",
              padding: [5, 0, 0, 0],
              rich: {}
            },
            data: [
              {
                value: this.dataList.ZFZE,
                name: "支付总额（元）"
              }
            ]
          }
        ]
      };

      this.chartName.chartTop2.setOption(option);
    },
    top3() {
      this.chartName.chartTop3 = this.$echarts.init(
        document.getElementById("yfysfkze")
      );
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}（万元）"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "账款余额",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: this.dataList.YSZKYE, name: "应收账款余额" },
              { value: this.dataList.YFZKYE, name: "应付账款余额" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255)"
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255)"
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      this.chartName.chartTop3.setOption(option);
    },
    bottom1() {
      this.chartName.chartBottom1 = this.$echarts.init(
        document.getElementById("zjyml")
      );
      let option = {
        color: ["#3398DB"],
        grid: {
          left: "3%"
        },
        graphic: [
          {
            type: "text",
            top: "center",
            left: "19%",
            style: {
              text: `资金状况\n\n${this.dataList.ZJZK}元`,
              textAlign: "center",
              fill: "#fff",
              fontSize: 18
            }
          },
          {
            type: "text",
            top: "center",
            left: "65%",
            style: {
              text: `当月毛利情况\n\n${this.dataList.MLQK}元`,
              textAlign: "center",
              fill: "#fff",
              fontSize: 18
            }
          }
        ],

        series: [
          {
            type: "pie",
            center: ["30%", "50%"],
            radius: ["45%", "60%"],
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
            data: [
              {
                value: 20000000
              }
            ]
          },
          {
            type: "pie",
            center: ["75%", "50%"],
            radius: ["45%", "60%"],
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
            data: [
              {
                value: 20000000
              }
            ]
          }
        ]
      };
      this.chartName.chartBottom1.setOption(option);
    },
    bottom2() {
      this.chartName.chartBottom2 = this.$echarts.init(
        document.getElementById("yfyjsf"),
        "light"
      );
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} (元)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          textStyle: {
            color: "#fff"
          },
          data: ["应交税费", "已交税费"]
        },
        series: [
          {
            name: "税费情况",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.dataList.YJSFQK, name: "应交税费" },
              { value: this.dataList.YJSF, name: "已交税费" }
            ]
          }
        ]
      };

      this.chartName.chartBottom2.setOption(option);
    }
  }
};
</script>

<style scoped>
#dp2 {
  width: 100%;
  height: 100vh;
  background-color: #000c3b !important;
}
.office-efficiency-index .col-info {
  background-color: #000c3b !important;
  height: 43vh !important;
  border: 2px solid #032d60;
  box-shadow: inset 0 0 30px #07417a;
}
.office-header {
  background: #000c3b !important;
}

.analysis-filter {
  height: 4rem;
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
  top: 10px;
  left: 10px;
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
  top: 10px;
  right: 10px;
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
  bottom: 10px;
  left: 10px;
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
  bottom: 10px;
  right: 10px;
}

@import "../../assets/css/jygc/wzcgbb.css";
</style>>
