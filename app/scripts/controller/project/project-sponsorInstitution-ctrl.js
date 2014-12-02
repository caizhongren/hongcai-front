hongcaiApp.controller('ProjectSponsorInstitutionCtrl', ['$scope', '$stateParams', '$location', 'ProjectService' ,function ($scope, $stateParams, $location, ProjectService) {
    $scope.sortType = $stateParams.sortType || false ;

    var sponsorInstitution = ProjectService.sponsorInstitution.get({guaranteeId: $stateParams.guaranteeId}, function() {
        $scope.projectList = sponsorInstitution.data.projectList;
        $scope.guarantee = sponsorInstitution.data.guarantee;
        $scope.guaranteeProjectVo = sponsorInstitution.data.guaranteeProjectVo;
        $scope.originalFile = sponsorInstitution.data.originalFile;

        /*$scope.imgs = [];
        for(var i=0; i<$scope.originalFile.length;i++){
            var item = {};
            item.title = $scope.originalFile[i].uploadFile.originalName;
            item.src = $scope.originalFile[i].uploadFile.url;
            $scope.imgs.push(item);
        }

        console.log($scope.imgs)

        $(function(){
            $('#slider').sudySlider($scope.imgs);
        });*/

        $scope.media = [
          {mimeType: 'image/png', src:'images/banner-1.png', href:'' },
          {mimeType: 'image/png', src:'images/banner-2.png', href:'' },
          {mimeType: 'image/png', src:'images/banner-3.png', href:'banner-nine.html'},
          {mimeType: 'image/png', src:'images/banner-4.png', href:'' },
          {mimeType: 'image/png', src:'images/banner-5.png', href:'' }
        ];
        $scope.slickConfig = {
          dots: true,
          autoplay: true,
          autoplaySpeed: 3000,
          onAfterChange: function(slick, index) {
              var slides = $('.slick-track').children().not('.slick-cloned');
              if (index >= slides.length) return;
              // $(slides[index]).find('video').each(playVideo);
          }
        };
        $scope.slickHandle = {
        };

    });
  
}]);



