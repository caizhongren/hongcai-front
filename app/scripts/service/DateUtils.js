'use strict';
angular.module('hongcaiApp')
  .factory('DateUtils', function($resource, DEFAULT_DOMAIN) {
    return {

		toHourMinSeconds: function(intervalTimeInMills){
			var date = new Date(intervalTimeInMills - 8 * 60 * 60 * 1000);
			var dateStr = date.toTimeString().substring(0, 8);

			var time = {};
			time.hour = dateStr.substring(0,2);
			time.min = dateStr.substring(3,5);
			time.seconds = dateStr.substring(6,8);

			var hours = Math.floor(intervalTimeInMills/(60 * 60 * 1000));
			if (hours >= 24){
			time.hour = hours;
			}

			return time;
    	},

		toDayHourMinSeconds: function(intervalTimeInMills){
			var date = new Date(intervalTimeInMills - 8 * 60 * 60 * 1000);
			var dateStr = date.toTimeString().substring(0, 8);

			var time = {};
			time.day = Math.floor(intervalTimeInMills/(24 * 60 * 60 * 1000));
			time.hour = dateStr.substring(0,2);
			time.min = dateStr.substring(3,5);
			time.seconds = dateStr.substring(6,8);

			return time;
    	},

    	/**
    	 * 两个long型时间的时间间隔
    	 */
    	intervalDays: function(timeInMills1, timeInMills2){
    		var DAY_TIME_IN_MILLS = 24 * 60 * 60 * 1000;

    		var time1 = Math.floor(timeInMills1/DAY_TIME_IN_MILLS) * DAY_TIME_IN_MILLS;
    		var time2 = Math.floor(timeInMills2/DAY_TIME_IN_MILLS) * DAY_TIME_IN_MILLS;

    		return Math.abs((time2 - time1)/DAY_TIME_IN_MILLS);
    	},
    	/**
    	 * long型时间转为yyyy-MM-dd
    	 */
    	longTimeToDate: function(longTime) {
    	  var date = new Date(longTime);
    	  var month = date.getMonth() < 9 ? '0'+ (date.getMonth()+1) : date.getMonth() + 1;
    	  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    	  return date.getFullYear() + '-' + month + '-' + day;
    	},
    	/**
    	 * 2017 提现预计到账时间 currentDate: 当前时间 Holiday：本年度法定假日除调休日 WeekendsOff：法定假日中调休
    	 */
    	withdrawArriveDate: function(currentDate, Holiday, WeekendsOff) {
    		//理论上到账日期
    		var nextDay = this.longTimeToDate(currentDate.getTime() + 24 * 3600 * 1000);
    		var currentDay = this.longTimeToDate(currentDate.getTime());
			//预计到账是法定节假日
			if( Holiday.indexOf(nextDay) !== -1) {
				//5月节假日提现
				if(currentDate.getMonth() === 4 ) {
				  	nextDay = new Date('2017-05-31').getTime();
				} else if(currentDate.getMonth() === 9){
					//10月节假日提现
				  	nextDay = new Date('2017-10-09').getTime();
				} else {
					//4月节假日提现
					nextDay = new Date('2017-05-02').getTime();
				}
			}else{
				//预计到账不是法定节假日
    		  	//提现当天是周五
    		    if(currentDate.getDay() === 5) {
    		  	  //默认下周一到账
    		  	    nextDay = currentDate.getTime() + 24 * 3 * 3600 * 1000;
    		  	  //周六调休特殊考虑 周五提现周六到账
    		  	    for( var i = 0; i < WeekendsOff.length; i ++) {
    		  	        if(Math.abs(new Date(WeekendsOff[i]).getTime() - currentDate.getTime() ) < 24 * 2 *3600*1000) {
    		  	  			nextDay = currentDate.getTime() + 24 * 3600 * 1000;
    		  	   		}
    		  	 	}
    		  	} else if(currentDate.getDay() === 6){
    		  		//提现当天是周六
    		  		nextDay =  currentDate.getTime() + 24 * 2 * 3600 * 1000;
    		  	}
    		}
    		return nextDay;
    	}

    };
  });
