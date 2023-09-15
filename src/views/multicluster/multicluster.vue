<template>
  <div class="stepcontain2">
    <el-container>
      <el-aside style="width: 200px; margin-left: 100px">
        <el-tree
          ref="tree"
          :data="data"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check-change="handleCheckChange"
        >
        </el-tree>
      </el-aside>
      <el-main>
        <div style="height: 100px">
          <h3 style="margin-left: 150px">维度</h3>
          <div
            style="
              display: flex;
              align-content: center;
              justify-content: center;
            "
          >
            <el-tag
              v-for="(tag, index) in tags"
              :key="index"
              style="margin: 10px 10px"
              closable
              @close="handleClose(tag)"
            >
              {{ tag.label }}
            </el-tag>
          </div>
        </div>
        <div style="display: flex">
          <h3 style="margin-left: 150px">聚类个数:</h3>
          <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
            <el-form-item prop="clusterNum">
              <el-input
                v-model="ruleForm.clusterNum"
                style="width: 300px; margin-left: 30px"
                placeholder="请输入聚类个数，不超过10"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div style="height: 80px">
          <h1>指标</h1>
          <el-tag
            v-for="(tag, index) in tagsOutcome"
            :key="index"
            style="margin: 10px 10px"
            closable
            @close="handleClose(tag)"
          >
            {{ tag.label }}
          </el-tag>
        </div> -->

        <div class="button">
          <el-button @click="returnPreActive">上一步</el-button>
          <el-button @click="returnNextActive('ruleForm')">提交</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import { postRequest, getRequest } from "@/utils/api";
import { List } from "echarts";

export default {
  name: "multicluster",
  props: [
    "active",
    "chooseTable",
    "medicalOptions",
    "peopleOptions",
    "behaviorOptions",
  ],

  data() {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("要聚类的个数不能为空"));
      }

      if (value > 10) {
        return callback(new Error("要聚类的个数不能大于10"));
      } else {
        return callback();
      }
    };

    return {
      data: [
        {
          id: 1,
          label: "人口学指标",
          disabled: true,
          children: [],
        },
        {
          id: 2,
          label: "生理指标",
          disabled: true,
          children: [],
        },
        {
          id: 3,
          label: "行为学指标",
          disabled: true,
          children: [],
        },
        //{
        // id: 4,
        // label: "其他指标",
        // disabled: true,
        // children: [
        //   {
        //     id: 13,
        //     label: "治疗过",
        //   },
        //   {
        //     id: 14,
        //     label: "已患病",
        //   },
        // ],
        //},
      ],

      rules: {
        clusterNum: [{ validator: checkNum, trigger: "blur" }],
      },
      tags: [],
      tagsOutcome: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      ruleForm: {
        clusterNum: "",
      },
      peopleChildren: [],
      medicalChildren: [],
      behaviorChildren: [],
    };
  },

  methods: {
    returnPreActive() {
      let tempActive = this.active;
      tempActive = Number(tempActive) - 1;
      this.$emit("update:value", tempActive);
    },
    returnNextActive(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let tempActive = this.active;
          tempActive = Number(tempActive) + 1;
          this.$emit("update:value", tempActive);
          this.$emit("submitColumn", this.tags);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCheckChange(data, checked, indeterminate) {
      const selectedArr = [];
      const specialArr = [];
      (this.$refs.tree.getCheckedNodes() || []).forEach((item) => {
        if (item.id != 1 && item.id != 2 && item.id != 3) {
          //   specialArr.push(item);
          // } else {
          selectedArr.push(item);
        }
      });
      this.tagsOutcome = specialArr;
      this.tags = selectedArr;
    },

    // 标签删除事件
    handleClose(tag) {
      console.log("所点击的是", tag);
      console.log("总的数据是", this.tags);
      for (let i = 0; i < this.tags.length; i++) {
        const element = this.tags[i];
        if (tag.id === element.id) {
          this.tags.splice(i, 1);
          this.$refs.tree.setChecked(tag.id, null);
        }
      }
    },
    dealData() {
      const peopleLength = Object.keys(this.peopleOptions).length;
      const medicalLength = Object.keys(this.medicalOptions).length;
      const behaviorLength = Object.keys(this.behaviorOptions).length;
      var tempList = [];
      for (const item in this.peopleOptions) {
        const obj = { id: 0, label: "" };
        obj.id = 4 + Number(item);
        obj.label = this.peopleOptions[item].value;
        tempList.push(obj);
      }
      this.data[0].children = tempList;
      tempList = [];
      for (const item in this.medicalOptions) {
        const obj = { id: 0, label: "" };
        obj.id = 4 + peopleLength + Number(item);
        obj.label = this.medicalOptions[item].value;

        tempList.push(obj);
      }
      this.data[1].children = tempList;
      console.log(this.data[1].children);
      tempList = [];
      for (const item in this.behaviorOptions) {
        const obj = { id: 0, label: "" };
        obj.id = 4 + peopleLength + medicalLength + Number(item);
        obj.label = this.behaviorOptions[item].value;

        tempList.push(obj);
      }
      this.data[2].children = tempList;
    },
  },
  created() {},
  mounted() {
    this.dealData();
  },
};
</script>


<style scoped lang="less">
.stepcontain2 {
  margin-top: 40px;
  display: flex;
  align-content: center;
  justify-content: center;
}
.el-tree {
  padding-top: 15px;
  padding-left: 10px;
  .el-tree-node {
    .is-leaf + .el-checkbox .el-checkbox__inner {
      display: inline-block;
    }
    .el-checkbox .el-checkbox__inner {
      display: none;
    }
  }
}
.button {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 30px;
}
</style>