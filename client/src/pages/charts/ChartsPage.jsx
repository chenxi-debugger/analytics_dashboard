import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Chip, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactECharts from 'echarts-for-react';
import { apiFetch } from '../../api/client';
import { PageHeader } from '../../components/common';

function ChartCard({ title, subtitle, action, live, children }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h6">
              {title} {live && <Chip label="live data" size="small" color="success" variant="outlined" sx={{ ml: 1 }} />}
            </Typography>
            {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
          </Box>
          {action}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}
ChartCard.propTypes = { title: PropTypes.string, subtitle: PropTypes.string, action: PropTypes.node, live: PropTypes.bool, children: PropTypes.node };

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Deterministic "random" numbers so the demo charts look the same on every load.
const seeded = (start) => {
  let seed = start;
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
};

const ChartsPage = () => {
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [range, setRange] = useState('year');

  useEffect(() => {
    apiFetch('/api/users/stats').then(setStats).catch(() => setStats(null));
  }, []);

  const p = theme.palette;
  const text = p.text.secondary;
  const grid = p.divider;
  const palette = [p.primary.main, p.success.main, p.warning.main, p.info.main, p.error.main, p.secondary.main];

  // Options are rebuilt on each render (cheap); echarts-for-react deep-compares them.
  // Shared axis styling so every chart follows light/dark mode.
  const axis = {
    axisLine: { lineStyle: { color: grid } },
    axisLabel: { color: text },
    splitLine: { lineStyle: { color: grid, type: 'dashed' } },
  };
  const base = { color: palette, textStyle: { color: text }, tooltip: { trigger: 'axis' }, grid: { left: 40, right: 16, top: 40, bottom: 30 } };

  const line = (() => {
    const rnd = seeded(7);
    const labels = range === 'year' ? MONTHS : DAYS;
    const mk = (b) => labels.map((_, i) => Math.round(b + i * 8 + rnd() * 40));
    return {
      ...base,
      legend: { data: ['Revenue', 'Expenses'], textStyle: { color: text }, top: 0 },
      xAxis: { type: 'category', data: labels, boundaryGap: false, ...axis },
      yAxis: { type: 'value', ...axis },
      series: [
        { name: 'Revenue', type: 'line', smooth: true, data: mk(120), symbolSize: 6 },
        { name: 'Expenses', type: 'line', smooth: true, data: mk(60), symbolSize: 6, lineStyle: { type: 'dashed' } },
      ],
    };
  })();

  const roleBar = (() => {
    const counts = (stats && stats.roleCounts) || {};
    const roles = ['Administrator', 'Manager', 'Editor', 'Support', 'Subscriber'];
    return {
      ...base,
      xAxis: { type: 'category', data: roles, ...axis, axisLabel: { color: text, interval: 0, fontSize: 11 } },
      yAxis: { type: 'value', minInterval: 1, ...axis },
      series: [{
        type: 'bar',
        barWidth: '45%',
        data: roles.map((r, i) => ({ value: counts[r] || 0, itemStyle: { color: palette[i], borderRadius: [6, 6, 0, 0] } })),
        label: { show: true, position: 'top', color: text },
      }],
    };
  })();

  const statusDonut = (() => ({
    color: [p.success.main, p.warning.main, p.secondary.main],
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { bottom: 0, textStyle: { color: text } },
    series: [{
      type: 'pie',
      radius: ['55%', '78%'],
      center: ['50%', '45%'],
      itemStyle: { borderRadius: 6, borderColor: p.background.paper, borderWidth: 2 },
      label: { show: true, position: 'center', formatter: () => `${stats ? stats.total : '—'}\nusers`, fontSize: 20, color: p.text.primary, lineHeight: 26 },
      data: [
        { name: 'Active', value: stats ? stats.active : 0 },
        { name: 'Pending', value: stats ? stats.pending : 0 },
        { name: 'Inactive', value: stats ? stats.inactive : 0 },
      ],
    }],
  }))();

  const area = (() => {
    const rnd = seeded(3);
    const s = (b) => MONTHS.slice(0, 8).map(() => Math.round(b + rnd() * 50));
    return {
      ...base,
      legend: { top: 0, textStyle: { color: text } },
      xAxis: { type: 'category', boundaryGap: false, data: MONTHS.slice(0, 8), ...axis },
      yAxis: { type: 'value', ...axis },
      series: ['Organic', 'Referral', 'Social'].map((name, i) => ({
        name, type: 'line', stack: 'total', smooth: true, areaStyle: { opacity: 0.35 }, showSymbol: false, data: s(40 - i * 10),
      })),
    };
  })();

  const radar = (() => ({
    color: [p.primary.main, p.warning.main],
    tooltip: {},
    legend: { bottom: 0, textStyle: { color: text } },
    radar: {
      indicator: ['Sales', 'Marketing', 'Development', 'Support', 'Tech', 'Admin'].map((name) => ({ name, max: 100 })),
      axisName: { color: text },
      splitLine: { lineStyle: { color: grid } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: grid } },
      center: ['50%', '45%'],
      radius: '62%',
    },
    series: [{ type: 'radar', areaStyle: { opacity: 0.25 }, data: [
      { name: 'Budget', value: [80, 50, 90, 60, 70, 40] },
      { name: 'Spending', value: [65, 70, 75, 85, 50, 55] },
    ] }],
  }))();

  const scatter = (() => {
    const rnd = seeded(11);
    const pts = (cx, cy) => Array.from({ length: 30 }, () => [+(cx + rnd() * 30).toFixed(1), +(cy + rnd() * 30).toFixed(1)]);
    return {
      ...base,
      tooltip: { trigger: 'item' },
      legend: { top: 0, textStyle: { color: text } },
      xAxis: { type: 'value', name: 'Sessions', nameTextStyle: { color: text }, ...axis },
      yAxis: { type: 'value', name: 'Orders', nameTextStyle: { color: text }, ...axis },
      series: [
        { name: 'Desktop', type: 'scatter', data: pts(10, 30), symbolSize: 9 },
        { name: 'Mobile', type: 'scatter', data: pts(40, 10), symbolSize: 9 },
      ],
    };
  })();

  const heatmap = (() => {
    const rnd = seeded(5);
    const hours = ['00', '03', '06', '09', '12', '15', '18', '21'];
    const data = [];
    DAYS.forEach((_, d) => hours.forEach((_h, h) => data.push([h, d, Math.round(rnd() * (h > 2 && h < 7 ? 100 : 40))])));
    return {
      tooltip: { position: 'top' },
      grid: { left: 40, right: 16, top: 10, bottom: 90 },
      xAxis: { type: 'category', data: hours, ...axis, splitArea: { show: false } },
      yAxis: { type: 'category', data: DAYS, ...axis },
      visualMap: { min: 0, max: 100, orient: 'horizontal', left: 'center', bottom: 0, calculable: true, textStyle: { color: text },
        inRange: { color: [p.background.default, p.primary.light, p.primary.dark] } },
      series: [{ type: 'heatmap', data, itemStyle: { borderColor: p.background.paper, borderWidth: 2 } }],
    };
  })();

  const gauge = (() => {
    const pct = stats && stats.total ? Math.round((stats.active / stats.total) * 100) : 0;
    return {
      series: [{
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        progress: { show: true, width: 16, itemStyle: { color: p.success.main } },
        axisLine: { lineStyle: { width: 16, color: [[1, p.action.selected]] } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: { show: false },
        detail: { valueAnimation: true, formatter: '{value}%', color: p.text.primary, fontSize: 28, offsetCenter: [0, '0%'] },
        title: { offsetCenter: [0, '30%'], color: text },
        data: [{ value: pct, name: 'active users' }],
      }],
    };
  })();

  const h = 300;
  return (
    <Box>
      <PageHeader title="Charts" subtitle="Apache ECharts via echarts-for-react. Charts marked “live data” are drawn from /api/users/stats; the rest use generated sample data." />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard
            title="Revenue vs Expenses"
            subtitle="Line chart with two series"
            action={(
              <ToggleButtonGroup size="small" exclusive value={range} onChange={(_, v) => v && setRange(v)}>
                <ToggleButton value="week">Week</ToggleButton>
                <ToggleButton value="year">Year</ToggleButton>
              </ToggleButtonGroup>
            )}
          >
            <ReactECharts option={line} style={{ height: h }} notMerge />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ChartCard title="User Status" subtitle="Donut chart" live>
            <ReactECharts option={statusDonut} style={{ height: h }} />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          <ChartCard title="Users by Role" subtitle="Bar chart" live>
            <ReactECharts option={roleBar} style={{ height: h }} />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ChartCard title="Activation Rate" subtitle="Gauge" live>
            <ReactECharts option={gauge} style={{ height: h }} />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <ChartCard title="Team Budget" subtitle="Radar chart">
            <ReactECharts option={radar} style={{ height: h }} />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Traffic Sources" subtitle="Stacked area chart">
            <ReactECharts option={area} style={{ height: h }} />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Sessions vs Orders" subtitle="Scatter chart">
            <ReactECharts option={scatter} style={{ height: h }} />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ChartCard title="Activity by Day & Hour" subtitle="Heatmap">
            <ReactECharts option={heatmap} style={{ height: 320 }} />
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChartsPage;
