'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl', function($scope, $state, $rootScope, $stateParams, ProjectService, UserCenterService, ProjectUtils, DateUtils) {
    var totalAssets = 0;
    var receivedProfit = 0;
    var balance = 0;
    var reward = 0;
    var currentDate = new Date().getTime()
    var registerTime = $rootScope.loginUser.createTime //用户注册时间
    console.log(new Date(registerTime))
    $scope.currentYearCopy = new Date().getFullYear();
    $scope.currentYear = new Date().getFullYear();//当前年份
    $scope.registerYear = new Date(registerTime).getFullYear() //首投年份
    $scope.registerDiff = DateUtils.intervalDays(currentDate, registerTime) //注册天数
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
      }
    });

    UserCenterService.yestodayProfit.get(function(response) {
      if (response && response.ret !== -1) {
        $scope.yestodayProfit = response.profit;
      }
    })

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
     * 收益折线图配置
     */
    $scope.medals_colours = ['#f9721f','fdcfb3','rgba(0,0,0,0)'];
    $scope.onClick = function (points, evt) {
      //console.log(points, evt);
    };
    $scope.options = {
      bezierCurve: false,
      scaleShowVerticalLines: true, //竖线网格是否显示
      numberPrefix: "$",
      tooltipFontColor:'#fff', //tip字体颜色
      tooltipFillColor: '#f9721f',//tip背景颜色
    }

    /**
     * 已收收益（累计）数据lables and data config， tab === 0
     */
    
    $scope.datasConfig = function(startTime, endTime) {
      $scope.yearlyData = [];
      $scope.labels = [];
      var datas = [];
      UserCenterService.getReceivedProfitGraphs.get({
        startTime: startTime,
        endTime: endTime
      }, function (response) {
        if (!response || response.ret === -1) {
          return
        }
        var monthProfit = response.data
        for(var i = 0; i <= monthProfit.length - 1; i++){
          var date1 = new Date(monthProfit[i].searchDate);
          if ($scope.registerDiff > 180) { //已收收益>180天横坐标按月，不到180天 横坐标按天
            $scope.labels.push((date1.getMonth() + 1) + '月');
          } else {
            $scope.labels.push((date1.getMonth() + 1) + '月-' + date1.getDate() + '日');
          }
          datas.push(monthProfit[i].profit);
        }
        $scope.yearlyData.push(datas);
      })
    }

    /**
     * 每日收益数据 tab === 1 调用
     */
    $scope.dailyDateCofig = function () {
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
    }

    /**
     *  日期切换
     */
    $scope.n = 0
    $scope.toggleDate = function (preOrNext, tab) {
      // preOrNext = 0 上一桢，preOrNext = 1下一桢
      // 注册日和当前日期所在的那一帧不可以再点
      $scope.xFrame = Math.ceil($scope.registerDiff/12) - 1
      if (preOrNext === 0) {
        if ($scope.n === $scope.xFrame || $scope.xFrame === -1) { //$scope.xFrame === -1 表述注册不到12天
          return;
        }
        $scope.n += 1;
      } else if (preOrNext === 1) {
        if ($scope.n === 0) {
          return;
        }
        $scope.n -= 1;
      }
      // 当前显示横坐标第1位
      var theNextDay = DateUtils.getBeforeDate(-1, currentDate)
      var xFirst = $scope.n === $scope.xFrame ? registerTime : DateUtils.getBeforeDate(12 + 12*$scope.n, theNextDay)
      $scope.currentYear = new Date(xFirst).getFullYear()
      // 当前显示横坐标第12位
      var xLast = $scope.n === 0 ? theNextDay : DateUtils.getBeforeDate(-11, new Date(xFirst))
      // 把第1位和第12位日期作为接口参数传入请求页面显示利息和日期
      if (tab === 0) {
        $scope.datasConfig(xFirst, xLast);
      } else {
        $scope.dailyDateCofig()
      }  
    } 
    /**
     *  年份切换
     */
    $scope.toggleYear = function(preOrNext) {
      if ($scope.registerDiff > 180) {
        //上一年
        if(preOrNext === 0){
          if ($scope.currentYear <= $scope.registerYear) {
            return
          }
          $scope.currentYear -= 1
        }
        //下一年
        if(preOrNext === 1){
          if ($scope.currentYear > new Date().getFullYear() - 1) {
            return
          }
          $scope.currentYear += 1
        }
        // 判断本帧开始月份是否是注册月份
        $scope.startTime = $scope.currentYear === $scope.registerYear ? new Date($scope.currentYear + '-' + (new Date(registerTime).getMonth() + 1) + '-01').getTime() : new Date($scope.currentYear + '-01-01').getTime()
        $scope.endTime = new Date($scope.currentYear + '-12-01').getTime()
        $scope.datasConfig($scope.startTime, $scope.endTime);  
      } else {
        $scope.toggleDate(preOrNext, 0)
      }
    }
    if($scope.registerDiff < 180) {
      $scope.toggleDate(2, 0)
    } else {
      $scope.toggleYear(2)
    }

                                                                                                                                    
    //资产总额详情显示框
    $scope.showPaymentBox = false;
    var paymentAmount = 0;
    var paymentCount = 0;
    $scope.selectPaymentBox = function(){
      if (paymentCount >0) {
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
    var mydate = new Date();
    $scope.calendar_year = mydate.getFullYear()
    $scope.calendar_month = mydate.getMonth()+1 <10 ? "0" + (mydate.getMonth()+1) : mydate.getMonth()+1;
    
    var creditRightBillMap = {}
    var numMap = {}
    $scope.getRepaymentPlan = function (dateTime, yyyy, mm) {
      UserCenterService.repaymentPlan.get({
        dateTime: dateTime
      }, function(response){
        $scope.repaymentPlan = response;
        numMap = response.numMap;
        creditRightBillMap = response.creditRightBillMap;
        $scope.showDate(yyyy, mm);
      })
    }
    $scope.getRepaymentPlan($scope.calendar_year + '-' + $scope.calendar_month + '-01', mydate.getFullYear(), mydate.getMonth()+1);
    //读取年月写入日历  重点算法!!!!!!!!!!!
    $scope.showDate = function (yyyy, mm) {
      var m;
      mm <10 ? m = '0' + mm : m = mm;
      paymentCount = 0;
      paymentAmount = 0;
      $scope.paymentTotalCount = 0;
      $scope.paymentTotalAmount = 0;
      $scope.credit = [];
      $scope.creditBills = [];
      $scope.paymentRequest = '当月';
      var time = '';
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
        mm <10 ? y_mm = '0' + mm : y_mm = mm;
        i+1 <10 ? y_i = '0' + (i+1) : y_i = (i+1);
        time = yyyy +'-' + y_mm +'-' + y_i;
        var date = yyyy +'-' + y_mm;
        var paymentStatus = [];
        paymentAmount = 0;
        if (creditRightBillMap.hasOwnProperty(time)) {
          var credit = creditRightBillMap[time];
          $scope.credit = creditRightBillMap[time];
          // console.log($scope.credit)
          for (var t =0; t <credit.length;t++) {
            paymentStatus.push(credit[t].status);
            var rate = credit[t].baseRate + credit[t].riseRate;
            paymentAmount += (credit[t].principal + credit[t].profit + ((rate + credit[t].couponRate) * credit[t].profit/rate - credit[t].profit));
          }
          paymentCount = $scope.credit.length;
          $scope.paymentTotalAmount += paymentAmount;
          $scope.creditBills = $scope.creditBills.concat($scope.credit);
        }

        if (numMap.hasOwnProperty(date)) {
          $scope.paymentTotalCount = numMap[date];
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
        var todayTimes = mydate.getTime();
        var yuanStr = "";
        if (creditRightBillMap.hasOwnProperty(time)) {
          yuanStr = (paymentStatus.length >1  && $.inArray( 0, paymentStatus) != -1) || (paymentStatus.length ==1 && paymentStatus[0] == 0) ? "<div class='f-yuan'>"+ ((i+1) >= 10 ? (i+1) : '0' + (i+1) )+"</div>" : "<div class='f-yuan-grey'>"+ ((i+1) >= 10 ? (i+1) : '0' + (i+1) )+"</div>";
          mystr += "<div class='f-td f-number'>"
                  + yuanStr
                  +"<div class='f-table-msg'>回款金额<span class='major'>" + paymentAmount.toFixed(2) + "</span>元；回款笔数<span class='major'>" + paymentCount + "</span>笔</div>"//这里加判断
                  +"</div>"; 
        }else {
          mystr += "<div class='f-td f-number'><span class='f-day'>"+(i+1)+"</span>"+"</div>"; 
        }

      }
      console.log($scope.creditBills);
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
      //给今日加class
      if( mydate.getFullYear() == yyyy){
        if( (mydate.getMonth()+1 ) == mm){
          var today = mydate.getDate();
          console.log(yyyy + '-' + m + '-'+(today<10?'0'+today:today))
          if (!creditRightBillMap.hasOwnProperty(yyyy + '-' + m + '-' +(today<10?'0'+today:today))) {
            $(".f-rili-table .f-number").eq(today-1).html('今日');
            $(".f-rili-table .f-number").eq(today-1).addClass("f-today");
          }
          // $(".f-rili-table .f-number").eq(today-1).html('今日');
          // $(".f-rili-table .f-number").eq(today-1).addClass("f-today");
        }
      }

      //绑定查看方法
      $(".f-yuan").mouseover(function() {
        $(this).parent().find(".f-table-msg").show();
      }).mouseleave(function() {
        $(this).parent().find(".f-table-msg").hide();
      }).click(function() {
        var activeDD = $(this).text();
        var activeDate = yyyy + '-' + m + '-' + activeDD;
        $scope.paymentTotalAmount = 0;
        $scope.creditBills = creditRightBillMap[activeDate];
        console.log($scope.creditBills)
        $scope.paymentRequest = '当日';
        var credit = $scope.creditBills;
        var paymentAmount = 0;
        for (var t =0; t <credit.length;t++) {
          var rate = credit[t].baseRate + credit[t].riseRate;
          paymentAmount += (credit[t].principal + credit[t].profit + ((rate + credit[t].couponRate) * credit[t].profit/rate - credit[t].profit));
        }
        $scope.paymentTotalCount = credit.length;
        $scope.paymentTotalAmount += paymentAmount;
      })

      $(".f-yuan-grey").mouseover(function() {
        $(this).parent().find(".f-table-msg").show();
      }).mouseleave(function() {
        $(this).parent().find(".f-table-msg").hide();
      }).click(function() {
        var activeDD = $(this).text();
        var activeDate = yyyy + '-' + m + '-' + activeDD;
        $scope.paymentTotalAmount = 0;
        $scope.creditBills = creditRightBillMap[activeDate];
        console.log($scope.creditBills)
        $scope.paymentRequest = '当日';
        var credit = $scope.creditBills;
        var paymentAmount = 0;
        for (var t =0; t <credit.length;t++) {
          var rate = credit[t].baseRate + credit[t].riseRate;
          paymentAmount += (credit[t].principal + credit[t].profit + ((rate + credit[t].couponRate) * credit[t].profit/rate - credit[t].profit));
        }
        $scope.paymentTotalCount = credit.length;
        $scope.paymentTotalAmount += paymentAmount;
      })

      $(".f-table-msg").mouseover(function() {
        $(this).show();
      }).mouseleave(function() {
        $(this).hide();
      })

    }

    //日历上一月
    $scope.lastMonth = function () {
      var mm = parseInt($scope.calendar_month);
      var yy = parseInt($scope.calendar_year);
      if( mm == 1){//返回12月
        $scope.calendar_year = yy-1;
        $scope.calendar_month = 12;
        // $scope.showDate(yy-1, 12);
        $scope.getRepaymentPlan((yy-1)+'-12'+'-01', yy-1, 12);
      }else{//上一月
        $scope.calendar_month = mm - 1 < 10 ? "0" + (mm - 1) : mm - 1;
        // $scope.showDate(yy, mm-1);
        $scope.getRepaymentPlan(yy+'-'+$scope.calendar_month+'-01', yy, mm-1);
      }
    }
    $scope.nextMonth = function () {
      var mm = parseInt($scope.calendar_month);
      var yy = parseInt($scope.calendar_year);
      if( mm == 12){//返回12月
        $scope.calendar_year = yy+1;
        $scope.calendar_month = '01';
        // $scope.showDate(yy+1, 1);
        $scope.getRepaymentPlan($scope.calendar_year+'-01-01', yy+1, 1);
      }else{//上一月
        $scope.calendar_month = mm + 1 < 10 ? "0" + (mm + 1) : mm + 1;
        // $scope.showDate(yy, mm+1);
        $scope.getRepaymentPlan(yy+'-'+$scope.calendar_month+'-01', yy, mm+1);
      }
    }
    
  })
