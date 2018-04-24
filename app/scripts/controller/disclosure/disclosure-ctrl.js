'use strict';
angular.module('hongcaiApp')
  .controller('disclosureCtrl', ['$scope', '$state', '$rootScope', '$location', 'AboutUsService', function($scope, $state, $rootScope, $location, AboutUsService) {
    $scope.menus = {
      'left': [{
        'href': '/disclosure/bank-disclosure',
        'link': 'root.disclosure.bank-disclosure',
        'text': '承诺函'
      },{
        'href': '/disclosure/information',
        'link': 'root.disclosure.information',
        'text': '备案信息'
      },
      {
        'href': '/disclosure/organization',
        'link': 'root.disclosure.organization',
        'text': '组织信息'
      },
      {
        'href': '/disclosure/risk-management',
        'link': 'root.disclosure.risk-management',
        'text': '审核信息'
      },
      {
        'href': '/disclosure/business-information',
        'link': 'root.disclosure.business-information',
        'text': '经营信息'
      },
      {
        'href': '/disclosure/policies-regulations',
        'link': 'root.disclosure.policies-regulations',
        'text': '其他信息'
      }]
    };
    $scope.businessInfo = [
      {
        name: '平台名称',
        content: '宏财网'
      },
      {
        name: '公司名称',
        content: '北京竞财投资服务有限公司'
      },
      {
        name: '公司简称',
        content: '北京竞财；竞财'
      },
      {
        name: '统一社会信用代码',
        content: '91110107330246732H'
      },
      {
        name: '公司注册资本',
        content: '1000万'
      },
      {
        name: '公司实缴资本',
        content: '1300万'
      },
      {
        name: '公司注册地',
        content: '北京市工商行政管理局石景山分局'
      },
      {
        name: '公司经营地',
        content: '北京市海淀区中关村南二条一号中科院国家空间中心九章大厦B'
      },
      {
        name: '公司成立时间',
        content: '2015-1-23'
      },
      {
        name: '官网网站正式上线运营时间',
        content: '2015-2-2'
      },
      {
        name: 'APP上线运营时间',
        content: '2017-3-13'
      },
      {
        name: '公司经营期限',
        content: '2015-1-23至2035-1-22'
      },
      {
        name: '公司经营状态',
        content: '开业'
      },
      {
        name: '公司法定代表人',
        content: '刘刚'
      },
      {
        name: '实际控制人',
        content: '刘刚'
      },
      {
        name: '董事',
        content: '刘刚；李青；邓铁军'
      },
      {
        name: '监事',
        content: '王静波'
      },
      {
        name: 'CEO',
        content: '王斌'
      },
      {
        name: '公司经营范围',
        content: '投资咨询；投资管理；资产管理；财务咨询（不得开展审计、验资、查账、评估、会计咨询、代理记账等需经专项审批的业务，不得出具相应的审计报告、验资报告、查账报告、评估报告等文字材料）；项目投资；企业管理咨询；公关策划；经济信息咨询；市场调查'
      }
    ],
    $scope.policiesList = [
      {
        title: '中华人民共和国电子签名法',
        link: 'http://www.gov.cn/flfg/2005-06/27/content_9785.htm'
      },
      {
        title: '中华人民共和国网络安全法',
        link: 'http://www.gov.cn/xinwen/2016-11/07/content_5129723.htm'
      },
      {
        title: '中华人民共和国反洗钱法',
        link: 'http://www.gov.cn/flfg/2006-10/31/content_429381.htm'
      },
      {
        title: '最高人民法院关于审理民间借贷案件适用法律若干问题的规定',
        link: 'http://www.court.gov.cn/fabu-xiangqing-15146.html'
      },
      {
        title: '中国人民银行等十部委发布《关于促进互联网金融健康发展的指导意见》',
        link: 'http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/DD36A6654C7E4D0D9D658E712BFB46C5.html'
      },
      {
        title: '网络借贷信息中介机构业务活动管理暂行办法',
        link: 'http://www.cbrc.gov.cn/govView_37D312933F1A4CECBC18F9A96293F450.html'
      },
      {
        title: 'P2P网络借贷风险专项整治工作实施方案',
        link: 'http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/D81B52D3D20A49A99522C48FA8F1C752.html'
      },
      {
        title: '网络借贷信息中介机构备案登记管理指引----无链接',
        link: 'http://www.cbrc.gov.cn/govView_C8D68D4C980A4410B9F4E21BA593B4F2.html'
      },
      {
        title: '网络借贷资金存管业务指引',
        link: 'http://www.cbrc.gov.cn/govView_4201EF03472544038242EED1878597CB.html'
      },
      {
        title: '网络借贷信息中介机构业务活动信息披露指引',
        link: 'http://www.cbrc.gov.cn/govView_C8D68D4C980A4410B9F4E21BA593B4F2.html'
      }
    ]
    $scope.gotopoliciesWeb = function (link) {
      window.location.href = link
    }
    $rootScope.selectPage = $location.path().split('/')[1];
    $scope.cumulative = {
      amount: 0, // 累计交易总额
      numOfTransactions: 0, // 累计交易笔数
      userCount: 0, // 累计注册会员数
      investingTotalLoanAmount: 0, // 借贷余额
      investingNumOfTransactions: 0, // 待还借款笔数
      numOfLends: 0, // 累计出借人数
      numOfBorrows: 0, // 累计借款人数
      currentNumOfLends: 0, // 当前出借人数
      currentNumOfBorrows: 0, // 当前借款人数
      lastMonthTotalLoanAmount: 0, // 上个月借贷余额
      sumTenTopLoanBalance: 0, // 上个月前十大借款人待还金额
      topLoanBalance: 0 // 上月最大单一借款人待还金额
    }
    $scope.year = new Date().getFullYear();
    $scope.month = new Date().getMonth() + 1;
    $scope.updateDate = '2017-11-9';
    var getUpdateDate = function (year, month) {
      var newYear = year // 取当前的年份
      var newMonth = month - 1 // 取上一个月的第一天，方便计算（最后一天不固定
      if (month <= 1) {
        newMonth += 12 // 月份增
        newYear -= 1 // 年份减
      }
      var newDate = new Date(newYear, newMonth, 1) // 取当年当月中的第一天
      var day = (new Date(newDate.getTime() - 1000 * 60 * 60 * 24)).getDate() // 获取当月最后一天日期
      $scope.updateDate = (newYear + '-' + (newMonth < 10 ? '0' + newMonth : newMonth) + '-' + day)
    }
    getUpdateDate($scope.year, $scope.month)
    $scope.getPlatformData = function () {
      AboutUsService.dataStat.get({}, function (response) {
        if (response && response.ret !== -1) {
          $scope.cumulative = response
        } else {
          alert(response.msg)
        }
      })
    }
    $scope.getPlatformData()
    $scope.riskList = [
      {
        num: '01',
        type: '还款提醒',
        content: '还款日前3天，对借款人通过短信、邮件、电话等方式提醒还款'
      },
      {
        num: '02',
        type: '早期催收',
        content: '还款日当天通过短信、邮件、电话等方式再次提醒还款'
      },
      {
        num: '03',
        type: '中期催收',
        content: '对逾期未还的借款人通过短信、电话、邮件等方式进行催收'
      },
      {
        num: '04',
        type: '委外催收',
        content: '对逾期超过7天的借款人，通过上门催收、委外催收等多种方式不断催收'
      },
      {
        num: '05',
        type: ' 日常预警管理',
        content: '如以上方式均无效将进行法律诉讼'
      }
    ]
    $scope.payList = [
      {
        type: '业务类型',
        txt: '收费标准'
      },
      {
        type: '会员注册',
        txt: '免费'
      },
      {
        type: '开通存管账户',
        txt: '免费'
      },
      {
        type: '投标（出借）',
        txt: '免费'
      },
      {
        type: '债权转让',
        txt: '转让收费费=转让金额*1%，最低3元'
      },
      {
        type: '充值',
        txt: '免费'
      },
      {
        type: '提现',
        txt: '2元/笔'
      }
    ]
    $scope.importList = ['公司减资、合并、分立、解散或申请破产', '公司依法进入破产程序', '公司被责令停业、整顿、关闭', '公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚', '公司法定代表人、实际控制人、主要负责人、董事、监事、高级管理人员涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施', '公司主要或者全部业务陷入停顿', '存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动的重大事项']
  }]);
