<template>
  <div class="stepcontain">
    <div>
      <div class="select">
        <span>请选择数据表 </span>
        <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
          <el-form-item prop="chooseTable">
            <el-select
              v-model="ruleForm.chooseTable"
              placeholder="请选择"
              style="margin-left: 20px"
            >
              <el-option
                v-for="item in tableData"
                :key="item.tableName"
                :label="item.tableName"
                :value="item.tableName"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div class="table" v-if="dataChooseNow.length != 0">
        <el-table
          :data="dataChooseNow"
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
            v-for="(item, index) in Object.keys(dataChooseNow[0])"
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
      </div>
      <div class="button">
        <el-button @click="returnActive('ruleForm')">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest,postRequest } from "@/utils/api";
import axios from 'axios'
import storage from "@/utils/storage";
export default {
  name: "dataChoose",
  props: ["active"],
  data() {
    return {
      tableData: [],
      ruleForm: {
        chooseTable: "",
      },
      rules: {
        chooseTable: [
          { required: true, message: "请选择数据表", trigger: "change" },
        ],
      },
      dataChooseNow: [],
      dataColumn: [],
      currentPage: 1,
      allPage: 0,
    };
  },
  methods: {
    returnActive(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            let tempActive = this.active;
      tempActive = Number(tempActive) + 1;
      this.$emit("update:value", tempActive);
      this.$emit("getTableName", this.ruleForm.chooseTable);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
    },
    getAllData() {
      getRequest("/index/getAllData").then((response) => {
        if (response) {
          storage.set("allTableData", JSON.stringify(response.data));
          this.$store.commit("setAllTableData", storage.get("allTableData"));
        } else {
          console.log(response.status);
        }
        var tempList = JSON.parse(this.$store.getters.getAllTableData);
        for (let i = 0; i < tempList.length; i++) {
          const obj = {
            tableName: tempList[i].tableName,
          };
          this.tableData.push(obj);
        }
      });
    },
    changePage(val) {
      this.currentPage = val;
      getRequest(
        "/feature/getInfoByTableName?tableName=" +
          this.ruleForm.chooseTable +
          "&page=" +
          val
      ).then((response) => {
        this.dataChooseNow = response.data;
      });
    },
  },
  mounted() {
    this.getAllData();
  },
  watch: {
    "ruleForm.chooseTable": {
      handler(newVal, oldVal) {
        getRequest(
          "/feature/getInfoByTableName?tableName=" + newVal + "&page=" + 1
        ).then((response) => {
          this.allPage = response.total * 10;
          this.dataChooseNow = response.data;
        });
        
      },
    },
  },
};
</script>

<style scoped>
.button {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.stepcontain {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.table {
  width: 100%;
}
.select {
  display: flex;
  justify-content: center;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>