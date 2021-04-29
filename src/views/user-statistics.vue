<template>
  <div id="user-statistics">
    <el-row class="headArea" :gutter="20">
      <el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>新增用户数</span>
          </div>
          <div class="box-card-body">
            {{ this.$store.state.newUsers }}
          </div></el-card
        ></el-col
      >
      <el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>活跃用户数</span>
          </div>
          <div class="box-card-body">
            {{ this.$store.state.activeUser }}
          </div></el-card
        ></el-col
      ><el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>累计用户数</span>
          </div>
          <div class="box-card-body">
            {{ this.$store.state.cumulativeUsers }}
          </div></el-card
        ></el-col
      >
    </el-row>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="新增用户数" name="first">
        <div class="selectArea">
          <el-select v-model="timeType" placeholder="请选择">
            <el-option
              v-for="item in dayOrMonth"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-text="timeType == 'day' ? '按日:' : '按月:'"></span>
          <el-date-picker
            v-if="timeType == 'day'"
            v-model="timeValue"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions1"
          >
          </el-date-picker>
          <el-date-picker
            v-else
            v-model="timeValue"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          >
          </el-date-picker>
          <el-button type="primary" @click="searchData">查询</el-button>
        </div>

        <NewUserChart :dd="timeValue" ref="NewUserChart" />
      </el-tab-pane>
      <el-tab-pane label="活跃用户数" name="second">
        <div
          id="chartArea2"
          ref="second"
          style="width: 100rem; height: 30rem"
        ></div>
      </el-tab-pane>
      <el-tab-pane label="累计用户数" name="third"
        ><div
          id="chartArea3"
          ref="third"
          style="width: 100rem; height: 30rem"
        ></div
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as echarts from "echarts";
import NewUserChart from "@/components/NewUserChart.vue";
export default {
  components: {
    NewUserChart,
  },
  data() {
    return {
      newUsers: "",
      activeUser: "",
      cumulativeUsers: "",
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      activeName: "first",
      timeType: "day",
      timeValue: "",
      timeValue2: "",
      dayOrMonth: [
        {
          value: "day",
          label: "按日",
        },
        {
          value: "month",
          label: "按月",
        },
      ],
      myChart: null,
      option: null,
    };
  },
  watch: {},
  methods: {
    initEchart2() {
      let myChart2 = echarts.init(document.getElementById("chartArea2"));
      //表2
      let option2 = {
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
      myChart2.setOption(option2);
    },
    initEchart3() {
      let myChart3 = echarts.init(document.getElementById("chartArea3"));
      //表三
      let option3 = {
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
      myChart3.setOption(option3);
    },
    //特殊查询
    searchData() {
      this.$refs.NewUserChart.searchData();
    },
    //初始化查询
  },
  mounted() {
    // this.initEchart2();
    // this.initEchart3();
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
  .el-tabs {
    margin-top: 3rem;
    .selectArea {
      margin-left: 7rem;
      margin-bottom: 2rem;
      span {
        margin-left: 2rem;
        margin-right: 1rem;
      }
      button {
        margin-left: 2rem;
      }
    }
  }
}
</style>