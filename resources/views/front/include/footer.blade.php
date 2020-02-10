	<div class="back-to-top">
		<i class="material-icons">arrow_upward</i>
	</div>

	<script src="{{asset('front/i1.fnp.sg/assets/js/custom/jQuery.loadScroll.js')}}" defer></script>

	<script>
		document.addEventListener( "DOMContentLoaded", function () {
			$( function () {
				$( 'img' ).loadScroll( 500 );
			} );
			var lastScroll = 0;
			$( window ).scroll( function () {
				setTimeout( function () { //give them a second to finish scrolling before doing a check
					var scroll = $( window ).scrollTop();
					if ( scroll > lastScroll + 10 ) {
						$( "header" ).addClass( "fixed_header" );
					} else if ( scroll < lastScroll - 10 ) {
						$( "header" ).removeClass( "fixed_header" );
					}
					lastScroll = scroll;
				}, 100 );
			} );
			$( window ).scroll( function () {
				var scroll = $( window ).scrollTop();
				if ( scroll >= 1925 ) {
					$( ".back-to-top" ).addClass( "top" );
					//$("#navmenubar").slideUp();
				} else {
					$( ".back-to-top" ).removeClass( "top" );
					//$("#navmenubar").slideDown();
				}
			} );
			$( '.back-to-top' ).on( "click", function () {
				$( 'html, body' ).animate( {
					scrollTop: 0
				}, '2000' );
			} );
			$( '.recently-viewed' ).slick( {
				infinite: false,
				speed: 300,
				slidesToShow: 6.5,
				slidesToScroll: 1,
			} );
			$( ".best_seller .product" ).hover( function () {
				$( this ).find( '.moreImages' ).slick( {
					infinite: true,
					speed: 500,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 1000,
					pauseOnHover: false,
					dots: true,
					fade: true,
					cssEase: 'ease-in-out',
				} );
			} );

			/*Top Banners*/
			$( '.full-width-banner' ).slick( {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				fade: true,
				autoplay: true,
				asNavFor: '.slider-nav-thumbnails',
			} );
			var totalSlides = $( '.full-width-banner figure' ).length;
			$( '.slider-nav-thumbnails' ).slick( {
				slidesToShow: totalSlides,
				slidesToScroll: 1,
				asNavFor: '.full-width-banner',
				dots: true,
				focusOnSelect: true,
				autoplay: true,
			} );

			// Remove active class from all thumbnail slides
			$( '.slider-nav-thumbnails .slick-slide' ).removeClass( 'slick-active' );

			// Set active class to first thumbnail slides
			$( '.slider-nav-thumbnails .slick-slide' ).eq( 0 ).addClass( 'slick-active' );

			// On before slide change match active thumbnail to current slide
			$( '.full-width-banner' ).on( 'beforeChange', function ( event, slick, currentSlide, nextSlide ) {
				var mySlideNumber = nextSlide;
				$( '.slider-nav-thumbnails .slick-slide' ).removeClass( 'slick-active' );
				$( '.slider-nav-thumbnails .slick-slide' ).eq( mySlideNumber ).addClass( 'slick-active' );
			} );
			var sitePath = window.location.origin;
			var bgimg = $( '.full-width-banner figure:first-child a img' ).attr( 'src' );
			//console.log(sitePath+bgimg);
			var finalImg = sitePath + bgimg;
			$( '.full-banner-container' ).css( {
				"background-image": "url(" + finalImg + ")"
			} );
			setTimeout( function () {
				$( '.banner-with-carosal .banner-carosal' ).css( {
					"opacity": "1"
				} );

			}, 1000 );

		} );
	</script>

	<script>
		var eventDays = '07-02-2017,13-02-2017,14-02-2017,15-02-2017';
		var eventDates;
		if ( eventDays ) {
			eventDates = eventDays.split( ',' );
		}
	</script>

	<div id="modallogin" class="reveal-modal row collapse toolbardialog" data-reveal aria-labelledby="logintitle" aria-hidden="true" role="dialog" data-reveal data-reveal-init data-ga-category='Header_Login' data-options="multiple_opened:true;">
		<div class="page-wrap row" data-ng-controller="NewLoginCntrl as app" data-ga-category='Account_socialLogin'>
			<div class="columns">
				<div class="row" data-ng-cloak>
					<div class="columns">
						<h4 class="signtitle" data-ng-bind="app.logintitle">Login / signup</h4>
					</div>
				</div>
				<div class="signupfrm medium-5 columns" data-ga-category='Account_ownLogin'>
					<div class="row">
						<div class="medium-7 columns">
							<div class="row">
								<div class="medium-11 columns">
									<form class="generallogin signfrminpt" method="post" id="loginmodalform" novalidate name="loginmodalform" ng-submit="app.doLogin('www.fnp.sg')">
									</form>
								</div>
								<div class="medium-1 columns"> &nbsp; </div>
							</div>
						</div>
						<div class="medium-5 columns"> &nbsp; </div>
					</div>
				</div>
			</div>
			<a class="close-reveal-modal" id="loginmodalclose" href="javascript:void(0);" aria-label="Close">&times;</a>
		</div>
	</div>

	<div id="modalcart" class="reveal-modal row collapse toolbardialog" data-reveal aria-labelledby="yourcarttitle" aria-hidden="true" role="dialog" data-ga-category="Cart">
		<div id="viewcart"></div>
	</div>

	<div id="QuickViewModal" class="reveal-modal" data-reveal aria-hidden="true" role="dialog" data-options="bg_class='bgoverlay'">
		<div id="QuickViewContent"></div>
		<a class="close-reveal-modal quickviewclose" href="javascript:void(0);" aria-label="Close">&times;</a> 
	</div>
</main>

<footer data-ga-category='Footer' style="width: 100%;">
	<div id="footer" class="row@@@@" style="width: 100%;">
		<div class="columns@@@@" style="width: 100%;">
			<div class="row@@@@ uncollapse">
				<ul class="medium-block-grid-3">
					<li id="subscribe" data-equalizer-watch>
						<h3 style="text-align: left; color: #fff;">Sign Up Now, Get 10% Off!</h3>
						<h6 style="text-align: left; color: #fff;">Sign up to receive Special Offers and Promotions</h6>
						<form id="subscribeform" name="subscribeform" class="form-grid" data-ng-controller="FormCntrl as app" novalidate data-ng-submit="subscribeform.$valid && app.subscribe()">
							<input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" autocomplete="off" placeholder="Email" id="emailId" name="emailId" data-ng-class="{'error':subscribeform.emailId.$invalid && subscribeform.$submitted}" required data-ng-model="app.emailId" required/>
							<div id="htfield">
								<input type="text" ng-trim="false" class="inputdashed mandatory addressfield" name="honeytrap" placeholder="" data-ng-model="app.honeytrapfield" data-ng-init="app.honeytrapfield='' "/>
							</div>
							<div data-ng-cloak data-alert="" class="alert-box alert alert-bottom" data-ng-if="subscribeform.emailId.$error.required && subscribeform.$submitted"> Email is required </div>
							<div data-ng-cloak data-alert="" class="alert-box alert alert-bottom" data-ng-if="subscribeform.emailId.$error.pattern && subscribeform.$submitted"> Invalid email address. </div>
							
							
							<button type="submit" class="btn postfix" data-ga-title='SUBMIT'>SUBMIT</button>
						</form>
					</li>

					<li id="securetransactions" style="min-width: 423px;">
						<img class="smily" src="{{asset('front/assets/images/footer-smily.png')}}" alt="Smily">
						<h3 style="text-align: left; color: #fff; font-size: 19px;">100% Satisfication Gurantee</h3>
						<h6 style="text-align: left; color: #fff;">"We are commited to deliver the best."</h6>
						<h4 style="text-align: left; color: #fff; font-size: 14px;">If not, we'll make it right-guaranteed.</h4>
					</li>

					<li id="socialtoolbar">
						<h6 style="color: #fff;">CONNECT WITH US</h6>
						<ul>
							<li>
								<a href="#" target="_blank" id="fb" data-ga-title='Connect with Facebook'>
							<img src="{{asset('front/assets/images/iconSpriteBg.png')}}" alt="Connect with Facebook" /></a>
							
							</li>

							<li>
								<a href="#" target="_blank" id="tw" data-ga-title='Connect with Twitter'>
							<img src="{{asset('front/assets/images/iconSpriteBg.png')}}" alt="Connect with Twitter" />
							</a>
							
							</li>
							<li>
								<a href="#" target="_blank" id="pt" data-ga-title='Connect with Pintrest'><img src="{{asset('front/assets/images/iconSpriteBg.png')}}" alt="Connect with Pintrest" />
							</a>
							</li>
						</ul>
					</li>
					<li id="securetransactions">
						<h6 style="color: #fff;">SECURE ORDERING &amp; TRANSACTIONS</h6>
						<div class="payopt">
							<img src="{{asset('front/assets/images/icon-payment.png')}}" alt="Visa, MasterCard, Discover, Paypal, American Express Logos"/> </div>
						<div class="walletopt"> <img src="{{asset('front/assets/images/wallets-option.png')}}" alt="MobiKwik Airtel Paytm Oxygen PayUMoney"/> </div>
					</li>

				</ul>
			</div>
			<div class="row@@@@ footuncollapse" style="padding-bottom: 15px;">
				<div class="columns">
					<div id="morelinks">
						<ul style="text-align: center;">
							<li><a href="#">About Us</a>
							</li>
							<li><a href="#">Terms &amp; Conditions</a>
							</li>
							<li><a href="#">Privacy Policy</a>
							</li>
							<li><a href="#">FAQs</a>
							</li>
							<li><a href="#">Sitemap</a>
							</li>
						</ul>
					</div>
					<style>
						#copyright {
							float: left;
						}
						
						#address {
							float: right;
							font-size: 0.9em;
							margin-top: 30px;
						}
					</style>
				</div>
			</div>
			<div class="row@@@@ footuncollapse" style="background: #537616;">
				<div class="columns">
					<p id="copyright@@" style="text-align: center; width: 100%; color: #fff;">Same Day Delivery, Order Before 12:30:00 am</p>
				</div>
			</div>
			<div class="row@@@@ footuncollapse" style="background: #ff3051;">
				<div class="columns">
					<p id="copyright" style="text-align: center; width: 100%;">Copyright &#169; 2019 www.saeshaflowers.com . All rights reserved.</p>
				</div>
			</div>
		</div>
	</div>
</footer>

<script src="{{asset('front/i1.fnp.sg/assets/min/common.js')}}"></script>

<script src="{{asset('front/i1.fnp.sg/v100/assets/min/product.js')}}"></script>

<script src="{{asset('front/i1.fnp.sg/v100/assets/min/microsite.js')}}"></script>

<script>
	window.dataLayer = window.dataLayer || [];
	var eventCategory;
	var eventLabel;
	$( document ).ready( function () {
		$( 'body' ).on( 'click', 'button', function () {
			var sectionLevel = $( this ).closest( '*[data-ga-category]' ).attr( 'data-ga-category' );
			eventCategory = findCategoryLevel( sectionLevel );
			eventLabel = $( this ).attr( 'title' );
			if ( eventLabel == '' || eventLabel == null ) {
				eventLabel = $( this ).attr( 'data-ga-title' );
			}
			if ( sectionLevel == 'Currency' )
				trackElement( eventCategory, eventLabel, "change" );
			else
				trackElement( eventCategory, eventLabel, "click" );
		} );

		$( 'body' ).on( 'click', '*[data-ga-element="ga-element"]', function () {
			var sectionLevel = $( this ).closest( '*[data-ga-category]' ).attr( 'data-ga-category' );
			eventCategory = findCategoryLevel( sectionLevel );
			eventLabel = $( this ).attr( 'data-ga-title' );
			if ( eventLabel == '' || eventLabel == null ) {
				eventLabel = $( this ).find( 'label[data-ga-childLabel]' ).text();
			}
			trackElement( eventCategory, eventLabel, "click" );
		} );
		$( 'body' ).on( 'click', 'a', function () {

			var sectionLevel = $( this ).closest( '*[data-ga-category]' ).attr( 'data-ga-category' );
			eventCategory = findCategoryLevel( sectionLevel );
			eventLabel = $( this ).attr( 'data-ga-title' );
			if ( eventLabel == '' || eventLabel == null )
				eventLabel = $( this ).text();
			trackElement( eventCategory, eventLabel, "click" );
		} );
	} );

	function findCategoryLevel( sectionLevel ) {
		eventCategory = "";

		if ( sectionLevel === 'Header' ) {
			eventCategory = "Homepage_" + sectionLevel;
		} else if ( sectionLevel === 'Menu' ) {
			eventCategory = "Homepage_Header_" + sectionLevel;
		} else if ( sectionLevel === 'Currency' || sectionLevel === 'Search' || sectionLevel === 'Cart' || sectionLevel === 'Account' || sectionLevel === 'Banners' ) {
			eventCategory = "Homepage_Header_" + sectionLevel;
		} else if ( sectionLevel === 'Footer' ) {
			eventCategory = "Homepage_" + sectionLevel;
		}
		if ( sectionLevel != "" && sectionLevel != null && typeof sectionLevel != "undefined" ) {
			if ( sectionLevel === 'MainContent' ) {
				eventCategory = "Homepage_" + sectionLevel;
			} else if ( sectionLevel === 'FeaturedCategories' || sectionLevel === 'Products' || sectionLevel === "SelectDate & timeslot" ) {
				eventCategory = "Homepage_MainContent_" + sectionLevel;
			} else if ( sectionLevel.includes( 'TopBar' ) ) {
				eventCategory = "Homepage_MainContent_" + sectionLevel;
			} else if ( sectionLevel.includes( 'Loginpage' ) ) {
				eventCategory = "Homepage_" + sectionLevel;
			} else if ( sectionLevel.includes( 'Checkout' ) ) {
				eventCategory = "Homepage_MainContent_" + sectionLevel;
			} else if ( sectionLevel.includes( 'SelectDate & Timeslot' ) ) {
				eventCategory = "Homepage_MainContent_" + sectionLevel;
			} else if ( sectionLevel.includes( 'Tab' ) ) {
				eventCategory = "Homepage_Header_Menu_" + sectionLevel;
			} else if ( sectionLevel.includes( 'MainContent' ) ) {
				eventCategory = "Homepage_" + sectionLevel;
			}
		}
		return eventCategory;
	}

	function gaElement( obj ) {
		var sectionLevel = $( obj ).closest( '*[data-ga-category]' ).attr( 'data-ga-category' );
		eventCategory = findCategoryLevel( sectionLevel );
		eventLabel = $( obj ).attr( 'data-ga-title' );
		trackElement( eventCategory, eventLabel, "click" );
	}

	function trackElement( category, label, actionName ) {
		dataLayer.push( {
			'event': 'gtm.click',
			'clickEvent': actionName,
			'eventCategory': category,
			'eventLabel': label
		} );
	}
</script>

<script type="text/javascript">
	if ( typeof quickShopDeliveryCutoffTime != 'undefined' ) {
		quickShopDeliveryCutoffTime = 17;
	}
	fnpPageType = "home";
	hostNameToUse = "www.fnp.sg";
	var sortFieldURL = null;
	var sortQueryStringURL = null;
	var citySearchDefaultLabel = "City does not exist";

	try {
		finishPageLoad();
	} catch ( error ) {
		console.log( error ); //its OK...lets ignore for now
	}
	$( document ).ready( function () {} );
</script>

<script src="{{asset('front/js/responsiveslides.js')}}"></script>

<script>
	// You can also use "$(window).load(function() {"
	$( function () {

		// Slideshow 1
		$( "#slider1" ).responsiveSlides( {
			auto: true,
			pager: true,
			nav: true,
			speed: 500,
			maxwidth: 800,
			namespace: "centered-btns"
		} );

	} );
</script>

<script src="{{asset('front/js/datepicker.js')}}"></script>
    <script>
        /*(function($) {
            $(function() {
                
                $(".deliverydate").datepicker({ 
                    	dateFormat:'yy-mm-dd',

                     });
               //$('#date13').datepicker('next', '#date14');
            });
        })(this.jQuery);*/
    </script>

</body>
</html>