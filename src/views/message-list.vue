<template>
  <div id="message-list">
    <div class="filter-container">
      <el-input
        v-model="listQuery.content"
        placeholder="请输入搜索内容"
        style="width: 13.2%; min-width: 134px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      /><el-input
        v-model="listQuery.sendID"
        placeholder="请输入发送者ID"
        style="width: 134px"
        class="filter-item sendID-input"
        @keyup.enter.native="handleFilter"
      /><el-input
        v-model="listQuery.receiveID"
        placeholder="请输入接收者ID"
        style="width: 134px"
        class="filter-item receiveID-input"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.timeValue"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions1"
      >
      </el-date-picker>
      <span>会话类型:</span>
      <el-select
        v-model="listQuery.sessionType"
        placeholder="请选择"
        class="filter-item"
        style="width: 6%; min-width: 90px"
        clearable
      >
        <el-option label="单聊" value="1" /><el-option label="群聊" value="2" />
      </el-select>
      <span>消息类型:</span>
      <el-select
        v-model="listQuery.messageType"
        placeholder="请选择"
        class="filter-item"
        style="width: 6%; min-width: 90px"
        clearable
      >
        <el-option label="文本" value="101" /><el-option
          label="图片"
          value="102"
        />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
    </div>

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
        <el-table-column property="sessionType" label="会话类型">
        </el-table-column>
        <el-table-column property="messageType" label="消息类型">
        </el-table-column>
        <el-table-column property="sendID" label="发送者ID"> </el-table-column>
        <el-table-column property="receiveID" label="接收者ID">
        </el-table-column>
        <el-table-column property="sendNickname" label="发送者昵称">
        </el-table-column>
        <el-table-column property="receiveNickname" label="接收者昵称">
        </el-table-column>
        <el-table-column property="queryContent" label="搜索内容">
        </el-table-column>
        <el-table-column property="content" label="内容"> </el-table-column>
        <el-table-column property="time" label="时间"> </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import { query_msg_list } from "../api/manageApi";
export default {
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      listQuery: {
        content: "",
        sendID: "",
        receiveID: "",
        timeValue: "",
        sessionType: "",
        messageType: "",
      },
      currentPage: 1,
      pageSize: 10,
      tableData: [],
    };
  },
  methods: {
    //初始化查询
    async getList() {
      let parameter = {};
      parameter.operationID = await Date.now();
      query_msg_list(parameter).then((res) => {
        console.log(res);
        res.data.msg.forEach((item) => {
          let medium = {};
          if (item.SessionType == 1) {
            medium.sessionType = "单聊";
          } else if (item.SessionType == 2) {
            medium.sessionType = "群聊";
          }
          if (item.MsgType == 101) {
            medium.messageType = "文本";
          } else if (item.MsgType == 102) {
            medium.messageType = "图片";
          }

          medium.sendID = item.SendID;
          medium.sendNickname = item.SendName;
          medium.receiveID = item.RecvID;
          medium.receiveNickname = item.RecvName;
          medium.queryContent = item.QueryContent;
          medium.content = item.Content;
          let time = new Date(item.Time * 1000);
          let Y = time.getFullYear() + "-";
          let M =
            (time.getMonth() + 1 < 10
              ? "0" + (time.getMonth() + 1)
              : time.getMonth() + 1) + "-";
          let D =
            (time.getDate() < 10 ? "0" + time.getDate() : time.getDate()) + " ";
          var h =
            (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) +
            ":";
          var m =
            (time.getMinutes() < 10
              ? "0" + time.getMinutes()
              : time.getMinutes()) + ":";
          var s =
            time.getSeconds() < 10
              ? "0" + time.getSeconds()
              : time.getSeconds();

          let strDate = Y + M + D + h + m + s;
          medium.time = strDate;
          this.tableData.push(medium);
        });
      });
    },
    async handleFilter() {
      let parameter = {};
      if (this.listQuery.timeValue.length > 0) {
        var beginTime = this.listQuery.timeValue[0].getTime() / 1000;
        var endTime = this.listQuery.timeValue[1].getTime() / 1000;
        parameter.beginTime = beginTime;
        parameter.endTime = endTime;
      }
      if (this.listQuery.content.length > 0) {
        parameter.queryContent = this.listQuery.content;
      }
      if (this.listQuery.sessionType.length > 0) {
        parameter.sessionType = Number(this.listQuery.sessionType);
      }
      if (this.listQuery.messageType.length > 0) {
        parameter.msgType = Number(this.listQuery.messageType);
      }

      parameter.operationID = await Date.now();
      console.log(parameter, "参数");

      query_msg_list(parameter).then((res) => {
        console.log(res);
        if (res.data.msg != null) {
          this.tableData = [];
          res.data.msg.forEach((item) => {
            let medium = {};
            if (item.SessionType == 1) {
              medium.sessionType = "单聊";
            } else if (item.SessionType == 2) {
              medium.sessionType = "群聊";
            }
            if (item.MsgType == 101) {
              medium.messageType = "文本";
            } else if (item.MsgType == 102) {
              medium.messageType = "图片";
            }
            medium.sendID = item.SendID;
            medium.sendNickname = item.SendName;
            medium.receiveID = item.RecvID;
            medium.receiveNickname = item.RecvName;
            medium.queryContent = item.QueryContent;
            medium.content = item.Content;
            let time = new Date(item.Time * 1000);
            let Y = time.getFullYear() + "-";
            let M =
              (time.getMonth() + 1 < 10
                ? "0" + (time.getMonth() + 1)
                : time.getMonth() + 1) + "-";
            let D =
              (time.getDate() < 10 ? "0" + time.getDate() : time.getDate()) +
              " ";
            var h =
              (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) +
              ":";
            var m =
              (time.getMinutes() < 10
                ? "0" + time.getMinutes()
                : time.getMinutes()) + ":";
            var s =
              time.getSeconds() < 10
                ? "0" + time.getSeconds()
                : time.getSeconds();

            let strDate = Y + M + D + h + m + s;
            medium.time = strDate;

            this.tableData.push(medium);
          });
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
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
#message-list {
  padding: 1.2rem;
  .filter-container {
    margin-bottom: 1rem;
    padding-left: 2rem;
    .el-date-editor {
      margin-left: 2rem;
    }

    .sendID-input,
    .receiveID-input {
      margin-left: 2rem;
    }
    span {
      margin-left: 2rem;
      margin-right: 0.5rem;
    }
    button {
      margin-left: 2rem;
    }
  }
  .tableArea {
    margin-top: 3rem;
  }
}
</style>