//Cryptocurrency Comparion Chart
/* Historical data highchart array */
// var processed_marketcap = [];
// var processed_priceusd = [];

/* Determine the url path */
var url;
url= 'http://coinhub.capital/cob/api/tg-tv-tech-2.php';
// Make a request for a user with a given ID
// axios.get(url)
//   .then(function (response) {
//     console.log(response.data);
//     //Populate series
//     for (i = 0; i < response.data.crixusd.length; i++){
//       response.data.crixusd[i][0] = response.data.crixusd[i][0]*1000;
//     }
//     for(i = 0; i < data.coinhub.length; i++){
//       response.data.coinhub[i][0] = response.data.coinhub[i][0]*1000;
//     }
//   })
//   .catch(function (error) {
//     console.log(error);
//   })

$.getJSON(url, (data) => {
  console.log(data);
  //Populate series
  for (i = 0; i < data.crixusd.length; i++){
    data.crixusd[i][0] = data.crixusd[i][0]*1000;
  }
  for(i = 0; i < data.coinhub.length; i++){
    data.coinhub[i][0] = data.coinhub[i][0]*1000;
  }
  // Draw Chart
  Highcharts.setOptions({
    lang: {
        thousandsSep: ',',
        alignTicks: false
    }
  });
  Highcharts.chart('compareChart', {
      chart: {
          zoomType: 'x',
          marginTop: 100,
          marginLeft: 100,
          marginRight: 100,
          marginBottom: 80,
          alignTicks: false
      },
      rangeSelector: {
        selected: 4
      },
      title: {
        text: null
      },
      xAxis: {
          type: 'datetime',
          labels: {
              style: {
                color: '#FFFFFF'
              }
          },
          min: Date.UTC(2017, 6, 1)
      },
      yAxis: [{
        title: {
            text: 'Price (USD)',
            style: {
              color: '#FFFFFF'
            }
        },
        labels: {
          formatter: function () {
            return '$' + this.axis.defaultLabelFormatter.call(this);
          },
          style: {
            color: '#FFFFFF'
          }
        }
      },{
        title: {
            text: 'Market Cap',
            style: {
              color: '#FFFFFF'
            }
        },
        labels: {
          formatter: function () {
            return '$' + this.axis.defaultLabelFormatter.call(this);
          },
          style: {
            color: '#FFFFFF'
          }
        },
        height: '90%',
        opposite:true
      }],
      tooltip: {
        split: false,
        shared: true
      },
      legend: {
          width: 1003,
          itemDistance: 10,
          layout: 'horizontal',
          verticalAlign: 'top',
          align:'left',
          floating: true,
          itemStyle: {
           color: '#FFFFFF'
          }
      },
      series: [{
        name: 'Bitcoin',
        data: data.btcusd,
        tooltip: {
          valueSuffix: ' USD'
        },
        color: '#f7931a'
      },{
        name: 'Ethereum',
        data: data.ethusd,
        tooltip: {
          valueSuffix: ' USD'
        },
        color: '#6736ff'
      },{
        name: 'CoinHub',
        data: data.coinhub,
        tooltip: {
          valueSuffix: ' USD'
        },
        color: '#807dff'
      }, {
        name: 'Crix',
        data: data.crixusd,
        tooltip: {
          valueSuffix: ' USD'
        },
        color: '#f7611a'
      }, {
          name: 'SP500 market line',
          data: data.crixusd,
          tooltip: {
            valueSuffix: ' USD'
          },
          color: '#89ffdf',
          visible: false
      }, {
          name: '日經指數',
          data: data.crixusd,
          tooltip: {
            valueSuffix: ' USD'
          },
          color: '#ad2256',
          visible: false
      }, {
          name: '中國深滬300指數',
          data: data.crixusd,
          tooltip: {
            valueSuffix: ' USD'
          },
          color: '#c86dd7',
          visible: false
      }, {
          name: 'CAP01',
          data: data.coinhub,
          tooltip: {
            valueSuffix: ' USD'
          },
          color: '#0fcdeb',
          visible: false
      }, {
          name: 'CAP02',
          data: data.coinhub,
          tooltip: {
            valueSuffix: ' USD'
          },
          color: '#1fcdbb',
          visible: false
      }, {
          name: 'CAP03',
          data: data.coinhub,
          tooltip: {
            valueSuffix: ' USD'
          },
          color: '#2fcddb'
      }, {
          name: 'CAP04',
          data: data.coinhub,
          tooltip: {
            valueSuffix: ' USD'
          },
          color: '#3fccdb',
          visible: false
      }, {
          name: 'CAP05',
          data: data.coinhub,
          tooltip: {
            valueSuffix: ' USD'
          },
          color: '#4fcccb',
          visible: false
      }],
      responsive: {
        rules: [{
            condition: {
                maxWidth: 769
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    width: 700,
                    verticalAlign: 'top',
                    align:'left',
                    floating: true,
                    itemStyle: {
                     color: '#FFFFFF'
                    }
                }
            }
        }]
      },
      exporting: {
        enabled: false
      }
  });
});

/* Net Asset Value Chart */

Highcharts.chart('netAssetValue', {
    chart: {
        type: 'areaspline'
    },
    title: null,
    xAxis: {
        type: 'datetime',
        labels: {
            style: {
              color: '#FFFFFF'
            }
        }
    },
    yAxis: [{
        title: {
            text: 'Total Fund Value',
            style: {
              color: '#FFFFFF'
            }
        },
        gridLineWidth: 1,
        gridLineDashStyle: 'dot',
        labels: {
            formatter: function () {
                return this.value / 1000 + 'k';
            },
            style: {
              color: '#FFFFFF'
            }
        }
    },{
        title: {
            text: 'Net Asset Value',
            style: {
              color: '#FFFFFF'
            }
        },
        gridLineWidth: 1,
        gridLineDashStyle: 'dot',
        labels: {
            formatter: function () {
                return this.value / 1000 + 'k';
            },
            style: {
              color: '#FFFFFF'
            }
        },
        opposite: true
    }],
    plotOptions: {
        areaspline: {
          pointStart: Date.UTC(2006, 07, 01),
          pointInterval: 24 * 3600 * 1000,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
    legend: {
        layout: 'horizontal',
        verticalAlign: 'top',
        align: 'left',
        x: 50,
        floating: true,
        itemStyle: {
         color: '#FFFFFF'
        }
    },
    series: [{
        name: 'Total Fund Value',
        data: [1005, 4618, 10527, 24237, 1256, 1043, 2063, 4618, 110, 235, 369, 640,
            1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
            27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
            26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
            24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
            22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
            10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104],
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1},
          stops: [
            [0, '#5EE0FE'],
            [1, '#085790']
          ]
        }
    }, {
        name: 'Net Asset Value',
        yAxis: 1,
        data: [null, null, null, null, null, null, null, null, null, null,
            5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
            4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
            15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
            33952, 35804, 37431, 39197, 45000, 44324, 42123, 41330, 39300,
            35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
            21000, 20000, 19000, 18000, 18000, 17000, 16000],
        color: {
          linearGradient: { x1: 1, y1: 1, x2: 0, y2: 1},
          stops: [
            [0, '#AD2256'],
            [1, 'rgb(255, 27, 27)']
          ]
        }
      }],
      exporting: {
        enabled: false
      }
});
