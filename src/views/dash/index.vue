<template>
  <div>
    <div class="topBigDiv">
      <div class="left1">
        <el-card class="card">
          <div>
            <el-statistic
              title="患者总数"
              value-style="font-size:60px; line-height: 120px;"
              :value="value1"
            ></el-statistic>
          </div>
        </el-card>
      </div>
      <div class="left2">
        <el-card class="card">
          <div>
            <el-statistic
              :value="value2"
              value-style="font-size:60px; line-height: 120px;"
              class="text"
              title="疾病种类"
            ></el-statistic>
          </div>
        </el-card>
      </div>
      <div class="right1">
        <el-card class="card">
          <div>
            <el-statistic
              title="时间范围"
              value-style="font-size:30px; line-height:60px"
              class="text"
            >
              <template slot="formatter"> 2006-09-30</template>
            </el-statistic>
            <el-statistic value-style="font-size:30px;margin-top:20px">
              <template slot="formatter"> 2023-05-30</template>
            </el-statistic>
          </div>
        </el-card>
      </div>
      <div class="right2">
        <el-card class="card">
          <div>
            <el-statistic
              title="任务总量"
              :value="value5"
              value-style="font-size:30px;line-height:80px "
            >
            </el-statistic>
            <el-progress
              :percentage="50"
              :format="format"
              style="margin-left: 30px"
            ></el-progress>
          </div>
        </el-card>
      </div>
    </div>
    <div class="bottomBigDiv">
      <div class="left">
        <el-card>
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>疾病统计</span>
          </div>
          <div id="diseaseType" style="width: 800px; height: 400px"></div>
        </el-card>
      </div>
      <div class="mid">
        <el-card>
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>心血管数据</span>
          </div>
          <div id="cardioData" style="width: 350px; height: 400px"></div>
        </el-card>
      </div>
      <div class="right">
        <el-card style="height:500px">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>系统数据大小信息</span>
          </div>
          <div class="sizeContain">
            <div>
             
            <el-progress
              type="circle"
              :width="70"
              :percentage="100"
              color="#91CC75"
              
              :format="bigerData"
              style="margin-top:40px;"
            ></el-progress>
            <br>
            <span>cadio_train</span>
            </div>
            <div>
               
            <el-progress
              type="circle"
              :percentage="100"
              color="#FAC858"
              :format="bigestData"
            ></el-progress>
            <br>
            <span style="margin-left:30px">diabetes</span>
            </div>
            <div>
        
            <el-progress
              type="circle"
              :width="70"
              :percentage="100"
              color="#5470C6"
              :format="bigData"
              style="margin-top:40px"
            ></el-progress>
            <br>
             <span>lung_cancer</span>
            </div>
          </div>
          <br>
          <div style=" text-align: center;">
            <div  style="margin-top:20px">
             <svg-icon icon-file-name="金牌"/><span style="font-size:20px; ">Diabetes</span>
            </div>
            <div style="margin-top:20px">
             <svg-icon icon-file-name="银牌"/><span style="font-size:20px; ">cardio_train</span>
            </div>
             <div style="margin-top:20px">
             <svg-icon icon-file-name="铜牌"/><span style="font-size:20px; ">lung_cancer</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest } from "@/utils/api";
import storage from "@/utils/storage";

export default {

  name: "index",
  data() {
    return {
      mychart: {},


      line: null,
      patientNum: 200,
      xdata: [],
      ydata: [],
      like: true,
      value1: 4154,
      value2: 10,
      value3: "1999-01-01",
      value4: "2022-12-30",
      value5: 10,
      title: "患者总数",
    };
  },
  methods: {
    format(percentage) {
      return `成功${percentage}%`;
    },
    bigestData(percentage) {
      return `22M`;
    },
    bigerData(percentage) {
      return `16M`;
    },
    bigData(percentage) {
      return `8M`;
    },

    chart() {
      var chartDom = document.getElementById("diseaseType");
      this.mychart = this.$echarts.init(chartDom);
      var option = {
        xAxis: {
          type: "category",
          data: ["糖尿病", "心血管", "肺癌", "胃癌", "阿尔兹海默症", "白血病"],
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "axis",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110],
            type: "bar",
          },
        ],
      };
      option && this.mychart.setOption(option);
    },
    chart1() {
      var chartDom = document.getElementById("cardioData");
      this.mychart = this.$echarts.init(chartDom);

      var option;
      option = {
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return (
              params.data.name +
              ":" +
              params.data.cdata +
              "<br/>" +
              "百分比：" +
              params.data.value +
              "%"
            );
          },
        },
        toolbox: {
          feature: {
            restore: {},
          },
        },
        legend: {
          data: ["训练样本", "可用样本", "样本总数"],
          left: "5%",
        },
        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            top: 60,
            bottom: 60,
            width: "80%",
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              position: "inside",
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: [
              { value: 60, name: "训练样本", cdata: 4651 },
              { value: 80, name: "可用样本", cdata: 5008 },
              { value: 100, name: "样本总数", cdata: 5833 },
            ],
          },
        ],
      };

      option && this.mychart.setOption(option);
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
            tableOrigin: tempList[i].tableOrigin,
            tableSize: tempList[i].tableSize,
            tableDate: tempList[i].startTime,
          };
          this.tableData2.push(obj);
        }
      });
    },
    getStatis() {
      getRequest("/index/getStatisticaldData").then((response) => {
        this.value1 = response.data["数据总量"];
        this.insAllNum = response.data["指标总量"];
        let tempMiss = response.data["总体缺失率"];
        this.missingAll = parseFloat(parseFloat(tempMiss * 100).toFixed(2));
        let tempAll = response.data["总体有效率"];
        this.effectiveall = parseFloat(parseFloat(tempAll * 100).toFixed(2));
      });
    },
    getIncrease() {
      getRequest("/index/showTableTrend").then((response) => {
        console.log(response.data);
        this.xdata = Object.keys(response.data).sort();
        for (let i in this.xdata) {
          this.ydata.push(response.data[this.xdata[i]]);
        }
      });
    },
  },
  mounted() {
    this.getStatis();
    this.chart();
    this.chart1();
    this.getAllData();
    // this.getIncrease();

    this.getIncrease();
    // const that = this;
    // this.mychart.resize();
    // window.addEventListener("resize", () => {
    //   that.mychart.resize();
    // });
  },
};
</script>

<style scoped>
.topBigDiv {
  box-sizing: border-box;
  height: 25vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topBigDiv .left1 {
  box-sizing: border-box;
  width: 23%;
  height: 80%;
}
.topBigDiv .left2 {
  box-sizing: border-box;
  width: 23%;
  height: 80%;
}
.topBigDiv .right1 {
  box-sizing: border-box;
  width: 23%;
  height: 80%;
}
.topBigDiv .right2 {
  box-sizing: border-box;
  width: 23%;
  height: 80%;
}
.topBigDiv .left .quickEntryBox {
  /*border: 1px red solid;*/
  /*box-sizing: border-box;*/
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.topBigDiv .left .quickEntryBox .singleBox {
  /*border: 1px red solid;*/
  /*box-sizing: border-box;*/
  width: 80px;
  height: 80px;
  border-radius: 20%;
}
.topBigDiv .left .quickEntryBox .imgStyle {
  width: 90%;
  height: 90%;
}
.bottomBigDiv {
  box-sizing: border-box;
  height: 55vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.bottomBigDiv .left {
  box-sizing: border-box;
  height: 100%;
  width: 48.6%;
}
.bottomBigDiv .mid {
  box-sizing: border-box;
  height: 100%;
  width: 23%;
}
.bottomBigDiv .right {
  box-sizing: border-box;
  height: 100%;
  width: 23%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.lineStyle {
  color: rgb(100, 172, 231);
  font-weight: 40;
}
.card {
  padding: 0;
  height: 100%;
}
.like {
  cursor: pointer;
  font-size: 20px;
  display: inline-block;
}
#data_sta {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.sizeContain{
   display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
}
</style>
