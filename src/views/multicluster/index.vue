<template>
  <div>
    <div>
      <h3 v-if="showPage == 0">选择数据</h3>
       <h3 v-if="showPage == 1">数据概览</h3>
        <h3 v-if="showPage == 2">选择特征</h3>
         <h3 v-if="showPage == 3">结果展示</h3>
      <el-divider></el-divider>
    </div>

    <el-main class="stepMain">
      <div id="step" v-show="showStep">
        <el-steps :active="active" align-center>
          <el-step title="选择数据"></el-step>
          <el-step title="数据概览"></el-step>
          <el-step title="多粒度人群聚类"></el-step>
        </el-steps>
      </div>
      <div class="stepcontain" v-show="showStep">
        <datachoose
          :value.sync="active"
          :active="active"
          v-on:getTableName="getTableName"
          v-if="showPage == 0"
        ></datachoose>
        <data-view
          v-if="showPage == 1"
          :active="active"
          :value.sync="active"
          :chooseTable="chooseTable"
          v-on:getpeopleOptions="getpeopleOptions"
          v-on:getmedicalOptions="getmedicalOptions"
          v-on:getbehaviorOptions="getbehaviorOptions"
        ></data-view>
        <multicluster
          v-if="showPage == 2"
          :active="active"
          :value.sync="active"
          :chooseTable="chooseTable"
          :behaviorOptions="behaviorOptions"
          :peopleOptions="peopleOptions"
         :medicalOptions="medicalOptions"
         v-on:submitColumn="submitColumn"
        ></multicluster>
      </div>
      <outcome v-if="showPage == 3" :chooseTable="chooseTable" :chooseColumns="chooseColumns"></outcome>
    </el-main>
  </div>
</template>


<script>
import { postRequest } from "@/utils/api";
import datachoose from "@/components/dataChoose/index.vue";
import DataView from "@/components/dataView/dataView.vue";
import multicluster from "@/views/multicluster/multicluster.vue";
import outcome from "@/views/multicluster/outcome.vue";
export default {
  components: {
    DataView,
    multicluster,
    datachoose,
    outcome,
  },
  data() {
    return {
      active: 0,
      showPage: 0,
      showStep: true,
      chooseTable: "",
      peopleOptions: [],
      medicalOptions: [],
      behaviorOptions: [],
      chooseColumns:[]
    };
  },

  methods: {
    getTableName(chooseTable) {
      this.chooseTable = chooseTable;

    },
    getpeopleOptions(peopleOptions) {
      this.peopleOptions = peopleOptions;
     
    },
    getmedicalOptions(medicalOptions) {
      this.medicalOptions = medicalOptions;
 
    },
    getbehaviorOptions(behaviorOptions) {
      this.behaviorOptions = behaviorOptions;
    },
    submitColumn(columns){
    
      for(let i in columns){

      this.chooseColumns.push(columns[i].label)
      }
   
    }
  },
  created() {},
  watch: {
    active: {
      handler(newValue, oldValue) {
        this.showPage = newValue;
        if (newValue == 3) {
          this.showStep = false;
        }
      },
    },
  },
};
</script>


<style scoped>
.stepMain {
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>