import React, { PureComponent } from "react";
import ReactEcharts from "echarts-for-react";

class LineChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      labels: "",
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      data: props.data,
      labels: props.labels,
    };
  };

  _getSeriesList = () => {
    // echartsInstance.dispose();
    const { data } = this.state;
    // const { color } = this.props;
    // let color = ["#0076f4", "crimson", "Black"];
    let lineChart = data.map((d, i) => {
      return {
        name: this.props.legends && this.props.legends[i],
        // data: d.map((e) => e.toFixed(2)),
        data: d,
        type: "line",
        // stack: "cfgvgbh",
        // smooth: true,
        itemStyle: {
          color: this.props.colors[i],
        },
      };
    });

    return this._getOptions(lineChart);
  };

  _getOptions(lineChart) {
    const { labels, data, legends } = this.state;
    return {
      //   title: {
      //     text: this.props.title,
      //     // textAlign: "center",
      //     textStyle: {
      //       fontSize: 10,
      //     },
      //   },
      tooltip: {
        trigger: "axis",
        // axisPointer: {
        //   type: "cross",
        // },
      },
      legend: {
        data: this.props.legends,
        bottom: 0,
        itemGap: 5,
        itemHeight: 5,
        // padding: 20,
      },
      grid: {
        left: "1%",
        right: "1%",
        bottom: "10%",
        // top: this.props.legends ? "20%" : "10%",
        containLabel: true,
      },
      toolbox: {
        // feature: {
        //   saveAsImage: {},
        // },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.props.labels,
      },
      yAxis: {
        type: "value",
      },
      series: lineChart,
      //   [
      //     {
      //       name: "aman",
      //       type: "line",
      //       stack: "total",
      //       data: [120, 132, 101, 134, 90, 230, 210],
      //     },
      //     {
      //       name: "abcd",
      //       type: "line",
      //       stack: "total",
      //       data: [220, 182, 191, 234, 290, 330, 310],
      //     },
      //     {
      //       name: "视频广告",
      //       type: "line",
      //       stack: "total",
      //       data: [150, 232, 201, 154, 190, 330, 410],
      //     },
      //     {
      //       name: "直接访问",
      //       type: "line",
      //       stack: "total",
      //       data: [320, 332, 301, 334, 390, 330, 320],
      //     },
      //     {
      //       name: "搜索引擎",
      //       type: "line",
      //       stack: "total",
      //       data: [820, 932, 901, 934, 1290, 1330, 1320],
      //     },
      //   ],
    };
  }

  _getOptions2(lineChart) {
    const { labels } = this.state;
    // let lineChartData =
    return {
      title: {
        text: "EchartLineChart",
      },
      xAxis: {
        type: "category",
        data: labels,
        // boundaryGap: false
      },
      yAxis: [
        {
          axisLabel: {
            textStyle: { fontSize: 10 },
          },
          // axisLine: { show: false },
          // axisTick: { show: false },
          // name: "OSA",
          splitLine: {
            lineStyle: {
              type: "dotted",
            },
          },
          type: "value",
          name: this.props.heading,
          nameLocation: "center",
          nameTextStyle: {
            // color: 'blue',
            // fontStyle: 'italic',
            fontWeight: "bold",
            padding: 5,
          },
        },
      ],
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: this.props.legends ? "20%" : "10%",
        containLabel: true,
        // height: "100",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              formatter: function (params) {
                return params.value.replace("\n", "");
              },
            },
          },
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: this.props.legends,
        itemGap: 35,
        itemHeight: 18,
        right: "11%",
        top: 20,
        icon: "roundRect",
        show: this.props.legends ? true : false,
      },
      series: lineChart,
      // toolbox: {
      //   feature: {
      //       saveAsImage: {}
      //   }
      // },
      calculable: true,
      tooltip: {
        backgroundColor: "#555",
        borderWidth: 0,
        padding: 10,
      },
    };
  }

  render() {
    const { data, labels } = this.state;
    return (
      <div>
        {data && labels ? (
          <ReactEcharts
            notMerge={true}
            // lazyUpdate={true}
            style={{ height: this.props.height + "px", width: "100%" }}
            option={this._getSeriesList()}
          />
        ) : null}
      </div>
    );
  }
}

export default LineChart;
