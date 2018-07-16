import i18n from 'src/i18n';

// Create HighchartsReact
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
        text: i18n.t('performance:total_fund_value'),
        style: {
          color: '#000',
        },
      },
      gridLineWidth: 0,
      labels: {
        // eslint-disable-next-line object-shorthand, func-names
        formatter: function() {
          return `$${this.axis.defaultLabelFormatter.call(this)}`;
        },
      },
    },
    {
      title: {
        text: i18n.t('performance:net_asset_value'),
        style: {
          color: '#000',
        },
      },
      gridLineWidth: 0,
      labels: {
        // eslint-disable-next-line object-shorthand, func-names
        formatter: function() {
          return `${this.axis.defaultLabelFormatter.call(this)}`;
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
    shared: true,
    split: false,
    crosshairs: [true],
  },
  series: [
    {
      name: i18n.t('performance:total_fund_value'),
      data: performance.totalFundValue,
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [[0, '#085790'], [1, '#085790']],
      },
      tooltip: {
        valuePrefix: '$',
        valueSuffix: ' USD',
      },
    },
    {
      name: i18n.t('performance:net_asset_value'),
      yAxis: 1,
      data: performance.netAssetValue,
      color: {
        linearGradient: { x1: 1, y1: 1, x2: 0, y2: 1 },
        stops: [[0, '#AD2256'], [1, '#AD2256']],
      },
      tooltip: {
        valueSuffix: ' ETH',
      },
    },
  ],
  exporting: {
    enabled: false,
  },
  time: {
    useUTC: false,
  },
});
