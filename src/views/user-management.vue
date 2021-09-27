<template>
  <div id="user-management">
    <div class="headRow">
      <span>Token验证:</span>
      <el-input
        v-model="Token"
        placeholder="请输入要验证的用户Token"
        style="width: 20rem"
        @keyup.enter.native="handleFilter"
      />
      <el-button type="primary" @click="handleFilter"> 验证 </el-button>
    </div>
    <div class="headRow">
      <span>用户信息查询:</span>
      <el-input
        v-model="userID"
        placeholder="请输入要查询的用户ID"
        style="width: 20rem"
        @keyup.enter.native="handleFilter"
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
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="nickName" label="昵称"> </el-table-column>
        <el-table-column property="userID" label="用户ID"> </el-table-column>

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
        <el-table-column property="createTime" label="创建时间">
        </el-table-column>
        <el-table-column property="status" label="操作" width="100">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small"
              >修改</el-button
            > -->
            <el-button
              type="text"
              size="small"
              @click="confirm(scope.row)"
              v-if="scope.row.status == 0"
              >封禁</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="confirm(scope.row)"
              v-else
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
import { disable_user, query_user } from "@/api/manageApi.js";
export default {
  data() {
    return {
      Token: "",
      userID: "",
      currentPage: 1,
      pageSize: 10,
      tableData: [],
    };
  },
  methods: {
    handleFilter() {
      console.log("查询");
    },
    handleClick() {
      console.log("修改");
    },
    confirm(e) {
      console.log(e);
      if (e.status == 0) {
        this.$confirm("确定要封禁该用户吗？", "操作确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            this.ban(e);
          })
          .catch(() => {});
      } else if (e.status == 1) {
        this.$confirm("确定要解封该用户吗？", "操作确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            this.ban(e);
          })
          .catch(() => {});
      }
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
    async searchUser() {
      let parameter = {};
      parameter.operationID = await Date.now().toString();
      parameter.uid = this.userID;
      console.log(parameter);

      query_user(parameter).then((res) => {
        console.log(res, "5555555555555555");
        if (res.data.user != null) {
          this.tableData = [];
          res.data.user.forEach((item) => {
            let medium = {};
            medium.userID = item.UID;
            medium.nickName = item.Name;
            medium.userProfile = require("@/assets/kk.jpg");
            medium.createTime =
              item.CreatedTime.slice(0, 10) +
              " " +
              item.CreatedTime.slice(11, 19);
            medium.status = item.Seal;

            this.tableData.push(medium);
          });
        } else {
          this.$message("该用户不存在");
        }
      });
    },
    async ban(e) {
      console.log(e, "操作项");
      let parameter = {};
      parameter.operationID = await Date.now().toString();
      parameter.uid = e.userID;
      if (e.status == 0) {
        parameter.disable_second = 30 * 86400; //封禁时间三十天
      } else if (e.status == 1) {
        parameter.disable_second = -3000 * 86400;
      }

      parameter.ex = "";
      disable_user(parameter).then((res) => {
        if (res.errorCode == 0) {
          this.getList();
        }
      });
    },
    async getList() {
      this.tableData = [];
      let parameter = {};
      parameter.operationID = await Date.now().toString();
      parameter.uid = "";
      console.log(parameter);
      query_user(parameter).then((res) => {
        console.log(res);
        res.data.user.forEach((item) => {
          let medium = {};
          medium.userID = item.UID;
          medium.nickName = item.Name;
          medium.userProfile = require("@/assets/kk.jpg");
          medium.createTime =
            item.CreatedTime.slice(0, 10) +
            " " +
            item.CreatedTime.slice(11, 19);
          medium.status = item.Seal;

          this.tableData.push(medium);
        });
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
#user-management {
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