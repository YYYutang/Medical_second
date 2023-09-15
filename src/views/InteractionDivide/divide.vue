<template>
  <div>
    <el-main class="main">
      <div class="button">
        <el-button @click="add" type="primary" plain style="width: 850px"
          >添加特征</el-button
        >
      </div>

      <div class="line">
        <h1
          style="display: flex; align-content: center; justify-content: center"
        >
          关注特征
        </h1>
        <div v-for="(item, index) in list" :key="item.id" class="form">
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
                  <el-select v-model="item.name">
                    <el-option
                      v-for="item2 in chaChoose"
                      :key="item2.value"
                      :label="item2.label"
                      :value="item2.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div
                style="
                  text-align: right;
                  margin-right: 20px;
                  margin-bottom: 10px;
                "
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
      </div>
      <div
        style="display: flex; align-content: center; justify-content: center"
      >
        <div class="border">
          <el-form
            :inline="true"
            :model="formInline"
            label-width="180px"
            style="margin-top: 20px"
          >
            <el-form-item label="指标一： 人群总数">
              <el-input
                v-model="formInline.count"
                placeholder="请输入指标范围"
              ></el-input>
            </el-form-item>
            <el-form-item label="指标二： 患病率">
              <el-input
                v-model="formInline.illRate"
                placeholder="请输入患病率值(范围在0-1))"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="button">
        <el-button @click="returnPreActive">上一步</el-button>
        <el-button @click="returnNextActive">下一步</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import { postRequest, getRequest } from "@/utils/api";
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
      formInline: { count: "", illRate: "" },
      chaChoose: [],

      dataChooseNow: [],
      dataColumn: [],
      currentPage: 1,
      pageSize: 20,
      allPage: 1,

      list: [
        {
          type: "",
          name: "",
          num: "",
        },
      ],
    };
  },
  methods: {
    returnPreActive() {
      let tempActive = this.active;
      tempActive = Number(tempActive) - 1;
      this.$emit("update:value", tempActive);
    },
    returnNextActive() {
      let tempActive = this.active;
      tempActive = Number(tempActive) + 1;
      postRequest(
        "feature/peopleSplit?tableName=discretized_table&numOfSamples=" +
          this.formInline.count +
          "&sicknessRate=" +
          this.formInline.illRate +
          "&pageNum=" +
          1
      ).then((response) => {
        this.$emit("getOutcome", response);
        this.$emit("getFormInline", this.formInline);
        this.$emit("update:value", tempActive);
      });
    },
    onSubmit() {
      console.log(this.formInline);
    },
    minus(index) {
      this.list.splice(index, 1);
    },
    checkData(index) {
      console.log(index);
    },
    add() {
      this.list.push({
        type: "",
        name: "",
        num: "",

        showData: false,
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
      getRequest(
        "/feature/getInfoBySelectedFiled?page=" +
          val +
          "&tableName=" +
          this.chooseTable +
          "&params=" +
          param
      ).then((response) => {
        this.dataChooseNow = response.data;
      });
    },
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
.line {
  border: 1px solid #ccc;
  width: 1000px;
  min-height: 200px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
  padding-top: 20px;
  padding-bottom: 50px;
  margin-top: 20px;
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
  margin-top: 20px;
}

.table1 {
  width: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>'