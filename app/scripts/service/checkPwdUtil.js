'use strict';
angular.module('hongcaiApp')
  .factory('checkPwdUtil', function() {
    return {
      getStrength: function (newVal, oldVal) {
        var strength;
        // 密码强度验证
        var pattern1 = /^[0-9a-z]{6,10}$/; //包括数字和字母 6-10位
        var pattern2 = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{11,}$/; //数字和字母11位以上
        var pattern3 = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*)[0-9A-Za-z]{6,}$/ // 数字，字母大小写，6位以上
        var pattern4 = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,10}$/  //数字字母符号
        var pattern5 = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])[0-9A-Za-z]{11,}$/ //数字和字母大小写11位以上
        var pattern6 = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*].{11,}$/ //数字字母符号11位以上
        if (!newVal || newVal && newVal.length < 6 || newVal && pattern1.test(newVal) || /^[0-9]{6,}$/.test(newVal) || /^[A-Z]{6,}$/.test(newVal) || /^[a-z]{6,}$/.test(newVal)) {
          strength = 1;
        } else if (pattern2.test(newVal) && !pattern5.test(newVal) || pattern3.test(newVal) && !pattern5.test(newVal) || pattern4.test(newVal) && !pattern5.test(newVal) || /^[0-9A-Z]{6,10}$/.test(newVal)) {
          strength = 2;
        } else if (pattern5.test(newVal) || pattern6.test(newVal)) {
          strength = 3
        }
        return strength;
      }
    }
  })
