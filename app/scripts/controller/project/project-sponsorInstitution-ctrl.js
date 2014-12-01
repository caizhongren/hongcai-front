hongcaiApp.controller('ProjectSponsorInstitutionCtrl', ['$scope', '$stateParams', '$location', 'ProjectService' ,function ($scope, $stateParams, $location, ProjectService) {
    $scope.sortType = $stateParams.sortType || false ;

    var sponsorInstitution = ProjectService.sponsorInstitution.get({guaranteeId: $stateParams.guaranteeId}, function() {
        $scope.projectList = sponsorInstitution.data.projectList;
        $scope.guarantee = sponsorInstitution.data.guarantee;
        $scope.guaranteeProjectVo = sponsorInstitution.data.guaranteeProjectVo;
        $scope.originalFile = sponsorInstitution.data.originalFile;

        $scope.imgs = [];
        for(i in sponsorInstitution.data.originalFile){
            var item = {};
            item.title = $scope.originalFile[i].uploadFile.originalName;
            item.src = $scope.originalFile[i].uploadFile.url;
            $scope.imgs.push(item);
        }

        $(function(){
            $('#slider').sudySlider($scope.imgs);
        });

    });
  
}]);



