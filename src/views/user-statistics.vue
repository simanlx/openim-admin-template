<template>
  <div id="user-statistics">
    <el-row class="headArea" :gutter="20">
      <el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>新增用户数</span>
          </div>
          <div class="box-card-body">9999</div></el-card
        ></el-col
      >
      <el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>活跃用户数</span>
          </div>
          <div class="box-card-body">9999</div></el-card
        ></el-col
      ><el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>累计用户数</span>
          </div>
          <div class="box-card-body">9999</div></el-card
        ></el-col
      >
    </el-row>
    <div id="chartArea" style="width: 100%; height: 30rem"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  methods: {
    haha() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chartArea"));

      // 指定图表的配置项和数据
      var option = {
        title: {},
        tooltip: {},
        legend: {
          data: ["用户数"],
        },
        xAxis: {
          name: "日期",
          data: [
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
          ],
        },
        yAxis: {
          name: "消息数（条）",
        },
        series: [
          {
            name: "用户数",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.haha();
  },
};
</script>

<style lang="scss" scoped>
#user-statistics {
  padding: 1.2rem;
  .box-card-header {
    text-align: center;
  }
  .box-card-body {
    text-align: center;
    min-height: 5rem;
    line-height: 5rem;
    font-size: 30px;
  }
}
</style>