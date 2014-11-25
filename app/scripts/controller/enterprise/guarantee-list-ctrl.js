hongcaiApp.controller('GuaranteeListCtrl', ['$scope', '$stateParams', '$location', 'GuaranteeService' ,function ($scope, $stateParams, $location, GuaranteeService) {
    $scope.sortType = $stateParams.sortType || false ;

    var sponsor = GuaranteeService.guaranteeList.get(function() {
        $scope.guaranteeList = sponsor.data.guaranteeList;
        console.log($scope.guaranteeList)
    });

    $scope.media = [
        {'items':
            [
                {src:'images/sponsor.png', href:'/',name:'天天担保',registerCapital:'500',id:'12'},
                {src:'images/sponsor.png', href:'/',name:'天nht担保',registerCapital:'500',id:'12'},
                {src:'images/sponsor.png', href:'/',name:'天hth担保',registerCapital:'500',id:'12'},
                {src:'images/sponsor.png', href:'/',name:'天nht担保',registerCapital:'500',id:'12'},
                {src:'images/sponsor.png', href:'/',name:'天hth担保',registerCapital:'500',id:'12'},
                {src:'images/sponsor.png', href:'/',name:'天nht担保',registerCapital:'500',id:'12'},
                {src:'images/sponsor.png', href:'/',name:'天hth担保',registerCapital:'500',id:'12'},
                {src:'images/sponsor.png', href:'/',name:'天nht担保',registerCapital:'500',id:'12'},
                {src:'images/sponsor.png', href:'/',name:'天hth担保',registerCapital:'500',id:'12'}
            ]
        }
        ,{'items':
            [
                {src:'images/sponsor.png', href:'/',name:'hgjj担保',registerCapital:'500',id:'12'},
                {src:'images/sponsor.png', href:'/',name:' rdhtt担保',registerCapital:'500',id:'12'},
                {src:'images/sponsor.png', href:'/',name:'gfh担保',registerCapital:'500',id:'12'}
            ]
        }
       
        // {src:'images/banner-3.png', href:'' }
    ];

    $scope.slickConfig = {
        dots: true,
        // autoplay: true,
        autoplaySpeed: 3000,
        onAfterChange: function(slick, index) {
            var slides = $('.slick-track').children().not('.slick-cloned');
            if (index >= slides.length) return;
            // $(slides[index]).find('video').each(playVideo);
        }
    };

    $scope.slickHandle = {};


}]);



