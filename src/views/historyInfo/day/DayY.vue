<template>
  <div class="month">
    <el-tabs type="border-card" style="width: 100%;algin:center;">
      <el-tab-pane :label="items.name" v-for="(items,index) in list" :key="index">
        {{items.name}}
        <div style="display: flex;position: relative;">
          <div :id="items.name" :style="{width: '1000px',height: '500px'}"></div>
          <!-- 标准区设置，只有管理员能看见，设置了以后该曲线标准会成为标准区的参考样式，今日消息中会有两条线 -->
          <div v-if="test()" class="standard">
            <span class="tip">是否设置为标准区参数?</span>
            <el-button type="success" @click="confirm">确认</el-button>
          </div>
        </div>
        <!-- 数据分析 -->
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          border
          highlight-current-row
          hegihet="120px"
        >
          <el-table-column prop="max" label="最高" width="120" align="center"></el-table-column>
          <el-table-column prop="min" label="最低" width="120" align="center"></el-table-column>
          <el-table-column prop="median" label="中位数" width="120" align="center"></el-table-column>
          <el-table-column prop="mode" label="众数" width="120" align="center"></el-table-column>
          <el-table-column prop="variance" label="方差" width="120" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "空气温度"
        },
        {
          name: "空气湿度"
        },
        {
          name: "氧气浓度"
        },
        {
          name: "烟雾浓度"
        },
        {
          name: "二氧化碳浓度"
        },
        {
          name: "土壤温度"
        },
        {
          name: "土壤湿度"
        },
        {
          name: "土壤盐分"
        },
        {
          name: "土壤电导率"
        },
        {
          name: "水温"
        },
        {
          name: "浑浊度"
        }
      ],
      tableData: [
        {
          max: "25",
          min: "23",
          median: "56",
          mode: "25",
          variance: "2.0"
        }
      ]
    };
  },
  mounted() {
    this.drawLine();
    this.drawLine2();
    this.drawLine3();
    this.drawLine4();
    this.drawLine5();
    this.drawLine6();
    this.drawLine7();
    this.drawLine8();
    this.drawLine9();
    this.drawLine10();
    this.drawLineH();
  },
  methods: {
    // 验证用户身份
    test() {
      if (window.localStorage.getItem("identity") != "员工") {
        let result = true;
        return result;
      } else {
        let result = false;
        return result;
      }
    },
    // 提交标准区信息
    confirm() {
      this.$confirm("此操作将设置标准区, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "设置成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消设置"
          });
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 空气温度
    drawLine() {
      var myChart = this.$echarts.init(document.getElementById("空气温度"));
      myChart.setOption({
        title: {
          text: "24个小时内气温变化"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["最高气温", "最低气温"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "最高气温",
            type: "line",
            data: [
              11,
              11,
              15,
              13,
              12,
              13,
              10,
              32,
              16,
              18,
              19,
              29,
              5,
              16,
              12,
              24,
              11,
              15,
              10,
              8,
              16,
              13,
              11,
              9
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "最低气温",
            type: "line",
            data: [
              1,
              -2,
              2,
              5,
              3,
              2,
              0,
              5,
              2,
              6,
              -1,
              -2,
              2,
              3,
              4,
              -2,
              -4,
              3,
              5,
              0,
              -3,
              -2,
              1,
              2
            ],
            markPoint: {
              data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    // 空气湿度
    drawLine2() {
      var myChart = this.$echarts.init(document.getElementById("空气湿度"));
      myChart.setOption({
        title: {
          text: "24个小时内空气湿度变化"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["最高气湿", "最低气湿"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} %RH"
            }
          }
        ],
        series: [
          {
            name: "最高气湿",
            type: "line",
            data: [
              11,
              11,
              15,
              13,
              12,
              13,
              10,
              32,
              16,
              18,
              19,
              29,
              16,
              12,
              18,
              14,
              22,
              19,
              23,
              15,
              21,
              26,
              22,
              19
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "最低气湿",
            type: "line",
            data: [
              1,
              -2,
              2,
              5,
              3,
              2,
              0,
              5,
              2,
              6,
              -1,
              -2,
              3,
              4,
              5,
              -2,
              0,
              3,
              4,
              6,
              -1,
              0,
              2,
              5
            ],
            markPoint: {
              data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    // 氧气浓度
    drawLine3() {
      var myCharts = this.$echarts.init(document.getElementById("氧气浓度"));
      myCharts.setOption({
        xAxis: {
          scale: true
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            type: "effectScatter",
            symbolSize: 20,
            data: []
          },
          {
            type: "scatter",
            data: [
              [1, 51.6],
              [2, 59.0],
              [3, 49.2],
              [4, 63.0],
              [5, 53.6],
              [6, 59.0],
              [7, 47.6],
              [8, 69.8],
              [9, 66.8],
              [10, 75.2],
              [11, 55.2],
              [12, 54.2],
              [13, 62.5],
              [14, 42.0],
              [15, 50.0],
              [16, 49.8],
              [17, 49.2],
              [18, 73.2],
              [19, 68.2],
              [20, 61.4],
              [21, 76.8],
              [22, 71.8],
              [23, 55.5],
              [24, 48.6]
            ]
          }
        ]
      });
    },
    // 烟雾浓度
    drawLine4() {
     var myChart = this.$echarts.init(document.getElementById("烟雾浓度"));
      myChart.setOption({
        title: {
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          left: "left",
          data: ["烟雾浓度"]
        },
        xAxis: {
          type: "category",
          name: "x",
          splitLine: { show: false },
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24"
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} ppm"
            }
          }
        ],
        series: [
          {
            name: "烟雾浓度",
            type: "line",
            data: [
              1000,
              3000,
              2999,
              2777,
              2181,
              2247,
              1741,
              2223,
              6669,
              2250,
              3210,
              4200,
              3600,
              1900,
              3300,
              2500,
              2470,
              2610,
              3200,
              2597,
              2600,
              1968,
              1540,
              2900
            ]
          }
        ]
      });
    },
    // 二氧化碳浓度
    drawLine5() {
      var myChart = this.$echarts.init(document.getElementById("二氧化碳浓度"));
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      myChart.setOption({
        color: colors,
        title: {
          text: "两年内二氧化碳浓度分布"
        },
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["2015 二氧化碳浓度", "2016 二氧化碳浓度"]
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "二氧化碳浓度  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                }
              }
            },
            data: [
              "2016-1",
              "2016-2",
              "2016-3",
              "2016-4",
              "2016-5",
              "2016-6",
              "2016-7",
              "2016-8",
              "2016-9",
              "2016-10",
              "2016-11",
              "2016-12"
            ]
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "二氧化碳浓度  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                }
              }
            },
            data: [
              "2015-1",
              "2015-2",
              "2015-3",
              "2015-4",
              "2015-5",
              "2015-6",
              "2015-7",
              "2015-8",
              "2015-9",
              "2015-10",
              "2015-11",
              "2015-12"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} ppm"
            }
          }
        ],
        series: [
          {
            name: "2015 二氧化碳浓度",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "2016 二氧化碳浓度",
            type: "line",
            smooth: true,
            data: [
              3.9,
              5.9,
              11.1,
              18.7,
              48.3,
              69.2,
              231.6,
              46.6,
              55.4,
              18.4,
              10.3,
              0.7
            ]
          }
        ]
      });
    },
    // 土壤温度
    drawLine6() {
       var myChart = this.$echarts.init(document.getElementById("土壤温度"));
      myChart.setOption({
        title: {
          text: "24个小时内土壤温度变化"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["土壤温度"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "土壤温度",
            type: "line",
            data: [
              11,
              11,
              15,
              13,
              12,
              13,
              10,
              32,
              16,
              18,
              19,
              29,
              16,
              12,
              18,
              14,
              22,
              19,
              23,
              15,
              21,
              26,
              22,
              19
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    // 土壤湿度
    drawLine7() {
      var myChart = this.$echarts.init(document.getElementById("土壤湿度"));
      myChart.setOption({
        title: {
          text: "24个小时内土壤湿度变化"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} %RH"
            }
          }
        ],
        series: [
          {
            name: "最高气湿",
            type: "line",
            data: [
              11,
              11,
              15,
              13,
              12,
              13,
              10,
              32,
              16,
              18,
              19,
              29,
              16,
              12,
              18,
              14,
              22,
              19,
              23,
              15,
              21,
              26,
              22,
              19
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    // 土壤盐分
    drawLine8() {
      var myChart = this.$echarts.init(document.getElementById("土壤盐分"));
      myChart.setOption({
        title: {
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24"
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 110],
            center: ["25%", "50%"],
            roseType: "radius",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { value: 10, name: "1" },
              { value: 5, name: "2" },
              { value: 15, name: "3" },
              { value: 25, name: "4" },
              { value: 20, name: "5" },
              { value: 35, name: "6" },
              { value: 30, name: "7" },
              { value: 40, name: "8" },
              { value: 25, name: "9" },
              { value: 24, name: "10" },
              { value: 4, name: "11" },
              { value: 14, name: "12" },
              { value: 40, name: "13" },
              { value: 4, name: "14" },
              { value: 25, name: "15" },
              { value: 28, name: "16" },
              { value: 38, name: "17" },
              { value: 28, name: "18" },
              { value: 24, name: "19" },
              { value: 14, name: "20" },
              { value: 24, name: "21" },
              { value: 34, name: "22" },
              { value: 9, name: "23" },
              { value: 18, name: "24" }
            ]
          },
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["75%", "50%"],
            roseType: "area",
            data: [
              { value: 10, name: "1" },
              { value: 5, name: "2" },
              { value: 15, name: "3" },
              { value: 25, name: "4" },
              { value: 20, name: "5" },
              { value: 35, name: "6" },
              { value: 30, name: "7" },
              { value: 40, name: "8" },
              { value: 25, name: "9" },
              { value: 24, name: "10" },
              { value: 4, name: "11" },
              { value: 14, name: "12" },
              { value: 40, name: "13" },
              { value: 4, name: "14" },
              { value: 25, name: "15" },
              { value: 28, name: "16" },
              { value: 38, name: "17" },
              { value: 28, name: "18" },
              { value: 24, name: "19" },
              { value: 14, name: "20" },
              { value: 24, name: "21" },
              { value: 34, name: "22" },
              { value: 9, name: "23" },
              { value: 18, name: "24" }
            ]
          }
        ]
      });
    },
    // 土壤电导率
    drawLine9() {
        var myChart = this.$echarts.init(document.getElementById("土壤电导率"));
      myChart.setOption({
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["土壤电导率"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24"
          ]
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} cm/us"
            }
          }
        ],
        series: [
          {
            name: "土壤电导率",
            type: "line",
            stack: "总量",
            data: [
              120,
              132,
              101,
              134,
              90,
              230,
              210,
              120,
              50,
              60,
              142,
              156,
              210,
              230,
              186,
              250,
              360,
              480,
              250,
              30,
              40,
              102,
              105,
              180
            ]
          }
        ]
      });
    },
    // 水温
    drawLine10() {
      var myChart = this.$echarts.init(document.getElementById("水温"));
      myChart.setOption({
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["水温"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} °"
            }
          }
        ],
        series: [
          {
            name: "水温",
            type: "line",
            stack: "总量",
            data: [
              28,
              39,
              9,
              19,
              12,
              13,
              13,
              52,
              9,
              36,
              54,
              38,
              59,
              56,
              15,
              14,
              18,
              26,
              11,
              39,
              14,
              28,
              23,
              6
            ]
          }
        ]
      });
    },
    // 浑浊度
    drawLineH() {
      var myChart = this.$echarts.init(document.getElementById("浑浊度"));
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} ntv"
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [
              2100,
              2252,
              2200,
              2334,
              2390,
              2330,
              2220,
              2260,
              2360,
              2850,
              2960,
              3000,
              1545,
              2630,
              1540,
              1630,
              1423,
              1724,
              1593,
              2456,
              2893,
              2145,
              2600,
              2300
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.standard {
  float: right;
  margin-top: 400px;
  width: 300px;
  height: 100px;
  border-radius: 4px;
  box-sizing: border-box;
  padding-top: 25px;
  box-shadow: 2px 2px 14px #06c;
}
/* 提示设置为标准区 */
.tip {
  font-size: 16px;
  font-weight: 700;
}
.el-table {
  margin-left: 250px;
  font-size: 18px;
  color: #3a2a2a;
  text-align: center;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>