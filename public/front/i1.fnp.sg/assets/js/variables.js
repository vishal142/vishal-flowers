//request url as global variable
var AJAX_URL_LIST = {currencyUrl: cdnHost+"/control/getCurrencies", reminderUrl:cdnHost+"/control/getOccasionReminder",catalogUrl:cdnHost+"/control/getDefaultCatalogId" }; 

var AJAX_JSON_URL_LIST = {cityNamesUrl: cdnJSONHost+"/control/getGeoCityNames", searchTermSuggestionsUrl:cdnJSONHost+"/control/getSearchTermSuggetions",productListingUrl:cdnJSONHost+"/control/productlisting",youMayAlsoLikeUrl: cdnJSONHost+"/control/youmayalsolike",jcUrl: cdnJSONHost+"/control/jc", availablePincodeUrl: cdnJSONHost+"/control/getAvailablePinCodes" };


var AJAX_JSON_URL_LIST_INTL = {cityNamesUrl: cdnINTLHostName+"/control/getGeoCityNames", searchTermSuggestionsUrl:cdnINTLHostName+"/control/getSearchTermSuggetions",productListingUrl:cdnINTLHostName+"/control/productlisting",youMayAlsoLikeUrl: cdnINTLHostName+"/control/youmayalsolike",jcUrl: cdnINTLHostName+"/control/jc", availablePincodeUrl: cdnINTLHostName+"/control/getAvailablePinCodes" };

var SOURCE_MAPPINGS = {ONLN_DSKTP_AFLT_NT: [], ONLN_DSKTP_ALLIANCE: [], ONLN_DSKTP_EMAIL: [], ONLN_DSKTP_ORGANIC: [], ONLN_DSKTP_OTHERS: [], ONLN_DSKTP_PPC: []};

var DCR_HOST = document.location.href.indexOf("fnp.com") >= 0 ? "http://acs.fnp.com" : "";