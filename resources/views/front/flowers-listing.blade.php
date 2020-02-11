@extends('front.layouts.default')
@section('title','flowers-categoery')
@section('content')
<style>
	.category_description,
	.category_promo {
		width: 100%;
		margin-top: 20px;
	}
	
	.plp_heading {
		font-family: 'Roboto', sans-serif;
		color: #de3252;
		font-size: 26px;
		letter-spacing: 0.15px;
		margin-top: 0px;
		margin-bottom: 0px;
		line-height: 1.4;
		font-weight: normal;
	}
	
	.plp_heading::before {
		width: 0px;
		top: 213px;
		right: 160px;
	}
	
	.plp_heading::after {
		width: 0px;
		top: 213px;
		right: 160px;
	}
	
	.categorydescription.scroll-pane {
		height: auto;
	}
	
	.category_description,
	.category_promo {
		width: 100%;
		margin-top: 20px;
	}
	
	.category_promo ul {
		width: 100%;
		margin: 0;
		padding: 0;
		line-height: 0.5;
	}
	
	.tiles li {
		float: left;
		width: 24.25%;
		margin-bottom: 10px;
		position: relative;
		margin-right: 1%;
	}
	
	.top_banners li {
		display: inline-block;
		border-radius: 4px;
		text-align: center;
		position: relative;
		transition: all ease-in-out 0.25s;
		cursor: pointer;
		background: #fff;
		padding: 8px;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
	}
	
	.tiles li:nth-child(4n+4) {
		float: right;
		margin-right: 0;
	}
	.listing-cont {
		float: left;
		width: 100%;
	}
	.listing-cont ul {
		list-style: none;
		float: left;
		margin-left: -15px;
		margin-right: -15px;
		margin-top: 30px;
	}
	.listing-cont ul li {
		float: left;
		width: 25%;
		padding: 0 15px;
		margin-bottom: 30px;
	}
	.listing-cont ul li a {
		text-align: center;
		padding: 10px;
		background-color:#fff;
		box-shadow: 0 0 10px #e8e8e8;
	}
	.listing-cont ul li a:hover {
		box-shadow: 0 0 10px #c0c0c0;
	}
	
	.listing-cont ul li a .pro-photo {
		max-width: 100%;
		margin-bottom: 20px;
	}
	.listing-cont ul li a .pro-title {
		color:#656565;
		font-weight: normal;
	}
	.listing-cont ul li a .pro-price {
		text-align: center;
		font-weight: bold;
		font-size: 21px;
		margin: 15px 0;
	}
</style>

<main>

	

	<div class="row@@@@" id="listingcontainer" style="display: block; opacity: 1;">
		<div class="columns">
			
			<div class="navigation">
				<input type="hidden" id="isCustomizedCategory" value="false">
				<div itemscope="" itemtype="https://schema.org/BreadcrumbList" id="product-breadcrumb">
					<nav data-ga-category="MainContent" id="breadcrumbs" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
						<div class="breadcrumb-wrapper">
							<a itemprop="item name" class="navmenu" href="/">Home<meta itemprop="position" content="1"></a> &nbsp;
							<i class="material-icons breadcrumb-icons">keyboard_arrow_right</i>
							<span>Flowers</span>
							<meta itemprop="position" content="2">
						</div>
					</nav>
				</div>

				<div class="leftnav ui-front">
					<label><span id="totalproductcount" class="" style="display: inline;">Showing <span>60</span> gifts out of  351 | &nbsp;</span>Sort By</label>
					<select id="sort" ng-model="app.sortByField" class="sortfieldsselectbox ng-pristine ng-valid ng-touched" ng-change="app.fetchProducts(false);" tabindex="0" aria-invalid="false" style="" onchange="short_by(this.value)">
						<option value="ASC">Recommended</option>
						<option value="DESC">New</option>
						<option value="PRICE_ASC">Price: Low to High</option>
						<option value="PRICE_DESC">Price: High to Low</option>
					</select>
				</div>
			</div>
			
			<section class="listing-cont" id="default">
				<ul style="width:100%;">
					<?php
					if(!empty($item_list)){
						$hike_data = (new \App\Library\helper)->perticularFlied('tbl_hike_price','*',array('status'=>'Active'))[0];

						$hike_percent = (new \App\Library\helper)->hike_price_chk();
					
					
					 foreach($item_list as $row):
					 	//print_r($row);
					 	//exit;

					 	if($row->price_percentage_variant =='High'){
					 	$item_pr = ($row->item_price * $row->price_percentage) / 100;
						$item_price = ($row->item_price - $row->secial_price) + $item_pr;
						}else{
						$item_price = ($row->item_price - $row->secial_price);

						}

						#if Found Hike price
						if($hike_percent !=''){
							$item_prcent = ($item_price * $hike_percent) / 100;
							$item_price = ($row->item_price - $row->secial_price) + $item_prcent;

						}
					  ?>
					
					
					<li>
						<a href="item-detail?sl=<?php echo $row->item_slug;?>">
							<img class="pro-photo" src="{{asset('uploads/item_image')}}/<?php echo $row->item_image;?>" alt="<?php echo $row->item_name;?>">
							<h3 class="pro-title"><?php echo $row->item_name;?></h3>
							<p class="pro-price">$<?php echo number_format($item_price,2);?></p>
						</a>
					</li>
				 <?php endforeach;
				}else{?>

					

				<?php }?>

				</ul>
			</section>
			<div id="short_result" style="display: none;"></div>



			<input type="hidden" name="actual_link" id="actual_link" value="<?php echo $_SERVER['REQUEST_URI'];?>">
			
			
		</div>
	</div>

	<div class="header-wrapper" style="float: left; width: 100%;">
		<div id="category-skeleton" class="category" style="display: none;">
			<script>
				var categorySkeletonUtilities = "";
				typeof loadCategorySkeletonUtilities === "function" && ( categorySkeletonUtilities = loadCategorySkeletonUtilities( "categorySkeletonUtilities", "category-skeleton" )() );
			</script>
			<div id="sk-heading"></div>
			<div id="sk-banners">
				<div class="sk-banner-div"></div>
				<div class="sk-banner-div"></div>
				<div class="sk-banner-div"></div>
				<div class="sk-banner-div"></div>
			</div>
			<div id="sk-review"></div>
			<div id="sk-breadcrumb"></div>
			<div class="sk-listing">
				<ul id="sk-products" class="medium-block-grid-4">
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
					<li class="sk-product-list"></li>
				</ul>
			</div>
		</div>
		<div class="category_description">
			<h1 class="plp_heading">Flowers Delivery India</h1>
			<div class="categorydescription scroll-pane">
				<p>Flowers are the divine creations of nature that spread smiles and positivity everywhere. Their beauty and grace make them an ideal gift for every festival and special occasion. Choose from our beautiful range of roses, carnations, orchids, and daisies to send flowers in Singapore on your loved one’s birthday, anniversary and Valentine’s Day.</p>
			</div>
		</div>
		<div class="category_promo">
			<ul class="tiles top_banners">
				<li style="margin-bottom: 30px;"><a href="occasion?sl=birthday-india">
					<img src="{{asset('front/assets/images/custom/categories/flowers/Birthday-Flower-21-aug-2019.jpg')}}" alt="Birthday Flowers">
					</a>
				</li>

				<li style="margin-bottom: 30px;">
					<a href="occasion?sl=anniversary-india">
						<img src="{{asset('front/assets/images/custom/categories/flowers/Anniversary-Flower-21-aug-2019.jpg')}}" alt="Anniversary Flowers Online">
					</a>
				</li>

				<li style="margin-bottom: 30px;">
					<a href="flowers?sl=rose-india">
					<img src="{{asset('front/assets/images/custom/categories/flowers/Roses-21-aug-2019.jpg')}}" alt="Rose Flowers">
					</a>
				</li>
				<li>
					<a href="category?sl=flower-combos-india">
						<img src="{{asset('front/assets/images/custom/categories/flowers/Flower-Combo-21-aug-2019.jpg')}}" alt="Tulip Flowers">
					</a>
				</li>
			</ul>
		</div>
	</div>
	

<script type="text/javascript">
	function short_by(elm){
		var sl = '';
		 $.ajax({
				type:"POST",
				url:'item_short_by',
				data:{'short_by':elm,'sl':sl},
				success: function(data){
					$('#default').hide();
					$('#short_result').show();
					$('#short_result').html(data);
				}
	});

	}
</script>

@stop