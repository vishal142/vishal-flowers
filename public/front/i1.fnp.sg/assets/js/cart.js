var viewCartData = null;
var internationalCurrency = false;
var isCartClicked = false;
var loggedIn = false;
var isOAuthUser = false;
var userDetails=null;

$(document).ready(function() {
	if(userDetails === null){
    	//initializeToolbarButtonActions();
	}
	if(userDetails === null && !isFNPCheckLoginRunning){
		isUserLoggedIn(checkFnpUserLoggedIn);
	}
	getCart(0);
});
function closeCart(){
	$("#cartpanel").hide();
}
function afterFetchFromCart(data , itemIndex){
	var isCartItemExits =false;
	var isDiscountAvail =false;
	var isCartSummary = true;
	var domainPrefix = "https://"+window.location.hostname;
	var	isUserlogin = false;
	var totalCount = 0;
	var newItems = [];
	var cartItem = {};//new json;
	//cartItemCount();
	if(!data.items.length == 0){
		var localCurrency = getCookie("localCurrency");
		if(localCurrency != undefined && localCurrency != "" && localCurrency != null && localCurrency != "INR"){
			internationalCurrency = true;
		} else {
			internationalCurrency = false;
		}
		isCartItemExits =true;
	}
	data.isInternationalCurrency = internationalCurrency;
	if(0 != data.discount)
		 isDiscountAvail = true;
	if(loggedIn)
        isUserlogin = true;
	data.isCartItemExits = isCartItemExits;
	data.isDiscountAvail = isDiscountAvail;
	data.imageDomainPrefix  = cdnHost;
	data.isCartSummary = isCartSummary;
	data.domainPrefix = domainPrefix;
	data.isUserlogin = isUserlogin;
	if(!data.items.length == 0){
		$.each(data.items, function(i, item){
			if('N' == item.addon && cartItem.item != undefined){
				newItems.push(cartItem);
				cartItem = {};
			}
			var isExpress = false;
			var isCourier = false;
			var isInternational = false;
			var isPersonilized = false;
			var isAddon = false;
			var minquantity = false;
			var maxquantity = false;
			var isShippingPriceAvailable;
			if("EXPRESS" === item.primaryProductCategoryId)
				isExpress = true;
			if("COURIER" === item.primaryProductCategoryId)
				isCourier = true;
			if("INTERNATIONAL" === item.primaryProductCategoryId)
				isInternational = true;
			if("PERSONALIZED" === item.primaryProductCategoryId)
				isPersonilized = true;
			if('Y' == item.addon){
				isAddon = true;
				if(1 === item.quantity)
					minquantity = true;
				else if(9 === item.quantity)
					maxquantity = false;
			}
			item.isExpress = isExpress;
			item.isCourier = isCourier;
			item.isInternational = isInternational;
			item.isPersonilized = isPersonilized;
			item.isAddon = isAddon;
			item.minquantity = minquantity;
			item.maxquantity = maxquantity;
			
			item.index = i;
			if('N' == item.addon){
				var deliveryDate = item.deliveryDate.split(' ');
				item.deliveryDay = item.deliveryDate.split(',')[0];
				item.deliveryMonth = deliveryDate[1];
				item.deliverydDate = deliveryDate[2];
				item.addons = [];
				cartItem.item = item;
				item.isShippingPriceAvailable = item.shippingDetails.isShippingPriceAvailable;
				totalCount++;
			}else{
				var addonsItems = cartItem.item.addons;
				var addonPrice = item.price/item.quantity;
				item.addonPrice = addonPrice;
				addonsItems.push(item);
				cartItem.item.addons = addonsItems;
			}
	    });
		data.totalCount = totalCount;
	}
		//adding last ele
	if(Object.keys(cartItem).length)
		newItems.push(cartItem);
	data.items = newItems;
    var cartTemplate = $("#cartTemplate").html();
    if(cartTemplate != undefined){
    var html = Mustache.to_html(cartTemplate, data);
    $("#viewcart").html(html);
    var addonElement = $("#cartItem_" + itemIndex)[0];
    addonElement ? addonElement.scrollIntoView() : '';
    initCurrencies();
    if (isCartClicked) {
    	if (typeof cartViewOmni == 'function') {
    		cartViewOmni(data);
    	}
    	isCartClicked = false;

    }
   }
}

function getCart(itemIndex){
	if(viewCartData != null){
		afterFetchFromCart(viewCartData , itemIndex);
	}else{
		if("t" == getCookie("fnpci") || "t" == getCookie("fnpli")){
				$.ajax({
					type : 'GET',
					dataType : 'json',
					async : false,
					global : false,
					url : '/control/viewcart',
					success : function(data) {
						viewCartData = data;
						afterFetchFromCart(data , itemIndex);
					},
					error: function(){
						fetchFaild();
					}
				});
		}else{
			var data = {"items":[],"subTotal":"0","discount":"0","total":"0","totalShipping":"0"};
			afterFetchFromCart(data , itemIndex);
		}
	}
}

function modifyCart(index,productId,addon){
		viewCartData = null; // for viewcart item call will run newly
		viewCartForOmni = null; // for viewcart?isExternal=Y will run newly
		var cartProdIndex = $("#cartItemProd_"+index).val();
		params = 'DELETE_'+cartProdIndex;
		params+= '&productId='+productId;
		$.ajax({
			type : 'POST',
			dataType : 'json',
			async : false,
			global:true,
			url : '/control/deleteitem?'+params,
			success : function(data) {
				if(userDetails && userDetails.cart && addon == 'N'){
					userDetails.cart.cartTotalQuantity=userDetails.cart.cartTotalQuantity - 1;
				}
				updateCartItem(userDetails);
				getCart(false , 0);
			}
		});
		if (typeof cartRemoveOmni == 'function') {
			cartRemoveOmni(index);
		}
}

function updateAddOnQuantity(productId,quantitys,itemIndex,increaseFlag){
	var quantity = quantitys;
	viewCartData = null;
	if(increaseFlag == "Y"){
		quantity = quantity + 1;
	}
	if(increaseFlag == "N"){
		quantity = quantity - 1;
	}
	var productId_quantity = productId+"_"+quantity;
	var itemIndex = itemIndex;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		global: true,
		async : false,
		url : '/control/updateAddonQuantityProduct?productId_quantity='+productId_quantity+'&itemIndex='+itemIndex,
		success : function(data) {
			getCart(false ,itemIndex);
		},
		error: function(){
			fetchFaild();
	    }

	});
}
function fetchFaild(error){
	console.log("Error occured while fetching shopping cart items from the server.");
};

function checkFnpUserLoggedIn(){
	var fullname = null;
	var username = null;
	$(".tempspan").remove();
	 if (userDetails && userDetails.checklogin && userDetails.checklogin.loggedin) {
		 loggedIn = true;
         fullname = "Hi " + userDetails.checklogin.fullname;
         if(fullname.length > 10){
        	 $("#account").addClass("loaded");
         }
         $('#accountbtn').prop('title', fullname);
         username = userDetails.checklogin.fullname;
		 $('#sign-out').show();
		 $('#change-password').show();
         $('#CRMID_TRACK').val(userDetails.checklogin.crmId);
         $('#userType').val(userDetails.checklogin.userType);
         $('#cfname').val(userDetails.checklogin.fullname);
         handleLogin();
         if (typeof digitalData != "undefined") {
             if (typeof digitalData.page != "undefined")
                 digitalData.page.loginStatus = "logged in";
             populateCustomerData(userDetails.checklogin.oracleContactId1, userDetails
                 .checklogin.userLoginId, userDetails.checklogin.phone);
         }
         var isCustomizedOption = userDetails.checklogin.isCustomizedOption
         if (isCustomizedOption != null && isCustomizedOption != undefined &&
             isCustomizedOption == true) {
             var customizedLevel = userDetails.checklogin.agentOptions.name;
             var customizedUrl = userDetails.checklogin.agentOptions.url;
             $('#otherOptions').html(
                 "<a id='customProdLink' title='Customize Product' href='" +
                 customizedUrl + "'>" + customizedLevel + "</a>");
         }
         isOAuthUser = userDetails.checklogin.isOAuthUser;

	}else{
		 if (window.location.href.indexOf("account") < 0) {
             $('#loggedinuser').addClass('removeafter');
         }
		 $('#accountbtn').prop('title', 'Login to manage your account');
     	 fullname = "Account";
         username = "Hi Guest <span id='login-link'><a href='/account/my-account'>Login</a></span>";
         $('#sign-out').hide();
         $('#change-password').hide();
	}
	$("#guest-li").html(username)
	$("#user-name").text(fullname);
	//removeEarlyABC(userDetails);
}

function handleLogin() {
    var toolbarButtonIds = ["accountbtn", "cartbtn", "currencybtn", "quicksearchbtn"];
    var button = __(toolbarButtonIds[0]);
    if(button){
        button.fnp_targetId = "accountdropdown";
        button.fnp_targetEle = __(button.fnp_targetId);
	}
    $("#login").removeAttr("modalname").removeClass("close-reveal-modal").off();
    $("#login").on('click', function() {
    	$(".toolbardialog").foundation('reveal', 'close');
    	$('.logindropdown').slideToggle();
    });
}
//cart hover
$("#cart").hover(function(){
	$(".popup-background, #cartpanel").show();
	$('select').blur();
},function(){
	$(".popup-background, #cartpanel").hide();
});

var currentPageType = "";
//fnpApp is defined in fnp.js

fnpApp.constant('SERVICE_URL','/control/')
.controller('CartCntrl',CartCntrl)
.factory("CartService",CartService);

/**
* Cart Model or Services
*/

function CartService($resource){
	return {
		storeDeliveryAddress:storeDeliveryAddress,
		applyCouponCode:applyCouponCode,
		removeCouponCode:removeCouponCode,
	};
	function applyCouponCode(appyCouponURL){
		//var resource = $resource(SERVICE_URL + '/applyCouponCode');
   //return resource.save(param).$promise;
   var request = $resource(appyCouponURL);
		return request.save().$promise;
	}
	
	function removeCouponCode(removeCouponURL){
   var request = $resource(removeCouponURL);
		return request.save().$promise;
	}
	
	function storeDeliveryAddress(param){
		 var resource = $resource(SERVICE_URL + '/storeDeliveryAddress');
		 return resource.save(param).$promise;
	
	}
	
}		

/**
* Cart Controller
*/
function CartCntrl($window,$location,$scope,CartService,LoginService,$rootScope){
	var app=this;
	var discountAmount = $window.discountAmount;
	app.submitForm = function(formObj, formId){
	    if(formObj.$valid) {
	    	var submitButton = $("#"+ formId).find("input[type='submit']");
	    	if(submitButton){
	    		submitButton.prop('disabled', true);
		    	submitButton.addClass("loadinggif");
	    	}
	    	jQuery("#" + formId).submit();
	    }else{		 	 
	    	formObj.$submitted = true;
	    	var $firstEle = angular.element(".ng-invalid:eq(1)");
		    if($firstEle) {
				$(window).scrollTop($firstEle.offset().top-$firstEle.height()-100);
			}
	    	event.preventDefault();		  
		}
	};
	discountAmount = parseInt(discountAmount);
	if(discountAmount == 0){
		app.validDiscount = false;
	}else{
	 	app.validDiscount = true;
	}
	app.showcoupon=false;
	app.showcouponform=$window.showcouponform;
	app.couponCode=$window.couponCode;
	app.showdiscount = $window.showdiscount;
	app.showremove = $window.showremove;
	$rootScope.cart={};
	app.showAdjustmentForm  = $window.showAdjustmentForm;
	app.adjustmentAmountToshow = $window.adjustmentAmountToshow;
	app.currentUrl=null;
	if(app.currentUrl == null || app.currentUrl == "") {
		app.currentUrl = currentPageType
	}
	app.fetchFailed= function(error){
		console.log("Error occured while fetching shopping cart items from the server.");
	};
	app.applycoupon=function (param){	
	ajaxindicatorstart('');
	app.couponCode = param;
	CartService.applyCouponCode('/control/applyCouponCode?productPromoCodeId='+param).then(function(data){
		  if(data!=null && data.isSuccess){
			  app.showcoupon=false;
			  app.showcouponform=false;
			  //app.showdiscount=!app.showdiscount;
			  app.showremove = true;
			  //Reloading the page just to reflect the changes in the UI which are updated in the cart.
			  location.reload();
		  }else{
			  var errorMsg = data.errorMsg;
			  if(errorMsg == undefined){
				  errorMsg = "The coupon code is not valid. Please try another code";
				  $(".couponError").html(errorMsg);
				  $(".couponError").show().fadeOut(4000); 
			  }else{
				  $(".couponError").html(errorMsg);
				  $(".couponError").show().fadeOut(4000);
			  }
         ajaxindicatorstop();
		  }
     
	  }, "");
	};
	
	app.removecoupon=function (param){
   ajaxindicatorstart('');
		  CartService.removeCouponCode('/control/removePromotion?promoCode='+param).then(function(data){
				  location.reload();
		  }, "");
	};
	
	app.addAdjustment = function (param){
		  app.couponCode = param;
		  CartService.applyCouponCode('/control/addManualAdjustMent?amount='+param).then(function(data){
			  if(data!=null && data.isSuccess){
				  app.showAdjustmentForm=false;
				  //Reloading the page just to reflect the changes in the UI which are updated in the cart.
				  location.reload();
			  }else{
				  var errorMsg = data.errorMsg;
				  $(".adjustmenterror").html(errorMsg);
				  $(".adjustmenterror").show();
			  }
		  }, "");
	};
	
	app.removeAdjustment=function (formId){
		jQuery("#"+formId).submit();
	}; 
}