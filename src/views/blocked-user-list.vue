<template>
  <div id="blocked-user-list">
    <div class="headRow">
      <span>用户查询:</span>
      <el-input
        v-model="userID"
        placeholder="请输入要查询的用户ID"
        style="width: 20rem"
        @keyup.enter.native="searchUser"
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
            <el-button @click="confirm(scope.row)" type="text" size="small"
              >解封</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
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
    async getList() {
      this.tableData = [];
      let parameter = {};
      parameter.operationID = await Date.now();
      query_disable_user(parameter).then((res) => {
        res.data.users.forEach((item) => {
          let medium = {};
          medium.UID = item.UID;
          medium.Name = item.Name;
          medium.blockTime =
            item.BeginDisableTime.slice(0, 10) +
            " " +
            item.BeginDisableTime.slice(11, 19) +
            " —— " +
            item.EndDisableTime.slice(0, 10) +
            " " +
            item.EndDisableTime.slice(11, 19);

          this.tableData.push(medium);
        });
      });
    },
    async searchUser() {
      if (this.userID.length == 0) {
        this.getList();
        return;
      }
      let parameter = {};
      parameter.operationID = await Date.now();
      parameter.uid = this.userID;
      console.log(parameter, "查询请求");
      query_user(parameter).then((res) => {
        console.log(res);
        if (res.data.user != null) {
          this.tableData = [];
          res.data.user.forEach((item) => {
            if (item.Seal == 1) {
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
            }
          });
        } else {
          this.$message("该用户不存在");
        }
      });
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    confirm(e) {
      this.$confirm("确定要解封该用户吗？", "操作确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          console.log(e);
          let parameter = {};
          parameter.operationID = await Date.now();
          parameter.uid = e.UID;
          parameter.disable_second = 0;
          parameter.ex = "";
          console.log(parameter);
          disable_user(parameter).then((res) => {
            console.log(res);

            this.getList();
          });
        })
        .catch(() => {});
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