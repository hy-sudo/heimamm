<template>
  <div class="chart">
    <el-card class="card-top">
      <ul>
        <li>
          <span class="circle">{{ topData.increment_users }}</span>
          <span>今日新增用户</span>
        </li>
        <li>
          <span class="circle">{{ topData.total_users }}</span>
          <span>总用户量</span>
        </li>
        <li>
          <span class="circle orange">{{ topData.increment_questions }}</span>
          <span>新增试题</span>
        </li>
        <li>
          <span class="circle orange">{{ topData.total_questions }}</span>
          <span>总试题量</span>
        </li>
        <li>
          <span class="circle green">{{ topData.total_done_questions }}</span>
          <span>总刷题量</span>
        </li>
        <li>
          <span class="circle green">{{ topData.personal_questions }}</span>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <!-- 底部 -->
    <el-card>
      <div ref="box" class="box"></div>
    </el-card>
  </div>
</template>

<script>
import { getTop, statistics } from "@/api/chart.js";
// 导入echarts
import echarts from "echarts";

export default {
  data() {
    return {
      topData: {}
    };
  },
  created() {
    getTop().then(res => {
      this.topData = res.data.data;
    });
  },
  mounted() {
    var myChart = echarts.init(this.$refs.box);

    // 接口在created里面调用一下
    statistics().then(res => {
      // console.log(res);
      // map：提取元素内容组成新数组
      let names = res.data.data.map(item => {
        return item.name;
      });

      // 准备一个配置
      var option = {
        title: {
          text: "整体数据"
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 10,
          data: names
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data.data
          }
        ]
      };

      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less">
.chart {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;

      .circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #0094ff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        margin-bottom: 20px;

        &.orange {
          border-color: #d96555;
        }
        &.green {
          border-color: green;
        }
      }
    }
  }
  .card-top {
    margin-bottom: 15px;
  }
  .box {
    height: 500px;
  }
}
</style>