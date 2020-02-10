$(document).ready(function(e) {
    $(".show-hide").click(function(){
		$(this).parent().parent().find(".product-section").slideToggle(300);
		//$(this).parent().parent().find(".pro-details").fadeToggle(300);
		$(this).parent().parent().toggleClass("boder-show");
		if($(this).text() == 'Hide Details'){
           $(this).text('View Details');
           $(this).attr('data-ga-title','Hide Details');           
       } else {
           $(this).text('Hide Details');
           $(this).attr('data-ga-title','View Details');
           
       }
	});
});

