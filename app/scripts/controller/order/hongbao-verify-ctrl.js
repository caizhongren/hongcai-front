hongcaiApp.controller('hongbaoVerifyCtrl', ['$scope', '$location', '$state', '$rootScope', '$stateParams', '$modal', 'OrderService', 'SessionService', 'config', '$window', '$alert', function ($scope, $location, $state, $rootScope, $stateParams, $modal, OrderService, SessionService, config, $window, $alert) {
    $scope.giftCount = 0;
    $scope.checkFlag = true;
    OrderService.hongbaoVerify.get({projectId: $stateParams.activityId, amount: $stateParams.amount, }, function(response) {

        if(response.ret == 1) {
           $scope.project = response.data.project;
           $scope.capital = response.data.capital;
           $scope.giftCount = response.data.giftCount;
           $scope.investAmount = $stateParams.amount;
           if($scope.investAmount > $scope.capital) {
            alert('亲，宏包超额了');
            $location.path('activity/' + $stateParams.activityId + '/' + 2);
           }
           $scope.icons = [
                {value :'',label:''},
            ];
            $scope.icons= [];
            for (var i= 0; i <= $scope.giftCount; i++){
                var obj = {};
                obj.value = '' + i + '';
                obj.label = '' + i + '';
                $scope.icons.push(obj);
            }
        }  else if (response.ret == -1){
            if (response.code == 1){
                alert('已经卖光啦！');
            } else {
                alert(response.msg);
            }
            $location.path('project-activity-group');
        }
    });

    $scope.saveHongYunOrder = function(project, investAmount){
      OrderService.saveHongYunOrder.get({projectId: project.id, investAmount: investAmount}, function(response) {
          if(response.ret == 1) {
            // $scope.msg = '已支付' + investAmount + '！' + '感谢您使用。';
            // var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
            $window.alert('支付成功,感觉您使用。');
            $state.go('root.userCenter.gift-rebate', {type: 99});

          }
      });
    }
}]);
