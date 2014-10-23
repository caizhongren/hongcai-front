hongcaiApp.controller("GuaranteeListCtrl", ["$scope", "$stateParams", "$location", "GuaranteeService" ,function ($scope, $stateParams, $location, GuaranteeService) {
    $scope.sortType = $stateParams.sortType || false ;

    var sponsor = GuaranteeService.guaranteeList.get(function() {
        $scope.guaranteeList = sponsor.data.guaranteeList;
        console.info($scope.guaranteeList);
    });

    $scope.imgs = [
        {
            title:"百度",
            src:'images/test/0.png'
        },
        {
            title:"腾讯",
            src:'images/test/1.png'
        },
        {
            title:"搜狐",
            src:'images/test/2.png'
        },
        {
            title:"网易",
            src:'images/test/3.png'
        },
        {
            title:"优酷",
            src:'images/test/4.png'
        },
        {
            title:"土豆",
            src:'images/test/5.png'
        },
        {
            title:"雅虎",
            src:'images/test/6.png'
        },
        {
            title:"网易",
            src:'images/test/7.png'
        },
        {
            title:"优酷",
            src:'images/test/8.png'
        },
        {
            title:"土豆",
            src:'images/test/9.png'
        },
        {
            title:"雅虎",
            src:'images/test/10.png'
        }
    ];

    $(function(){
        $("#slider").sudySlider($scope.imgs);
    });

    if($(window).scrollTop()>100){
        $('body,html').animate({scrollTop:0},800);
    }

}]);



