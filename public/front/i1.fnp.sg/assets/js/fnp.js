///////////GLOBAL VARIABLES/////////////////////
var occasionValPresentInPlace = false;
var quickShopDeliveryCutoffTime = 21; /* Setting default as 9pm */
var lastConversionFactor = 1;
var lastCurrencyFormat = "Rs.";
// var cookieDomain=".fnp.com";
var internationalHostName="https://www.fnp.com";
var isPrototype = false;
var dateFormat = "dd-mm-yy";
var isPlaceChanged = false;
var selectedCourierPinCode = null;
var courierPincodesList = null;
var quickshopoccasion = null;
var quickshopcity = null;
var shipmentDetails = null;
var selectedshippingmethodprice = null;
var imageElementTemplate;
var popSearchData = [];
//var cssFilesList = ["angular/angular-material.css" ,"foundation/normalize.css", "foundation/foundation.css", "rupeefont.css", "style.css", "slick.css", "slick-theme.css","jquery/jquery-ui.css","responsive-tables.css","jquery/jquery-ui.accordion.css","common.css","fnp.css"];
//var cssFilesList = ["angular/angular-material.css" ,"foundation/normalize.css", "rupeefont.css", "style.css", "slick.css", "slick-theme.css","jquery/jquery-ui.css","responsive-tables.css","jquery/jquery-ui.accordion.css","common.css","fnp.css"];

//var prodPageCssList =["product.css","jquery/jquery.sliderTabs.css","contenttab.css"];
var categoryPageCssList = ["categorystyle.css","topmenu.css"];
// //////////////////////////////////////////////
var productListSelector = "div.productlisting ul > li.h-product";
var productAttributeName = "data-product-id";
var countrycurrency=defaultCurrencyUomId;
var productPersonalizedMap= null;
var useDefaultConfig = false;
var isCityPage=false;
var isDeliveryDate=false;
var hasQueryCity=false;
var deliveryCityLock="";
var deliveryDateLock="";
var gotItFlag="false";
var MAX_SUGGESTIONS = 7;
var qsList = {qscity: []};
var currentdomain=window.location.hostname.split('.');
currentdomain="."+currentdomain[currentdomain.length-2]+"."+currentdomain[currentdomain.length-1];
//////////////////////////////////
var pincode_Track="";
var placeId_Track="";
var DeliveryAddressTrackUrl="";
var userDetails=null;
var arrayOfFunctionsForFNPCheckLogin=[];
var isFNPCheckLoginRunning  = false;

/*
 * if(document.domain.indexOf(cookieDomain)==-1){ cookieDomain="."+document.domain }
 */

var fnpApp = angular.module("fnp", [ "ngResource", "angular.filter", "ngSanitize","ngMaterial","infinite-scroll"]).config(
		[ '$httpProvider', '$compileProvider', '$locationProvider', '$sceProvider', function($httpProvider, $compileProvider, $locationProvider, $sceProvider) {
			$sceProvider.enabled(false);
			$compileProvider.debugInfoEnabled(false);
			$httpProvider.defaults.withCredentials = true;
			$locationProvider.html5Mode(false);
			$locationProvider.hashPrefix('!');
		} ]);

fnpApp.constant("$MD_THEME_CSS",""); //for removing default theme color of angular material
fnpApp.factory("LoginService", LoginService);
fnpApp.controller('LoginCntrl', function(LoginService, $rootScope) {
	var app = this;
	if(userDetails === null){
		app.loggedIn = false;
		$rootScope.isOAuthUser = false;
	}	
	// check the login
	app.checkLogin = function() {
		LoginService.checkLogin().then(function(response) {
			app.loginResult = response;
			$(".tempspan").remove();
			if (app.loginResult.checklogin && app.loginResult.checklogin.loggedin) {
				app.loggedIn = true;
				if (window.location.protocol == "https:" || window.location.href.indexOf("account")>-1 || window.location.href.indexOf("customerorder-view")>-1 || window.location.href.indexOf("/control/order-confirmation")>-1) {
					app.fullname = "Hi " + app.loginResult.checklogin.fullname;
				} /*else {
					app.fullname = app.loginResult.checklogin.fullname;
				}*/
				var isCustomizedOption = app.loginResult.checklogin.isCustomizedOption
				if (isCustomizedOption != null && isCustomizedOption != undefined && isCustomizedOption == true) {
					var customizedLevel = app.loginResult.checklogin.agentOptions.name;
					var customizedUrl = app.loginResult.checklogin.agentOptions.url;
					$('#otherOptions').html("<a id='customProdLink' title='Customize Product' href='"+ customizedUrl +"'>"+ customizedLevel+"</a>");
				} 
				$rootScope.isOAuthUser = app.loginResult.checklogin.isOAuthUser;
				handleLogin();
			}
            else{
                if(window.location.href.indexOf("account")<0){
                    $('#loggedinuser').addClass('removeafter');
                }
                app.fullname = "Account";
            }

		});

	};
	// onload check the login
	//app.checkLogin();
	function handleLogin() {
		$("#login").removeAttr("modalname").removeClass("close-reveal-modal").off();
		$("#login").on('click', function() {
			$(".toolbardialog").foundation('reveal', 'close');
			$('.logindropdown').slideToggle();
		});
	}
});

function removeReadonlyFieldsFromTabbing() {
	var inputs = $(document).find("input , textarea");
	$.each(inputs, function() {
		if ($(this).is(':disabled, [readonly]')) {
			$(this).attr('tabIndex', '-1');
		}
	});
}

function LoginService($resource) {
	var totalcart = 0;
	return {
		checkLogin : checkLogin
	};
	function checkLogin() {
		var checkLoginUrl = "https://" + secureHostNameToUse + '/control/fus';
		var resource = $resource(checkLoginUrl);
		resource.global = false;
		return resource.save().$promise;
	}
}

fnpApp
		.controller(
				'FormCntrl',
				function($scope, $window, $rootScope, $timeout) {
					var app = this;
					app.showcoupon = false;
					app.showcouponform = true;

					// pre populating the users email address, when we are redirected
					if ($window.PRE_USER_FIRST_NAME) {
						app.USER_FIRST_NAME = $window.PRE_USER_FIRST_NAME;
					}

					if ($window.PRE_CUSTOMER_MOBILE_CONTACT) {
						app.CUSTOMER_MOBILE_CONTACT = parseInt($window.PRE_CUSTOMER_MOBILE_CONTACT);
					}

					if ($window.PRE_CUSTOMER_EMAIL) {
						app.CUSTOMER_EMAIL = $window.PRE_CUSTOMER_EMAIL;
					}

					app.redirect = function(url) {
						$window.location.href = url;
						return true;
					};

					app.attribute = function(url) {
						var myEl = angular.element(document.querySelector('.commonpassword'));
						if (app.loginaction == 'signup') {
							myEl.attr('pattern', "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!#$%&'()*+,-./:;<=>?@[\]^_`{|}~\d]{6,60}$");
						} else {
							myEl.removeAttr('pattern');
						}
						if (app.loginaction == 'forgotpassword') {
							myEl.removeAttr('data-ng-focus');
						}
					};

					app.productDelivery = function(type, hide) {
						if (pincode != null || type == 'INTERNATIONAL') {
							app.date = 'x';
						}
						return productDelivery(type);
					};

					app.submitAction = function(valid, url) {
						if (!valid) {
							$(window).scrollTop(0);
							return valid;
						} else {
							app.redirect(url);
							return valid;
						}

					};

					// app.sendmail=function(){
					// app.showlogin=false;
					// app.changepassword=true;
					// sendPassword();
					// };

					app.clearfields = function() {
						// app.USERNAME = "";
						app.PASSWORD = "";
					};

					app.submitFranchiseForm = function() {
						$scope.form.$setPristine();
						var username = app.username;
						var trackemail = app.trackemail;
						var phone = app.phone;
						var remark = app.remark;
						var trap = app.honeytrap;
						var address = app.address;
						var param = 'username=' + username + '&' + 'trackemail=' + trackemail + '&' + 'phone=' + phone +  '&'
								 + 'Remark=' + remark + '&' + 'honeytrap=' + trap+' Address='+address;
						console.log(param);
						$.ajax({
							type : 'POST',
							dataType : 'json',
							sync : true,
							url : '/control/franchiseEmailNotification',
							data : {
								"username" : username,
								"trackemail" : trackemail,
								"phone" : phone,
								"remark" : remark,
								"honeytrap" : trap,
								"address" : address
							},
							success : function(data) {
								var message = data.responseMsg;
								$("#result").text(message);
								$("#result").html();
								$("#result").show().fadeOut(10000);
								$('.registerfrm form').trigger("reset");
								app.username = '';
								app.trackemail = '';
								app.phone = '';
								app.pincode = '';
								app.remark='';
								app.address = '';
								app.count = '';
							}
						});

					};

					app.showTip = function(tooltipid, className) {
						showToolTip(tooltipid, className)
					};
					app.showToolTip = function() {
						app.singupsuccess = true;
						return false;
					};

					app.showSucessAlert = function() {
						app.show = true;
						return false;
					};
					app.addToCart = function(form) {
						var valid = validateProductForm();
						if (valid) {
							// $('#addon').foundation('reveal','open');
							itemsInCustomerCart = null; 
							if(pincode){
								document.productfrm.pinCode.value = pincode;
							}
							if(document.productfrm.deliveryLocation.value == ""){
								document.productfrm.deliveryLocation.value = $("#destlookup") != undefined && $("#destlookup") != null ? $("#destlookup").val() : pincode;
							}
							//Setting cookie if customer click on click on PDP 'add-to-cart' button
							var isbuybutton = $("input[name='isbuynow']").val();
							if(isbuybutton == "N"){
								setCookie('cartpopup', 'Y', 1, "/");
							}
							//document.productfrm.deliveryLocation.value = pincode;
							document.productfrm.matchedPincode.value = pincode;
							$.ajax({
								url : 'https://'+ secureHostNameToUse +'/control/additem',
								xhrFields: {withCredentials: true},
								type : 'post',
								data : $('#productfrm').serialize(),
								success : function(data) {
									var jsonDtls = JSON.parse(data);
									var isSuccess = jsonDtls.isSuccess;
									if (isSuccess) {
										var itemIndex = jsonDtls.itemIndex;
										$rootScope.$broadcast('cartcount');
										$("#product").effect("transfer", {to: $("#cart")}, 1500, function(){$(".ui-effects-transfer").empty();});
										$(".ui-effects-transfer").html("<img src='" + $("#detailImage1").attr("src") + "'/>");
										showAddons(itemIndex);
									} else {
										var errorMessages = data.errorMsg;
										var eventMessages = data.eventMsg;
										console.log(eventMessages); //for debugging purposes...do not remove even in production[VK]
										if(errorMessages && errorMessages.length > 0){
											$("#addtocarterrors").html(errorMessages);
										}
									}
								}
							});
							itemsInCustomerCart = null; //for cartCountItem call will run newly 
							viewCartData = null; // for viewcart item call will run newly
							viewCartForOmni = null; // for viewcart?isExternal=Y will run newly
						} else {
							return false;
						}
					};
					// if form is not valid then return the form.
					app.verify = function(event, formId) {
						var formName = $("#" + formId).attr('name');
						var submitForcefully = $("#" + formId).attr("submitforce");
						if ($scope[formName].$valid || submitForcefully) {
							if ($('input:checkbox[name=fnpAccount]').is(':checked')) {
								$("#emailId").attr("name", "USERNAME");
								// $("#loginfrm").attr("action","/account/formlogin");
								$("#loginfrm").attr("action", "/control/login");
							}
							if (!submitForcefully) {
								var submitButton = jQuery("#" + formId).find("input[type='submit']");
								submitButton.prop('disabled', true);
								submitButton.addClass("loadinggif");
							}
							//jQuery("#" + formId).submit();
						} else {
							$scope[formName].$submitted = true;
							var $firstEle = angular.element("#" + formId + " .ng-invalid:eq(0)");
							if ($firstEle) {
								$(window).scrollTop($firstEle.offset().top - 100);
							}
							event.preventDefault();
						}
					};

					app.submitDeliveryAddress = function(event, formId) {
						var formName = $("#" + formId).attr('name');
						$scope[formName].$submitted = true;
						if ($scope[formName].$valid) {
							jQuery("#" + formId).submit();
						} else {
							event.preventDefault();
						}
					};

					app.submitCheckoutAddress = function(event, formId) {
						var formName = $("#" + formId).attr('name');
						if ($scope[formName].$valid) {
							$(".copyfield").each(function() {
								var copyFieldId = $(this).attr("baseFieldId");
								$(this).val($("#" + copyFieldId).val());
							});
							jQuery("#" + formId).submit();
						} else {
							event.preventDefault();
						}
					};
					
					/* @shakeel for Netbanking */

						app.subscribe = function() {
						$('#newuserdialog').foundation('reveal', 'close');
						app.subscribesuccess = false;
						app.subscribefail = false;
						var emailId = app.emailId;
						var htrap = app.honeytrapfield;
						$.ajax({
							url : '/control/subscribe-user',
							type : 'post',
							data : {
								"emailId" : emailId,
								"honeytrap" : htrap
							},
							success : function(response) {
								app.subscribemsg = response;
								if (response.indexOf('success') > 0) {
									app.subscribesuccess = true;
								} else {
									app.subscribefail = true;
								}
								$scope.$digest();
							}
						});
					}

					app.changePassword = function($event, server) {
						var formName = "passwordfrm";
						var loginForm = document.forms[formName];
						$scope[formName].$submitted = true;
						loginForm.DONE_PAGE.value = "/account/my-account";
						return preChangePassword(server, loginForm);
					};


					app.registerCustomer = function($event, formId) {
						var formName = $("#" + formId).attr('name');
						$scope[formName].$submitted = true;
						var create_allow_password = $('#create_allow_password').val();
						var allowPassword = $('#allowPassword').val();
						// var verifypassword = $('#verifypassword').val();
						var USER_FIRST_NAME = $('#USER_FIRST_NAME').val();
						var CUSTOMER_EMAIL = $('#CUSTOMER_EMAIL').val();
						var mobile = $('#mobile').val();
						var CUSTOMER_MOBILE_CONTACT = $('#CUSTOMER_MOBILE_CONTACT').val();
						var PASSWORD = $('#PASSWORD').val();
						// app.verify($event, formName);
						if ($scope[formName].$valid) {
							$.ajax({
								dataType : "json",
								url : '/control/customerRegister',
								type : 'post',
								data : {
									"create_allow_password" : create_allow_password,
									"allowPassword" : allowPassword,
									"USER_FIRST_NAME" : USER_FIRST_NAME,
									"CUSTOMER_EMAIL" : CUSTOMER_EMAIL,
									"mobile" : mobile,
									"CUSTOMER_MOBILE_CONTACT" : CUSTOMER_MOBILE_CONTACT,
									"PASSWORD" : PASSWORD
								},
								success : function(data) {
									// TODO show success message or failure message
									var errorMessage = data.error;
									if (errorMessage == null || errorMessage == undefined) {
										//location.reload();
									} else {
										$("#resultMessage").html(errorMessage);
										$("#resultMessage").show();
									}
								}
							});
						} else {
							return false;
						}
					}

					app.toggleDeliveryAddressData = function(cartItemIndex, uniqueIdenNum, contactMechId) {
						app["addresselect_index_" + cartItemIndex] = uniqueIdenNum;
						app["selectedContactMechId_" + cartItemIndex] = contactMechId;
						app["selected_address_" + uniqueIdenNum + "_" + cartItemIndex] = true;
						var selectedaddress =  uniqueIdenNum + "_" + cartItemIndex;
                        var rnameSelected =  app["rname_"+uniqueIdenNum+"_"+cartItemIndex];
                        if (uniqueIdenNum) {
                            app.recipient_name_card = "Dear " + rnameSelected;
                            app[ "recipientname_card_" + cartItemIndex] = "Dear " + rnameSelected;
                        }
					}

					app.toggleSaveAddressData = function(cartItemIndex) {
						app["savedaddress_" + cartItemIndex] = true;
						var uniqueIdeNum = app["addresselect_index_" + cartItemIndex];
						app["selectedContactMechId_" + cartItemIndex] = app["contactMechId"+uniqueIdeNum];
						app["selected_address_" + uniqueIdeNum + "_" + cartItemIndex] = true;
					}

					// added copy address functionality in deliveryaddress page
					app.updateChildText = function (pincode, inputName, cartItemIndex){
						var modelName = inputName + "_" + cartItemIndex;
						var matchedGiftsEle = inputName + "_" + pincode;
						var enteredValue = app[modelName];
						var allMatchedJqueryEle  = $("."+matchedGiftsEle);
						if(!enteredValue){
							enteredValue=$("#"+modelName).val();
						}
						$.each(allMatchedJqueryEle, function() {
							var childElementIndex = $(this).attr('data-refcartitemindex');
							if(app["editaddress_"+childElementIndex] != false){
								var childModelName = inputName + "_" + childElementIndex ;
								app[childModelName]= enteredValue; 
							}	
						});
					}
					
					app.newAddressEdit = function (itemindex,pincode,itemStatus){
						var inputcls = $("."+pincode);
						var firstpinindex= inputcls[0].getAttribute('data-refCartItemIndex');
						if(itemStatus){
							var nameval=app["rname_" + firstpinindex];
							var address1val= app["address_line_1_" + firstpinindex];
							var address2val= app["address_line_2_" + firstpinindex];
							var telval= app["rTel_" + firstpinindex];
							app["rname_" + itemindex]=nameval;
							app["address_line_1_" + itemindex]=address1val;
							app["address_line_2_" + itemindex]=address2val;
							app["rTel_" + itemindex]=telval;
							
						}
					}
					
					app.checkChildText = function(item){
						app["editaddress_" + item] = false;
					}
					app.toggleNewAddress = function(cartItemIndex) {
						app["savedaddress_" + cartItemIndex] = false;
						app["selectedContactMechId_" + cartItemIndex] = 'newaddress';
                        app["checkmessage_"+cartItemIndex] = false;
						$timeout(function() {
							initializeSelectMenu('.editcountrycode');
                            $(".ui-selectmenu-menu").addClass("selectcode");
                            if($(".countrycode").length){
                            	initializeSelectMenu(".countrycode");
                        	    $(".ui-selectmenu-menu").addClass("selectcode");        
                            	$(".countryCode-button").attr("tabindex","-1");
                           }
                            var inputs = $('.pro-details').find("input , textarea");
                            $.each(inputs, function() {
                            if ($(this).is(':disabled, [readonly]')) {
                                $(this).attr('tabIndex', '-1');
                            }
                        });
						}, 500);
                        
					}

					 app.submitEditData = function(formObj, formId, e){						
						 if(formObj.$valid) {
							 var submitButton = jQuery("#" + formId).find("input[type='submit']");
							 submitButton.prop('disabled', true);
							 submitButton.addClass("loadinggif");
							$("#sendform").attr("action", "/control/saveDeliveryAddressData");
							$("#sendform").attr("ng-non-bindable", "ng-non-bindable");
							$("#sendform").attr("submitforce", true);
							$.ajax({
						        type: "POST",
						        async: false,
						        url: $("#sendform").attr("action"),
						        data: $("#sendform").serialize(),
						        success: function(data){
						        	console.log("Done with saving cart data."+ data);
						        },
						        complete : function(jq, status){
						        	console.log("Status of the rquest (save cart data)."+ status);
						        	return  true;
						        }
						      });
									// var submitButton = jQuery("#" + formId).find("button.saveaddress");
									// disableAndAddLoadingGift(submitButton);
					  	 } else{
					  		formObj.$submitted = true;
//							var $firstEle = angular.element(".ng-invalid:eq(1)");
//							if($firstEle) {
//								$(window).scrollTop($firstEle.offset().top-$firstEle.height()-100);
//							}
						    e.preventDefault();
						}
					 };

					app.initDeliveryAddressData = function(cartItemIndex, uniqueIdenNum, contactMechId) {
						if(!app["addresselect_index_" + cartItemIndex]){
							app["addresselect_index_" + cartItemIndex] = uniqueIdenNum;
							app["selected_address_" + uniqueIdenNum + "_" + cartItemIndex] = true;
							app["selectedContactMechId_" + cartItemIndex] = contactMechId;
							app["savedaddress_" + cartItemIndex] = true;
						}
					}

					var initVar = function(varName, varVal){
						app[varName] = varVal;
					}
					app.saveCardMessage = function(formObj){
						var identifier = $('#cardmessage form').attr("data-setActiveCartItemIndex");
                        app[ "recipientname_card_" + identifier] = app["recipient_name_card"];
                        app[ "cardMsg_" + identifier] = app["message_card"];
                        app[ "wish_card_" + identifier] = app["wishes_card"]
                        app[ "sendername_card_" + identifier] = app["sender_name_card"];
						if(typeof event != "undefined") event.preventDefault();
						formObj.$submitted = true;
						if(!formObj.$invalid){
							$('#cardmessage').foundation('reveal','close');
							$('#f1_container').removeClass('card-open');
						    $('#cardmessage .form').removeClass('show');
						}
					}
					app.selectCardMessage = function(cartItem){
						var isChecked = app["checkmessage_"+cartItem];
                        if(isChecked) {
                        	$scope.messageoncard.$setPristine();
                            var cardMessageItemIndex = cartItem;
                            if($('#cardmessage form').attr("data-setActiveCartItemIndex") != cardMessageItemIndex){
                                app.recipient_name_card = "";
                                app.message_card = "";
                                app.wishes_card = "";
                                app.sender_name_card = "";
                            }
    						var sendersname = app.sname;
    						var recipientname = $('#rname_'+cardMessageItemIndex).val();
    						if(recipientname){
    							app.recipient_name_card = "Dear " + recipientname.trim();
    					 	}
    						if(sendersname){
    							app.sender_name_card = sendersname.trim();
    						}
    						var addressIndex = app["addresselect_index_"+cartItem];
                            if(app["savedaddress_" + cartItem] == true){
                                var rnameSelected =  app["rname_"+addressIndex+"_"+cartItem];
                            }
                            else{
                                app.message_card = "";
                                var rnameSelected =  '';
                            }
                            app.wishes_card = "Best Wishes";
							if (addressIndex) {
								if(rnameSelected){
				            		app.recipient_name_card = "Dear " + rnameSelected;
				            	}
								app.sender_name_card = sendersname;
							}
                            $('#cardmessage').foundation('reveal', 'open');
                            $('#cardmessage form').attr("data-setActiveCartItemIndex", cardMessageItemIndex);
                        } else {
                            app.recipient_name_card = "";
                            app.message_card = "";
                            app.wishes_card = "";
                            app.sender_name_card = "";
                        }
                    }
                    app.clearCardMessage = function(){
                        var identifier = $('#cardmessage form').attr("data-setActiveCartItemIndex");
                        var messageExist = app["cardMsg_"+identifier];
                        if(!messageExist){
                            app.recipient_name_card = "";
                            app.message_card = "";
                            app.wishes_card = "";
                            app.sender_name_card = "";
                            $("#checkbox_"+ identifier).attr('checked',false);
                            app["checkmessage_"+ identifier] = false;
                        }
                    }

                    app.editCardMessage = function(cartItem) {
                            var cardMessageItemIndex = cartItem;
                            $('#cardmessage form').attr("data-setActiveCartItemIndex", cardMessageItemIndex);
                            //setting recipiennt name if exists
                            var rName = app[ "recipientname_card_" + cardMessageItemIndex];
                            if(!rName || rName.length < 0){
                                var addressIndex = app["addresselect_index_"+cardMessageItemIndex];
                                rName =  app["rname_"+addressIndex+"_"+cartItem];
                            }
                            app["recipient_name_card"] = app[ "recipientname_card_" + cardMessageItemIndex];
                            //setting sender name
                            var sName = app[ "sendername_card_" + cardMessageItemIndex];
                            if(!sName || sName.length < 0){
                                sName = app.sname;
                            }
                            app["sender_name_card"] = sName;
                            //if there is message exists
                            app["message_card"] = app[ "cardMsg_" + cardMessageItemIndex];
                            app["wishes_card"] = app[ "wish_card_" + cardMessageItemIndex];
                            $('#cardmessage').foundation('reveal','open');
                    }
                    
					app.editDeliveryAddress = function(event, cartItemIndex, index) {
						event.stopPropagation();
                        initializeSelectMenu(".editcountrycode");
						var identifier = "_" + index + "_" + cartItemIndex;
						//app["editaddress_" + cartItemIndex] = 1;
						//app["savedaddress_" + cartItemIndex] = false;
						//app["newaddress_" + cartItemIndex] = true;
						//populateDeliveryAddress(identifier, cartItemIndex, app);
						var postalCode = $("#postalcode" + identifier).text();
						var contactNumber = $("#telecom" + identifier).text();
						var cityName = $("#city" + identifier).text();
						var address = $("#address" + identifier).text();
						var address2 = $("#address2" + identifier).text();
						var isIntlCatalog = $("#isIntlCatalog" + identifier).text();
						var emailId = $("#email" + identifier).text();
						var toPostalName = $("#rname" + identifier).text();
						var postalContactMechId = $("#contactMechId" + identifier).val();
						var telCountryCode = $("#telecomCountry" + identifier).text();
						var countryGeoId = $("#countrygeoid_"+ cartItemIndex).val();

						app["postalAddress"] = postalContactMechId;
						app["toName"] = toPostalName;
						app["address"] = address;
						app["city"] = cityName;
						app["phone"] = contactNumber;
						app["attnName"] = emailId;
						if(telCountryCode){
							app["editcountryCode"] = telCountryCode;
						}
						app["postalcode"] = postalCode;
						app["itemIndex"] = cartItemIndex;
						app["countryGeoId"] = countryGeoId;
						app["address2"] = address2;
						if (isIntlCatalog === "true"){
							app["isIntlCatalog"] = isIntlCatalog;
						}

						$('#editdialog').foundation('reveal','open');
						editDialog();
						setTimeout(function(){
                            $('.autogrow').trigger("keyup");
							$( ".editcountrycode" ).selectmenu( "refresh" );
						},500);
                        
					}

					app.populatePreviousAddress = function(cartItemIndex, selectedValue) {
						app["savedaddress_" + cartItemIndex] = false;
						app["selectedContactMechId_" + cartItemIndex] = "newaddress";
						app["samegift_selected_" + cartItemIndex] = false;
						if (selectedValue && selectedValue != "new") {
							var splitValue = selectedValue.split(":");
							var cartItem = splitValue[0];
							var fnpCartItem = splitValue[1];
							app["selectedContactMechId_" + cartItemIndex] = "sameasgift:" + cartItem;
							app["samegift_selected_" + cartItemIndex] = true;
							app["samegift_selected_index_" + cartItemIndex] = fnpCartItem;
						} else {
							clearFormAddress(cartItemIndex, app);
						}
					}
					
					app.validateMobileNumber = function(formObj){
			            if(typeof event != "undefined") event.preventDefault();
				    	formObj.$submitted = true;
				    	if(!formObj.$invalid){
				    	    $('#modalmobilenumber').foundation('reveal','close');
				    	}
					}

				});


function populateDeliveryAddress(identifier, cartItemIndex, app) {
	var postalContact = $("#postalcode" + identifier).text();
	var contactNumber = $("#telecom" + identifier).text();
	var cityName = $("#city" + identifier).text();
	var address = $("#address" + identifier).text();
	var emailId = $("#email" + identifier).text();
	var toPostalName = $("#rname" + identifier).text();
	var postalContactMechId = $("#contactMechId" + identifier).val();

	app["selectedContactMechId_" + cartItemIndex] = "editaddress";
	app["rname_" + cartItemIndex] = toPostalName;
	app["postalcode_" + cartItemIndex] = postalContact;
	app["address_" + cartItemIndex] = address;
	app["city_" + cartItemIndex] = cityName;
	app["rTel_" + cartItemIndex] = parseInt(contactNumber);
	app["recipientEmail_" + cartItemIndex] = emailId;
}

function clearFormAddress(cartItemIndex, app) {
	app["selectedContactMechId_" + cartItemIndex] = "newaddress";
	app["rname_" + cartItemIndex] = "";
	app["address_" + cartItemIndex] = "";
	app["rTel_" + cartItemIndex] = null;
	app["recipientEmail_" + cartItemIndex] = "";
}

function customizeDeliveryAddrBox() {
	var sortSelectMenu = $(".previousaddressbox").selectmenu({
		position : {
			my : "right bottom",
			at : "right top"
		},
		icons : {
			button : "ui-icon-carat-1-n"
		},
		change : function(event, ui) {
			/*
			 * if(ui.item.value){ $(this).next(".ui-selectmenu-button").find(".ui-selectmenu-text").css("color", "#7ac4df"); } else {
			 * $(this).next(".ui-selectmenu-button").find(".ui-selectmenu-text").css("color", "#000"); }
			 */
			$(this).next(".ui-selectmenu-button").find(".ui-selectmenu-text").attr("id", event.target.id + "selectmenu");
			$(this).val(ui.item.value);
			$(this).trigger("change");
		}
	});
}

fnpApp.controller('PaymentController', function($scope, $filter, $resource) {
	var app = this;
	app.updateCardStatus = function(value) {
		app.cardstatus = value;
	}
	// on for the selected bank name in the list show bank name
	app.fetchBankNameByCode = function(code) {
		if (code) {
			return $filter('filter')(app.netBankList, {
				bankcode : code
			})[0].bank;
		}
		return false;
	}
	
	$scope.updateCCModel=function(){ 
		if(angular.isDefined(app.expiryMonth)){
			if(app.expiryMonth.length < 2 && app.expiryMonth > 1){
				app.expiryMonth = "0" + app.expiryMonth;
			}else if(app.expiryMonth.length == 2 && app.expiryMonth > 12){
				app.expiryMonth = '';
			}
		}
	};
	$scope.updateCCModelOnBlur=function(){ 
		if(angular.isDefined(app.expiryMonth)){
			if(app.expiryMonth.length < 2){
				if(app.expiryMonth == 0){
					app.expiryMonth = '';
				}else{
					app.expiryMonth = "0" + app.expiryMonth;
				}
			}
		}
	};
	$scope.updateDCModel=function(){ 
		if(angular.isDefined(app.dcExpiryMonth)){
			if(app.dcExpiryMonth.length < 2 && app.dcExpiryMonth > 1){
				app.dcExpiryMonth = "0" + app.dcExpiryMonth;
			}else if(app.dcExpiryMonth.length == 2 && app.dcExpiryMonth > 12){
				app.dcExpiryMonth = '';
			}
		}
	};
	
	$scope.updateDCModelOnBlur=function(){ 
		if(angular.isDefined(app.dcExpiryMonth)){
			if(app.dcExpiryMonth.length < 2){
				if(app.dcExpiryMonth == 0){
					app.dcExpiryMonth= '';
				}else{
					app.dcExpiryMonth = "0" + app.dcExpiryMonth;
				}
			}
		}
	};
	
	$scope.ccardlength = "3";
	$scope.dcardlength = "3";
	
	$(document).on("keydown blur", "#ccnumber",function(){
		$(".carderrormsg_CC").hide();
		$("#ccard-type-icon").removeClass();
		cardType = getCardType(this.value.replace(/\s/g, ''));
		if("amex" == cardType){
			$scope.ccardlength = "4";
			$("#checkOutPaymentId_EXT_PAYU").val("EXT_AMEX");
		}else{
			$scope.ccardlength = "3";
			$("#checkOutPaymentId_EXT_PAYU").val("EXT_PAYFORT");
		}
		$("#creditCardType").val(cardType);
		$("#ccard-type-icon").addClass(cardType + "-card").fadeIn(3000);
	});
	
	$(document).on("keydown blur", "#dcnumber",function(){
		$(".carderrormsg_DC").hide();
		$("#dcard-type-icon").removeClass();
		cardType = getCardType(this.value.replace(/\s/g, ''));
		if("amex" == cardType){
			$scope.dcardlength = "4";
		}else{
			$scope.dcardlength = "3";
		}
		$("#debitCardType").val(cardType);
		$("#dcard-type-icon").addClass(cardType + "-card").fadeIn(3000);
	});
	
	app.submitPaymentForm = function(event, formId) {
		var formName = $("#" + formId).attr('name');
		$scope[formName].$submitted = true;
		var isValid = true;
		//checking if ever the entered card number is valid or not.
		if(formId == "checkoutInfoFormCC"){
			if($("#ccardcvv").val()==""){
				app.cvv =''; // clearing the model to show angular validation required error
				isValid = false;
			}
			if($("#isValidCreditCard").length && $("#isValidCreditCard").val()=="N"){
				isValid = false;
			}
		}else if(formId == "checkoutInfoFormDC"){
			if($("#isValidDebitCard").length && $("#isValidDebitCard").val()=="N"){
				isValid = false;
			}
			if($("#dccvv").val()==""){
				app.dccvv =''; // clearing the model to show angular validation required error
				isValid = false;
			}
		}
		
		if ($scope[formName].$valid && isValid) {
			var jqueryFormObj = jQuery("#" + formId);
			var submitButton = jqueryFormObj.find("button.pay");
			var checkOutPaymentId = jqueryFormObj.find("[name='checkOutPaymentId']").val();
			if(checkOutPaymentId && checkOutPaymentId == "EXT_PAYFORT"){
				// Added this condition because payfort does not allow to send card details to our servers
				// we need to pass card details directly to gateway. Due to which we are doing ajax sync
				// to create order and get payfort signature
				var formDatatoSubmit = getFormData(jqueryFormObj);
				// we are removing card data and sending remaining data to server
				delete formDatatoSubmit["expiryYear"];
				delete formDatatoSubmit["expiryMonth"];
				delete formDatatoSubmit["cvv"];
				delete formDatatoSubmit["cardNumber"];
				delete formDatatoSubmit["cardName"];
				delete formDatatoSubmit["ccnum"];
				delete formDatatoSubmit["nameOnCard"];
				var actionURL = jqueryFormObj.attr("action");
				submitButton.prop("type", "button");
				$.ajax({
					url   : actionURL,
					type  : 'POST',
					data  : formDatatoSubmit,
					success : function(respData) {
						// experiment
					},
					error : function(){
						//error message in case of error in make payment
						// TODO can we make it better way ??
						if(formId == "checkoutInfoFormDC"){
							$(".carderrormsg_DC").show();
							$(".carderrormsg_DC").html("Something went wrong to process order.");
						} else if(formId == "checkoutInfoFormCC"){
							$(".carderrormsg_CC").show();
							$(".carderrormsg_CC").html("Something went wrong to process order.");
						}
						submitButton = jqueryFormObj.find("input[type='submit']");
						enableAndAddLoadingGift(submitButton);
						submitButton.prop("type", "submit");
					}
				}).done(function(respData){
					//convert string json format to json object
					respData = angular.fromJson(respData);
					var formDatatoSubmit = getFormData(jqueryFormObj);
					//adding back the card data to object to submit to payfort to generate tockenizer
					respData["expiry_date"] =  formDatatoSubmit["expiryYear"]+formDatatoSubmit["expiryMonth"];
					respData["card_security_code"] =  formDatatoSubmit["cvv"];
					//TODO - cardName using here due to insufficient data params. Work in other way for now ok.
					respData["card_holder_name"] =  formDatatoSubmit["cardName"] ?  formDatatoSubmit["cardName"].toUpperCase(): formDatatoSubmit["cardName"];
					respData["card_number"] =  formDatatoSubmit["cardNumber"];
					callPayfortTockenizer(respData);
				});
				event.preventDefault();
			} else {
				if (!submitButton || submitButton.length == 0) {
					submitButton = jQuery("#" + formId).find("input[type='submit']");
				}
			}
			disableAndAddLoadingGift(submitButton);
		} else {
			var $firstEle = angular.element(".ng-invalid:eq(1)");
			if ($firstEle) {
				$(window).scrollTop($firstEle.offset().top - $firstEle.height() - 100);
			}
			event.preventDefault();
		}
	};

	app.netBankList = [ {
		bank : 'Bank of Baroda Corporate Banking',
		bankcode : 'BBCB',
		showtop : false
	}, {
		bank : 'Allahabad Bank NetBanking',
		bankcode : 'ALLB',
		showtop : false
	}, {
		bank : 'Andhra Bank',
		bankcode : 'ADBB',
		showtop : false
	}, {
		bank : 'AXIS Bank NetBanking',
		bankcode : 'AXIB',
		showtop : true,
		cssclass : 'axis'
	}, {
		bank : 'Bank of Bahrain and Kuwait',
		bankcode : 'BBKB',
		showtop : false
	}, {
		bank : 'Bank of Baroda Retail Banking',
		bankcode : 'BBRB',
		showtop : false
	}, {
		bank : 'Bank of India',
		bankcode : 'BOIB',
		showtop : false
	}, {
		bank : 'Bank of Maharashtra',
		bankcode : 'BOMB',
		showtop : false
	}, {
		bank : 'Canara Bank',
		bankcode : 'CABB',
		showtop : false
	}, {
		bank : 'Catholic Syrian Bank',
		bankcode : 'CSBN',
		showtop : false
	}, {
		bank : 'Central Bank Of India',
		bankcode : 'CBIB',
		showtop : false
	}, {
		bank : 'Citi Bank NetBanking',
		bankcode : 'CITNB',
		showtop : true,
		cssclass : 'citi'
	}, {
		bank : 'CityUnion',
		bankcode : 'CUBB',
		showtop : false
	}, {
		bank : 'Corporation Bank',
		bankcode : 'CRPB',
		showtop : false
	}, {
		bank : 'DCB Bank - Corporate Netbanking',
		bankcode : 'DCBCORP',
		showtop : false
	}, {
		bank : 'Dena Bank',
		bankcode : 'DENN',
		showtop : false
	}, {
		bank : 'Deutsche Bank',
		bankcode : 'DSHB',
		showtop : false
	}, {
		bank : 'Development Credit Bank',
		bankcode : 'DCBB',
		showtop : false
	}, {
		bank : 'Federal Bank',
		bankcode : 'FEDB',
		showtop : false
	}, {
		bank : 'HDFC Bank',
		bankcode : 'HDFB',
		showtop : true,
		cssclass : 'hdfc'
	}, {
		bank : 'ICICI Netbanking',
		bankcode : 'ICIB',
		showtop : true,
		cssclass : 'icici'
	}, {
		bank : 'Indian Bank',
		bankcode : 'INDB',
		showtop : false
	}, {
		bank : 'Indian Overseas Bank',
		bankcode : 'INOB',
		showtop : false
	}, {
		bank : 'IndusInd Bank',
		bankcode : 'INIB',
		showtop : false
	}, {
		bank : 'Industrial Development Bank of India',
		bankcode : 'IDBB',
		showtop : false
	}, {
		bank : 'ING Vysya Bank',
		bankcode : 'INGB ',
		showtop : false
	}, {
		bank : 'Jammu and Kashmir Bank',
		bankcode : 'JAKB',
		showtop : false
	}, {
		bank : 'Karnataka Bank',
		bankcode : 'KRKB',
		showtop : false
	}, {
		bank : 'Karur Vysya',
		bankcode : 'KRVB',
		showtop : false
	}, {
		bank : 'Karur Vysya - Corporate Netbanking',
		bankcode : 'KRVB',
		showtop : false
	}, {
		bank : 'Kotak Bank',
		bankcode : '162B',
		showtop : true,
		cssclass : 'kotak'
	}, {
		bank : 'Laxmi Vilas Bank-Corporate',
		bankcode : 'LVCB',
		showtop : false
	}, {
		bank : 'Laxmi Vilas Bank-Retail',
		bankcode : 'LVRB',
		showtop : false
	}, {
		bank : 'Oriental Bank of Commerce',
		bankcode : 'OBCB',
		showtop : false
	}, {
		bank : 'Punjab National Bank - Retail Banking',
		bankcode : 'PNBB',
		showtop : false
	}, {
		bank : 'Punjab National Bank-Corporate',
		bankcode : 'CPNB ',
		showtop : false
	}, {
		bank : 'Ratnakar Bank',
		bankcode : 'RTN',
		showtop : false
	}, {
		bank : 'Saraswat Bank',
		bankcode : 'SRSWT',
		showtop : false
	}, {
		bank : 'Shamrao Vitthal Co-operative Bank',
		bankcode : 'SVCB',
		showtop : false
	}, {
		bank : 'South Indian Bank',
		bankcode : 'SOIB',
		showtop : false
	}, {
		bank : 'Standard Chartered Bank',
		bankcode : 'SDCB',
		showtop : false
	}, {
		bank : 'State Bank of Bikaner and Jaipur',
		bankcode : 'SBBJB',
		showtop : false
	}, {
		bank : 'State Bank of Hyderabad',
		bankcode : 'SBHB',
		showtop : false
	}, {
		bank : 'State Bank of India',
		bankcode : 'SBIB',
		showtop : true,
		cssclass : 'sbi'
	}, {
		bank : 'State Bank of Mysore',
		bankcode : 'SBMB',
		showtop : false
	}, {
		bank : 'State Bank of Patiala',
		bankcode : 'SBPB',
		showtop : false
	}, {
		bank : 'State Bank of Travancore',
		bankcode : 'SBTB',
		showtop : false
	}, {
		bank : 'Union Bank - Corporate Netbanking',
		bankcode : 'UBIBC',
		showtop : false
	}, {
		bank : 'Union Bank of India',
		bankcode : 'UBIB',
		showtop : false
	}, {
		bank : 'United Bank Of India',
		bankcode : 'UNIB',
		showtop : false
	}, {
		bank : 'Vijaya Bank',
		bankcode : 'VJYB',
		showtop : false
	}, {
		bank : 'Yes Bank',
		bankcode : 'YESB',
		showtop : false
	} ];

	// $scope.form = {type : $scope.typeOptions[0].value};
	
	app.removeCouponFromPaymentPage = function(param){
		ajaxindicatorstart('');
		 var request = $resource('/control/removePromotion?promoCode='+param);
			return request.save().$promise.then(function(data){
				  location.reload();
			  }, "");
	}
});

// This method submit form dynamically to payfort to generate tockenizer
function callPayfortTockenizer(data){

	var payForForm = $('<form id="payFortFormId" name="payfortform" method="post" novalidate="novalidate"></form>');
	payForForm.attr("action", data.url);

	var sigHiddenEle = getHiddenElement("signature", data.signature);
	payForForm.append(sigHiddenEle);
	
	var serviceHideEle = getHiddenElement("service_command", data.service_command);
	payForForm.append(serviceHideEle);

	var merchHideEle = getHiddenElement("merchant_identifier", data.merchant_identifier);
	payForForm.append(merchHideEle);

	var accessHideEle = getHiddenElement("access_code", data.access_code);
	payForForm.append(accessHideEle);
	
	var merRefHideEle = getHiddenElement("merchant_reference", data.merchant_reference);
	payForForm.append(merRefHideEle);
	
	var langHideEle = getHiddenElement("language", data.language);
	payForForm.append(langHideEle);

	var tokenHideEle = getHiddenElement("token_name", "");
	payForForm.append(tokenHideEle);

	var returnHideEle = getHiddenElement("return_url", data.return_url);
	payForForm.append(returnHideEle);

	// card details
	var carHiddEle = getHiddenElement("card_number", data.card_number);
	payForForm.append(carHiddEle);
	
	var expHiddEle = getHiddenElement("expiry_date", data.expiry_date);
	payForForm.append(expHiddEle);

	var cvvHiddEle = getHiddenElement("card_security_code", data.card_security_code);
	payForForm.append(cvvHiddEle);

	var nameHiddEle = getHiddenElement("card_holder_name", data.card_holder_name);
	payForForm.append(nameHiddEle);
	
	//submit tockenizer
	payForForm.appendTo('body').submit();
	
	//document.getElementById("payFortFormId");
}

function getHiddenElement(eleName, elevalue){
	var hiddenEle = $("<input type='hidden' />");
	hiddenEle.attr("name", eleName);
	hiddenEle.attr("value", elevalue);
	return hiddenEle;
}

var monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
var days = [ "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT" ];
var samedayDeliveryTimer = null;

function startCountdownTimer() {
	$.ajax({
		url : '/control/getSameDayDeliveryTimeLeft',
		type : 'GET',
		dataType : "json",
		success : function(respData) {
			if (respData != null && respData.isDeliveryTimeAvailable != null && respData.isDeliveryTimeAvailable == true) {
				var today = convertTimestampStringToDate(respData.currentTimestamp);
				var nowTime = today.getTime();
				//var cutoffTime = Date.parse(respData.cutoffTimestamp);
				//cutoff time will have timestamp diff. where as deliveryDate has value of actual deliverable.
				var cutOffDate = convertTimestampStringToDate(respData.cutoffTimestamp);
				var cutoffTime = cutOffDate.getTime();

				var timeRemaining = cutoffTime - nowTime;
				timerTick(timeRemaining);

				//using deliveryDate from response for calculating the day on which it is actually deliverable.
				var deliveryDate = convertTimestampStringToDate(respData.deliveryDate);
                var day = deliveryDate.getDate();
                var month = parseInt(deliveryDate.getMonth())+1;
                var year = deliveryDate.getFullYear();

                var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
                if(day == today.getDate() && month == (parseInt(today.getMonth())+1) && year == today.getFullYear()){
                    $("#daylabel").text("today's");
                }else if(day == (parseInt(tomorrow.getDate())) && month == (parseInt(tomorrow.getMonth())+1) && year == tomorrow.getFullYear()){
                    $("#daylabel").text("tomorrow's");
                }else{
                    $("#daylabel").text(day + ", " + monthNames[month]);
                }

				// Updating the quick search delivery date cutoff time as well
				quickShopDeliveryCutoffTime = (new Date(cutoffTime)).getHours();
				var dateInString = $.datepicker.formatDate(dateFormat, deliveryDate);
				$("#samedaydeliverydate").val(dateInString);
			}else{
				timerTick(1);
				$("#daylabel").text("today's");
				var dateInString = $.datepicker.formatDate(dateFormat, convertTimestampStringToDate(respData.currentTimestamp));
				$("#samedaydeliverydate").val(dateInString);
			}
		}
	});
}
function timerTick(msRemaining) {
	if (msRemaining > 0) {
		var secondsRemaining = Math.floor(msRemaining / 1000);
		var hours = Math.floor(secondsRemaining / 3600);
		var minutes = Math.floor((secondsRemaining - (hours * 3600)) / 60);
		var seconds = secondsRemaining - hours * 3600 - minutes * 60;
		var displayText = hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
		$("#cutoffTime").text(displayText);
		samedayDeliveryTimer = setTimeout(function() {
			timerTick(msRemaining - 1000)
		}, 1000);
	} // else..automatically recursion stops
}

function disableShopNow(changeElement) {
	$(changeElement).parents(".quickfrm").find("button").prop("disabled", "disabled");
}
function initializeQuickShop() {
	// first load occasion list
	$(".quickshopoccasion").autocomplete({
		source : function(request, response) {
			var target = this.element;
			$.ajax({
				global : false,
				url : AJAX_JSON_URL_LIST.cityNamesUrl + "?facet=OCCASION_TAGS&FNP_CURRENT_CATALOG_ID=" + $("#FNP_CURRENT_CATALOG_ID").val(), /* "/control/getoccassionlist", */
				dataType : "json",
				data : {
					q : request.term.replace(/[^a-zA-z0-9\s]/gi, '').replace(/\s/gi, '-').toLowerCase()
				},
				success : function(data) {
                    quickshopoccasion = data;
					$(target).attr("data-isSelected", false);
					var q = request.term.replace(/[^a-zA-z0-9\s]/gi, '').replace(/\s/gi, '-').toLowerCase();
					var matchedData = [];
					for (var i = 0; i < data.length; i++) {
						if (data[i].normalized.indexOf(q) >= 0 || data[i].value.indexOf(q) >= 0) {
							matchedData.push(data[i]);
						}
					}
					response(matchedData);
				}
			});
		},
		position : {
			my : "left bottom",
			at : "left top"
		},
		open: function(event, ui) {
	        $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
		},
		select : function(event, ui) {
			$(this).attr("data-isSelected", true);
			$(this).parents(".quickfrm").find("button.quickshopbtn").prop("disabled", false);
		}
	});

	$(".pickdate").datepicker({
		dayNamesMin : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
		dateFormat : "D M, dd",
		minDate : (new Date().getHours()) < parseInt(quickShopDeliveryCutoffTime) ? 0 : 1,
		maxDate : '+120',
		showOtherMonths : true,
		selectOtherMonths : true,
		onSelect : function(dateText, inst) {
			var dateAsString = dateText; // the first parameter of this function
			var selectedYear = inst.currentYear;
			var newDateFormat = $.datepicker.parseDate("D M, d,yy", dateAsString+','+selectedYear);
			$("input[name='deliverydate']").val($.datepicker.formatDate(dateFormat, newDateFormat));
			$(this).parents(".quickfrm").find("button.quickshopbtn").prop("disabled", false);
		},
		inline : true,
		position : {
			my : "left bottom",
			at : "left top"
		},
		beforeShow : function(input, inst) {
			var rect = input.getBoundingClientRect();
			var calendar = inst.dpDiv.css({
				top : rect.top - 14
			});
			setTimeout(function() {
				calendar.position({
					my : "left bottom",
					at : "left top",
					of : input,
					collision : "none"
				})
			}, 0);
		}
	});
	$("#ui-datepicker-div").addClass("smalldatepicker");
}

function deleteItem(index) {
	var confirmation = confirm("Are you sure you want to delete? ");
	if (confirmation) {
		var deleteIndex = "DELETE_" + index;
		$("#sendform").attr("action", "deleteItemCheckoutOption");
		$("#sendform").attr("ng-non-bindable", "ng-non-bindable");
		$("#sendform").attr("submitforce", true);
		$("#sendform").append("<input type='hidden' value='itemIndex' name='" + deleteIndex + "'/>");
		$("#sendform").submit();
	}
}

function continueShopping() {
	$("#sendform").attr("action", "continueShoppingCheckoutOption");
	$("#sendform").attr("ng-non-bindable", "ng-non-bindable");
	$("#sendform").attr("submitforce", true);
	$("#sendform").submit();
}

function deleteAddonItem(index) {
	var addonWithCartIndex = $("#cartItem_" + index).val();
	if (addonWithCartIndex != undefined) {
		var cartIndex = addonWithCartIndex.split(",")[0];
		var addonIndex = addonWithCartIndex.split(",")[1];
	}
	params = "itemIndex=" + cartIndex + "&" + addonIndex + "=1" + "&isRemove=true";
	$.ajax({
		type : "post",
		url : "/control/deleteaddons?" + params,
		// TODO - later move all these url at one place
		success : function(result) {
			// location.reload();
			// instead of reloading we are just removing dom from html
			var selectId = "#addonproduct_" + cartIndex + "_" + addonIndex + "_figure";
			$(selectId).remove();
		}
	// TODO - what can we do if add on failed.
	});
}

function initScrollPane() {
	if ($(".categorydescription.scroll-pane").length) {
  if ($("#categorydescriptionmore").html().length > 200) {
   var showChar = 200;
   var ellipsestext = "&#8230;";
   var moretext = "Show more &gt;&gt;";
   var lesstext = "&lt;&lt; Show less";
   var display = true;
   var content = $("#categorydescriptionmore").html();
   if (content.length > showChar) {
    var c = content.substr(0, showChar);
    var h = content.substr(showChar, content.length - showChar);
    var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h
      + '</span>&nbsp;&nbsp;<a href="javascript:void(0);" class="morelink">' + moretext + '</a></span>';
    $("#categorydescriptionmore").html(html);
    $("#categorydescriptionmore").show();
   }
   $(".morelink").click(function() {
    if ($(this).hasClass("less")) {
     $(this).removeClass("less");
     $(this).html(moretext);
    } else {
     $(this).addClass("less");
     $(this).html(lesstext);
    }

    $(".moreellipses").toggle();
       $(".morecontent").children("span").toggle( function() {
        if ( display === true ) {
           $( ".morecontent" ).show();
           $( ".morecontent span" ).css("display","inline");
           display = false;
         } else if ( display === false ) {
           $( ".morecontent span" ).hide();
           $( ".morecontent span" ).css("display","none");
           display = true;
         }
       });
    return false;
   });
  } else {
   $("#categorydescriptionmore").show();
  }
 }
}
function validateProductForm() {
	var deliveryDate = null, shippingMethodId = null, timeSlotId = null, shippingCost = null;
	var isValid = false;
	var variantNotSelected = false;
	var productType = $("#productType").val();

	if ($("#deliveryDate") != null && $("#deliveryDate").val() != "") {
		deliveryDate = $("#deliveryDate").val();
	}
	if ($("#shippingMethodId") != null && $("#shippingMethodId").val() != "") {
		shippingMethodId = $("#shippingMethodId").val();
	}
	if ($("#timeSlotId") != null && $("#timeSlotId").val() != "") {
		timeSlotId = $("#timeSlotId").val();
	}
	if ($("#shippingCost") != null && $("#shippingCost").val() != "") {
		shippingCost = $("#shippingCost").val();
	}

	if (deliveryDate != null && shippingMethodId != null && timeSlotId != null && shippingCost != null) {
		isValid = true;
	}
	if ($("#destlookup") != null && $("#destlookup") != undefined && $("#destlookup").val() == "_NA_") {
		isValid = false;
		resetProductShippingInfo();
		$("#pincodeAlert").show();
		$("#datetimeshipping").hide();
		$("#datetimelink").addClass("disableClick");
		$("#datetimelink").show();
	}
	if ($("input:radio[name='feature']").length) {
		if (!$("input:radio[name='feature']").is(":checked")) {
			variantNotSelected = true;
			isValid = false;
			$("#variantError").show();
		} else {
			variantNotSelected = false;
			$("#variantError").hide();
		}
	}
	if (!isValid && !variantNotSelected) {
		$("#dateAlert").show();
	}
	if ($(".selectflavourVal").length && $(".selectflavourVal").val() == "") {
		variantNotSelected = true;
		isValid = false;
		$("#flavourError").show();
	} else if($(".selectflavourVal").length){
		variantNotSelected = false;
		$("#flavourError").hide();
	}
	if ($(".personalized").length) {
		var personalizedMsg = $.trim($(".personaltxtmsg").val());
		$("#personalizedText").val(personalizedMsg);
		var isImgVisible = $(".personalimg").is(":visible");
		var isMsgVisible = $(".personalmsg").is(":visible");
		if (!useDefaultConfig){
			if ((isMsgVisible && $("#personalizedText").val() == "") && (isImgVisible && $("#personalizedImage").val() == "")) {
				isValid = false;
				$("#uploadMsg").html("Please upload image and enter your message.");
				$("#uploadMsg").show();
			} else if (isImgVisible && $("#personalizedImage").val() == ""){
				isValid = false;
				$("#uploadMsg").html("Please upload image.");
				$("#uploadMsg").show();
			} else if (isMsgVisible && $("#personalizedText").val() == ""){
				isValid = false;
				$("#uploadMsg").html("Please enter your message.");
				$("#uploadMsg").css({"background-color" : "#db3638", "border-color" : "#db3638"});
				$("#uploadMsg").show();
			}
		} else if($("#personalizedText").val() == "" && $("#personalizedImage").val() == "" ) {
			isValid = false;
			$("#uploadMsg").html("Please upload image or enter your message.");
			$("#uploadMsg").show();
		}
	}

	return isValid;
}
function updateProductInfo(productList) {
	if (productList && productList.length > 0) {
		updateProductCountInfo(productList);
		updateEarliestDeliveryDate(productList);
	}
}
// Don't Fetch Whole Productlist fetch only which are required - @Susanta
function updateProductCountInfo(productList) {
	$.ajax({
		type : 'GET',
		global : false,
		dataType : 'json',
		async : true,
		url : DCR_HOST + '/ic/j',
		data : {
			'p' : productList.join(",")
		},
		success : function(data) {
			$.each(data, function(productId, count) {
				var viewedElement = $(productListSelector + "[" + productAttributeName + "='" + productId + "']").children().find('.viewed');
				var boughtElement = $(productListSelector + "[" + productAttributeName + "='" + productId + "']").children().find('.bought');
				var seen = numberWithCommas(count[0]);
				viewedElement.text(seen);
				// also set the title
				viewedElement.attr("title", "Seen " + seen + " times in last 7 days");
				var bought = numberWithCommas(count[1]);
				boughtElement.text(bought);
				// also set the title
				boughtElement.attr("title", "Bought " + bought + " times in last 7 days");
			});
		}
	});
}

function updateEarliestDeliveryDate(productList) {
	$.ajax({
		type : 'GET',
		global : false,
		dataType : 'json',
		async : true,
		url : '/control/getEarliestDeliveryDays',
		data : {
			"productIds" : productList.join(","),
			 FNP_CURRENT_CATALOG_ID : $("#FNP_CURRENT_CATALOG_ID").val()
		},
		success : function(data) {
			if (data != null && data.deliveryDates != undefined) {
				$.each(data.deliveryDates, function(productId, deliveryDate) {

					var deliveryElement = $(productListSelector + "[" + productAttributeName + "='" + productId + "']").children().find('.dt-delivery');
					if (deliveryDate != "_NA_") {
						var day = deliveryDate.split("-")[0];
						var month = deliveryDate.split("-")[1];
						var year = deliveryDate.split("-")[2];
						var today = new Date();
						var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));

						if (day == today.getDate() && month == (parseInt(today.getMonth()) + 1) && year == today.getFullYear()) {
							deliveryElement.html("Today");
						} else if (day == (parseInt(tomorrow.getDate())) && month == (parseInt(tomorrow.getMonth()) + 1) && year == tomorrow.getFullYear()) {
							deliveryElement.html("Tomorrow");
						} else {
							deliveryElement.html(deliveryDate);
						}
					} else {
						var dtTimeAttr = deliveryElement.attr("datetime");
						deliveryElement.parent().html("<time" + dtTimeAttr + " class='dt-delivery outofstock'>Out of Stock</time>");
					}
				});
			}
		},
        error: function(){
            $(".earliestdelivery").css("visibility", "hidden");
        }
	});
}

function initQuickView() {
	$(".quickview").click(function(e) {
		$("#QuickViewContent").empty();
		e.preventDefault();
		// url with custom callbacks
		$.get('expressproduct', function(data) {
			$(data).find("#product").appendTo("#QuickViewContent");
			$("#QuickViewContent").find(".productform").addClass('medium-12');
			$("#QuickViewContent").find(".productform").addClass('large-12');
			$('#QuickViewModal').foundation('reveal', 'open');
			setTimeout(initializeProductContentTab, 200);
		});

	});
}

/**
 * @Shakeel This code will help for pagination in Category and Search results Pages
 *
 */
function showProdRow() {
	var item = 10;
	$('#productlist>li').slice(item).hide();
	$('#loadmoreproducts').click(function() {
		$('#productlist>li:hidden').slice(0, item).show();
		if ($('#productlist>li:hidden').length == 0)
			$('#loadmoreproducts,#viewallproducts').hide();
	});
}

function showAllProd() {
	$('#viewallproducts').click(function() {
		$('#productlist>li').show();
		$('#viewallproducts').hide();
		$('#loadmoreproducts').hide();
	});
}
/**
 * @Susanta This code will help to testing only Customize it later
 *
 */
function initLoginHandler() {
	$("#currencyicon").click(function() {
		// $(".toolbardialog").foundation('reveal', 'close');
		$(".currencydropdown").slideToggle();
	});
	// @Susant This Handle ToolbarDialogs
	$('header').click(function($event) {
		$(".toolbardialog.open").foundation('reveal', 'close');
		//console.log($event.target);
		var $target = $event.target;
		if ($($target).is('button')) {
			// alert($($target).attr('modalname'));
			var modal = $($target).attr('modalname');
			$('#' + modal).foundation('reveal', 'open');
		}
	});
	// @Susanta - for the closing the dropdown toolbar
	$(document).click(function($event) {
		/*
		 * if(!$event.target.closest(".toolbardialog.open")){ $(".toolbardialog.open").foundation('reveal', 'close'); }
		 */
//		$('header').click(function() {
//			$(".toolbardialog.open").foundation('reveal', 'close');
//		});

		//As of now suppressing it for IE fix
		try{
			var elem = $event.target
			if (!$(elem).closest("#loginguser").length) {
				$(".logindropdown").slideUp();
			}
			if (!$(elem).closest("#currencyconversion").length) {
				$(".currencydropdown").slideUp();
                $('#currencyicon').removeClass('selected');
			}
		}catch(e){
		}

	});

}
function userLoginSuccess(logInRes) {
	var userLogin = logInRes.result;
	var firstName = logInRes.name;
	updateFirstName(firstName);
	var msgResult = logInRes.msg;
	if (userLogin == "success") {
		$("#loggedinuser").show();
		$('#modallogin').foundation('reveal', 'close');
		$('#login').removeAttr('data-reveal-id');
		// location.reload();
	} else if (userLogin == "requirePasswordChange") {
		window.location.href = "/control/changepassword?USERNAME=" + username;
		window.open();
	} else if (userLogin == "error") {
		if (msgResult != null) {
			$('#msg').html("<p>" + msgResult + "</p>");
			$('#msg').show();
		}
	}

}

function initializeOtherPayment() {
	$(document).on("click", ".otherstitle", function() {
		$('.othermode').hide();
		$('#pay-' + $(this).attr('target')).show();
	});
}

function scrollBox(boxId, start, end) {
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		var endcss = {
			'position' : 'absolute',
			'top' : end + 'px',
			'z-index' : '0'
		};
		var startcss = {
			'position' : 'fixed',
			'top' : start + 'px',
			'z-index' : '0'
		};
		if (scrollTop <= end) {
			$('#' + boxId).css(startcss);
		} else {
			$('#' + boxId).css(endcss);
		}
	});
}

function invScrollBox(boxId, start, end) {
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		var endcss = {
			'position' : 'static',
			'top' : end + 'px',
			'z-index' : '0'
		};
		var startcss = {
			'position' : 'fixed',
			'top' : start + 'px',
			'z-index' : '9999'
		};
		if (scrollTop <= end) {
			$('#' + boxId).css(endcss);
			$(".stickytopmenu").css("margin-top", "25px");
		} else {
			$(".stickytopmenu").css("margin-top", "5px");
			$('#' + boxId).css(startcss);
		}
	});
}

/*
 * function makeTopMenuSticky(){ $(window).scroll(function () { var scrollTop = $(window).scrollTop(); if(typeof document.topEdgeOfMenu == 'undefined' ||
 * document.topEdgeOfMenu == 0){ document.topEdgeOfMenu = $('#topbarcontainer').offset().top; document.menuMarginTop = $(".stickytopmenu").css("margin-top"); }
 * var toolbarHeight = $('#maintoolbar').outerHeight(true); var fixedAt = toolbarHeight; if(document.topEdgeOfMenu - scrollTop <= fixedAt){
 * $("#topbarcontainer").css({"position": "fixed", "top" : fixedAt, "padding-right" : "0.85%"});//, "z-index" : 9999 $(".stickytopmenu").css({"margin-top": 0});
 * $("#topbarcontainer").next().css({"margin-top": document.menuMarginTop}); } else { $("#topbarcontainer").css({"position": "static", "padding-left" : "0",
 * "padding-right" : "0"});//, "z-index" : 0 $(".stickytopmenu").css({"margin-top": document.menuMarginTop}); $("#topbarcontainer").next().css({"margin-top":
 * 0}); } }); }
 */

function makeTopMenuSticky() {
	if($("#topbarcontainer").length > 0 && $(".stickytopmenu").length > 0) {
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			if (typeof document.topEdgeOfMenu == 'undefined' || document.topEdgeOfMenu == 0) {
				document.topEdgeOfMenu = $('#topbarcontainer').offset().top;
				document.menuMarginTop = $(".stickytopmenu").css("margin-top");
			}
			var toolbarHeight = $('#maintoolbar').outerHeight(true);
			var fixedAt = toolbarHeight;
			if (document.topEdgeOfMenu - scrollTop <= fixedAt) {
				$("#topbarcontainer").addClass("cat-up");// , "z-index" : 9999

			} else {

				$("#topbarcontainer").removeClass("cat-up");
			}
		});
	}
}

function getPageProductIds(){
	 return $(productListSelector).map(function() {
		 return $(this).attr(productAttributeName)
	   }).get();
}
function finishPageLoad() {
	if($("#FNP_CURRENT_CATALOG_ID").val().toUpperCase() != 'uae'.toUpperCase()) {
		$('#giftfindericon').css('display', 'none');
	}
	// $("#localitylookup").keydown(function () {
	// isPlaceChanged = false;
	// });
	ajaxCallForEveryPage();
	$(".disclaimer span.mandatory").click(function() {
		$(".disclaimer span.mandatory input").attr('checked');
	});

	if(fnpPageType == "category" && !(typeof hasCustomBannerAndDesc === 'undefined') && hasCustomBannerAndDesc){
		promotionJqueryCode();
	}
	if(window.location.hostname.indexOf("oms.fnp.ae") > -1){
        var prodPageCssList=[];
		var swapcss = prodPageCssList.indexOf("product.css");
		if(swapcss > -1){
			/* swapping omsorn.css with product.css
			 * Reason: Require Specific CSS for OMS in CRM which can't be override */
			prodPageCssList[swapcss] = "omsorn.css";
		}
	}
	/*if(fnpPageType == "product"){
		$.merge(cssFilesList, prodPageCssList);
	}*/
	/*if(fnpPageType == "category" || fnpPageType == "search"){
		$.merge(cssFilesList, categoryPageCssList);
		$('#mainbanner').css('background','url(/assets/images/main-toolbar-bg.jpg) repeat-x');
	}*/
	
	// TODO : work around to fix css loading two time's need to improve implementation,
	//  earliest implementation was based on http and https
	/*if(fnpPageType=="home"||fnpPageType=="product"||fnpPageType=="category"||fnpPageType=="search"||fnpPageType=="info"){
	}*/
	loadStyleSheets();
	
	$(document).ajaxStart(function() {
		// show ajax indicator
		ajaxindicatorstart('');
	}).ajaxStop(function() {
		// hide ajax indicator
		ajaxindicatorstop();
	});

	$('.pickdate').mousedown(function() {
		$('#ui-datepicker-div').toggle();
	});

	// $(".categorydescription p").each(function(i){
	// len=$(this).text().length;
	// if(len>310)
	// {
	// $(this).text($(this).text().substr(0,310)+'...');
	// }
	// });
	$(".tbli").click(function() {
		var calwidth = $(this).find("span").width();
		var startpos = $(this).find("span").offset().left - $(this).closest(".tabs-menu").offset().left;
		$(".tabs-menu").find("hr").css("margin-left", startpos + "px").show("slow");
		$(".tabs-menu").find("hr").css("width", calwidth + "px").show("slow");
	});

	updateProductInfo(getPageProductIds());

	$("#searchFormButton").on("click", function() {
		$("#searchform").submit();
	});
	$("#searchform").submit(function() {
		if ($("#searchform input[name='qs']") != null && $("#searchform input[name='qs']").val().length <= 0) {
			$("#searchform input[name='qs']").focus();
			return false;
		}
		return true;
	});

	$(document).on("click", ".currencyoption", function() {
		var currencyUom = this.getAttribute("data-currencyuom");
		var currencyFormat = this.getAttribute("data-currencyvalue");
		convertPricesToLocal(currencyFormat, currencyUom);
		$("#currencyicon").trigger("click");
        $('#currencyicon').removeClass('selected');
	});
	$(document).on("change", ".subvariant", function() {
		$("#variantError").hide();
	});

	/*
	 * $(".walletpaybtn").click(function() { if($("input[name=wallet]:checked").length){ var selectedWallet=$("input[name=wallet]:checked")[0];
	 * if(selectedWallet!=null){ $("#checkoutInfoForm"+selectedWallet.value).submit(); } } });
	 */

	// $(".commonpassword").tooltip().off("mouseover mouseout");
	// console.log($("#modallogin .commonpassword"));
	$("#modallogin .commonpassword").tooltip();
	// $(document).tooltip();

	// custViewContent();
	timeslothoverchange();
	initializePernalizedProductEvents();
	initializeOtherPayment();
//	customizeSortSelect();
	getCurrencies();// fetch all currencies
	//solution for 'getting data-Times New Roman exception in js,' foundation issue
	Foundation.global.namespace = '';
	$(document).foundation();
	initializeQuickShop();
	initializeCitySearchBox();
	//initializeSearch();
	//initializeTraditionalMenu();
	registerMoreLinksWrapCheckFunction();
	initializeToolbar();
	initializeProductContentTab();
	initQuickView();
	initLoginHandler();
	//initializeLocalityLookup();
	initializeAvailablePinCodes();
	initializePaymentMode();
	saveFnpSalesChannelEnumId();//creating cookie for saleschannel
	if(fnpPageType!=undefined && fnpPageType == "product"){
		customInitialize();
		loadProductPageData();
	}
	removeReadonlyFieldsFromTabbing();
	if (fnpPageType == "reminder" || fnpPageType == "confirmorder") {
		initializeOccasionReminder();
		$(".occasionDate").datepicker({
			changeYear : true
		});
	}
	$('#tabs').tabs();
	// changed change to focus for city look up enter handling issue in firefox
	$("#localitylookup").change(function(e) {
		$(".selectedLocality").hide();	
		// If it's a courier product - autocomplete pincode selection and delivery details population done earlier and then change event is triggered which is
		// not the case for express products.
		// so making sure that for courier don't disable if pincode is selected.
		// disabling the selector - considering for all manually changed input values instead of drop down selection.
		var isThisACourierProduct = isCourierProduct();
        if(isThisACourierProduct){
            var enteredPin = $("#localitylookup").val();
            if(courierPincodesList != null && enteredPin != ''){
                if(courierPincodesList.indexOf(enteredPin)!=-1){
                    console.log("valid pincode");
                    selectedCourierPinCode = enteredPin;
                    pincode = enteredPin;
                    populateDeliveryDetails(pincode);
                }else{
                    console.log("Pincode not found in the list");
                }
            }
            
        }
		if ((selectedCourierPinCode == null) || (selectedCourierPinCode != $("#localitylookup").val())) {
			//disableDateTimeSelector();
		}
		// clearProductSelectedDeliveryInfo();
		resetProductShippingInfo();
		var productType = $("#productType").val();
		if (productType != "COURIER" && productType != "PERSONALIZED"){
			getProductPriceByDeliveryInfo($("#addProductId").val(), "", "");
		}
		// pincode= null;
		//setting timeout to show error msg if ever city not selected from list.
		setTimeout(function(){checkSuggestions()}, 50);
		if (e.which == 13) {
			e.preventDefault();
			return false;

		}
	});

	$("#localitylookup").keydown(function(e) {
		pincode = null;
		if ($("#localitylookup").val().length == 0) {
			if ($(".selectedLocality").length) {
				$(".selectedLocality").hide();
			}
			pincode = null;
			resetProductShippingInfo();
		}
		checkSuggestions();
		if (e.which == 13) {
			e.preventDefault();
			return false;
		}
	});
//Commented for date and time slot enable work in firefox
	/*$("#localitylookup").blur(function() {
		checkSuggestions();
        var isThisACourierProduct = isCourierProduct();
        if(isThisACourierProduct){
        var enteredPin = $("#localitylookup").val();
        console.log("enteredPin===================="+enteredPin);
        if(courierPincodesList != null && enteredPin != ''){
            if(courierPincodesList.indexOf(parseInt(enteredPin))!=-1){
                selectedCourierPinCode = enteredPin;
                pincode = enteredPin;
                populateDeliveryDetails(pincode);
            }
          }
        }
	});*/

	/*
	 * $('.addressfield').bind('scroll keyup', function(){ resizeTextArea($(this)); });
	 */

	$(document).on(".autogrow", 'keyup', function() {
		resizeTextArea($(this));
	});

	setTimeout(function() {
		resizeTextArea($(".autogrow"));
	}, 100);
	// $('.autogrow').focus();
	$('#tabs').tabs({
		active : 0
	});
	// scroll effect in the product page
	// if($("#productform") && $('#productDetailsContainer').length > 0){
	// var start=$('#productDetailsContainer').offset().top;
	// var end=Math.round( $("#review").offset().top + $('#review').outerHeight(true) - $('#productform').outerHeight(true) - $('#productform').offset().top);
	// if(end < 0){
	// end = start;
	// }
	// scrollBox("productform", start, end);
	// initCartScrollPane();// product page desc tab
	// }

	if (fnpPageType == "category" || fnpPageType == "search") {
		makeTopMenuSticky();
        /*$(window).scroll(function(){
          if($(window).scrollTop() > 317){
              $("#maintoolbar").addClass("test");
              
              $("#mainbanner").addClass("test2");
          }
        });
	    $(window).scroll(function(){
          if($(window).scrollTop() < 317){
              $("#maintoolbar").removeClass("test");
              $("#mainbanner").removeClass("test2");
          }
        });*/
/***************************/
       /* $(window).scroll(function(){
//          if($(window).scrollTop() > 380){
              if($("#topbarcontainer").offset().top==0){
              $('#topbarcontainer').addClass("topfixed");
//              $('.menu.contain-to-grid.stickytopmenu').addClass("topfixed");
              }
//          }
        });
	    $(window).scroll(function(){
          if($(window).scrollTop() < 380){
              $("#topbarcontainer").removeClass("topfixed");
//              $(".menu.contain-to-grid.stickytopmenu").removeClass("topfixed");
          }
        });*/
        
	}

	$(document).on('open.fndtn.reveal', '[data-reveal]', function() {
		var modal = $(this);
		modal.find('[autofocus]').focus();
	});

	/*
	 * $(document).on('click', '.ui-datepicker-next', function() { console.log("next clicked"); $("#deliverydatepicker").hide("slide", { direction: "left"
	 * },500).show("slide", { direction: "right" },500); });
	 *
	 * $(document).on('click', '.ui-datepicker-prev', function() { console.log("Prev clicked"); $("#deliverydatepicker").hide("slide", { direction: "right"
	 * },500).show("slide", { direction: "left" },500); });
	 */
	$(document).on('click', '#maintoolbar button', function() {
		$('.reveal-modal-bg').addClass("producttoolbardialog");
		// $(".commonpassword").tooltip();
	});
	// $(document).on('focus','.commonpassword',function(){
	// console.log("focus");
	// $(".commonpassword").tooltip();
	// });
	customizeDeliveryAddrBox();

	$("#countryCode-button").attr("tabindex", "-1");
	$(document).on('opened.fndtn.reveal', '[data-reveal]', function(event) {
		var inputsOnModal = $(event.target).find("input[type='text'],input[type='email'],input[type='search']");
		inputsOnModal.first().focus();
		if($(this).context.id == "addon"){
			$('body').css({
				overflow: 'hidden'
			});
			$('.reveal-modal-bg').removeClass("producttoolbardialog");
		}
	});
	$.widget("ui.selectmenu", $.ui.selectmenu, {
		_create : function() {
			this._super();
			this._setTabIndex();
		},
		_setTabIndex : function() {
			this.button.attr("tabindex", this.options.disabled ? -1 : this.element.attr("tabindex") || 0);
		},
		_setOption : function(key, value) {
			this._super(key, value);
			if (key === "disabled") {
				this._setTabIndex();
			}
		}
	});
	// setting up topmenu filters
	$(".selptocr").click(function() {
		document.location.href = $(this).attr("data-href");
	});

	$('.loggeduser .ui-selectmenu-button').focus(function() {
		$('html, body').animate({
			scrollTop : $(this).offset().top - 150
		}, 500);
	});

	// $(document).on( "selectmenuchange",".countrycode", function( event, ui ) {
	// console.log("This is CountryCode");
	// var selected = ui.item.value;
	// $(".countrycode").val(selected);
	// $('.countrycode').triggerHandler("change");
	// // $(".countrycode").selectmenu("refresh");
	// });

	$(document).on("click", ".addonsbmt", function() {
		disableSubmitBtnWithLoadingGif(this);
		$("form[name='addonform']").submit();
	});
	

	    try {// TODO - Shakeel Breaking Code in Mozilla
		$('input:read-only').attr('tabindex', '-1');
	} catch (e) {
	}
    
    if(fnpPageType!=undefined && (fnpPageType == "category" || fnpPageType == "home" || fnpPageType == "search")){
		loadProductImages();
	}
    $("#login #loggedinuser").css('display','block');
    $("#totalproductcount").css('display','inline-block;');
    sameDayDelivery();
    //isUserLoggedIn();
    $(document).foundation({
        reveal : {
            multiple_opened:true
        }
    }); 
}
//
// function custViewContent(){
// var url= window.location.href;
// var pagename = url.substring(url.lastIndexOf('/') + 1);
// if (pagename == "franchise"){
// $("main>.row:nth-child(3)").toggleClass("uncollapse collapse");
// $("main>.row:nth-child(2)").remove();
// }
// }

/*
 * function passwordTooltip(){ $(document).on('focus','.commonpassword',function(){ $(".commonpassword").tooltip({ track:false }); }); }
 */

function editDialog(){
    if ($('#editdialog').foundation('reveal', 'open')) {
		$('.reveal-modal-bg').css("top", "0");
	}
}

function isOccasionSelected(inputElement) {
	return (!isEmpty($(inputElement).val()) && $(inputElement).attr("data-isSelected") == "true")
	// return isEmpty($(inputElement).val());
}
function initDeliveryAddress(){
    $(document).on("keypress", ".inputdiv .number", function(event) {
            return isNumberKey(event)
    });
}
function isDeliveryDateSelected(inputElement) {
	var isEmtpty = isEmpty($(inputElement).val());
	var isDate = false;
	try {
		$.datepicker.parseDate("dd M, yy", $(inputElement).val());
		var newDateFormat = $.datepicker.parseDate("dd M, yy", $(inputElement).val());
		$(inputElement).val($.datepicker.formatDate("dd-mm-yyyy", newDateFormat));
		// if it parsed with out exception means the date is entered with format...
		// TODO if we want to add more validations we can add here....
		isDate = true;
	} catch (e) {
	}
	return (!isEmtpty && isDate);
}

function isEmpty(value) {
	return (typeof value === 'undefined' || value.length <= 0);
}

/**
 * @Auth Chitrarth Quick shop city auto complete This takes city names from system database
 *
 */
function initializeCitySearchBox() {

	$.ajax({
		global : false,
		dataType : 'json',
		url : AJAX_JSON_URL_LIST.cityNamesUrl,
		success : function(cities) {
            quickshopcity = removeCityHyphen(cities.cityNames);
			qsList.qscity=quickshopcity;
			cityAutoComplete(quickshopcity);
			//giftFinderDataLock(quickshopcity)
		}
	});

}
function removeCityHyphen(cityNames){	
	var citylist=[];
	 for(var item in cityNames){
		 citylist.push(cityNames[item].split("-").join(" "));
	 }	
	 return citylist;	
}
function cityAutoComplete(avilableCity) {
	document.availableCities = avilableCity;
	$(".quickshopcity").autocomplete({
		source : avilableCity,
		minLength : 1,
		open: function(event, ui) {
		        $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
		},
		response : function(event, ui) {
			if (ui.content.length == 0) {
				ui.content.push({
					'label' : citySearchDefaultLabel,
					'value' : ''
				});

			}
		},

		create : function(event, ui) {
			$(this).data("ui-autocomplete")._renderItem = function(ul, item) {

				if (item.value == '') {
					return $('<li class="ui-state-disabled">' + item.label + '</li>').appendTo(ul);
				} else {
					return $("<li>").append("<a  id = 'quickshopcitydata'>" + item.label + "</a>").appendTo(ul);
				}

			};
		},
		position : {
			my : "left bottom",
			at : "left top"
		},
		select : function() {
			$(this).parents(".quickfrm").find("button.quickshopbtn").prop("disabled", false);
		}
	})
}
function autoResizeAddr(e) {
	$(e).css({
		'height' : 'auto',
		'overflow-y' : 'hidden'
	}).height(e.scrollHeight);
}

function highlight(ele) {
	if ($(ele).val() !== '') {
		$(".searchbtn").removeAttr("disabled");
		$(".searchbtn ").addClass("highlight");
	} else {
		$(".searchbtn").attr("disabled", true);
		$(".searchbtn ").removeClass("highlight");
	}
}

/**
 * It will removed later because it is applied by using initializeCitySearchBox() function
 */
function initializeMapsSearchBox() {

	$(".quickshopcity").each(function() {
		try {
			var eachInputElement = this;
			var quickShopCityAutoComplete = new google.maps.places.Autocomplete(this, {
				types : [ "(cities)" ],
				componentRestrictions : {
					country : 'ae'
				}
			});
			google.maps.event.addListener(quickShopCityAutoComplete, 'place_changed', function() {
				fillInPlaceId(eachInputElement, getAddressInfo(quickShopCityAutoComplete.getPlace()));
			});
		} catch (e) {
			// TODO: handle exception
		}
	});
}

// Function to get postal_code, city and latlong values out of PlaceResult object.
var getAddressInfo = function(place) {
	var i, j, addressComponent, types, addressComponents = place.address_components, postal_code_list = [], city_list = [];

	for (i = 0; i < addressComponents.length; i++) {
		addressComponent = addressComponents[i];
		types = addressComponent.types;
		for (j = 0; j < types.length; j++) {
			if (types[j] === 'postal_code') {
				postcode = addressComponent.long_name;
				postal_code_list.push(postcode);
			} else if (types[j] === 'administrative_area_level_2') {
				city = addressComponent.long_name;
				city_list.push(city);
			}
		}
	}
	var addressInfo = {
		'postal_codes' : postal_code_list,
		'cities' : city_list,
		'latlong' : place.geometry.location
	};
	return addressInfo;
}

function fillInPlaceId(value, addressInfo) {
	// Pre populating data causing problem so added data here to do not having previous data.
	$(value).next().attr("value", "");
	$(value).next().next().attr("value", "");
	if (addressInfo != null) {
		if (addressInfo['postal_codes'].length > 0) {
			$(value).next().attr("value", addressInfo['postal_codes']);
		} else {
			$(value).next().next().attr("value", addressInfo['latlong'].lat() + "," + addressInfo['latlong'].lng());
		}
	}
}

function initDateScrollPane() {
	if ($('.date-scroll-pane'))
		$(".date-scroll-pane").wrap(function() {
			return "<div class='date-scroll-pane'><ul><li>" + $(this).html() + "</li></ul></div>";
		});
}

$(function() {
	if ($('.date-dialscroll'))
		$(".date-dialscroll").wrap(function() {
			return "<div class='date-dialscroll'><ul><li>" + $(this).html() + "</li></ul></div>";
		});
});

// Traditional Menu - @Susanta only css based
function initializeTraditionalMenu() {
 $("#navmenubar").tabs({
    event : "click",
    collapsible: true, 
    active: false
 });
$("#navmenubar>ul>li").hoverIntent(
		 {      sensitivity:5,
			    interval:50,
			    over: function(){
					$("#navmenubar").tabs('option', 'active', $(this).index());
					if(!$('.reveal-modal-bg').hasClass('traditonalhamburger')) {
						$('body').append('<div class="reveal-modal-bg traditonalhamburger" style="display : block;"></div>');
					}
		 		},
		 		out:function(){}
		}	 
 );
 $("#navmenubar").mouseleave(function(){
	 if($('.reveal-modal-bg').hasClass('traditonalhamburger')) {
		 $('.traditonalhamburger').remove();
	 }
	 $("#navmenubar").tabs('option', 'active', false)});

}
/*function loadCategoryType(categoryType, categoryArray, respData) {
	if (categoryArray) {
		for (var i = 0; i < categoryArray.length; i++) {
			var hintItem = new Object();
			hintItem.label = categoryArray[i].label;
			hintItem.value = categoryArray[i].category;
			hintItem.categoryType = categoryType;
			hintItem.index = i;
			if (i == categoryArray.length - 1)
				hintItem.isLast = true;
			respData.push(hintItem);
		}
	}
}*/
// TODO - later move all urls to the constants to object.
function initializeSearch() {
	$("#fnpsearch").autocomplete({
		focus : function(event, ui) {
			return false;
		},
		delay : 200,
		source : function(request, response) {
			var target = this.element;
			if (request.term) {
				$.ajax({
					global : false,
					url : AJAX_JSON_URL_LIST.searchTermSuggestionsUrl,
					dataType : "json",
					data : {
						qs : request.term.toLocaleLowerCase(),
						FNP_CURRENT_CATALOG_ID : $("#FNP_CURRENT_CATALOG_ID").val()
					},
					success : function(data) {
						// TODO 1) data now changed need to be work on this.
						var respData = [];
						loadCategoryType("productType", data.productType, respData);
						if (data.occasion)
							loadCategoryType("occasion", data.occasion, respData);
						if (data.recipient)
							loadCategoryType("recipient", data.recipient, respData);
						response(respData);
						$(target).removeClass('loadinggif');
					},
				});
			}
		},
		html : true,
		select : function(event, ui) {
			event.preventDefault();
			window.location = "/" + ui.item.value;
		},
		search : function(value) {
			if (value.currentTarget.value) {
				$(this).addClass('loadinggif');
			} else {
				$(this).removeClass('loadinggif');
				$(value.target).autocomplete("close");
			}

		},
		open: function(event, ui) {
	        $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
	        $(this).removeClass('loadinggif');
		},
		minLength : 0,// TODO- they specifically gave requirement to search right after first word
		create : function(event, ui) {
			$(this).data("ui-autocomplete")._renderItem = function(ul, item) {
				// item is of type hintItem
				var liMarkup = "<li";
				if (item.isLast)
					liMarkup += " class=\"lasthint\"";
				liMarkup += "><a href=\"/" + item.value + "\">";
				liMarkup += "<span class=\"term\"";
				if (item.index > 0)
					liMarkup += " style=\"visibility:hidden;\"";
				liMarkup += "><span>" + this.term + "</span> in&nbsp;</span>";
				liMarkup += item.label;
				liMarkup += "</a>" + "</li>"
				return $(liMarkup).appendTo(ul);
			};
		},
	}).autocomplete("widget").addClass("customizedFnpSearch");
}
/*
 * function initializeFilledCart() { $('button').click(function() { var parents = $(this).parentsUntil('table'); tablerow = $('tr') for (var i = 0; i <
 * parents.length; i++) { if ($(parents[i]).is(tablerow)) { $(parents[i]).remove(); var subtotal = $('#subtotalid .webprice').text(); var total = $('#totalid
 * .webprice').text();
 *
 * var subtotal1 = subtotal.substring(1, 5); var total1 = total.substring(1, 5);
 *
 * var subtotal1 = Number(subtotal1) - 1295; var total1 = Number(total1) - 1295;
 *
 * if (total1 == 0) { // window.alert("it is working"); $('#modalcartfull').foundation('reveal', 'close'); $('#modalcart').foundation('reveal', 'open'); }
 *
 * var val = subtotal.substring(1, 0); subtotal1 = val.toString() + "" + subtotal1.toString(); total1 = val.toString() + "" + total1.toString();
 *
 * $('#subtotalid .webprice').text(subtotal1.toString()); $('#totalid .webprice').text(total1.toString()); } } }); }
 */
function unPadWrappedFirstItemMoreLinks() {
	// intentionally written in verbose form for maintainability
	var firstMoreLink = null;
	$("#morelinks li").each(function() {
		if (firstMoreLink == null)
			firstMoreLink = $(this)
		else {
			if ($(this).position().left == firstMoreLink.position().left) {
				$(this).css("paddingLeft", "0");
			} else {
				$(this).css("paddingLeft", $(this).css("paddingRight"));
			}
		}
		;
	});
}
function registerMoreLinksWrapCheckFunction() {
	// rapchik!!! :)
	$(window).resize(unPadWrappedFirstItemMoreLinks);
	// also run it once now
	unPadWrappedFirstItemMoreLinks();
}
function initializeToolbar() {
	$('#loginmodalclose').click(function(){
		$('#modallogin').foundation('reveal', 'close');
		if($('#modallogin').hasClass('open')){
			setTimeout(function(){
				$('.pop-up-msg-login-desk').foundation('reveal', 'close');		
			},150);
		}
	});
    $(document).on('close.fndtn.reveal', '[data-reveal]', function() {
    	$('#navigationtools li button, #infotools li button').removeClass('selected');
    	if(!$('.reveal-modal-bg').hasClass("producttoolbardialog")){
			$('.reveal-modal-bg').addClass("producttoolbardialog");
		}
    	if($(this).context.id == "addon"){
    		$('body').css({
    			overflow: 'auto'
    		});
    	}
	$('#navigationtools li button, #infotools li button').removeClass('selected');
    });
    $(document).on('closed.fndtn.reveal', '[data-reveal]', function() {
		// Clearing the timer on modalclock reveal close
    	if (this.id != undefined && this.id == "modalclock") {
			clearTimeout(samedayDeliveryTimer);
		}
    });
	$(document).on('open.fndtn.reveal', '[data-reveal]', function() {
//       setTimeout(function(){
        var modalbutton = this.id;
        $("#maintoolbar>ul>li>button").each(function(){
            if($(this).attr('modalname') == modalbutton){
                $(this).addClass('selected');
            }
        });
        // calling the sameday delivery time left counter on modalclock reveal click
		if (this.id != undefined && this.id == "modalclock") {
			startCountdownTimer();
		}
//    },500);
	});
}

function initializeProductImgSlider(){
	$('.slideable').slick({
		prevArrow : '<div id = "prevArrow" class = "slick-prev"></div>',
		nextArrow : '<div id = "nextArrow" class = "slick-next"></div>',
		infinite : false,
		slidesToShow : 1,
		slidesToScroll : 1
	});
}
function filterDate(){
	$('#giftdatepicker').datepicker({
		dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		showOtherMonths : true,
		selectOtherMonths : true,
		dateFormat : "dd M yy",
		minDate : (new Date().getHours()) < parseInt(quickShopDeliveryCutoffTime) ? 0 : 1,
		maxDate : '+45',
		onSelect : function (date) {
			$('#giftfinder .slick-prev').click();
			$('#giftfinder #deliveryDatelink').html(date)
		},
		beforeShowDay : function(date) {
			var mm = date.getMonth() + 1, dd = date.getDate(), yy = date.getFullYear();
			if (parseInt(dd) < 10) {
				dd = '0' + dd;
			}
			if (parseInt(mm) < 10) {
				mm = '0' + mm;
			}
			var dt = dd + "-" + mm + "-" + yy;
			if(parseInt(dd)==14){
				if(parseInt(mm)==2){
					$(".calender-event-footer-message").removeClass("calender-footer-event-disp");
				}else{
					$( ".calender-event-footer-message" ).addClass("calender-footer-event-disp");
				}
			}
			if (eventDates && eventDates.indexOf(dt) != -1) {
				return [ true, "calender-event-day" ];
			}else{
				return [ true, "" ];
			}
		}
	});
	$('#giftfinder .slick-next').click();
}
// TODO - refactor later - [VK]
function initializeProductContentTab() {
	$('.slideable').slick({
		prevArrow : '<div id = "prevArrow" class = "slick-prev"></div>',
		nextArrow : '<div id = "nextArrow" class = "slick-next"></div>',
		infinite : false,
		slidesToShow : 1,
		slidesToScroll : 1
	});

	$('.slideable-dialog').slick({
		slide : '.slider-item', // @$hakeel for Calendar & Timeslot 'X'-Icon
		prevArrow : '<div id = "prevArrow" class = "slick-prev"></div>',
		nextArrow : '<div id = "nextArrow" class = "slick-next"></div>',
		infinite : false,
		slidesToShow : 1,
		slidesToScroll : 1,
		variableWidth : true,
		draggable : false,
        initialSlide : 0
	});

}

var localityAutoComplete;
var localityLookup;
var service;
var geoLocation, circle;
var pincode = null;
var matchedPincode = null;
function initializeLocalityLookup() {
	try {
		localityLookup = document.getElementById("localitylookup");
		var productType = $("#productType").val();
		if (productType != undefined && (productType != "COURIER" && productType != "PERSONALIZED")) {
			localityAutoComplete = new google.maps.places.Autocomplete(localityLookup, {
				types : [ "geocode" ],
				componentRestrictions : {
					country : "ae"
				}
			});
			localityAutoComplete.inputField = localityLookup;
			localityAutoComplete.addListener('place_changed', resolvePincode);
			// check for city context in current url or the previous url
			var urlAndReferrer = document.location.href + document.referrer;
			var cityPattern = /city[^=]*=([^&#]+)/;
			var match = cityPattern.exec(urlAndReferrer);
			var city = "";
			if (match) {
				city = match[1];
				setCity(city);
			}
	
			if (!city && jQuery.deparam.querystring() && jQuery.deparam.querystring()["localityname"]) {
				city = jQuery.deparam.querystring()["localityname"];
			}
	
			if (city) {
				setCity(city, true);
			}
		}
	} catch (e) {
		console.log(e);
	}
}
function setCity(city, loadDates) {
	var cityDataUrl = "http://maps.google.com/maps/api/geocode/json?address=" + city + ",%20uae&sensor=false&region=AE";
	city = decodeURIComponent(city);
	$.getJSON(cityDataUrl, function(json) {
		if (json.status == "OK") {
			geoLocation = json.results[0].geometry.location;
			circle = new google.maps.Circle({
				center : geoLocation,
				radius : 30000
			}); // hardcoded for 30KM - OK for now
			localityAutoComplete.setBounds(circle.getBounds());
		}
		setPinCode(city, "", "", loadDates);
	});
	localityLookup.placeholder = " City";
	$("#contextcity>span").text(city);
	$("#contextcity").show();
	$("#localitylookup").val(city);
	// enableDateTimeSelector();
	if (pincode != null && !loadDates) {
		populateDeliveryDetails(pincode);
		getProductPriceByDeliveryInfo($("#addProductId").val(), "", pincode);
	}
}
var selectedLocalityGoogle = null;
var selectedPincodeGoogle = null;
function sanitizePincode(googlePincodeValue){
	if($.isNumeric(googlePincodeValue)){
		//already a valid value...just return
		return googlePincodeValue;
	}
	else {
		//maybe its a pattern "517401-517422"... add some fault tolerance
		var usablePincode = parseInt(googlePincodeValue);
		return isNaN(usablePincode)? null : usablePincode;
	}
}
function resolvePincode() {
	selectedLocalityGoogle = null;
	selectedPincodeGoogle = null;
	var place = this.getPlace();
	pincode = null;
	if (place.formatted_address && place.formatted_address.length && $(".selectedLocality").length) {
		$(".selectedLocality").fadeOut(1000, function() {
			$(".selectedLocality").html(place.formatted_address);
			$(".selectedLocality").fadeIn(2000);
		});
	}
	if (place.types && place.types.length > 0) {
		if (place.types[0] == "postal_code") { // pincode typed by the user
			pincode = place.address_components[0].long_name;
			pincode = sanitizePincode(pincode);
		}
		if(pincode == null) {
			var pin_code = "";
			// search all address components/sub components for postal code
			for (var i = 0; i < place.address_components.length; i++) {
				if (place.address_components[i].types[0] == "postal_code") {
					pin_code = place.address_components[i].long_name;
					pin_code = sanitizePincode(pin_code);
					selectedPincodeGoogle = pin_code;
				}
				if (selectedLocalityGoogle == null && (place.address_components[i].types[0] == "locality" || place.address_components[i].types[0] == "administrative_area_level_2")) {
					var locality = place.address_components[i].long_name
					locality = locality.replace(/[^a-zA-z0-9\s]/gi, '').replace(/\s/gi, '-').toLowerCase();
					if(document.availableCities.indexOf(locality) >= 0){
						selectedLocalityGoogle = locality
					}
				}
			}
			if (place.geometry) {
				lat = place.geometry.location.lat();
				lng = place.geometry.location.lng();
			}
			// set the first pincode of the city identified by either pin_code or by lat, long values.
			setPinCodeByPostalAddress(pin_code, lat, lng);
		}
		/*
		 * else if(place.types[0] == "locality"){ //city selected var lat ="",lng =""; if(place.geometry){ lat = place.geometry.location.lat(); lng =
		 * place.geometry.location.lng(); } var city = place.address_components[0].long_name; setPinCode(city,lat,lng); }
		 */
	}
	if (pincode != null) {
		validatePincode(place);
		resetProductShippingInfo();
		populateDeliveryDetails(pincode);
		getProductPriceByDeliveryInfo($("#addProductId").val(), "", pincode);
		isPlaceChanged = true;
	} else {
		disableDateTimeSelector();
		isPlaceChanged = false;
		resetProductShippingInfo();
	}
}

function resetProductShippingInfo() {
	$("#pincodeAlert").hide();
	$("#pincodemsg").hide();
	$("#dateAlert").hide();
	$("#deliveryDate").val("");
	$("#shippingMethod").val("");
	$("#timeSlotId").val("");
	$("#shippingPrice").val("");
	disableDateTimeSelector();
}
function enableDateTimeSelector() {
	$("#datetimelink").show();
	$("#datetimelink").removeClass("disableClick");
	$("#datetimelink").effect("highlight", 500);
	$("#datetimeshipping").hide();
}
function disableDateTimeSelector() {
	$("#datetimelink").addClass("disableClick");
	$("#datetimelink").show();
	$("#datetimeshipping").hide();
}

function getLocationDetails(place){
	var result = null;
	if(place !=null){
		var address_components = place.address_components;
		var address = "";
		var city = null;
		var state = null;
		for(i=0; i<address_components.length;i++){
			var addressComponent = address_components[i].long_name;
			var types = address_components[i].types;
			for(j=0; j< types.length;j++){
				var type = types[j];
				if(type != "administrative_area_level_1" && type != "administrative_area_level_2" && type != "country" && type !="postal_code"){
					address = address + addressComponent +", ";
					city = addressComponent;
				}else if(type == "administrative_area_level_2"){
					city = addressComponent;
				}
				else if(type == "administrative_area_level_1"){
					state = addressComponent;
				}
				result = {city:city, address:address, state:state};
				break;
			}
		}
	}
	return result;
}

function validatePincode(place) {
	// first check if there is a change in city..ask whether that is acceptable
	var city = $("#contextcity>span").text();
	if (city) {
		if (place.address_components && place.address_components.length > 0) {
			// even after finding a match continue because a better mach could be found in later components
			for (var i = 0; i < place.address_components.length; i++) {
				var geoComponent = place.address_components[i];
				if (geoComponent && geoComponent.types && geoComponent.types.length == 2
						&& (geoComponent.types[0] == "administrative_area_level_2" || geoComponent.types[0] == "locality")
						&& geoComponent.types[1] == "political") {
					// this is a city, use it
					var cityLowerCase = city.toLowerCase();
					if (cityLowerCase == geoComponent.long_name.toLowerCase() || cityLowerCase == geoComponent.short_name.toLowerCase()) {
						// same city, nothing to do
					} else {
						recipientCity();
						// city changed by the user. get explicitly confirmation
						$("#localitylookup").attr("data-confirm", "");
						var template = '<div class="recipientpanel"><span class="recipienttxt">Are you sure you want to change the city from</span>';
						template = template + '<span class="precity">' + city + '</span>';
						template = template + '<span class="nextcity">' + geoComponent.long_name + '</span>' + '</div>';
						$(document).confirmWithReveal({
							modal_class : 'rcptdialog',
							ok : 'Yes',
							cancel : 'No',
							title : "Recipient City",
							title_class : "dialogueheadtitle",
							body : template,
							footer_class : 'dialogfooter',
							body_class : 'rcptmodal'
						}).on('cancel.reveal', function(e) {
							$("#localitylookup").select();
							$("#localitylookup").focus();
							$(".rcptdialog").foundation('reveal', 'close');
							pincode = null;
							e.preventDefault();
							e.stopImmediatePropagation();
							$("#localitylookup").removeAttr("data-confirm");
							return false;
						}).on('confirm.reveal', function(e) {
							setCity($(".nextcity").html().toLowerCase());
							e.preventDefault();
							e.stopImmediatePropagation();
							$(".rcptdialog").foundation('reveal', 'close');
							$("#localitylookup").removeAttr("data-confirm");
							return false;
						});
						$("#localitylookup").click();
					}
					// Added quick hack to update the path
					$(".precity").html(city);
					$(".nextcity").html(geoComponent.long_name);
					break;
				}
			}
		}
	}
	
	var area = getlocality(place);
	$("#deliveryLocation").val(area);

	/*var productId = $("#productId").val();

	$.ajax({
		type : 'POST',
		dataType : 'json',
		sync : true,
		url : '/control/getPinCodeAndDeliveryDates?productId=' + productId + '&pinCode=' + pincode,
		success : function(pinCodeDetails) {
			if (pinCodeDetails != null && pinCodeDetails.isDatesAvailable == true) {
				$("#pincodemsg").text("");
				$("#pincodemsg").hide();
			} else {
				pincode = null;
				//$("#pincodemsg").text("This product is not available in " + $("#localitylookup").val() + ". Please choose another product.");
				//$("#pincodemsg").show();
				showNotDeliverableMessage();
				disableDateTimeSelector();
			}
		}
	});*/
}

function removeCityContext() {
	localityLookup.placeholder = " City";
	$("#contextcity>span").text("");
	$("#contextcity").hide();
	$("#pincodemsg").removeClass("infomsgbox");
	$("#pincodemsg").text("");
	$("#pincodemsg").hide();
	disableDateTimeSelector();
}
function isCourierProduct(){
	var productType = $("#productType").val();
	return (productType != undefined && (productType == "COURIER" || productType == "PERSONALIZED"));

}
function checkSuggestions(isCallFromTimeout) {
	var showingSuggestions = $(".pac-container:visible").length > 0;
	var isThisACourierProduct = isCourierProduct();
	if (!showingSuggestions) {
		if (pincode == null && $("#localitylookup").val().length > 1) {
			// not valid pincode selected. show the message
			if(isCallFromTimeout) {
				var pincodeMessage = isThisACourierProduct ? "Please choose a valid pincode from the list" : "Please verify the spelling & try again.";
				if(isThisACourierProduct){
					showingSuggestions = $(".customizedAutoComplete:visible").length > 0;
				}
				if(!showingSuggestions){
					$("#pincodemsg").removeClass("infomsgbox");
					$("#pincodemsg").html(pincodeMessage);
					$("#pincodemsg").show();
					//$("#localitylookup").focus();
				} else {
					$("#pincodemsg").removeClass("infomsgbox");
					$("#pincodemsg").text("");
					$("#pincodemsg").hide();
				}
			}
			else {
				setTimeout(function(){checkSuggestions(true)}, 1000);
			}
			var city = $("#contextcity>span").text();
			if (city.length == 0) {
				disableDateTimeSelector();
			}
		 }else if ($("#localitylookup").val().length > 1 && $("#pincodemsg").is(':visible')) {
			//Not required to do...
		} else {
			$("#pincodemsg").removeClass("infomsgbox");
			$("#pincodemsg").text("");
			$("#pincodemsg").hide();
		}
	}
	else {
		$("#pincodemsg").removeClass("infomsgbox");
		$("#pincodemsg").text("");
		$("#pincodemsg").hide();
	}
}

function getDefaultDate() {
	if (jQuery.deparam.querystring() && jQuery.deparam.querystring()["deliverydate"]) {	
		return $.datepicker.parseDate("dd-mm-yy", jQuery.deparam.querystring()["deliverydate"]);
	}/*else if ($.cookie('gfFinderCookie')) {
		var giftFinderDataLock = JSON.parse($.cookie('gfFinderCookie'));
		if(giftFinderDataLock.date){
			return $.datepicker.parseDate("dd-mm-yy", deliveryDateConvToNum(giftFinderDataLock.date));
		}
	} */else if (deliveryDates && deliveryDates.length > 0) {
		return $.datepicker.parseDate("dd-mm-yy", deliveryDates[0]);
	} else {
		return new Date();
	}
}

function filterDate(){
	var eventDates = ['07-02-2017','13-02-2017','14-02-2017','15-02-2017'];
	$('#giftdatepicker').datepicker({
		dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		showOtherMonths : true,
		selectOtherMonths : true,
		dateFormat : "dd M yy",
		minDate : (new Date().getHours()) < parseInt(quickShopDeliveryCutoffTime) ? 0 : 1,
		maxDate : '+45',
		onSelect : function (date) {
			$('#giftfinder .slick-prev').click();
			$('#giftfinder #deliveryDatelink').html(date)
		},
		beforeShowDay : function(date) {
			  var mm = date.getMonth() + 1, dd = date.getDate(), yy = date.getFullYear();
				if (parseInt(dd) < 10) {
					dd = '0' + dd;
				}
				if (parseInt(mm) < 10) {
					mm = '0' + mm;
				}
				var dt = dd + "-" + mm + "-" + yy;
				if(parseInt(dd)==14){
					if(parseInt(mm)==2){
						$(".calender-event-footer-message").removeClass("calender-footer-event-disp");
					}else{
						$( ".calender-event-footer-message" ).addClass("calender-footer-event-disp");
					}
				}
				if (eventDates && eventDates.indexOf(dt) != -1) {
					return [ true, "calender-event-day" ];
				}else{
					return [ true, "" ];
				}
		   }
	});
	$('#giftfinder .slick-next').click();
}

function productDelivery(productType) { // TODO: get the pincode here
//	var inputData = pincode;
	if (pincode == null && productType != 'INTERNATIONAL') {
		return false;
	}
	if(calenderMessage != '' && calenderMessage != null){
		$(".calendarfooter").text('');
		$(".calendarfooter").append("<span id='calender-message'>"+calenderMessage+"</span>");
	}else{
		$("#calender-message").css("display","none");	
	}

	$('#deliverydatepicker').datepicker({
		dayNamesMin : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
		minDate : 0,
		// onChangeMonthYear: function(year, month, inst) {
		// $("#deliverydatepicker").hide("slide", { direction: "left" },500).show("slide", { direction: "right" },500);
		// },
		dateFormat : 'dd/mm/yy',
		showOtherMonths : true,
		selectOtherMonths : true,
		onSelect : function(date) {
			// var productType =$("#productType").val();
			var productId = $("#addProductId").val();
			// var pinCode ="110030"; // TESTING
			var countryGeoId = $("#countryGeoId").val();

			$("#pincodemsg").removeClass("infomsgbox");
			$("#pincodemsg").text("");
			$("#pincodemsg").hide();
			$("#productDeliveryDate").val(date);
			if (productType == "COURIER") {
				buildShippingMethodDetails(productId, date, productType, countryGeoId);
			} else {
				buildShippingAndTimeSlotDetails(productId, pincode, date, countryGeoId);
			}
		},
		beforeShowDay : function(date) {
			var mm = date.getMonth() + 1, dd = date.getDate(), yy = date.getFullYear();
			if (parseInt(dd) < 10) {
				dd = '0' + dd;
			}
			if (parseInt(mm) < 10) {
				mm = '0' + mm;
			}
			var dt = dd + "-" + mm + "-" + yy;

			// adding a class for other month dates
			var currMonth = new Date().getMonth() + 1;
			if (parseInt(currMonth) < 10) {
				currMonth = '0' + currMonth;
			}
			var isOtherMonthAvailDate = false;
			if (mm != currMonth) {
				isOtherMonthAvailDate = true;
			}
			
			/*if(parseInt(dd)==14){
				if(parseInt(mm)==2){
					$(".valentines").removeClass("valentinesdisp");
				}else{
					$( ".valentines" ).addClass("valentinesdisp");
				}
			}*/
			$( ".valentines" ).addClass("valentinesdisp");
			 if (productType == "EXPRESS"
   				|| productType == "CAKE"){
           	   if(deliveryDates!=null){
       				if (deliveryDates.indexOf(dt) != -1) {
       					if (isOtherMonthAvailDate) {
       						if (eventDates) {
       							if (eventDates.indexOf(dt) != -1) {
       								// if date is in isOtherMonth available and eventdates also
       								return [ true,
       										"availableDate otherMonthAvailDate valentine" ];
       							}
       						}
       						// if only otherMonthAvailDate
       						return [ true,
       								"availableDate otherMonthAvailDate" ];
       					} else {
       						// if date is not isotherMonthAvailDate, but may be in eventDates
       						if (eventDates) {
       							if (eventDates.indexOf(dt) != -1) {
       								return [ true,
       										"availableDate valentine" ];
       							}
       						}
       					}
       					// if date is not in isOthermonth available and not in event dates
       					
       					return [ true, "availableDate" ];
       				} else {
       					// if date is not there in the deliverydates
       					 
       					if (eventDates) {
       						if (eventDates.indexOf(dt) != -1) {
       							return [ false,
       									"holiday valentine" ];
       						}
       					}
       				}
       				// if date is not in deliverydates and valintine eventdates
       				return [ false, "holiday" ];
       			
           	  }else{
       				// if delivery dates is null but may be valentinedays are available
       				if (eventDates) {
       					if (eventDates.indexOf(dt) != -1) {
       						return [ true, "valentine" ];
       					}
       				}
       			
           	  }
             }else{
           	  if (deliveryDates != null) {
       				if (deliveryDates.indexOf(dt) != -1) {
       					if (isOtherMonthAvailDate) {
       						return [ true,
       								"availableDate otherMonthAvailDate" ];
       					}
       					return [ true, "availableDate" ];
       				}
       				return [ false, "holiday" ];
       			}
             }
		}
	});

	$('#deliverydatepicker').datepicker("setDate", getDefaultDate());

	if ($('#modaldatetimepicker').foundation('reveal', 'open')) {
		$('.reveal-modal-bg').removeClass("producttoolbardialog");
		$('.reveal-modal-bg').css("top", "0");
	}
	$(document).on(
			"click",
			".timeslottable a",
			function() {
				var deliveryDateSelected = $("#productDeliveryDate").val();
				if (deliveryDateSelected != undefined && deliveryDateSelected != "") {
					var newDateFormat = $.datepicker.parseDate("dd/mm/yy", deliveryDateSelected);
					var fomattedDeliveryDate = $.datepicker.formatDate("mm/dd/yy", newDateFormat);
					var deliveryDate = new Date(fomattedDeliveryDate);
					$("#deliverydateofmonth").html(deliveryDate.getDate());
					$("#deliverymonth").html(monthNames[deliveryDate.getMonth()]);
					$("#deliveryweekday").html(days[deliveryDate.getDay()]);
					var timeslotvalues = $($(this).find(".timerange")).html();
					var timeSlotId = $($(this).find(".timeSlotId")).html();
					var startTime = $.trim(timeslotvalues.split("-")[0]);
					var endTime = $.trim(timeslotvalues.split("-")[1]);
					$("#timeslot").html(startTime + "Hrs - " + endTime + "Hrs");
					var shippingMethodName = $(this).closest(".time-slot").find(".shippingMethodName").html();
					var shippingMethodId = $(this).closest(".time-slot").find(".shippingMethodId").html();
					var timeslotprice = $(this).find(".timeslotprice").html();

					var shipPriceblock = '';
					if (parseFloat(timeslotprice) > 0) {
						shipPriceblock = shipPriceblock + '<span id="shippingcost" class="webprice"><span class="curr_aed">AED</span>' + timeslotprice
								+ '</span><span class="priceInINR" style="display:none;">' + timeslotprice + '</span>';
					} else {
						shipPriceblock = '<span id="shippingcost">' + timeslotprice + '</span>';
					}
					$("#shippingmethod").html(shippingMethodName + " : " + shipPriceblock);

					$("#deliveryDate").val(deliveryDateSelected);
					$("#shippingMethodId").val(shippingMethodId);
					$("#shippingCost").val(timeslotprice);
					$("#timeSlotId").val(timeSlotId);
					$("#dateAlert").hide();
					updateDesiredDeliveryDateTimestamp(deliveryDateSelected);
					getProductPriceByDeliveryInfo($("#addProductId").val(), getOfbizReadableDate(deliveryDateSelected), pincode);
				}
                $(this).find('.input-group-field').prop("checked",true);
                $('#timeslotDiv li').removeClass("selectedshipping");   
                $(this).parent('li').addClass("selectedshipping");
                setTimeout(function() {
				    $('#modaldatetimepicker').foundation('reveal', 'close');
                    $('#modaldatetimepicker .slick-prev').click();
                },50);
				$('#datetimelink').hide();
				initCurrencies();
				$('#datetimeshipping').show();
			});

	$(document).on("click", ".shipingmode a", function() {
		var deliveryDateSelected = $("#productDeliveryDate").val();
		if (deliveryDateSelected != undefined && deliveryDateSelected != "") {
			var newDateFormat = $.datepicker.parseDate("dd/mm/yy", deliveryDateSelected);
			var fomattedDeliveryDate = $.datepicker.formatDate("mm/dd/yy", newDateFormat);
			var deliveryDate = new Date(fomattedDeliveryDate);
			$("#deliverydateofmonth").html(deliveryDate.getDate());
			$("#deliverymonth").html(monthNames[deliveryDate.getMonth()]);
			$("#deliveryweekday").html(days[deliveryDate.getDay()]);
			var shippingMethodName = $($(this).children(".shippingtime")).html();
			var shippingMethodId = $($(this).children(".shippingMethodId")).html();
			var shippingPrice = $($(this).children(".shipmentprice")).html();
			var timeSlotId = $($(this).children(".timeSlotId")).html();

			var shipPriceblock = '';
			if (parseFloat(shippingPrice) > 0) {
				//shipPriceblock = shipPriceblock + '<span style="display:none;" class="priceInINR" value="'+ shippingPrice + '"/><span id="shippingcost" class="webprice"><span class="WebRupee">&#x62f;</span>' + shippingPrice + '</span>';
				shipPriceblock = shipPriceblock + '<span style="display:none;" class="priceInINR">'+ shippingPrice + '</span><span id="shippingcost" class="webprice"><span class="curr_aed">AED</span>' + shippingPrice + '</span>';
			} else {
				shipPriceblock = '<span id="shippingcost">' + shippingPrice + '</span>';
			}
			$("#shippingmethod").html(shippingMethodName);
			$("#shipprice").html(shipPriceblock);

			$("#deliveryDate").val(deliveryDateSelected);
			$("#shippingMethodId").val(shippingMethodId);
			$("#shippingCost").val(shippingPrice);
			$("#timeSlotId").val(timeSlotId);
			updateDesiredDeliveryDateTimestamp(deliveryDateSelected);
			getProductPriceByDeliveryInfo($("#addProductId").val(), getOfbizReadableDate(deliveryDateSelected), pincode);
		}
		$("#datetimeshipping").css("margin-top", "0");
		$('#modaldatetimepicker').foundation('reveal', 'close');
		$('#datetimelink').hide();
		$(".alert-box.alert").hide();
		initCurrencies();
		$("#localitylookup").hide();
		$('#datetimeshipping').show();
	});

	if ($('#modaldatetimepicker .slick-prev').length) {
		goToCalendar();
	}
}
function getOfbizReadableDate(date) {
	if (date != null) {
		var day = date.split("/")[0];
		var month = date.split("/")[1];
		var year = date.split("/")[2];
		return day + "-" + month + "-" + year;
	} else {
		return null;
	}
}
function updateDesiredDeliveryDateTimestamp(date) {
	document.productfrm.itemDesiredDeliveryDate.value = getOfbizReadableDate(date);
}

function buildShippingMethodDetails(productId, selectedDeliveryDate, productType, countryGeoId) {
	var URL = '/control/getShippingDetails?productId=' + productId + "&deliveryDate=" + selectedDeliveryDate + "&countryGeoId=" + countryGeoId;
	if (productType == "COURIER" || productType == "PERSONALIZED") {
		URL = URL + '&pinCode=' + pincode;
	}
	$.ajax({
		type : 'POST',
		dataType : 'json',
		async : true,
		url : URL,
		success : function(shippingDetails) {
			if (shippingDetails != null && shippingDetails.isShippingDetailsExists == true) {
				var shippingInfo = shippingDetails.shippingDetails;
				var shippingMethod = null;
				var shippingMethodId = null;
				var shippingPrice = null;
				var timeSlotId = null;

				if (productType == "COURIER" || productType == "PERSONALIZED") {
					for ( var key in shippingInfo) {
						if (shippingInfo[key].priceDetails != undefined && shippingInfo[key].priceDetails.price != undefined) {
							shippingPrice = shippingInfo[key].priceDetails.price;
							shippingMethod = shippingInfo[key].shippingMethodName;
							shippingMethodId = key;
							if (parseFloat(shippingPrice) <= 0) {
								shippingPrice = "Free";
							}

							var timeSlot = shippingInfo[key].timeSlots[0];
							// var startTime = timeSlot.startTime;
							// var endTime = timeSlot.endTime;
							// timeSlot = startTime.substring(0,startTime.lastIndexOf(":")) + " - " + endTime.substring(0,endTime.lastIndexOf(":"));
							timeSlotId = timeSlot.timeSlotId;
						}
						break;
					}
					var newDateFormat = $.datepicker.parseDate("dd/mm/yy", selectedDeliveryDate);
					var fomattedDeliveryDate = $.datepicker.formatDate("mm/dd/yy", newDateFormat);
					var deliveryDate = new Date(fomattedDeliveryDate);
					$("#deliverydateofmonth").html(deliveryDate.getDate());
					$("#deliverymonth").html(monthNames[deliveryDate.getMonth()]);
					$("#deliveryweekday").html(days[deliveryDate.getDay()]);

					var shipPriceblock = '<span id="shippingcost">';
					if (shippingPrice != null && parseFloat(shippingPrice) > 0) {
						shipPriceblock = shipPriceblock + '<span class="curr_aed">AED</span>' + shippingPrice + '</span>';
					} else {
						shipPriceblock = shipPriceblock + shippingPrice + '</span>';
					}
					$("#shippingmethod").html(shippingMethod + " : " + shipPriceblock);

					// Adding the selected shipping info for delivery of COURIER product
					$("#deliveryDate").val(selectedDeliveryDate);
					$("#shippingMethodId").val(shippingMethodId);
					$("#shippingCost").val(shippingPrice);
					$("#timeSlotId").val(timeSlotId);
					updateDesiredDeliveryDateTimestamp(selectedDeliveryDate);

					$('#modaldatetimepicker').foundation('reveal', 'close');
					$("#dateAlert").hide();
					$('#datetimelink').hide();
					$('#datetimeshipping').show();
				} else {
					if ($("#modaltimeslot")) {
						$("#modaltimeslot").remove();
					}
					$("#shippingmodepanel").html("");
					var shippingDetailsTable = "";
					shippingDetailsTable = shippingDetailsTable + '<div class="shippingmodepanel">';
var hasFreeShipping = false;
					for ( var key in shippingInfo) {
						shippingMethodId = key;
						if (shippingInfo[key].priceDetails != undefined && shippingInfo[key].priceDetails.price != undefined) {
							shippingDetailsTable = shippingDetailsTable + '<div class="shipingmode"><a href="javascript:void(0)">';
							shippingPrice = shippingInfo[key].priceDetails.price;
							shippingMethod = shippingInfo[key].shippingMethodName;
							if (parseFloat(shippingPrice) <= 0) {
								shippingPrice = "Free";
hasFreeShipping = true;
							}

							var timeSlot = shippingInfo[key].timeSlots[0];
							// var startTime = timeSlot.startTime;
							// var endTime = timeSlot.endTime;
							// timeSlot = startTime.substring(0,startTime.lastIndexOf(":")) + " - " + endTime.substring(0,endTime.lastIndexOf(":"));
							var timeSlotId = timeSlot.timeSlotId;

							shippingDetailsTable = shippingDetailsTable + '<div style="display:none;" class="shippingMethodId">' + key
									+ '</div><div style="display:none;" class="timeSlotId">' + timeSlotId + '</div><span class="shippingtime">'
									+ shippingMethod + '</span>';

							var shipPriceblock = '<span class="shipmentprice" style="display:none;">' + shippingPrice + '</span>';
							if (shippingPrice != null && parseFloat(shippingPrice) > 0) {
								shipPriceblock = shipPriceblock + '<span class="shippingprice"><span class="webprice"><span class="curr_aed">AED</span>'
										+ shippingPrice + '</span><span class="priceInINR" style="display:none;">' + shippingPrice + '</span></span>';
							} else {
								shipPriceblock = shipPriceblock + '<span class="shippingprice">' + shippingPrice + '</span>';
							}

							shippingDetailsTable = shippingDetailsTable + shipPriceblock;
							shippingDetailsTable = shippingDetailsTable + '</a></div>';
						}
					}
					shippingDetailsTable = shippingDetailsTable + '</div>';
var rakhiTestInput = $("div[itemprop='description']").text() + window.location.pathname;
var isRakhiProduct = /rakhi|raksha|sister|bhayya|bhabhi|brother/gi.test(rakhiTestInput);
if((($("#FNP_CURRENT_CATALOG_ID").val().toUpperCase() == "usa".toUpperCase() && isRakhiProduct) || ($("#FNP_CURRENT_CATALOG_ID").val().toUpperCase() == "uae".toUpperCase() && $("#productDeliveryDate").val()=="18/08/2016")) && !hasFreeShipping){
	shippingDetailsTable += "<div style='text-align: center;font-size: 1.2em;' id='freeshipalert'>To avail <span style='color:#62af69;'>FREE SHIPPING</span>, <a href='javascript:void(0)' onclick='goToCalendar()' tabindex='-1' style='text-decoration: underline;'>choose a later date</a></div>";
}
					$(".shippingmodepanel").html(shippingDetailsTable);
					// $('.date-dialscroll').jScrollPane();
					initCurrencies();
					$('#modaldatetimepicker .slick-next').click();
//                    $('#timeslotDiv').hide();
//                    $('#shippingmethoddiv').show();
				}
			}
		}
	});
}

function buildShippingAndTimeSlotDetails(productId, pinCode, deliveryDate, countryGeoId) {
	$.ajax({
		type : 'POST',
		dataType : 'json',
		async : true,
		url : '/control/getShippingDetails?productId=' + productId + '&pinCode=' + pinCode + "&deliveryDate=" + deliveryDate + "&countryGeoId=" + countryGeoId,
		success : function(shippingDetails) {
            shipmentDetails = shippingDetails;
			$("#shippingmethoddiv").html("");
			// TODO : Better use jquery template or angular js for constructing the shipping details dom.
			if (shippingDetails != null && shippingDetails.isShippingDetailsExists == true) {
				var shippingInfo = shippingDetails.shippingDetails;
				var shippingDetailsTable = "";
				shippingDetailsTable = shippingDetailsTable + '<div class="shipping-scroll"><ul>';
				var methodCount = Object.keys(shippingInfo).length;
var hasFreeShipping = false;				
//				var tdMinWidth = 532 / methodCount; // 532 - width of the dialog box.
				for ( var key in shippingInfo) {

					shippingDetailsTable = shippingDetailsTable + '<li><a data-shippingmethod= "'+ key +'" class="timeslotdetails" data-ga-title="'+shippingInfo[key].shippingMethodName+'"><input type="radio" class="input-group-field applycoupon shippingtime" name="shippingtime" id="'+key+'"><label for="'+key+'"><span class="rdo-span"></span><span class="timesloter">';
					shippingDetailsTable = shippingDetailsTable + shippingInfo[key].shippingMethodName+'</label>';
					if (shippingInfo[key].priceDetails != undefined && shippingInfo[key].priceDetails.price != undefined) {
						shippingDetailsTable = shippingDetailsTable + '</span>';
						if (parseFloat(shippingInfo[key].priceDetails.price) > 0) {
							shippingDetailsTable = shippingDetailsTable + '<div class="input-group-button button del-method-btn"><span class="priceInINR" style="display:none;">'
									+ shippingInfo[key].priceDetails.price + '</span>'
									+ '<span class="delcost webprice"><span class="curr_aed">AED</span>' + shippingInfo[key].priceDetails.price;
						} else {
							shippingDetailsTable = shippingDetailsTable + '<div class="input-group-button button del-method-btn"><span class="delcost">Free';
hasFreeShipping = true;
						}
					}
					shippingDetailsTable = shippingDetailsTable + '</span></div></a></li>';
				}
				shippingDetailsTable = shippingDetailsTable + '</ul></div><a  href="javascript:void(0);" class="backtocalendar" onclick="goToCalendar()"><img src="/assets/images/back-arrow-icon.png" alt="back to calendar"/></a>';
				
				if(($("#FNP_CURRENT_CATALOG_ID").val().toUpperCase() == "uae".toUpperCase() && $("#productDeliveryDate").val()=="18/08/2016") && !hasFreeShipping){
					shippingDetailsTable += "<div style='text-align: center;font-size: 1.2em;' id='freeshipalert'>To avail <span style='color:#62af69;'>FREE SHIPPING</span>, <a href='javascript:void(0)' onclick='goToCalendar()' tabindex='-1' style='text-decoration: underline;'>choose a later date</a></div>";
				}
			}

			$("#shippingmethoddiv").html(shippingDetailsTable);
			initCurrencies();
			// $('.date-dialscroll').jScrollPane();
			$('#modaldatetimepicker .slick-next').click();
//            $('#timeslotDiv').hide();
//            $('#shippingmethoddiv').show();
            $('#modaltimeslot .timeslothead').find('.dialogueheadtitle').text("Select Shipping Method");
		}
	});
}

    //Timeslots--->
function timeSlotDetails(shippingMethodId){
    var timeslotDetailsTable = ""
    var shippingInfo = shipmentDetails.shippingDetails;
    timeslotDetailsTable = timeslotDetailsTable + '<div class="row">';
    for ( var key in shippingInfo) {
        if(key != shippingMethodId){
            continue;
        }
        $('timeslotDiv').html("");
        timeslotDetailsTable = timeslotDetailsTable + '<div class="tabs-panel time-slot">';
        timeslotDetailsTable = timeslotDetailsTable + '<div style="display:none;" class="shippingMethodName">'
                + shippingInfo[key].shippingMethodName + '</div><div style="display:none;" class="shippingMethodId">' + key
                + '</div><div class="scroll-pane" data-ga-category="SelectDate & Timeslot_'+ shippingInfo[key].shippingMethodName+'"><ul><li><span class="timeslottitle">'+ shippingInfo[key].shippingMethodName+' - '+selectedshippingmethodprice+'</span><ul class="slot">';
        var timeSlotDetails = shippingInfo[key].timeSlots;
        var shippingMethodSpecificPrice = shippingInfo[key].priceDetails.price;
        for (var i = 0; i < timeSlotDetails.length; i++) {
            var timeSlot = timeSlotDetails[i];
            timeslotDetailsTable = timeslotDetailsTable + '<li class="timeslottable"><a href="javascript:void(0);" data-ga-title="'+ timeSlot.startTime.substring(0, timeSlot.startTime.lastIndexOf(":")) + " - "
            + timeSlot.endTime.substring(0, timeSlot.endTime.lastIndexOf(":")) +' hrs"><input type="radio" class="input-group-field " name="selectTimeSlot" id='+shippingMethodId+'-'+timeSlot.timeSlotId+'>';
            var startTime = timeSlot.startTime;
            var endTime = timeSlot.endTime;
            timeslotDetailsTable = timeslotDetailsTable + '<label for='+shippingMethodId+'-'+timeSlot.timeSlotId+'"><span class="rdo-span"></span><span class="timeSlotId" style="display:none;">' + timeSlot.timeSlotId
                    + '</span><span class="timerange">' + startTime.substring(0, startTime.lastIndexOf(":")) + " - "
                    + endTime.substring(0, endTime.lastIndexOf(":")) + '</span>&nbsp;<span class="hrs"> hrs</span>';
            if (parseFloat(timeSlot.shippingPrice) > 0 && shippingMethodSpecificPrice != undefined
                    && parseFloat(shippingMethodSpecificPrice) != parseFloat(timeSlot.shippingPrice)) {
                timeslotDetailsTable = timeslotDetailsTable + '<br/><span class="timeslotprice priceInINR" style="display:none;">'
                        + timeSlot.shippingPrice + '</span><span class="priceblock webprice"><span class="curr_aed">AED</span>'
                        + timeSlot.shippingPrice + '</span>';
            } else {
                var shippingMethodPrice = "";
                if (parseFloat(shippingMethodSpecificPrice) > 0) {
                    shippingMethodPrice = '<span class="curr_aed">AED</span><span class="timeslotprice">' + shippingMethodSpecificPrice
                            + '</span>';
                } else {
                    shippingMethodPrice = '<span class="timeslotprice">Free</span>';
                }
                timeslotDetailsTable = timeslotDetailsTable + '<span class="priceblock" style="display:none;">' + shippingMethodPrice + '</span>';
            }
            timeslotDetailsTable = timeslotDetailsTable + '</a></label></li>';
        }
        timeslotDetailsTable = timeslotDetailsTable + '</ul></li></ul></div></div></div>';
    }
    $("#timeslotDiv").html(timeslotDetailsTable);
//    $('#modaltimeslot .timeslothead').find('.dialogueheadtitle').text("Select Time Slot");
//    $("#timeslotDiv").show();
//    $("#shippingmethoddiv").hide();
}
// Calendar Back Arrow Navigation Calls
function goToCalendar() {
//	$('#modaldatetimepicker .slick-prev').click();
    $('#modaldatetimepicker').slick('slickGoTo', 0);
}
function goToShippingMethod(){
    $('#modaldatetimepicker .slick-prev').click();

}
function goToGiftFinder(){
    $('#giftfinder .slick-prev').click();
}
// TODO: Make ajax call as async
function setPinCode(city, lat, lng, populateDeliveryDates) {
	$.ajax({
		type : 'POST',
		dataType : 'json',
		async : false,
		url : '/control/getPinCode?city=' + city + '&latitude=' + lat + '&longitude=' + lng,
		success : function(pinCodeDetails) {
			if (pinCodeDetails != null && pinCodeDetails.isPinCodeFound == true) {
				pincode = pinCodeDetails.pincode;
				matchedPincode = pinCodeDetails.matchedPincode;
				if (populateDeliveryDates) {
					populateDeliveryDetails(pincode);
					getProductPriceByDeliveryInfo($("#addProductId").val(), "", pincode);
				}
			} else {
				showNoServiceMessage();
			}
		}
	});
}

function showNoServiceMessage(){
	$("#pincodemsg").removeClass("infomsgbox");
	$("#pincodemsg").html("Sorry. We don't have our service to this area.");
}

// Method used to set the first pincode of the city identified from the pincode ( direct pin_code value or from lat,long's pincode values)
function setPinCodeByPostalAddress(pin_code, lat, lng) {
	$.ajax({
		type : 'POST',
		dataType : 'json',
		async : false,
		url : '/control/getPinCodeByPostalAddress?pincode=' + pin_code,
		data : {
			latitude : lat,
			longitude : lng
		},
		success : function(pinCodeDetails) {
			if (pinCodeDetails != null && pinCodeDetails.isPinCodeFound == true) {
				pincode = pinCodeDetails.pincode;
				matchedPincode = pinCodeDetails.matchedPincode;
			} else {
				showNoServiceMessage();	
			}
		}
	});
}

$.urlParam = function(name, url) {
	if (!url) {
		url = window.location.href;
	}
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
	if (!results) {
		return undefined;
	}
	return results[1] || undefined;

}

function showAddons(itemIndex) {
	var city = $("#city").val();
	var shippingMethodId = $("#shippingMethodId").val();
	var vendorId = $("#vendorId").val();
	var productId = $("#productId").val();
	//var addProductId = $("#addProductId").val();
	var addProductId = $("#productId").val();//we are sending the virtual product id even if we selected the varient product
	var productType = $("#productType").val();
	var timeSlotId = $("#timeSlotId").val();
    isbuynow = $("input[name='isbuynow']").val();
	$("#addonDetails").html("");
	var queryString = [ "productId=" + productId, "addProductId="+addProductId, "pinCode=" + pincode, "shippingMethod=" + shippingMethodId, "vendorId=" + vendorId,"timeSlotId=" + timeSlotId,
			"productType=" + productType, "itemIndex=" + itemIndex, "FNP_CURRENT_CATALOG_ID=" + $("#FNP_CURRENT_CATALOG_ID").val(), "isbuynow=" + isbuynow ];
	var queryStringObject = jQuery.deparam.querystring(queryString.join("&"), true);
	var finalQueryString = $.param.querystring("?", queryStringObject, 0);

	$("#addonDetails").load("/control/getAddonsDetails" + finalQueryString, function(response, status, xhr) {
		if ($("#isAddonsAvailable") != undefined && $("#isAddonsAvailable").val() == "Y") {
			$('#addon').foundation('reveal', 'open');
				if(typeof omnitureAddonShown == 'function'){
					omnitureAddonShown();
				}               
		} else {
            if($("input[name='isbuynow']").length && $("input[name='isbuynow']").val() == 'N'){
                reloadForAddons("N");
            }
            else{
			// $("#cart").trigger("click");
			     proceedToCheckOut();
            }
		}
	});
    
}
var deliveryDates = null;
var calenderMessage;
function populateDeliveryDetails(pinCode) {
	calenderMessage = null;
	var productId = $("#addProductId").val();
	var URL = '/control/getPinCodeAndDeliveryDates?productId=' + productId;
	if (pinCode != null && pinCode != "") {
		URL = URL + '&pinCode=' + pinCode;
	}
	$.ajax({
		type : 'POST',
		dataType : 'json',
		async : true,
		url : URL,
		success : function(deliveryDatesList) {
			if (deliveryDatesList != null) {
				if (deliveryDatesList.isDatesAvailable) {
					deliveryDates = deliveryDatesList.deliveryDates;
					calenderMessage  =  deliveryDatesList.calenderMessage;
					checkRakhiCondition(deliveryDates);
					enableDateTimeSelector();
					$("#datetimelink").focus();
				} else {
					deliveryDates = null;
					showNotDeliverableMessage();
					disableDateTimeSelector();					
				}
			}
		},
		error : function(xhtr, status, error) {
			deliveryDates = null;
		}
	});
}

function checkRakhiCondition(deliveryDates){
	if(isCourierProduct() && (new Date() <= new Date().setFullYear(2016, 07, 19))){
		 if(/rakhi|raksha|sister|bhayya|Bhabhi|brother/gi.test($("div[itemprop='description']").text()) || /rakhi|raksha|sister|bhayya|Bhabhi|brother/gi.test(window.location.pathname)){
			 $("#pincodemsg").addClass("infomsgbox").html(
					"For delivery by 19<sup style='font-size:0.6em;'>th</sup> <a style='text-decoration:underline;' href=\"/rakhi-same-day-delivery\">view available gifts</a> For later dates <a href='javascript:void(0)' style='text-decoration:underline' onclick='return productDelivery(\"COURIER\");'>select date</a>.");
			$("#pincodemsg").show();
		}
	}
}


function showNotDeliverableMessage(){
	// show error message in the UI.
	var paramStr = $("a[name='locality']").text().toLowerCase().split(' ').join('-');
	if (selectedLocalityGoogle) {
		var occasionTag = $.urlParam("OCCASION_TAGS");
		paramStr = "OCCASION_TAGS=" + (occasionTag ? occasionTag : "") + "&";
		paramStr += "localityname=" + selectedLocalityGoogle;
	}
	else if (selectedPincodeGoogle){
		 paramStr = $("a[name='locality']").text().toLowerCase().split(' ').join('-');
	}
	$("#pincodemsg").addClass("infomsgbox").html("This gift cannot be delivered here.  <a href=\"/gifts/" + paramStr + "\">View available gifts</a>.");
	$("#pincodemsg").show();
	pincode = null;
}
// Initialize pincodes for autocomplete from DB for courier/personalized product
function initializeAvailablePinCodes() {
	var productType = $("#productType").val();
	var productId = $("#productId").val();
	if (productType != undefined && (productType == "COURIER" || productType == "PERSONALIZED")) {
		$.ajax({
			type : 'POST',
			dataType : 'json',
			async : true,
			url : AJAX_JSON_URL_LIST.availablePincodeUrl + '?productId=' + productId,
			success : function(pinCodesDetails) {
				if (pinCodesDetails.isPinCodesAvailable != null && pinCodesDetails.isPinCodesAvailable == true) {
                    courierPincodesList = pinCodesDetails.pincodesList;
					postalCodesAutoComplete(pinCodesDetails.pincodesList);
				}
			}
		});
	}
}
function postalCodesAutoComplete(pinCodesList) {
	$("#localitylookup").autocomplete({
		source : function(request, response) {
			var pincodesToShow = [];
			for (var i = 0; i < pinCodesList.length; i++) {
				var pinCode = pinCodesList[i].toString();
				if (pinCode.indexOf(request.term) == 0) {
					pincodesToShow.push(pinCode);
				}
			}
			response(pincodesToShow);
		},
		open: function(event, ui) {
	        $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
		},
		minLength : 1,
		response : function(event, ui) {
			if (ui.content.length == 0) {
				ui.content.push({
					'label' : 'Enter pin code of delivery location',
					'value' : ''
				});
			}
		},
		create : function(event, ui) {
			$(this).data("ui-autocomplete")._renderItem = function(ul, item) {
				 var re = new RegExp( "(" + this.term + ")", "gi" );
	             var template = "<span class='option-highlight'>$1</span>";
	             var label = item.label.replace( re, template );
				if (item.value == '') {
					return $('<li class="ui-state-disabled">' + item.label + '</li>').appendTo(ul);
				} else {
					var spanElement = "<span class='loc-icon'></span>";
					return $("<li>").append(spanElement).append(label).appendTo(ul);
				}
			};
		},
		select : function(event, ui) {
			pincode = ui.item.value;
			selectedCourierPinCode = pincode;
			populateDeliveryDetails(pincode);
			getProductPriceByDeliveryInfo($("#addProductId").val(), "", pincode);
			$("#pincodemsg").text("");
			$("#pincodemsg").hide();
			$("#dateAlert").hide();
			$('#datetimelink').focus();
		}
	}).autocomplete("widget").addClass("customizedAutoComplete");
}

function recipientCity() {
	$('#modalrecipientcity').foundation('reveal', 'open');
}

// This method is used for both delivery date specific price and also geo code specific product price updation.


function getProductPriceByDeliveryInfo(productId, deliveryDate, geoId) {
	var isPriceRuleGotApplied = false;
	var isPriceIncreased = false;
	var productType = getProductType();
	ajaxindicatorstart('');
	$.ajax({
		type : 'POST',
		dataType : 'json',
		async : true,
		url : '/control/getProductPriceByDeliveryDate?productId=' + productId + '&geoId=' + geoId + '&deliveryDate=' + deliveryDate + '&FNP_CURRENT_CATALOG_ID=' + $("#FNP_CURRENT_CATALOG_ID").val(),
		success : function(priceDetails) {
			if (priceDetails != null) {
				if(productType != "COURIER" && productType != "PERSONALIZED"){
					var selectedDeliveryDate = "";
					if($("#itemDesiredDeliveryDate").length){
						selectedDeliveryDate = $("#itemDesiredDeliveryDate").val().split(" ")[0];
					}
					 if(selectedDeliveryDate && typeof selectedDeliveryDate != "undefined" && selectedDeliveryDate != ''){
						 if(priceDetails.isPricingRuleApplied === "Y"){
							 if(productType != 'INTERNATIONAL'){
					if(eventDates!=null && eventDates.indexOf(selectedDeliveryDate)!=-1){
										isPriceRuleGotApplied = true;
									}else{
										isPriceRuleGotApplied = false;
									}
				}else{
								  isPriceRuleGotApplied = true;
				}
				}
					 }
				}
				var productPriceBlock = $("form[name='productfrm'] .price-block");
				if (parseFloat(priceDetails.price) > parseFloat(priceDetails.listPrice)) {
					isPriceIncreased = true;
					$(productPriceBlock).find(".price").html('<span class="curr_aed">AED</span>' + priceDetails.price);
					if ($(productPriceBlock).find(".oldprice") != undefined) {
						$(productPriceBlock).find(".oldprice").html("");
						$(productPriceBlock).find(".oldprice").hide();
					}
					if ($(productPriceBlock).find(".off") != undefined) {
						$(productPriceBlock).find(".off").hide();
					}

				} else {
					isPriceIncreased=false;
					if (priceDetails.listPrice != undefined && priceDetails.listPrice != "") {
						var discountedPrice = parseFloat(priceDetails.listPrice) - parseFloat(priceDetails.price);
						var discount = (parseFloat(discountedPrice) / parseFloat(priceDetails.listPrice)) * 100;
						if ($(productPriceBlock).find(".off") != undefined) {
							$(productPriceBlock).find(".off").html(' (' + Math.floor(discount) + '% OFF)');
							$(productPriceBlock).find(".off").show();
						}
						if ($(productPriceBlock).find(".oldprice") != undefined) {
							if ($(productPriceBlock).find(".oldpriceInINR") != undefined) {
								$(productPriceBlock).find(".oldpriceInINR").html(priceDetails.listPrice);
							}
							$(productPriceBlock).find(".oldprice").html('<span class="curr_aed">AED</span>' + priceDetails.listPrice);
							$(productPriceBlock).find(".oldprice").show();
						}
					}
					$(productPriceBlock).find(".price").html('<span class="curr_aed">AED</span>' + priceDetails.price);
				}
				/*if (isPriceRuleGotApplied && isPriceIncreased) {
					$(".price-increase-info-icon").removeClass("valentinesdisp");
				}else{
					$(".price-increase-info-icon").addClass("valentinesdisp");
				}*/
				$(".price-increase-info-icon").addClass("valentinesdisp");
				$(productPriceBlock).find(".priceInINR").html(priceDetails.price);
				$("#price").val(priceDetails.price);				
				initCurrencies();
				ajaxindicatorstop('');
			}else{
				$(".price-increase-info-icon").addClass("valentinesdisp");
				ajaxindicatorstop('');
			}
		}
	});
}

function initializePaymentMode() {
	/*$("#paymentmodetab").tabs({
		event : "click",
		active : 1,
		disabled : [ 0, 9 ]
	}).addClass("ui-tabs-vertical ui-helper-clearfix");*/

	$('#tabs-1 .medium-block-grid-2 li a').click(function() {
		$('.medium-block-grid-2 li a').removeClass('active');
		$('#paymentmodetab [id^="cards-"]').hide();
		$($(this).attr('href')).show();
		$(this).toggleClass('active');
		if (this.id == "SAVED_CREDIT_CARD") {
			$("#creditCardStatus").val("SAVED_CARD");
			$(".carderrormsg_CC").hide();
		} else {
			$("#creditCardStatus").val("NEW_CARD");
		}
		return false;
	});
	$('#tabs-2 .medium-block-grid-2 li a').click(function() {
		$('#tabs-2 .medium-block-grid-2 li a').removeClass('active');
		$('#paymentmodetab #tabs-2 [id^="debcards-"]').hide();
		$($(this).attr('href')).show();
		$(this).toggleClass('active');
		if (this.id == "SAVED_DEBIT_CARD") {
			$("#debitCardStatus").val("SAVED_CARD");
		} else {
			$("#debitCardStatus").val("NEW_CARD");
		}
		return false;
	});

	$(document).on("click", ".showsavedcard", function() {
		$(this).closest("ul").siblings("form").find(".othersavedcard").show();
	});
	$(document).on("click", ".newcard", function() {
		$(this).closest("ul").siblings("form").find(".othersavedcard").hide();
	});
	$(document).on("click", ".othercard", function() {
		$(this).hide();
		var selectedcard = $(this).find(".cardnumber").html();
		var selectedcardtoken = $(this).find(".savedCardToken").val();
		var latestcard = $(this).closest(".paymentmode").find(".savedcard .cardnumber").html();
		var latestcardtoken = $(this).closest(".paymentmode").find(".savedcard .savedCardToken").val();
		$(this).closest(".paymentmode").find(".savedcard .cardnumber").html(selectedcard);
		$(this).closest(".paymentmode").find(".savedcard .savedCardToken").val(selectedcardtoken);
		$(this).siblings(".othercarddlabel").after($(this).show());
		$(this).find(".cardnumber").html(latestcard);
		$(this).find(".savedCardToken").val(latestcardtoken);
	});

	$(document).on("click", ".cardconfirmyes", function(e) {
		var currentEle = this;
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '/control/deleteSavedUserCard?partyId=' + $("#partyId").val() + "&cardToken=" + $("#mainCardToken").val(),
			success : function(deleteResponse) {
				if (deleteResponse != null) {
					if (deleteResponse.status != null && deleteResponse.status == 1) {// success
						if ($(".othercarddlabel").next($(".othercard")).length) {
							var topmostcard = $(".othercarddlabel").next($(".othercard")).find(".cardnumber").html();
							var topmostcardtoken = $(".othercarddlabel").next($(".othercard")).find(".savedCardToken").val();
							$(".othercarddlabel").next(".othercard").remove();
							$(".carddelete").siblings(".cardnumber").html(topmostcard);
							$(".carddelete").siblings(".savedCardToken").val(topmostcardtoken);
							$(currentEle).closest(".removecard").hide();
							$(currentEle).closest(".removecard").siblings(".savedcard").show();
							$(".savedcard .cardnumber").html(topmostcard);
							$(".savedcard .savedCardToken").val(topmostcardtoken);
						} else {
							// last saved card delete
							$(currentEle).closest(".removecard").hide();
							// hiding the saved card tab when there are no more saved cards
							$(".showsavedcard").hide();
							$(".newcard").trigger("click");
						}
					}
				}
			}
		});
		e.stopPropagation();
		e.preventDefault();
	});

	$(document).on("click", ".carddelete", function() {
		$(this).closest(".savedcard").hide();
		$(this).closest(".savedcard").siblings(".removecard").show();
	});
	$(document).on("click", ".cardconfirmno", function(e) {
		$(this).closest(".removecard").hide();
		$(this).closest(".removecard").siblings(".savedcard").show();
		e.stopPropagation();
		e.preventDefault();
	});

	$(".paymentselect").click(function() {
		$(this).find('input:radio').prop('checked', true);
		$(".paymentselect").removeClass("selectedOption");
		$(this).addClass("selectedOption");
	});
	$(".cardradioblock").click(function() {
		$(this).find('input:radio').prop('checked', true);
	});

	$('#checkoutInfoFormWallet .paymentselect').on('click', function() {
		if ($("input[name=checkOutPaymentId]:checked").length) {
			var ele = $("input[name=checkOutPaymentId]:checked")[0];
			if (ele.value.contains("PAYU")) {
				var selectedWallet = $(ele).attr("data-walletname");
				$("#selectedWallet").val(selectedWallet);
			}
		}
	});

	$(".otheroptionsmenu a").click(function() {
		$(".otheroptionsmenu a").removeClass("active");
		$(this).addClass("active");
	});

}

/*
 * validating the checkbox on ordersummary pages
 *
 */

function hideTerms(val) {
	if (val)
		$("#termscondition").hide();
}



function validateCheckBox(button) {
	if (!document.getElementById('checkbox').checked) {
		$("#termscondition").show();
	} else {
		disableSubmitBtn($('.buttonrow #backbutton'));
		disableAndAddLoadingGift(button);
		$("form[name='ordersummaryform']").submit();
	}
	
}

function disableAndAddLoadingGift(button) {
	gaElement(button);
	$(button).addClass("loadinggif");
	$(button).css("color", "#EEE");// dynamically required.
	$(button).css("border-color", "#EEE");	
	$(button).prop("disabled", true);
}

function enableAndAddLoadingGift(button) {
	gaElement(button);
	$(button).removeClass("loadinggif");
	$(button).css("color", "#FFF");// dynamically required.
	$(button).css("border-color", "#f97d00");	
	$(button).prop("disabled", false);
}

// will be used for disabling submit btn. Used where background is gray.
function disableSubmitBtnWithLoadingGif(button) {
	$(button).addClass("loadinggif");
	$(button).css("color", "#A9A9A9");// dark gray
	$(button).css("border-color", "#A9A9A9");
	$(button).prop("disabled", true);
}

function disableSubmitBtn(button) {
	$(button).attr('disabled','disabled');
	$(button).css('background-color','#FFFFFF');
	$(button).css('border-color','#a3a5a6');
	$(button).css('color','#a3a5a6');
}

// accodian for termsncondition dialog
$(function() {
	$("#tncaccordion").accordion({
		collapsible: true,
		active: false,
	});
});

// Currency conversion logic
function initCurrencies() {
	// baseFormat = (typeof CURRENCY_FORMAT === 'undefined')?"INR":CURRENCY_FORMAT;
	baseFormat = defaultCurrencyUomId;
	cookieLocalCurrency = getCookie("localCurrency");
	if(!cookieLocalCurrency){
		cookieLocalCurrency = countrycurrency;
	}
	if (cookieLocalCurrency != null && cookieLocalCurrency != "" && cookieLocalCurrency != baseFormat) {
		// If ever currency already exists in the cookie. Get that element and update the price else use baseformat.
		var currElement = $('[data-currencyuom="' + cookieLocalCurrency + '"]');
		if (currElement.length) {
			var defaultCurrencyFormat = currElement[0].getAttribute("data-currencyvalue");
			convertPricesToLocal(defaultCurrencyFormat, cookieLocalCurrency);
		} else {
			var defaultCurrEle = $('[data-currencyuom="' + baseFormat + '"]');
			if (defaultCurrEle.length) {
				var defaultCurrencyFormat = $(defaultCurrEle)[0].getAttribute("data-currencyvalue");
				convertPricesToLocal(defaultCurrencyFormat, baseFormat);
			}
		}
	} else {
		var currElement = $('[data-currencyuom="' + baseFormat + '"]');
		if (currElement.length) {
			var defaultCurrencyFormat = $(currElement)[0].getAttribute("data-currencyvalue");
			convertPricesToLocal(defaultCurrencyFormat, baseFormat);
		}
	}
}

// this method will use to access the akamail edgescope header from response
function getAkamaiEdgeScopeHdrMap(responseObj){
		var responseheader = responseObj.getResponseHeader('X-Akamai-Edgescape');
		if(responseheader){
			var headerMap = {};
			var responseMap=responseheader.split(",");
			for(var i=0;i<responseMap.length;i++){
			var response=responseMap[i].split("=");
			headerMap[$.trim(response[0])] = response[1];
			}
			return headerMap;
		}
}

/*
 *  parameters
 *  currenciesData = list of jsonObject with formatted way from /getCurrencis Ajax request
 *  countryGeoCode = "IN", "PK", "US"
 */
function getCurrencyFromGeoCode(currenciesData, countryGeoCode){ 
	var currency = "";
	currencyUomId = "SGD";
	if(currenciesData && countryGeoCode){
		var listSize = currenciesData.length;
		for(var i=0; i < listSize; i++){
			var currency = currenciesData[i].currency;
			for(var j=0; j< currency.geoCode.length ; j++){
			     if(currency.geoCode[j].toUpperCase() == countryGeoCode.toUpperCase()){
			    	 currencyUomId = currency.id;
					break;
				}
			}
		}
	}
	return currencyUomId;
}

function getCurrencies() {
	try {
		if (!$('.currencys').length) {
			var defaultCurrency = defaultCurrencyUomId;
			$.ajax({
				global : false,
				url : "/control/getCurrencies",
				type : 'get',
				dataType : 'json',
				cache : true,
				async : true,
				error : function() {
				},
				success : function(data,textStatus,jqXHR) {
						if (data != null && data.currencies != null) {
						//var country_code=jqXHR.getResponseHeader('X-Akamai-Edgescape').split(",")[0].split("=")[1].toUpperCase(); //TODO read response header and set the value
						//var responseheader=jqXHR.getResponseHeader('X-Akamai-Edgescape');
						
						var currenciesData = data.currencies;
						var listSize = currenciesData.length;
						if (listSize > 0) {
							var geoLocationDtls	= getAkamaiEdgeScopeHdrMap(jqXHR);
							if(geoLocationDtls){
								var countryCode = geoLocationDtls.country_code;
								countrycurrency = getCurrencyFromGeoCode(currenciesData, countryCode);
								if(!countrycurrency){
									countrycurrency = defaultCurrencyUomId;
								}
							}
							
							// removing the existing currency list
							$(".currencyinfo").html("");
							var currenciesListStr = '';
							var popularCurrencies = "";
							var allCurrencies = "";
							// adding the currencies
							for (var i = 0; i < listSize; i++) {
								var currency = currenciesData[i].currency;
								 var currencyId = currency.id;
								 if (currencyId == "SGD" || currencyId == "INR" || currencyId == "USD" || currencyId == "EUR" || currencyId == "GBP" || currencyId == "AUD") {
									popularCurrencies = popularCurrencies + '<li class="currencyoption" data-currencyuom="' + currencyId + '" data-currencyvalue="'
									+ currency.value + '"><a href="javascript:void(0)">' + currencyId + " - " + currency.name + '</a></li>';
								 } else {
									 allCurrencies = allCurrencies +'<li class="currencyoption" data-currencyuom="' + currencyId +'" data-currencyvalue="' +
									 currency.value + '"><a href="javascript:void(0)">' + currencyId + " - " + currency.name + '</a></li>';
								 }
							}
							currenciesListStr = popularCurrencies + allCurrencies;
                            if ($("#currencydropdown").length) {
                                $("#currencydropdown").append(currenciesListStr);
                            } else {
                                var currenciesData = $("<div  style='display:none'><ul>" +
                                    currenciesListStr + "</ul></div>");
                                currenciesData.appendTo('body');
                            }
						}
					}
				},
				complete : function(xhr, status) {
					// Check cookie for the selected currency and update accourdingly.
					if(window.location.search.contains("localCurrency")){
						document.cookie = [ "localCurrency", "=", $.urlParam('localCurrency'), ";expires=24*60*60*60*1000", ";path=/", ";domain=" + cookieDomain, "" ].join("");
					}
					initCurrencies();
				}
			});
		}
	} catch (e) {
	}
}

function getInrCurrenciesForInternational() {
	try {
		var defaultCurrency = "";
		$.ajax({
			global : false,
			url : "/control/getCurrencies",
			type : 'get',
			dataType : 'json',
			cache : true,
			async : false,
			error : function() {
			},
			success : function(data,textStatus,jqXHR) {
					if (data != null && data.currencies != null) {
					//var country_code=jqXHR.getResponseHeader('X-Akamai-Edgescape').split(",")[0].split("=")[1].toUpperCase(); //TODO read response header and set the value
					//var responseheader=jqXHR.getResponseHeader('X-Akamai-Edgescape');
					
					var currenciesData = data.currencies;
					var listSize = currenciesData.length;
					if (listSize > 0) {
						for (var i = 0; i < listSize; i++) {
							var currency = currenciesData[i].currency;
							var currencyId = currency.id;
							if (currencyId == "INR") {
								defaultCurrency = currency.value;
							}
						}
					}
				}
			}
		});
	} catch (e) {
	}
	return defaultCurrency;
}

function internationalCategories(internationalContents,country){
	var oneAEDPrice = convertInternatioanlProductPrices();
    var internationalAjaxCalls = [];
    $.each(internationalContents, function(index, value) {
    	var urlValue= "";
    	if(country != "india"){
    		urlValue = country+"%2F";
    	}
    	urlValue = urlValue+value;
    var ajaxCall =$.ajax({
     url: internationalHostName+'/control/productlistingSecure',
     type:'GET',
     async : false,
     data:'category_id='+urlValue+'&CURRENT_CATALOG_ID='+country+'&viewIndex=0&viewSize=5&sortFields=SEQUENCE_NUM_'+urlValue+'|ASC&pageType=secureCategory',
     success:function(data){
        $("."+value).append(data);
        $("."+value+" .u-url").each(function(){
             iterateInternationalProduct($(this),oneAEDPrice);
         });
      }
   });
   internationalAjaxCalls.push(ajaxCall);      
   });
}

function iterateInternationalProduct(ele,oneAEDPrice){
	var url = $(ele).attr("href");
    $(ele).attr("href","http://www.fnp.com"+url);
    var webPriceStr = "";
    var currClass = "curr_aed";
    if ($(ele).find('.oldprice').length > 0) {
        var oldPriceEle = $(ele).find('.oldprice');
        var pr= getPriceFromElementInternational($(ele),"oldPrice",oneAEDPrice);
        pr = (parseFloat(pr) / parseFloat(1.00)).toFixed(2);
        webPriceStr = webPriceStr + '<span class="oldprice" style="text-decoration: line-through;">';
        webPriceStr = webPriceStr + '<span class="' + currClass + '">' + "AED" + '</span>' + pr + '</span>'
       $(ele).find(".oldpriceInINR").text(pr);       
    }
     if ($(ele).find('.webprice').length > 0) {
        var priceEle = $(ele).find('.webprice');
        var pr= getPriceFromElementInternational($(ele),"currentPrice",oneAEDPrice);
        pr = (parseFloat(pr) / parseFloat(1.00)).toFixed(2);
        webPriceStr = webPriceStr + '<span class="' + currClass + '">' +"AED" + '</span>' + pr + '</span>';
        $(priceEle).html(webPriceStr);
        $(ele).find(".priceInINR").html(pr);
    }
}

function getPriceFromElementInternational(ele,value, convertionFactor) {
	try {
		var priceInINR = null;
	   if(value == "oldPrice"){
		  priceInINR = $(ele).parent().parent().find("span.oldpriceInINR").html();
	    }else{
		  priceInINR = $(ele).parent().find("span.priceInINR").html();
	    }
	     priceInINR = priceInINR.replace(/^[^\d]*/, "").replace(/,/g, "");
	     priceInINR = convertionFactor * priceInINR;
	     return priceInINR;
	} catch (e) {
	}
}

function convertInternatioanlProductPrices(){
   var conversionFactor = getInrCurrenciesForInternational()
   if(typeof conversionFactor == "undefined"){
	   return;
   }
   conversionFactor = conversionFactor.replace(/^[^\d]*/, "");
   currencySymbol = conversionFactor.replace(conversionFactor, "");
   conversionFactor = conversionFactor.replace(",", "");
   var oneAEDVal = 1/conversionFactor;
   oneAEDVal = currencySymbol+oneAEDVal;
   return oneAEDVal;
}
 

function convertPricesToLocal(currencyFormat, currencyUom) {
	try {
		if (typeof currencyFormat != "undefined") {
			var conversionFactor = currencyFormat.replace(/^[^\d]*/, "");
			currencySymbol = currencyFormat.replace(conversionFactor, "");
			conversionFactor = conversionFactor.replace(",", "");

			var currClass = "curr_aed";
			if (currencyUom != defaultCurrencyUomId) {
				currClass = "curr_" + currencyUom.toLowerCase();
			}
			var priceStr = '<span class="' + currClass + '">' + currencySymbol + '</span>';

			// Updating the selected currency icon value in the top bar if exists
			if($("#currency-sym").length){
            	$("#currency-sym").text(currencyUom.toUpperCase()).removeClass().addClass(currClass);
            }

			$("span.webprice").each(function(index, element) {
				if (!$(element).children("strike").length) {
					var localPrice = convertPriceFromINR(getPriceFromData(this), conversionFactor);
					updateCurrencyDetails(this, localPrice, currencySymbol, currencyUom, conversionFactor);	
				}
			});
			if ($(".selectedCurrency").length > 0) {
				$(".selectedCurrency").val(currencyUom);
			}
			// Product page price changes
			$("span.price-block").each(function() {
				var localPrice = convertPriceFromINR(getPriceFromData($(this).find(".pricediv").parent()), conversionFactor);
				if (currencyUom == defaultCurrencyUomId) {
					localPrice = Math.round(localPrice);
				}
				if ($(this).find(".price").length > 0) {
					$(this).find(".price").html(priceStr + localPrice);
				}
				if ($(this).find(".oldprice").length > 0) {
					var localPrice = convertPriceFromINR(getPriceFromData($(this).find(".oldprice")), conversionFactor);
					if (currencyUom == defaultCurrencyUomId) {
						localPrice = Math.round(localPrice);
					}
					$(this).find(".oldprice").html(priceStr + localPrice);
				}
			});

			lastConversionFactor = conversionFactor;
			lastCurrencyFormat = currencySymbol;
			document.cookie = [ "localCurrency", "=", currencyUom, ";expires=24*60*60*60*1000", ";path=/", ";domain=" + cookieDomain, "" ].join("");
		}
	} catch (e) {
	}
}

function updateCurrencyDetails(ele, localPrice, currencySymbol, currencyUom, conversionFactor) {
	var webPriceStr = "";
	var currClass = "curr_aed";
	webPriceStr = '<meta itemprop="priceCurrency" content="' + currencyUom + '">';
	webPriceStr = webPriceStr + '<meta itemprop="price" content="' + localPrice + '">';
	if (currencyUom != defaultCurrencyUomId) {
		currClass = "curr_" + currencyUom.toLowerCase();
	}
	if (currencyUom == "SGD") {
		localPrice = Math.round(localPrice);
	}
	webPriceStr = webPriceStr + '<span class="' + currClass + '">' + currencySymbol + '&nbsp;</span>' + localPrice + '</span>';
	if ($(ele).parent().find(".oldpriceInINR").text().length > 0) {
	    var oldPriceEle = $(ele).parent().find(".oldpriceInINR");
		var oldPriceLocal = convertPriceFromINR(getPriceFromData(oldPriceEle[0]), conversionFactor);
		if (currencyUom == "SGD") {
			oldPriceLocal = Math.round(oldPriceLocal);
		}
		webPriceStr += "<span class='offer-and-oldprice'>"
		webPriceStr = webPriceStr + '<span class="oldprice" style="text-decoration: line-through;">';
		webPriceStr = webPriceStr + '<span class="' + currClass + '">' + currencySymbol + '</span>' + oldPriceLocal + '</span>'
		if ($(ele).find('.off').length > 0) {
			webPriceStr += "<span class='off'>" + $(ele).find('.off').html()
					+ "</span>";
		}
		webPriceStr += "</span>";
	}
	$(ele).html(webPriceStr);
}

function convertPriceFromINR(price, conversionFactor) {
	try {
		conversionFactor = conversionFactor.toString().replace(/,/g, "");
		price = price.toString().replace(/,/g, "");
		conversionFactor = conversionFactor.toString().replace(/,/g, "");
		price = (parseFloat(price) / parseFloat(1.00)).toFixed(2);
		var local = (parseFloat(price) * parseFloat(conversionFactor)).toFixed(2);
		return local;
	} catch (e) {
	}
}

function getPriceFromData(ele) {
	try {
		var priceInINR = null;
		if($(ele).hasClass("oldpriceInINR")){
			priceInINR = $(ele).parent().parent().find("span.oldpriceInINR").html();
		}else if($(ele).hasClass("oldprice")){
			priceInINR = $(ele).parent().parent().find("span.oldpriceInINR").html();
		} else {
			priceInINR = $(ele).parent().find("span.priceInINR").html();
		}
		return priceInINR.replace(/^[^\d]*/, "").replace(/,/g, "");
	} catch (e) {
	}
}

function CommaFormatted(amount) {
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.', 2)
	var d = a[1];
	var i = parseInt(a[0]);
	if (isNaN(i)) {
		return '';
	}
	var minus = '';
	if (i < 0) {
		minus = '-';
	}
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while (n.length > 3) {
		var nn = n.substr(n.length - 3);
		a.unshift(nn);
		n = n.substr(0, n.length - 3);
	}
	if (n.length > 0) {
		a.unshift(n);
	}
	n = a.join(delimiter);
	if (d.length < 1) {
		amount = n;
	} else {
		amount = n + '.' + d;
	}
	amount = minus + amount;
	return amount;
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

/*function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}*/
function setCookie(cname, cvalue, exdays, cpath) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = (cname == "fnpsearch") ? "expires=" : "expires="+ d.toUTCString();
    //added path for saving cookie 
    if (cpath != undefined && cpath != null) {
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=" + cpath;
    } else {
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
}

function initializePernalizedProductEvents() {
	$(".personalmsg textarea").focus(function() {
		$("#uploadMsg").hide();
	});
	$('#imageuploadbtn').hover(function() {
		$(".imgupload").find("span").css("color", "#59b5d7");
		$("#uploaddetails").show();
		$(".imgupload").addClass('imguploadhovered');
	}, function() {
		$(".imgupload").find("span").css("color", "#888");
		$("#uploaddetails").hide();
		$(".imgupload").removeClass('imguploadhovered');
	});

	$(".upload").change(function() {
		$("#uploadMsg").hide();
        $('.imgupload').addClass("loadinggif");
		$("#prodPersnlzdFrm").submit();
	});
}

function timeslothoverchange() {
	$('#modaltimeslot').on('mouseover', '.date-dialscroll a', function() {
		$(this).find("span").css("color", "#fff");
		$(this).css("background-color", "#0078a0");
	});
	$('#modaltimeslot').on('mouseout', '.date-dialscroll a', function() {
		$(this).find("span").css("color", "##333");
		$(this).css("background-color", "#fff");
	});

}

function startCallback() {
	return true;
}

function completeCallback(response) {
	$("#uploadMsg").hide();
	// make something useful after (onComplete)
	// document.getElementById('uploadedImg').src = response;
	if (response != null) {
		var respObj = $.parseJSON(response);
		if (respObj.isSuccess == true) {
			$(".imgupload span").html('<img src="' + respObj.imageUrl + '" class="personalizedimg"/>');
			$("#personalizedImage").val(respObj.imageUrl);
            
			$("#uploadMsg").html("Your image has been uploaded");
			$("#uploadMsg").addClass('success');
			$("#uploadMsg").show();
		} else {
			$(".imgupload span").html('UPLOAD PHOTO');
			$("#uploadMsg").html(respObj.errorMsg);
			$("#uploadMsg").removeClass("success");
			$("#uploadMsg").show();
		}
        $('.imgupload').removeClass("loadinggif");
	}

}
function customizeSortSelect() {
	var sortSelectMenu = $("#sort").selectmenu({
		position : {
			my : "right bottom",
			at : "right top"
		},
		icons : {
			button : "ui-icon-carat-1-n"
		},
		change : function(event, ui) {
			$("#sort").val(ui.item.value);
			$("#sort").trigger("change");
		}
	});
}

function resizeTextArea(elem) {
	if (elem.size() > 0) {
		elem.height(1);
		elem.scrollTop(0);
		elem.height(elem[0].scrollHeight - elem[0].clientHeight + elem.height());
	}
}
// thanku page accordian

$(function() {
	$("#thankaccordion > div").accordion({
		header : "h3",
		collapsible : true,
		active : false,
	});
});
$(function() {
	$("#discountaccordion > div").accordion({
		header : "h3",
		collapsible : true
	});
});

$(function() {
	$(".reminder-datepicker").datepicker({
		dayNamesMin : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
		dateFormat : "M, d",
		changeYear : true,
		showOtherMonths : true,
		selectOtherMonths : true,
		yearRange: new Date().getFullYear()+":c+100",
		minDate: '-0d',
		beforeShow: function( input, inst){
			$("#ui-datepicker-div").addClass('reminder-specific');
		}
	});
	$("#ui-datepicker-div").addClass("persondatepicker");
	
	$(".profile-edit-datepicker").datepicker({
		dayNamesMin : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
		dateFormat : "M, d",
		changeYear : true,
		showOtherMonths : true,
		selectOtherMonths : true,
		yearRange: "c-100:"+ new Date().getFullYear(),
		maxDate: '+0d',
		beforeShow: function( input, inst){
			$("#ui-datepicker-div").addClass('edit-profile-specific');
		}
	});
	$("#ui-datepicker-div").addClass("persondatepicker");
});

/**
 * @Auth : Chitrarth Auto complete for occasion reminder Data we get from combination of OccasionReminder Entity and other provided occasion
 */

function initializeOccasionReminder() {
	// first load occasion list
	$.ajax({
		type : 'GET',
		dataType : 'json',
		sync : true,
		url : AJAX_URL_LIST.reminderUrl,
		success : function(data) {
			$(".autosuggest").autocomplete({
				source : data.occasion,
				open: function(event, ui) {
			        $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
				},
				minLength : 1
			});

		}

	});
}

function ajaxindicatorstart(text) {
	if (jQuery('body').find('#resultLoading').attr('id') != 'resultLoading') {
		jQuery('body').append(
				'<div id="resultLoading" style="display:none"><div><img src="' + cdnHost + '/assets/images/full_page_loader.gif"><div>' + text
						+ '</div></div><div class="bg"></div></div>');
	}

	jQuery('#resultLoading').css({
		'width' : '100%',
		'height' : '100%',
		'position' : 'fixed',
		'z-index' : '10000000',
		'top' : '0',
		'left' : '0',
		'right' : '0',
		'bottom' : '0',
		'margin' : 'auto'
	});

	jQuery('#resultLoading .bg').css({
		'background' : '#000000',
		'opacity' : '0.6',
		'width' : '100%',
		'height' : '100%',
		'position' : 'absolute',
		'top' : '0'
	});

	jQuery('#resultLoading>div:first').css({
		'width' : '250px',
		'height' : '75px',
		'text-align' : 'center',
		'position' : 'fixed',
		'top' : '0',
		'left' : '0',
		'right' : '0',
		'bottom' : '0',
		'margin' : 'auto',
		'font-size' : '16px',
		'z-index' : '10',
		'color' : '#ffffff'

	});

	jQuery('#resultLoading .bg').height('100%');
	jQuery('#resultLoading').fadeIn(300);
	jQuery('body').css('cursor', 'wait');
}

function ajaxindicatorstop() {
	jQuery('#resultLoading .bg').height('100%');
	jQuery('#resultLoading').fadeOut(500);
	jQuery('body').css('cursor', 'default');
}

function movetoNext(current, nextFieldID) {
	if (current.value.length >= current.maxLength) {
		document.getElementById(nextFieldID).focus();
	}
}

function isFromOverlay(loginForm) {
	return ($(loginForm).closest("#modallogin").length > 0);
}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

	return true;
}

function initializeSelectMenu(selector) {
	$(selector).selectmenu({
		change : function(event, ui) {
			$(this).val(ui.item.value);
			$(this).trigger("change");
//			$(".sendercountrycode").trigger("change");
            if($(this).hasClass("socialcountrycode")){
                $( ".socialcountrycode" ).selectmenu( "refresh" );
            }   
		},
		focus : function(event, ui) {
			$(this).attr("tabindex", "-1");
		},
		create : function(event, ui) {
			$(this).attr("tabindex", "-1");
		} 
		
	});
}

/***************************************************************************************************************************************************************
 * $(window).scroll(function(){ var sticky = $('#maintoolbar'),scroll = $(window).scrollTop();
 *
 * if (scroll >= 100) sticky.addClass('squeeze'); else sticky.removeClass('squeeze'); });
 */
$(function() {
	$(".checkbox input:checkbox").click(function() {
		$(this).toggleClass("test");
	});
});
//Donation ajax call for adding and removing
$(function() {
	$(".donationcheckbox input:checkbox").click(function() {
		$(this).toggleClass("test");
		var add = $("#donationcheckbox").prop('checked') == true;
		var ammount = $("#donationammount").text();
		var url = "/control/{uri}?amount="+ammount;
		if(add){
			url = url.replace("{uri}", "addDonationAdjustmentToCart");
        }else{
			url = url.replace("{uri}", "removeDonationAdjustMent");
        }
		$.ajax({
	        type : 'GET',
	        dataType : 'json',
	        async: false,
	        global: false,
	        url:url,
	        success : function(data) {
	        	if(data != null && data.isSuccess){
	        		$("#grandTotal").text(data.total);
	        	}
	             
	        }
	    });
		
		
	});
});

function isUserLoggedIn(callback) {
	var isUserLoggedin = false;
	if(userDetails == null){
		//add to array of callbacks
		if(callback != undefined)
			arrayOfFunctionsForFNPCheckLogin.push(callback);
		//if ajax call already initiated then just add to array, otherwsie - initiate it now
		//make ajax call in success call array of functions
		if(!isFNPCheckLoginRunning){
			//isFNPCheckLoginRunning = true;
			fnpCheckLoginCall();
			//Setting attribute for NewRelic tracking
			//setNewRelicAttribute(newRelicXHR);
		}
	} else{
		//do the callback directly
		if(callback != undefined)
			callback(userDetails);
		return userDetails && userDetails.checklogin && userDetails.checklogin.loggedin;
	}
	return false;
}
//don't call this function directly use this "isUserLoggedIn" always debugger AngJs its Okey
function fnpCheckLoginCall(){
	if(getCookie("fnpli") != "t" && getCookie("fnpci") != "t"){
		userDetails = {"checklogin":{"loggedin":false,"isOAuthUser":false},"cart":{"cartTotalQuantity":0,"isSuccess":false}};
		$('#sign-out').hide();
        $('#change-password').hide();
		return Promise.resolve(userDetails);//hard
	}
	var checkLoginUrl = "https://" + secureHostNameToUse + '/control/fus';
	if((localStorage.getItem("userAuthentication") != undefined) && (localStorage.getItem("userAuthentication") === "true")){
		checkLoginUrl = "https://" + secureHostNameToUse + '/control/fus?time='+new Date().getTime();
	}
	if(userDetails === null && !isFNPCheckLoginRunning){
		isFNPCheckLoginRunning = true;
		return $.ajax({
					url : checkLoginUrl,
					type : 'GET',
					dataType : "json",
					global:false,
					xhrFields: {withCredentials: true},
					success : function(respData) {
						if(!respData.checklogin.loggedin && getCookie("fnpli")=="t"){
							delete_cookie("fnpli");
						}
						userDetails = respData;
						isFNPCheckLoginRunning = false;
						updateCartItem(userDetails);
					},
					complete: function (data) {
						//for loop , loopVariable
						//use call/apply on that lop variable, and pass json data as argument
						for(var i = 0; i< arrayOfFunctionsForFNPCheckLogin.length; i++){
							if (userDetails.checklogin && userDetails.checklogin.loggedin){
								arrayOfFunctionsForFNPCheckLogin[i].call(userDetails);
							}else{
								arrayOfFunctionsForFNPCheckLogin[i].call(userDetails);
							}
						}
						arrayOfFunctionsForFNPCheckLogin = [];
						localStorage.setItem('userAuthentication','false');
					}
				});
	}else{
		updateCartItem(userDetails);
		return userDetails;
	}
	return false;	
}

function getAkamaiEdgeScapeHeader(xhr,headerType){
	if(xhr==null || xhr === "undefined"){
		return null;
	}
	return xhr.getResponseHeader(headerType);
}

function setNewRelicAttribute(xhr){	
	try{
		var userLoginCookie=getCookie("faul"); //Getting unique user login cookie
		var edgeHeaders = getAkamaiEdgeScapeHeader(xhr, 'Akamai-Edgescape-Headers');
		if(typeof newrelic !="undefined"){
			$.each(edgeHeaders.split(";"), function(key, value) {
				var values=value.split('=');
				newrelic.interaction().setAttribute(values[0],values[1]);
			});
			newrelic.interaction().setAttribute("edgeHeaders",edgeHeaders);
			newrelic.interaction().setAttribute("userUniqueId", userLoginCookie);
			newrelic.interaction().setAttribute("pageType", fnpPageType);
			newrelic.interaction().setAttribute("version", assetsVersion);
		}
	}catch(e){
		console.log("NewRelic Set attribute error :" + e);
	}
}


function reloadForAddons(isbuynow){
    var loc = window.location.href;
    if(isbuynow == 'N'){
		/*loc = loc.replace("?ia=y","").replace("&ia=y","");
		if (loc.indexOf("?") === -1){
		    loc = loc + "?ia=y";
		}else{
		    loc = loc + "&ia=y";
		}*/
		loc = 'https://'+ secureHostNameToUse ;
    }else{
        
        if (isUserLoggedIn()) {
				loc = 'https://'+ secureHostNameToUse +'/control/delivery-address';
			} else {
				loc = 'https://'+ secureHostNameToUse +'/control/checkout-login';
			}
    }
    window.location = loc;
}

$(document).ready(function(e) {
	//this is for hover effect
	onHoverImageInit();
	//push the data to beatout
	//beatoutServices();
	
	//donation terms and condition showing based on click
	$(document).on('click','#donetionalert', function(){
		$("#donetionalert").show();
	});
	$("body").click(function(e){
		if($(e.target).is('.donationinfo')){
			  $("#donetionalert").toggle();
		  }
		else{
			$("#donetionalert").hide();
		}
	});
		
		$('#giftfindericon').click(function () {
			$('.gfcityerror').hide();
			prePopulateCityDOD();
			$('#giftfinder').foundation('reveal', 'open');			
		});
		$(document).on('closed.fndtn.reveal', '#giftfinder[data-reveal]', function () {
			if($.cookie('gotItFlag')){
			    gotItFlag=$.cookie('gotItFlag');
			}  
		    if(gotItFlag!=="true"){
			    	if (!$('.reveal-modal-bg').hasClass('bg-giftfinder')) {
						$('body').append('<div class="bg-giftfinder" style="display : block;"></div><div class="got-it"><span>You can select / change the city here.</span><span class="got-it-action">GOT IT</span></div>');
						$('.got-it').css('display', 'block');
					}
					else {
						$('.bg-giftfinder,.got-it').css('display', 'block');
					}
			    $.cookie('gotItFlag', "false",{path : '/',domain:currentdomain});
		    }
		});
		$(document).on('click', '.got-it-action', function () {
			$('.bg-giftfinder,.got-it').css('display', 'none');
			$.cookie('gotItFlag', "false",{path : '/',domain:currentdomain});
		});


	$(document).on('click','.bg-giftfinder',function () {
		$('.bg-giftfinder,.got-it').css('display', 'none');
			$.cookie('gotItFlag', "false",{path : '/',domain:currentdomain});
	});
	$('.myorder-slideable').slick({
		prevArrow : '<div id = "prevArrow" class = "slick-prev"></div>',
		nextArrow : '<div id = "nextArrow" class = "slick-next"></div>',
		infinite : false,
		slidesToShow : 1,
		slidesToScroll : 1
	});
	if ($(".personalized").attr("data-isProductPersonalizable")){
		productPersonalizedMap = JSON.parse($(".personalized").attr("data-productPersonalizedMap"));
		changePersonalizedOptions();
	}
	/*Crad Message JS*/
	$("#cardmessage").on('opened.fndtn.reveal', function () {
		setTimeout(function(){
			// toggle the class every five second
			$('#f1_container').addClass('card-open');
		},500);
		setTimeout(function(){
			// toggle the class every five second
			$('#cardmessage .form').addClass('show');
		},1000);
	});
    $(document).on('click','#cardmessage .close-reveal-modal',function () {
        $('#f1_container').removeClass('card-open');
        $('#cardmessage .form').removeClass('show');
    });
	/* ./Card message  */
	$(document).on("click",".recipientmessage .occasionText",function(){
		$("#occasioncontainer").toggle();
		var postionEle = $(this).offset();
		$("#occasioncontainer").css({top: (postionEle.top+$(this).outerHeight())+'px', left: postionEle.left+'px',width:$(this).parent().width()});
		var cartItemIndex = $(this).attr("cartItemIndex");
		$("#occasioncontainer").attr("name", "occasionText_"+ cartItemIndex);
		$(".dropdownhidden").attr("data-occasionindex", cartItemIndex);
		$(this).toggleClass("active-select");
		$("a[class='selected']").removeClass("selected");
		var occasionId = $("input[name='occasion_"+cartItemIndex+"']").val();
		$("#occasioncontainer ul.dropdownhidden li a#"+occasionId).addClass("selected")
		onWindowResize();
		outSideSelectBoxClick(this);
		return false;
	});
	$(document).on("click","#occasioncontainer ul.dropdownhidden li a",function(){
		var occIndex = $(this).parents(".dropdownhidden").attr("data-occasionindex");
		$("a[name='occasionText_"+ occIndex + "']").html($(this).text());
		$("input[name='occasion_"+ occIndex + "']").val($(this).attr("id"));
		$("#occasioncontainer").hide();
		$("a[name='occasionText_"+ occIndex + "']").removeClass("active-select");
		$("a[class='selected']").removeClass("selected");
		$(this).addClass("selected");
		return false;
	});
	
	$(document).on("click","#productfrm .selectflavour",function(){
		$(this).parent().find(".dropcontainer").toggle(); // for showing and hiding the div
		$(this).toggleClass("active-select");
		outSideSelectBoxClick(this);
		return false;
	});
	$(document).on("click","#productfrm .dropcontainer .dropdownhidden li a",function(){
		$(this).closest("div.dropdowncontent").find(".selectflavourText").html($(this).text());
		$(this).closest("div.dropdowncontent").find(".selectflavourVal").val($(this).attr("id"));
		$(this).closest("div.dropdowncontent").find(".selectedProdFeature").val($(this).attr("data-variantkey"));
		$(this).closest("div.dropdowncontent").find(".dropcontainer").hide();
		$(this).closest("div.dropdowncontent").find(".selectflavourText").removeClass("active-select");
		$("#productfrm .dropcontainer .dropdownhidden li a").each(function(){
			$(this).removeClass("selected");
		});
		$(this).addClass("selected");
		$(".selectflavourText").removeClass("mandatory");
		$("#flavourError").hide();
		return false;
	});
	
    $(document).on('click', '#cartToolTip .close', function(){
       $('#cartToolTip').hide(); 
        console.log("Checked");
    });
    
    if(fnpPageType == "product"){
       	$(".price-info").hover(function (e) {
          e.stopPropagation();
         $(".price-increase-info-icon .info-tool-tip").toggle();
    });
        setTimeout(function() {
            if(window.location.href != null){
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                   var pair = vars[i].split("=");
                   if(pair[0] == 'ia')
                   {
                       $("#cartToolTip").fadeIn("slow").delay(5000).fadeOut("slow");
                   }
                }
        }
    },5000);
    }
    $('#login').hover(
       function(){ 
           $(this).find('#loggedinuser').addClass('profilename');
       },
       function(){ 
           $(this).find('#loggedinuser').removeClass('profilename');
       } 
    );
    removeReadonlyFieldsFromTabbing();
    $(document).on('keyup','.autogrow', function(){
		autoResizeAddr(this);
    });
    $(".quickshopcity").blur(function(){
    	var tempCityVal=$(this).val().split(" ").join("-");
        var enteredCity = $(this).val();
        if(quickshopcity!=null){
            for(var item in quickshopcity){
                var label = quickshopcity[item];
                if(label.toLowerCase() == enteredCity){
                    $(this).parents(".quickfrm").find("button.quickshopbtn").prop("disabled", false);
                    $(this).val(tempCityVal);
                }
            }
        }
    });
   	$(document).on("mouseover",".customizedAutoComplete li.ui-menu-item", function(){
		$(this).children(".loc-icon").css("background-position", "49px -161px");
    });
   $(document).on("mouseleave",".customizedAutoComplete li.ui-menu-item", function(){
		$(this).children(".loc-icon").css("background-position", "-1px -161px");
   });
    $(".quickshopoccasion").blur(function(){
        var enteredOccasion = $(this).val();
        if(quickshopoccasion!= null){
            for(var item in quickshopoccasion){
                //console.log(quickshopoccasion[item].label);
                var label = quickshopoccasion[item].label;
                if(label.toLowerCase() == enteredOccasion){
                    $(this).parents(".quickfrm").find("button.quickshopbtn").prop("disabled", false);
                }
            }
        }
    });
    $(document).on("click", ".product-reveal-close", function(){
         setTimeout(function() {
            $('#modaldatetimepicker .slick-prev').click();
         },200);
    });
    $(document).on("focusout", ".cardMsg", function(e){
    	if(e.keyCode === 9){//only on tab key it should apply
        	var nextItemIndex = $(this).attr("nextItemIndex");
        	var nextItemDivClass = "divitem"+nextItemIndex;
        	if($("."+nextItemDivClass).length){
        		$('html, body').animate({
        			scrollTop : $("."+nextItemDivClass).offset().top - 90
        		}, 500);
        	}
    	}
	});
    
    /*To disbale Double Click to IOS*/
   $('a').on('touchend', function(e) {
      var el = $(this);
      var link = el.attr('href');
      window.location = link;
   });

	/*$('.touchtarget').click(function() {
		$(this).addClass('selected');
	});*/
	/*$('#infotools li button').click(function() {
		$('#infotools li button').removeClass('selected');
		$(this).addClass('selected');
	});*/
	$('#maintoolbar #navigationtools li button, #maintoolbar #infotools li button').click(function() {
		$('#navigationtools li button, #infotools li button').removeClass('selected');
        $(this).addClass('selected');
	});
	var h1TextLength = $('#mainbanner h1').text().length;
	if (h1TextLength >= 30) {
		$("#mainbanner h1").addClass("small-font");
	} else if (h1TextLength <= 20) {
		$("#mainbanner h1").addClass("big-font");
	}
//	$('input:read-only').attr('tabindex','-1');
	$('#backbutton').click(function(){
		disableSubmitBtn($('.buttonrow #underconst'));
		disableAndAddLoadingGift(this);
		window.location.href = '/control/delivery-address';
	});
    $(document).on('click','.nothanks', function(){
        disableSubmitBtn($('#addon .addonsbmt'));
    });
   
    if($("#totalproductcount").length){
    	$("#totalproductcount").prependTo(".leftnav>label").show(); 
    }
    if($(".countrycode").length){
    	initializeSelectMenu(".countrycode");
	    $(".ui-selectmenu-menu").addClass("selectcode");        
    	$(".countryCode-button").attr("tabindex","-1");
   }
   if($(".socialcountrycode").length){
    	initializeSelectMenu(".socialcountrycode");
   }
   if($(".sendercountrycode").length){
    	initializeSelectMenu(".sendercountrycode");
    	$(".ui-selectmenu-menu").addClass("selectcode");
    }
});

function showCart(){
    if($("#cart").length){
        $("#cart").click();    
    }
}

function proceedToCheckOut(){
    if (isUserLoggedIn()) {
        window.location = "https://" + secureHostNameToUse + '/control/delivery-address';// As per requirement changed this to checkout options.
    } else {
        window.location = "https://" + secureHostNameToUse + '/control/checkout-login';// As per requirement changed this to checkout options.
    }
}

function convertTimestampStringToDate(timestampstr){
	var date = null;
	if(timestampstr!=null && timestampstr!=undefined){
		var dateParts = timestampstr.split(' ');
		var timeParts = dateParts[1].split(':');
		var dateParts = dateParts[0].split('-');
		date = new Date(dateParts[2], parseInt(dateParts[1])- 1, dateParts[0], timeParts[0], timeParts[1]);
	}
	return date;
}

$(document).ready(function(){
    $(document).on("click",".timeslotdetails", function(){
      $('#shippingmethoddiv li .timeslotdetails label, #shippingmethoddiv li .timeslotdetails .input-group-button').removeClass("selectedshipping");   
      $(this).parent('li').find('.timeslotdetails label, .timeslotdetails .input-group-button').addClass("selectedshipping");
      $(this).find('.input-group-button').siblings('.input-group-field').prop("checked",true);
      selectedshippingmethodprice = $(this).find('.input-group-button .delcost').html();
      var shippingselected = $(this).attr('data-shippingmethod');
      $('#modaldatetimepicker .slick-next').click();
      setTimeout(function() {
          timeSlotDetails(shippingselected);
        },50);
     
//       $('#timeslotModal').find('.cat-fltr-left a').text("Select Time Slot");
    });
	var operationVal = $("#operationSuccess").val();
	if(operationVal=='YES'){
		$("#reminderMsg").html("New reminder has been created. Thank you");
		$("#reminderMsg").show().fadeOut(6000);
	}
	/*if($("#FNP_CURRENT_CATALOG_ID").val() && $("#FNP_CURRENT_CATALOG_ID").val().toUpperCase() === 'india'.toUpperCase()){
		setTimeout(function(){
    	getGfFinderdata();
	    if(!isCityPage&&!hasQueryCity&&!isDeliveryDate&&fnpPageType === "category"&&deliveryDateLock===""&&deliveryCityLock===""){
	 	  $('#giftfinder').foundation('reveal','open');
	    }	    
	    prePopulateCityDOD();
	    if($.cookie('gotItFlag')){
		    gotItFlag=$.cookie('gotItFlag')
		}  
	    if(gotItFlag==="true"){
		    if((fnpPageType==="category"||fnpPageType==="search")&&(deliveryDateLock!==""||deliveryCityLock!=="")){
		    	if (!$('.reveal-modal-bg').hasClass('bg-giftfinder')) {
					$('body').append('<div class="bg-giftfinder" style="display : block;"></div><div class="got-it"><span>You can select / change the city here.</span><span class="got-it-action">GOT IT</span></div>');
					$('.got-it').css('display', 'block');
				}
				else {
					$('.bg-giftfinder,.got-it').css('display', 'block');
				}
		    }
		    $.cookie('gotItFlag', "false",{path : '/',domain:currentdomain});
	    }
	    }, 100);
	}*/
    	
});
//Method used for all payment forms submit.
function doPaymentFormSubmit(){
	try{
		//setting timeout for firefox ver 45 form submit fix.
		setTimeout(function(){document.forms[0].submit()},100);
	}catch(e){
		console.log(e);
	}
}
function saveFnpSalesChannelEnumId(){
	var fnpSalesChannelEnumId = $.urlParam("fnpSalesChannelEnumId");
	var tabCookie = getCookie("dt");
	var source = getCookie("source");
	if(tabCookie != ""){
		if(typeof fnpSalesChannelEnumId == 'undefined' &&  source == ""){
			fnpSalesChannelEnumId = $("#fnpSalesChannelEnumId").val();
		}
		if(typeof fnpSalesChannelEnumId != 'undefined'){
			fnpSalesChannelEnumId = fnpSalesChannelEnumId.replace("DSKTP","TAB");
		}
	}
	if(typeof fnpSalesChannelEnumId != 'undefined'){
		document.cookie = "fnpSalesChannelEnumId=" + fnpSalesChannelEnumId;
	}
	//for sending productCategoryId to GoogleAnalytics
	var referrer = document.referrer;
	var referrerUrl = document.createElement('a');
	referrerUrl.href = referrer;
	var referrerHost = referrerUrl.hostname;
	var currentHost = location.host;
	if(referrerHost == currentHost){
		var productCategoryId = referrerUrl.pathname;
		if(productCategoryId == undefined || productCategoryId == null){
			productCategoryId = '/gifts';
		}else if(productCategoryId == '/'){
			productCategoryId = '/Home page';
		}
	}else{
		productCategoryId = '/Gift';
	}
	productCategoryId = productCategoryId.replace('/', ''); 
	$("#productCategoryId").val(productCategoryId);
	
}

function updateOrderSource(){
	var fnpSalesChannelEnumId = getCookie("fnpSalesChannelEnumId"); 
	if((typeof fnpSalesChannelEnumId != "undefined") && fnpSalesChannelEnumId.indexOf("&")!=-1){
		//looks like fnpSalesChannelEnumId was found as url param in source cookie 
		fnpSalesChannelEnumId = $.urlParam("fnpSalesChannelEnumId", getCookie("source"));
	}
	if(fnpSalesChannelEnumId == ""){
		var source = getCookie("source");
		var utmSource = null;
		var utmCampaign = null;
		if(source){
			var utmSource = $.urlParam("utm_source", source);
			var utmCampaign = $.urlParam("utm_campaign", source);
		}
		else {
			var utmSource = getCookie("utm_source");
			var utmCampaign = getCookie("utm_campaign");
		}
		if(utmSource == "affiliate"){
			//this is affiliate guy
			fnpSalesChannelEnumId = "ONLN_DSKTP_AFLT_NT";
			var tabCookie = getCookie("dt");
			if(tabCookie != ""){
				fnpSalesChannelEnumId = "ONLN_TAB_AFLT_NT";
			}
		}
		if(utmCampaign != null && utmCampaign != ""){
			//create the tracking id param as required by TrackingEvents
			if($("#ptc").length == 0){
				$('#productfrm').append('<input type="hidden" id="ptc" name="ptc" value="' + utmCampaign +'" />');
			}
			else {
				if(!$("#ptc").val().startsWith("WB_")){	
					$("#ptc").val(utmCampaign);
				}
			}
		}
	}
	if(fnpSalesChannelEnumId != "" && typeof fnpSalesChannelEnumId != "undefined"){
		document.productfrm.fnpSalesChannelEnumId.value = fnpSalesChannelEnumId;
	}
}
function numberWithCommas(x) {
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}

/*$(document).ready(function(){
	var $listItems = $('#deliverycity li');
	$('.menudropdown .citysearch').keydown(function(e){
		var key = e.keyCode;
		$selected = $listItems.filter('.selected');
		if(key == 13){
			var link = $($($selected[0])[0]).children();
			$(link[0]).get(0).click();
			return;
		}
        $current = null;
        $listItems.removeClass('selected');
		console.log("Code : "+key);
		if(key == 40){
			if ( ! $selected.length || $selected.is(':last-child') ) {
	            $current = $listItems.eq(0);
	        }
	        else {
	            $current = $selected.next().next();
	        }
		}else if(key == 38){
			if ( ! $selected.length || $selected.is(':first-child') ) {
	            $current = $listItems.last();
	        }
	        else {
	            $current = $selected.prev().prev();
	        }
		}else if(key == 37){
			if ( ! $selected.length || $selected.is(':first-child') ) {
	            $current = $listItems.last();
	        }
	        else {
	            $current = $selected.prev();
	        }
		}else if(key == 39){
			if ( ! $selected.length || $selected.is(':last-child') ) {
	            $current = $listItems.eq(0);
	        }
	        else {
	            $current = $selected.next();
	        }
		}else{
			return;
		}
		$current.addClass('selected');
	});
});
*/

/*function isSelectedFromSuggestionList(){
	var isThisACourierProduct = isCourierProduct();
	if ((pincode == null && $("#localitylookup").val().length > 1) || (isThisACourierProduct && selectedCourierPinCode != $("#localitylookup").val())) {
		// not valid pincode selected. show the message
		var pincodeMessage = isThisACourierProduct ? "Please choose a valid pincode from the list" : "Please select from the dropdown list.";
		$("#pincodemsg").html(pincodeMessage);
		$("#pincodemsg").show();
		var city = $("#contextcity>span").text();
		if (city.length == 0) {
			disableDateTimeSelector();
		}
	}
}*/

//configproducts scripts

function timerCountDown(msRemaining) {
    if (msRemaining > 0) {
        var secondsRemaining = Math.floor(msRemaining / 1000);
        var hours = Math.floor(secondsRemaining / 3600);
        var minutes = Math.floor((secondsRemaining - (hours * 3600)) / 60);
        var seconds = secondsRemaining - hours * 3600 - minutes * 60;
        var displayText = hours + ":" + (minutes < 10 ? "0" : "") + minutes;
                //+ ":" + (seconds < 10 ? "0" : "") + seconds;
        $(".timeleft").text(displayText);
        setTimeout(function() {
            timerCountDown(msRemaining - (1000*60))
        }, (1000*60));
    } // else..automatically recursion stops
}

/* view/brought count method of the product */
function updateProductViewBoughtCountInfo(){
    var productId=$("#productId").val();
    $.ajax({
        type : 'GET',
        dataType : 'json',
        async: true,
        global: false,
        url: DCR_HOST + '/ic/j?p=' + productId,
        success : function(data) {
            $.each(data, function(productId, count) {
                       var viewedElement = $('.viewed');
                       var boughtElement = $('.bought');
                       var seen = numberWithCommas(count[0]);
                       viewedElement.text(seen);
				       //also set the title
				       viewedElement.attr("title", "Seen " + seen + " times in last 7 days");
                       var bought = numberWithCommas(count[1]);
                       boughtElement.text(bought);
				       //also set the title
				       boughtElement.attr("title", "Bought " + bought + " times in last 7 days");
             });
        }
    });
}

window.variantAlreadyClickedOnce = false;
function switchProduct(productId, productName , productDescId, variantImageUrl, prodPrice, variantKey, variantEle){
	document.title=productName;
	var isSubvariantAlreadyBuilt = false;
	var derivedProductId = null;
	if(typeof features!="undefined" && features!=null){
		var featurekys = features.split(",");
		if(featurekys.length >2){
			buildSubVariantDOM(productId, variantKey);
			isSubvariantAlreadyBuilt = true;
			if($(".selectedProdFeature").val() != "" ){
				var featureslist = $(".selectedProdFeature").val();
				derivedProductId = getProductIdByVariantKey(featureslist);
			}else{
				var subvariantkeylist = getProductKeyByProductId(productId);
				var list = subvariantkeylist.split(",");
				var secondLevel =$("input:radio[name='feature']").length?$('input[name=feature]:checked').val():"";
        		if(secondLevel !=""){
        			list[1] = secondLevel;
        			derivedProductId = getProductIdByVariantKey(list);
			}
			}
		}else if(featurekys.length==2){
			var selectedSubVarFeature = null;
			var selectedSubVariant = $('input[name="feature"]:checked').val();
			if(selectedSubVariant){
			selectedSubVarFeature = variantKey +","+selectedSubVariant;
			}
			derivedProductId = getProductIdByVariantKey(selectedSubVarFeature);	
		}
		if(derivedProductId != null){
			productId = derivedProductId;
	}
	}
	if(!isSubvariantAlreadyBuilt){
		buildSubVariantDOM(productId, variantKey);
	}
	checkProductExpiry(productId);
    $('input[name="add_product_id"]').val(productId).trigger('change');
    
    updateProductDetails(productId, false);
    var productDetails = getProductDetails(productId);
    variantImageUrl = productDetails.imageUrl;
    variantImageUrl = variantImageUrl.replace("/s/","/l/");
	var productImageCount = getProductLargeImageCount(productId);
    
    var variantXLargeImageUrl = variantImageUrl.replace(/\/l\//,"/x/");
    var productXLargeCount = getProductExtraLargeImageCount(productId);
    var isZoomAvailable = productXLargeCount >0;
    var zoomClass = isZoomAvailable ? "image-zoom" : '';
    var dataZoomAttr = isZoomAvailable ? "data-zoom-image=" + (cdnHost + variantXLargeImageUrl) : "";
    var productImgStr= '<div class="slideable">';
    productImgStr = productImgStr + '<img id="detailImage1" class="productimg mainimg '+(isZoomAvailable ? "image-zoom" : '')+'" src="' + cdnHost + variantImageUrl + '" '+(isZoomAvailable ? "data-zoom-image=" + (cdnHost + variantXLargeImageUrl) : "")+' name="mainImage" vspace="5" hspace="5" class="cssImgXLarge" alt="'+ productDetails.productName +'" />';

    var productImageCount = getProductLargeImageCount(productId);
    for(var i=2;i<=parseInt(productImageCount);i++){
    	isZoomAvailable = productXLargeCount >= i;
        dataZoomAttr = isZoomAvailable ? "data-zoom-image=" + (cdnHost + variantXLargeImageUrl) : "";
        productImgStr = productImgStr + '<img id="detailImage'+ i + '" class="productimg mainimg '+(isZoomAvailable ? "image-zoom" : '')+'" src="' + cdnHost + variantImageUrl.split("_")[0] + '_' + i + '.jpg" '+(isZoomAvailable ? "data-zoom-image=" + (cdnHost + variantXLargeImageUrl.split("_")[0] + '_' + i + '.jpg') : "")+' name="mainImage" vspace="5" hspace="5" class="cssImgXLarge" alt="' +productDetails.productName  +'" />';
    }
    productImgStr = productImgStr + '</div>';
    $("#product .slideable").remove();//removes earlier slick bindings if any.
    //$("#product").html(productImgStr);
    if (variantAlreadyClickedOnce){
        $("#product").fadeOut(500, function(){$("#product").html(productImgStr).fadeIn(750);});
        $(variantEle).effect( "transfer", {to: $("#product")}, 750);
    }else {
        variantAlreadyClickedOnce = true;
        $("#product").html(productImgStr);
    }
    //initializeProductContentTab();
    setTimeout(function(){initializeProductImgSlider();initializeZoom();},600);
}

function checkCityForVariant(){
    var productId =$("#addProductId").val();
    var pincode=$("#destlookup").val();
    var deliveryDate = $("#productDeliveryDate").val();
    var shippingMethodId = $("#shippingMethodId").val();
    var timeSlotId = $("#timeSlotId").val();
    var shippingCost = $("#shippingCost").val();
    var countryGeoId = $("#countryGeoId").val();
    var dateSplit = deliveryDate.split("/");
    var selectedDate = dateSplit[0]+"-"+dateSplit[1]+"-"+dateSplit[2];
	var URL = '/control/getDeliveryDatesAndShippingDetailsForVariant?productId=' + productId +"&deliveryDate=" + deliveryDate +"&shippingMethodId=" + shippingMethodId +"&timeSlotId=" + timeSlotId + "&countryGeoId=" + countryGeoId;
	if (pincode != null && pincode != "") {
		URL = URL + '&pinCode=' + pincode;
	}
	$.ajax({
		type : 'GET',
		dataType : 'json',
		async : false,
		url : URL,
		success : function(deliveryDatesAndShippingList) {
				if (deliveryDatesAndShippingList != null && deliveryDatesAndShippingList.isDatesAvailable && deliveryDatesAndShippingList.deliveryDates != null) {
					deliveryDates = deliveryDatesAndShippingList.deliveryDates;
					if(deliveryDates.includes(selectedDate)){
						var validTimeSlot = false;
						var validShippingMethod = false;
						shipmentDetails =deliveryDatesAndShippingList.shippingDetails;
						// TODO : Better use jquery template or angular js for constructing the shipping details dom.
						if (shipmentDetails !=null && deliveryDatesAndShippingList.isShippingDetailsExists == true) {
							var shippingInfo = deliveryDatesAndShippingList.shippingDetails;
							for ( var key in shippingInfo) {
								if(validTimeSlot || validShippingMethod){
									break;
								}
								if(shippingMethodId == key){
									validShippingMethod = true;
									for (var i=0; i< shippingInfo[key].timeSlots.length; i++){
										if(shippingInfo[key].timeSlots[i].timeSlotId == timeSlotId){
											validTimeSlot = true;
											break;
										}
									}
								}
							}if(!validShippingMethod || !validTimeSlot){
								removeShippingDetailse();
								enableDateTimeSelector();
								$("#datetimelink").focus();
							}
								
						}else{
							removeShippingDetailse();
							enableDateTimeSelector();
							$("#datetimelink").focus();
						}
					}else{
						showDeliverableMessage(pincode);
						removeShippingDetailse();
						enableDateTimeSelector();
						$("#datetimelink").focus();
					}
			}
			else {
				deliveryDates = null;
				showNotDeliverableMessage();
				removeShippingDetailse();
				disableDateTimeSelector();
			}
		},
		error : function(xhtr, status, error) {
			deliveryDates = null;
		}
	});
}

function showDeliverableMessage(pincode){
	$("#pincodemsg").removeClass("infomsgbox").html("").hide();
	this.pincode=pincode;
	$("#pincodeAlert").hide();
}


function removeShippingDetailse(){
	$("#deliveryDate").val("");
	$("#productDeliveryDate").val("");
	$("#shippingMethodId").val("");
	$("#timeSlotId").val("");
	$("#shippingCost").val("");
	$("#deliverydateofmonth").text("");
	$("#deliverymonth").text("");
	$("#deliveryweekday").text("");
	$("#shippingmethod").text("");
	$("#shippingcost").text("");
    $("#timeslot").text("");
}

function updateProductDetails(productId, updateImages){
	var videoSrc = getVideoUrl(productId);
	$("#videomodal").data("videourl", videoSrc);
	if(videoSrc != null && videoSrc != '' ){
		if ($('.videoicon').length <= 0) {
			$( "#videowrapper" ).prepend( "<a class='videoicon'>Play Video</a>" );
		}
	}else{
		$(".videoicon").remove();
	}
	var priceDetails = getVariantPrice(productId);
    //$(".price").html(priceDetails.price);
    var newdate = $("#deliveryDate").val();
    $("#price").val(priceDetails.price);
    if(newdate != undefined && newdate != null && newdate != ''){
	    var deliveryDate = newdate.split("/").join("-");
	    if (deliveryDate != undefined && deliveryDate != null && deliveryDate != '') {
	    	getProductPriceByDeliveryInfo($("#addProductId").val(),deliveryDate,pincode);
	    }
    }
    updateProductPriceDOM(priceDetails);
    updateINRprice(priceDetails.price);
    initCurrencies();
    var productDetails = getProductDetails(productId);
    document.title = productDetails.productName;
    if(productDetails!=null){
    	$(".item-heading").html(productDetails.productName);
    	$(".item-heading").attr("title", productDetails.productName);
    	if(updateImages){
        	var variantImageUrl = productDetails.imageUrl;
        	variantImageUrl = variantImageUrl.replace("/s/","/l/");
        	var variantExtraLargeImageUrl = variantImageUrl.replace(/\/l\//,"/x/");
        	var productExtraImageCount = getProductExtraLargeImageCount(productId);
        	var isZoomAvailable = productExtraImageCount > 0;
            var zoomClass = isZoomAvailable ? "image-zoom" : '';
            var dataZoomAttr = isZoomAvailable ? "data-zoom-image=" + (cdnHost + variantExtraLargeImageUrl) : "";
        	var productImgStr= '<div class="slideable">';
        	productImgStr = productImgStr + '<img id="detailImage1" class="productimg mainimg '+(isZoomAvailable ? "image-zoom" : '')+'" src="' + cdnHost + variantImageUrl + '" '+(isZoomAvailable ? "data-zoom-image=" + (cdnHost + variantExtraLargeImageUrl) : "")+' name="mainImage" vspace="5" hspace="5" class="cssImgXLarge" alt="'+productDetails.productName +'" />';

            var productImageCount = getProductLargeImageCount(productId);
            for(var i=2;i<=parseInt(productImageCount);i++){
            	isZoomAvailable = productXLargeCount >= i;
                dataZoomAttr = isZoomAvailable ? "data-zoom-image=" + (cdnHost + variantXLargeImageUrl) : "";
                productImgStr = productImgStr + '<img id="detailImage'+ i + '" class="productimg mainimg '+(isZoomAvailable ? "image-zoom" : '')+'" src="' + cdnHost + variantImageUrl.split("_")[0] + '_' + i + '.jpg" '+(isZoomAvailable ? "data-zoom-image=" + (cdnHost + variantExtraLargeImageUrl.split("_")[0] + '_' + i + '.jpg') : "")+' name="mainImage" vspace="5" hspace="5" class="cssImgXLarge" alt="' + productDetails.productName +'" />';
            }
            productImgStr = productImgStr + '</div>';
            $("#product .slideable").remove();//removes earlier slick bindings if any.
            //$("#product").html(productImgStr);
            $("#product").html(productImgStr);
            setTimeout(function(){initializeProductImgSlider();initializeZoom();},600);
        }
        if(productDetails.sku!=null){
            $(".skucode").html(productDetails.sku);
        }else{
            $(".skucode").html("");
        }
    }
    $("#tab-1").html("<p>"+ $("#"+productId+"_desc").html() +"</p>");
    if($("#destlookup").val() != "_NA_"){
    	checkCityForVariant();
    }
    
}

function updateProductPriceDOM(priceDetails){
	if(priceDetails!=null){
		var productPriceBlock = $("form[name='productfrm'] .price-block");
		if (parseFloat(priceDetails.price) >= parseFloat(priceDetails.listPrice) || priceDetails.listPrice == "") {
			$(productPriceBlock).find(".price").html('<span class="curr_aed">AED</span>' + priceDetails.price);
			if ($(productPriceBlock).find(".oldprice").length) {
				$(productPriceBlock).find(".oldprice").html("");
				$(productPriceBlock).find(".oldprice").hide();
			}
			if ($(productPriceBlock).find(".off").length) {
				$(productPriceBlock).find(".off").hide();
			}
		} else {
			if (priceDetails.listPrice != undefined && priceDetails.listPrice != "") {
				var discountedPrice = parseFloat(priceDetails.listPrice) - parseFloat(priceDetails.price);
				var discount = (parseFloat(discountedPrice) / parseFloat(priceDetails.listPrice)) * 100;
				
				//if no appropirate dom exists to show list price. constructing here.
				if($(productPriceBlock).find(".off").length == 0){
					$(".pricediv").append('<span class="off"></span>');
				}
				if($(productPriceBlock).find(".oldprice").length == 0){
					$(".pricediv").insertAfter().append('<span class="oldpriceInINR" style="display:none;">' + priceDetails.listPrice + '</span>');
					$(".pricediv").insertAfter().append('<span class="oldprice"></span>');
				}
				
				$(productPriceBlock).find(".off").html(' (' + Math.floor(discount) + '% OFF)');
				$(productPriceBlock).find(".off").show();
				if ($(productPriceBlock).find(".oldpriceInINR").length) {
					$(productPriceBlock).find(".oldpriceInINR").html(priceDetails.listPrice);
				}
				$(productPriceBlock).find(".oldprice").html('<span class="curr_aed">AED</span>' + priceDetails.listPrice);
				$(productPriceBlock).find(".oldprice").show();
			}
			$(productPriceBlock).find(".price").html('<span class="curr_aed">AED</span>' + priceDetails.price);
		}
	}
}

function buildFinalVariantDOM(variantKey){
	var finalvariant =  variantKey;
	var defaultVariantKeySet =  variantKey;
	var subVariantList = getSubVariantList(variantKey);
	var keyList = [];
	var productId = null;
    // Will not be null for multi-level variants
    if(subVariantList!=null){
        keyList = subVariantList.split(",");
        var variantStr ="";
        var selectedFlavour = $(".selectflavourVal").val();
        for(var i=0;i<keyList.length;i++){
            var prodVarKey = variantKey+","+keyList[i];
            if(selectedFlavour != "" && selectedFlavour !=  undefined){
            	if(selectedFlavour.trim() == keyList[i].trim()){
            		finalvariant = finalvariant+","+keyList[i]
            		variantStr = variantStr + '<li><a id="'+ keyList[i] +'" data-variantkey="' + prodVarKey + '"  href="javascript:void(0);" class="selected" >'+ keyList[i].toLowerCase() +'</a></li>';
            	}else{
            		variantStr = variantStr + '<li><a id="'+ keyList[i] +'" data-variantkey="' + prodVarKey + '"  href="javascript:void(0);" >'+ keyList[i].toLowerCase() +'</a></li>';
                }
            }else{
            	variantStr = variantStr + '<li><a id="'+ keyList[i] +'" data-variantkey="' + prodVarKey + '"  href="javascript:void(0);" >'+ keyList[i].toLowerCase() +'</a></li>';
            }
        }
        $("#subvariant3").html(variantStr);
    }
    if($("#subvariant3 .selected").length){
    	var selVal= $("#subvariant3 .selected").prop("id");
    	$(".selectflavourVal").val(selVal);
    	var dataVariant = $("#subvariant3 .selected").attr("data-variantkey");
    	$(".selectedProdFeature").val(dataVariant);
    	$(".selectflavourText").html($("#subvariant3 .selected").html());
    	$(".selectflavourText").removeClass("mandatory");
    }
    if($(".selectflavourVal").val() != "" && $(".selectflavourVal").val() != undefined){
        productId = getProductIdByVariantKey(finalvariant);
    }else{
    	var selectedProductId = $("#addProductId").val();
		var defaultvariantkeylist = getProductKeyByProductId(selectedProductId);
		if(defaultvariantkeylist!=null){
			var defaultkeys = defaultvariantkeylist.split(",");
			defaultVariantKeySet = defaultVariantKeySet + "," + defaultkeys[2];
		}else{
			defaultVariantKeySet = defaultVariantKeySet + keyList[0];
		}
		productId = getProductIdByVariantKey(defaultVariantKeySet);
    }
    if(productId!=null){
    	checkProductExpiry(productId);
    	$('input[name="add_product_id"]').val(productId);
    	updateProductDetails(productId, true);
    }
}

function buildSubVariantDOM(productId, variantKey){
	var subvariantkeylist = getProductKeyByProductId(productId);
	if(subvariantkeylist!=null){
		var prodkeys = subvariantkeylist.split(",");
		var subvariant = prodkeys[0];
		if(features!=null){
			var featurekys = features.split(",");
			//resetting earlier selected option.
			
			var flavourkey = $(".selectflavourVal")?$(".selectflavourVal").val():"";
			for(var j=1;j<featurekys.length;j++){
				var subVariantList  = getSubVariantList(subvariant);
			    // Will not be null for multi-level variants
			    if(subVariantList!=null){
			        var keyList = subVariantList.split(",");
			        var variant="";
			        var variantStr ="";
			        for(var i=0;i<keyList.length;i++){
			            var prodVarKey = subvariant+","+keyList[i];
			            var subFeature = prodkeys[j];
		            	if(j==1){
		            		var secondLevel =$("input:radio[name='feature']").length?$('input[name=feature]:checked').val():"";
		            		if(secondLevel !=""){
		            			subFeature = secondLevel;
				        	}
		            		if(subFeature == keyList[i]){
		            			variant = variant +'<label><input type="radio" name="feature" value="'+ keyList[i] +'" class="subvariant defaultsubvariant" data-variantkey="' + prodVarKey + '" checked="checked" />' + keyList[i].toLowerCase() + '</label>';
		            		}else{
		            			variant = variant +'<label><input type="radio" name="feature" value="'+ keyList[i] +'" class="subvariant" data-variantkey="' + prodVarKey + '" />' + keyList[i].toLowerCase() + '</label>';
					        }
		            	}else{
		            		if(flavourkey != ""){
		            			subFeature = flavourkey.trim();
				        	}
					        if(subFeature == keyList[i] && (isVariantProductId || flavourkey != "")){
					        	variantStr = variantStr + '<li><a id="'+ keyList[i] +'" data-variantkey="' + prodVarKey + '" href="javascript:void(0);" class="selected">'+ keyList[i].toLowerCase() +'  </a></li>';
					        }else{
					        	variantStr = variantStr + '<li><a  id="'+ keyList[i] +'" data-variantkey="' + prodVarKey + '"   href="javascript:void(0);"  >'+ keyList[i].toLowerCase() +' </a></li>';
					        }
		            	}
			        }
			        subvariant =subvariant+"," + subFeature;
			        if(j==1){
			        	$(".subvariantlist").html(variant);
			        }else{
				        $("#subvariant3").html(variantStr);
			        }
			    }
			}
			if($("#subvariant3 .selected").length!=0 || isVariantProductId){
				var selVal= $("#subvariant3 .selected").prop("id");
				var dataVariant = $("#subvariant3 .selected").attr("data-variantkey");
				$(".selectflavourVal").val(selVal);
				$(".selectedProdFeature").val(dataVariant);
				$(".selectflavourText").html($("#subvariant3 .selected").html());
				$(".selectflavourText").removeClass("mandatory");
			}
		}
	}
}

function updateINRprice(price){
    if($(".pricediv").length){
        var ele = $(".pricediv")[0];
        var pricecINR_ele = $(ele).parent().find(".priceInINR");
        if(pricecINR_ele.length){
           var div_INR = pricecINR_ele[0];
           $(div_INR).html(price);
        }
    }
}

function getProductType(){
	var productType = $("#productType").val();
	return productType;
}

function loadProductPageData(){
	var productType = getProductType();
	var productId=$("#productId").val();
    //preload variant large images
    $(".variantItem>figure>img").each(function(index){
    	var preloadVarImg = new Image();
    	preloadVarImgSrc = this.src.replace("/s/","/l/");
    	preloadVarImgSrc = preloadVarImgSrc.replace(/http:\/\/[^/]+/, cdnHost);
    	preloadVarImg.src = preloadVarImgSrc;
    });
    
    checkProductExpiry(productId);
    
    if(defaultVariantKey!=null && typeof features!="undefined" && features!=null){
    	var featurekys = features.split(",");
    	var variantKey = defaultVariantKey;
    	if(featurekys.length >1){
    		buildSubVariantDOM($("#addProductId").val(), variantKey);
    	}
    }
    $(document).on("change",".subvariant",function(){
        var variantKey = $(this).attr("data-variantkey")
        var featureskey = features;
        var keylist = featureskey.split(",");
        
        if(keylist.length > 2){ //3 level feature
        	buildFinalVariantDOM(variantKey);
        }else{
	        var productId = getProductIdByVariantKey(variantKey);
	        if(productId!=null){
	        	checkProductExpiry(productId);
	            $('input[name="add_product_id"]').val(productId);
	            updateProductDetails(productId, false);
	        }
        }
    });
    
    $(document).on("click","#subvariant3 a",function(){
        var variantKey = $(this).attr("data-variantkey")
        var productId = getProductIdByVariantKey(variantKey);
        if(productId!=null){
        	checkProductExpiry(productId);
        	$('input[name="add_product_id"]').val(productId);
        	updateProductDetails(productId, true);
        }
    });

    if(productType!= "INTERNATIONAL"){
    	
	    $.ajax({
	        url: '/control/getProductDeliveryTimeLeft',
	        type: 'GET',
	        data: 'productId='+productId,
	        global: false,
	        dataType:"json",
	        success: function(respData) {
	        	console.log(respData.isDeliveryTimeAvailable+"======================== time left============== "+respData.isDeliveryTimeAvailable);
	            if(respData!=null && respData.isDeliveryTimeAvailable!=null && respData.isDeliveryTimeAvailable == true){
	                var today = convertTimestampStringToDate(respData.currentTimestamp);
	                var nowTime = today.getTime();
					try{
	                    var cutoffDate = convertTimestampStringToDate(respData.cutoffTimestamp);
	                    var cutoffTime = cutoffDate.getTime();
	                    var deliveryDate = convertTimestampStringToDate(respData.deliveryDate);
	                    var day = deliveryDate.getDate();
	                    var month = parseInt(deliveryDate.getMonth())+1;
	                    var year = deliveryDate.getFullYear();
	
	                    var timeRemaining = cutoffTime - nowTime;
	                    timerCountDown(timeRemaining);
	
	                    var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
	
	                    if(day == today.getDate() && month == (parseInt(today.getMonth())+1) && year == today.getFullYear()){
	                        $(".deliveryDay").text("TODAY'S");
	                    }else if(day == (parseInt(tomorrow.getDate())) && month == (parseInt(tomorrow.getMonth())+1) && year == tomorrow.getFullYear()){
	                        $(".deliveryDay").text("TOMORROW'S");
	                    }else{
	                        $(".deliveryDay").text(day + ", " + monthNames[month-1]);
	                    }
	                }catch(e){
	                	console.log(e);
	                }
	            }
	        },
	        error: function(e) {
	        }
	    });
    }
    
  /*if(productType == "INTERNATIONAL"){
        // for international product populating the delivery dates as it has no dependency with pincode. so passing it blank.
        populateDeliveryDetails("(" + $("#countryGeoId").val() + ")"); 
    }*/
    
    updateProductViewBoughtCountInfo(); // single product count & view fetch

    // you may also like
    $.each(jQuery.deparam.querystring(), function( index, value ) {
	  	youMayAlsoQueryString.push(index+"="+value);
	});
    var queryStringObject = jQuery.deparam.querystring(youMayAlsoQueryString.join("&"),true);
    var finalQueryString = $.param.querystring("?",queryStringObject,0);
    $.ajax({
		type : 'GET',
		global : false,
		url : AJAX_JSON_URL_LIST.youMayAlsoLikeUrl + finalQueryString,
		success : function(data) {
			$( "#youmayalsolikeproductlisting").html(data);
		},
		complete : function(jqXHR, status){
			updateProductInfo(getPageProductIds());
            initCurrencies();
		}
	});

    //On variant item li click we are just propagating it the actual link.
    //TODO: Change the DOM instead.
    $(document).on("click",".variantItem",function(){
        $(".variantItem").removeClass("selectedVariant");
        $(this).addClass("selectedVariant");
        //$(this).find(".buttontext").click();
    });

    //Making the first variant product as default
    /*if($(".defaultVariant").length){
        $(".variantItem").removeClass("selectedVariant");
        $(".defaultVariant").closest("li").addClass("selectedVariant");
        $(".defaultVariant").click();
    }*/
    //set order source
    updateOrderSource();
	
}

function checkProductExpiry(productId){
	$.ajax({
        url: '/control/getProductExpiryInfo',
        type: 'GET',
        data: 'productId='+productId,
        dataType:"json",
        global: false,
        success: function(respData) {
            if(respData!=null && respData.isProductStockAvailable!=undefined){
                var isStockAvailable=respData.isProductStockAvailable;
                if(isStockAvailable=="N"){
                    $("#buynow").prop( "disabled", true );
                    $("#buynow").html("Out of Stock");
                    $("#buynow").css("background","#D3D3D3");
                    $("#buynow").css("color","#FFFFFF");
                    $("#addToCart").prop( "disabled", true );
                    $("#addToCart").css( "border", "1px solid #D3D3D3" );
                    $("#addToCart").css("background","#D3D3D3");
                    $("#addToCart").css("color","#FFFFFF");
                }else{
                	$("#buynow").prop( "disabled", false );
                    $("#buynow").html("BUY NOW");
                    $("#buynow").css("background","#f78828");
                    $("#buynow").css("color","#f9f9f9");
                    $("#addToCart").css( "border", "1px solid #62af69" );
                    $("#addToCart").prop( "disabled", false );
                    $("#addToCart").css("background","#62af69");
                    $("#addToCart").css("color","#f9f9f9");
                }
            }
        },
        error: function(e) {
        }
    });
}

//Method used for lazy loading of images..
function loadProductImages(){
	var productListSelector = "section.productsection";
	$( $(productListSelector).find(".lazy")).each(function( index ) {
		if($( this ).attr("data-imageurl")!=undefined){
			$( this ).attr("src",$( this ).attr("data-imageurl"));
		}
	});
}

//Loading css files dynamically
function loadStyleSheets(){
	var stylesheetList = "";
	$.each(cssFilesList,function(index, value){
		var filePath
		if(value.charAt(0) == '/'){
			filePath = cdnHost + value;
		}
		else if(value == "topmenu.css" || value == "common.css"){
			filePath =  cdnHost + "/assets/topbar/src/css/" + value;
		}else{
			filePath = cdnHost + "/assets/css/" + value;
		}
		stylesheetList = stylesheetList + '<link rel="stylesheet" href="' + filePath +'" type="text/css" />';
	});
	$("head").append(stylesheetList);
}


/**
 * maxlength validation 
 */
function maxLengthValidation(event,id,length,leftCharDivId){
		var message = $("#"+id).val();
		var msgLength = message.length;
		var newLines = message.match(/(\r\n|\n|\r)/g);
		if(newLines != null) msgLength += newLines.length;
		showRemainingChar(leftCharDivId,msgLength,length);
		if(event.which == 13 && msgLength<=length){
			message = message.replace(/(\r\n|\n|\r)/g,'\r\n')
			$(this).val(message);
			msgLength = message.length;
		}else if(msgLength>length && event.which != 8 && event.which != 0 && event.which != 99){
			event.preventDefault();
		}
}

function maxLengthValidationForPaste(event,id,length,leftCharDivId){
	setTimeout(function () {
		var message = $("#"+id).val();
		var msgLength = message.length;
		var newLines = message.match(/(\r\n|\n|\r)/g);
		var newLength = 0;
		if(newLines != null) newLength = msgLength+newLines.length;
		else newLength = msgLength;
		
		if(msgLength > length){
			message = message.substr(0,length);
			$("#"+id).val(message);
		}
		
		if(newLines != null && newLength > length){
			message = message.substr(0,(msgLength-newLines.length));
			$("#"+id).val(message);
		} 
		var left = newLength > length ? (newLength - length) : (length - newLength);
		$('#'+leftCharDivId).text('left '+left);
		
	}, 100);

}

function showRemainingChar(leftCharDivId,msgLength,length){
	var leftChar = $('#'+leftCharDivId).text();
	if(leftChar != '' && leftChar != undefined){
		var left = length-msgLength;
		$('#'+leftCharDivId).text('left '+left);
	}
}
function outSideSelectBoxClick(currentItem){
	$("body").click(function(){
		$("#occasioncontainer").hide();
		$(".dropcontainer").hide();
		$(currentItem).removeClass("active-select");
	});
}
function onWindowResize() {
	$(window).resize(function(){
		var postionEle = $(".recipientmessage .occasionText").offset();
		$("#occasioncontainer").css({top: (postionEle.top+$(".recipientmessage .occasionText").outerHeight())+'px', left: postionEle.left+'px',width:$(".recipientmessage .occasionText").parent().width()});
	});
}
function sameDayDelivery(){
	
	if(localVisitorId != 'true'){
		localStorage.setItem('visited','true');
		if(cookieVisitorId != 'true'){
			setCookie('Fnp.Visitor', 'true', 365);
			if(ofbizVisitorId == ""){
				isVisited = true;
			}
		}
	}	
	return isVisited;	
}

function sameDayDelivery(){
	
	$.ajax({
		url : "https://" + secureHostNameToUse +'/control/getSameDayDeliveryTimeLeft',
		type : 'GET',
		dataType : "json",
		success : function(respData) {
			if (respData != null && respData.isDeliveryTimeAvailable != null && respData.isDeliveryTimeAvailable == true) {
				var today = convertTimestampStringToDate(respData.currentTimestamp);
				//var cutoffTime = Date.parse(respData.cutoffTimestamp);
				//cutoff time will have timestamp diff. where as deliveryDate has value of actual deliverable.
				var cutOffDate = convertTimestampStringToDate(respData.cutoffTimestamp);
				var cutoffTime = cutOffDate.getTime();

				//using deliveryDate from response for calculating the day on which it is actually deliverable.
				var deliveryDate = convertTimestampStringToDate(respData.deliveryDate);
                var day = deliveryDate.getDate();
                var month = parseInt(deliveryDate.getMonth())+1;
                var year = deliveryDate.getFullYear();

                var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
            
                if(day == (parseInt(tomorrow.getDate())) && month == (parseInt(tomorrow.getMonth())+1) && year == tomorrow.getFullYear()){
                	$('header #maintoolbar #navigationtools .needtodayclock').removeAttr('id');
                	$('header #maintoolbar #navigationtools .needtodayclock').attr('id','tomorrowdelivery');	
                }

			}
		}
	});
}

function isNewUser(){
	 var isVisited = false; 
	 var localVisitorId = localStorage.getItem("visited");
	 var ofbizVisitorId = getCookie('OFBiz.Visitor');
	 var cookieVisitorId = getCookie('Fnp.Visitor');
	 console.log('localVisitorId = '+localVisitorId+" ofbizVisitorId = "+ofbizVisitorId+" cookieVisitorId = "+cookieVisitorId); 
	 
	 if(localVisitorId != 'true'){
		  localStorage.setItem('visited','true');
		  if(cookieVisitorId != 'true'){
			  setCookie('Fnp.Visitor', 'true', 365);
			   if(ofbizVisitorId == ""){
			    isVisited = true;
			   }
		  }
	 } 
	 return isVisited; 
}

function changePersonalizedOptions(){
	var productId= $("#addProductId").val();
	var defaultVal = $("#countLength").attr("data-defaultval");
	var isPersonalizableImage = productPersonalizedMap[productId] != undefined ? productPersonalizedMap[productId].isPersonalizableImage : false;
	var isPersonalizableText = productPersonalizedMap[productId] != undefined ? productPersonalizedMap[productId].isPersonalizableText : false;
	var currentMsg= "";
	useDefaultConfig = false;
	
	$("#uploadMsg").hide();
	$(".personalimg").hide();
	$(".personalmsg").hide();
	
	if($(".personaltxtmsg")){
		currentMsg = $(".personaltxtmsg").val();
	}
	
	if(productPersonalizedMap!=null && (isPersonalizableImage || isPersonalizableText)){ 
		if(isPersonalizableImage){
			if(!$(".personalimg").is(":visible")){
				$(".personalimg").css("display", "inline-block");
			}
		}
		if(isPersonalizableText){
			if(!$(".personalmsg").is(":visible")){
				$(".personalmsg").css("display", "inline-block");
			}
			var newCountValue = productPersonalizedMap[productId].maxLength;
			var countValue = newCountValue != null ? newCountValue : defaultVal;
			$(".personaltxtmsg").attr("maxLength",countValue);
			$("#countLength").val(countValue).trigger("change");
			if(currentMsg !="" && currentMsg.length > countValue){
				$(".personaltxtmsg").val(currentMsg.substring(0, countValue)).trigger("change");
			}
		}
	} else {
		//When no config specified. showing both img upload and text options
		useDefaultConfig = true;
		$(".personalimg").css("display", "inline-block");
		$(".personalmsg").css("display", "inline-block");
		$(".personaltxtmsg").attr("maxLength",defaultVal);
		$("#countLength").val(defaultVal).trigger("change");
		if(currentMsg !="" && currentMsg.length > defaultVal){
			$(".personaltxtmsg").val(currentMsg.substring(0, defaultVal)).trigger("change");
		}
	}
}

function getlocality(place) {
	var area = "";
	var addressComponents = place.address_components;
	for (i = 0; i < addressComponents.length; i++) {
		addressComponent = addressComponents[i];
		types = addressComponent.types;
		for (j = 0; j < types.length; j++) {
			if (types[j] == 'sublocality') {
				if(!area){
					area = area+addressComponent.long_name+", ";
				}
			}else if (place.formatted_address) {
				if(place.formatted_address.length > 0){
					var formattedaddress = place.formatted_address.split(",");
					if(!area){
						area = formattedaddress[0];
					}
				}
				
			}
			
		}
	}
	return area;
}

/*==========  js for City + DOD Gift Finder ==================*/
function giftFinderFilter() {
	 gotItFlag="true";
	 $.cookie('gotItFlag', "true",{path : '/',domain:currentdomain});
	var city = $("#qscity").val();
	if (!(city && typeof city != "undefined" && city != null && city != '')||!matchCity(city)) {
		$('.gfcityerror').show();
		$("#qscity").val('');
		return false;
	}else{
		city = city.toLowerCase();
	}
	var daliverydate=deliveryDateConvToNum($('#giftfinder #deliveryDatelink').text());

	var giftFinderPreviousSearch = {};
	var giftFinderPreviousSearchDate = null;
	var giftFinderPreviousSearchArea;
	if ($.cookie('gfFinderCookie')) {
		giftFinderPreviousSearch = JSON.parse($.cookie('gfFinderCookie'));
		if(giftFinderPreviousSearch.date){
			giftFinderPreviousSearchDate = giftFinderPreviousSearch.date;
			giftFinderPreviousSearchDate = deliveryDateConvToNum(giftFinderPreviousSearchDate);
		}
		if(giftFinderPreviousSearch.city){
			giftFinderPreviousSearchArea = giftFinderPreviousSearch.city;
		}
	}
	if(giftFinderPreviousSearchArea && giftFinderPreviousSearchDate){
		if(city === giftFinderPreviousSearchArea){
			if(daliverydate && daliverydate!=null && giftFinderPreviousSearchDate && giftFinderPreviousSearchDate!= null){
				if(daliverydate === giftFinderPreviousSearchDate){
					/*$("#giftfinder").foundation('reveal', 'close');
					return;*/
				}
			}
		}
	}else if(giftFinderPreviousSearchDate == null && daliverydate== null){
		if(city === giftFinderPreviousSearchArea){
			/*$("#giftfinder").foundation('reveal', 'close');	
			   return;*/
		}
	}
	callByGiftFinderFilter(city, daliverydate);
}

function callByGiftFinderFilter(city, daliverydate){
	var categoryId = null;
	var uriPath = window.location.pathname;
	uriPath = uriPath.slice(1);
	var uriPaths = uriPath.split("/");
	var recipient="";
	for(var ur in uriPaths){
		if(uriPaths[ur] != "")
		if(uriPaths[ur].indexOf('for-')!=-1){
			recipient = uriPaths[ur];
		}
	}
	if(recipient || isCityPage){
		for(var ui in uriPaths){
			if(uriPaths[ui] != "")
			if(uriPaths[ui] === recipient || uriPaths[ui] === deliveryCityLock){
				uriPaths.splice(ui,1);
			}
		}
	}
	var newUriPath ='';
	for(var u in uriPaths){
		if(uriPaths[u] != "")
		newUriPath += uriPaths[u] +"/"
	}
	newUriPath = newUriPath.slice(0,-1);
	if(fnpPageType != "category"){
		newUriPath = "gifts";
	}else{
		if(newUriPath.charAt(0)==="/"){
			newUriPath = newUriPath.substr(1);
		}
	}
    var inputData = 'categoryId='+newUriPath+"/"+city;
	$.ajax({
		url : '/control/checkProductCategory',
		type : 'GET',
		dataType : "json",
		data: inputData,
		success : function(respData) {
			var finalUrl = newUriPath;
			if(respData!=null){
				if(respData.flag){
					finalUrl=finalUrl+"/"+city;
					if(daliverydate!=null&&daliverydate!=""){
						finalUrl=finalUrl+"?fq=deliveryDate:"+daliverydate;
					}
				}else{
					finalUrl=finalUrl+"?CITY_TAGS="+city
					if(daliverydate!=null&&daliverydate!=""){
						finalUrl=finalUrl+"&fq=deliveryDate:"+daliverydate;
					}
				}				
			}
			if(finalUrl!=null&&finalUrl!=""){
				if(recipient != ""){
					if(finalUrl.indexOf('?')!=-1){
						finalUrl = finalUrl+ "&RECIPIENT_TAGS="+recipient;
					}else{
						finalUrl = finalUrl+ "?RECIPIENT_TAGS="+recipient;
					}
				}else{
					/*var RECIPIENT_TAGS=getParameterByName("RECIPIENT_TAGS",window.location.href);
					if(RECIPIENT_TAGS != null && typeof RECIPIENT_TAGS != 'undefined' && RECIPIENT_TAGS != ""){
						if(finalUrl.indexOf('?')!=-1){
							finalUrl = finalUrl+ "&RECIPIENT_TAGS="+RECIPIENT_TAGS;
						}else{
							finalUrl = finalUrl+ "?RECIPIENT_TAGS="+RECIPIENT_TAGS;
						}
					}*/
				}
				if(finalUrl.charAt(0)!="/"){
					finalUrl = "/"+finalUrl;
				}
				$("#giftfinder").foundation('reveal', 'close');
				storeGfFinderdata(city,deliveryDateConvToName(daliverydate))
				window.location.replace(finalUrl);
			}
		}
	});	
}

function deliveryDateConvToNum(dateString){
	var months={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"};
	if(dateString ==null || dateString.toUpperCase() === "Select Date".toUpperCase()){
		return null;
	}else{
		var dateArray=dateString.split(' ');
		dateArray[1]=months[dateArray[1]];
		return dateArray[0]+"-"+dateArray[1]+"-"+dateArray[2];
	}
}
function deliveryDateConvToName(dateString){
	var months={"01":"Jan","02":"Feb","03":"Mar","04":"Apr","05":"May","06":"Jun","07":"Jul","08":"Aug","09":"Sep","10":"Oct","11":"Nov","12":"Dec"};
	if(dateString ==null || dateString.toUpperCase() === "Select Date".toUpperCase()){
		return null;
	}else{
		var dateArray=dateString.split('-');
		dateArray[1]=months[dateArray[1]];
		return (dateArray[0]+" "+dateArray[1]+" "+dateArray[2]);
	}
}

function matchCity(city){
	for(var quickCity in quickshopcity){
		//alert(quickshopcity[quickCity]);
		if(city.toUpperCase()===quickshopcity[quickCity].toUpperCase()){
			return true;
		}
	}
	return false;
}

function giftFinderDataLock(quickshopcity){	 
	var url=window.location.pathname;
	if(url.charAt(0) === "/"){
	 url = url.substr(1);
	}
	var tempPath = url.split('/');
	var CITY_TAGS=getParameterByName("CITY_TAGS",window.location.href)
	var deliverydate=getParameterByName("fq",window.location.href);
	if(deliverydate!=null&&deliverydate!=""){
		deliverydate=deliverydate.split(':')[1];
	}
	
	  deliverydate=deliveryDateConvToName(deliverydate);
	    for (var tempCity in tempPath) {
	    	for(var quickCity in quickshopcity){
	    		if(tempPath[tempCity]===quickshopcity[quickCity]){
	    			isCityPage=true;
	    			deliveryCityLock=tempPath[tempCity];
	    		}
	    	}
	 }
    if(isCityPage!=true && CITY_TAGS === null && fnpPageType == "product"){
    	CITY_TAGS=jQuery.deparam.querystring()["localityname"];
	}
	if(isCityPage!=true&&(CITY_TAGS!=""&&CITY_TAGS!=null)){
		hasQueryCity=true;
		deliveryCityLock=CITY_TAGS;
	}
	if(deliverydate===null && fnpPageType == "product"){
		 deliverydate=deliveryDateConvToName(jQuery.deparam.querystring()["deliverydate"]);
	}
	if(deliverydate!=""&&deliverydate!=null){
		isDeliveryDate=true;
		deliveryDateLock=deliverydate;
	}	
	 
	if(isCityPage || hasQueryCity || isDeliveryDate){
		storeGfFinderdata(deliveryCityLock,deliveryDateLock);
	}else{
	   if(fnpPageType == "category"){
		   var area = $("#FNP_CURRENT_CATALOG_ID").val();
		   if(area && typeof area != 'undefined' && area.toUpperCase() === 'uae'.toUpperCase()){
			   var giftFinderPreviousSearch = {};
				var giftFinderPreviousSearchDate = null;
				var giftFinderPreviousSearchArea;
				if ($.cookie('gfFinderCookie')) {
					giftFinderPreviousSearch = JSON.parse($.cookie('gfFinderCookie'));
					if(giftFinderPreviousSearch.date){
						giftFinderPreviousSearchDate = giftFinderPreviousSearch.date;
						giftFinderPreviousSearchDate = deliveryDateConvToNum(giftFinderPreviousSearchDate);
					}
					if(giftFinderPreviousSearch.city){
						giftFinderPreviousSearchArea = giftFinderPreviousSearch.city;
					}
					callByGiftFinderFilter(giftFinderPreviousSearchArea, giftFinderPreviousSearchDate);
				}
		   }
		}
	}
	prePopulateCityDOD();
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function storeGfFinderdata(deliveryCity,deliveryDate){	
	var gfFinderCookie={
			city:deliveryCity,
			date:deliveryDate
	};
	if($.cookie('gfFinderCookie')){		
		gfFinderCookie= JSON.parse($.cookie('gfFinderCookie'));
		gfFinderCookie.city=deliveryCity;
		gfFinderCookie.date=deliveryDate;
	}
   $.cookie('gfFinderCookie', JSON.stringify(gfFinderCookie),{path : '/',domain:currentdomain});
}


function getGfFinderdata(){	
	if ($.cookie('gfFinderCookie')) {
		var gfFinderData = JSON.parse($.cookie('gfFinderCookie'));
		deliveryCityLock=gfFinderData.city;
		deliveryDateLock=gfFinderData.date;		
	}
}

function prePopulateCityDOD(){
	if(deliveryCityLock!=""&&deliveryCityLock!=null){
		$("#qscity").val(deliveryCityLock);
		$("#deliveryDatelink").removeClass('disabled');
	}
	if(deliveryDateLock!=""&&deliveryDateLock!=null)
		$("#deliveryDatelink").text(deliveryDateLock);
}
function __(eleId){
	return document.getElementById(eleId);
}
function checkFocusStates() {
	if(__("qscity")!=null){
		if(!__("qscity").contains(event.target) && event.target.parentElement && event.target.parentElement.id != "qsuggestions" ) {
			__("quickshophelper").removeAttribute("class");
			var city = $("#qscity").val();
			if (!(city && typeof city != "undefined" && city != null && city != '')) {
				$('#deliveryDatelink').addClass('disabled');
			}
		}
	}
}

function loadQsSuggestions(qsInput){
	displaySuggestions(qsList[qsInput.id], qsInput);
}
function displaySuggestions(suggestions, qsInput){
	__("quickshophelper").className = qsInput.id;
	var qsEle = __("qsuggestions");
	qsEle.fnp_Source = qsInput;
	var moreSuggestionsExist = false;
	while (qsEle.firstChild) qsEle.removeChild(qsEle.firstChild); //first remove all children
	for(var i = 0; i < suggestions.length; i++){
		if(i >= MAX_SUGGESTIONS){
			moreSuggestionsExist = true;
			break;
		}
		var liEle = document.createElement("li");
		liEle.dataValue = suggestions[i].charAt(0).toUpperCase() + suggestions[i].slice(1);
		liEle.appendChild(document.createTextNode(suggestions[i].charAt(0).toUpperCase() + suggestions[i].slice(1)));
		liEle.isInCommonDialog = true;
		qsEle.appendChild(liEle);
	}
	if(suggestions.length == 0){
		__("quickshophelper").removeAttribute("class");
	}
	if(moreSuggestionsExist){
		qsEle.className = "giftfindercitylisting";
	}

}
function getQSuggestions(qsInput){
	var q = qsInput.value.trim();
	if(q == ""){
		loadQsSuggestions(qsInput);
	}
	else {
		q = q.toLowerCase();
		var resultset = [];
		var suggestions = qsList[qsInput.id];
		for(var i = 0; i < suggestions.length; i++){
			var match = suggestions[i].toLowerCase().indexOf(q) >=0 || suggestions[i].toString().toLowerCase().indexOf(q) >=0;
			if(match){
				if((suggestions[i].toLowerCase().indexOf(q) ==0 || suggestions[i].toString().toLowerCase().indexOf(q) ==0) && qsInput.id != "qsdate")
					resultset.splice(0, 0, suggestions[i]);
				else
					resultset.push(suggestions[i]);
			}
		}
		displaySuggestions(resultset, qsInput);
	}
}
function chooseSuggestion(event){
	var qsInput = event.target.parentElement.fnp_Source;
	if(qsInput){
		var d = event.target.dataValue;
		$('.gfcityerror').hide();
		$('#deliveryDatelink').removeClass('disabled');
		qsInput.value = d;
		__("quickshophelper").removeAttribute("class");
	}
}

//method used to get form data in the form of object
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

//method used to google page speed test.
function pageSpeedTest() {
    var str = "The best things in life are free";
    var patt = new RegExp("e");
    var res = patt.test(str);
    document.getElementById("demo").innerHTML = res;
}
$(document).on('click',".videoicon", function() {
	 var videoURL = $('#videomodal').data('videourl');
	 $('#custVideo').attr('src', videoURL+"?autoplay=1&showinfo=0&rel=0");
	 $('#videomodal').foundation('reveal', 'open');
});

$(".close-reveal-modal").on('click', function() {
	$('#custVideo').attr('src','');
});



$('body').on('click', function(e) {
		if(e.target.className !== "customervideo" && e.target.className !== "videoicon" && e.target.className !== "close-reveal-modal" && e.target.id  !== "videomodal"){
			$('#custVideo').attr('src','');
		}
});

function updateAddonQuantity(element){
	var productId = $(element).data("product");
	var quantity = $(element).attr("data-quantity") * 1;
	var cartIndex = $(element).attr("data-cartIndex");
	var increaseflag = $(element).attr("data-increaseflag");
	if(increaseflag == "Y"){
		quantity = quantity + 1;
	}
	if(increaseflag == "N"){
		quantity = quantity - 1;
	}
	if(quantity < 1 || quantity > 9){
		$(element).attr('disabled','disabled');
	}else{
		ajaxindicatorstart('');
		$.ajax({
			type : 'POST',
			dataType : 'json',
			sync : true,
			url : '/control/updateAddonQuantityProduct',
			data : {
				"productId_quantity" : productId+'_'+quantity,
				"itemIndex" : cartIndex
			},
			success : function(data) {
				if(data.isSuccess){
					$(element).siblings('#'+productId+'_'+cartIndex).text(quantity);
					$(element).attr("data-quantity",quantity);
					$('.delivery-detail').find('#'+productId).text(quantity);
					if(increaseflag == 'Y'){
						$(element).siblings('.quantitydecrease').attr("data-quantity",quantity);
					}else{
						$(element).siblings('.quantityincrease').attr("data-quantity",quantity);
	 				}
					if(quantity == 1){
						$(element).attr('disabled','disabled');
					}else{
						$(element).siblings('.quantityincrease').removeAttr('disabled');
						$(element).siblings('.quantitydecrease').removeAttr('disabled');
					}
					if(quantity == 9){
						$(element).attr('disabled','disabled');
					}else{
						$(element).siblings('.quantityincrease').removeAttr('disabled');
						$(element).siblings('.quantitydecrease').removeAttr('disabled');
					}
					if(fnpPageType =='ordersummary'){
						$('#orderSubTotal').text(data.subTotal);
						$('#shippingChangres').text(data.shippingChangres);
						$('#grandTotal').text(data.grandTotal);
						$('#totalDiscountAmount').text(data.totalDiscountAmount);
						$("#exclusiveTaxAmount").text(data.exclusiveTaxAmount);
						$("#totalTaxAmount").text(data.totalTaxAmount);
						
					}
					ajaxindicatorstop();
				}else{
					ajaxindicatorstop();
				}
			}
		});
	}
}

function buildlocalcurrency(ele){
	cookieLocalCurrency = getCookie("localCurrency");
	var href= $(ele).attr("href");
	if(href.contains("WS_PTNR_currency")){
		href = $.param.querystring($(ele).attr("href"), {WS_PTNR_currency:cookieLocalCurrency})
	
	}else{
		if(href.contains("?")){
			 href+="&WS_PTNR_currency="+cookieLocalCurrency;
		}else{
			href+="?WS_PTNR_currency="+cookieLocalCurrency;
		}
	}
	$(ele).attr("href",href);
	$(ele).attr("target","_blank");
}

function beatOutServiceForviewProduct() {
	isUserLoggedIn(function(isUserLogged){
		var req_productId=$("#productId").val();
		var req_productCategoryId=$('#productCategoryId').val();
		var req_catalogId=$('#FNP_CURRENT_CATALOG_ID').val();
		var req_price=$('#price').val();
		var param = 'productId=' + req_productId + '&' + 'productCategoryId=' + req_productCategoryId + '&' + 'catalogId=' + req_catalogId +  '&'
		 + 'price=' + req_price;
		console.log(param);

		try {
			if (isUserLogged) {
				$.ajax({
					global : false,
					url : "/control/beatOutActivityServiceForViewProduct?"+param,
					type : 'get',
					dataType : 'json',
					async : true,
					error : function() {
					},
					success : function(data,textStatus,jqXHR) {
							console.log("data success"+data);
					},
					complete : function(xhr, status) {
						console.log("completed");
					}
				});
			}else{
				console.log("user not logged in");
			}
		} catch (e) {
		}
	});
}

function beatOutServiceForviewCategory() {
	isUserLoggedIn(function(isUserLogged){
		
		var req_cat_url=window.location.href;
		
		var param = 'cat_url=' + req_cat_url;
		console.log(param);

		try {
			if (isUserLogged) {
				$.ajax({
					global : false,
					url : "/control/beatOutActivityServiceForCategoryViewEvent?"+param,
					type : 'get',
					dataType : 'json',
					async : true,
					error : function() {
					},
					success : function(data,textStatus,jqXHR) {
							console.log("data success"+data);
					},
					complete : function(xhr, status) {
						console.log("completed beatOutServiceForviewCategory");
					}
				});
			}else{
				console.log("user not logged in");
			}
		} catch (e) {
		}
	});

}

function beatoutServices(){
	
	if(fnpPageType == 'product'){
		beatOutServiceForviewProduct();
	}
	
	if(fnpPageType == 'category'){
		beatOutServiceForviewCategory();
	}
	
}

function doUserLogOut(){
	window.location.href ='https://' + window.location.hostname + '/control/logout?to=/';
}

function delete_cookie(key){
	document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function ajaxCallForEveryPage(){
	$.ajax({
		type:'GET',
		globaa : false,
		url:'/assets/images/favicon.ico',
		complete : function(jqXHR){
			setNewRelicAttribute(jqXHR);
		}
	});
}
function onHoverImageInit() {
	//debugger;
	$(document).on('mouseenter','.product-hover',scrollImages);
	$(document).on('mouseleave','.product-hover',unSlickProductImageScroll);
}

function scrollImages(event) {
	//debugger;
	try {
		var images = event.currentTarget.querySelectorAll("img.u-photo");
		var isHoverApplicable = ((event.currentTarget.getAttribute("data-product-img-count") || 0) - 0) > 1 && true;
		if(isHoverApplicable) {
			if(images && images.length == 1) {
				var divEle = document.createElement("div");
				divEle.className="slick-wrapper";
				var clonedEle = images[0].cloneNode(true);
				if(!imageElementTemplate)
					imageElementTemplate = clonedEle.cloneNode(true);
				var figure = event.currentTarget.getElementsByTagName("figure")[0];
				var clonedFigure = figure.cloneNode(true);
				var imagesAvailable = (event.currentTarget.getAttribute("data-product-img-count") || 0) - 0;
				var matches = /(.*).(jpg|png|jpeg)/.exec(clonedEle.src);
				var imageNumber = matches[1].charAt(matches[1].length - 1) - 0;
				var _isNan = false;
				if(isNaN(imageNumber)) {
					_isNan = true;
					imageNumber = 1;
				}
				var imageURL = matches[1].replace(/\/m\//,"/l/")
				divEle.appendChild(clonedEle);
				for(var i= 1 + imageNumber; i < imageNumber + imagesAvailable; i++){
					var elementCopy = images[0].cloneNode(true);
					elementCopy.src = imageURL.substr(0,imageURL.length - ( _isNan ? 0 : 1)) + (_isNan ? "_" : "" )+(i)+"."+matches[2];
					divEle.appendChild(elementCopy);
				}
				clonedFigure.replaceChild(divEle,clonedFigure.querySelector(".u-photo"));
				figure.parentElement.replaceChild(clonedFigure,figure);
				//initialize slick.
				initializeSlickForImageScroll(divEle);
			}
		}
	} catch(error) {
		console.info(error);
	}	
}
function unSlickProductImageScroll(event) {
	try {
		var figure =  event.currentTarget.getElementsByTagName("figure")[0];
		var figureCopy = figure.cloneNode(true);
		var imagesToRemove = figureCopy.querySelectorAll("img.u-photo");
		//does it has scroll functionality
		if(imagesToRemove && imagesToRemove.length > 1) {
			var slickWrapper = figureCopy.querySelector(".slick-wrapper");
			//Clone original image which doesn't have slick related changes and change src.
			var imageToShow = imageElementTemplate.cloneNode(true);
			imageToShow.src = event.currentTarget.getAttribute("data-img-url");
			//Remove slick related changes.
			slickWrapper.parentElement.replaceChild(imageToShow,slickWrapper);
			figure.parentElement.replaceChild(figureCopy,figure);
		}
	} catch(error) {
		console.info(error);
	}
}
function initializeSlickForImageScroll(target) {
	try {
		$(target).slick({
			prevArrow : '',
			nextArrow : '',
			autoplay:true,
			autoplaySpeed:1500,
			fade: true,
			pauseOnHover:false,
			dots:true,
		});
	} catch(error) {
		console.info(error);
	}
}

function initializeZoom(){
	$('.image-zoom').elevateZoom({
		zoomWindowHeight: 400, 
		zoomWindowWidth:550
	});
}
function updateCartItem(userDetails){
    var cartDetails = userDetails ? userDetails.cart : undefined ; 
    if(!(cartDetails === undefined)){
        if(!cartDetails.isSuccess && getCookie("fnpci")=="t"){
            delete_cookie("fnpci");
        }
        if(0 < cartDetails.cartTotalQuantity){
            $("#cartCount").addClass("hasitems");
            $("#cartCount").text(cartDetails.cartTotalQuantity);
        }
        if(0 == cartDetails.cartTotalQuantity){
        	$("#cartCount").removeClass("hasitems");
            $("#cartCount").empty();
        }
    }
}

//document.addEventListener("click", checkFocusStates);
/*========== end of js for City + DOD Gift Finder ==================*/

//This is Related to NewSearchbar functionality

function loadCategoryType(categoryType, categoryArray, respData) {
	if (categoryArray) {
		for (var i = 0; i < categoryArray.length; i++) {
			var hintItem = new Object();
			hintItem.label = categoryArray[i].label;
			hintItem.value = categoryArray[i].category;
			hintItem.categoryType = categoryType;
			hintItem.index = i;
			if (i == categoryArray.length - 1)
				hintItem.isLast = true;
			respData.push(hintItem);
          var shEle = __("searchhintlist");
          while (shEle.firstChild) shEle.removeChild(shEle.firstChild); //first remove all children
          for (var j = 0; j < respData.length; j++){
              var liEle = document.createElement("li");
              var iTag = document.createElement("i");
              iTag.className = "material-icons search-icons";
              var aEle = document.createElement("a");
              aEle.href = respData[j].value + "?s=autosuggestion";
              aEle.appendChild(document.createTextNode(respData[j].label));
              liEle.appendChild(aEle);
              shEle.appendChild(liEle);
              aEle.appendChild(iTag);
              $(".search-icons").text("search");
          }
		}
	}
}

$(document).on("click", ".popular-search-item", function() {
  saveInCookie($(this).find('.popular-search-label').text())
});

function saveInCookie(value) {
  var cookievalue = value;
  setCookie('fnpsearch', cookievalue, 7, "/");
}
function fileUploadForm(e){
	e.preventDefault();
	var S3Params = new FormData();
	var input = document.getElementById("imageuploadbtn").files[0];
	S3Params.append('folderPath', 'pz')
	S3Params.append("file", document.getElementById("imageuploadbtn").files[0]);
	S3Params.append("content-type", document.getElementById("imageuploadbtn").files[0].type);
	$.ajax({
		url: '/control/fileUploadToS3',
		data: S3Params,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function(data){
			var jsonDtls = JSON.parse(data);
			var reader = new FileReader();
			reader.onload = function(e) {
				$('.imgupload').removeClass("loadinggif");
				var uploadedimage = document.getElementById("uploadedimage");
				if(uploadedimage){
					uploadedimage.style.display = "block";
				}
				var imguploadspan= document.getElementsByClassName("imguploadspan")[0];
				if(imguploadspan){
					imguploadspan.style.display = "none";
				}
				$("#uploadedimage").attr("src", jsonDtls.s3FileUrl);
				$("#refImageUrl").val(jsonDtls.s3FileUrl);
			}
			reader.readAsDataURL(input);
		}
	});
}