</head>
<body data-ng-app="fnp" class="ng-scope">	
	<header data-ga-category="Header">
		<div id="info-toolbar">
		  <div class="header-wrapper">
			<ul>
			  <li class="info-item">
				  <a id="call-info" href="https://wa.me/6281574474913"><img src="{{asset('front/assets/images/whatsapp.png')}}" alt="Whatsapp" /> +6281574474913 </a>
			  </li>
			  <li class="info-item"> 
				  <a id="email-info" href="mailto:info@saeshaflowers.com"><img src="{{asset('front/assets/images/envelope.png')}}" alt="Email" />  info@saeshaflowers.com</a>
			  </li>
			  <li id="currency" class="loaded">
					<span id="currencybtn">
						<span id="currency-sym" class="curr_aed">SGD</span>
						<i class="material-icons">keyboard_arrow_down</i>
					</span>
					<div class="currency-dropdown" style="display: none;">
						<div class="inner-div">
							<div class="arrows"></div>
							<ul id="currencydropdown">
								<li class="currencyoption" data-currencyuom="AED" data-currencyvalue="AED2.7100">
									<a href="javascript:void(0)">AED-United Arab Dirham</a>
								</li>
								<li class="currencyoption" data-currencyuom="AUD" data-currencyvalue="AUD1.0501">
									<a href="javascript:void(0)">AUD-Australian Dollar</a>
								</li>
								<li class="currencyoption" data-currencyuom="EUR" data-currencyvalue="EUR0.6501">
									<a href="javascript:void(0)">EUR- Euro</a>
								</li>
								<li class="currencyoption" data-currencyuom="CAD" data-currencyvalue="CAD0.9600">
									<a href="javascript:void(0)">CAD-Canadian Dollar</a>
								</li>
								<li class="currencyoption" data-currencyuom="CNY" data-currencyvalue="5.0301">
									<a href="javascript:void(0)">CNY-Chinese Yen</a>
								</li>
								<li class="currencyoption" data-currencyuom="GBP" data-currencyvalue="GBP0.5900">
									<a href="javascript:void(0)">GBP - British Pound</a>
								</li>
								<li class="currencyoption" data-currencyuom="HKD" data-currencyvalue="">
									<a href="javascript:void(0)">HKD-Hongkong Dollar</a>
								</li>
								<li class="currencyoption" data-currencyuom="IDR" data-currencyvalue="">
									<a href="javascript:void(0)">IDR-Indonesia Rupiah</a>
								</li>
								<li class="currencyoption" data-currencyuom="INR" data-currencyvalue="₹50.5301">
									<a href="javascript:void(0)">INR- Indian Rupees</a>
								</li>
								<li class="currencyoption" data-currencyuom="MYR" data-currencyvalue="MYR3.0100">
									<a href="javascript:void(0)">MYR-Malaysian Ringgit</a>
								</li>
								<li class="currencyoption" data-currencyuom="IDR" data-currencyvalue="">
									<a href="javascript:void(0)">OMR-Omani Rial</a>
								</li>
								<li class="currencyoption" data-currencyuom="SGD" data-currencyvalue="S$1.0000">
									<a href="javascript:void(0)">SGD-Singapore Dollar</a>
								</li>
								<li class="currencyoption" data-currencyuom="IDR" data-currencyvalue="">
									<a href="javascript:void(0)">SAR-Saudi Arabian Riyal</a>
								</li>
							</ul>
						</div>
					</div>
				  </li>
			</ul>
		  </div>
		</div>
		<div id="maintoolbar">
		  <div class="header-wrapper">
			<div id="fnplogo" class="left-side" > 
				<a href="/" target="_self" data-ga-title="Logo"> 
					<img src="{{asset('webadmin/front/assets/images/logo.png')}}" alt="Online Flower Delivery - Saesha Flowers"> 
				</a> 
			</div>
			<form class="searchfrm left-side" action="" id="searchform">
			  <input type="hidden" value="sgp"  name="FNP_CURRENT_CATALOG_ID" id="FNP_CURRENT_CATALOG_ID" />
			  <input type="search" placeholder="Search flowers, cakes, gifts etc." oninput="triggerCategoryHints(this)" onblur="hideSearchHints(this, event)" onfocus="triggerCategoryHints(this)" name="qs" id="fnpsearch" value="" autocomplete="off">
			  <i class="material-icons search-clear-pin" style="display: none;">close</i>
			  <button id="searchbtn" data-ga-title="Search" class="searchFormButton"><i class="material-icons">search</i></button>
			</form>

			<div id="searchhintlistdiv">
			  <p id="searchhintlistlabel"><span class="material-icons">trending_up</span></p>
			  <ul id="searchhintlist">
			  </ul>
			</div>
			<ul id="infotools" class="right-side">
			  <li id="otherOptions"></li>
			  <li id="help">
				  <button id="help" title="Help">
					  <span class="cart-icon"><i class="material-icons">info</i></span>
					  <span class="cart-icon">Help</span> 
				  </button>
			  </li>

			  <li id="corporate">
				<button id="help" title="Corporate"> <span class="cart-icon"><i class="material-icons">card_travel</i></span> <span class="cart-icon">Corporate</span> </button>
			  </li>

			  <li id="cart">
				<button id="cartbtn" title="View Cart"> <span class="cart-icon"><i class="material-icons">shopping_cart</i></span> <span class="cart-icon">Cart</span> <span id = "cartCount" class="cart-hide"></span>
				</button>
				<div id="cartpanel" style="display: none;">
					<div id="viewcart">
						<div class="arrow"></div>
						<div class="cart-section">
							<div class="cart-heading">
								My Cart <a onclick="closeCart();"><i class="material-icons">close</i></a>
							</div>
							<div id="cartSummaryId">
								<div class="empty-cart">
									<div class="empty-content">
										<i class="material-icons">shopping_cart</i>
										<p>
										<a href="cart/">You have 1 item in your cart</a></p>
									
									</div>
								</div>
							</div>
							<div class=" securefooterwrapper">
								<div id="youmayalsolike" class="columns"></div>
							</div>
						</div>
					</div>
				</div>
				
			  </li>


			  <li id="account">
				<button id="accountbtn" title="">
				<span><i class="material-icons">account_circle</i></span> 
				<span class="tempspan"><span>Account</span>
				 </span>
				 <span id="user-name"></span>
				</button>
				<div id="account-dropdown">
				  <div class="inner-div">
					<div class="arrows"></div>
					<ul id="account-list">
					  <li id="guest-li"> <i class="material-icons">account_circle</i>Guest
					  <span id="login-link"></li>
					  <li><a href="#">My Profile</a></li>
					  <li><a id="trackorder" href="info/contact-usfe8f.html?axn=track-order">Track Order</a></li>
					  <li><a href="#">My Orders</a></li>
					  <li><a href="#">Address Book</a></li>
					  <li><a href="#">Change Password</a></li>
					  <li><a href="welcome/user_logout">Logout</a></li>
					</ul>
				  </div>
				</div>
			  </li>
			
			</ul>
			<!-- <div id="login-message">
			  <div class="header-arrows"></div>
			  <span> Logged in successfully. Explore your account here. </span> </div> -->
		  </div>
		</div>
		
		<div id="cartpanel"> </div>
		<nav id="navmenubar">
			<div class="header-wrapper">
				<ul>
					<?php
					$data_cat = (new \App\Library\helper)->perticularFlied('tbl_category','*',array('status'=>'active'));
					 
					
					foreach($data_cat as $cat):?>
						<li><a id="#tabs-1<?php echo $cat->id;?>" href="category?sl='.$cat->category_slug"><?php echo $cat->category_name;?></a></li>

					<?php endforeach;?>

					<li><a id="#tabs-7" href="#">By Price</a></li>
						
				</ul>		
				<div id="tabs-11" data-ga-category="Halloween_SubTab">
				  <div class="sub-navmenubar">
					<section>
					  <ul>
						<li class="ui-corner-left"><a href="#">All Flowers</a></li>
						<?php $data_sub_cat_rose = (new \App\Library\helper)->perticularFlied('tbl_sub_categoery','*',array('cat_id'=>'1','status'=>'active','is_delete'=>'1'));
					
							foreach($data_sub_cat_rose as $sub_rose){?>
								 <li class="ui-corner-left"><a href="'flowers?sl='.$sub_rose->slug'"><?php echo $sub_rose->sub_cat_name;?></a></li>

							<?php } ?>
					  </ul>
					</section>
				  </div>
				</div>
				<div id="tabs-12" data-ga-category="Birthday_SubTab">
				  <!--<h4 id="hamburgermenutitle">We're sure you will walk out with the best gift</h4>-->
				  <div class="sub-navmenubar">
					<section>
					  <ul>
					  	<?php $data_sub_cat_rose = (new \App\Library\helper)->perticularFlied('tbl_sub_categoery','*',array('cat_id'=>'2','status'=>'active','is_delete'=>'1'));
					
							foreach($data_sub_cat_rose as $sub_rose){?>
								 <li class="ui-corner-left"><a href="'flowers-type?sl='.$sub_rose->slug;?>"><?php echo $sub_rose->sub_cat_name;?></a></li>

							<?php } ?>
						
					  </ul>
					</section>
				  </div>
				</div>	
				<div id="tabs-13" data-ga-category="Flowers_SubTab">
				  <!--<h4 id="hamburgermenutitle">We're sure you will walk out with the best gift</h4>-->
				  <div class="sub-navmenubar">
					<section>
					  <ul>
					  	<li class="ui-corner-left"><a href="'category?sl=flower-combos-indonesia">Flower Combos</a>
						<?php $data_sub_cat_rose = (new \App\Library\helper)->perticularFlied('tbl_sub_categoery','*',array('cat_id'=>'3','status'=>'active','is_delete'=>'1'));
					
							foreach($data_sub_cat_rose as $sub_rose){?>
								 <li class="ui-corner-left"><a href="flower-combos?sl='.$sub_rose->slug;"><?php echo $sub_rose->sub_cat_name;?></a></li>

							<?php } ?>
					  </ul>
					</section>
				  </div>
				</div>
				<div id="tabs-14" data-ga-category="Sympathy_SubTab">
				  <div class="sub-navmenubar">
					<section>
					  <ul>
						<li class="ui-corner-left"><a href="#">Plants</a></li>
						<?php $data_sub_cat_rose = (new \App\Library\helper)->perticularFlied('tbl_sub_categoery','*',array('cat_id'=>'4','status'=>'active','is_delete'=>'1'));
					
							foreach($data_sub_cat_rose as $sub_rose){?>
								 <li class="ui-corner-left"><a href="plants?sl='.$sub_rose->slug;?>"><?php echo $sub_rose->sub_cat_name;?></a></li>

							<?php } ?>

						<!-- <li class="ui-corner-left"><a href="#">Lucky Bamboo Plants</a></li> -->
					  </ul>
					</section>
				  </div>
				</div>
				<div id="tabs-15" data-ga-category="Congratulations_SubTab">
				  <div class="sub-navmenubar">
					<section>
					  <ul>

					  	<?php $data_sub_cat_rose = (new \App\Library\helper)->perticularFlied('tbl_sub_categoery','*',array('cat_id'=>'5','status'=>'active','is_delete'=>'1'));
					
							foreach($data_sub_cat_rose as $sub_rose){?>
								 <li class="ui-corner-left"><a href="occasion?sl='.$sub_rose->slug"><?php echo $sub_rose->sub_cat_name;?></a></li>

							<?php } ?>

						
					  </ul>
					</section>
				  </div>
				</div>
				<div id="tabs-16" data-ga-category="Cakes_SubTab">
				  <!--<h4 id="hamburgermenutitle">We're sure you will walk out with the best gift</h4>-->
				  <div class="sub-navmenubar">
					<section>
					  <ul>
					  	<?php $data_sub_cat_rose = (new \App\Library\helper)->perticularFlied('tbl_sub_categoery','*',array('cat_id'=>'6','status'=>'active','is_delete'=>'1'));
					
							foreach($data_sub_cat_rose as $sub_rose){?>
								 <li class="ui-corner-left"><a href="gift?sl='.$sub_rose->slug);?>"><?php echo $sub_rose->sub_cat_name;?></a></li>

							<?php } ?>

						<!-- <li class="ui-corner-left"><a href="#">Gifts for New Born</a></li>
						<li class="ui-corner-left"><a href="#">Fruit Baskets</a></li>
						<li class="ui-corner-left"><a href="#">Chocolates</a></li>
						<li class="ui-corner-left"><a href="#">Tedy Bears</a></li>
						<li class="ui-corner-left"><a href="#">Hampers</a></li> -->
					  </ul>
					</section>
				  </div>
				</div>
				
				<div id="tabs-7" data-ga-category="Plants_SubTab">
				 
				  <div class="sub-navmenubar">
					<section>
					  <ul>
						<li class="ui-corner-left"><a href="by-price?start=0&end=30">Below $ 30</a></li>
						<li class="ui-corner-left"><a href="by-price?start=30&end=60">Between $ 30 to 60 </a></li>
						<li class="ui-corner-left"><a href="by-price?start=60&end=90">Between $ 60 to 90 </a></li>
						<li class="ui-corner-left"><a href="by-price?start=90&end=9000000">Above $ 90</a></li>
					  </ul>
					</section>
				  </div>
				</div>	
				
				<div id="tabs-10" data-ga-category="Occasions_SubTab">
				  <h4 id="hamburgermenutitle">We're sure you will walk out with the best gift</h4>
				  <div class="sub-navmenubar">
					<section>
					  <h3>Everyday Occasions</h3>
					  <ul>
						<li class="ui-corner-left"><a href="#">Birthday</a></li>
						<li class="ui-corner-left"><a href="#">Anniversary</a></li>
						<li class="ui-corner-left"><a href="#">Congratulations</a></li>
						<li class="ui-corner-left"><a href="#">Love & Romance</a></li>
						<li class="ui-corner-left"><a href="#">Get Well Soon</a></li>
						<li class="ui-corner-left"><a href="#">Wedding</a></li>
						<li class="ui-corner-left"><a href="#">I'm Sorry</a></li>
						<li class="ui-corner-left"><a href="#">Thank You</a></li>
						<li class="ui-corner-left"><a href="#">New Born</a></li>
						<li class="ui-corner-left"><a href="#">Miss You</a></li>
						<li class="ui-corner-left"><a href="#">House Warming</a></li>
						<li class="ui-corner-left"><a href="#">Sympathy N Funeral</a></li>
					  </ul>
					</section>
					<section>
					  <h3>Special Occasions</h3>
					  <ul>
						<li class="ui-corner-left"><a href="#">Men's Day - 19th Nov</a></li>
						<li class="ui-corner-left"><a href="#">Valentine's Day - 14th Feb</a></li>
						<li class="ui-corner-left"><a href="#">Mother's Day - 10th May</a></li>
						<li class="ui-corner-left"><a href="#">Father's Day -  17th June</a></li>
						<li class="ui-corner-left"><a href="#">Teachers Day - 4th Sept</a></li>
						<li class="ui-corner-left"><a href="#">Boss Day - 16th Oct</a></li>
					  </ul>
					</section>
					<section>
					  <h3>Festivals</h3>
					  <ul>
						<li class="ui-corner-left"><a href="#">Halloween - 31st Oct</a></li>
						<li class="ui-corner-left"><a href="#">Christmas - 25th Dec</a></li>
						<li class="ui-corner-left"><a href="#">New Year - 1st Jan</a></li>
					  </ul>
					</section>
				  </div>
				</div>
			</div>
		</nav>
		<script>
			var toolbarButtons = {};
			var commonDialog = null;
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
				//initializing menu
				var navmenubar = __("navmenubar");
				var menuUl = navmenubar.firstElementChild;
				var head = menuUl.firstElementChild;
				var menuLis = head.children;
				for(var i = 0; i < menuLis.length; i++){
					menuLis[i].onmouseenter = activateMenuIntended;
					menuLis[i].onmouseleave = deactivateMenuIntended;
					//abc(menuLis[i]);
				}

				var submenuDivs = navmenubar.children;
				for(var i = 0; i < submenuDivs.length; i++){
					submenuDivs[i].onmouseenter = trackSubmenuStatus;
					submenuDivs[i].onmouseleave = trackSubmenuStatus;
				}
			}
			function getCurrentlyClickedToolbarButton(){
				for(var buttonId in toolbarButtons){
					var toolbarButton = toolbarButtons[buttonId];
					if(toolbarButton.fnp_Clicked){
						return toolbarButton;
					}
				}
				return undefined;
			}
			function toolbarButtonUnclicked(button){
				button.fnp_Clicked = false;
				if(button.id == "quicksearchbtn")
					button.fnp_targetEle.className = "clipped";
				else {
					//TODO Remove JQuery
					if(event.target.className.indexOf("show_login_form")>=0)
						return false;
					if(button.className == 'close-reveal-modal')  //for 'X'-Icon
						$('#commondialogs, #commondialogs>div').removeAttr("class");
					else
						button.fnp_targetEle.removeAttribute("class");
				}
				if(button.fnp_isShownInCommonDialog){
					commonDialog.removeAttribute("class");
				}
			}
			function activateMenu(menuLi){

				navbarmenu = closeAllMenus();
				var menuA = menuLi.children[0];
				menuA.parentElement.className = "opened";
				navbarmenu.fnp_activeMenu = menuA;
				var menuId = menuA.getAttribute("id").substring(1);
				var activeSubMenu = __(menuId);
				activeSubMenu.className = "opened";
				navbarmenu.fnp_activeSubMenu = activeSubMenu;
				navbarmenu.className = "opened";
				menuA.focus();
				var toolbarButton = getCurrentlyClickedToolbarButton();
				if(toolbarButton){
					toolbarButtonUnclicked(toolbarButton);
				}
				if(navbarmenu.fnp_prevHoverIntent){
					clearTimeout(navbarmenu.fnp_prevHoverIntent);
					delete navbarmenu.fnp_prevHoverIntent;
				}
			}
			function closeAllMenus(){
				var navbarmenu = __("navmenubar");//menuUl.parentElement;
				var head = navbarmenu.children[0];
				navbarmenu.removeAttribute("class");

				for(var i = 0; i < head.children.length; i++){
					if(head.children[i].nodeName == "DIV"){
						head.children[i].removeAttribute("class");
					}
				}
				var menuUl = head.children[0];
				for(var i = 0; i < menuUl.children.length; i++){
					menuUl.children[i].removeAttribute("class");
				}
				delete navbarmenu.fnp_activeMenu;
				if(navbarmenu.fnp_activeSubMenu){
					if(navbarmenu.fnp_activeSubMenu.fnp_isStillHere)delete navbarmenu.fnp_activeSubMenu.fnp_isStillHere;
					delete navbarmenu.fnp_activeSubMenu;
				}
				return navbarmenu;
			}
			function activateMenuIntended(event){
				var menuLi = event.target;
				var menuA = menuLi.firstElementChild;
				var menuUl = menuLi.parentElement;
				var head = menuUl.parentElement;
				var navbarmenu = head.parentElement;
				navbarmenu.fnp_activeMenu = menuA;
				var fromEle = event.relatedTarget;
				var toEle = event.target;
				prepareNavDiv(menuLi);
				if(fromEle != null && ( toEle.parentElement == fromEle.parentElement)){
					//call immediately... no need to delay
					activateMenu(menuLi);
					if(navbarmenu.fnp_prevHoverIntent){
						clearTimeout(navbarmenu.fnp_prevHoverIntent);
						delete navbarmenu.fnp_prevHoverIntent;
					}
				}
				else {
					navbarmenu.fnp_prevHoverIntent = setTimeout(function(){
						if(navbarmenu.fnp_activeMenu && (menuUl.contains(navbarmenu.fnp_activeMenu) || (navbarmenu.fnp_activeSubMenu && navbarmenu.fnp_activeSubMenu.fnp_isStillHere))){
							//hover is intended - fire it
							activateMenu(menuLi);
						}
					});
				}
			}
			function deactivateMenuIntended(event){
				//close only if not still not hovering
				var toEle = event.relatedTarget;
				var fromEle = event.target;
				if(fromEle != null && toEle != null && (toEle.parentElement == fromEle.parentElement || toEle.nodeName == "SECTION" || toEle.nodeName == 'ASIDE')){
					//no need of any action
				}
				else {
					closeAllMenus();
				}
			}
			function trackSubmenuStatus(event){
				if(event.type == "mouseenter")
					event.target.fnp_isStillHere = true;
				else if(event.type == "mouseleave") {
					delete event.target.fnp_isStillHere;
					closeAllMenus();
				} else {
					delete event.target.fnp_isStillHere;
					if(event.target == null || event.relatedTarget == null || event.relatedTarget.nodeName == "NAV" || event.relatedTarget.nodeName == "HTML" || event.relatedTarget.nodeName == "SECTION" || event.relatedTarget.nodeName == "IMG" || event.relatedTarget.nodeName == "ASIDE" || event.relatedTarget.nodeName == "DIV")
						closeAllMenus();
				}
			}
		function prepareNavDiv(menuLi){

			var menuA = menuLi.firstElementChild;
			var contentDiv = menuA.getAttribute("id").substring(1);
			var menuItemLeft = menuLi.offsetLeft;
			var totalSectionWidth = findOffsetWidth(contentDiv);/*document.getElementById(contentDiv).offsetWidth;*/
			var totalWidthOfMenu=document.getElementById("navmenubar").offsetWidth;

			var rightSpace=(totalWidthOfMenu-totalSectionWidth);
			var subMenuLeftstart = menuItemLeft;
			var endPadding = 58; //We are adding right buffer from 3rd position of the screen.
			//position of li + totalsectionwidth
			if(menuItemLeft+totalSectionWidth>totalWidthOfMenu){
				var extendedWidth=(menuItemLeft+totalSectionWidth)-totalWidthOfMenu;
				subMenuLeftstart=menuItemLeft-extendedWidth;
				if(totalWidthOfMenu/3<menuItemLeft){
					subMenuLeftstart=subMenuLeftstart-endPadding;
				}
			}
			document.getElementById(contentDiv).style.left = subMenuLeftstart+"px";
		}
		function findOffsetWidth(id){
			var width=0;
			document.getElementById(id).style.position="absolute";
			document.getElementById(id).style.display="block";
			width = document.getElementById(id).offsetWidth;
			document.getElementById(id).style.position=null;
			document.getElementById(id).style.display=null;
			return width;

		}
		window.onload=fnpInitialize;

		</script>
	</header>