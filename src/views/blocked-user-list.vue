<template>
  <div id="blocked-user-list">
    <div class="headRow">
      <span>用户查询:</span>
      <el-input
        v-model="userID"
        placeholder="请输入要查询的用户ID"
        style="width: 20rem"
      />
      <el-button type="primary"> 查询 </el-button>
    </div>
    <span class="tableTitle">用户管理/用户列表</span>
    <div class="tableArea">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        fit
        highlight-current-row
        style="width: 100%"
        cur
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="nickName" label="昵称"> </el-table-column>
        <el-table-column property="userID" label="用户ID"> </el-table-column>
        <!-- <el-table-column property="userProfile" label="用户头像">
        </el-table-column> -->
        <el-table-column align="center" property="userProfile" label="用户头像">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img
                :src="scope.row.userProfile"
                style="height: 400px; width: 500px"
              />
              <img
                slot="reference"
                :src="scope.row.userProfile"
                :alt="scope.row"
                style="max-height: 50px; max-width: 130px"
              />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column property="blockTime" label="封禁时间">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isBan == true"
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >解封</el-button
            >
            <el-button
              v-else
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >封禁</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="pageSize"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userID: "",
      currentPage: 1,
      pageSize: 3,
      tableData: [
        {
          nickName: "张三",
          userID: "7777777777",
          userProfile: require("@/assets/kk.jpg"),
          blockTime: "2020-03-25 09:44",
          isBan: true,
        },
        {
          nickName: "张三",
          userID: "7777777777",
          userProfile: require("@/assets/kk.jpg"),
          blockTime: "2020-03-25 09:44",
          isBan: false,
        },
        {
          nickName: "张三",
          userID: "7777777777",
          userProfile: require("@/assets/kk.jpg"),
          blockTime: "2020-03-25 09:44",
          isBan: true,
        },
        {
          nickName: "李四",
          userID: "7777777777",
          userProfile: require("@/assets/kk.jpg"),
          blockTime: "2020-03-25 09:44",
          isBan: true,
        },
        {
          nickName: "张李四三",
          userID: "7777777777",
          userProfile: require("@/assets/kk.jpg"),
          blockTime: "2020-03-25 09:44",
          isBan: true,
        },
        {
          nickName: "李四",
          userID: "7777777777",
          userProfile: require("@/assets/kk.jpg"),
          blockTime: "2020-03-25 09:44",
          isBan: true,
        },
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
};
</script>

<style lang="scss" scoped>
#blocked-user-list {
  padding: 1.2rem 3rem;
  .headRow {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    span {
      min-width: 9.5rem;
    }
    button {
      margin-left: 2rem;
    }
  }
  .tableTitle {
    display: block;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
}
</style>