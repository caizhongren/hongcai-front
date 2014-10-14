hongcaiApp.controller("UserCenterCtrl", ["$scope", "$rootScope", "$stateParams", "UserCenterService", function ($scope, $rootScope, $stateParams, UserCenterService) {

	function new_form(){
        var f = document.createElement("form");
        document.body.appendChild(f);
        f.method = "post";
        //f.target = "_blank";
        return f;
    }

    function create_elements(eForm,eName,eValue){
        var e=document.createElement("input");
        eForm.appendChild(e);
        e.type='text';
        e.name=eName;
        if(!document.all){
            e.style.display='none';
        }else{
            e.style.display='block';
            e.style.width='0px';
            e.style.height='0px';
        }
        e.value=eValue;
        return e;
    }

	$scope.realNameAuth = function(user) {
        UserCenterService.yeepayRegister.get({realName:user.realName, idCardNo:user.idCardNo}, function(response) {
            if(response.ret == 1) {
                var req = response.data.req;
                var sign = response.data.sign;
             	var _f=new_form();//创建一个form表单
                create_elements(_f,"req",req);//创建form中的input对象
                create_elements(_f,"sign",sign);
                _f.action="http://qa.yeepay.com/member/bha/toRegister";//form提交地址
                _f.submit();//提交

            } else {
                
            }
        });
    };

	//Datepickers 
	/*$scope.selectedDate = {{selectedDate}}; 
	$scope.selectedDateAsNumber = {{selectedDateAsNumber}};
	$scope.fromDate = {{fromDate}}; 
	$scope.untilDate = {{untilDate}};*/ 
}]);

