'use strict';
hongcaiApp.controller('ProjectSponsorInstitutionCtrl', ['$scope', '$stateParams', '$location', '$timeout', 'ProjectService', '$http', 'analytics', function ($scope, $stateParams, $location, $timeout, ProjectService, $http, analytics) {
    $scope.sortType = $stateParams.sortType || false ;

    var sponsorInstitution = ProjectService.sponsorInstitution.get({guaranteeId: $stateParams.guaranteeId}, function() {
        $scope.projectList = sponsorInstitution.data.projectList;
        $scope.guarantee = sponsorInstitution.data.guarantee;
        $scope.guaranteeProjectVo = sponsorInstitution.data.guaranteeProjectVo;
        $scope.originalFile = sponsorInstitution.data.originalFile;
        $scope.thumbnailFile = sponsorInstitution.data.thumbnailFile;
        $scope.baseFileUrl = sponsorInstitution.data.baseFileUrl;

        //控制展开按钮展示
        var arr = $scope.guarantee.description.split('');
        arr.length <= 709 ? $('.fa').hide() : $('.fa').show();

        $scope.currentPage = 0;
        $scope.pageSize = 6;
        $scope.data = [];

        $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
        }
        for (var i = 0; i < $scope.projectList.length; i++) {
            $scope.data.push($scope.projectList[i]);
        }

        //console.log(sponsorInstitution.data)

        $scope.files = [];
        for(var i=0; i<$scope.originalFile.length;i++){
            var item = {};
            item.title = $scope.originalFile[i].uploadFile.originalName;
            item.src = $scope.thumbnailFile[i].uploadFile.url;
            item.href = $scope.originalFile[i].uploadFile.url;
            $scope.files.push(item);
        }

        var promise = $timeout(function(){
            if($('.slideshow').find('.slick-item').length === $scope.originalFile.length){
                $('.slideshow').slick({
                    dots: false,
                    arrows: true,
                    autoplay: true,
                    autoplaySpeed: 1500,
                    slidesToShow: 4,
                    slidesToScroll: 4
                });
                $timeout.cancel(promise);
            }

        },10);



    });

    $scope.changeScale = function(){
        if($('.fa').hasClass('fa-arrow-down')){
            $('.sponsor-description').css({'height':'auto'});
            $('.fa').removeClass('fa-arrow-down');
            $('.fa').addClass('fa-arrow-up');
            $('.fa').css({'right':'20px'});
            $('.fa').text('收起');
        }else {
            $('.sponsor-description').css({'height':'363px'});
            $('.fa').removeClass('fa-arrow-up');
            $('.fa').addClass('fa-arrow-down');
            $('.fa').css({'right':'33.4%'});
            $('.fa').text('展开');
        }
      
    }
  
}]);



