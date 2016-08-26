'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);


angular.module('core').controller('HighChartsController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    console.log('HighChartsController');

    $scope.addPoints = function () {
      var seriesArray = $scope.chartConfig.series;
      var rndIdx = Math.floor(Math.random() * seriesArray.length);
      seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);
    };

    $scope.addSeries = function () {
      var rnd = [];
      for (var i = 0; i < 10; i++) {
        rnd.push(Math.floor(Math.random() * 20) + 1);
      }
      $scope.chartConfig.series.push({
        data: rnd
      });
    };

    $scope.removeRandomSeries = function () {
      var seriesArray = $scope.chartConfig.series;
      var rndIdx = Math.floor(Math.random() * seriesArray.length);
      seriesArray.splice(rndIdx, 1);
    };

    $scope.swapChartType = function () {
      if (this.chartConfig.options.chart.type === 'line') {
        this.chartConfig.options.chart.type = 'bar';
      } else {
        this.chartConfig.options.chart.type = 'line';
        this.chartConfig.options.chart.zoomType = 'x';
      }
    };

    $scope.toggleLoading = function () {
      this.chartConfig.loading = !this.chartConfig.loading;
    };

    $scope.chartConfig = {
      options: {
        chart: {
          zoomType: 'x',
          type: 'line'
        },
        rangeSelector: {
          enabled: true
        },
        navigator: {
          enabled: true
        }
      },
      series: [],
      title: {
        text: 'Kudos Created per Day'
      }
    };

    $scope.chartConfig.series.push({
      id: 1,
      data: [
        [1147651200000, 23.15],
        [1147737600000, 23.01],
        [1147824000000, 22.73],
        [1147910400000, 22.83],
        [1147996800000, 22.56],
        [1148256000000, 22.88],
        [1148342400000, 22.79],
        [1148428800000, 23.50],
        [1148515200000, 23.74],
        [1148601600000, 23.72],
        [1148947200000, 23.15],
        [1149033600000, 22.65]
      ]
    }, {
      id: 2,
      data: [
        [1147651200000, 25.15],
        [1147737600000, 25.01],
        [1147824000000, 25.73],
        [1147910400000, 25.83],
        [1147996800000, 25.56],
        [1148256000000, 25.88],
        [1148342400000, 25.79],
        [1148428800000, 25.50],
        [1148515200000, 26.74],
        [1148601600000, 26.72],
        [1148947200000, 26.15],
        [1149033600000, 26.65]
      ]
    }
    );


  }
]);