<template>
  <div id="chartArea5" style="width: 100%; height: 30rem"></div>
</template>

<script>
import * as echarts from "echarts";
import { query_new_user } from "../api/manageApi";

export default {
  props: ["dd"],
  data() {
    return {
      timeValue: null,
      myChart: null,
      option: null,
    };
  },
  methods: {
    initEchart1() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("chartArea5"));

      // 指定图表的配置项和数据
      //表一
      this.option = {
        title: {},
        tooltip: {},
        legend: {
          data: ["用户数"],
        },
        xAxis: {
          name: "日期",
          data: [],
        },
        yAxis: {
          name: "消息数（条）",
        },
        series: [
          {
            name: "用户数",
            type: "line",
            data: this.chartData,
            itemStyle: { normal: { label: { show: true } } },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(this.option);
    },
    searchData() {
      this.timeValue = this.dd;
      let beginTime = this.timeValue[0].getTime() / 1000;
      let endTime = this.timeValue[1].getTime() / 1000;
      let days =
        (this.timeValue[1].getTime() / 1000 -
          this.timeValue[0].getTime() / 1000) /
        86400;
      let dayData = [];
      for (let i = 0; i <= days; i++) {
        let dayTime = this.timeValue[0].getTime();
        let kk = new Date(dayTime + i * 86400000);

        let Y = kk.getFullYear() + "-";
        let M =
          (kk.getMonth() + 1 < 10
            ? "0" + (kk.getMonth() + 1)
            : kk.getMonth() + 1) + "-";
        let D = (kk.getDate() < 10 ? "0" + kk.getDate() : kk.getDate()) + " ";

        let strDate = Y + M + D;
        dayData.push(strDate);
      }

      let parameter = {};
      parameter.optionID = "555";
      parameter.beginTime = Number(beginTime);
      parameter.endTime = Number(endTime);
      query_new_user(parameter).then((res) => {
        //绑定图表数据
        this.myChart.setOption({
          xAxis: {
            data: dayData,
          },
          series: [
            {
              data: res.data.count,
            },
          ],
        });
      });
    },
    //初始化查询
    initData(date) {
      this.initEchart1();
      //初始化默认设置的前七天的数据
      let today = new Date(date);
      let yesterday = new Date(date - 7 * 86400);

      let days = (date - (date - 7 * 86400)) / 86400;
      let dayData = [];
      for (let i = 0; i <= days; i++) {
        let uu = new Date(date * 1000 - 7 * 86400000 + i * 86400000);
        let Y = uu.getFullYear() + "-";
        let M =
          (uu.getMonth() + 1 < 10
            ? "0" + (uu.getMonth() + 1)
            : uu.getMonth() + 1) + "-";
        let D = (uu.getDate() < 10 ? "0" + uu.getDate() : uu.getDate()) + " ";

        let strDate = Y + M + D;
        dayData.push(strDate);
      }

      let parameter = {};
      parameter.optionID = "555";
      parameter.beginTime = Number(yesterday);
      parameter.endTime = Number(today);
      query_new_user(parameter).then((res) => {
        //绑定图表数据
        this.myChart.setOption({
          xAxis: {
            data: dayData,
          },
          series: [
            {
              data: res.data.count,
            },
          ],
        });
      });
    },
  },
  mounted() {
    let timestamp = new Date().getTime() / 1000; //当前时间戳
    this.initData(timestamp);
  },
};
</script>

<style>
</style>