<template>
  <div style="display: flex; align-content: center; justify-content: center">
    <div
      id="chartRelate"
      style="height: 800px; width: 1400px; margin-top: 40px"
    ></div>
  </div>
</template>

<script>
import { postRequest } from "@/utils/api";
export default {
  props: ["chooseColumns", "chooseTable"],
  data() {
    return {
      outcome: [],
      typeName: [],
      arrays: [],
      titles: [],
    };
  },
  methods: {
    chart() {
      var chartDom = document.getElementById("chartRelate");
      this.mychart = this.$echarts.init(chartDom);
      var option = {
        title: {
          text: "聚类结果",
          left: "center",
        },
        grid: {
          left: "3%",
          right: "7%",
          bottom: "7%",
          containLabel: true,
        },
        tooltip: {
          // trigger: 'axis',
          showDelay: 0,
          formatter: function (params) {
            if (params.value.length > 1) {
              return (
                params.seriesName +
                " :<br/>" +
                params.value[0] +
                "<br/> " +
                params.value[1]
              );
            } else {
              return (
                params.data.typeName +
                " :<br/>" +
                params.name +
                " : " +
                params.value
              );
            }
          },
          axisPointer: {
            show: true,
            type: "cross",
            lineStyle: {
              type: "dashed",
              width: 1,
            },
          },
        },
        toolbox: {
          feature: {
            dataZoom: {},
            brush: {
              type: ["rect", "polygon", "clear"],
            },
          },
        },
        brush: {},
        legend: {
          data: this.titles,
          left: "center",
          bottom: 10,
        },
        xAxis: [
          {
            type: "value",
            scale: true,
            axisLabel: {
              formatter: "{value}",
            },
            splitLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            axisLabel: {
              formatter: "{value} ",
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: this.arrays,
      };
      option && this.mychart.setOption(option);
    },
    getOutCome() {
      const params = {
        tableName: this.chooseTable,
        runParams: this.chooseColumns,
        aiName: "knn",
      };
      postRequest("feature/runAi", params).then((response) => {
        this.outcome = response.data;
        const type = [];
        let typeNum = 0;
        console.log(this.outcome);
        this.outcome.forEach((item) => {
          const pos = item[2];
          if (pos > typeNum) {
            typeNum = pos;
          }
          const arr = [item[0], item[1]];
          if (type[pos]) {
            type[pos].push(arr);
          } else {
            const newArr = [];
            newArr.push(arr);
            type.push(newArr);
          }
        });
        for (let i = 0; i <= typeNum; i++) {
          var num = i + 1;
          var tempobj = {
            name: "第" + num + "类",
            type: "scatter",
            emphasis: {
              focus: "series",
            },
            markArea: {
              silent: true,
              itemStyle: {
                color: "transparent",
                borderWidth: 1,
                borderType: "dashed",
              },
              data: [
                [
                  {
                    name: "第" + num + "类数据范围",
                    xAxis: "min",
                    yAxis: "min",
                  },
                  {
                    xAxis: "max",
                    yAxis: "max",
                  },
                ],
              ],
            },
            markPoint: {
              data: [
                { type: "max", name: "Max", typeName: "第" + num + "类" },
                { type: "min", name: "Min", typeName: "第" + num + "类" },
              ],
            },

            data: type[i],
          };
          this.titles.push(tempobj.name);
          this.arrays.push(tempobj);
          this.chart();
        }
      });
    },
  },
  mounted() {
    this.getOutCome();
  },
};
</script>

<style>
</style>