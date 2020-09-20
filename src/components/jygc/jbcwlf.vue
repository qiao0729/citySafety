<template>
  <div class="container-fluid container-bg office-efficiency-index" id="jbcwlf">
    <div class="row office-header">
      <div class="col-sm-12 col-md-12 pd title-info">搅拌车物流费</div>
      <div class="col-sm-7 col-md-7 pd analysis-filter">
        <a class="a-access" @click="backHome">
          <button class="button type1">返回首页</button>
        </a>
      </div>
    </div>
    <div class="row office-header-content">
      <!-- top 01 运输方量  -->
      <div class="col-sm-3 col-md-3 pd">
        <div class="col-info">
          <div class="title" style="color: #000000;">{{title.top1}}</div>
          <div class="content base-info" id="ysfl"></div>
        </div>
      </div>
      <!-- top 02 结算方量-->
      <div class="col-sm-3 col-md-3 pd">
        <div class="col-info">
          <div class="title" style="color: #000000;">{{title.top2}}</div>
          <div class="content base-info" id="jsfl"></div>
        </div>
      </div>
      <!-- top 03 结算金额-->
      <div class="col-sm-3 col-md-3 pd">
        <div class="col-info">
          <div class="title" style="color: #000000;">{{title.top3}}</div>
          <div class="content base-info" id="jsje"></div>
        </div>
      </div>
      <!-- top 04 单方运费成本 -->
      <div class="col-sm-3 col-md-3 pd">
        <div class="col-info">
          <div class="title" style="color: #000000;">{{title.top4}}</div>
          <div class="content base-info" id="dfyfcb"></div>
        </div>
      </div>
      <!-- bottom 01 平均车辆转载率  -->
      <div class="col-sm-3 col-md-3 pd">
        <div class="col-info">
          <div class="title" style="color: #000000;">{{title.bottom1}}</div>
          <div class="content staff-info" id="clzzl"></div>
        </div>
      </div>
      <!-- bottom 02 车辆退转料次数 -->
      <div class="col-sm-3 col-md-3 pd">
        <div class="col-info">
          <div class="title" style="color: #000000;">{{title.bottom2}}</div>
          <div class="content staff-info" id="cltzlcs"></div>
        </div>
      </div>
      <!-- bottom 03 车辆退转料率 -->
      <div class="col-sm-3 col-md-3 pd">
        <div class="col-info">
          <div class="title" style="color: #000000;">{{title.bottom3}}</div>
          <div class="content staff-info" id="cltzll"></div>
        </div>
      </div>
      <!-- bottom 04 平均车辆满载率 -->
      <div class="col-sm-3 col-md-3 pd">
        <div class="col-info">
          <div class="title" style="color: #000000;">{{title.bottom4}}</div>
          <div class="content staff-info" id="pjclmzl"></div>
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
        top1: "运输方量",
        top2: "结算方量",
        top3: "结算金额",
        top4: "单方运费成本",
        bottom1: "平均车辆转载率",
        bottom2: "车辆退转料次数",
        bottom3: "车辆退转料率",
        bottom4: "平均车辆满载率"
      },
	  //数据列表
	  dataList:{},
      chartName: {
        chartTop1: "",
        chartTop2: "",
        chartTop3: "",
        chartTop4: "",
        chartBottom1: "",
        chartBottom2: "",
        chartBottom3: "",
        chartBottom4: ""
      }
    };
  },
  async created() {
  	await this.getMenuList();
  
  	this.top1();
  	this.top2();
  	this.top3();
  	this.top4();
  	this.bottom1();
  	this.bottom2();
  	this.bottom3();
  	this.bottom4();
  	window.addEventListener("resize", () => {
  	  this.chartName.chartTop1.resize();
  	  this.chartName.chartTop2.resize();
  	  this.chartName.chartTop3.resize();
  	  this.chartName.chartTop4.resize();
  	  this.chartName.chartBottom1.resize();
  	  this.chartName.chartBottom2.resize();
  	  this.chartName.chartBottom3.resize();
  	  this.chartName.chartBottom4.resize();
  	});
  },
  methods: {
	async getMenuList(){
		const {data: res} = await this.$http.get("jjgc_jbcwlf");
		//console.log(res.data)
		this.dataList = res.data;
	},
    backHome() {
      this.$router.push("/home");
    },
    top1() {
      this.chartName.chartTop1 = this.$echarts.init(
        document.getElementById("ysfl")
      );
      let option = {
        color: ["#27408B"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "0%",
          right: "12%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            name: "站点",
            nameTextStyle: {
              padding: [20, 0, 5, 0]
            },
            data: this.dataList.station,
            axisLabel: {
              rotate: 30
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "方量"
          }
        ],
        series: [
          {
            name: "运输方量",
            type: "bar",
            barWidth: "60%",
            data: this.dataList.ysfl
          }
        ]
      };
      this.chartName.chartTop1.setOption(option);
    },
    top2() {
      this.chartName.chartTop2 = this.$echarts.init(
        document.getElementById("jsfl")
      );
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "0%",
          right: "12%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            name: "站点",
            nameTextStyle: {
              padding: [20, 0, 5, 0]
            },
            data: this.dataList.station,
            axisLabel: {
              rotate: 30
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "方量"
          }
        ],
        series: [
          {
            name: "结算方量",
            type: "bar",
            barWidth: "60%",
            data: this.dataList.jsfl
          }
        ]
      };
      this.chartName.chartTop2.setOption(option);
    },
    top3() {
      this.chartName.chartTop3 = this.$echarts.init(
        document.getElementById("jsje")
      );
      let option = {
        color: ["#FFB90F"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "2%",
          right: "12%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            name: "站点",
            nameTextStyle: {
              padding: [20, 0, 5, 0]
            },
            data: this.dataList.station,
            axisLabel: {
              rotate: 30
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "金额（万元）"
          }
        ],
        series: [
          {
            name: "结算金额",
            type: "bar",
            barWidth: "60%",
            data: this.dataList.jsje
          }
        ]
      };

      this.chartName.chartTop3.setOption(option);
    },
    top4() {
      this.chartName.chartTop4 = this.$echarts.init(
        document.getElementById("dfyfcb")
      );
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "6%",
          right: "12%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          name: "站点",
          nameTextStyle: {
            padding: [20, 0, 5, 0]
          },
          axisLabel: {
            rotate: 30
          },
          data: this.dataList.station
        },
        yAxis: {
          type: "value",
          name: "单方运费成本（元）"
        },
        series: [
          {
            name: "平均单方运费成本",
            data: this.dataList.dfyfcb,
            type: "line",
            symbol: "triangle",
            symbolSize: 20,
            lineStyle: {
              color: "green",
              width: 4,
              type: "dashed"
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: "yellow",
              color: "blue"
            }
          }
        ]
      };

      this.chartName.chartTop4.setOption(option);
    },
    bottom1() {
      this.chartName.chartBottom1 = this.$echarts.init(
        document.getElementById("clzzl"),
        "light"
      );
      let option = {
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
          data: ["平均车辆转载率", "单方成本"]
        },
        grid: {
          left: "2%",
          right: "6%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.dataList.station,
            name: "站点",
            nameTextStyle: {
              padding: [20, 0, 5, 0]
            },
            axisLabel: {
              rotate: 30
            },
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "转载率（%）",
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "单方成本（元）",
            min: 0,
            max: 200,
            interval: 40,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "平均车辆转载率",
            type: "bar",
            data: this.dataList.pjclzzl
          },
          {
            name: "单方成本",
            type: "line",
            symbol: "circle",
            symbolSize: 10,
            yAxisIndex: 1,
            data: this.dataList.dfyfcb
          }
        ]
      };
      this.chartName.chartBottom1.setOption(option);
    },
    bottom2() {
      this.chartName.chartBottom2 = this.$echarts.init(
        document.getElementById("cltzlcs")
      );
      let option = {
        color: ["#2E8B57"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "0%",
          right: "12%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            name: "站点",
            nameTextStyle: {
              padding: [20, 0, 5, 0]
            },
            data: this.dataList.station,
            axisLabel: {
              rotate: 30
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "次数"
          }
        ],
        series: [
          {
            name: "车辆退转料次数",
            type: "bar",
            barWidth: "60%",
            data: this.dataList.cltzlcs
          }
        ]
      };
      this.chartName.chartBottom2.setOption(option);
    },
    bottom3() {
      this.chartName.chartBottom3 = this.$echarts.init(
        document.getElementById("cltzll")
      );
      let option = {
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
          data: ["车辆退转料率", "单方成本"]
        },
        grid: {
          left: "2%",
          right: "6%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.dataList.station,
            name: "站点",
            nameTextStyle: {
              padding: [20, 0, 5, 0]
            },
            axisLabel: {
              rotate: 30
            },
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "转载率（%）",
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "单方成本（元）",
            min: 0,
            max: 200,
            interval: 40,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "车辆退转料率",
            type: "bar",
            data: this.dataList.cltzll
          },
          {
            name: "单方成本",
            type: "line",
            symbol: "circle",
            symbolSize: 10,
            yAxisIndex: 1,
            data: this.dataList.dfyfcb
          }
        ]
      };
      this.chartName.chartBottom3.setOption(option);
    },
    bottom4() {
      this.chartName.chartBottom4 = this.$echarts.init(
        document.getElementById("pjclmzl"),
        "light"
      );
      let option = {
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
          data: ["平均车辆满载率", "单方成本"]
        },
        grid: {
          left: "2%",
          right: "6%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.dataList.station,
            name: "站点",
            nameTextStyle: {
              padding: [20, 0, 5, 0]
            },
            axisLabel: {
              rotate: 30
            },
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "转载率（%）",
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "单方成本（元）",
            min: 0,
            max: 200,
            interval: 40,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "平均车辆满载率",
            type: "bar",
            data: this.dataList.pjclmzl
          },
          {
            name: "单方成本",
            type: "line",
            symbol: "circle",
            symbolSize: 10,
            yAxisIndex: 1,
            data: this.dataList.dfyfcb
          }
        ]
      };
      this.chartName.chartBottom4.setOption(option);
    }
  }
};
</script>

<style scoped>
#jbcwlf {
  width: 100%;
  height: 100%;
}
.office-efficiency-index .col-info {
  background-color: #ffffff !important;
  height: 43vh !important;
}

.office-efficiency-index {
  background-color: #f5f5f5 !important;
}

.analysis-filter {
  height: 4rem;
}

@import "../../assets/css/jygc/wzcgbb.css";
</style>