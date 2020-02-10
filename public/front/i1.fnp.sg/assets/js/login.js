fnpApp.controller('NewLoginCntrl', ['$scope', '$rootScope','$http', '$timeout', '$interval',function($scope, $rootScope, $http, $timeout,$interval) {
	var app = this;
	$rootScope.forgotpasswordsent = false;
	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	app.init = function() {
		jQuery(".pickdate").datepicker({});
		app.loginaction = 'logincheck';
		$rootScope.forgotpasswordsent = false;
		app.resendforgotpassword = false;
		app.inoverlay = false;
		app.errormessage = document.loginErrors;
		app.ischeckout = document.location.href.indexOf("/checkout") > -1;;
		app.logintitle = app.ischeckout ? "Login/Signup" : "Login / Signup";
		app.enablesubmit = true;
		app.resendOTP=false;
		app.usernametitle = "";
        app.USERNAME='';
        app.PASSWORD ="";
        app.USER_FIRST_NAME ="";
        app.CUSTOMER_MOBILE_CONTACT="";
        app.signUpPassword ="";
        app.countryCode="";
		if($scope.loginmodalform){
			//$scope.loginmodalform.USERNAME = "";//we already clearing this in above by again clearing it,not showing the error validation messages  
			$scope.loginmodalform.PASSWORD = "";
			$scope.loginmodalform.$setPristine();
		}
		if($scope.passwordfrm){
			$scope.passwordfrm.PASSWORD = "";
			$scope.passwordfrm.newpassword = "";
			$scope.passwordfrm.verifypassword = "";
			$scope.passwordfrm.$setPristine();
		}
		document.inputToFocus = "USERNAME"
		$timeout(focusOnThis);
	}
	app.init();
	app.doLogin = function(server) {
		var loginForm = $('#loginmodalform')[0];
		if((app.loginaction !="intiateotp" && !app.resendButton) &&  ($scope.loginmodalform.$invalid || !app.enablesubmit) && app.loginaction!="forgotpassword"){
			return false;
		}//form validation done here
		app.domainToUse = server;
		app.loginForm = loginForm;
		app.loginForm.isFromOverlay = isFromOverlay(loginForm);
		switch (app.loginaction) {
		case 'logincheck':
			 $('#frgtlinksbmt').addClass('bg-hide');
	         $('#frgtlinksbmt').find('.content-text').html('CONTINUING...');
			return newCheckLogin();
		case 'login':
			return newLogin(server, loginForm);
		case 'signup':
			if (loginForm.countryCode.value == "91" && loginForm.CUSTOMER_MOBILE_CONTACT.value.length != 10){
				$scope.loginmodalform.CUSTOMER_MOBILE_CONTACT.$setValidity("pattern", false);
				return false;
            }
			$('#frgtlinksbmt').addClass('bg-hide');
            $('#frgtlinksbmt').find('.content-text').html('CONTINUING...');
			loginForm.submit();
			app.enablesubmit = false;
			return true; //all validations are taken care of by the angular..so just submit
		case 'forgotpassword':
			return newForgotPassword();
		case 'useotp':
			if(!$scope.loginmodalform.$invalid ){
				$('#frgtlinksbmt').addClass('bg-hide');
		        $('#frgtlinksbmt').find('.content-text').html('CONTINUING...');	
			}
			return newUseOTP(loginForm);
		case 'intiateotp':	
			app.loginaction='useotp';
			return newUseOTP(loginForm);
		}
	}
	function newUseOTP(loginForm) {
		app.enablesubmit = false;
		app.otpsent = false;
		if(app.OTP!=null && app.OTP!=""&&!app.resendOTP){
			var urlToUse = "https://" + app.domainToUse + "/control/validateCustomerOTP?USERNAME=" + encodeURIComponent(app.USERNAME)+"&OTP=" + app.OTP;
			$http.post(urlToUse).then(function(responseInner) {
				var dataInner = responseInner.data;
				app.enablesubmit = true;
				if(dataInner && dataInner.response == "success"){
					if(window.location.pathname == "/"){
						app.loginForm.action =  "https://" + app.domainToUse +app.loginForm.DONE_PAGE.value;
					}else{
						app.loginForm.action =  app.loginForm.DONE_PAGE.value;
					}
					app.loginForm.submit();
				}else{
					$('#frgtlinksbmt').removeClass('bg-hide');
		            $('#frgtlinksbmt').find('.content-text').html('CONTINUE');
					app.errormessage = "Entered OTP is invalid or expired.";
					app.OTP = "";
					document.inputToFocus = "OTP";
					app.loginForm.OTP.value = "";
					app.showOtpMsg = true;
					$scope.loginmodalform.$setPristine();
				}
			});
			}else{
			var urlToUse = "https://" + app.domainToUse + "/control/quickCheckLoginExists?USERNAME=" + encodeURIComponent(app.USERNAME);
			$http.post(urlToUse).then(initiateOTPSMS);
			return false;
		}
	}

	function initiateOTPSMS(response){
		var data = response.data;
		var phoneNumber =data.phoneNumber;
		$scope.otpResendMsg = "Your OTP has been sent.";
		if(phoneNumber!=undefined){
			$scope.otpSuccessMsg = "Please Enter verification code (OTP) sent to:"+app.USERNAME+" & xxxxxx"+phoneNumber;
		}else{
			$scope.otpSuccessMsg = "Please Enter verification code (OTP) sent to:"+app.USERNAME;
		}
		if (data.exists) {
			var urlToUse = "https://" + app.domainToUse + "/control/useOTP?USERNAME=" + encodeURIComponent(app.USERNAME);
		    $http.post(urlToUse).then(function(innerResponse) {
				var dataInner = innerResponse.data;
				app.enablesubmit = true;
				if(dataInner && dataInner.response == "success"){
					app.errormessage = "";
					app.loginaction = "useotp";
					document.inputToFocus = "OTP";
					$timeout(focusOnThis);
					app.otpsent = false;
					app.showOtpMsg = true;
					app.OTP = "";
					//$scope.loginmodalform.OTP = ""; //we already clearing this above by again clearing it, not showing the validation error messages
					$scope.loginmodalform.$setPristine();
					//app.loginForm.OTP.value = "";
				}
				else {
					app.showOtpMsg = false;
					app.errormessage = "Could not send OTP.  Please try again.";
					document.inputToFocus = "USERNAME";
					$timeout(focusOnThis);
				}
				angular.element("#otpsent").effect("highlight");
			});
		} 
		else {
			document.inputToFocus = "USERNAME";
			$timeout(focusOnThis);
			app.enablesubmit = true;
			app.errormessage = "You are not registered with us with this email ID.  Please check your spelling.";
		}
	}
	function newCheckLogin() {
		app.enablesubmit = false;
		var userNameParam = (app.loginForm.USERNAME && app.loginForm.USERNAME.value) ? app.loginForm.USERNAME.value.toLowerCase() : "";
		userNameParam = encodeURIComponent(userNameParam);
		var urlToUse = "https://" + app.domainToUse + '/control/quickCheckLoginExists?USERNAME=' + userNameParam;
		$http.post(urlToUse).then(chooseLoginOrSignup);
		return false;
	}
	function chooseLoginOrSignup(response){
		var data = response.data;
		$scope.loginmodalform.$setPristine();
		var target = "/control/login";
		if(data.logintoken)app.loginForm.logintoken.value = data.logintoken;
		$('#frgtlinksbmt').removeClass('bg-hide');
		$('#frgtlinksbmt').find('.content-text').html('CONTINUE');
		if (data.exists) {
			// user already exists in DB...so take him to password screen
			if (app.loginForm.isFromOverlay) {
				if(window.location.pathname == "/"){
					app.loginForm.DONE_PAGE.value = "/account/my-account";
				}else{
					app.loginForm.DONE_PAGE.value = window.location.pathname;
				}
			}
			app.loginaction = "login";
			document.inputToFocus = "password"
		} else {
			// user does not exist...so take him to signup screen
			app.loginaction = "signup";
			target = "/control/customerRegister";
			//set title appropriately
			app.usernametitle = "Click 'Use a different Email' link below, if you want to change this";
			document.inputToFocus = "USER_FIRST_NAME"
            $timeout(function() {
                initializeSelectMenu(".signupcountrycode");
            },500);    
		}
		$timeout(focusOnThis);
		app.loginForm.action = "https://" + app.domainToUse + target;
		app.enablesubmit = true;
	}
	function newLogin() {
		app.enablesubmit = false;
		var dataToSubmit = "PASSWORD=" + app.loginForm.PASSWORD.value;
		var urlToUse = "https://" + app.domainToUse + "/control/quickCheckLogin?USERNAME=" + encodeURIComponent(app.loginForm.USERNAME.value.toLowerCase());
		$('#frgtlinksbmt').addClass('bg-hide');
        $('#frgtlinksbmt').find('.content-text').html('CONTINUING...');
		$http.post(urlToUse, dataToSubmit).then(newPreLoginCheck);
		return false;
	}
	function newPreLoginCheck(response){
		var data = response.data;
		if (data.valid) {
			// user already exists in DB...and password is also correct
			if (app.loginForm.isFromOverlay) {
				if(window.location.pathname == "/"){
					app.loginForm.DONE_PAGE.value = "/account/my-account";
				}else{
					/* modified code 
					 * old code was app.loginForm.DONE_PAGE.value=window.location.pathname;*/
					var pathName=window.location.pathname;
					var queryString=window.location.search;
					app.loginForm.DONE_PAGE.value = pathName+queryString;
				}
			}
			app.loginForm.submit();
		} else {
			// user exists but invalid password...cannot move ahead
			//app.loginaction should remain "login"
			$('#frgtlinksbmt').removeClass('bg-hide');
            $('#frgtlinksbmt').find('.content-text').html('CONTINUE');
			app.loginForm.logintoken = ""; //always remove the token
			app.errormessage = "Invalid Email ID or password.";// ha ha ha haa...not very clever!!
			app.loginForm.PASSWORD.value = "";
			document.inputToFocus = "password"
			$timeout(focusOnThis);
			app.enablesubmit = true;
		}
		$scope.loginmodalform.$setPristine();
	}
	function newForgotPassword() {
		app.loginaction = "login";
		app.enablesubmit = false;
		//app.forgotpasswordsent = false;
		var urlToUse = "https://" + app.domainToUse + "/control/quickCheckLoginExists?USERNAME=" + encodeURIComponent(app.loginForm.USERNAME.value);
		$('.pop-up-msg-login-desk').foundation('reveal', 'close');
		$http.post(urlToUse).then(initiateForgotPasswordMail);
		return false;
	}
	app.resendForgotPassword = function(){
		app.enablesubmit = false;
		app.resendforgotpassword = true;
		var urlToUse = "https://" + app.domainToUse + "/control/quickCheckLoginExists?USERNAME=" + encodeURIComponent(app.loginForm.USERNAME.value);
		$rootScope.countdown = 30;
		$scope.startCountdown(); 
		$http.post(urlToUse).then(initiateForgotPasswordMail);
		return false;
	};
	function initiateForgotPasswordMail(response){
		var data = response.data;
		if (data.exists) {
			var urlToUse = "https://" + app.domainToUse + "/control/forgotpassword?USERNAME=" + encodeURIComponent(app.loginForm.USERNAME.value);
			var forgotPasswordData = "TYPE=json&logintoken=" + encodeURIComponent(data.logintoken);
			$rootScope.forgotpasswordsent = true;
			$http.post(urlToUse, forgotPasswordData).then(function(responseInner) {
				var dataInner = responseInner.data;
				app.enablesubmit = true;
				if(dataInner && dataInner.result == "success"){
					app.errormessage = "";
					document.inputToFocus = "password";
					$timeout(focusOnThis);
					app.PASSWORD = "";
					$scope.loginmodalform.PASSWORD = "";
					$scope.loginmodalform.$setPristine();
					//app.loginForm.PASSWORD.value = "";
					if(!app.resendforgotpassword){
						$rootScope.countdown = 30;
						$scope.startCountdown(); 
					}
				}
				else {
					app.forgotpasswordsent = false;
					app.errormessage = "Could not send temporary password.  Please try again.";
					document.inputToFocus = "USERNAME";
					$timeout(focusOnThis);
					console.log(dataInner.msg);
				}
				angular.element("#passwordsent").effect("highlight");
			});
		} 
		else {
			document.inputToFocus = "USERNAME";
			$timeout(focusOnThis);
			app.enablesubmit = true;
			app.errormessage = "You are not registered with us with this email ID.  Please check your spelling.";
		}
	}
	app.changePassword = function(server) {
		app.enablesubmit = false;
		app.domainToUse = server;
		var username = angular.element("#userLoginId")[0].value;
		console.log(username);
		var dataToSubmit = "PASSWORD=" + app.PASSWORD;
		var urlToUse = "https://" + app.domainToUse + "/control/quickCheckLogin?USERNAME=" + encodeURIComponent(username);
		$http.post(urlToUse, dataToSubmit).then(checkChangePassword);
		return false;
	}
	function checkChangePassword(response){
		var data = response.data;
		app.enablesubmit = true;
		if (data.valid) {
			//yes we can allow password change
			//allow the form to be submitted
			var passwordForm = angular.element("#passwordfrm")[0];
			passwordForm.action = "/control/updatePassword";
			console.log(passwordForm);
			passwordForm.submit();
			console.log("Done.");
			return true;
		}
		else {
			//invalid password
			app.errormessage = "Current password you typed does not match with password in our records.  Please check spelling and try again.";
			return false;
		}
	}
	function usernameChange(){
		if($scope.loginmodalform.USERNAME.$valid){
			app.checkemail=false;
		}
	}
	$scope.usernameChange = usernameChange;
	function usernameKeyPressed($event){
		$scope.loginmodalform.$setPristine();
		$timeout(function(){$scope.app.USERNAME = $event.target.value.toLowerCase();$scope.$apply();}, 50);
	}
	$scope.usernameKeyPressed = usernameKeyPressed;
	$scope.newForgotPassword = newForgotPassword;
	function isFromOverlay(loginForm) {
		return ($(loginForm).closest("#modallogin").length > 0);
	}
	app.openreveal = function() {
		app.checkemail=false;
		if($('.reveal-modal-bg').hasClass("producttoolbardialog")){
			$('.reveal-modal-bg').removeClass("producttoolbardialog");
		}
		if(!$scope.loginmodalform.USERNAME.$valid){
			app.checkemail=true;
			return false;
		}
		$('.pop-up-msg-login-desk').foundation('reveal', 'open');
		/*$(document).foundation({
				reveal : {
					multiple_opened:true
				}
		});*/ 
	}
	app.revealclose = function(){
		$('.pop-up-msg-login-desk').foundation('reveal', 'close');
	}
    var decrementCountdown = function(){
	        $rootScope.countdown -=1;
	        if($rootScope.countdown ==0){
	        	$rootScope.showaction = "ActiveResend";
	        }
	   };
	   $scope.startCountdown = function(){
		    $rootScope.showaction = "DeactiveResend";
			$interval(decrementCountdown, 1000, $rootScope.countdown);
	   }
}]);
function focusOnThis(){
	$("#" + document.inputToFocus).focus();
}


