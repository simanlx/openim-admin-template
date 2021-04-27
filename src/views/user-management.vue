<template>
  <div id="user-management">
    <div class="headRow">
      <span>Token验证:</span>
      <el-input
        v-model="Token"
        placeholder="请输入要验证的用户Token"
        style="width: 20rem"
      />
      <el-button type="primary" @click="handleFilter"> 验证 </el-button>
    </div>
    <div class="headRow">
      <span>用户信息查询:</span>
      <el-input
        v-model="userID"
        placeholder="请输入要查询的用户ID"
        style="width: 20rem"
      />
      <el-button type="primary" @click="handleFilter"> 查询 </el-button>
    </div>
    <span class="tableTitle">用户管理/用户列表</span>
    <div class="tableArea">
      <el-table
        :data="tableData"
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
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button type="text" size="small" @click="ban(scope.row)"
              >封禁</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { disable_user } from "@/api/manageApi.js";
export default {
  data() {
    return {
      Token: "",
      userID: "",
      tableData: [
        {
          nickName: "张三",
          userID: "7777777777",
          userProfile: require("@/assets/kk.jpg"),
          createTime: "2020-03-25 09:44",
        },
        {
          nickName: "张三",
          userID: "7777777777",
          userProfile: require("@/assets/kk.jpg"),
          createTime: "2020-03-25 09:44",
        },
        {
          nickName: "张三",
          userID: "7777777777",
          userProfile: require("@/assets/kk.jpg"),
          createTime: "2020-03-25 09:44",
        },
      ],
    };
  },
  methods: {
    handleFilter() {
      console.log("查询");
    },
    handleClick() {
      console.log("修改");
    },
    ban(e) {
      console.log(e);
      /* let parameter = {};
      parameter.optionID = "999";
      parameter.uid = e.UID;
      parameter.disable_second = 0;
      parameter.ex = "";
      disable_user(parameter).then(res=>{
      console.log(res)
    }) */
    },
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