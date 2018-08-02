import i18n from 'src/i18n';

// Create HighchartsReact
export const navChartOptions = performance => ({
  chart: {
    backgroundColor: 'transparent',
    type: 'areaspline',
    height: '280',
    zoomType: 'x',
    alignTicks: true,
  },
  title: null,
  xAxis: {
    type: 'datetime',
    startOnTick: false,
    endOnTick: false,
    labels: {
      style: {
        color: '#fff',
      },
    },
  },
  yAxis: [
    {
      title: {
        text: i18n.t('performance:total_fund_value'),
        style: {
          color: '#fff',
        },
      },
      gridLineWidth: 0,
      labels: {
        // eslint-disable-next-line object-shorthand, func-names
        formatter: function() {
          return `${this.axis.defaultLabelFormatter.call(this)}`;
        },
        style: {
          color: '#fff',
        },
      },
    },
    {
      title: {
        text: i18n.t('performance:net_asset_value'),
        style: {
          color: '#fff',
        },
      },
      gridLineWidth: 0,
      labels: {
        // eslint-disable-next-line object-shorthand, func-names
        formatter: function() {
          return `${this.axis.defaultLabelFormatter.call(this)}`;
        },
        style: {
          color: '#fff',
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
      color: '#fff',
    },
  },
  tooltip: {
    shared: true,
    split: false,
    crosshairs: [true],
  },
  series: [
    {
      name: i18n.t('performance:total_fund_value'),
      data: performance.totalFundValue,
      color: 'rgba(33, 150, 243, 0.8)',
      tooltip: {
        valueSuffix: ' ETH',
      },
    },
    {
      name: i18n.t('performance:net_asset_value'),
      yAxis: 1,
      data: performance.netAssetValue,
      color: 'rgba(221, 102, 102, 0.8)',
      tooltip: {
        valueSuffix: ' ETH',
      },
    },
  ],
  exporting: {
    enabled: false,
  },
  time: {
    useUTC: true,
  },
});
