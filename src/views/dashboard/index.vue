<template>
  <div class="dashboard-container">
    <el-row class="headArea" :gutter="20">
      <el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>新增用户数</span>
          </div>
          <div class="box-card-body">440.34</div></el-card
        ></el-col
      >
      <el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>新增用户数</span>
          </div>
          <div class="box-card-body">440.34</div></el-card
        ></el-col
      ><el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>新增用户数</span>
          </div>
          <div class="box-card-body">440.34</div></el-card
        ></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 1.2rem;
  .dashboard-container {
    margin: 30px;
  }
  .dashboard-text {
    font-size: 30px;
    line-height: 46px;
  }
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
