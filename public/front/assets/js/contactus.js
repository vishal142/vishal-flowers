var IS_USER_LOGGEDIN = false;


$(document).ready(function(){
	$(".test1").hide();
	$(".test1:first").show();
	$( "#target" ).change(function() {
		$(".test1").hide();
		var test = $( "#target option:selected" ).val();
		//alert(test);
		//var activeTab = $(this).attr("rel");
		$("#"+test).fadeIn();
	});
		
});


$(document).ready(function(e) {
	var checkLoginUrl = "https://" + secureHostNameToUse + '/control/fus';
	$.ajax({
		url : checkLoginUrl,
		type : 'GET',
		dataType : 'json',
		xhrFields: {withCredentials: true},
		success : function(respData) {
			if (respData.checklogin && respData.checklogin.loggedin) {
				$("#email").css("display","none");
				trackLogedInUserOrder();
				IS_USER_LOGGEDIN = true;
				keyPressFormSubmit();
			}else{
				trackUknownUserOrder();
				keyPressFormSubmit();
			}
		}
	});
	
});


function keyPressFormSubmit(){
	$("#trackorderform input").keypress(function(event) {
	    if (event.which == 13) {
	    	if(IS_USER_LOGGEDIN){
	    		processLogedInUser();
	    	}else{
	    		processUnkownUser();
	    	}
	    	
	    }
	});
}


function  trackLogedInUserOrder(){	
	$("#myForm-order").click(function(){
		processLogedInUser();
	});
	
}

function trackUknownUserOrder(){
	$('#myForm-order').click(function(){
		processUnkownUser();
	});
}

function processLogedInUser(){
	var errors = false;
	$(".error").remove();
	if($("#oder-no").val() == ""){			
		$("#oder-no").after('<span class="error">Order no required</span>');
		errors = true;
	}
	
	if($('#oder-no').val() != ''){
		var orderId = $('#oder-no').val(); 
		window.location.href = "https://" + secureHostNameToUse +"/control/customerorder-view?orderId="+orderId;
	}
	
	if(errors == true){
		return false;
	}else{
		return true;
	}
}

function processUnkownUser(){
	var errors = false;
	$(".error").remove();
	if($("#oder-no").val() == ""){			
		$("#oder-no").after('<span class="error">Order no required</span>');
		errors = true;
	}
	if($("#email").val() == ""){			
		$("#email").after('<span class="error">Email is required.</span>');
		errors = true;
	}
	if($('#oder-no').val() != '' && $('#email').val() != '') {
		 var orderId = $('#oder-no').val();
		 var emailId = $('#email').val();
		 getOrderDetail(orderId,emailId);
	}
		if(errors == true){
			return false;
		}else{
			return true;
		}
}


function getOrderDetail(orderId,emailId){
	$.ajax({
		url : "https://" + secureHostNameToUse +"/control/trackOrder",
		type : 'GET',
		data : {
			'orderId' : orderId, 
			'emailId' : emailId
		},
		dataType : 'json',
		success : function(orderDetail) {
			if(orderDetail.valid == 'true'){
				$(".status span a.orderlogin").attr("href","https://" + secureHostNameToUse +"/control/customerorder-view?orderId="+orderId);
				prepareDOM(orderDetail.orderDetails);
				$(".status").slideDown();
			}else{
				$("form .status").css("display","none");
				$("#oder-no").after('<span class="invalidorder">Order id or Email id is invalid !!!</span>');
				$(".invalidorder").fadeOut(6000);
			}
		}
	});
}

function prepareDOM(orderDetails){
	$("form .status ul li.gifts").remove();
	var productDetailDom = $("form .status ul");
	for(var i=0;i<orderDetails.length;i++){
		var li = $("<li class='gifts'></li>");
		var liElement = $("<li class='gifts'></li>");
		var img = $("<img></img>");
		var br = $("<br></br>");
		var h4 = $("<h4></h4>");
		var h4element = $("<h4></h4>");
		img.attr('src',cdnHost+orderDetails[i].productImageUrl);
		h4.text(orderDetails[i].productName);
		h4element.text("Quantity:"+orderDetails[i].quantity);
		li.append(img);
		li.append(h4);
		li.append(h4element);
		liElement.text(orderDetails[i].productStatus);
		productDetailDom.append(li);
		productDetailDom.append(liElement);
	}
	
}