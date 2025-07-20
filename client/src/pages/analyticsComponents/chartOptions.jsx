// src/utils/chartOptions.js

const getOrderChartOption = (data, theme) => ({
    xAxis: {
      type: 'category',
      data: data?.order_card?.chart?.xAxis || [],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data?.order_card?.chart?.data || [],
        type: 'line',
        smooth: true,
        lineStyle: { color: theme.palette.success.main, width: 2 },
        itemStyle: { color: theme.palette.success.main },
        showSymbol: true,
        symbolSize: (val, params) => (params.dataIndex === (data?.order_card?.chart?.data?.length || 0) - 1 ? 12 : 8),
        symbol: 'circle',
        areaStyle: { color: theme.palette.success.light },
      },
    ],
    grid: { left: 0, right: 0, top: 10, bottom: 0 },
  });
  
  const getTotalRevenueChartOption = (theme) => {
    const baseOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: { show: true },
        axisTick: { show: true },
        axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: true },
        axisTick: { show: true },
        axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          stack: 'a',
          name: 'a',
        },
        {
          data: [10, 46, 64, '-', 0, '-', 0],
          type: 'bar',
          stack: 'a',
          name: 'b',
        },
        {
          data: [30, '-', 0, 20, 10, '-', 0],
          type: 'bar',
          stack: 'a',
          name: 'c',
        },
        {
          data: [30, '-', 0, 20, 10, '-', 0],
          type: 'bar',
          stack: 'b',
          name: 'd',
        },
        {
          data: [10, 20, 150, 0, '-', 50, 10],
          type: 'bar',
          stack: 'b',
          name: 'e',
        },
      ],
    };
  
    const stackInfo = {};
    for (let i = 0; i < baseOption.series[0].data.length; ++i) {
      for (let j = 0; j < baseOption.series.length; ++j) {
        const stackName = baseOption.series[j].stack;
        if (!stackName) continue;
        if (!stackInfo[stackName]) {
          stackInfo[stackName] = { stackStart: [], stackEnd: [] };
        }
        const info = stackInfo[stackName];
        const data = baseOption.series[j].data[i];
        if (data && data !== '-') {
          if (info.stackStart[i] == null) info.stackStart[i] = j;
          info.stackEnd[i] = j;
        }
      }
    }
    for (let i = 0; i < baseOption.series.length; ++i) {
      const data = baseOption.series[i].data;
      const info = stackInfo[baseOption.series[i].stack];
      for (let j = 0; j < baseOption.series[i].data.length; ++j) {
        const isEnd = info.stackEnd[j] === i;
        const topBorder = isEnd ? 20 : 0;
        const bottomBorder = 0;
        data[j] = {
          value: data[j],
          itemStyle: { borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder] },
        };
      }
    }
  
    return baseOption;
  };
  
  const getRevenueChartOption = (data, theme) => ({
    xAxis: {
      type: 'category',
      data: data?.revenue_stats_card?.chart?.xAxis || [],
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: data?.revenue_stats_card?.chart?.data || [],
        barWidth: 6,
        itemStyle: { color: theme.palette.warning.main, borderRadius: 4 },
      },
    ],
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  
  const getIncomeChartOption = (data, selectedTab, theme) => ({
    xAxis: {
      type: 'category',
      data: data?.income_card?.[selectedTab.toLowerCase()]?.chart?.xAxis || [],
      axisLabel: { color: theme.palette.text.secondary, fontSize: 8 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        data: data?.income_card?.[selectedTab.toLowerCase()]?.chart?.data || [],
        type: 'line',
        smooth: true,
        lineStyle: { color: theme.palette.primary.main, width: 2 },
        areaStyle: { color: theme.palette.primary.light },
        itemStyle: { color: theme.palette.primary.main },
        showSymbol: true,
        symbolSize: 6,
        symbol: 'circle',
      },
    ],
    grid: { left: 10, right: 10, top: 10, bottom: 10 },
  });
  
  const getProfitChartOption = () => ({
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '30%'],
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [
        { gt: 1, lt: 3, color: 'rgba(0, 0, 180, 0.4)' },
        { gt: 5, lt: 7, color: 'rgba(0, 0, 180, 0.4)' },
      ],
    },
    series: [
      {
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: { color: '#5470C6', width: 5 },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
        },
        areaStyle: {},
        data: [
          ['2024-10-10', 200],
          ['2024-10-11', 560],
          ['2024-10-12', 750],
          ['2024-10-13', 580],
          ['2024-10-14', 250],
          ['2024-10-15', 300],
          ['2024-10-16', 450],
          ['2024-10-17', 300],
          ['2024-10-18', 100],
        ],
      },
    ],
  });
  
  const getGrowthChartOption = () => ({
    toolbox: {
      show: false,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [30, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: { borderRadius: 8 },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          
        ],
      },
    ],
  });
  
  export {
    getOrderChartOption,
    getTotalRevenueChartOption,
    getRevenueChartOption,
    getIncomeChartOption,
    getProfitChartOption,
    getGrowthChartOption,
  };