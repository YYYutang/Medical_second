<template>
  <div>
    <div class="main">
      <!--自定义宽高的dom，用于放置图表-->
      <div class="type">
        <div style="width: 700px; height: 300px">
          <div class="bar" id="contents"></div>
        </div>
        <div class="form" id="contents">
          <span>人口学特征：</span>
          <el-select
            v-model="peopleValue"
            placeholder="请选择一个人口学特征"
            @change="changePeople"
            ><el-option
              v-for="item in peopleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <br />
          <el-descriptions style="margin-top: 20px" :column="3" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                名称
              </template>
              {{ this.peopleDescription.name }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                类型
              </template>
              {{ this.peopleDescription.type }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                总量
              </template>
              {{ this.peopleDescription.total_count }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                缺失率
              </template>
              {{ this.peopleDescription.missing_count }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                有效率
              </template>
              {{ this.peopleDescription.valid_count }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                方差
              </template>
              {{ this.peopleDescription.variance_value }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                最大值
              </template>
              {{ this.peopleDescription.max_value }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                最小值
              </template>
              {{ this.peopleDescription.min_value }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                平均值
              </template>
              {{ this.peopleDescription.average_value }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <div class="type">
        <div style="width: 700px; height: 300px">
          <div class="bar" id="contents"></div>
        </div>
        <div class="form" id="contents">
          <span>行为学特征：</span>
          <el-select
            v-model="behaviorValue"
            placeholder="请选择一个行为学特征"
            @change="changeBehavior"
          >
            <el-option
              v-for="item in behaviorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-descriptions style="margin-top: 20px" :column="3" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                名称
              </template>
              {{ this.behaviorDescription.name }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                类型
              </template>
              {{ this.behaviorDescription.type }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                总量
              </template>
              {{ this.behaviorDescription.total_count }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                缺失率
              </template>
              {{ this.behaviorDescription.missing_count }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                有效率
              </template>
              {{ this.behaviorDescription.valid_count }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                方差
              </template>
              {{ this.behaviorDescription.variance_value }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                最大值
              </template>
              {{ this.behaviorDescription.max_value }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                最小值
              </template>
              {{ this.behaviorDescription.min_value }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                平均值
              </template>
              {{ this.behaviorDescription.average_value }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <div class="type">
        <div style="width: 700px; height: 300px">
          <div class="bar" id="contents"></div>
        </div>
        <div class="form" id="contents">
          <span>临床特征：</span>
          <el-select
            v-model="medicalValue"
            placeholder="请选择一个临床特征"
            @change="changeMedical"
            ><el-option
              v-for="item in medicalOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <el-descriptions style="margin-top: 20px" :column="3" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                名称
              </template>
              {{ this.medicalDescription.name }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                类型
              </template>
              {{ this.medicalDescription.type }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                总量
              </template>
              {{ this.medicalDescription.total_count }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                缺失率
              </template>
              {{ this.medicalDescription.missing_count }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                有效率
              </template>
              {{ this.medicalDescription.valid_count }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                方差
              </template>
              {{ this.medicalDescription.variance_value }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                最大值
              </template>
              {{ this.medicalDescription.max_value }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                最小值
              </template>
              {{ this.medicalDescription.min_value }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                平均值
              </template>
              {{ this.medicalDescription.average_value }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>

    <div class="button">
      <el-button @click="returnPreActive">上一步</el-button>
      <el-button @click="returnNextActive">下一步</el-button>
    </div>
  </div>
</template>


<script>
import { postRequest, getRequest } from "@/utils/api";

export default {
  name: "dataView",
  props: ["active", "chooseTable"],
  data() {
    return {
      type: ["人口学特征", "行为学特征", "临床特征"], //标题列表
      formData: [],

      xvalue: [
        [0, 3, 6, 9, 12],
        [0, 1],
        [0, 20, 40, 60, 80, 100],
      ], //数据（x轴的大小
      yvalue: [
        [20, 14, 16, 18, 60],
        [48, 54],
        [10, 35, 32, 14, 2],
      ],
      peopleValue: [],
      behaviorValue: [],
      medicalValue: [],
      peopleOptions: {},
      behaviorOptions: [],
      medicalOptions: [],

      behaviorDescription: {},
      medicalDescription: {},
      peopleDescription: {},
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
      this.$emit("update:value", tempActive);
    },
    draw_Bar() {
      var myEchart = document.getElementsByClassName("bar"); //获取类名
      //此处for循环多次初始化 echarts 实例
      for (var i = 0; i < myEchart.length; i++) {
        var myChart = this.$echarts.init(myEchart[i]); //初始化echarts实例要在for循环内
        const builderJson = {
          all: 100,
          charts: {
            x: this.xvalue[i],
            y: this.yvalue[i],
          },
        };
        let option = {
          title: {
            text: this.type[i],
            left: "center",
            textAlign: "center",
          },
          grid: {
            // 水平垂直居中
            left: "center",
            width: 400,
            // grid 区域不包含坐标轴的刻度标签
            containLabel: false,
          },
          // x轴y轴不显示
          xAxis: {
            type: "category",
            data: builderJson.charts.x,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: builderJson.charts.y,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
            },
          ],
        };
        //使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
      }
    },
    getInitData() {
      console.log(this.chooseTable)
      getRequest("/feature/getAllFiled/" + this.chooseTable).then(
        (response) => {
          let data = response.data;

          let columnNametemp = Object.keys(data);
          var temppeopleValue = new Array();
          var tempmedicalValue = new Array();
          var tempbehaviorValue = new Array();
          for (let i = 0; i < columnNametemp.length; i++) {
            if (data[columnNametemp[i]] != null) {
              const obj = {
                value: data[columnNametemp[i]].fieldName,
                label: data[columnNametemp[i]].fieldName,
              };

              if (data[columnNametemp[i]].isDemography == 1) {
                temppeopleValue.push(obj);
              }
              if (data[columnNametemp[i]].isSociology == 1) {
                tempbehaviorValue.push(obj);
              }
              if (data[columnNametemp[i]].isPhysiological == 1) {
                tempmedicalValue.push(obj);
              }
            }
          }
          this.peopleOptions = temppeopleValue;
          this.medicalOptions = tempmedicalValue;
          this.behaviorOptions = tempbehaviorValue;
          this.$emit("getpeopleOptions", this.peopleOptions);
          this.$emit("getmedicalOptions", this.medicalOptions);
          this.$emit("getbehaviorOptions", this.behaviorOptions);
          getRequest(
            "feature/getstatisticsByFiled?fileds=" +
              this.peopleOptions[0].value +
              "," +
              this.medicalOptions[0].value +
              "," +
              this.behaviorOptions[0].value +
              "&tableName=" +
              this.chooseTable
          ).then((response) => {
            this.peopleDescription = response.data[0];
            this.peopleDescription.type = "数值";
            this.peopleDescription.name = this.peopleOptions[0].value;
            this.peopleDescription.variance_value = Number(
              this.peopleDescription.variance_value
            ).toFixed(2);
            this.peopleDescription.average_value = Number(
              this.peopleDescription.average_value
            ).toFixed(2);
            this.medicalDescription = response.data[1];
            this.medicalDescription.type = "数值";
            this.medicalDescription.name = this.medicalOptions[0].value;
            this.medicalDescription.variance_value = Number(
              this.medicalDescription.variance_value
            ).toFixed(2);
            this.medicalDescription.average_value = Number(
              this.medicalDescription.average_value
            ).toFixed(2);
            this.behaviorDescription = response.data[2];
            this.behaviorDescription.type = "数值";
            this.behaviorDescription.name = this.behaviorOptions[0].value;
            this.behaviorDescription.variance_value = Number(
              this.behaviorDescription.variance_value
            ).toFixed(2);
            this.behaviorDescription.average_value = Number(
              this.behaviorDescription.average_value
            ).toFixed(2);
          });
        }
      );
    },
    changePeople(value) {
      getRequest(
        "feature/getstatisticsByFiled?fileds=" +
          value +
          "&tableName=" +
          this.chooseTable
      ).then((response) => {
        this.peopleDescription = response.data[0];
        this.peopleDescription.type = "数值";
        this.peopleDescription.name = value;
        this.peopleDescription.variance_value = Number(
          this.peopleDescription.variance_value
        ).toFixed(2);
        this.peopleDescription.average_value = Number(
          this.peopleDescription.average_value
        ).toFixed(2);
      });
    },
    changeBehavior(value) {
      getRequest(
        "feature/getstatisticsByFiled?fileds=" +
          value +
          "&tableName=" +
          this.chooseTable
      ).then((response) => {
        this.behaviorDescription = response.data[0];
        this.behaviorDescription.type = "数值";
        this.behaviorDescription.name = value;
        this.behaviorDescription.variance_value = Number(
          this.behaviorDescription.variance_value
        ).toFixed(2);
        this.behaviorDescription.average_value = Number(
          this.behaviorDescription.average_value
        ).toFixed(2);
      });
    },
    changeMedical(value) {
      getRequest(
        "feature/getstatisticsByFiled?fileds=" +
          value +
          "&tableName=" +
          this.chooseTable
      ).then((response) => {
        this.medicalDescription = response.data[0];
        this.medicalDescription.type = "数值";
        this.medicalDescription.name = value;
        this.medicalDescription.variance_value = Number(
          this.medicalDescription.variance_value
        ).toFixed(2);
        this.medicalDescription.average_value = Number(
          this.medicalDescription.average_value
        ).toFixed(2);
      });
    },
  },
  mounted() {
    this.draw_Bar();

    this.getInitData();
  },
};
</script>


<style scoped>
.main {
  width: 1200px;
  margin: 30px 0;
  margin-left: 70px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  align-items: center;
}
.type {
  display: flex;
}
.main .bar {
  width: 100%;
  height: 100%;
}
#contents {
  float: left;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>