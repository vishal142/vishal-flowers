function loadCategorySkeletonUtilities(name, domId) {
	return function() {
    	var isSkeletonEnabled = true,
    	component = document.getElementById(domId);
    	return {
    		isSkeletonEnabled : function() {
    			return isSkeletonEnabled;
    		},
    		disableSkeleton : function() {
    			isSkeletonEnabled = false;
    			component && (component.style.display = "none");
    			setTimeout(function(){
    				window[name] = undefined;
    			}.bind(this),0);
    			return true;
    		}
    	}
    };
}

function enhanceComponentLoad(domId,skeletonUtilityName, callback) {
	return function(){
		var component = document.getElementById(domId);
		function canCheckForSkeleton() {
			try {
				return typeof window[skeletonUtilityName] === "object" && window[skeletonUtilityName].isSkeletonEnabled;
			} catch(error) {
				return false;
			}
		}
		function fadeOut(element) {
		    var opacity = 0,
		    fps = 1000/60;
		    function increase () {
		        opacity += 0.05;
		        if (opacity >= 1){
		            // complete
		            element.style.opacity = 1;
		            callback && callback();
		            return true;
		        }
		        element.style.opacity = opacity;
		        window.requestAnimationFrame(increase,fps);
		    }
		    increase();
		}
		try {
			canCheckForSkeleton() && window[skeletonUtilityName].isSkeletonEnabled() && (component.style.display = "none");
		} catch(error) {
			//hmm... let them know :(.
			console.error(error);
		}
		document.addEventListener("DOMContentLoaded", function(event){
			try {
				if(canCheckForSkeleton() && window[skeletonUtilityName].isSkeletonEnabled() && window[skeletonUtilityName].disableSkeleton() && component.style.display === "none") {
					component.style.opacity = "0";
					component.style.display = "block";
					fadeOut(component);
				}
			} catch(error) {
				//One try, please.
				canCheckForSkeleton() && window[skeletonUtilityName].disableSkeleton() && component.style.display === "none" && (component.style.display = "block") && callback && callback();
			}
		});
	}
}

function enhanceProductListingLoad() {
	window.scrollTo(0,0);
	var enhancedProductListingComponent = enhanceComponentLoad("listingcontainer","categorySkeletonUtilities");
	enhancedProductListingComponent();
}