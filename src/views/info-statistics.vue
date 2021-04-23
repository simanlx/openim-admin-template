<template>
  <div id="info-statistics">
    <el-row class="headArea" :gutter="20">
      <el-col :span="6"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>单聊消息数</span>
          </div>
          <div class="box-card-body">99999</div></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>群聊消息数</span>
          </div>
          <div class="box-card-body">99999</div></el-card
        ></el-col
      ><el-col :span="6"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>今日新建群组数</span>
          </div>
          <div class="box-card-body">99999</div></el-card
        ></el-col
      ><el-col :span="6"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>累计建群数</span>
          </div>
          <div class="box-card-body">99999</div></el-card
        ></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#info-statistics {
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