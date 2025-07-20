// src/pages/CRMchartoptions.js
export const customerRatingChartOption = (theme) => ({
    xAxis: {
      type: 'category',
      data: [], // 数据由组件提供
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: [], // 数据由组件提供
        type: 'line',
        smooth: true,
        lineStyle: { color: theme.palette.primary.main, width: 2 },
        itemStyle: { color: theme.palette.primary.main },
        showSymbol: true,
        symbolSize: 8,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  });
  
  export const overviewSalesChartOption = (theme) => ({
    xAxis: {
      type: 'category',
      data: [], // 数据由组件提供
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [], // 数据由组件提供
        barWidth: 6,
        itemStyle: { color: theme.palette.error.main, borderRadius: 4 },
      },
      {
        name: 'Sessions',
        type: 'bar',
        data: [], // 数据由组件提供
        barWidth: 6,
        itemStyle: { color: theme.palette.divider, borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  });
  
  export const generatedLeadsChartOption = (theme) => ({
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        data: [
          { name: 'Leads', value: 25, itemStyle: { color: theme.palette.success.main } },
          { name: 'Remaining', value: 75, itemStyle: { color: theme.palette.divider } },
        ],
        label: { show: false },
      },
    ],
  });
  
  export const earningReportChartOption = (theme) => ({
    xAxis: {
      type: 'category',
      data: [], // 数据由组件提供
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: [], // 数据由组件提供
        barWidth: 6,
        itemStyle: { color: theme.palette.primary.main, borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  });
  
  export const salesAnalyticsChartOption = (year, theme) => ({
    visualMap: {
      min: 0,
      max: 8000,
      show: false,
      inRange: { color: [theme.palette.divider, theme.palette.primary.main] },
    },
    calendar: {
      range: year,
      cellSize: ['auto', 10],
      dayLabel: { show: false },
      monthLabel: { nameMap: 'en', color: theme.palette.text.secondary, fontSize: 10 },
      yearLabel: { show: false },
    },
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: Array.from({ length: 365 }, (_, i) => [
          `${year}-${Math.floor(i / 30) + 1}-${(i % 30) + 1}`,
          Math.floor(Math.random() * 8000),
        ]),
      },
    ],
  });
  
  export const salesStatsChartOption = (theme) => ({
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        data: [
          { name: 'Sales', value: 75, itemStyle: { color: theme.palette.success.main } },
          { name: 'Remaining', value: 25, itemStyle: { color: theme.palette.divider } },
        ],
        label: { show: false },
      },
    ],
  });