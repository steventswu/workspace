// Create HighchartsReact
import numeral from 'numeral';

export const navChartOptions = performance => ({
  chart: {
    type: 'areaspline',
    height: '280',
    zoomType: 'x',
  },
  title: null,
  xAxis: {
    type: 'datetime',
    min: 1517414400000,
    max: 1517419200000,
    startOnTick: false,
    endOnTick: false,
    labels: {
      style: {
        color: '#000',
      },
    },
  },
  yAxis: [
    {
      title: {
        text: 'Total Fund Value',
        style: {
          color: '#000',
        },
      },
      gridLineWidth: 0,
      labels: {
        // eslint-disable-next-line object-shorthand
        formatter: function() {
          return numeral(this.axis.defaultLabelFormatter.call(this)).format('0,0.[0000]');
        },
      },
    },
    {
      title: {
        text: 'Net Asset Value',
        style: {
          color: '#000',
        },
      },
      gridLineWidth: 0,
      labels: {
        // eslint-disable-next-line object-shorthand
        formatter: function() {
          return numeral(this.axis.defaultLabelFormatter.call(this)).format('0,0.[0000]');
        },
      },
      opposite: true,
    },
  ],
  plotOptions: {
    areaspline: {
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 2,
      },
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      threshold: null,
    },
  },
  legend: {
    layout: 'horizontal',
    verticalAlign: 'top',
    align: 'left',
    x: 120,
    y: -10,
    floating: true,
    itemStyle: {
      color: '#000',
    },
  },
  tooltip: {
    valuePrefix: '$',
    valueSuffix: ' USD',
    shared: true,
    split: false,
    crosshairs: [true],
  },
  series: [
    {
      name: 'Total Fund Value',
      data: performance.totalFundValue,
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [[0, '#5EE0FE'], [1, '#085790']],
      },
    },
    {
      name: 'Net Asset Value',
      yAxis: 1,
      data: performance.netAssetValue,
      color: {
        linearGradient: { x1: 1, y1: 1, x2: 0, y2: 1 },
        stops: [[0, '#AD2256'], [1, 'rgb(255, 27, 27)']],
      },
    },
  ],
  exporting: {
    enabled: false,
  },
});
