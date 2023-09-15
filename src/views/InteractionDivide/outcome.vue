<template>
  <div>
    <el-main class="main">
      <div style="display: flex; justify-content: center; align-items: center">
        <div class="cubeContain">
          <el-tooltip
            class="item"
            v-for="(item, index) in people"
            :key="index"
            effect="light"
            placement="top"
          >
            <div slot="content" v-html="notice[index]"></div>
            <div class="cube" @click="checkData(index)">
              <span style="font">{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="table" v-if="dataShow.length != 0" v-loading="isload">
        <el-table
          :data="dataShow"
          style="width: auto; max-width: 1100px; margin-top: 20px"
          :row-style="{ height: '33px', lineHeight: '10px', padding: '0px' }"
          :header-cell-style="{
            background: '#58AAFF',
            color: '#fff',
            lineHeight: '12px',
            padding: '0px',
            height: '34px',
            textAlign: 'center',
          }"
          stripe
        >
          <el-table-column
            v-for="(item, index) in Object.keys(dataShow[0])"
            :key="index"
            :label="item"
            :prop="item"
            width="150"
          >
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            class="pagination"
            layout="prev, pager, next"
            :current-page="currentPage"
            @current-change="changePage"
            :total="allPage"
          >
          </el-pagination>
        </div>
         <el-button style="margin-top:30px" @click="exportOutcome">导出结果</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import { getRequest, downLoadPostRequest, postRequest } from "@/utils/api";
export default {
  props: ["chooseTable", "outcome", "forminline"],
  data() {
    return {
      people: ["人群1", "人群2", "人群3", "人群4", "人群5", "人群6"],
      dataShow: [],
      currentPage: 1,
      allPage: 0,
      isload: false,
      notice: [],
    };
  },
  methods: {
    checkData(index) {
      console.log(index);

      if (index == 0) {
        this.dataShow = this.outcome.data["原表结果"];
        this.allPage = this.outcome.total*10;
      }
    },
    changePage(val) {
      this.currentPage = val;
      this.isload = true;
      postRequest(
        "feature/peopleSplit?tableName=discretized_table&numOfSamples=" +
          this.forminline.count +
          "&sicknessRate=" +
          this.forminline.illRate +
          "&pageNum=" +
          val
      ).then((response) => {
        this.dataShow = response.data["原表结果"];
        this.isload = false;
      });
    },
    dealNotice() {
      console.log(this.outcome)
      const keyArr = [
        "划分出的人群总数",
        "划分出的人群患病总数",
        "划分出的人群患病率",
      ];
      let keyWordsStr = "";
      keyArr.forEach((item) => {
        keyWordsStr =
          keyWordsStr + `${item}:` + this.outcome.data[item] + "<br />";
      });
      this.notice = [...this.notice, keyWordsStr];
    },
    exportOutcome() {
      const params = {
        satisfiedSamples: this.outcome.data["id集合"],
        tableName: this.chooseTable,
      };
      downLoadPostRequest("feature/downloadData", params).then((response) => {
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "outcome.csv"); // Replace with the actual filename and extension
        document.body.appendChild(link);
        link.click();
      });
    },
  },
  mounted() {
    this.dealNotice();
  },
};
</script>

<style>
.main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
}
.cubeContain {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 每行三列 */
  grid-gap: 10px; /* 间距 */
}
.cube {
  /* border: 1px solid #ccc; */
  background-color: rgba(221, 221, 221, 0.404);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.04);
  margin-left: 20px;
  width: 200px;
  height: 100px;
  font-size: 20px;
  font-family: "微软雅黑";
  justify-content: center;
  text-align: center;
  align-items: center;
  line-height: 100px;
}
.cube:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.table {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.pagination {
  margin-top: 20px;
}
</style>