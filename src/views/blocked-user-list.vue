<template>
  <div id="blocked-user-list">
    <div class="headRow">
      <span>用户查询:</span>
      <el-input
        v-model="userID"
        placeholder="请输入要查询的用户ID"
        style="width: 20rem"
      />
      <el-button type="primary" @click="searchUser"> 查询 </el-button>
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
        <el-table-column property="Name" label="昵称"> </el-table-column>
        <el-table-column property="UID" label="用户ID"> </el-table-column>

        <el-table-column property="blockTime" label="封禁时间">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >解封</el-button
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
import { disable_user, query_user, query_disable_user } from "../api/manageApi";
export default {
  data() {
    return {
      userID: "",
      currentPage: 1,
      pageSize: 3,
      tableData: [],
    };
  },
  methods: {
    getList() {
      let parameter = {};
      parameter.optionID = "9999";
      query_disable_user(parameter).then((res) => {
        res.data.users.forEach((item) => {
          let medium = {};
          medium.UID = item.UID;
          medium.Name = item.Name;
          medium.blockTime =
            item.BeginDisableTime.slice(0, 10) +
            " " +
            item.BeginDisableTime.slice(11, 19) +
            "——" +
            item.EndDisableTime.slice(0, 10) +
            " " +
            item.EndDisableTime.slice(11, 19);

          this.tableData.push(medium);
        });
      });
    },
    searchUser() {
      let parameter = {};
      parameter.optionID = "999";
      parameter.userID = this.userID;
      console.log(parameter, "查询请求");
      query_user(parameter).then((res) => {
        console.log(res, "查询反馈");
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleClick(e) {
      console.log(e);
      let parameter = {};
      parameter.optionID = "999";
      parameter.uid = e.UID;
      parameter.disable_second = 0;
      parameter.ex = "";
      console.log(parameter);
      disable_user(parameter).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    this.getList();
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