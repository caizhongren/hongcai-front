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
    	}



    };
  });
