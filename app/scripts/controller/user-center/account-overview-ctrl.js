'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl', function($scope, $state, $rootScope, $stateParams, ProjectService, UserCenterService, ProjectUtils, DateUtils) {
    var totalAssets = 0;
    var receivedProfit = 0;
    var balance = 0;
    var reward = 0;
    UserCenterService.getUserAccount.get(function(response) {
      if (response.ret === 1) {
        var account = response.data.account;
        totalAssets = response.data.totalAssets;
        receivedProfit = account.receivedProfit;
        balance = account.balance;
        reward = account.reward;

        $scope.reward = reward;
        $scope.account = response.data.account;
        $scope.account.totalAssets = totalAssets;
        if (totalAssets === 0 && receivedProfit === 0 && balance === 0) {
          totalAssets = 30;
          receivedProfit = 30;
          balance = 30;
        }

        // $scope.labels = ['账户总资产', '累计净收益', '账户余额'];
        // $scope.data = [totalAssets, receivedProfit, balance];
        // $scope.colours = ['#e94828', '#f9b81e', '#62cbc6'];

      }
    });


    $scope.jigoubaoList = function() {
      ProjectService.getAccountOverviewProjects.get({
        categoryCode: "01"
      }, function(response) {
        if (response.ret === 1) {
          $scope.serverTime = response.data.serverTime;
          $scope.jigoubao = response.data.projectList;
          $scope.projectStatusMap = response.data.projectStatusMap;
          $scope.repaymentTypeMap = response.data.repaymentTypeMap;
          $scope.data = [];
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.jigoubao.length; i++) {
            $scope.jigoubao[i].showByStatus = $scope.jigoubao[i].status === 6 || $scope.jigoubao[i].status === 7 ? true : false;
            $scope.data.push($scope.jigoubao[i]);
            ProjectUtils.projectTimedown($scope.jigoubao[i], $scope.serverTime);
          }

        } else {
          $scope.data = [];
        }
      });
    };

    $scope.jigoubaoList();

    /**
     * 我的债权统计数据
     */
    // $scope.getCreditRightStatistics = function() {
    UserCenterService.getCreditRightStatistics.get({}, function(response) {
      if (response.ret === 1) {
        $scope.creditRightStatis = response.data.creditRightStatis;
        $scope.showCreditRightStatistics = $scope.creditRightStatis.totalInvestCount;
      } else {
        $scope.showCreditRightStatistics = false;
      }
    });
    /**
     * 加息券统计信息
     */
    UserCenterService.getUserIncreaseRateCouponStatis.get({}, function(response) {
      if (response.ret === 1) {
        $scope.couponStatis = response.data.couponStatis;
      }
    });

    /**
     * 我的债权统计数据
     */
    $scope.getCreditRightStatistics = function() {
      UserCenterService.getCreditRightStatistics.get({}, function(response) {
        if (response.ret === 1) {
          $scope.statistics = response.data.creditRightStatis;
        }
      });
      
    };

    $scope.getCreditRightStatistics();

    /*
     * 现金券、加息券数量统计
     */
    $scope.getUserCoupons = function() {
      /**
       * 现金券统计
       */
      UserCenterService.getUserCashCouponsStat.get(function(response) {
        if (!response || response.ret === -1) {
          return;
        }
        $scope.unUsedCashCoupon = response.unGotAmount;
      });
      /**
       * 加息券统计
       */
      UserCenterService.getUserIncreaseRateCouponStatis.get(function(response) {
        if (response.ret === 1) {
          $scope.unUsedRateCoupon = response.data.couponStatis.unUsedCoupon;
        }
      });
    }
    $scope.getUserCoupons();


    /**
     * 收益走势图 累计
     */
    $scope.onClick = function (points, evt) {
      //console.log(points, evt);
    };

    // $scope.medals_colours = [{
    //   fillColor:['rgba(0,0,0,0)'], //填充色
    //   strokeColor:['#f9721f'],//曲线颜色
    // }];
    $scope.medals_colours = ['#f9721f','fdcfb3','rgba(0,0,0,0)'];
    $scope.options = {
      bezierCurve: false,
      scaleShowVerticalLines: true, //竖线网格是否显示
      numberPrefix: "$",
      tooltipFontColor:'#fff', //tip字体颜色
      tooltipFillColor: '#f9721f',//tip背景颜色
    }
    //lables and data config tab=== 0 调用
    $scope.datasConfig = function() {
      $scope.yearlyData = [];
      $scope.labels = [];
      var datas = [];
      //模拟数据
      var monthProfit = 
              [
                {
                  profit: 0.4,
                  createTime: 1496592000000
                },
                {
                  profit: 19.4,
                  createTime: 1496678400000
                },
                {
                  profit: 23.4,
                  createTime: 1496764800000
                },
                {
                  profit: 28.4,
                  createTime: 1496851200000
                },
                {
                  profit: 17.4,
                  createTime: 1496937600000
                },
                {
                  profit: 24.4,
                  createTime: 1497024000000
                },
                {
                  profit: 12.4,
                  createTime: 1497110400000
                },
                {
                  profit: 22.4,
                  createTime: 1496592000000
                },
                {
                  profit: 22.4,
                  createTime: 1497283200000
                },
                {
                  profit: 25.4,
                  createTime: 1497369600000
                },
                {
                  profit: 22.4,
                  createTime: 1497456000000
                },
                {
                  profit: 22.4,
                  createTime: 1497542400000
                },
              ]
      
      for(var i = 0; i <= monthProfit.length - 1; i++){
        var date1 = new Date(monthProfit[i].createTime);
        $scope.labels.push((date1.getMonth() + 1) + '月');
        datas.push(monthProfit[i].profit);
      }
      $scope.yearlyData.push(datas);
    }
    $scope.datasConfig();

    /**
     * 收益走势图 每日 tab=== 1 调用
     */
    UserCenterService.dayProfit.get(function(response){
      var creditRightList = response.data.creditRightList;
      $scope.dailyDatas = [];
      $scope.dailyLabels = [];
      var dailyDatas = [];

      for(var i = 0; i <= creditRightList.length - 1; i++){
        var date = new Date(creditRightList[i].createTime);
        $scope.dailyLabels.push((date.getMonth() + 1) + '月-' + date.getDate() + '日');
        dailyDatas.push(creditRightList[i].profit);
      }

      $scope.dailyData = [];
      $scope.dailyData.push(dailyDatas);
    });

    /**
     *  年份切换
     */
    var currentYear = new Date().getFullYear();//当前年份
    $scope.chartYear = $scope.chartYear ? $scope.chartYear : currentYear;
    $scope.firstInvestYear = 2015; //首投年份
    $scope.toggleYear = function(preOrNext,tab) {
      //上一年
      if(preOrNext == 'pre' && $scope.chartYear > $scope.firstInvestYear){
        $scope.chartYear -= 1;
        //update datasConfig
        var datas = [];
        $scope.labels = [];
        $scope.yearlyData = [];
        var monthProfit = [
          {
            profit: 19.4,
            createTime: 1496592000000
          },
          {
            profit: 18.4,
            createTime: 1496678400000
          },
          {
            profit: 29.4,
            createTime: 1496764800000
          },
          {
            profit: 2.4,
            createTime: 1496851200000
          },
          {
            profit: 7.4,
            createTime: 1496937600000
          },
          {
            profit: 4.4,
            createTime: 1497024000000
          },
          {
            profit: 2.4,
            createTime: 1497110400000
          },
          {
            profit: 22.4,
            createTime: 1496592000000
          },
          {
            profit: 22.4,
            createTime: 1497283200000
          },
          {
            profit: 5.4,
            createTime: 1497369600000
          },
          {
            profit: 22.4,
            createTime: 1497456000000
          },
          {
            profit: 12.4,
            createTime: 1497542400000
          },
        ]
        for(var i = 0; i <= monthProfit.length - 1; i++){
          var date1 = new Date(monthProfit[i].createTime);
          $scope.labels.push((date1.getMonth() + 1) + '月');
          datas.push(monthProfit[i].profit);
        }
        $scope.yearlyData.push(datas);
      }
      //下一年
      if(preOrNext == 'next' && $scope.chartYear < currentYear){
        $scope.chartYear += 1;
         //update datasConfig
        datas = [];
        $scope.labels = [];
        $scope.yearlyData = [];
        monthProfit = 
            [
              {
                profit: 20.4,
                createTime: 1496592000000
              },
              {
                profit: 19.4,
                createTime: 1496678400000
              },
              {
                profit: 23.4,
                createTime: 1496764800000
              },
              {
                profit: 28.4,
                createTime: 1496851200000
              },
              {
                profit: 17.4,
                createTime: 1496937600000
              },
              {
                profit: 24.4,
                createTime: 1497024000000
              },
              {
                profit: 12.4,
                createTime: 1497110400000
              },
              {
                profit: 22.4,
                createTime: 1496592000000
              },
              {
                profit: 22.4,
                createTime: 1497283200000
              },
              {
                profit: 25.4,
                createTime: 1497369600000
              },
              {
                profit: 22.4,
                createTime: 1497456000000
              },
              {
                profit: 22.4,
                createTime: 1497542400000
              },
            ]
        for(var i = 0; i <= monthProfit.length - 1; i++){
          var date1 = new Date(monthProfit[i].createTime);
          $scope.labels.push((date1.getMonth() + 1) + '月');
          datas.push(monthProfit[i].profit);
        }
        $scope.yearlyData.push(datas);
      }
      
    }
    //日期切换
                                                                                                                                               
    //资产总额详情显示框
    $scope.showPaymentBox = false;
    var paymentAmount = 0;
    var paymentCount = 0;
    $scope.selectPaymentBox = function(){
      if ($scope.paymentCount >0) {
        $scope.showPaymentBox = !$scope.showPaymentBox;
      }
    }
    //解决 部分浏览器 元素blur失效问题
    window.onclick = function (event) {
      var e = window.event || arguments[0];
      var _con1 = $('.select-payment');   // 设置目标区域
      var _con2 = $('.payment-box');   // 设置目标区域
      if(!_con1.is(e.target) && _con1.has(e.target).length === 0 && !_con2.is(e.target) && _con2.has(e.target).length === 0){ 
        $scope.showPaymentBox = false;
        $scope.$apply();
      }
    }

    /**
     * 待收回款日历
     */
    //页面加载初始化年月
    var creditRightBillMap = {}
    $scope.getRepaymentPlan = function () {
      UserCenterService.repaymentPlan.get(function(response){
        $scope.repaymentPlan = response;
        $scope.numMap = response.numMap;
        creditRightBillMap = response.creditRightBillMap;
        $scope.showDate(mydate.getFullYear(),mydate.getMonth()+1);
      })
    }
    $scope.getRepaymentPlan();
    //读取年月写入日历  重点算法!!!!!!!!!!!
    $scope.showDate = function (yyyy, mm) {
      $scope.paymentCount = 0;
      $scope.paymentAmount = 0;
      $scope.credit = [];
      var dd = new Date(parseInt(yyyy),parseInt(mm), 0);   //Wed Mar 31 00:00:00 UTC+0800 2010  
      var daysCount = dd.getDate();            //本月天数  
      var mystr ="";//写入代码
      var icon = "";//图标代码
      // var week = new Date(parseInt(yyyy)+"/"+parseInt(mm)+"/"+1).getDay()-1; //今天周几
      var week = new Date(parseInt(yyyy)+"/"+parseInt(mm)+"/"+1).getDay() == 0 ? 6 : new Date(parseInt(yyyy)+"/"+parseInt(mm)+"/"+1).getDay()-1;
      var lastMonth; //上一月天数
      var nextMounth//下一月天数
      if(  parseInt(mm) ==1 ){
        lastMonth = new Date(parseInt(yyyy)-1,parseInt(12), 0).getDate();
      }else{
        lastMonth = new Date(parseInt(yyyy),parseInt(mm)-1, 0).getDate();
      }
      if( parseInt(mm) ==12 ){
        nextMounth = new Date(parseInt(yyyy)+1,parseInt(1), 0).getDate();
      }else{
        nextMounth = new Date(parseInt(yyyy),parseInt(mm)+1, 0).getDate();
      }
      
      for(var i=0;i<daysCount;i++){
        var y_mm, y_i;
        if (mm <10) {
          y_mm = '0' + mm;
        } else {
          y_mm = mm
        }
        if (i+1 <10) {
          y_i = '0' + (i+1);
        } else {
          y_i = (i+1)
        }
        var time = yyyy +'-' + y_mm +'-' + y_i;
        
        // console.log(time + ':' +creditRightBillMap.hasOwnProperty(time));
        if (creditRightBillMap.hasOwnProperty(time)) {
          var credit = creditRightBillMap[time];
          $scope.credit = creditRightBillMap[time];
          console.log($scope.credit)
          for (var t =0; t <credit.length;t++) {
            var rate = credit[t].baseRate + credit[t].riseRate;
            $scope.paymentAmount += (credit[t].principal + credit[t].profit + ((rate + credit[t].couponRate) * credit[t].profit/rate - credit[t].profit));
          }
          $scope.paymentCount = $scope.credit.length;
          $scope.paymentAmount = $scope.paymentAmount;
        }
        //计算上月空格数
        if( i%7 == 0){
          if(i<7){//只执行一次
            for(var j=0;j<week;j++){
              mystr += "<div class='f-td f-null' style='color:#fff;'>"+(lastMonth+j-5+week)+"</div>";
            }
          }
        }
         //这里为一个单元格，添加内容在此
        if (creditRightBillMap.hasOwnProperty(time)) {
          mystr += "<div class='f-td f-number'>"
                  +"<div class='f-yuan'></div>"
                  +"<div class='f-table-msg'>回款金额<span class='major'>" + $scope.paymentAmount + "</span>元；回款笔数<span class='major'>" + $scope.paymentCount + "</span>笔</div>"//这里加判断
                  +"</div>"; 
        }else {
          mystr += "<div class='f-td f-number'><span class='f-day'>"+(i+1)+"</span>"+"</div>"; 
        }
        
      }
      //表格不等高，只补充末行不足单元格
      if(7-(daysCount+week)%7 <7){
        for(var k=0; k<7-(daysCount+week)%7;k++ ){ // week为今天周几 daysCount为本月天数  7-week为本行空格数 7-(daysCount+6-week)%7为最后一行有几个空格
          mystr += "<div class='f-td f-null' style='color:#fff;'>"+(k+1)+"</div>";
        }
      }

      //写入日历
      $(".f-rili-table .f-tbody").html(mystr);
      var tr = document.getElementsByClassName('f-td');
      for(var td=0;td<tr.length;td++){
        if((td>=0&&td<=6)||(td>=14&&td<=20)||(td>=28&&td<=34))  {
          $('.f-td').eq(td).addClass('bg-fa');
        }
      }
      // console.log(yyyy)
      // console.log(mm)
      // console.log(mydate.getDate())
      //给今日加class
      if( mydate.getFullYear() == yyyy){
        if( (mydate.getMonth()+1 ) == mm){
          var today = mydate.getDate();
          $(".f-rili-table .f-number").eq(today-1).html('今日');
          $(".f-rili-table .f-number").eq(today-1).addClass("f-today");
        }
      }
      //绑定查看方法
      $(".f-yuan").off("mouseover");
      $(".f-yuan").on("mouseover",function(){
        $(this).parent().find(".f-table-msg").show();
      });
      $(".f-table-msg").off("mouseover");
      $(".f-table-msg").on("mouseover",function(){
        $(this).show();
      });
      $(".f-yuan").off("mouseleave");
      $(".f-yuan").on("mouseleave",function(){
        $(this).parent().find(".f-table-msg").hide();
      });
      $(".f-table-msg").off("mouseleave");
      $(".f-table-msg").on("mouseleave",function(){
        $(this).hide();
      });

    }
    
    var mydate = new Date();
    $scope.calendar_year = mydate.getFullYear()
    $scope.calendar_month = mydate.getMonth()+1 <10 ? "0" + (mydate.getMonth()+1) : mydate.getMonth()+1;
    // $scope.showDate(mydate.getFullYear(),mydate.getMonth()+1);

    
    //日历上一月
    $scope.lastMonth = function () {
      var mm = parseInt($scope.calendar_month);
      var yy = parseInt($scope.calendar_year);
      if( mm == 1){//返回12月
        $scope.calendar_year = yy-1;
        $scope.calendar_month = 12;
        $scope.showDate(yy-1, 12);
      }else{//上一月
        $scope.calendar_month = mm - 1 < 10 ? "0" + (mm - 1) : mm - 1;
        $scope.showDate(yy, mm-1);
      }
    }
    $scope.nextMonth = function () {
      var mm = parseInt($scope.calendar_month);
      var yy = parseInt($scope.calendar_year);
      if( mm == 12){//返回12月
        $scope.calendar_year = yy+1;
        $scope.calendar_month = '01';
        $scope.showDate(yy+1, 1);
      }else{//上一月
        $scope.calendar_month = mm + 1 < 10 ? "0" + (mm + 1) : mm + 1;
        $scope.showDate(yy, mm+1);
      }
    }
    
  })
