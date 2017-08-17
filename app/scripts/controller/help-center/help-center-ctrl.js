'use strict';
angular.module('hongcaiApp')
  .controller('HelpCenterCtrl', ['$scope', '$state', '$rootScope', '$location', function($scope, $state, $rootScope, $location) {
    var path = $location.path();
    if (path.indexOf('introduce') !== -1){
        $rootScope.pageTitle = '宏财介绍' + ' - 宏财网';
    } else if (path.indexOf('introduction-of-platform') !== -1){
        $rootScope.pageTitle = '宏财简介' + ' - 宏财网';
    } else if (path.indexOf('consultant-team') !== -1){
        $rootScope.pageTitle = '顾问团队' + ' - 宏财网';
    } else if (path.indexOf('hongcai-trends') !== -1){
        $rootScope.pageTitle = '宏财动态' + ' - 宏财网';
    } else if (path.indexOf('company-profile') !== -1){
        $rootScope.pageTitle = '加入宏财' + ' - 宏财网';
    } else if (path.indexOf('introduce') !== -1){
        $rootScope.pageTitle = '宏财介绍' + ' - 宏财网';
    } else if (path.indexOf('investors') !== -1){
        $rootScope.pageTitle = '投资简介' + ' - 宏财网';
    } else if (path.indexOf('product') !== -1){
        $rootScope.pageTitle = '产品介绍' + ' - 宏财网';
    } else if (path.indexOf('account-management') !== -1){
        $rootScope.pageTitle = '账户管理' + ' - 宏财网';
    } else if (path.indexOf('safety-certification') !== -1){
        $rootScope.pageTitle = '安全认证' + ' - 宏财网';
    } else if (path.indexOf('law-and-policy-guarantee') !== -1){
        $rootScope.pageTitle = '法律保障' + ' - 宏财网';
    } else if (path.indexOf('other-question') !== -1){
        $rootScope.pageTitle = '其他问题' + ' - 宏财网';
    }

    

    
    $scope.menus = {
      'left': [{
        'href': '/introduce',
        'link': 'root.help-center.introduce',
        'text': '宏财介绍'
      }, {
        'href': '/investors',
        'link': 'root.help-center.investors',
        'text': '投资介绍'
      }, {
        'href': '/assignment_qr',
        'link': 'root.help-center.assignment_qr',
        'text': '债权转让'
      }, {
        'href': '/account-management',
        'link': 'root.help-center.account-management',
        'text': '账户管理'
      }, {
        'href': '/safety-certification',
        'link': 'root.help-center.safety-certification',
        'text': '安全认证'
      }, {
        'href': '/law-and-policy-guarantee',
        'link': 'root.help-center.law-and-policy-guarantee',
        'text': '法律保障'
      }, {
        'href': '/other-question',
        'link': 'root.help-center.other-question',
        'text': '其他问题'
      }]
    };
    $scope.events = [
      {
        time: '2014年12月',
        event: '宏财网正式上线运营'
      },
      {
        time: '2014年12月',
        event: '宏财网创始人、董事长刘刚博士担任首都企业改革研究会常务理事'
      },
      {
        time: '2014年12月',
        event: '宏财网董事长刘刚博士担任首都经贸大学MBA导师'
      },
      {
        time: '2015年05月',
        event: '国家发改委原中小企业司王远枝司长莅临宏财网考察'
      },
      {
        time: '2015年06月',
        event: '宏财网董事长刘刚博士荣登《当代经理人》杂志封面人物'
      },
      {
        time: '2015年09月',
        event: '宏财网被评为人民网2015全国“中小企业服务体系创新典型案例”'
      },
      {
        time: '2016年03月',
        event: '宏财网成为中国中小企业协会会员'
      },
      {
        time: '2016年03月',
        event: '宏财网入驻中国中小企业信息网（www.sme.gov.cn）首页，成为国内唯一一家在政府网站展示宣传的互联网金融企业'
      },
      {
        time: '2016年04月',
        event: '与新三板金控第一股鑫融基金控股份有限公司建立战略合作伙伴关系'
      },
      {
        time: '2016年05月',
        event: 'A轮融资获国企战略投资1亿元'
      },
      {
        time: '2016年10月',
        event: '成为首批接入北京金融局、北京网贷行业协会发起的“北京网贷存管通”平台的互金企业'
      },
      {
        time: '2016年11月',
        event: '正式加入北京网贷行业协会，与投哪网、微贷网等互金平台同时获得观察员身份'
      },
      {
        time: '2016年12月',
        event: '宏财网董事长刘刚博士被芜湖市镜湖区政府聘任为创业导师'
      },
      {
        time: '2017年03月',
        event: '荣获“2016年度中国互联网放心网站”称号'
      },
      {
        time: '2017年03月',
        event: '荣获“2016年度中国互联网金融行业优秀示范企业”称号'
      },
      {
        time: '2017年04月',
        event: '宏财网与海口联合农商银行正式签订银行存管协议'
      },
      {
        time: '2017年06月',
        event: '宏财网银行存管系统正式上线，迈入网贷平台合规阵营，进入新的发展期'
      }
    ]

    $rootScope.selectPage = $location.path().split('/')[1];
    $scope.changeIntroduceQ1 = false;
    $scope.changeIntroduceQ2 = false;

    $scope.changeInvestorsQ1 = false;
    $scope.changeInvestorsQ2 = false;
    $scope.changeInvestorsQ3 = false;
    $scope.changeInvestorsQ4 = false;
    $scope.changeInvestorsQ5 = false;
    $scope.changeInvestorsQ6 = false;
    $scope.changeInvestorsQ7 = false;
    $scope.changeInvestorsQ8 = false;
    $scope.changeInvestorsQ9 = false;
    $scope.changeInvestorsQ10 = false;
    $scope.changeInvestorsQ11 = false;
    $scope.changeInvestorsQ12 = false;
    $scope.changeInvestorsQ13 = false;
    $scope.changeInvestorsQ14 = false;
    $scope.changeInvestorsQ15 = false;
    $scope.changeInvestorsQ16 = false;
    $scope.changeInvestorsQ17 = false;
    $scope.changeInvestorsQ18 = false;

    $scope.changeAssignment_qrQ1 = false;
    $scope.changeAssignment_qrQ2 = false;
    $scope.changeAssignment_qrQ3 = false;
    $scope.changeAssignment_qrQ4 = false;
    $scope.changeAssignment_qrQ5 = false;
    $scope.changeAssignment_qrQ6 = false;
    $scope.changeAssignment_qrQ7 = false;
    $scope.changeAssignment_qrQ8 = false;
    $scope.changeAssignment_qrQ9 = false;
    $scope.changeAssignment_qrQ10 = false;
    $scope.changeAssignment_qrQ11 = false;
    $scope.changeAssignment_qrQ12 = false;
    $scope.changeAssignment_qrQ13 = false;
    $scope.changeAssignment_qrQ14 = false;
    $scope.changeAssignment_qrQ15 = false;
    $scope.changeAssignment_qrQ16 = false;

    $scope.changeAccountQ1 = false;
    $scope.changeAccountQ2 = false;
    $scope.changeAccountQ3 = false;
    $scope.changeAccountQ4 = false;
    $scope.changeAccountQ5 = false;
    $scope.changeAccountQ6 = false;
    $scope.changeAccountQ7 = false;
    $scope.changeAccountQ8 = false;

    $scope.changeSafeQ1 = false;
    $scope.changeSafeQ2 = false;
    $scope.changeSafeQ3 = false;
    $scope.changeSafeQ4 = false;
    $scope.changeSafeQ5 = false;
    $scope.changeSafeQ6 = false;
    $scope.changeSafeQ7 = false;
    $scope.changeSafeQ8 = false;

    $scope.changeLawQ1 = false;
    $scope.changeLawQ2 = false;
    $scope.changeLawQ3 = false;
    $scope.changeLawQ4 = false;

    $scope.changePosition1 = false;
    $scope.changePosition2 = false;
    $scope.changePosition3 = false;
    $scope.changePosition4 = false;
    $scope.changePosition5 = false;
    $scope.changePosition6 = false;
    $scope.changePosition7 = false;
    $scope.changePosition8 = false;
    $scope.changePosition9 = false;
    $scope.changePosition10 = false;

    $scope.changeOther1 = false;
    $scope.changeOther2 = false;
    $scope.changeOther3 = false;

    $scope.jinYing1 = false;
    $scope.jinYing2 = false;
    $scope.jinYing3 = false;
    $scope.jinYing4 = false;
    $scope.jinYing5 = false;

  }]);
