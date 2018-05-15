// Get all "navbar-burger" elements
var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
// Check if there are any navbar burgers
if ($navbarBurgers.length > 0) {
  // Add a click event on each of them
  $navbarBurgers.forEach(function($el) {
    $el.addEventListener('click', function() {
      // Get the target from the "data-target" attribute
      var target = $el.dataset.target;
      var $target = document.getElementById(target);
      // Toggle the class on both the "navbar-burger" and the "navbar-menu"
      $el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
}
// var video = document.getElementById("video");
// console.log(video);
// $(window).scroll(function(){
//   //video.pause();
//   $('#full-screen-video').fadeOut(1500, function(){ $(this).remove();});
// });

/* Sharpe ratio API*/
(function loadFeed(){
  $.ajax({
    type: 'GET',
    url: 'http://coinhub.capital/cob/api/tg30.php',
    dataType: 'json',
    // beforeSend: function (xhr) {
    //    xhr.setRequestHeader("Authorization", make_base_auth());
    //  },
     success: function(data){
       console.log(data);
       var trHTML = '';
       for(var i=0; i < 4; i++){
         trHTML += '<tr><td class="statsTable" style="color: #FFFFFF">' + data[i].label + '</td>' +
                  '<td class="statsTable">' + data[i].r2 + '</td>' +
                  '<td class="statsTable">' + data[i].beta + '</td>' +
                  '<td class="statsTable">' + data[i].alpha + '</td></tr>'
         $('#statistics').find('tbody').html(trHTML);
       };
       $("#sharperatio").html(data[4].sharperatio);
       $("#monthlyvolatility").html(data[4].monthlyvolatility);
       $("#bitcoinsharpe").html(data[4].bitcoinsharpe);
       $("#yearlyvolatility").html(data[4].yearlyvolatility);
     },
     complete: function(){
       // Schedule the next request when the current one's complete
      setTimeout(loadFeed, 24 * 60 * 60 * 1000);
     }
  });
})();

/* CAP03 13 quantity */
(function loadFeed(){
  $.ajax({
    type: 'GET',
    url: 'http://coinhub.capital/cob/api/tg-cap-150.php',
    //url: 'http://coinhub.capital/cob/api/tg-cap-150.php',
    dataType: 'json',
    // beforeSend: function (xhr) {
    //    xhr.setRequestHeader("Authorization", make_base_auth());
    //  },
    success: function(data){
      console.log(data);
      for(var i = 0; i < data.length; i++){
        $("#icon_" + i).attr('src', '/performance/assets/transparent/' + data[i].label.toLowerCase() + '.svg');
        $("#label_" + i).html(data[i].label);
        $("#title_" + i).html(data[i].coin);
        $("#title_price_" + i).html('$' + data[i].usd.toLocaleString());
        if(data[i].change1h < 0) {
          $("#1hr_" + i).css('color', '#FF001F');
          $("#1hr_" + i).html(data[i].change1h + '%&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
        }else {
          $("#1hr_" + i).css('color', '#6ECA09');
          $("#1hr_" + i).html(data[i].change1h + '%&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
        };
        if(data[i].change24h < 0) {
          $("#24hr_" + i).css('color', '#FF001F');
          $("#24hr_" + i).html(data[i].change24h + '%&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
        }else {
          $("#24hr_" + i).css('color', '#6ECA09');
          $("#24hr_" + i).html(data[i].change24h + '%&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
        };
        if(data[i].change1w < 0){
          $("#1w_" + i).css('color', '#FF001F');
          $("#1w_" + i).html(data[i].change1w + '%&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
        }else {
          $("#1w_" + i).css('color', '#6ECA09');
          $("#1w_" + i).html(data[i].change1w + '%&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
        };
        $("#incirculation_" + i).html(data[i].circulation.toLocaleString());
        $("#marketcap_" + i).html('$' + data[i].marketcap.toLocaleString());
      }
    },
    complete: function(){
      // Schedule the next request when the current one's complete
     setTimeout(loadFeed, 30 * 60 * 15000);
    }
  });
})();

/* NAV and Table of holding API */
// if(window.location.hostname == '127.0.0.1') {
//   url = 'http://127.0.0.1:8081/netasset.json';
// }else if(window.location.hostname == 'coinhub.capital') {
//   url = 'http://coinhub.capital/cob/api/tg-cap.php?q=13';
// }
(function loadFeed(){
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'http://coinhub.capital/cob/api/tg-cap.php?q=13',
    // beforeSend: function (xhr) {
    //    xhr.setRequestHeader("Authorization", make_base_auth());
    //  },
     success: function(data){
       console.log(data);
       $("#nav").html('$' + data.info["nav"]);
       if(data.info["nav-historical"] < 0) {
         $("#navHistorical").css('color', '#FF001F');
         $("#navHistorical").html(data.info["nav-historical"].toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
         $("#navHistoricalPct").css('color', '#FF001F');
         $("#navHistoricalPct").html(data.info["nav-historical-pct"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
       } else {
         $("#navHistorical").css('color', '#6ECA09');
         $("#navHistorical").html('+' + data.info["nav-historical"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
         $("#navHistoricalPct").css('color', '#6ECA09');
         $("#navHistoricalPct").html('+' + data.info["nav-historical-pct"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
       }
       if(data.info["nav-hour"] < 0) {
         $("#navIndexHour").css('color', '#FF001F');
         $("#navIndexHour").html(data.info["nav-hour"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
         $("#navIndexHourPct").css('color', '#FF001F');
         $("#navIndexHourPct").html(data.info["nav-hour-pct"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
       } else {
         $("#navIndexHour").css('color', '#6ECA09');
         $("#navIndexHour").html('+' + data.info["nav-hour"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
         $("#navIndexHourPct").css('color', '#6ECA09');
         $("#navIndexHourPct").html('+' + data.info["nav-hour-pct"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
       }
       if(data.info["nav-day"] < 0) {
         $("#navIndexDay").css('color', '#FF001F');
         $("#navIndexDay").html(data.info["nav-day"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
         $("#navIndexDayPct").css('color', '#FF001F');
         $("#navIndexDayPct").html(data.info["nav-day-pct"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
       } else {
         $("#navIndexDay").css('color', '#6ECA09');
         $("#navIndexDay").html('+' + data.info["nav-day"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
         $("#navIndexDayPct").css('color', '#6ECA09');
         $("#navIndexDayPct").html('+' + data.info["nav-day-pct"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
       }
       if(data.info["nav-week"] < 0) {
         $("#navIndexWeek").css('color', '#FF001F');
         $("#navIndexWeek").html(data.info["nav-week"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
         $("#navIndexWeekPct").css('color', '#FF001F');
         $("#navIndexWeekPct").html(data.info["nav-week-pct"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
       } else {
         $("#navIndexWeek").css('color', '#6ECA09');
         $("#navIndexWeek").html('+' + data.info["nav-week"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
         $("#navIndexWeekPct").css('color', '#6ECA09');
         $("#navIndexWeekPct").html('+' + data.info["nav-week-pct"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
       }
       if(data.info["nav-month"] < 0) {
         $("#navIndexMonth").css('color', '#FF001F');
         $("#navIndexMonth").html(data.info["nav-month"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
         $("#navIndexMonthPct").css('color', '#FF001F');
         $("#navIndexMonthPct").html(data.info["nav-month-pct"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-r-down.svg">');
       } else {
         $("#navIndexMonth").css('color', '#6ECA09');
         $("#navIndexMonth").html('+' + data.info["nav-month"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
         $("#navIndexMonthPct").css('color', '#6ECA09');
         $("#navIndexMonthPct").html('+' + data.info["nav-month-pct"] + '&nbsp;&nbsp;' + '<img src="/performance/assets/tri/tri-6-g-up.svg">');
       }
       $("#capsupply").html(data.info["cap-supply"]);
       $("#fundsize").html('$' + data.info["fundsize"]);
       $("#ofallmarketcap").html(data.info["ofallmarketcap"]);
       var trHTML = '';
       for (var i = 0; i < data.symbol.length; i++) {
         trHTML += '<tr><td class="holdingCoin table_holdings_coin" id="table_holdings_coin"><img src="/performance/assets/transparent/' + data.symbol[i].label.toLowerCase() + '.svg" style="padding-left: 5px;">&nbsp;' + data.symbol[i].coin + '</td>' +
                   '<td class="holdingTable" id="table_holdings_amout">' + data.symbol[i].amount + '</td>' +
                   '<td class="holdingTable" id="table_holdings_usd">' + '$' + data.symbol[i].usd.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) + '</td>' +
                   '<td class="holdingTable" id="table_holdings_percentage">' + data.symbol[i].percent + '</td>' +
                   '<td class="holdingTable" id="table_holdings_marketcap">' + '$' + data.symbol[i].marketcap.toLocaleString() + '</td>' +
                   '<td class="holdingTable" id="table_holdings_price">' + '$' + data.symbol[i].price.toFixed(2) + '</td>' +
                   '<td class="holdingTable" id="table_holdings_volume">' + '$' + data.symbol[i].value24h.toLocaleString() + '</td>' +
                   '<td class="holdingTable" id="table_holdings_circulating">' + data.symbol[i].circulation.toLocaleString() + '</td>' +
                   '<td class="holdingTable" id="table_holdings_change">' + data.symbol[i].change24h + '%' + '</td></tr>'
         $('#tableholdings').find('tbody').html(trHTML);
       };
     }
     // complete: function(){
     //   // Schedule the next request when the current one's complete
     //  setTimeout(loadFeed, 24 * 60 * 60 * 1000);
     // }
  });
})();

/* Historical Data Highstock */
$(document).on('click', '.table_holdings_coin', function(){
  var cval = $(this).text().toLowerCase().trim();
  console.log(cval);
  $(".modal").addClass('is-active');
  $('html').addClass('is-clipped');

  /* Historical data highchart array */
  var processed_marketcap = [];
  var processed_priceusd = [];
  var processed_pricebtc = [];
  var processed_volumeusd = [];

  /* Determine the url path */
  url = 'http://coinhub.capital/cob/api/tg-tv-tech.php?start=2017-01-01&symbol=' + cval;
  $.getJSON(url, function (data) {
    console.log(data);
    // Populate series
    for (i = 0; i < data.length; i++){
      processed_marketcap.push(data[i].marketcap);
      processed_pricebtc.push(data[i].pricebtc);
      processed_priceusd.push(data[i].priceusd);
      processed_volumeusd.push(data[i].volumeusd)
    }
    // Draw Chart
    Highcharts.setOptions({
      lang: {
          thousandsSep: ',',
          alignTicks: false
      }
    });
    Highcharts.stockChart('historicalstock', {
      chart: {
        zoomType: 'x'
      },
      rangeSelector: {
        selected: 4,
        inputStyle: {
          color: '#FFFFFF'
        },
        labelStyle: {
          color: '#FFFFFF'
        }
      },
      yAxis: [{
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
        height: '70%',
        opposite:false
      },
      {
        title: {
          text: 'Price (USD)',
          style: {
            color: '#FFFFFF'
          },
          color: '#F7931A'
        },
        labels: {
          formatter: function () {
            return '$' + this.axis.defaultLabelFormatter.call(this);
          },
          style: {
            color: '#FFFFFF'
          }
        },
        height: '70%',
        opposite: true
      },
      {
        title: {
          text: 'Price (BTC)',
          style: {
            color: '#FFFFFF'
          }
        },
        labels: {
          formatter: function () {
            return this.value + ' BTC'
          },
          style: {
            color: '#FFFFFF'
          }
        },
        height: '70%',
        opposite: true
      },
      {
        title: {
          text: '24h Vol',
          style: {
            color: '#FFFFFF'
          }
        },
        labels: {
          formatter: function () {
            return this.axis.defaultLabelFormatter.call(this);
          },
          style: {
            color: '#FFFFFF'
          }
        },
        top: '75%',
        height: '25%',
        offset: 0,
        lineWidth: 2,
        opposite: false
      }],
      tooltip: {
        shared: true,
        split:  false
      },
      series: [{
        name: 'Market Cap',
        data: processed_marketcap,
        tooltip: {
          valueSuffix: ' USD'
        }
      }, {
        name: 'Price (USD)',
        data: processed_priceusd,
        yAxis: 1,
        tooltip: {
          valueDecimals: 2
        },
        color: '#F7931A'
      }, {
        name: 'Price (BTC)',
        data: processed_pricebtc,
        yAxis: 2,
        color: '#90ED7D'
      }, {
        name: '24h Vol',
        data: processed_volumeusd,
        type: 'column',
        tooltip: {
          valueSuffix: ' USD'
        },
        yAxis: 3
      }]
    });
  });
});
$(".modal-background, .modal-close").on('click', function(){
  $(".modal").removeClass('is-active');
  $('html').removeClass('is-clipped');
});

//Icon on hover
// $("#icon_1").hover(function() {
//     $('#icon_1').attr("src", "../src/scenes/Performance/assets/color/eth.svg");
// }, function() {
//     $('#icon_1').attr("src", '../src/scenes/Performance/assets/white/eth.svg');
// });

// $("#icon_0").mouseover(function() {
//   $("#icon_0").css("transform", "rotate(30deg)");
// });
// $("#icon_0").mouseout(function() {
//   $("#icon_0").css("transform", "rotate(0deg)");
// });

function make_base_auth() {
  var tok = 'webuser' + ':' + 'tixguru123';
  var hash = btoa(tok);
  return 'Basic ' + hash;
}
