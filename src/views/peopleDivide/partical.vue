<template>
  <div>
    <el-main class="main" v-loading="loading">
      <div class="button">
        <el-button
          @click="add"
          type="primary"
          plain
          style="width: 1100px"
          :disabled="isUse == 0 ? true : false"
          >添加特征</el-button
        >
      </div>
      <div v-for="(item, index) in list" :key="index" class="form">
        <el-form label-width="100px">
          <div class="border">
            <div style="display: flex; margin-top: 20px; margin-right: 20px">
              <el-form-item label="特征属性">
                <el-select v-model="item.type" @change="changeType">
                  <el-option
                    v-for="item1 in chaType"
                    :key="item1.value"
                    :label="item1.label"
                    :value="item1.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="特征" style="margin-left: 30px">
                <el-select
                  v-model="item.name"
                  @change="(val) => getDataRange(val, index)"
                >
                  <el-option
                    v-for="item2 in chaChoose"
                    :key="item2.value"
                    :label="item2.label"
                    :value="item2.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="特征取值范围" style="margin-left: 30px">
                {{ item.range }}
              </el-form-item>
              <el-form-item label="划分段数" style="margin-left: 30px">
                <el-input-number
                  v-model="item.num"
                  @change="(val) => handleRangeNum(val, index)"
                  :min="1"
                  :max="10"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
            </div>
            <div
              v-for="(item2, index2) in item.rangeSplit"
              :key="index2"
              style="display: flex; justify-content: center"
            >
              <el-form-item label="最小值">
                <el-input
                  v-model="item2.min"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="最大值" style="margin-left: 30px">
                <el-input
                  v-model="item2.max"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </div>
            <div
              style="text-align: right; margin-right: 20px; margin-bottom: 10px"
            >
              <el-button
                @click="minus(index)"
                type="danger"
                icon="el-icon-delete"
                plain
              ></el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div class="button">
        <el-button @click="seeData" type="primary" plain style="width: 1100px"
          >确认</el-button
        >
      </div>
      <div class="table1" v-if="dataChooseNow.length != 0">
        <br />
        <el-table
          :data="dataChooseNow"
          style="width: auto"
          border
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
            v-for="(item, index) in Object.keys(dataChooseNow[0])"
            :key="index"
            :label="item"
            :prop="item"
            width="150"
          >
          </el-table-column>
        </el-table>

        <br />
        <el-pagination
          background
          class="pagination"
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          :total="allPage"
        >
        </el-pagination>
      </div>
      <div class="button">
        <el-button @click="returnPreActive">上一步</el-button>
        <el-button @click="returnNextActive">下一步</el-button>
        <el-button @click="exportFile" type="primary" v-if="showExport">导出</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import { postRequest, getRequest } from "@/utils/api";
import axios from "axios";
export default {
  props: [
    "active",
    "chooseTable",
    "medicalOptions",
    "peopleOptions",
    "behaviorOptions",
  ],
  data() {
    return {
      chaType: [
        { value: 1, label: "人口学特征" },
        { value: 2, label: "临床特征" },
        { value: 3, label: "行为学特征" },
      ],
      loading: false,
      chaChoose: [],
      count: 1,
      count2: 1,
      dataChooseNow: [],
      dataColumn: [],
      currentPage: 1,
      pageSize: 20,
      allPage: 1,
      isUse: 1,
      showExport:false,
      list: [
        {
          type: "",
          name: "",
          num: "",
          range: "",
          rangeSplit: [{ min: "", max: "" }],
        },
      ],
    };
  },
  methods: {
    getDataRange(value, index) {
      getRequest(
        "feature/getstatisticsByFiled?fileds=" +
          value +
          "&tableName=" +
          this.chooseTable
      ).then((response) => {
        var str = response.data[0].min_value + "-" + response.data[0].max_value;

        this.list[index].range = str;
      });
    },
    minus(index) {
      this.list.splice(index, 1);
    },
    returnPreActive() {
      let tempActive = this.active;
      tempActive = Number(tempActive) - 1;
      this.$emit("update:value", tempActive);
    },
    returnNextActive() {
      let tempActive = this.active;
      tempActive = Number(tempActive) + 1;

      this.$emit("getListvalue", this.list);
      this.$emit("update:value", tempActive);
    },
    handleRangeNum(val, index) {
      if (val >= this.count2) {
        this.count2++;
        this.list[index].rangeSplit.push({ min: "", max: "" });
      } else {
        this.count2--;
        this.list[index].rangeSplit.pop();
      }
    },
    add() {
      this.count++;
      this.list.push({
        type: "",
        name: "",
        num: "",
        range: "",
        showData: false,
        rangeSplit: [{ min: "", max: "" }],
      });
    },
    changeType(value) {
      if (value == 1) {
        this.chaChoose = this.peopleOptions;
      }
      if (value == 2) {
        this.chaChoose = this.medicalOptions;
      }
      if (value == 3) {
        this.chaChoose = this.behaviorOptions;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let param = this.list.map((item) => {
        return item.name;
      });
      postRequest("feature/featureCreate", this.list).then((response) => {
        console.log(response);
      });
    },
    seeData() {
      axios.defaults.baseURL = "/py";
      this.loading = true;
      postRequest("featureCreate", this.list).then((response) => {
        console.log(response);
        this.dataChooseNow = response;
        axios.defaults.baseURL = "/api";
        this.loading = false;
        this.showExport=true;
      });
    },
    exportFile() {},
  },
};
</script>

<style scoped>
.main {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
}
.form {
  display: flex;
  align-content: center;
  justify-content: center;
}
.button {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 20px;
}
.border {
  border: 1px solid #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
  margin-top: 30px;
}

.table1 {
  width: 1200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>'