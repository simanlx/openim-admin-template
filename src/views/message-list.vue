<template>
  <div id="message-list">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="请输入搜索内容"
        style="width: 13.2%"
        class="filter-item search-input"
        @keyup.enter.native="handleFilter"
      /><el-input
        v-model="listQuery.sendID"
        placeholder="请输入发送者ID"
        style="width: 12.4%"
        class="filter-item sendID-input"
        @keyup.enter.native="handleFilter"
      /><el-input
        v-model="listQuery.receiveID"
        placeholder="请输入接收者ID"
        style="width: 12.4%"
        class="filter-item receiveID-input"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="timeValue"
        type="datetime"
        placeholder="选择日期"
      >
      </el-date-picker>
      <span>会话类型:</span>
      <el-select
        v-model="listQuery.sessionType"
        placeholder="请选择"
        class="filter-item"
        style="width: 130px"
      >
        <el-option value="单聊" /><el-option value="群聊" />
      </el-select>
      <span>消息类型:</span>
      <el-select
        v-model="listQuery.messageType"
        placeholder="请选择"
        class="filter-item"
        style="width: 130px"
      >
        <el-option value="文本" /><el-option value="图片" />
      </el-select>
      <el-button
        v-waves
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
        v-loading="tableDataLoading"
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="sessionTypepe" label="会话类型">
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
        <el-table-column property="content" label="内容"> </el-table-column>
        <el-table-column property="time" label="时间"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        importance: undefined,
        title: "",
        sendID: "",
        receiveID: "",
        sessionTypepe: undefined,
        messageType: undefined,
      },
      timeValue: "",
      tableData: [
        {
          sessionTypepe: "单聊",
          messageType: "文本",
          sendID: "77777",
          receiveID: "77777",
          sendNickname: "张三",
          receiveNickname: "李四",
          content: "床前明月光，疑是地上霜，哒哒哒哒哒",
          time: "2016-05-04",
        },
        {
          sessionTypepe: "单聊",
          messageType: "文本",
          sendID: "77777",
          receiveID: "77777",
          sendNickname: "张三",
          receiveNickname: "李四",
          content: "床前明月光，疑是地上霜，哒哒哒哒哒",
          time: "2016-05-04",
        },
        {
          sessionTypepe: "单聊",
          messageType: "文本",
          sendID: "77777",
          receiveID: "77777",
          sendNickname: "张三",
          receiveNickname: "李四",
          content: "床前明月光，疑是地上霜，哒哒哒哒哒",
          time: "2016-05-04",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#message-list {
  padding: 1.2rem;
  .filter-container {
    margin-bottom: 1rem;
    .el-date-editor {
      margin-left: 2rem;
    }
    .search-input,
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