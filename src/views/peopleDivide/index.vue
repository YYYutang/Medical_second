<template>
  <div>
    <div>
      <h3 v-if="showPage == 0">选择数据</h3>
       <h3 v-if="showPage == 1">数据概览</h3>
        <h3 v-if="showPage == 2">特征值粒化</h3>
         <h3 v-if="showPage == 3">设置目标人群属性</h3>
               <h3 v-if="showPage == 4">结果展示</h3>
      <el-divider></el-divider>
    </div>
    <el-main class="stepMain">
      <div id="step" v-show="showStep">
        <el-steps :active="active" align-center>
          <el-step title="选择数据"></el-step>
          <el-step title="数据概览"></el-step>
          <el-step title="特征值粒化"></el-step>
          <el-step title="多粒度人群智能分层"></el-step>
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
        <partical
          v-if="showPage == 2"
          :active="active"
          :value.sync="active"
          :chooseTable="chooseTable"
          :behaviorOptions="behaviorOptions"
          :peopleOptions="peopleOptions"
          :medicalOptions="medicalOptions"
          v-on:getListvalue="getListvalue"
        ></partical>
        <divide
          v-if="showPage == 3"
          :active="active"
          :chooseTable="chooseTable"
          :value.sync="active"
          :list="list"
          v-on:getOutcome="getOutcome"
          v-on:getFormInline="getFormInline"
        ></divide>
      </div>
      <outcome
        v-if="showPage == 4"
        :chooseTable="chooseTable"
        :chooseColumns="chooseColumns"
        :outcome="outcome"
        :forminline="forminline"
      ></outcome>
    </el-main>
  </div>
</template>

<script>
import datachoose from "@/components/dataChoose/index.vue";
import DataView from "@/components/dataView/dataView.vue";
import partical from "@/views/peopleDivide/partical.vue";
import divide from "@/views/peopleDivide/divide.vue";
import outcome from "@/views/peopleDivide/outcome.vue";
export default {
  components: {
    DataView,
    datachoose,
    partical,
    divide,
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
      chooseColumns: [],
      outcome: [],
      list: [],
      ins: [],
      forminline: [],
    };
  },
  methods: {
    getTableName(chooseTable) {
      this.chooseTable = chooseTable;
      console.log(this.chooseTable + "all");
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
    getListvalue(list) {
      this.list = list;
    },
    getOutcome(outcome) {
      this.outcome = outcome;
    },
    getFormInline(forminline) {
      this.forminline = forminline;
    },
  },
  created() {},
  watch: {
    active: {
      handler(newValue, oldValue) {
        this.showPage = newValue;
        if (newValue == 4) {
          this.showStep = false;
        }
      },
    },
  },
};
</script>

<style>
.stepMain {
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>