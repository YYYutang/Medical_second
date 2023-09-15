<template>
  <div>
    <el-main class="main">
      <div class="form" style="margin-top: 40px">
        <el-form :inline="true" :model="formInline" label-width="180px">
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
  props: ["active", "list", "chooseTable"],
  data() {
    return {
      people: ["人群1", "人群2", "人群3"],
      formInline: { count: "", illRate: "" },

      dataShow: [],
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
        this.$emit("getFormInline",this.formInline);
        this.$emit("update:value", tempActive);
      });
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
}
.cubeContain {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
}
.cube {
  border: 1px solid #ccc;
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
.button {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 40px;
}
</style>