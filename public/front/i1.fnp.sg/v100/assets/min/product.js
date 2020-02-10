<!-- Common js across all pages:START -->
//request url as global variable
var AJAX_URL_LIST = {currencyUrl: cdnHost+"/control/getCurrencies", reminderUrl:cdnHost+"/control/getOccasionReminder",catalogUrl:cdnHost+"/control/getDefaultCatalogId" }; 

var AJAX_JSON_URL_LIST = {cityNamesUrl: cdnJSONHost+"/control/getGeoCityNames", searchTermSuggestionsUrl:cdnJSONHost+"/control/getSearchTermSuggetions",productListingUrl:cdnJSONHost+"/control/productlisting",youMayAlsoLikeUrl: cdnJSONHost+"/control/youmayalsolike",jcUrl: cdnJSONHost+"/control/jc", availablePincodeUrl: cdnJSONHost+"/control/getAvailablePinCodes" };


var AJAX_JSON_URL_LIST_INTL = {cityNamesUrl: cdnINTLHostName+"/control/getGeoCityNames", searchTermSuggestionsUrl:cdnINTLHostName+"/control/getSearchTermSuggetions",productListingUrl:cdnINTLHostName+"/control/productlisting",youMayAlsoLikeUrl: cdnINTLHostName+"/control/youmayalsolike",jcUrl: cdnINTLHostName+"/control/jc", availablePincodeUrl: cdnINTLHostName+"/control/getAvailablePinCodes" };

var SOURCE_MAPPINGS = {ONLN_DSKTP_AFLT_NT: [], ONLN_DSKTP_ALLIANCE: [], ONLN_DSKTP_EMAIL: [], ONLN_DSKTP_ORGANIC: [], ONLN_DSKTP_OTHERS: [], ONLN_DSKTP_PPC: []};

var DCR_HOST = document.location.href.indexOf("fnp.com") >= 0 ? "http://acs.fnp.com" : "";
var MAX_SUGGESTIONS = 5;
var AUTOCOMPLETE_DELAY = 300;
var quickShopDeliveryCutoffTime = 17; /* Setting default as 5pm */
var toolbarButtons = {};
var commonDialog = null;
var prev = "";
var popSearchData = [];
var qsList = {qscity: [], qsoccasion: [], qsdate: []};
var dateFormat = "dd-mm-yy";
//hack to disable Modernizr for foundation
var Modernizr = new Object();
$(document).ready(function() {
	// IE browser not selecting options by default. So, Manually Fixed for IE browser
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
		$('input').on('focus',function(){
			var inputId = $(this).attr('id');
			if(inputId == 'qscity' || inputId == 'qsoccasion' || inputId == 'qsdate' || inputId == 'fnpsearch'){
				$(this).val(' ');
			}
		})
	}
	/// fetching search value from cookie
    if (fnpPageType == "search" || fnpPageType == "category" || fnpPageType == "confirmorder" ||
        fnpPageType == "home" || fnpPageType == "info" || fnpPageType == "myaccount" || fnpPageType == "product" ) {
        var fnpsearch = getCookie("fnpsearch");
        if (fnpsearch != undefined && fnpsearch != false && fnpsearch != null) {
            $("#fnpsearch").val(fnpsearch);
        }
    }
    /// setting search value in cookie with fnpsearch
	$("#searchform").submit(function(event) {
	    var cookievalue = $('#fnpsearch').val();
	    setCookie('fnpsearch', cookievalue, 7, "/");
	});
	//on page scroll-up smooth hiding over third menu-bar in header
	var lastScroll = 0;
	$(window).scroll(function(){
		setTimeout(function() { //give them a second to finish scrolling before doing a check
			var scroll = $(window).scrollTop();
			if (scroll > lastScroll + 10) {
				$("#navmenubar").slideUp();
			} else if (scroll < lastScroll) {
				$("#navmenubar").slideDown();				
			}
			lastScroll = scroll;
		}, 10);
    });
    showcrossIcon();
    //header Component hover elements functionality(currency, account, more)
    //account hover
    $("#account").hover(function(){
    	$("#account-dropdown").show();
    },function(){
    	$("#account-dropdown").hide();
    });
    //cart hover
    $("#cart").hover(function(){
    	$(".popup-background, #cartpanel").show();
    	$('select').blur();
    },function(){
    	$(".popup-background, #cartpanel").hide();
    });
    //Currency Hover
    $("#currency").hover(function(){
    	$(".currency-dropdown").show();
    },function(){
    	$(".currency-dropdown").hide();
    });
    $(".currency-dropdown").on("click", function() {
    	$(".currency-dropdown").hide();
    });
    //More Hover
    $("#enquire").hover(function(){
    	$("#enquire-dropdown").show();
    },function(){
    	$("#enquire-dropdown").hide();
    });
    if(getCookie("loginMessage") && "Y" == getCookie("loginMessage")){
    	displayLoginMessage();
    }
    var cartpopup = getCookie("cartpopup");
    if(cartpopup && cartpopup == 'Y'){
    	$(".popup-background, #cartpanel").show();
    	delete_cookie('cartpopup');
    }
});
$("#searchFormButton").on("click", function() {
    $("#searchform").submit();
});
//on click on any where out of search input close down drop-down.
$("#searchform").submit(function() {
    if ($("#searchform input[name='qs']") != null && $("#searchform input[name='qs']").val().length <= 0) {
    	triggerCategoryHints(this);
        $("#searchform input[name='qs']").focus();
        return false;
    }
    return true;
});
function __(eleId){
    return document.getElementById(eleId);
}
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}
function fnpInitialize(){
    initializeQuickShop();
}
function initializeToolbarButtonActions(){
    var toolbarButtonIds = ["cartbtn","accountbtn"];
    var toolbarButtonTargetIds = ["cartpanel","accountpanel"];
    var shownInCommonDialog = [true, true];
    for(var i = 0; i < toolbarButtonIds.length; i++){
        var button = __(toolbarButtonIds[i]);
        if(button){ 
	        button.fnp_targetId = toolbarButtonTargetIds[i];
	        button.fnp_targetEle = __(button.fnp_targetId);
	        button.fnp_Clicked = false;
	        button.fnp_isShownInCommonDialog = shownInCommonDialog[i];
	        toolbarButtons[toolbarButtonIds[i]] = button;
        }
    }
    commonDialog = __("commondialogs");
}
function initializeQuickShop(){
	$("#qsdate").datepicker({
		dayNamesMin : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
		dateFormat : "D M, dd",
		minDate : (new Date().getHours()) < parseInt(quickShopDeliveryCutoffTime) ? 0 : 1,
		maxDate : '+45',
		showOtherMonths : true,
		selectOtherMonths : true,
		onSelect : function(dateText, inst) {
			var dateAsString = dateText; // the first parameter of this function
			var selectedYear = inst.currentYear;
			var newDateFormat = $.datepicker.parseDate("D M, d,yy", dateAsString+','+selectedYear);
			$("input[name='deliverydate']").val($.datepicker.formatDate(dateFormat, newDateFormat));
			$(this).parents(".quickfrm").find("button.quickshopbtn").prop("disabled", false);
			__("quickshophelper").removeAttribute("class");
		},
         beforeShow:function(){
             $('#qsform').append($('#ui-datepicker-div.smalldatepicker'));
         }

	});
	$("#ui-datepicker-div").addClass("smalldatepicker");
}
function nextDay(dateValue){
    return new Date(dateValue.getTime() + 86400 * 1000);
}
function checkButtonStates(event){
    //we are interested only when one of the toolbar buttons is clicked
	if (typeof getCurrentlyClickedToolbarButton != "undefined"){
		var toolbarButton = getCurrentlyClickedToolbarButton();
	    if(toolbarButton){
	        //if the event is not inside target then unclick
	            if (!toolbarButton.fnp_targetEle.contains(event.target) && !event.target.isInCommonDialog && event.target.className.indexOf('datepicker') < 0 ) {
	            	if(event.target.className.indexOf("show_login_form")>=0 || $(event.target).parents("#cartcontent").length)
	            		return false;
	            	toolbarButtonUnclicked(toolbarButton);
	            }
	    }
	}
    if (__("qsform")!=null && !__("qsform").contains(event.target) && event.target.parentElement && event.target.parentElement.id != "qsuggestions" && event.target.className.indexOf('datepicker') < 0 ) {
        __("quickshophelper").removeAttribute("class");
    }
}
function toolbarButtonClicked(button, event){
    if(button.fnp_Clicked) return; // it is already clicked, dont do anything... unclick is taken care of by document.click
    if(event){
        if(event.stopPropagation)
            event.stopPropagation();
        else
            event.cancelBubble = true;
    }
    var toolbarButton = getCurrentlyClickedToolbarButton();
    if(toolbarButton){
        toolbarButtonUnclicked(toolbarButton);
        setTimeout(function(){toolbarButtonClicked(button, event);}, 300);
        return;
    }
    button.fnp_Clicked = true;
    button.fnp_targetEle.className = "opened";
    if(button.id == "quicksearchbtn") {
        button.fnp_targetEle.className = "opened clipped";
        __("qscity").focus();
    }
    if(button.fnp_isShownInCommonDialog){
        commonDialog.className = "opened" + button.id;
    }
}
function toolbarButtonUnclicked(button){
    button.fnp_Clicked = false;
    if(button.id == "quicksearchbtn")
        button.fnp_targetEle.className = "clipped";
    else {
        if(button.className == 'close-reveal-modal')  //for 'X'-Icon
            $('#commondialogs, #commondialogs>div').removeAttr("class");
        else
            button.fnp_targetEle.removeAttribute("class");
    }
    if(button.fnp_isShownInCommonDialog){
        commonDialog.removeAttribute("class");
    }
}
function displaySuggestionMessage(qsInput, message){
    if(message){
        __("quickshopmsg").innerHTML = message;
    }
    else if(qsInput.id == "qsdate"){
        __("quickshopmsg").innerHTML = "Choose from above list or start typing and choose from the suggestions shown or <a href='javascript:void(0)' onclick='chooseDateForQS()'>choose date from calendar</a>";
    }
    else {
        __("quickshopmsg").innerHTML = "Choose from above list or start typing and choose from the suggestions shown";
    }
}
function validateQSForm(qsForm, event){
    var inputGiven = false;
    for(var qsInputId in qsList){
        var qsInputEle = __(qsInputId);
        if(qsInputEle.value.trim().length > 0){
            inputGiven = true;
            break;
        }
    }
    if(!inputGiven){
        //first clear the suggestions
        var qsEle = __("qsuggestions");
        while (qsEle.firstChild) qsEle.removeChild(qsEle.firstChild);
        __("quickshophelper").className = "qssubmiterror";
        displaySuggestionMessage(qsForm, "<span class='error'>Please select either city or occasion or delivery date.</span>");
        return false;
    }
    return true;
}

$(".search-clear-pin").on("click", function () {
    document.getElementById("fnpsearch").value = '';
    $('.search-clear-pin').hide();
});
function showcrossIcon(){
    if($("#fnpsearch").length && document.getElementById("fnpsearch").value.trim()){
        $('.search-clear-pin').show();
    }else{
        $('.search-clear-pin').hide();  
    }
}
function triggerCategoryHints(searchInput){
    showcrossIcon();
    var value = document.getElementById("fnpsearch").value.trim().length;
	if(value == 0) {
		searchInput.removeAttribute("class");
		searchInput.isTyping = false;
		getPopularSearchList();
		$('.showhints').slideDown();
	}else if(!searchInput.isTyping){
		__("searchhintlistlabel").className = "";
        searchInput.isTyping = true;
        showCategoryHints();
    }
}
function getPopularSearchList() {
	var currentCatalogId = $("#FNP_CURRENT_CATALOG_ID").val();
	if(popSearchData.length == 0) {
		$.ajax({
			url : '/control/getPopularSearchData',
			type : 'GET',
			async: true,
			global:false,
			dataType : "json",
			data: {
                "contentId" : "popular_search",
                "currentCatalogId" : currentCatalogId
            },
            success : function( data ) {
				popSearchData = [];
				$(data.data).each(function(index, ele){
					if($(ele).find(".ps-item")[0]!=undefined){
						var label = $(ele).find(".ps-item").html();
						var value = $(ele).find(".ps-item").attr("href")
						var hintItem = new Object();			
						hintItem.label = label;
						hintItem.value = value;
						hintItem.addClass = "popular-search-item";
						//(index == (dataLength-1))?hintItem.isLast = true:hintItem.isLast = false;
						popSearchData.push(hintItem);
					}
				});
				if(popSearchData.length > 0){
					__("searchhintlistlabel").className = "popularsearch";
					__("searchhintlistdiv").className = "showhints";
					
				}else{
					__("searchhintlistlabel").className = "";
				}
				appendListToUls(popSearchData);
			},
		});
	} else {
		appendListToUls(popSearchData);
	}
}

function appendListToUls(respData) {
	if(respData) {
		var shEle = $("#searchhintlist");
		shEle.empty();
	    for(var i = 0; i < respData.length; i++){
	    	var iTag = $('<i/>').addClass('material-icons search-icons');
	    	var liEle = $('<li/>').addClass(respData[i].addClass);
	    	var aEle = $('<a/>').attr('href',respData[i].value);
	    	var spanEle = $('<span />').addClass('popular-search-label').text(respData[i].label);
	        liEle.append(aEle);
	        aEle.append(spanEle);
	        aEle.append(iTag);
	        shEle.append(liEle);
	        $(".search-icons").text("search");
	    }
	}
}

function showCategoryHints(){
    var searchInput = __("fnpsearch");
    var shEle = __("searchhintlist");
    var q = searchInput.value.toLowerCase().trim();
    if( q === ""){
        var shEle = __("searchhintlist");
        while (shEle.firstChild) shEle.removeChild(shEle.firstChild); //first remove all children
    }
    if(searchInput.isTyping){
        __("searchhintlistdiv").className = "showhints";
        searchInput.className = "istyping";
        var prevVal = searchInput.prevVal;
        searchInput.prevVal = searchInput.value;
        if(searchInput.value == prevVal){
            //user has stopped / slowed down typing, mark as such
            searchInput.isTyping = false;
        }
        else{
            $.ajax({
                global: false,
                url: AJAX_JSON_URL_LIST.searchTermSuggestionsUrl,
                dataType: "json",
                data: {
                    qs: q.toLocaleLowerCase(),
                    FNP_CURRENT_CATALOG_ID: $("#FNP_CURRENT_CATALOG_ID").val()
                },
                success: function (data) {
                    var resultset = [];
                    while (shEle.firstChild) shEle.removeChild(shEle.firstChild); //first remove all children
                    if(prev == searchInput.value){
                    	shEle.style.display ="block";
                    	if (data != null && resultset.length < 9 && q.length > 0) {
                            loadCategoryType("productType", data.productType, resultset);
                            if (data.occasion)
                                loadCategoryType("occasion", data.occasion, resultset);
                        }
                    	if(q.length == 0){
                            __("searchhintlistlabel").className = "scountempty";
                        }
                        else
                        __("searchhintlistlabel").className = "scount" + resultset.length;
                    }
                    searchInput.categoryHintsHandle = setTimeout(function(){
                    	var value = document.getElementById("fnpsearch").value.trim().length;
                    	if(value > 0){
                    		__("searchhintlistlabel").className = "";
                    		showCategoryHints();
                    		$('.showhints').slideDown();
                    	}else {
                    		__("searchhintlistlabel").className = "popularsearch";
                    		getPopularSearchList();
                    	}
                    });
                 
                },
            });
        }
    }
    prev = searchInput.prevVal;
    if(!searchInput.isTyping){
        searchInput.removeAttribute("class");
    }
    if(q.length == 0){
        __("searchhintlistlabel").className = "scountempty";
    }
}
function hideSearchHints(searchInput, event){
    var searchHintlistDiv = __("searchhintlistdiv");
    if(!searchHintlistDiv.contains(event.relatedTarget)){
    	$(".showhints").fadeOut();
    	
    }
}
function proceedCart(url){
	createForm({formTypeDetails : {id:"checkout-login",type : "POST",action : url, submit : true},formInputElements : [{name : "fnpSalesChannelEnumId" , value : "ONLN_DSKTP_DIRECT"}]});
}
// Dynamic form submission
function createForm(formElements) {
    var formDetails = formElements.formTypeDetails;
    var elementsInForm = formElements.formInputElements || [];
    var formToCreate = document.createElement('FORM');
    formToCreate.id = formDetails.id;
    formToCreate.name = formDetails.name;
    formToCreate.method = formDetails.type;
    formToCreate.action = formDetails.action;
    for(var i=0; i<elementsInForm.length; i++) {
        inputElement=document.createElement('INPUT');
        inputElement.type='HIDDEN';
        inputElement.name=elementsInForm[i].name;
        inputElement.value=elementsInForm[i].value;
        inputElement.id=elementsInForm[i].id;
        formToCreate.appendChild(inputElement);
    }
    document.body.appendChild(formToCreate);
    if(formDetails.submit)
        document.getElementById(formDetails.id).submit();
}


function check(e) {
    //Check Charater
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode == 46) return false;
    if (unicode != 8)
        if ((unicode < 48 || unicode > 57) && unicode != 46) return false;
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
			var match = suggestions[i].label.toLowerCase().indexOf(q) >=0 || suggestions[i].value.toString().toLowerCase().indexOf(q) >=0;
			if(match){
				if((suggestions[i].label.toLowerCase().indexOf(q) ==0 || suggestions[i].value.toString().toLowerCase().indexOf(q) ==0) && qsInput.id != "qsdate")
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
		if(qsInput.id == "qsdate"){
			var monthNames = [
				"Jan", "Feb", "Mar",
				"Apr", "May", "Jun", "Jul",
				"Aug", "Sep", "Oct",
				"Nov", "Dec"
			];
			var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			var dayIndex = d.getDay();
			var monthIndex = d.getMonth();
			$("input[name='deliverydate']").val($.datepicker.formatDate(dateFormat,d));
			qsInput.value =  dayNames[dayIndex]  + " " + monthNames[monthIndex] + ", " + d.getDate();
		} else if (qsInput.id == "qscity"){
			qsInput.value = event.target.dataLabel;
			$('#qscityid').val(d.toLowerCase());
		} else {
			qsInput.value = d.toLowerCase();
		}
		__("quickshophelper").removeAttribute("class");
        qsInput.nextElementSibling.focus();
    }
}

function loadQsSuggestions(qsInput) {
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
			liEle.dataValue = suggestions[i].value;
			liEle.dataLabel = suggestions[i].label;
			liEle.appendChild(document.createTextNode(suggestions[i].label));
			liEle.isInCommonDialog = true;
		qsEle.appendChild(liEle);
	}
	if(suggestions.length == 0){
		var message = "<span class='error'>No matches found.  Please check your spelling.</span>";
		displaySuggestionMessage(qsInput, message);
	}
	else {
		displaySuggestionMessage(qsInput);
	}
	if(moreSuggestionsExist){
		qsEle.className = "giftfindercitylisting";
	}
}
String.prototype.contains || (String.prototype.contains=function(){
	return -1!==String.prototype.indexOf.apply(this,arguments)
})

//TODO change these to jquery
//document.onclick = checkButtonStates;
//window.onload = fnpInitialize;
document.addEventListener("click", checkButtonStates);
window.addEventListener("load", fnpInitialize);
//removed from the closehtmlbody.ftl added here 
//"undefined" != typeof finishPageLoad && document.addEventListener("DOMContentLoaded", finishPageLoad);
function displayLoginMessage() {
	$("#login-message").show();
	setTimeout(function() {
		$('#login-message').fadeOut('fast');
	}, 2000);
}
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

<!-- Common js across all pages:END -->
<!-- Page specific js:START -->
/*!
 * jQuery Validation Plugin v1.14.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2015 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend($.fn, {
	// http://jqueryvalidation.org/validate/
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.on( "click.validate", ":submit", function( event ) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = event.target;
				}

				// allow suppressing validation by adding a cancel class to the submit button
				if ( $( this ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			});

			// validate the form on submit
			this.on( "submit.validate", function( event ) {
				if ( validator.settings.debug ) {
					// prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden, result;
					if ( validator.settings.submitHandler ) {
						if ( validator.submitButton ) {
							// insert a hidden input as a replacement for the missing submit button
							hidden = $( "<input type='hidden'/>" )
								.attr( "name", validator.submitButton.name )
								.val( $( validator.submitButton ).val() )
								.appendTo( validator.currentForm );
						}
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator, errorList;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			errorList = [];
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
				errorList = errorList.concat( validator.errorList );
			});
			validator.errorList = errorList;
		}
		return valid;
	},

	// http://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			settings, staticRules, existingRules, data, param, filtered;

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );
				// remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
					if ( method === "required" ) {
						$( element ).removeAttr( "aria-required" );
					}
				});
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
			$( element ).attr( "aria-required", "true" );
		}

		// make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param });
		}

		return data;
	}
});

// Custom selectors
$.extend( $.expr[ ":" ], {
	// http://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},
	// http://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		return !!$.trim( "" + $( a ).val() );
	},
	// http://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		});
	});
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {
			// Avoid revalidate the field when pressing one of the following keys
			// Shift       => 16
			// Ctrl        => 17
			// Alt         => 18
			// Caps lock   => 20
			// End         => 35
			// Home        => 36
			// Left arrow  => 37
			// Up arrow    => 38
			// Right arrow => 39
			// Down arrow  => 40
			// Insert      => 45
			// Num lock    => 144
			// AltGr key   => 225
			var excludedKeys = [
				16, 17, 18, 20, 35, 36, 37,
				38, 39, 40, 45, 144, 225
			];

			if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
				return;
			} else if ( element.name in this.submitted || element === this.lastElement ) {
				this.element( element );
			}
		},
		onclick: function( element ) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date ( ISO ).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				});
			});
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			});

			function delegate( event ) {
				var validator = $.data( this.form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this, event );
				}
			}

			$( this.currentForm )
				.on( "focusin.validate focusout.validate keyup.validate",
					":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
					"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
					"[type='radio'], [type='checkbox']", delegate)
				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
			}

			// Add aria-required to any Static/Data/Class required fields before first validation
			// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
			$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
		},

		// http://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend({}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// http://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				result = true;

			this.lastElement = checkElement;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				result = this.check( checkElement ) !== false;
				if ( result ) {
					delete this.invalid[ checkElement.name ];
				} else {
					this.invalid[ checkElement.name ] = true;
				}
			}
			// Add aria-invalid status for screen readers
			$( element ).attr( "aria-invalid", !result );

			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[ name ],
						element: this.findByName( name )[ 0 ]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				});
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			var i, elements = this.elements()
				.removeData( "previousValue" )
				.removeAttr( "aria-invalid" );

			if ( this.settings.unhighlight ) {
				for ( i = 0; elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ],
						this.settings.errorClass, "" );
				}
			} else {
				elements.removeClass( this.settings.errorClass );
			}
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {
				count++;
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
					.filter( ":visible" )
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			}).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea" )
			.not( ":submit, :reset, :image, :disabled" )
			.not( this.settings.ignore )
			.filter( function() {
				if ( !this.name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ this.name ] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var val,
				$element = $( element ),
				type = element.type;

			if ( type === "radio" || type === "checkbox" ) {
				return this.findByName( element.name ).filter(":checked").val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? false : $element.val();
			}

			val = $element.val();
			if ( typeof val === "string" ) {
				return val.replace(/\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				}).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule;

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {

					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					if ( e instanceof TypeError ) {
						e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
					}

					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, method ) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customDataMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[ method ],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}
			this.errorList.push({
				message: message,
				element: element,
				method: rule.method
			});

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map(function() {
				return this.element;
			});
		},

		showLabel: function( element, message ) {
			var place, group, errorID,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );
			if ( error.length ) {
				// refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
				// replace message on existing label
				error.html( message );
			} else {
				// create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement( place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {
					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );
				} else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby

					errorID = error.attr( "id" ).replace( /(:|\.|\[|\]|\$)/g, "\\$1");
					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + errorID + "\\b" ) ) ) {
						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						$.each( this.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + name + "']", this.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						});
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.idOrName( element ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// aria-describedby should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
			}
			return this
				.errors()
				.filter( selector );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + name + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
				this.formSubmitted = false;
			}
		},

		previousValue: function( element ) {
			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		},

		// cleans up all forms and elements, removes validator-specific events
		destroy: function() {
			this.resetForm();

			$( this.currentForm )
				.off( ".validate" )
				.removeData( "validator" );
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ]);
				}
			});
		}
		return rules;
	},

	normalizeAttributeRule: function( rules, type, method, value ) {

		// convert the value to a number for number inputs, and for text for backwards compability
		// allows type="date" and others to be compared as strings
		if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
			value = Number( value );

			// Support Opera Mini, which returns NaN for undefined minlength
			if ( isNaN( value ) ) {
				value = undefined;
			}
		}

		if ( value || value === 0 ) {
			rules[ method ] = value;
		} else if ( type === method && type !== "range" ) {

			// exception: the jquery validate 'range' method
			// does not test for the html5 'range' type
			rules[ method ] = true;
		}
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );

				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}

				// force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}

		// maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
			this.normalizeAttributeRule( rules, type, method, value );
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {
		// handle dependency check
		$.each( rules, function( prop, val ) {
			// ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[ prop ];
				}
			}
		});

		// evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
		});

		// clean number parameters
		$.each([ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		});
		$.each([ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
				}
			}
		});

		if ( $.validator.autoCreateRanges ) {
			// auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	methods: {

		// http://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {
			// check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {
				// could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return value.length > 0;
		},

		// http://jqueryvalidation.org/email-method/
		email: function( value, element ) {
			// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// http://jqueryvalidation.org/url-method/
		url: function( value, element ) {

			// Copyright (c) 2010-2013 Diego Perini, MIT licensed
			// https://gist.github.com/dperini/729294
			// see also https://mathiasbynens.be/demo/url-regex
			// modified to allow protocol-relative URLs
			return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
		},

		// http://jqueryvalidation.org/date-method/
		date: function( value, element ) {
			return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
		},

		// http://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// http://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// http://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// http://jqueryvalidation.org/creditcard-method/
		// based on http://en.wikipedia.org/wiki/Luhn_algorithm
		creditcard: function( value, element ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}
			// accept only spaces, digits and dashes
			if ( /[^0-9 \-]+/.test( value ) ) {
				return false;
			}
			var nCheck = 0,
				nDigit = 0,
				bEven = false,
				n, cDigit;

			value = value.replace( /\D/g, "" );

			// Basing min and max length on
			// http://developer.ean.com/general_info/Valid_Credit_Card_Types
			if ( value.length < 13 || value.length > 19 ) {
				return false;
			}

			for ( n = value.length - 1; n >= 0; n--) {
				cDigit = value.charAt( n );
				nDigit = parseInt( cDigit, 10 );
				if ( bEven ) {
					if ( ( nDigit *= 2 ) > 9 ) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return ( nCheck % 10 ) === 0;
		},

		// http://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length >= param;
		},

		// http://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length <= param;
		},

		// http://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// http://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// http://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $( param );
			if ( this.settings.onfocusout ) {
				target.off( ".validate-equalTo" ).on( "blur.validate-equalTo", function() {
					$( element ).valid();
				});
			}
			return value === target.val();
		},

		// http://jqueryvalidation.org/remote-method/
		remote: function( value, element, param ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			var previous = this.previousValue( element ),
				validator, data;

			if (!this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = this.settings.messages[ element.name ].remote;
			this.settings.messages[ element.name ].remote = previous.message;

			param = typeof param === "string" && { url: param } || param;

			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ].remote = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.prepareElement( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						delete validator.invalid[ element.name ];
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, "remote" );
						errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}
	}

});

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;
// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter(function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			pendingRequests[port] = xhr;
		}
	});
} else {
	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			pendingRequests[port] = ajax.apply(this, arguments);
			return pendingRequests[port];
		}
		return ajax.apply(this, arguments);
	};
}

}));
/*
 * jQuery SliderTabs v1.1
 * http://lopatin.github.com/sliderTabs
 *
 * Copyright 2012, Alex Lopatin
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
$(document).ready(function(e) {
    $('.touchtarget').click(function(){
                $(this).addClass('selected');
        });
});
 (function( $ ){
        /*
         * The sliderTabs tabs class
         */
        $.sliderTabs = function(container, options){
                var plugin = this;

                var defaults = {
                        autoplay: false,
                        tabArrowWidth: 35,
                        classes: {
                                leftTabArrow: '',
                                panel: '',
                                panelActive: '',
                                panelsContainer: '',
                                rightTabArrow: '',
                                tab: '',
                                tabActive: '',
                                tabsList: ''
                        },
                        defaultTab: 1,
                        height: null,
                        indicators: false,
                        mousewheel: true,
                        position: "top",
                        panelArrows: false,
                        panelArrowsShowOnHover: false,
                        tabs: true,
                        tabHeight: 30,
                        tabArrows: true,
                        tabSlideLength: 100,
                        tabSlideSpeed: 200,
                        transition: 'slide',
                        transitionEasing: 'easeOutCubic',
                        transitionSpeed: 500,
                        width: null
                };

                // jQuery objects of important elements
                var $container = $(container),
                        $indicators,
                        $tabsList,
                        $contentDivs,
                        $tabsListContainer,
                        $tabsListWrapper,
                        $contentDivsContainer,
                        $leftTabArrow,
                        $rightTabArrow,
                        $leftPanelArrow,
                        $rightPanelArrow;

                // Locks to stop out of sync behavior
                var selectLock = false,
                        heightLock = true;

                var settings, minMargin;

                // Index of currently selected tab
                plugin.selectedTab = defaults.defaultTab;

                plugin.init = function(){
                        settings = plugin.settings = $.extend({}, defaults, options);
                        $container.addClass('ui-slider-tabs');

                        /*
                         * Rebuild structure of container
                         */
                        $contentDivs = $container.children("div").addClass('ui-slider-tab-content').remove();

                        // Tabs
                        $tabsList = $container.children("ul").addClass('ui-slider-tabs-list').remove();
                        $tabsList.children("li").remove().appendTo($tabsList);
                        plugin.count = $tabsList.children('li').length;
                        $tabsListWrapper = $("<div class='ui-slider-tabs-list-wrapper'>");
                        $tabsListContainer = $("<div class='ui-slider-tabs-list-container'>").append($tabsList).appendTo($tabsListWrapper);
                        $tabsListContainer.find('li').css('height', settings.tabHeight+2);
                        $tabsListContainer.find('li a').css('height', settings.tabHeight+2);

                        // Tab arrows
                        $leftTabArrow = $("<a href='#' class='ui-slider-left-arrow'><div></div></a>").css({
                                'width': settings.tabArrowWidth,
                                'height': settings.tabHeight+2
                        }).appendTo($tabsListContainer).click(function(e){
                                plugin.slideTabs('right', settings.tabSlideLength);
                                return false;
                        });
                        $rightTabArrow = $("<a href='#' class='ui-slider-right-arrow'><div></div></a>").css({
                                'width': settings.tabArrowWidth,
                                'height': settings.tabHeight+2
                        }).appendTo($tabsListContainer).click(function(e){
                                plugin.slideTabs('left', settings.tabSlideLength);
                                return false;
                        });

                        // Content container
                        $contentDivsContainer = $("<div class='ui-slider-tabs-content-container'>").append($contentDivs);

                        // Position the tabs on top or bottom
                        if(settings.position == 'bottom')
                                $container.append($contentDivsContainer).append($tabsListWrapper.addClass('bottom'));
                        else
                                $container.append($tabsListWrapper).append($contentDivsContainer);


                        if(settings.width)
                                $container.width(parseInt(settings.width));
                        if(settings.height)
                                $contentDivsContainer.height(parseInt(settings.height)- settings.tabHeight);

                        // Create and show indicators
                        if(settings.indicators)
                                plugin.showIndicators();


                        // Select default tab
                        plugin.selectTab(settings.defaultTab);
                        plugin.slideTabs('left', 0);

                        reorderPanels();

                        resizePanels();

                        // When tab is clicked
                        $container.delegate('.ui-slider-tabs-list li a', 'click', function(){
                                if(!$(this).parent().hasClass('selected') && !selectLock){
                                        plugin.selectTab($(this).parent());
                                }
                                return false;
                        });

                        // When indicator is clicked
                        if($indicators)
                                $indicators.delegate('.ui-slider-tabs-indicator', 'click', function(){
                                        if(!$(this).hasClass('selected') && !selectLock)
                                                plugin.selectTab($(this).index()+1);
                                });

                        // Set classes
                        $.each(settings.classes, function(i, c){
                                switch(i){
                                        case 'leftTabArrow':
                                                $leftTabArrow.addClass(c);
                                                break;
                                        case 'rightTabArrow':
                                                $rightTabArrow.addClass(c);
                                                break;
                                        case 'panel':
                                                $contentDivs.addClass(c);
                                                break;
                                        case 'panelsContainer':
                                                $contentDivsContainer.addClass(c);
                                                break;
                                        case 'tab':
                                                $tabsList.find('li').addClass(c);
                                                break;
                                        case 'tabsList':
                                                $tabsList.addClass(c);
                                                break;
                                        default:
                                                break;
                                }
                        });

                        // Panel arrows
                        // Creates them if they don't exist
                        if(settings.panelArrows)
                                positionPanelArrows();

                        if(settings.panelArrowsShowOnHover){
                                if($leftPanelArrow)
                                        $leftPanelArrow.addClass('showOnHover');
                                if($rightPanelArrow)
                                        $rightPanelArrow.addClass('showOnHover');
                        }

                        $contentDivsContainer.resize(positionPanelArrows);

                        // Make responsive to changes in dimensions
                        $tabsListWrapper.resize(function(){
                                resizeTabsList();
                                resizePanels();
                        });

                        // Resize content container height if inner panels change
                        setInterval(function(){
                                var $panel = $contentDivsContainer.children('.selected');
                                if($panel.outerHeight() > $contentDivsContainer.outerHeight() && heightLock)
                                        resizeContentContainer($panel);
                        }, 100);

                        resizeTabsList();

                        // Hide tabs wrapper if option if false
                        if(!settings.tabs)
                                $tabsListWrapper.hide();

                        // Auto play
                        if(settings.autoplay)
                                setInterval(plugin.next, settings.autoplay);

                        // Panel arrows
                        
                        if(settings.mousewheel){
                        	// Mousehweel
                            $container.bind('mousewheel', function(event, delta, deltaX, deltaY) {
                                if(delta > 0)
                                    plugin.next();
                                    else if(delta < 0)
                                            plugin.prev();
                                    return false;
                            });
                        }
                        
                }

                /*
                 * Public methods
                 */

                // Select tab
                // param: tab is a tab index (1 ... n) or jQuery object of tab li element
                plugin.selectTab = function(tab){
                        heightLock = false;

                        // Find $targetPanel, the panel to show
                        var $clicked = (typeof tab === 'number') ? $tabsList.children("li:nth-child("+tab+")") : tab;
                        var targetId = ($clicked.find('a').attr('href')).substr(1);
                        var $targetPanel = $contentDivsContainer.children("#"+targetId);

                        // Update selected tab
                        plugin.selectedTab = (typeof tab === 'number') ? tab : tab.index()+1;

                        // Resize the main contant container to the size of $targetPanel
                        resizeContentContainer($targetPanel);

                        // Lock selections until transitions finished
                        selectLock = true;

                        // Direction to slide panel on hide
                        var direction = ($tabsList.find('.selected').index() < $clicked.index()) ? 'left' : 'right';

                        // Update selected classes
                        $clicked.siblings().removeClass('selected');
                        if(settings.classes.tabActive != '') $clicked.siblings().removeClass(settings.classes.tabActive);
                        $clicked.addClass('selected').addClass(settings.classes.tabActive);

                        // Hide and show appropriate panels
                        hidePanel($contentDivsContainer.children(".ui-slider-tab-content:visible"), direction);
                        showPanel($targetPanel);

                        // Slide tabs so that they fit in $tabsListContainer
                        fitTabInContainer($clicked);

                        // Select the proper indicator
                        selectIndicator();
                };

                // Select the next (right) panel
                plugin.next = function(){
                        if(!selectLock){
                                if(plugin.count === plugin.selectedTab)
                                        plugin.selectTab(1);
                                else plugin.selectTab(plugin.selectedTab+1);
                        }
                };

                // Select the previous panel
                plugin.prev = function(){
                        if(!selectLock){
                                if(plugin.selectedTab === 1)
                                        plugin.selectTab(plugin.count);
                                else plugin.selectTab(plugin.selectedTab-1);
                        }
                };

                // Slide tabs left/right within $tabsListContainer
                plugin.slideTabs = function(direction, length){
                        var margin = parseInt($tabsList.css('margin-left'));
                        var newMargin = margin;

                        // Reset 'edge' classes on tab arrows
                        $leftTabArrow.removeClass('edge');
                        $rightTabArrow.removeClass('edge');

                        // Calculate delta to slide by
                        if(direction=='right') newMargin += length;
                        else if(direction=='left') newMargin -= length;
                        if(newMargin >= 0) {
                                newMargin = 0;
                                $leftTabArrow.addClass('edge');
                        }
                        else if(newMargin <= minMargin){
                                newMargin = minMargin;
                                $rightTabArrow.addClass('edge');
                        }

                        // Animate
                        $tabsList.animate({'margin-left': newMargin}, settings.tabSlideSpeed);
                };

                // Show panel indicators
                // Create indicators if they don't exist yet
                plugin.showIndicators = function(){
                        if(!$indicators){
                                $indicators = $("<div class='ui-slider-tabs-indicator-container'>");
                                for(var i = 0; i < $contentDivs.length; i++){
                                        $indicators.append("<div class='ui-slider-tabs-indicator'></div>");
                                }
                                $contentDivsContainer.append($indicators);
                        }
                        else
                                $indicators.show();
                };

                // Hide panel indicators
                plugin.hideIndicators = function(){
                        if($indicators)
                                $indicators.hide();
                };

                // Show arrows that slide tabs left and right
                plugin.showTabArrows = function(){
                        if(!settings.tabArrows)
                                return;
                        $leftTabArrow.show();
                        $rightTabArrow.show();
                        $tabsListContainer.css('margin', '0 '+settings.tabArrowWidth+'px');
                };

                // Hide arrows that slide tabs left and right
                plugin.hideTabArrows = function(){
                        $leftTabArrow.hide();
                        $rightTabArrow.hide();
                        $tabsListContainer.css('margin', '0');
                };

                // Show panel arrows
                plugin.showPanelArrows = function(){
                        if($leftPanelArrow) $leftPanelArrow.show();
                        if($rightPanelArrow) $rightPanelArrow.show();
                };

                // Hide panel arrows
                plugin.hidePanelArrows = function(){
                        if($leftPanelArrow) $leftPanelArrow.hide();
                        if($rightPanelArrow) $rightPanelArrow.hide();
                };

                /*
                 * Private methods
                 */

                // Add the selected class to the plugin.selectedTab tab. Remove from all others.
                var selectIndicator = function(){
                        if(settings.indicators && $indicators){
                                var $indicator = $indicators.children("div:nth-child("+plugin.selectedTab+")");
                                $indicator.siblings().removeClass('selected');
                                $indicator.addClass('selected');
                        }
                };

                //      Slide tabs inside of $tabsListContainer so that the selected one fits inside
                var fitTabInContainer = function(tab){
                        var tabOffset = tab.offset(),
                                containerOffset = $tabsListContainer.offset(),
                                leftOffset = tabOffset.left - containerOffset.left,
                                rightOffset = (containerOffset.left + $tabsListContainer.outerWidth()) - (tabOffset.left + tab.outerWidth() );

                        if(leftOffset < 0)
                                plugin.slideTabs('right', -leftOffset);
                        else if(rightOffset < 0)
                                plugin.slideTabs('left', -rightOffset);
                };

                // Reposition content panels so that they are ready to be transitioned in and out.
                // This depends on whether the transition is set to slide or fade
                var reorderPanels = function(){
                        // Position content divs
                        if(settings.transition == 'slide')
                                // Move panels left/right basedon their index relative to the selected panel
                                $tabsList.children('li').each(function(index, el){
                                        var selectedIndex = $tabsList.children('.selected').index(),
                                                thisIndex = $(el).index();
                                        var panel = $contentDivsContainer.children('#'+$(el).find('a').attr('href').substr(1));
                                        if(selectedIndex < thisIndex)
                                                panel.css({left: $contentDivsContainer.width()+'px'});
                                        else if(selectedIndex > thisIndex)
                                                panel.css({left: '-'+$contentDivsContainer.width()+'px'});
                                        else
                                                panel.addClass(settings.classes.panelActive);
                                });

                        if(settings.transition == 'fade')
                                // Set opacity to correct value for non selected panels.
                                $tabsList.children('li').each(function(index, el){
                                        var selectedIndex = $tabsList.children('.selected').index(),
                                                thisIndex = $(el).index();
                                        var panel = $contentDivsContainer.children('#'+$(el).find('a').attr('href').substr(1));
                                        if(selectedIndex != thisIndex)
                                                panel.css({opacity: 0});
                                        else
                                                panel.addClass(settings.classes.panelActive);
                                });
                };

                // Object determining css properties to be animated to based on various actions, transitions, and directions
                var panelAnimationCSS = function(width){
                        return {
                                        hide: {
                                                slideleft: {
                                                        left: '-'+width+'px'
                                                },
                                                slideright: {
                                                        left: width+'px'
                                                },
                                                fade: {
                                                        opacity: 0
                                                }
                                        },
                                        show: {
                                                slide: {
                                                        left: 0
                                                },
                                                fade: {
                                                        opacity: 1
                                                }
                                        }
                                }
                };

                // Transition out the passed in panel.
                // param:       panel is the jQuery object of the panel to be hidden
                //                      direction is either 'left' or 'right' for sliding transitions
                var hidePanel = function(panel, direction){
                        // Calculate correct key in panelAnimationCSS
                        if(settings.transition == 'slide')
                                var trans = 'slide'+direction;
                        else var trans = settings.transition;

                        // Animate the panel out
                        panel.animate(panelAnimationCSS($contentDivsContainer.width())['hide'][trans], settings.transitionSpeed, settings.transitionEasing, function(){
                                panel.hide();
                                panel.removeClass('selected');
                                //if(settings.classes.panelActive != '') panel.removeClass(settings.classes.panelActive);
                                selectLock = false;
                                reorderPanels();
                        });
                };

                // Transition in the parameter panel
                // param:       panel is the jQuery object of the panel to be shown
                var showPanel = function(panel){
                        // Show first
                        panel.show();
                        panel.addClass(settings.classes.panelActive).addClass('selected');

                        // Then animate css properties
                        panel.animate(panelAnimationCSS($contentDivsContainer.width())['show'][settings.transition], settings.transitionSpeed, settings.transitionEasing, function(){
                                selectLock = false;
                                heightLock = true;
                                reorderPanels();
                        });
                };

                // Animate the height of the content container to height target
                // params:  target (int) is the new height
                var resizeContentContainer = function(target){
                        if(!settings.height)
                                $contentDivsContainer.animate({
                                        height: actualHeight(target)
                                }, 200);
                };

                // Position the panel arrows
                var positionPanelArrows = function(){
                        if(settings.panelArrows){
                                // Initialize them if you need to
                                if(!$leftPanelArrow && !$rightPanelArrow){
                                        $leftPanelArrow = $("<div class='ui-slider-tabs-leftPanelArrow'>").click(function(){
                                                plugin.prev();
                                        });
                                        $rightPanelArrow = $("<div class='ui-slider-tabs-rightPanelArrow'>").click(function(){
                                                plugin.next();
                                        });

                                        $leftPanelArrow.appendTo($contentDivsContainer);
                                        $rightPanelArrow.appendTo($contentDivsContainer);
                                }

                                // Set correct CSS 'top' attribute of each panel arrow
                                $rightPanelArrow.css({
                                        "top": $contentDivsContainer.height()/2 - $rightPanelArrow.outerHeight()/2
                                });
                                $leftPanelArrow.css({
                                        "top": $contentDivsContainer.height()/2 - $leftPanelArrow.outerHeight()/2
                                });
                        }
                };

                // Change the width of $tabsList to the sum of the outer widths of all tabs
                var resizeTabsList = function(){
                        // Calculate total width
                        var width = 0;
                        $tabsList.children().each(function(index, element){
                                width += $(element).outerWidth(true);
                        });
                        // Set new width of $tabsList
                        $tabsList.width(width);

                        // Update minMargin. Hide tab arrows if no overflow
                        if($tabsListContainer.width() < width && settings.tabArrows){
                                plugin.showTabArrows();
                                minMargin = $tabsListContainer.width() - width;
                        }
                        else plugin.hideTabArrows();
                }

                // Resize indiviual panels to the width of the new container
                var resizePanels = function(){
                        $contentDivs.width($contentDivsContainer.width() - ($contentDivs.outerWidth() - $contentDivs.width()));
                };

                // Get height of a hidden element
                var actualHeight = function(element){
                        var prevCSS = {
                                'display': element.css('display'),
                                'left': element.css('left'),
                                'position': element.css('position')
                        };
                        element.css({
                                'display': 'normal',
                                'left': -5000,
                                'position': 'absolute'
                        });
                        var height = element.outerHeight();
                        element.css(prevCSS);
                        return height;
                };


                // Initialize the plugin
                plugin.init();
        };

        /*
         * Handle input. Call public functions and initializers
         */
        $.fn.sliderTabs = function( data ) {
                return this.each(function(){
                        var _this = $(this),
                                plugin = _this.data('sliderTabs');

                        // Method calling logic
                    if (!plugin) {
                        // If no plugin, initialize it
                                plugin = new $.sliderTabs(this, data);
                                _this.data('sliderTabs', plugin);
                                return plugin;
                        }
                        if (plugin.methods[data]){
                                // If plugin exists, call a public method
                                return plugin.methods[ data ].apply( this, Array.prototype.slice.call( arguments, 1 ));
                        }
                });
        };


})( jQuery );





/*
 * Additional easing functions
 * Taken from jQuery UI source code
 *
 * https://github.com/jquery/jquery-ui
 */

$.extend($.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});





/*
 * The following is the jQuery Mousewheel plugin. Full credit goes to
 * Brandon Aaron. (https://github.com/brandonaaron/jquery-mousewheel)
 * /


/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },

    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },

    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";

    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;

    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }

    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);

    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);



/*
 * The following is the jQuery Resize plugin. Full credit goes to
 * "Cowboy" Ben Alman. (https://github.com/cowboy/jquery-resize)
 * /

/*
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);

/**
*
*  AJAX IFRAME METHOD (AIM)
*  http://www.webtoolkit.info/
*
**/

AIM = {

	frame : function(c) {

		var n = 'f' + Math.floor(Math.random() * 99999);
		var d = document.createElement('DIV');
		d.innerHTML = '<iframe style="display:none" src="about:blank" id="'+n+'" name="'+n+'" onload="AIM.loaded(\''+n+'\')"></iframe>';
		document.body.appendChild(d);

		var i = document.getElementById(n);
		if (c && typeof(c.onComplete) == 'function') {
			i.onComplete = c.onComplete;
		}

		return n;
	},

	form : function(f, name) {
		f.setAttribute('target', name);
	},

	submit : function(f, c) {
		AIM.form(f, AIM.frame(c));
		if (c && typeof(c.onStart) == 'function') {
			return c.onStart();
		} else {
			return true;
		}
	},

	loaded : function(id) {
		var i = document.getElementById(id);
		if (i.contentDocument) {
			var d = i.contentDocument;
		} else if (i.contentWindow) {
			var d = i.contentWindow.document;
		} else {
			var d = window.frames[id].document;
		}
		if (d.location.href == "about:blank") {
			return;
		}

		if (typeof(i.onComplete) == 'function') {
			i.onComplete(d.body.innerHTML);
		}
	}

}
var destAutoComplete;
var defualtCatalogId = "sgp";
var defaultPincode = "singapore_locality";
var defaultCity = "Singapore"
function customInitialize() {
	if($("#productType").val() == "INTERNATIONAL") return;
	destAutoComplete = $("#destlookup").autocomplete({
		minLength: 1,
		delay: 100,
		source: searchCities,
		select: function(event, ui){
			pincode = ui.item.id;
			destAutoComplete.inputField.fnp_isFilled = true;
			finalizePincode(pincode);
			$("#deliveryLocation").val(" ");
		}
	});
	destAutoComplete.inputField = $("#destlookup").val();
	destAutoComplete.attempt1Made = false;
	//destAutoComplete.addListener('place_changed', pickupDest);
	//now checking for city / locality context
	var urlAndReferrer = document.location.href + document.referrer;
	var cityPattern = /city[^=]*=([^&#]+)/;
	var match = cityPattern.exec(urlAndReferrer);
	var dest = "";
	if (match) {
		dest = match[1];
	} else {
		if (jQuery.deparam.querystring() && jQuery.deparam.querystring()["localityname"]) {
			dest = jQuery.deparam.querystring()["localityname"];
		}
	}
}
function searchCities(request, response){
	var pincodeUrl = cdnHost + "/assets/js/localities/localities.json";
	var catalogId =$("#FNP_CURRENT_CATALOG_ID").val();
	if(catalogId != undefined && catalogId != defualtCatalogId ){
		pincodeUrl = "/control/getLocalities"+"?FNP_CURRENT_CATALOG_ID="+catalogId;
	}
	$.ajax({
		global : false,
		aync: true,
		url : pincodeUrl,
		dataType : "json",
		success : function(data) {
			var matchedData = [];
			$.each(data, function(geoId, geoName){
				//geoId - value , geoName - label
				var term = (request.term).toUpperCase();
				if ((geoId && geoId.toUpperCase().startsWith(term)) || (geoName && geoName.toUpperCase().startsWith(term))) {
					matchedData.push({label: geoName, value: geoName, id: geoId});
				}
				if(matchedData.length >= 6) return false;
			});
			
			updatePincodeMessage(matchedData);
			response(matchedData);
			/*if(matchedData.length == 1){
				pincode = request.term;
				destAutoComplete.inputField.fnp_isFilled = true;
				finalizePincode(pincode);
				$("#deliveryLocation").val(" ");
			}*/
		},
		error : updatePincodeMessage
	});
}

//City selection changed autocomplete to dropdown.
$(document).ready(function(){
	initializeZoom();
    var localityDom = $("#localitycontainerwraper .dropdownhidden");	
	var pincodeUrl = cdnHost + "/assets/js/localities/localities.json";
	var catalogId =$("#FNP_CURRENT_CATALOG_ID").val();
	if(catalogId != undefined && catalogId != defualtCatalogId ){
		pincodeUrl = "/control/getLocalities"+"?FNP_CURRENT_CATALOG_ID="+catalogId;
	}
	$.ajax({
		global : false,
		aync: true,
		url : pincodeUrl,
		dataType : "json",
		success : function(data) {
			$.each(data, function(geoId, geoName){
				$('<li><a id='+geoId+' name="localityItem" href="javascript:void(0);">'+capitalize(geoName)+'</a></li>').appendTo(localityDom);
			});
		}	
	});
	function capitalize(s) {
	    // returns the first letter capitalized
		return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
	}
	$(document).on("click"," #localitypicker .localityText",function(){
		$("#localitycontainer").toggle();
		var postionEle = $(this).offset();
		$("#localitycontainer").css({top: (postionEle.top+$(this).outerHeight())+'px', left: postionEle.left+'px',width:$(this).parent().width()});
		$("#localitycontainer").attr("name", "locality");
		$(this).toggleClass("active-select");
		$("a[class='selected']").removeClass("selected");
		var localityId = $("input[name=destlookup]").val();
		$("#localitycontainer ul.dropdownhidden li a#"+localityId).addClass("selected")
		onWindowResize();
		outSideSelectBoxClick(this);
		return false;
	});
	if(defaultPincode){
		$("a[name='locality']").html(defaultCity);
		$("#deliveryLocation").val(defaultCity)
		$("input[name='destlookup']").val(defaultPincode);
		pincode = defaultPincode;
		finalizePincode(defaultPincode);
		//$("#deliveryLocation").val("");
		return false;
	}
	function outSideSelectBoxClick(currentItem){
		$("body").click(function(){
			$("#localitycontainer").hide();
			$(".dropcontainer").hide();
			$(currentItem).removeClass("active-select");
		});
	}
	function onWindowResize() {
		$(window).resize(function(){
			var postionEle = $("#localitypicker .localityText").offset();
			$("#localitycontainer").css({top: (postionEle.top+$("#localitypicker .localityText").outerHeight())+'px', left: postionEle.left+'px',width:$("#localitypicker .localityText").parent().width()});
		});
	}
});

function updatePincodeMessage(matchedData){
	if(matchedData === undefined || matchedData.length == 0 || matchedData.status === 404){
		var pincodeMessage = "Please type a valid City & try again.";
		$("#pincodemsg").removeClass("infomsgbox");
		$("#pincodemsg").html(pincodeMessage);
		$("#pincodemsg").show();
	} else{
		clearPincodeMsg();
	}	
}

function setDest(destPlace) {
	//set the context of google place
	placeId_Track=destPlace.place_id;
	var destName = (destPlace.name === undefined) ? destPlace.address_components[0].long_name
		: destPlace.name; ////eeeesssssshhhhhhhhh!!! :(:(:(
	destAutoComplete.inputField.placeholder = "* Where in " + destName + "?";
	destAutoComplete.inputField.value = "";
	destAutoComplete.attempt1Made = true;
	var attemp1Text = destName;
	if (destPlace.address_components !== undefined) {
		for (var i = 0; i < destPlace.address_components.length; i++) {
			if (destPlace.address_components[i].types.indexOf("locality") >= 0) {
				if (destPlace.address_components[i].long_name != destName) {
					attemp1Text = destPlace.name + ", " + destPlace.address_components[i].long_name
				}
				break;
			}
		}
	}
	$("#attempt1").text(attemp1Text).parent().addClass("selected");
	var viewport = null;
	if (destPlace.geometry.bounds !== undefined) {
		var ne = new google.maps.LatLng(
			destPlace.geometry.bounds.northeast.lat,
			destPlace.geometry.bounds.northeast.lng);
		var sw = new google.maps.LatLng(
			destPlace.geometry.bounds.southwest.lat,
			destPlace.geometry.bounds.southwest.lng);
		viewport = new google.maps.LatLngBounds(sw, ne);
	} else {
		viewport = destPlace.geometry.viewport;
	}
	destAutoComplete.setBounds(viewport);
	setTimeout(function() {
		$(destAutoComplete.inputField).focus();
	}, 200);
	$(destAutoComplete.inputField).addClass("toselectarea");
}
function unsetDest() {
	pincode = null;
	destAutoComplete.inputField.placeholder = "* Where to? (City / Town)";
	destAutoComplete.inputField.value = "";
	destAutoComplete.attempt1Made = false;
	$("#deliveryLocation").val("");
	$("#attempt1").text("").parent().removeClass("selected");
	var fullIndiaBounds = new google.maps.LatLngBounds(new google.maps.LatLng(
		6.7535159, 68.1628852), new google.maps.LatLng(35.5087008,
		97.3949807));
	destAutoComplete.setBounds(fullIndiaBounds);
	setTimeout(function() {
		$(destAutoComplete.inputField).focus();
	}, 200);
	resetProductShippingInfo();
	$("#datetimelink").addClass("disableClick");
	$(destAutoComplete.inputField).removeClass("toselectarea");
}
function pickupDest() {
	pincode = null;
	var place = this.getPlace();
	if (place.types && place.types.length > 0) {
		if (place.types[0] == "postal_code") { // pincode typed by the user
			pincode = place.address_components[0].long_name;
			pincode = sanitizePincode(pincode);
		}
		if (pincode == null) {
			// search all address components/sub components for postal code
			for (var i = 0; i < place.address_components.length; i++) {
				if (place.address_components[i].types[0] == "postal_code") {
					pincode = sanitizePincode(place.address_components[i].long_name);
					selectedPincodeGoogle = pincode;
					break;
				}
			}
		}
	}
	if (pincode != null) {
		//whether attempt1 is made or not ...valid pincode identified, so move ahead
		setDeliveryArea(place);
		finalizePincode(pincode);
	} else {
		if (this.attempt1Made) {
			//resolve the pincode and start using it
			var lat = place.geometry.location.lat();
			var lng = place.geometry.location.lng();
			//TODO - visual loader
			// resolve pincode by using OUR mapping in db
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/control/getPinCodeByPostalAddress?latitude=' + lat
					+ '&longitude=' + lng,
				success : function(pinCodeDetails) {
					if (pinCodeDetails != null
						&& pinCodeDetails.isPinCodeFound == true) {
						matchedPincode = pinCodeDetails.matchedPincode;
						pincode = pinCodeDetails.pincode != null ? pinCodeDetails.pincode : matchedPincode;
						setDeliveryArea(place)
						finalizePincode(pincode);
					} else {
						showNoServiceMessage();
					}
				}
			});
		} else {
			setDest(place);
		}
	}
}
function setDeliveryArea(place) {
	if (place !== undefined && place != null) {
		var area = getlocality(place);
		$("#deliveryLocation").val(area);
	}
}
function finalizePincode(pincode) {
	resetProductShippingInfo();
	populateDeliveryDetails(pincode);
	getProductPriceByDeliveryInfo($("#addProductId").val(), "", pincode);
	$("#destlookup").removeClass("toselectarea");
}
function checkPredictionsAfterSomeTime() {
	checkPredictions(true);
}
function clearPincodeMsg() {
	$("#pincodemsg").removeClass("infomsgbox");
	$("#pincodemsg").text("");
	$("#pincodemsg").hide();
}

function changeAddonQuantity(element){
	var configIndex = $(element).data("index");
	var productId = $(element).attr("data-productId");
	var input_el=$(element).siblings('#quantity_'+configIndex);
	var quantiy = input_el.val()*1;
	if($(element).val() == "+"){
		if(quantiy < input_el.attr('max')){
			quantiy = quantiy + 1;
			$(input_el).attr('value', quantiy);
			$(element).parent().parent().parent().find('.ce').attr('value', productId+'_'+quantiy);
			$(element).siblings(".decreaseVal").removeClass('active');
			$(element).addClass('active');
			//find the checkbox with ID and perform action
			if(quantiy > 0){
				$(element).parent().parent().parent().find('.ce').attr('checked', true);
			}
		}
	} else{
		if(quantiy > input_el.attr('min')){
			quantiy = quantiy - 1;
			input_el.val(quantiy);
			$(element).parent().parent().parent().find('.ce').attr('value', productId+'_'+quantiy);
			$(element).addClass('active');
			$(element).siblings(".increaseVal").removeClass('active');
		}
		//find the checkbox with ID and perform action
		if(quantiy == 0){
			$(element).parent().parent().parent().find('.ce').attr('checked', false);
		}
	}
}
$(document).on("click",".addonviewli .decreaseVal",function(event) {
    /*var result = $(this).parent().parent().parent().find("input[name=addonProductId]");    
    var result1 = $(result).attr("id"); */   
    changeAddonQuantity(this);
    updateAddoncount();
    event.stopImmediatePropagation();
});

$(document).on("click",".addonviewli .increaseVal",function(event) {    
    /*var result = $(this).parent().parent().parent().find("input[name=addonProductId]");    
    var result1 = $(result).attr("id"); */
    changeAddonQuantity(this);
    updateAddoncount();
    event.stopImmediatePropagation();
});

$(document).on("click",".addonviewli",function(event) {     
    var result = $(this).find("input[name=addonProductId]");    
    var result1 = $(result).attr("id");    
    selectAddon(result1);
    updateAddoncount();
    event.stopImmediatePropagation();
});
function selectAddon(elementId){
    if(($("#"+elementId).attr("checked")) == undefined) {
        $("#"+elementId).attr("checked", true);
        var element=  $("#"+elementId).parent().find('.increaseVal');		
        changeAddonQuantity(element);
    } else {
    	var element=  $("#"+elementId).parent().find('.decreaseVal');
        $("#"+elementId).attr("checked", false);
    }
	checkBoxFunctinality($('#'+elementId));
	event.preventDefault(event);
}

function checkBoxFunctinality(element){
	var configIndex = $(element).data("index");
	if ($(element).attr("checked") != undefined) {
		$(element).parent().find("#quantity_"+configIndex).attr('value',1);
	} else {
		$(element).parent().find("#quantity_"+configIndex).attr('value',0);
	}
}

function checkPredictions(isCallFromTimeout) {
	var showingPredictions = $(".pac-container:visible").length > 0;
	if (!showingPredictions) {
		if (pincode == null && $("#destlookup").val().length > 1) {
			// not valid pincode selected. show the message
			if (isCallFromTimeout) {
				var pincodeMessage = "Please verify the spelling & try again.";
				if (!showingPredictions) {
					$("#pincodemsg").removeClass("infomsgbox");
					$("#pincodemsg").html(pincodeMessage);
					$("#pincodemsg").show();				
				} else {
					clearPincodeMsg();
				}
			} 
		} else if ($("#destlookup").val().length > 1
			&& $("#pincodemsg").is(':visible')) {
			//Not required to do anything...
		} else {
			clearPincodeMsg();
		}
	} else {
		clearPincodeMsg();
	}
	if(!isCallFromTimeout){
		pincode = null;
		resetProductShippingInfo();
	}
}

function updateAddoncount(event){
	var addonCount = 0;
	$(".val").each(function(index, element) {
		if (parseInt(element.value) > 0) {
			addonCount = addonCount + parseInt(element.value);
		}
	});
	if(addonCount != 0){
		$(".addonfooter button").html("<span class='content'>Continue with " + addonCount+ " add ons</span>");
	}
	else{
		$(".addonfooter button").html("<span class='content'>Continue without add ons</span>");
	}
}
/*
 *	jQuery elevateZoom 3.0.8
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 *

/*
 *	jQuery elevateZoom 3.0.3
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {
	var ElevateZoom = {
			init: function( options, elem ) {
				var self = this;

				self.elem = elem;
				self.$elem = $( elem );

				self.imageSrc = self.$elem.data("zoom-image") ? self.$elem.data("zoom-image") : self.$elem.attr("src");

				self.options = $.extend( {}, $.fn.elevateZoom.options, options );

				//TINT OVERRIDE SETTINGS
				if(self.options.tint) {
					self.options.lensColour = "none", //colour of the lens background
					self.options.lensOpacity =  "1" //opacity of the lens
				}
				//INNER OVERRIDE SETTINGS
				if(self.options.zoomType == "inner") {self.options.showLens = false;}


				//Remove alt on hover

				self.$elem.parent().removeAttr('title').removeAttr('alt');

				self.zoomImage = self.imageSrc;

				self.refresh( 1 );



				//Create the image swap from the gallery 
				$('#'+self.options.gallery + ' a').click( function(e) { 

					//Set a class on the currently active gallery image
					if(self.options.galleryActiveClass){
						$('#'+self.options.gallery + ' a').removeClass(self.options.galleryActiveClass);
						$(this).addClass(self.options.galleryActiveClass);
					}
					//stop any link on the a tag from working
					e.preventDefault();

					//call the swap image function            
					if($(this).data("zoom-image")){self.zoomImagePre = $(this).data("zoom-image")}
					else{self.zoomImagePre = $(this).data("image");}
					self.swaptheimage($(this).data("image"), self.zoomImagePre);
					return false;
				});

			},

			refresh: function( length ) {
				var self = this;

				setTimeout(function() {
					self.fetch(self.imageSrc);

				}, length || self.options.refresh );
			},

			fetch: function(imgsrc) {
				//get the image
				var self = this;
				var newImg = new Image();
				newImg.onload = function() {
					//set the large image dimensions - used to calculte ratio's
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					//once image is loaded start the calls
					self.startZoom();
					self.currentImage = self.imageSrc;
					//let caller know image has been loaded
					self.options.onZoomedImageLoaded(self.$elem);
				}
				newImg.src = imgsrc; // this must be done AFTER setting onload

				return;

			},

			startZoom: function( ) {
				var self = this;
				//get dimensions of the non zoomed image
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				//activated elements
				self.isWindowActive = false;
				self.isLensActive = false;
				self.isTintActive = false;
				self.overWindow = false;    

				//CrossFade Wrappe
				if(self.options.imageCrossfade){
					self.zoomWrap = self.$elem.wrap('<div style="height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;" class="zoomWrapper" />');        
					self.$elem.css('position', 'absolute'); 
				}

				self.zoomLock = 1;
				self.scrollingLock = false;
				self.changeBgSize = false;
				self.currentZoomLevel = self.options.zoomLevel;


				//get offset of the non zoomed image
				self.nzOffset = self.$elem.offset();
				//calculate the width ratio of the large/small image
				self.widthRatio = (self.largeWidth/self.currentZoomLevel) / self.nzWidth;
				self.heightRatio = (self.largeHeight/self.currentZoomLevel) / self.nzHeight; 


				//if window zoom        
				if(self.options.zoomType == "window") {
					self.zoomWindowStyle = "overflow: hidden;"
						+ "background-position: 0px 0px;text-align:center;"  
						+ "background-color: " + String(self.options.zoomWindowBgColour)            
						+ ";width: " + String(self.options.zoomWindowWidth) + "px;"
						+ "height: " + String(self.options.zoomWindowHeight)
						+ "px;float: left;"
						+ "background-size: "+ self.largeWidth/self.currentZoomLevel+ "px " +self.largeHeight/self.currentZoomLevel + "px;"
						+ "display: none;z-index:100;"
						+ "border: " + String(self.options.borderSize) 
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    


				//if inner  zoom    
				if(self.options.zoomType == "inner") {
					//has a border been put on the image? Lets cater for this

					var borderWidth = self.$elem.css("border-left-width");

					self.zoomWindowStyle = "overflow: hidden;"
						+ "margin-left: " + String(borderWidth) + ";" 
						+ "margin-top: " + String(borderWidth) + ";"         
						+ "background-position: 0px 0px;"
						+ "width: " + String(self.nzWidth) + "px;"
						+ "height: " + String(self.nzHeight) + "px;"
						+ "px;float: left;"
						+ "display: none;"
						+ "cursor:"+(self.options.cursor)+";"
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    



				//lens style for window zoom
				if(self.options.zoomType == "window") {


					// adjust images less than the window height

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;              
					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}
					if(self.largeWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}


					self.lensStyle = "background-position: 0px 0px;width: " + String((self.options.zoomWindowWidth)/self.widthRatio) + "px;height: " + String((self.options.zoomWindowHeight)/self.heightRatio)
					+ "px;float: right;display: none;"
					+ "overflow: hidden;"
					+ "z-index: 999;"   
					+ "-webkit-transform: translateZ(0);"               
					+ "opacity:"+(self.options.lensOpacity)+";filter: alpha(opacity = "+(self.options.lensOpacity*100)+"); zoom:1;"
					+ "width:"+lensWidth+"px;"
					+ "height:"+lensHeight+"px;"
					+ "background-color:"+(self.options.lensColour)+";"					
					+ "cursor:"+(self.options.cursor)+";"
					+ "border: "+(self.options.lensBorderSize)+"px" +
					" solid "+(self.options.lensBorderColour)+";background-repeat: no-repeat;position: absolute;";
				} 


				//tint style
				self.tintStyle = "display: block;"
					+ "position: absolute;"
					+ "background-color: "+self.options.tintColour+";"	
					+ "filter:alpha(opacity=0);"		
					+ "opacity: 0;"	
					+ "width: " + self.nzWidth + "px;"
					+ "height: " + self.nzHeight + "px;"

					;

				//lens style for lens zoom with optional round for modern browsers
				self.lensRound = '';

				if(self.options.zoomType == "lens") {

					self.lensStyle = "background-position: 0px 0px;"
						+ "float: left;display: none;"
						+ "border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour+";"
						+ "width:"+ String(self.options.lensSize) +"px;"
						+ "height:"+ String(self.options.lensSize)+"px;"
						+ "background-repeat: no-repeat;position: absolute;";


				}


				//does not round in all browsers
				if(self.options.lensShape == "round") {
					self.lensRound = "border-top-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-top-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;";

				}

				//create the div's                                                + ""
				//self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

				self.zoomContainer = $('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+self.nzOffset.left+'px;top:'+self.nzOffset.top+'px;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;"></div>');
				$('body').append(self.zoomContainer);	


				//this will add overflow hidden and contrain the lens on lens mode       
				if(self.options.containLensZoom && self.options.zoomType == "lens"){
					self.zoomContainer.css("overflow", "hidden");
				}
				if(self.options.zoomType != "inner") {
					self.zoomLens = $("<div class='zoomLens' style='" + self.lensStyle + self.lensRound +"'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});


					if(self.options.tint) {
						self.tintContainer = $('<div/>').addClass('tintContainer');	
						self.zoomTint = $("<div class='zoomTint' style='"+self.tintStyle+"'></div>");


						self.zoomLens.wrap(self.tintContainer);


						self.zoomTintcss = self.zoomLens.after(self.zoomTint);	

						//if tint enabled - set an image to show over the tint

						self.zoomTintImage = $('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+self.nzWidth+'px; height: '+self.nzHeight+'px;" src="'+self.imageSrc+'">')
						.appendTo(self.zoomLens)
						.click(function () {

							self.$elem.trigger('click');
						});

					}          

				}







				//create zoom window 
				if(isNaN(self.options.zoomWindowPosition)){
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo('body')
					.click(function () {
						self.$elem.trigger('click');
					});
				}else{
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});
				}              
				self.zoomWindowContainer = $('<div/>').addClass('zoomWindowContainer').css("width",self.options.zoomWindowWidth);
				self.zoomWindow.wrap(self.zoomWindowContainer);


				//  self.captionStyle = "text-align: left;background-color: black;color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";                                                                                                                                                                                                                                          
				// self.zoomCaption = $('<div class="elevatezoom-caption" style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());

				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				/*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
				//touch events
				self.$elem.bind('touchmove', function(e){    
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
					self.setPosition(touch);

				});  
				self.zoomContainer.bind('touchmove', function(e){ 
					if(self.options.zoomType == "inner") {
						self.showHideWindow("show");

					}
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
					self.setPosition(touch); 

				});  	
				self.zoomContainer.bind('touchend', function(e){ 
					self.showHideWindow("hide");
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
				});  	

				self.$elem.bind('touchend', function(e){ 
					self.showHideWindow("hide");
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
				});  	
				if(self.options.showLens) {
					self.zoomLens.bind('touchmove', function(e){ 

						e.preventDefault();
						var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
						self.setPosition(touch); 
					});    


					self.zoomLens.bind('touchend', function(e){ 
						self.showHideWindow("hide");
						if(self.options.showLens) {self.showHideLens("hide");}
						if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
					});  
				}
				//Needed to work in IE
				self.$elem.bind('mousemove', function(e){   
					if(self.overWindow == false){self.setElements("show");}
					//make sure on orientation change the setposition is not fired
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
						self.currentLoc = e;
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    

				});  	

				self.zoomContainer.bind('mousemove', function(e){ 

					if(self.overWindow == false){self.setElements("show");} 

					//make sure on orientation change the setposition is not fired 
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
						self.currentLoc = e;
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    
				});  	
				if(self.options.zoomType != "inner") {
					self.zoomLens.bind('mousemove', function(e){      
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});
				}
				if(self.options.tint && self.options.zoomType != "inner") {
					self.zoomTint.bind('mousemove', function(e){ 
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.bind('mousemove', function(e) {
						//self.overWindow = true;
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}


				//  lensFadeOut: 500,  zoomTintFadeIn
				self.zoomContainer.add(self.$elem).mouseenter(function(){

					if(self.overWindow == false){self.setElements("show");} 


				}).mouseleave(function(){
					if(!self.scrollLock){
						self.setElements("hide");
            self.options.onDestroy(self.$elem);
					}
				});
				//end ove image





				if(self.options.zoomType != "inner") {
					self.zoomWindow.mouseenter(function(){
						self.overWindow = true;   
						self.setElements("hide");                  
					}).mouseleave(function(){

						self.overWindow = false;
					});
				}
				//end ove image



//				var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

				//      $(this).empty();    
				//    return false;

				//fix for initial zoom setting
				if (self.options.zoomLevel != 1){
					//	self.changeZoomLevel(self.currentZoomLevel);
				}
				//set the min zoomlevel
				if(self.options.minZoomLevel){
					self.minZoomLevel = self.options.minZoomLevel;
				}
				else{
					self.minZoomLevel = self.options.scrollZoomIncrement * 2;
				}


				if(self.options.scrollZoom){


					self.zoomContainer.add(self.$elem).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){


//						in IE there is issue with firing of mouseleave - So check whether still scrolling
//						and on mouseleave check if scrolllock          
						self.scrollLock = true;
						clearTimeout($.data(this, 'timer'));
						$.data(this, 'timer', setTimeout(function() {
							self.scrollLock = false;
							//do something
						}, 250));

						var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail*-1


						//this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
						//   e.preventDefault();


						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();


						if(theEvent /120 > 0) {
							//scrolling up
							if(self.currentZoomLevel >= self.minZoomLevel){ 
								self.changeZoomLevel(self.currentZoomLevel-self.options.scrollZoomIncrement);        
							}

						}
						else{
							//scrolling down


							if(self.options.maxZoomLevel){
								if(self.currentZoomLevel <= self.options.maxZoomLevel){           
									self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
								}
							}
							else{
								//andy 

								self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
							}

						}
						return false;
					});
				}


			},
			setElements: function(type) {
				var self = this;
        if(!self.options.zoomEnabled){return false;}
				if(type=="show"){
					if(self.isWindowSet){
						if(self.options.zoomType == "inner") {self.showHideWindow("show");}
						if(self.options.zoomType == "window") {self.showHideWindow("show");}
						if(self.options.showLens) {self.showHideLens("show");}
						if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("show");
						}
					}
				}

				if(type=="hide"){
					if(self.options.zoomType == "window") {self.showHideWindow("hide");}
					if(!self.options.tint) {self.showHideWindow("hide");}
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint) {	self.showHideTint("hide");}
				}   
			},
			setPosition: function(e) {
      
				var self = this;
        
        if(!self.options.zoomEnabled){return false;}

				//recaclc offset each time in case the image moves
				//this can be caused by other on page elements
				self.nzHeight = self.$elem.height();
				self.nzWidth = self.$elem.width();
				self.nzOffset = self.$elem.offset();

				if(self.options.tint && self.options.zoomType != "inner") {
					self.zoomTint.css({ top: 0});
					self.zoomTint.css({ left: 0});
				}
				//set responsive       
				//will checking if the image needs changing before running this code work faster?
				if(self.options.responsive && !self.options.scrollZoom){
					if(self.options.showLens){ 
						if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
							lensHeight = self.nzHeight;              
						}
						else{
							lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
						}
						if(self.largeWidth < self.options.zoomWindowWidth){
							lensWidth = self.nzWidth;
						}       
						else{
							lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
						}
						self.widthRatio = self.largeWidth / self.nzWidth;
						self.heightRatio = self.largeHeight / self.nzHeight;        
						if(self.options.zoomType != "lens") {


							//possibly dont need to keep recalcalculating
							//if the lens is heigher than the image, then set lens size to image size
							if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
								lensHeight = self.nzHeight;  

							}
							else{
								lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
							}

							if(self.nzWidth < self.options.zoomWindowHeight/self.heightRatio){
								lensWidth = self.nzWidth;
							}       
							else{
								lensWidth =  String((self.options.zoomWindowWidth/self.widthRatio));
							}            

							self.zoomLens.css('width', lensWidth);    
							self.zoomLens.css('height', lensHeight); 

							if(self.options.tint){    
								self.zoomTintImage.css('width', self.nzWidth);    
								self.zoomTintImage.css('height', self.nzHeight); 
							}

						}                     
						if(self.options.zoomType == "lens") {  

							self.zoomLens.css({ width: String(self.options.lensSize) + 'px', height: String(self.options.lensSize) + 'px' })      


						}        
						//end responsive image change
					}
				}

				//container fix
				self.zoomContainer.css({ top: self.nzOffset.top});
				self.zoomContainer.css({ left: self.nzOffset.left});
				self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
				self.mouseTop = parseInt(e.pageY - self.nzOffset.top);
				//calculate the Location of the Lens

				//calculate the bound regions - but only if zoom window
				if(self.options.zoomType == "window") {
					self.Etoppos = (self.mouseTop < (self.zoomLens.height()/2));
					self.Eboppos = (self.mouseTop > self.nzHeight - (self.zoomLens.height()/2)-(self.options.lensBorderSize*2));
					self.Eloppos = (self.mouseLeft < 0+((self.zoomLens.width()/2))); 
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.zoomLens.width()/2)-(self.options.lensBorderSize*2)));  
				}
				//calculate the bound regions - but only for inner zoom
				if(self.options.zoomType == "inner"){ 
					self.Etoppos = (self.mouseTop < ((self.nzHeight/2)/self.heightRatio) );
					self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight/2)/self.heightRatio)));
					self.Eloppos = (self.mouseLeft < 0+(((self.nzWidth/2)/self.widthRatio)));
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth/2)/self.widthRatio-(self.options.lensBorderSize*2)));  
				}

				// if the mouse position of the slider is one of the outerbounds, then hide  window and lens
				if (self.mouseLeft < 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight ) {				          
					self.setElements("hide");
					return;
				}
				//else continue with operations
				else {


					//lens options
					if(self.options.showLens) {
						//		self.showHideLens("show");
						//set background position of lens
						self.lensLeftPos = String(Math.floor(self.mouseLeft - self.zoomLens.width() / 2));
						self.lensTopPos = String(Math.floor(self.mouseTop - self.zoomLens.height() / 2));


					}
					//adjust the background position if the mouse is in one of the outer regions 

					//Top region
					if(self.Etoppos){
						self.lensTopPos = 0;
					}
					//Left Region
					if(self.Eloppos){
						self.windowLeftPos = 0;
						self.lensLeftPos = 0;
						self.tintpos=0;
					}     
					//Set bottom and right region for window mode
					if(self.options.zoomType == "window") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( (self.nzHeight)-self.zoomLens.height()-(self.options.lensBorderSize*2), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.zoomLens.width())-(self.options.lensBorderSize*2));
						}  
					}  
					//Set bottom and right region for inner mode
					if(self.options.zoomType == "inner") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( ((self.nzHeight)-(self.options.lensBorderSize*2)), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.nzWidth)-(self.options.lensBorderSize*2));
						}  

					}
					//if lens zoom
					if(self.options.zoomType == "lens") {  
						self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));   
						self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));

						self.zoomLens.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });

						if(self.changeBgSize){  

							if(self.nzHeight>self.nzWidth){  
								if(self.options.zoomType == "lens"){       
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
								}   

								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
							}
							else{     
								if(self.options.zoomType == "lens"){       
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
								}   
								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
							}
							self.changeBgSize = false;
						}    

						self.setWindowPostition(e);  
					}
					//if tint zoom   
					if(self.options.tint && self.options.zoomType != "inner") {
						self.setTintPosition(e);

					}
					//set the css background position 
					if(self.options.zoomType == "window") {
						self.setWindowPostition(e);   
					}
					if(self.options.zoomType == "inner") {
						self.setWindowPostition(e);   
					}
					if(self.options.showLens) {

						if(self.fullwidth && self.options.zoomType != "lens"){
							self.lensLeftPos = 0;

						}
						self.zoomLens.css({ left: self.lensLeftPos + 'px', top: self.lensTopPos + 'px' })  
					}

				} //end else



			},
			showHideWindow: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isWindowActive){
						if(self.options.zoomWindowFadeIn){
							self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
						}
						else{self.zoomWindow.show();}
						self.isWindowActive = true;
					}            
				}
				if(change == "hide"){
					if(self.isWindowActive){
						if(self.options.zoomWindowFadeOut){
							self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut, function () {
								if (self.loop) {
									//stop moving the zoom window when zoom window is faded out
									clearInterval(self.loop);
									self.loop = false;
								}
							});
						}
						else{self.zoomWindow.hide();}
						self.isWindowActive = false;        
					}      
				}
			},
			showHideLens: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isLensActive){
						if(self.options.lensFadeIn){
							self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
						}
						else{self.zoomLens.show();}
						self.isLensActive = true;
					}            
				}
				if(change == "hide"){
					if(self.isLensActive){
						if(self.options.lensFadeOut){
							self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
						}
						else{self.zoomLens.hide();}
						self.isLensActive = false;        
					}      
				}
			},
			showHideTint: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isTintActive){

						if(self.options.zoomTintFadeIn){
							self.zoomTint.css({opacity:self.options.tintOpacity}).animate().stop(true, true).fadeIn("slow");
						}
						else{
							self.zoomTint.css({opacity:self.options.tintOpacity}).animate();
							self.zoomTint.show();


						}
						self.isTintActive = true;
					}            
				}
				if(change == "hide"){      
					if(self.isTintActive){ 

						if(self.options.zoomTintFadeOut){
							self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
						}
						else{self.zoomTint.hide();}
						self.isTintActive = false;        
					}      
				}
			},
			setLensPostition: function( e ) {


			},
			setWindowPostition: function( e ) {
				//return obj.slice( 0, count );
				var self = this;

				if(!isNaN(self.options.zoomWindowPosition)){

					switch (self.options.zoomWindowPosition) { 
					case 1: //done         
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
						self.windowOffsetLeft =(+self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 2:
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						}
						else{ //negative margin

						}
						break;
					case 3: //done        
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;      
					case 4: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 5: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 6: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}


						break;
					case 7: //done  
						self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8
						self.windowOffsetLeft = 0; //DONE 7, 13
						break;
					case 8: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 9:  //done  
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 10: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						}
						else{ //negative margin

						}
						break;
					case 11: 
						self.windowOffsetTop = (self.options.zoomWindowOffety);
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 12: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 13: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(0); //DONE 7, 13
						break;
					case 14: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}

						break;
					case 15://done   
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 16:  //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;            
					default: //done  
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
					self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
					} 
				} //end isNAN
				else{
					//WE CAN POSITION IN A CLASS - ASSUME THAT ANY STRING PASSED IS
					self.externalContainer = $('#'+self.options.zoomWindowPosition);
					self.externalContainerWidth = self.externalContainer.width();
					self.externalContainerHeight = self.externalContainer.height();
					self.externalContainerOffset = self.externalContainer.offset();

					self.windowOffsetTop = self.externalContainerOffset.top;//DONE - 1
					self.windowOffsetLeft =self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

				}
				self.isWindowSet = true;
				self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffety;
				self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffetx;

				self.zoomWindow.css({ top: self.windowOffsetTop});
				self.zoomWindow.css({ left: self.windowOffsetLeft});

				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ top: 0});
					self.zoomWindow.css({ left: 0});

				}   


				self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));   
				self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
				if(self.Etoppos){self.windowTopPos = 0;}
				if(self.Eloppos){self.windowLeftPos = 0;}     
				if(self.Eboppos){self.windowTopPos = (self.largeHeight/self.currentZoomLevel-self.zoomWindow.height())*(-1);  } 
				if(self.Eroppos){self.windowLeftPos = ((self.largeWidth/self.currentZoomLevel-self.zoomWindow.width())*(-1));}    

				//stops micro movements
				if(self.fullheight){
					self.windowTopPos = 0;

				}
				if(self.fullwidth){
					self.windowLeftPos = 0;

				}
				//set the css background position 


				if(self.options.zoomType == "window" || self.options.zoomType == "inner") {

					if(self.zoomLock == 1){
						//overrides for images not zoomable
						if(self.widthRatio <= 1){

							self.windowLeftPos = 0;
						}
						if(self.heightRatio <= 1){ 
							self.windowTopPos = 0;
						}
					}
					// adjust images less than the window height

					if (self.options.zoomType == "window") {
						if (self.largeHeight < self.options.zoomWindowHeight) {

							self.windowTopPos = 0;
						}
						if (self.largeWidth < self.options.zoomWindowWidth) {
							self.windowLeftPos = 0;
						}
					}

					//set the zoomwindow background position
					if (self.options.easing){

						//     if(self.changeZoom){
						//           clearInterval(self.loop);
						//           self.changeZoom = false;
						//           self.loop = false;

						//            }
						//set the pos to 0 if not set
						if(!self.xp){self.xp = 0;}
						if(!self.yp){self.yp = 0;}  
						//if loop not already started, then run it 
						if (!self.loop){           
							self.loop = setInterval(function(){                
								//using zeno's paradox    

								self.xp += (self.windowLeftPos  - self.xp) / self.options.easingAmount; 
								self.yp += (self.windowTopPos  - self.yp) / self.options.easingAmount;
								if(self.scrollingLock){


									clearInterval(self.loop);
									self.xp = self.windowLeftPos;
									self.yp = self.windowTopPos            

									self.xp = ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
									self.yp = (((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));                         

									if(self.changeBgSize){    
										if(self.nzHeight>self.nzWidth){  
											if(self.options.zoomType == "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}   
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
										}
										else{   
											if(self.options.zoomType != "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}            
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            

										}

										/*
             if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
						if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}  
                 if (!self.bgloop){   
                 	self.bgloop = setInterval(function(){   

                 self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount; 
								self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;

           self.zoomWindow.css({ "background-size": self.bgxp + 'px ' + self.bgyp + 'px' });


                  }, 16);

                 }
										 */
										self.changeBgSize = false;
									}

									self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
									self.scrollingLock = false;
									self.loop = false;

								}
								else if (Math.round(Math.abs(self.xp - self.windowLeftPos) + Math.abs(self.yp - self.windowTopPos)) < 1) {
									//stops micro movements
									clearInterval(self.loop);
									self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
									self.loop = false;
								}
								else{
									if(self.changeBgSize){    
										if(self.nzHeight>self.nzWidth){ 
											if(self.options.zoomType == "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}         
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
										}
										else{                 
											if(self.options.zoomType != "lens"){     
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
											}      
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
										}
										self.changeBgSize = false;
									}                   

									self.zoomWindow.css({ backgroundPosition: self.xp + 'px ' + self.yp + 'px' });
								}       
							}, 16);
						}
					}   
					else{    
						if(self.changeBgSize){  
							if(self.nzHeight>self.nzWidth){  
								if(self.options.zoomType == "lens"){      
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
								} 

								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
							}
							else{     
								if(self.options.zoomType == "lens"){      
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
								} 
								if((self.largeHeight/self.newvaluewidth) < self.options.zoomWindowHeight){ 

									self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
								}
								else{

									self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });   
								}

							}
							self.changeBgSize = false;
						}     

						self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });       
					}
				} 
			},
			setTintPosition: function(e){
				var self = this;
				self.nzOffset = self.$elem.offset();
				self.tintpos = String(((e.pageX - self.nzOffset.left)-(self.zoomLens.width() / 2)) * (-1)); 
				self.tintposy = String(((e.pageY - self.nzOffset.top) - self.zoomLens.height() / 2) * (-1));	
				if(self.Etoppos){
					self.tintposy = 0;
				}
				if(self.Eloppos){
					self.tintpos=0;
				}     
				if(self.Eboppos){
					self.tintposy = (self.nzHeight-self.zoomLens.height()-(self.options.lensBorderSize*2))*(-1);
				} 
				if(self.Eroppos){
					self.tintpos = ((self.nzWidth-self.zoomLens.width()-(self.options.lensBorderSize*2))*(-1));
				}    
				if(self.options.tint) {
					//stops micro movements
					if(self.fullheight){
						self.tintposy = 0;

					}
					if(self.fullwidth){ 
						self.tintpos = 0;

					}   
					self.zoomTintImage.css({'left': self.tintpos+'px'});
					self.zoomTintImage.css({'top': self.tintposy+'px'});
				}
			},

			swaptheimage: function(smallimage, largeimage){
				var self = this;
				var newImg = new Image(); 

				if(self.options.loadingIcon){
					self.spinner = $('<div style="background: url(\''+self.options.loadingIcon+'\') no-repeat center;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;z-index: 2000;position: absolute; background-position: center center;"></div>');
					self.$elem.after(self.spinner);
				}

				self.options.onImageSwap(self.$elem);

				newImg.onload = function() {
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					self.zoomImage = largeimage;
					self.zoomWindow.css({ "background-size": self.largeWidth + 'px ' + self.largeHeight + 'px' });
					self.swapAction(smallimage, largeimage);
					return;              
				}          
				newImg.src = largeimage; // this must be done AFTER setting onload

			},
			swapAction: function(smallimage, largeimage){


				var self = this;    

				var newImg2 = new Image(); 
				newImg2.onload = function() {
					//re-calculate values
					self.nzHeight = newImg2.height;
					self.nzWidth = newImg2.width;
					self.options.onImageSwapComplete(self.$elem);

					self.doneCallback();  
					return;      
				}          
				newImg2.src = smallimage; 

				//reset the zoomlevel to that initially set in options
				self.currentZoomLevel = self.options.zoomLevel;
				self.options.maxZoomLevel = false;

				//swaps the main image
				//self.$elem.attr("src",smallimage);
				//swaps the zoom image     
				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + largeimage + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 
				} 



				self.currentImage = largeimage;

				if(self.options.imageCrossfade){
					var oldImg = self.$elem;
					var newImg = oldImg.clone();         
					self.$elem.attr("src",smallimage)
					self.$elem.after(newImg);
					newImg.stop(true).fadeOut(self.options.imageCrossfade, function() {
						$(this).remove();         
					});

					//       				if(self.options.zoomType == "inner"){
					//remove any attributes on the cloned image so we can resize later
					self.$elem.width("auto").removeAttr("width");
					self.$elem.height("auto").removeAttr("height");
					//   }

					oldImg.fadeIn(self.options.imageCrossfade);

					if(self.options.tint && self.options.zoomType != "inner") {

						var oldImgTint = self.zoomTintImage;
						var newImgTint = oldImgTint.clone();         
						self.zoomTintImage.attr("src",largeimage)
						self.zoomTintImage.after(newImgTint);
						newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function() {
							$(this).remove();         
						});



						oldImgTint.fadeIn(self.options.imageCrossfade);


						//self.zoomTintImage.attr("width",elem.data("image"));

						//resize the tint window
						self.zoomTint.css({ height: self.$elem.height()});
						self.zoomTint.css({ width: self.$elem.width()});
					}    

					self.zoomContainer.css("height", self.$elem.height());
					self.zoomContainer.css("width", self.$elem.width());

					if(self.options.zoomType == "inner"){ 
						if(!self.options.constrainType){
							self.zoomWrap.parent().css("height", self.$elem.height());
							self.zoomWrap.parent().css("width", self.$elem.width());

							self.zoomWindow.css("height", self.$elem.height());
							self.zoomWindow.css("width", self.$elem.width());
						}
					} 

					if(self.options.imageCrossfade){  
						self.zoomWrap.css("height", self.$elem.height());
						self.zoomWrap.css("width", self.$elem.width());
					} 
				}
				else{
					self.$elem.attr("src",smallimage); 
					if(self.options.tint) {
						self.zoomTintImage.attr("src",largeimage);
						//self.zoomTintImage.attr("width",elem.data("image"));
						self.zoomTintImage.attr("height",self.$elem.height());
						//self.zoomTintImage.attr('src') = elem.data("image");
						self.zoomTintImage.css({ height: self.$elem.height()}); 
						self.zoomTint.css({ height: self.$elem.height()});

					}
					self.zoomContainer.css("height", self.$elem.height());
					self.zoomContainer.css("width", self.$elem.width());

					if(self.options.imageCrossfade){  
						self.zoomWrap.css("height", self.$elem.height());
						self.zoomWrap.css("width", self.$elem.width());
					} 
				}              
				if(self.options.constrainType){     

					//This will contrain the image proportions
					if(self.options.constrainType == "height"){ 

						self.zoomContainer.css("height", self.options.constrainSize);
						self.zoomContainer.css("width", "auto");

						if(self.options.imageCrossfade){  
							self.zoomWrap.css("height", self.options.constrainSize);
							self.zoomWrap.css("width", "auto"); 
							self.constwidth = self.zoomWrap.width();


						}
						else{                  
							self.$elem.css("height", self.options.constrainSize);
							self.$elem.css("width", "auto");
							self.constwidth = self.$elem.width();
						} 

						if(self.options.zoomType == "inner"){

							self.zoomWrap.parent().css("height", self.options.constrainSize);
							self.zoomWrap.parent().css("width", self.constwidth);   
							self.zoomWindow.css("height", self.options.constrainSize);
							self.zoomWindow.css("width", self.constwidth);    
						}        
						if(self.options.tint){
							self.tintContainer.css("height", self.options.constrainSize);
							self.tintContainer.css("width", self.constwidth);
							self.zoomTint.css("height", self.options.constrainSize);
							self.zoomTint.css("width", self.constwidth);
							self.zoomTintImage.css("height", self.options.constrainSize);
							self.zoomTintImage.css("width", self.constwidth); 
						} 

					}
					if(self.options.constrainType == "width"){       
						self.zoomContainer.css("height", "auto");
						self.zoomContainer.css("width", self.options.constrainSize);

						if(self.options.imageCrossfade){
							self.zoomWrap.css("height", "auto");
							self.zoomWrap.css("width", self.options.constrainSize);
							self.constheight = self.zoomWrap.height();
						}
						else{            
							self.$elem.css("height", "auto");
							self.$elem.css("width", self.options.constrainSize); 
							self.constheight = self.$elem.height();              
						} 
						if(self.options.zoomType == "inner"){
							self.zoomWrap.parent().css("height", self.constheight);
							self.zoomWrap.parent().css("width", self.options.constrainSize);   
							self.zoomWindow.css("height", self.constheight);
							self.zoomWindow.css("width", self.options.constrainSize);    
						} 
						if(self.options.tint){
							self.tintContainer.css("height", self.constheight);
							self.tintContainer.css("width", self.options.constrainSize);
							self.zoomTint.css("height", self.constheight);
							self.zoomTint.css("width", self.options.constrainSize);
							self.zoomTintImage.css("height", self.constheight);
							self.zoomTintImage.css("width", self.options.constrainSize); 
						}   

					}        


				}

			},
			doneCallback: function(){

				var self = this;
				if(self.options.loadingIcon){
					self.spinner.hide();     
				}   

				self.nzOffset = self.$elem.offset();
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				// reset the zoomlevel back to default
				self.currentZoomLevel = self.options.zoomLevel;

				//ratio of the large to small image
				self.widthRatio = self.largeWidth / self.nzWidth;
				self.heightRatio = self.largeHeight / self.nzHeight; 

				//NEED TO ADD THE LENS SIZE FOR ROUND
				// adjust images less than the window height
				if(self.options.zoomType == "window") {

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;  

					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}

					if(self.options.zoomWindowWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}


					if(self.zoomLens){

						self.zoomLens.css('width', lensWidth);    
						self.zoomLens.css('height', lensHeight); 


					}
				}
			},
			getCurrentImage: function(){
				var self = this;  
				return self.zoomImage; 
			}, 
			getGalleryList: function(){
				var self = this;   
				//loop through the gallery options and set them in list for fancybox
				self.gallerylist = [];
				if (self.options.gallery){ 


					$('#'+self.options.gallery + ' a').each(function() {

						var img_src = '';
						if($(this).data("zoom-image")){
							img_src = $(this).data("zoom-image");
						}
						else if($(this).data("image")){
							img_src = $(this).data("image");
						}			
						//put the current image at the start
						if(img_src == self.zoomImage){
							self.gallerylist.unshift({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});	
						}
						else{
							self.gallerylist.push({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});
						}


					});
				}                                                       
				//if no gallery - return current image
				else{
					self.gallerylist.push({
						href: ''+self.zoomImage+'',
						title: $(this).find('img').attr("title")
					}); 
				}
				return self.gallerylist;

			},
			changeZoomLevel: function(value){
				var self = this;   

				//flag a zoom, so can adjust the easing during setPosition     
				self.scrollingLock = true;   

				//round to two decimal places
				self.newvalue = parseFloat(value).toFixed(2);
				newvalue = parseFloat(value).toFixed(2);




				//maxwidth & Maxheight of the image
				maxheightnewvalue = self.largeHeight/((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);     
				maxwidthtnewvalue = self.largeWidth/((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);   	




				//calculate new heightratio
				if(self.options.zoomType != "inner")
				{
					if(maxheightnewvalue <= newvalue){
						self.heightRatio = (self.largeHeight/maxheightnewvalue) / self.nzHeight;
						self.newvalueheight = maxheightnewvalue;
						self.fullheight = true;

					}
					else{
						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 
						self.newvalueheight = newvalue;
						self.fullheight = false;

					}


//					calculate new width ratio

					if(maxwidthtnewvalue <= newvalue){
						self.widthRatio = (self.largeWidth/maxwidthtnewvalue) / self.nzWidth;
						self.newvaluewidth = maxwidthtnewvalue;
						self.fullwidth = true;

					}
					else{
						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						self.newvaluewidth = newvalue;
						self.fullwidth = false;

					}
					if(self.options.zoomType == "lens"){
						if(maxheightnewvalue <= newvalue){
							self.fullwidth = true;
							self.newvaluewidth = maxheightnewvalue;

						} else{
							self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
							self.newvaluewidth = newvalue;

							self.fullwidth = false;
						}}
				}



				if(self.options.zoomType == "inner")
				{
					maxheightnewvalue = parseFloat(self.largeHeight/self.nzHeight).toFixed(2);     
					maxwidthtnewvalue = parseFloat(self.largeWidth/self.nzWidth).toFixed(2);      
					if(newvalue > maxheightnewvalue){
						newvalue = maxheightnewvalue;
					}
					if(newvalue > maxwidthtnewvalue){
						newvalue = maxwidthtnewvalue;
					}      


					if(maxheightnewvalue <= newvalue){


						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 
						if(newvalue > maxheightnewvalue){
							self.newvalueheight = maxheightnewvalue;
						}else{
							self.newvalueheight = newvalue;
						}
						self.fullheight = true;


					}
					else{



						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 

						if(newvalue > maxheightnewvalue){

							self.newvalueheight = maxheightnewvalue;
						}else{
							self.newvalueheight = newvalue;
						}
						self.fullheight = false;
					}




					if(maxwidthtnewvalue <= newvalue){   

						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						if(newvalue > maxwidthtnewvalue){

							self.newvaluewidth = maxwidthtnewvalue;
						}else{
							self.newvaluewidth = newvalue;
						}

						self.fullwidth = true;


					}
					else{  

						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						self.newvaluewidth = newvalue;
						self.fullwidth = false;
					}        


				} //end inner
				scrcontinue = false;

				if(self.options.zoomType == "inner"){

					if(self.nzWidth >= self.nzHeight){
						if( self.newvaluewidth <= maxwidthtnewvalue){
							scrcontinue = true;
						}
						else{

							scrcontinue = false;
							self.fullheight = true;
							self.fullwidth = true;
						}
					}
					if(self.nzHeight > self.nzWidth){     
						if( self.newvaluewidth <= maxwidthtnewvalue){
							scrcontinue = true;
						}
						else{
							scrcontinue = false;  

							self.fullheight = true;
							self.fullwidth = true;
						}
					}
				}

				if(self.options.zoomType != "inner"){
					scrcontinue = true;
				}

				if(scrcontinue){



					self.zoomLock = 0;
					self.changeZoom = true;

					//if lens height is less than image height


					if(((self.options.zoomWindowHeight)/self.heightRatio) <= self.nzHeight){


						self.currentZoomLevel = self.newvalueheight; 
						if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
							self.changeBgSize = true;

							self.zoomLens.css({height: String((self.options.zoomWindowHeight)/self.heightRatio) + 'px' }) 
						}
						if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {  
							self.changeBgSize = true;  
						}	


					} 




					if((self.options.zoomWindowWidth/self.widthRatio) <= self.nzWidth){



						if(self.options.zoomType != "inner"){
							if(self.newvaluewidth > self.newvalueheight)   {
								self.currentZoomLevel = self.newvaluewidth;                 

							}
						}

						if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
							self.changeBgSize = true;

							self.zoomLens.css({width: String((self.options.zoomWindowWidth)/self.widthRatio) + 'px' })
						}
						if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {  
							self.changeBgSize = true;
						}	

					}
					if(self.options.zoomType == "inner"){
						self.changeBgSize = true;  

						if(self.nzWidth > self.nzHeight){
							self.currentZoomLevel = self.newvaluewidth;
						}
						if(self.nzHeight > self.nzWidth){
							self.currentZoomLevel = self.newvaluewidth;
						}
					}

				}      //under

				//sets the boundry change, called in setWindowPos
				self.setPosition(self.currentLoc);
				//
			},
			closeAll: function(){
				if(self.zoomWindow){self.zoomWindow.hide();}
				if(self.zoomLens){self.zoomLens.hide();}
				if(self.zoomTint){self.zoomTint.hide();}
			},
			changeState: function(value){
      	var self = this;
				if(value == 'enable'){self.options.zoomEnabled = true;}
				if(value == 'disable'){self.options.zoomEnabled = false;}

			}

	};




	$.fn.elevateZoom = function( options ) {
		return this.each(function() {
			var elevate = Object.create( ElevateZoom );

			elevate.init( options, this );

			$.data( this, 'elevateZoom', elevate );

		});
	};

	$.fn.elevateZoom.options = {
			zoomActivation: "hover", // Can also be click (PLACEHOLDER FOR NEXT VERSION)
      zoomEnabled: true, //false disables zoomwindow from showing
			preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
			zoomLevel: 1, //default zoom level of image
			scrollZoom: false, //allow zoom on mousewheel, true to activate
			scrollZoomIncrement: 0.1,  //steps of the scrollzoom
			minZoomLevel: false,
			maxZoomLevel: false,
			easing: false,
			easingAmount: 12,
			lensSize: 200,
			zoomWindowWidth: 700,
			zoomWindowHeight: 558,
			zoomWindowOffetx: 0,
			zoomWindowOffety: 0,
			zoomWindowPosition: 1,
			zoomWindowBgColour: "#fff",
			lensFadeIn: false,
			lensFadeOut: false,
			debug: false,
			zoomWindowFadeIn: false,
			zoomWindowFadeOut: false,
			zoomWindowAlwaysShow: false,
			zoomTintFadeIn: false,
			zoomTintFadeOut: false,
			borderSize: 1,
			showLens: true,
			borderColour: "#ccc",
			lensBorderSize: 1,
			lensBorderColour: "#000",
			lensShape: "square", //can be "round"
			zoomType: "window", //window is default,  also "lens" available -
			containLensZoom: false,
			lensColour: "white", //colour of the lens background
			lensOpacity: 0.4, //opacity of the lens
			lenszoom: false,
			tint: false, //enable the tinting
			tintColour: "#333", //default tint color, can be anything, red, #ccc, rgb(0,0,0)
			tintOpacity: 0.4, //opacity of the tint
			gallery: false,
			galleryActiveClass: "zoomGalleryActive",
			imageCrossfade: false,
			constrainType: false,  //width or height
			constrainSize: false,  //in pixels the dimensions you want to constrain on
			loadingIcon: false, //http://www.example.com/spinner.gif
			cursor:"default", // user should set to what they want the cursor as, if they have set a click function
			responsive:true,
			onComplete: $.noop,
      onDestroy: function() {},
			onZoomedImageLoaded: function() {},
			onImageSwap: $.noop,
			onImageSwapComplete: $.noop
	};

})( jQuery, window, document );
<!-- Page specific js:END -->