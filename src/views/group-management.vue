<template>
  <div id="group-management">
    <div class="filter-container">
      <el-input
        v-model="searchData"
        placeholder="请输入群组名称"
        style="width: 13.2%"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      /><el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { searchData: "" };
  },
  methods: {
    handleFilter() {
      console.log("7777");
    },
  },
};
</script>

<style lang="scss" scoped>
#group-management {
  padding: 1.2rem 3rem;
  .filter-container {
    button {
      margin-left: 2rem;
    }
  }
}
</style>