hongcaiApp.controller("ProjectDetailsCtrl", ["$scope", "$state", "$stateParams", "ProjectService", function ($scope, $state, $stateParams, ProjectService) {
    var projectDetails = ProjectService.projectDetails.get({projectId: $stateParams.projectId}, function() {
        $scope.project = projectDetails.data.project;
        $scope.projectInfo = projectDetails.data.projectInfo;
        $scope.pledges = projectDetails.data.pledges;
        $scope.isAvailable = projectDetails.data.isAvailable;


    

        // var project = projectDetails.data.project;
        // var projectInfo = projectDetails.data.projectInfo;
        // var pledges = projectDetails.data.pledges;

        // 椤圭洰
        // $scope.name = project.name;
        // $scope.total = project.total;
        // $scope.annualEarnings = project.annualEarnings;
        // $scope.cycle = project.cycle;
        // $scope.description = project.description;

        // 椤圭洰淇℃伅
        // $scope.financingPurpose = projectInfo.financingPurpose;
        // $scope.repaymentSource = projectInfo.repaymentSource;

        $scope.isAvailableInvest = function(project){//验证用户权限
        ProjectService.isAvailableInvest.get({amount: project.amount,projectId:project.id }, function(response) {
            if(response.ret == 1) {
                console.info(response.data.isBalance);
                if (response.data.flag) {
                    if (response.data.isBalance) {
                         $state.go("root.invest-verify", {projectId: response.data.projectId,amount: response.data.amount});
                    }else{
                         $state.go("root.invest-verify", {projectId: response.data.projectId,amount: response.data.amount});
                    }
                   
                }else{
                    $state.go("root.userCenter.account-overview");
                }
                
            } else {
                
                //$scope.errorMessage = response.msg;
                //$scope.warning = true;
                $state.go('root.login');
            }
        });


    };
    });

    $scope.tabs = [
      {
        "title": "Home",
        "template": "/project-details-info.html"
      },
      {
        "title": "Profile",
        "template": "Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee."
      },
      {
        "title": "About",
        "template": "Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade."
      }
    ];
    $scope.tabs.activeTab = 0;
}]);

