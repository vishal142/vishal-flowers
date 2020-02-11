@extends('front.layouts.default')
@section('title','Vishal-flowers')
@section('content')

	<main>
		
	  <aside id="mainbanner" data-ga-category='Banners'>
		  <img src="{{asset('front/i1.fnp.sg/images/ban/l/banner-default.jpg')}}" alt="Banner" style="width:100%"> 
	  </aside>
		
	  <meta itemprop="serviceType" content="Gifting"/>
		
	  <div id="content-messages" class="content-messages errorMessage" style="padding-top: 0px;;display:none;">
	  	  <ul></ul>
	  </div>
		
	  <section class="banner-area content-top">
		<div class="webwrapper">
		  <aside class="occassions">
			<ul>
			  <li><a href="#">
				<figure>
					<img src="{{asset('front/assets/images/top-icon1.png')}}" alt="Icon" />
				  <figcaption>Same Day Delivery</figcaption>
				</figure>
				</a></li>
			  <li><a href="{{asset('category?sl=cakes-indonesia')}};?>">
				<figure>
					<img src="{{asset('front/assets/images/top-icon2.png')}}" alt="Icon" />
				  <figcaption>Cakes</figcaption>
				</figure>
				</a></li>
			  <li><a href="{{asset('occasion?sl=birthday-indonesia')}};?>">
				<figure>
					<img src="{{asset('front/assets/images/top-icon3.png')}}" alt="Icon" />
				  <figcaption>Birthday</figcaption>
				</figure>
				</a></li>
			  <li>
			  	<a href="{{asset('category?sl=flower-combos-indonesia')}};?>">
				<figure>
					<img src="{{asset('front/assets/images/top-icon4.png')}}" alt="Icon" />
				  <figcaption>Flower Combos</figcaption>
				</figure>
				</a></li>
			  <li><a href="{{asset('occasion?sl=anniversary-indonesia')}}">
				<figure>
					<img src="{{asset('front/assets/images/top-icon5.png')}}" alt="Icon" />
				  <figcaption>Anniversary</figcaption>
				</figure>
				</a></li>
			  <li><a href="#">
				<figure>
					<img src="{{asset('front/assets/images/top-icon6.png')}}" alt="Icon" />
				  <figcaption>Midnight</figcaption>
				</figure>
				</a></li>
			  <li><a href="#">
				<figure>
					<img src="{{asset('front/assets/images/top-icon7.png')}}" alt="Icon" />
				  <figcaption>New Arrivals</figcaption>
				</figure>
				</a></li>
			  <li>
			  	<a href="gift?sl=hampers-indonesia">
				<figure>
					<img src="{{asset('front/assets/images/top-icon8.png')}}" alt="Icon" />
				  <figcaption>Hampers</figcaption>
				</figure>
				</a></li>
			</ul>
		  </aside>
		  <aside class="top-banner">
			  <style>
				  #slider1 {max-width: inherit!important;}
				  .centered-btns_tabs.centered-btns1_tabs {					  
					  display: none;
				  }
			  </style>
			  <?php
			  $slider_data = (new \App\Library\helper)->perticularFlied('tbl_slider','*',array('status'=>'Active'));?>
			  
			  <div class="rslides_container">
				  <ul class="rslides" id="slider1">
				  	<?php //foreach($slider_data as $slider):?>
					<!-- <li><img src="img.php?img=gallery/'.$slider->image;&amp;mode=cm&amp;w=1279&amp;h=224" alt="<?php //echo $slider->name;?>"></li> -->
				<?php //endforeach; ?>
					<li><img src="{{asset('front/assets/images/custom/new-home-page/top-banners/sg-desk-29-oct-2019-2.jpg')}}" alt="dd"></li>
					<li><img src="{{asset('front/assets/images/custom/new-home-page/top-banners/sg-desk-29-oct-2019-3.jpg')}}" alt="dd"></li>
				  </ul>
				</div>
		  </aside>
		</div>
	  </section>
		
	  <section class="usp-strip">
		<div class="webwrapper">
		  <ul>
			<li><span><i class="material-icons">check</i></span> Trusted Florist Since 2004</li>
			<li><span><i class="material-icons">alarm_on</i></span> Guaranteed Delivery On Time</li>
			<li><span><i class="material-icons">security</i></span> 100% Secured Payment Gateway</li>
			<li><span><i class="material-icons">insert_emoticon</i></span> We Deliver Smiles</li>
		  </ul>
		</div>
	  </section>

	  <section class="heading">
		<div class="webwrapper">
		  <h1 class="maintitle"> Same Day Flower Deliveries To Anywhere In Indonesia </h1>
		  <p class="mainsubtitle">(For orders placed before 3 pm local Indonesia time)</p>
		</div>
	  </section>

	  <section class="categories best_seller">
		<div class="webwrapper">
		  <div class="category-title"> <a href="#" class="title">Best Selling Flowers</a> <a href="#" class="view-all">View all</a> </div>
		  <div class="product"> <a href="flowers?sl=rose-indonesia">
			<figure>
			<img src="{{asset('front/assets/images/pr/l/treasured-roses_1.jpg')}}"  data-src="{{asset('front/assets/images/pr/l/treasured-roses_1.jpg')}}" alt="Treasured Roses"/>
			<figcaption> <span class="p-name" itemprop="name">Treasured Roses</span>
			 <span class="h-price1">$87</span> </figcaption>
			</a> </div>
		  <div class="product"><a href="cackes?sl=chocolate-cakes-indonesia">
			<figure> <img src="{{asset('front/assets/images/pr/l/chocolate-cake_1.jpg')}}"  data-src="{{asset('front/assets/images/pr/l/chocolate-cake_1.jpg')}}" alt="Chocolate Cake"/>
			  <figcaption> <span class="p-name" itemprop="name">Chocolate Cake</span> <span class="h-price1">$73</span> </figcaption>
			</figure>
			</a> </div>
		  <div class="product"> 
		  	<a href="flowers-type?sl=flower-stand-indonesia">
			<figure> <img src="{{asset('front/assets/images/pr/l/birds-of-paradise_1.jpg')}}"  data-src="{{asset('front/assets/images/pr/l/birds-of-paradise_1.jpg')}}" alt="Birds Of Paradise"/>
			  <figcaption> <span class="p-name" itemprop="name">Birds Of Paradise</span>
			   <span class="h-price1">$149</span> </figcaption>
			</figure>
			</a> </div>
		  <div class="product"> <a href="flowers-type?sl=flower-boards-indonesia">
			<figure> <img src="{{asset('front/assets/images/pr/l/red-anthurium-jute-wrapped-potted-plant_1.jpg')}}"  data-src="{{asset('front/assets/images/pr/l/red-anthurium-jute-wrapped-potted-plant_1.jpg')}}" alt="Red Anthurium Jute Wrapped Potted Plant"/>
			  <figcaption> <span class="p-name" itemprop="name">Red Anthurium Jute Wrapped Potted Plant</span> <span class="h-price1">$57</span> </figcaption>
			</figure>
			</a> </div>
		</div>
	  </section>
		  
	  <section class="categories round active">
		<div class="webwrapper">
		  <div class="category-title"> <a href="#" class="title">All Flowers</a> <a href="#" class="view-all">View all</a></div>
		  <div class="category"><a href="flowers-type?sl=hand-bouquet-indonesia">
			<figure> 
				<img src="{{asset('front/assets/images/custom/new-home-page/flowers/flower-bouquets.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/flowers/flower-bouquets.jpg')}}" alt="Flower Bouquets"/>
			  <figcaption>Flower Bouquets</figcaption>
			</figure>
			</a> </div>
		  <div class="category"> <a href="flowers?sl=custom-roses-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/flowers/carnationsDesk-20-aug-2019.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/flowers/carnationsDesk-20-aug-2019.jpg')}}" alt="Carnations Bouquets"/>
			  <figcaption>Carnations</figcaption>
			</figure>
			</a> </div>
		  <div class="category"><a href="flowers?sl=rose-indonesia">
			<figure><img src="{{asset('front/assets/images/custom/new-home-page/flowers/roses.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/flowers/roses.jpg')}}" alt="Online Roses"/>
			  <figcaption>Roses</figcaption>
			</figure>
			</a> </div>
		  <div class="category"> <a href="flowers?sl=lilies-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/flowers/lilies.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/flowers/lilies.jpg')}}" alt="Online Lilies"/>
			  <figcaption>Lilies</figcaption>
			</figure>
			</a> </div>
		  <div class="category"><a href="flowers?sl=tulips-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/flowers/tulips.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/flowers/tulips.jpg')}}" alt="Online Tulips"/>
			  <figcaption>Tulips</figcaption>
			</figure>
			</a> </div>
		</div>
	  </section>
		  
	  <section class="categories">
		<div class="webwrapper">
		  <div class="category-title"> <a href="#" class="title">Cakes Online</a> <a href="#" class="view-all">View all</a> </div>
		  <div class="category"> <a href="#">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/cakes/cakes.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/cakes/cakes.jpg')}}" alt="Online Cakes"/>
			  <figcaption>Cakes</figcaption>
			</figure>
			</a> </div>
		  <div class="category"> 
		  	<a href="cackes?sl=anniversary-cakes-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/cakes/anniversary-cakes.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/cakes/anniversary-cakes.jpg')}}" alt="Anniversary Cakes"/>
			  <figcaption>Anniversary Cakes</figcaption>
			</figure>
			</a> </div>
		  <div class="category"> <a href="cackes?sl=birthday-cakes-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/cakes/birthday-cakes.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/cakes/birthday-cakes.jpg')}}" alt="Birthday Cakes"/>
			  <figcaption>Birthday Cakes</figcaption>
			</figure>
			</a> </div>
		  <div class="category"> <a href="cackes?sl=chocolate-cakes-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/cakes/chocolates-cakes.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/cakes/chocolates-cakes.jpg')}}" alt="Chocolate Cakes"/>
			  <figcaption>Chocolate Cakes</figcaption>
			</figure>
			</a> </div>
		  <div class="category"><a href="cackes?sl=designer-cakes-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/cakes/Designer-Cake-Desk-30-oct-2019.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/cakes/Designer-Cake-Desk-30-oct-2019.jpg')}}" alt="Designer Cakes Online"/>
			  <figcaption>Designer Cakes</figcaption>
			</figure>
			</a> 
		  </div>
		</div>
	  </section>
		  
	  <section class="banner-area content-top">
		<div class="webwrapper">
			<aside class="top-banner">
				<div class="banners">
				  <figure> <a href="gift?sl=tedy-bears-indonesia"><img src="{{asset('front/assets/images/custom/new-home-page/top-banners/DT-Birthday-29-aug-2019.jpg')}}" alt="Birthday Gifts"/></a></figure>
				</div>
				<div class="banners">
				  <figure> <a href="gift?sl=chocolates-indonesia"><img src="{{asset('front/assets/images/custom/new-home-page/top-banners/celebratgion-banner.jpg')}}" alt="Anniversary Gifts"/></a> </figure>
				</div>
				<div class="banners">
				  <figure> <a href="gift?sl=fruit-baskets-indonesia">
				  	<img src="{{asset('front/assets/images/custom/new-home-page/top-banners/DT-Grand-Opening-Flowers-29-aug-2019.jpg')}}" alt="Grand-Opening-Flowers"/></a> </figure>
				</div>
			</aside>
		</div>
	  </section>
		  
	  <section class="middle-banners active">
		<div class="webwrapper">
		  <figure> <a href="#"><img src="{{'front/assets/images/custom/new-home-page/middle-banners/DT-Same-Day-Delivery-29-aug-2019.jpg'}}" data-src="front/assets/images/custom/new-home-page/middle-banners/DT-Same-Day-Delivery-29-aug-2019.jpg" alt="Same Day Delivery Gifts"/></a> </figure>

		  <figure> <a href="occasion?sl=symphaty-indonesia">
		  	<img src="{{asset('front/assets/images/custom/new-home-page/middle-banners/DT-Sympathy-flowers-29-aug-2019.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/middle-banners/DT-Sympathy-flowers-29-aug-2019.jpg')}}" alt="sympathy-flowers Online"/></a> </figure>
		</div>
	  </section>

	  <section class="categories gift-categories">
		<div class="webwrapper">
		  <div class="category-title"><a href="#" class="title">Gifts</a> <a href="#" class="view-all">View all</a> </div>
		  <div class="category"> <a href="gift?sl=tedy-bears-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/gifts/mugs.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/gifts/mugs.jpg')}}" alt="Same Day Delivery Gifts"/>
			  <figcaption>Personalised Mugs</figcaption>
			</figure>
			</a> </div>
		  <div class="category"><a href="occasion?sl=anniversary-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/gifts/anniversary-gifts.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/gifts/anniversary-gifts.jpg')}}" alt="Anniversary Gifts"/>
			  <figcaption>Anniversary Gifts</figcaption>
			</figure>
			</a> </div>
		  <div class="category"><a href="gift?sl=gifts-for-new-born-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/gifts/birthday-gifts.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/gifts/birthday-gifts.jpg')}}" alt="Birthday Gifts"/>
			  <figcaption>Gifts</figcaption>
			</figure>
			</a> </div>
		  <div class="category">
		   <a href="gift?sl=hampers-indonesia">
			<figure>	
				<img src="{{asset('front/assets/images/custom/new-home-page/gifts/gifts-for-her.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/gifts/gifts-for-her.jpg')}}" alt="Gifts for Her"/>
			  <figcaption>Gifts for Her</figcaption>
			</figure>
			</a> 
		  </div>
		</div>
	  </section>

	  <section class="categories">
		<div class="webwrapper">
		  <div class="category-title"> <a href="#" class="title">Plants</a> <a href="#" class="view-all">View all</a> </div>
		  <div class="category"> <a href="#">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/plants/indoor-plants.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/plants/indoor-plants.jpg')}}" alt="Indoor Plants Online"/>
			  <figcaption>Indoor Plants</figcaption>
			</figure>
			</a> </div>
		  <div class="category"> <a href="#">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/plants/outdoor-plants.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/plants/outdoor-plants.jpg')}}" alt="Outdoor Plants Online"/>
			  <figcaption>Outdoor Plants</figcaption>
			</figure>
			</a> </div>
		  <div class="category"> <a href="plants?sl=lucky-bamboo-plants-indonesia">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/plants/lucky-bamboo.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/plants/lucky-bamboo.jpg')}}" alt="Lucky Bamboo Online"/>
			  <figcaption>Lucky Bamboo Plants</figcaption>
			</figure>
			</a> </div>
		  <div class="category"> <a href="#">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/plants/orchid-plants.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/plants/orchid-plants.jpg')}}" alt="Online Orchid Plants"/>
			  <figcaption>Orchid Plants</figcaption>
			</figure>
			</a> </div>
		  <div class="category"><a href="#">
			<figure> <img src="{{asset('front/assets/images/custom/new-home-page/plants/cactuses-n-succelents.jpg')}}" data-src="{{asset('front/assets/images/custom/new-home-page/plants/cactuses-n-succelents.jpg')}}" alt="Cactus and Succulent Plants"/>
			  <figcaption>Cactus N Succulents</figcaption>
			</figure>
			</a> 
		  </div>
		</div>
	  </section>

	  <section class="middle-three-tiles-banner">
		<div class="webwrapper">
		  <div class="category-title"><a href="#" class="title">Express your Emotions</a> </div>
		  <aside class="occassions brithen">
			<ul>
			  <li><a href="#">
				<figure><img src="{{asset('front/assets/images/custom/new-home-page/icons/occasions/Love.png')}}" data-src="{{asset('front/assets/images/custom/new-home-page/icons/occasions/Love.png')}}" alt="Love"/>
				  <figcaption>Love</figcaption>
				</figure>
				</a>
			  </li>
			  <li><a href="#">
				<figure><img src="{{asset('front/assets/images/custom/new-home-page/icons/occasions/ThankYou.png')}}" data-src="{{asset('front/assets/images/custom/new-home-page/icons/occasions/ThankYou.png')}}" alt="Thank You"/>
				  <figcaption>Thank You</figcaption>
				</figure>
				</a></li>
				<li><a href="#">
				<figure><img src="{{asset('front/assets/images/custom/new-home-page/icons/occasions/MissYou.png')}}" data-src="{{asset('front/assets/images/custom/new-home-page/icons/occasions/MissYou.png')}}" alt="Miss You Gifts Online"/>
				  <figcaption>Miss You</figcaption>
				</figure>
				</a></li>
			  <li><a href="#">
				<figure><img src="{{asset('front/assets/images/custom/new-home-page/icons/occasions/I-am-sorry.png')}}" data-src="{{asset('front/assets/images/custom/new-home-page/icons/occasions/I-am-sorry.png')}}" alt="Sorry Gifts Online"/>
				  <figcaption>I am Sorry</figcaption>
				</figure>
				</a></li>
			  <li><a href="flowers/congratulationsa3c0.html?promo=ShopbyoccasionIcon_desk&amp;position=8">
				<figure><img src="{{asset('front/assets/images/custom/new-home-page/icons/occasions/congratulations.png')}}" data-src="{{asset('front/assets/images/custom/new-home-page/icons/occasions/congratulations.png')}}" alt="Congratulation Gifts Online"/>
				  <figcaption>Congratulations</figcaption>
				</figure>
				</a></li>
			</ul>
		  </aside>
		</div>
	  </section> 
		  
	  <section class="bottom-banner active">
		<div class="webwrapper">
		    <figure>
				<a href="#">
					<img src="{{asset('front/assets/images/custom/new-home-page/bottom-banners/bottom-banner.jpg')}}" alt="International Flower delivery">
				</a>
			</figure>
		</div>
	  </section>

@stop