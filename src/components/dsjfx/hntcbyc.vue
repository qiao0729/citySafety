<template>
  <div class="container-fluid container-bg office-efficiency-index" id="hntcbfx">
    <div class="row office-header">
      <div class="col-sm-12 col-md-12 pd title-info">混凝土成本分析</div>
      <div class="col-sm-7 col-md-7 pd analysis-filter">
        <a class="a-access" @click="backHome">
          <button class="button type1">返回首页</button>
        </a>
      </div>
    </div>
    <div class="row office-header-content">
      <!-- top 01 C30标准产品混凝土成本  -->
      <div class="col-sm-6 col-md-6 pd">
        <div class="col-info">
          <div class="title">{{title.top1}}</div>
          <div class="content base-info" id="hntcb"></div>
        </div>
      </div>
      <!-- top 02 C30标准产品混凝土成本-->
      <div class="col-sm-6 col-md-6 pd">
        <div class="col-info">
          <div class="title">{{title.top2}}</div>
          <div class="content base-info" id="tqhntcb"></div>
        </div>
      </div>
      <!-- bottom 01 C30标准产品混凝土成本  -->
      <div class="col-sm-6 col-md-6 pd">
        <div class="col-info">
          <div class="title">{{title.bottom1}}</div>
          <div class="content staff-info" id="yclcgjj"></div>
        </div>
      </div>
      <!-- bottom 02 C30标准产品混凝土成本 -->
      <div class="col-sm-6 col-md-6 pd">
        <div class="col-info">
          <div class="title">{{title.bottom2}}</div>
          <div class="content staff-info" id="yclyl"></div>
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
        top1: "C30标准产品混凝土成本",
        top2: "同期C30标准产品混凝土成本",
        bottom1: "原材料采购均价",
        bottom2: "C30标准产品各原材料用量"
      },
      chartName: {
        chartTop1: "",
        chartTop2: "",
        chartBottom1: "",
        chartBottom2: ""
      },
      station: [],
	  yclName:[],
      yclcgjj: [],
	  top1Data:[],
	  top2Data:[],
    };
  },
 async created() {
     await this.getMenuList();
	 this.top1();
	 this.top2();
	 this.bottom1();
	 this.bottom2();
	 window.addEventListener("resize", () => {
	   this.chartName.chartTop1.resize();
	   this.chartName.chartTop2.resize();
	   this.chartName.chartBottom1.resize();
	   this.chartName.chartBottom2.resize();
	 });
  },
  // mounted() {
  //   this.$nextTick(function() {
  //     this.top1();
  //     this.top2();
  //     this.bottom1();
  //     this.bottom2();
  //     window.addEventListener("resize", () => {
  //       this.chartName.chartTop1.resize();
  //       this.chartName.chartTop2.resize();
  //       this.chartName.chartBottom1.resize();
  //       this.chartName.chartBottom2.resize();
  //     });
  //   });
  // },
  methods: {
    backHome() {
      this.$router.push("/home");
    },
	//获取数据列表
	async getMenuList(){
		//接口1  --C30标准产品混凝土成本
		 const { data: res } = await this.$http.get("hntcbyc_p1");
		 //console.log(res)
		 if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
		 this.top1Data = res.data.price;
		 this.station = res.data.station;
		 
		 //接口2获取数据 -- 同期C30标准产品混凝土成本
		 const { data: res2 } = await this.$http.get("hntcbyc_p2");
		 if (res2.meta.status !== 200) return this.$message.error(res2.meta.msg);
		 this.top2Data = res2.data.price;
		 
		 //接口3  --近3个月各原材料采购均价
		 const { data: res3 } = await this.$http.get("hntcbyc_p3");
		 if (res3.meta.status !== 200) return this.$message.error(res3.meta.msg);
		  this.yclcgjj = res3.data.yclqk;
		  this.yclName = res3.data.yclName;
		 
	},
    top1() {
		//console.log(this.data );
      this.chartName.chartTop1 = this.$echarts.init(
        document.getElementById("hntcb")
      );
      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          textStyle: {
            color: "#000" //字体颜色
          },
          data: ["原材料成本(元/方)"]
        },
        xAxis: [
          {
            type: "category",
            name: "站点",
            data: this.station,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单价",
            nameTextStyle: {
              padding: [0, 25, 0, 0]
            }
          }
        ],
        series: [
          {
            name: "原材料成本(元/方)",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.top1Data
          }
        ]
      };
      this.chartName.chartTop1.setOption(option);
    },
    top2() {
      this.chartName.chartTop2 = this.$echarts.init(
        document.getElementById("tqhntcb")
      );
      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          textStyle: {
            color: "#000" //字体颜色
          },
          data: ["本月C30标准产品混凝土成本", "去年同期C30标准产品混凝土成本"]
        },
        xAxis: [
          {
            type: "category",
            name: "站点",
            data: this.station,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单价",
            nameTextStyle: {
              padding: [0, 25, 0, 0]
            }
          }
        ],
        series: [
          {
            name: "本月C30标准产品混凝土成本",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.top1Data
          },
          {
            name: "去年同期C30标准产品混凝土成本",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#67e0e3"
            },
            data: this.top2Data
          }
        ]
      };
      this.chartName.chartTop2.setOption(option);
    },
    bottom1() {
      this.chartName.chartBottom1 = this.$echarts.init(
        document.getElementById("yclcgjj")
      );
      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          textStyle: {
            color: "#000" //字体颜色
          },
          data: this.yclName
        },
        xAxis: [
          {
            type: "category",
            name: "站点",
            data: this.station,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单价",
            nameTextStyle: {
              padding: [0, 25, 0, 0]
            }
          }
        ],
        series: [
          {
            name: "水泥",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.yclcgjj[0]
          },
          {
            name: "掺合料",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.yclcgjj[1]
          },
          {
            name: "外加剂",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.yclcgjj[2]
          },
          {
            name: "砂子",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.yclcgjj[3]
          },
          {
            name: "石头",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.yclcgjj[4]
          }
        ]
      };
      this.chartName.chartBottom1.setOption(option);
    },
    bottom2() {
      this.chartName.chartBottom2 = this.$echarts.init(
        document.getElementById("yclyl")
      );
      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          textStyle: {
            color: "#000" //字体颜色
          },
          data: this.yclName
        },
        xAxis: [
          {
            type: "category",
            name: "站点",
            data: this.station,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单价",
            nameTextStyle: {
              padding: [0, 25, 0, 0]
            }
          }
        ],
        series: [
          {
            name: "水泥",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.yclcgjj[0]
          },
          {
            name: "掺合料",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.yclcgjj[1]
          },
          {
            name: "外加剂",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.yclcgjj[2]
          },
          {
            name: "砂子",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.yclcgjj[3]
          },
          {
            name: "石头",
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#37a2da"
            },
            data: this.yclcgjj[4]
          }
        ]
      };
      this.chartName.chartBottom2.setOption(option);
    }
  }
};
</script>

<style scoped>
#hntcbfx {
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
.title {
  color: black !important;
}
@import "../../assets/css/jygc/wzcgbb.css";
</style>