<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta http-equiv="x-ua-compatible" content="ie=edge"/>
<link rel="shortcut icon" href="{{asset('front/assets/images/favicon.png')}}"/>

<meta name="google-site-verification" content="OBTfGg8o6svBaFAi-qJea2zrwczMXhFTdVElKFcHzPk" />
<meta name="google-site-verification" content="bGz-8OnSIYShn1GD0GtuzNvY_b9RmpZzBVwCwkSZ_5s" />
<meta name="google-site-verification" content="a64AP3q-NK_sVsT184fBwGWuMlznW0Pl107-74eevgU" />
<meta name="twitter:image" content="{{asset('front/assets/images/favicon.png')}}"/>
<meta property="og:image" content="{{asset('front/assets/images/favicon.png')}}"/>

<meta title="">
<meta description="">

<!-- <meta name="twitter:image:height" content="500" />
<meta name="twitter:image:width" content="500" />
<meta property="og:image:width" content="500">
<meta property="og:image:height" content="500">
<link rel="alternate" hreflang="en" href="https://www.fnp.com/singapore/flowers" />
<link rel="alternate" hreflang="en-SG" href="index.html" />
<meta property="og:url" content="index.html"/>
<meta name="twitter:url" content="index.html">
<link rel="canonical" href="index.html" />
<link rel="alternate" href="https://m.fnp.sg/" media="only screen and (max-width: 1024px)"/>
<link rel="alternate" hreflang="en-SG" href="index.html" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" /> -->

<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,300">
<link rel="stylesheet" href="{{asset('front/css/bootstrap.min.css')}}">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="{{asset('front/js/bootstrap.min.js')}}"></script>
<style>
	@font-face {
		font-family: 'Roboto';
		src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v15/CWB0XYA8bzo0kSThX0UTuA.woff2) format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
	}
	body {
		background: #fff;
		color: #222;
		cursor: auto;
		font-style: normal;
		font-weight: normal;
		line-height: 1.2;
		margin: 0;
		padding: 0;
		position: relative;
	}/* Loading Material Icon*/
	@font-face {
		font-family: 'Material Icons';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/materialicons/v40/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.woff) format('woff');
	}
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 300;
		font-display: fallback;
		src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmSU5fBBc4.woff2) format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-display: fallback;
		src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4.woff2) format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 700;
		font-display: fallback;
		src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfBBc4.woff2) format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 100;
		font-display: fallback;
		src: local('Roboto Thin'), local('Roboto-Thin'), url(https://fonts.gstatic.com/s/roboto/v18/KFOkCnqEu92Fr1MmgVxIIzI.woff2) format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	/*main {
		padding-top: 121px;
	}*/
	.breadcrumb-icons {
		font-size: 20px !important;
		vertical-align: middle;
	}
	.quickLinks {
		float: left;
		width: 100%;
		margin-bottom: 10px;
		font-family: 'Roboto';
	}
	#listingcontainer>.columns {
		padding-left: 35px;
		padding-right: 35px;
	}
	.menu {
		background: #666;
		margin-top: 5px;
		border: 0px solid #555;
	}
	.leftnav label {
		font-family: roboto;
		color: rgb(72, 72, 72);
		font-size: 14px;
	}
	.leftnav.ui-front > #sort {
		width: 180px;
		height: 35px;
		font-family: Roboto;
		font-size: 14px;
		margin-top: -8px;
	}
	.leftnav.ui-front > select {
		padding: 0 0 0 0.2rem !important;
	}
	.categorydescription {
		overflow-y: hidden;
		overflow-x: hidden;
	}
	.menu .top-bar-section li.has-dropdown a.label {
		font-size: 14px;
		text-align: left;
		text-transform: capitalize;
		text-decoration: none;
		height: 47px;
		padding: 5px 24px;
		background: 0;
		z-index: 5000;
		border-left: 0 solid #555;
		border-right: 1px solid #555;
	}
	.menu .top-bar-section li.has-dropdown a.label {
		color: #fff !important;
		font-family: 'Roboto', Arial, sans-serif;
	}
	.has-dropdown a label.active {
		color: #fff;
		font-size: 0.75rem;
		margin-top: -20px;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
		text-align: center;
	}
	.has-dropdown label.active {
		position: absolute;
		top: 50px;
		display: block;
		z-index: 10000;
		left: 50%;
		transform: translateX(-50%);
		max-width: 100%;
		white-space: nowrap;
		text-transform: capitalize;
	}
	#listingcontainer>.columns {
		padding-left: 35px;
		padding-right: 35px;
	}/* Productlisting css start */
	.productlisting li a:hover {
		color: #31afac;
		border: 0;
		box-shadow: 0 2px 10px rgba(0,0,0,0.2);
	}
	.productlisting>ul a {
		width: 100%;
		background: #fff;
	}
	.productlisting img {
		margin-bottom: 0.5em;
		background-position: 59% 44%;
		width: 100%;
		padding: 0.5em;
		margin: 0;
	}
	.productlisting .p-name {
		line-height: 2em;
		color: #909090;
	}
	.p-name {
		font-size: 13px;
	}
	span {
		display: inline-block;
	}
	.infobar {
		background: rgba(255, 255, 255, 0.8);
		padding: 0.1em 6%;
		position: relative;
		top: -10.1em;
		margin: 0 auto;
	}
	.productlisting .infobar>span {
		width: 50%;
		color: #767575;
		height: 1.9em;
		line-height: 1.9em;
		overflow: hidden;
		text-align: center;
		font-family: "roboto slab";
		font-weight: 300;
	}
	.productlisting .infobar>span::before {
		content: "";
		width: 23px;
		height: 15px;
		background: url("{{asset('front/assets/images/iconSpriteBg.png')}}") -550px 0px no-repeat;
		vertical-align: middle;
		display: inline-block;
	}
	.productlisting .infobar>.bought::before {
		background-position: -576px 0px;
		width: 23px;
	}
	.dt-delivery {
		color: #0f9d58;
		font-weight: bold !important;
		font-size: 13px;
	}
	.productlisting .earliestdelivery {
		color: #909090;
		font-size: 13.5px;
		text-align: center;
		margin: 0px 5px 0px 5px;
	}
	.productlisting .quickview, .add2cart {
		text-transform: uppercase;
		text-align: center;
		font-family: "roboto slab";
		font-weight: 300;
		padding: 0.5em;
		font-size: 0.9em;
		cursor: pointer;
		max-width: 115px;
	}
	.productlisting .quickview {
		border: 1px solid #a3a5a6;
		color: #5b5353;
		margin-right: 3.75%;
		background-color: #fff;
	}
	.add2cart {
		border: 1px solid #f97d00;
		color: #fff;
		background-color: #f97d00;
	}
	.productlisting .h-price {
		font-size: 16px;
		font-weight: bold;
	}
	span.WebRupee {
		font-family: 'WebRupee' !important;
	}
	.webprice {
		font-family: roboto;
		display: block;
		color: #242424;
		font-weight: bold;
		display: block;
	}
	.webprice .WebRupee {
		font-weight: normal;
		vertical-align: middle;
		margin-right: 0.2em;
	}
	.call2axn {
		white-space: nowrap;
		overflow: visible;
	}
	.productlisting {
		max-width: 1600px;
		margin: 0 auto;
	}
	.productlisting ul.medium-block-grid-5 {
		margin-left: 35px;
		margin-right: 35px;
	}
	.productlisting figure {
		margin: 0;
	}
	.productlisting [class*="block-grid-"] {
		margin: 0;
		padding: 0;
		text-align: center;
	}
	.timeslottable thead tr {
		background: #59b6d8 none repeat scroll 0 0;
	}
	.timeslottable thead tr th, .timeslottable thead tr th .timesloter {
		color: #fff !important;
		position: relative;
	}
	.timeslottable tbody tr td {
		position: relative;
	}
	.timeslottable tbody tr td:hover:after {
		background: #137599 none repeat scroll 0 0;
		content: "";
		height: 2px;
		left: 0;
		position: absolute;
		top: -2px;
		width: 100%;
	}
	.moredata {
		overflow: visible;
		padding-top: 2px;
	}
	.productsection {
		margin-top: 5px;
	}
	.curr_usd, .curr_gbp, .curr_eur, .curr_aud, .curr_sgd, .curr_qar, .curr_nzd, .curr_myr, .curr_cad, .curr_aed, .WebRupee {
		margin-right: 0.2em;
	}
	.woavproductlisting .productlisting .h-product, #youmayalsolikeproductlisting .productlisting .h-product {
		padding-top: 20px;
		padding-right: 30px;
		padding-bottom: 2px;
	}
	.woavproductlisting .productsection .productlisting {
		width: 98%;
	}
	.woavproductlisting h3 {
		font-size: 20px;
		color: #222;
		font-weight: 500;
		text-transform: capitalize;
	}
	.woavproductlisting .slick-arrow, #youmayalsolikeproductlisting .slick-arrow {
		top: 30%;
	}
	.woavproductlisting .slick-prev:hover:after, #youmayalsolikeproductlisting .slick-prev:hover:after {
		background-position: -606px -47px;
	}
	.woavproductlisting .slick-next:hover:after, #youmayalsolikeproductlisting .slick-next:hover:after {
		background-position: -621px -47px;
	}
	.offer-and-oldprice .off {
		color: #0f9d58;
		font-weight: bold;
		padding-left: 5px;
	}
	.offer-and-oldprice {
		font-size: 13px !important;
		display: block;
	}/* Productlisting css end */
	#detailImage1 {
		width: 364px;
		height: 364px;
		float: left;
	}
	footer {
		float: left;
		width: 100%;
		position: relative;
	}
	#footer {
		background: #f2f2f2;
		float: left;
	}
	#morelinks {
		padding-top: 20px;
	}
	img {
		display: inline-block;
		vertical-align: middle;
	}
	header .row, main .row {
		/*margin: 0 auto;
		max-width: 1600px;
		width: 100%;*/
	}
	@media only screen and (min-width: 64.0625em).column, .columns {
	position: relative;
	float: left;
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-5 {
		width: 41.66667%;
	}
	}
	@media only screen and (min-width: 40.0625em).column, .columns {
	position: relative;
	float: left;
	}
	header ul {
		vertical-align: middle;
		white-space: nowrap;
		padding: 4px 0 0;
	}
	#browse:before {
		color: #1e7e27;
		content: "Shop";
		font-family: "Roboto";
		font-size: 14px;
		font-weight: 400;
		left: 2px;
		letter-spacing: 2px;
		position: absolute;
		text-align: center;
		top: -13px;
		width: 100%;
	}
	a {
		display: inline-block;
		text-decoration: none;
	}

	@media only screen and (min-width: 64.0625em) {
	}
	.column, .columns {
		padding-left: 0.4em;
		padding-right: 0.4em;
	}
	@media only screen and (max-width: 64em)div.medium-xx {
	width: 50%;
	left: 0;
	}
	ul.logindropdown, ul.currencydropdown {
		display: none;
		position: absolute;
		margin: 5px 0 0 0;
		z-index: 99999;
	}
	a {
		outline: none;
	}
	span.WebRupee {
		font-family: 'WebRupee' !important;
	}
	#currencyicon {
		font-size: 25px;
	}
	.maintitle {
		font-size: 26px;
		text-align: center;
		margin: 10px 0 15px 0;
		font-weight: 300;
	}
	h1::before, h1::after {
		content: "";
		height: 1px;
		width: 141px;
		display: inline-block;
		height: 1px;
		width: 137px;
		background: url("asset('webadmin/front/assets/images/iconSpriteBg.png')}}") no-repeat -6px -542px;
		vertical-align: middle;
	}
	h1::after {
		background-position: -144px -542px;


	}
	.mainsubtitle {
		color: #222;
		font-size: 20px;
		font-weight: 300;
		margin-top: -10px;
		text-align: center;
	}
	span.highlight {
		color: #59b5d7;
	}
	.productsection h2 {
		margin-bottom: 20px;
		margin-top: 20px;
		margin-left: 35px;
		margin-right: 35px;
	}
	.productlisting a {
		border-bottom: 1px solid rgba(0, 0, 0, 0);
		line-height: 27px;
		text-decoration: none;
	}
	main a {
		color: #31afac;
		text-decoration: none;
	}
	#morelinks>h3, main h2 {
		font-size: 18.8px;
		color: #59b5d7;
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-block-grid-5 > li:nth-of-type(1n) {
		clear: none;
	}
	}
	figure {
		margin: 0;
		padding: 0;
		border: 0;
	}
	#topbarcontainer {
		max-width: 1600px;
		width: 100%;
		z-index: 1;
		padding-top: 22px;
	}
	#topbarcontainer .top-bar {
		max-width: 100%;
	}
	.f-dropdown.content {
		display: none;
		left: -9999px;
		list-style: none;
		margin-left: 0;
		position: absolute;
		background: #FFFFFF;
		border: solid 1px #cccccc;
		font-size: 0.875rem;
		height: auto;
		max-height: none;
		padding: 1.25rem;
		width: 100%;
		z-index: 89;
		max-width: 200px;
	}
	.top-bar-section ul {
		height: 100% !important;
	}
	.top-bar-section ul {
		display: block;
		font-size: 16px;
		height: auto;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	@media only screen and (min-width: 40.0625em) {
	.top-bar-section ul {
		display: inline;
		height: auto !important;
		width: auto;
	}
	}
	.left {
		float: left !important;
	}
	.top-bar-section {
		left: 0;
		position: relative;
		width: auto;
		transition: left 300ms ease-out;
	}
	.top-bar-section .has-dropdown {
		position: relative;
	}
	.top-bar-section ul li {
		background: none;
		color: #515151;
	}
	.top-bar-section ul li {
		padding: 0 !important;
	}
	.menu .top-bar {
		line-height: 3.375rem;
		height: 3rem;
	}

	@media only screen and (min-width: 40.0625em) {
	.top-bar-section ul li {
		float: left;
	}
	}

	@media only screen and (min-width: 40.0625em) {
	.top-bar-section ul li {
		float: left;
	}
	}
	.menu .top-bar-section li.has-dropdown:first-child>a {
		border-left: 0.1rem solid #36c2cf;
	}

	@media only screen and (min-width: 40.0625em) {
	.top-bar-section li:not(.has-form) a:not(.button) {
		background: #333333;
		line-height: 2.8125rem;
		padding: 0 0.9375rem;
	}
	}

	@media only screen and (min-width: 40.0625em) {
	.top-bar-section .has-dropdown > a {
		padding-right: 2.1875rem !important;
	}
	}
	.menu .top-bar-section li.has-dropdown a.label {
		background: none;
		color: #fff !important;
		text-transform: capitalize;
		font-family: 'Roboto', Arial, sans-serif;
	}
	.productlisting img.u-photo {
		max-width: 300px;
	}
	.right {
		float: right !important;
	}
	ul li {
		list-style: none;
	}
	.menu .top-bar-section li.has-dropdown>a {
		border-right: 0.1rem solid #36c2cf;
		border-left: 0.1rem solid transparent;
	}
	#mainbanner {
		padding-top: 75px;
		margin-bottom: 5px;
		position: relative;
	}
	#mainbanner img {
		min-height: 270px;
	}
	#mainbanner h1 {
		color: #fff;
		font-family: "alex brush";
		font-size: 3.6vw;
		font-weight: lighter;
		letter-spacing: 0.15px;
		position: absolute;
		right: 11px;
		top: 40%;
		width: 50%;
	}
	#mainbanner > .categorydescription {
		color: #555;
		font-family: "Roboto";
		font-size: 0.8em;
		height: 140px;
		line-height: 23px;
		position: absolute;
		right: 10px;
		top: 57%;
		width: 50%;
	}
	.reveal-modal {
		border-radius: 3px;
		display: none;
		position: absolute;
		top: 0;
		visibility: hidden;
		width: 100%;
		z-index: 1005;
		left: 0;
		background-color: #FFFFFF;
		padding: 1.875rem;
		border: solid 1px #666666;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
	}
	.column, .columns {
		padding-left: 0.9375rem;
		padding-right: 0.9375rem;
		width: 100%;
		float: left;
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-2 {
		width: 16.66667%;
	}
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-5 {
		width: 41.66667%;
	}
	}
	.leftnav {
		float: right;
		height: auto;
	}
	.navigation>div {
		display: inline-block;
	}
	#sort {
		width: 150px;
		overflow: visible;
		cursor: pointer;
		padding-top: 0px;
		padding-bottom: 0px;
		height: 25px;
		background-color: #fff;
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-block-grid-5 > li:nth-of-type(5n+1) {
		clear: both;
	}
	}
	[class*="block-grid-"] > li {
		display: block;
		float: left;
		height: auto;
		padding: 0 0.625rem 1.25rem;
	}
	.productlisting [class*="block-grid-4"]>li:nth-of-type(4n+1), .productlisting [class*="block-grid-4"]>li:nth-of-type(4n+2), .productlisting [class*="block-grid-4"]>li:nth-of-type(4n+3) {
		margin-right: 3%;
	}
	.productlisting>.medium-block-grid-4 li {
		width: 22.7%;
		padding-top: 20px;
	}
	[class*="block-grid-"], [class*="block-grid-"]>li {
		margin: 0;
		padding: 0;
		text-align: center;
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-block-grid-5 > li {
		list-style: none;
		width: 17%;
	}
	}
	#filtersOptions {
		display: none;
	}
	.productlisting>ul a {
		width: 100%;
		min-width: 0;
		border: 1px solid #fff;
	}/*.productsection a img {width: 100%;}*/
	.productlisting ul.medium-block-grid-5 {
		margin-left: 35px;
		margin-right: 35px;
	}
	[class*="block-grid-"] {
		display: block;
		padding: 0;
		margin: 0 -0.625rem;
	}
	[class*="block-grid-"]>li {
		padding-top: 20px;
		padding-right: 30px;
	}
	.moredata {/*visibility: hidden;*/
		overflow: visible;
		max-height: 30px;
	}
	.productlisting .p-name {
		line-height: 2em;
		color: #909090;
	}
	.p-name {
		font-size: 13px;
	}
	.h-price {
		font-size: 13px;
		font-weight: bold;
	}
	.webprice {
		font-family: "Roboto";
		display: block;
		color: #242424;
		font-weight: bold;
	}
	.column, .columns {
		padding-left: 0.4em;
		padding-right: 0.4em;
	}
	.medium-block-grid-2 > li.fernsabout {
		list-style: outside none none;
		width: 60%;
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-block-grid-2 > li:nth-of-type(2n+1) {
		clear: both;
	}
	}
	li.fernsabout {
		padding-right: 30px;
	}
	.tab-active {
		display: block;
	}
	.tabbes {
		float: left;
		width: 100%;
		padding: 10px;
		text-align: left;
	// display: none;
	}
	.medium-block-grid-2 > li.fernscontact {
		list-style: outside none none;
		width: 40%;
	}
	.registerfrm {
		border: 1px solid #70caed;
		float: right;
		margin-right: 10px;
		position: relative;
		width: 84%;
	}
	.registerfrm > * {
		width: 80%;
	}
	.regiterfrmtitle {
		margin: 30px auto;
	}
	.registerfrm>* {
		display: block;
		text-align: center;
		width: 63%;
		margin: 0px auto;
	}
	.registerfrm input[type="text"], .registerfrm input[type="email"], .registerfrm input[type="number"], .registerfrm input[type="tel"], .registerfrm textarea {
		height: auto;
		font-size: 16px;
		margin-bottom: 35px;
		padding: 0 0 0 5px;
		font-family: "Roboto";
		font-weight: 100;
		border: 0 solid #888787;
		border-bottom-width: 1px;
		min-height: 0;
		box-shadow: none;
	}
	.registerfrm form > button[type="submit"] {
		margin-left: 15%;
	}
	.registerfrm form>button[type='submit'] {
		border-color: #f97d00;
		width: 70%;
		font-size: 1.4em;
		font-family: "Roboto";
		font-weight: 100;
		margin-bottom: 30px;
		border-radius: 0px;
		background-color: #f78828;
		transition: background-color 0ms ease-out, color 100ms ease-out;
	}
	.registerfrm span.franformtitle {
		font-size: 1.8em;
	}
	.registerfrm span.franformtitle {
		font-size: 2.5rem;
		text-transform: capitalize;
		letter-spacing: 0.1rem;
		color: #59b5d7;/* padding: 20px 0; */
	}
	#login #loggedinuser {
		display : none;
	}
	#totalproductcount {
		display : none;
	}
	#mainbanner {
		padding-top: 121px;
		margin-bottom: 5px;
		position: relative;
	}
	.slick-track {
		position: relative;
		top: 0;
		left: 0;
		display: block;
	}
	.info-tool-tip {
		display : none;
	}
	.productnav {
		margin-left: 40px;
		margin-bottom: 30px;
	}
	#breadcrumbs * {
		text-decoration: none;
		color: #000;
		font-size: 14px;
		font-weight: 300;
		letter-spacing: 0.15px;
		vertical-align: -webkit-baseline-middle;
		vertical-align: -moz-middle-with-baseline;
	}
	#breadcrumbs a:hover {
		color: #31afac;
	}
	#breadcrumbs > a::after {
		content: " > ";
	}	
	#breadcrumbs span {
		color: #31afac;
		font-weight: 300;
	}
	#breadcrumbs > label{
		color: #31afac;
		font-weight: 100;
	}
	.breadcrumb-icons {
		font-size: 20px !important;
		vertical-align: middle;
	}
	main a {
		text-decoration: underline;
		color: #31afac;
		text-decoration: none;
	}
	a {
		display: inline-block;
		text-decoration: none;
		outline: medium none;
	}
	a {
		outline: none;
	}
	a {
		display: inline-block;
		text-decoration: none;
	}
	div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, p, blockquote, th, td {
		margin: 0;
		padding: 0;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	*, *:before, *:after {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.slick-slider {
		position: relative;
		display: block;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-touch-callout: none;
		-khtml-user-select: none;
		-ms-touch-action: pan-y;
		touch-action: pan-y;
		-webkit-tap-highlight-color: transparent;
	}
	.slick-slider {
		margin-bottom: 0;
	}
	.productimg {
		margin-left: auto;
		margin-right: auto;
	}
	/*.prodimgslider #product {
		width: 364px;
		height: 364px;
	}
	.prodimgslider #product {
		width: 364px;
		height: 364px;
	}*/
	.product-selected {
		text-align: center;
	}
	
	@media only screen and (min-width: 64.0625em) {
	.large-4 {
		width: 33.33333% !important;
	}
	}
	.column + .column:last-child, .columns + .column:last-child, .column + .columns:last-child, .columns + .columns:last-child {
		float: right;
	}
	.xpress-product-form {
		text-align: center;
		border: 1px solid #7bccdd;
		padding-left: 0.9375rem;
		padding-right: 0.9375rem;
		min-height: 428px;
		position: relative;
		z-index: 900;
		width: 21.5em;
		background: white;
	}

	@media only screen and (min-width: 64.0625em) {
	.large-3 {
		width: 25%;
	}
	}

	@media only screen and (min-width: 64.0625em) {
	.column, .columns {
		position: relative;
		padding-left: 0.9375rem;
		padding-right: 0.9375rem;
		float: left;
	}
	}

	@media only screen and (min-width: 64.0625em) {
	.large-push-5 {
		position: relative;
		left: 41.66667%;
		right: auto;
	}
	}
	.large-push-5 {
		left: 41.66667%;
		right: auto;
	}
	.row .row:before, .row .row:after {
		content: " ";
		display: table;
	}
	.xpress-product-form form {
		padding: 0 7px;
	}
	.xpress-product-form {
		text-align: center;
		border: 1px solid #7bccdd;
		padding-left: 0.9375rem;
		padding-right: 0.9375rem;
		min-height: 428px;
		position: relative;
		z-index: 900;
		width: 21.5em;
		background: white;
	}
	form {
		margin: 0 0 0;
	}
	.price-block {
		margin-bottom: 30px;
	}
	.pricediv {
		height: 45px;
	}
	.pricediv {
		color: #7bccdd;
		font-family: "Roboto";
		font-size: 1.7em;
		padding-top: 20px;
		text-align: center;
		font-weight: 300;
	}
	span {
		display: inline-block;
	}
	.inputdiv {
		position: relative;
	}
	#cartToolTip {
		display: none;
	}
	.xpress-product-form form button#addToCart {
		background: #62af69;
		margin-top: 0;
		border: 1px solid #62af69;
	}
	#buynow {
		background: rgb(247, 136, 40);
		color: rgb(249, 249, 249);
	}
	.xpress-product-form form input[type="text"] {
		height: auto;
		padding: 0 0 0 5px;
		border: 0 solid #2272b1;
		border-bottom-width: 1px;
		min-height: 0;
		font-family: "Roboto";
		font-weight: 100;
		box-shadow: none;
	}
	input[type="text"], input[type="password"], input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="month"], input[type="week"], input[type="email"], input[type="number"], input[type="search"], input[type="tel"], input[type="time"], input[type="url"], textarea {
		/*-webkit-appearance: none;
		background-color: #fff;
		border: 1px solid #cccccc;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
		color: #000;
		font-size: inherit;
		margin: 0 0 0 0;
		padding: 0;
		padding: 0 0 0 0.57rem;
		min-height: 34px;
		height: auto;
		width: 100%;
		border-radius: 0;
		vertical-align: top;
		box-sizing: border-box;
		transition: none;*/
	}
	.selectedLocality {
		font-size: 0.8em;
		text-align: left;
		width: 100%;
		padding-left: 5px;
		padding-bottom: 5px;
		color: #888787;
		background-color: #ffffca;
		display: none !important;
	}
	#pincodeAlert {
		margin-bottom: 0;
	}
	#pincodeAlert, #dateAlert {
		display: none;
	}
	#contextcity {
		margin-top: 7px;
		color: #7ec9e8;
		padding-left: 10px;
		width: 100%;
		text-align: right;
		display: none;
		text-transform: capitalize;
	}
	#removecitycontext {
		margin-left: 5px;
	}
	#datetimelink {
		width: 100%;
		margin-bottom: 0;
		text-align: left;
		text-decoration: none;
		border-bottom: 1px solid #2272b1;
		margin-top: 25px;
		padding-left: 5px;
	}
	.disableClick {
		color: #999;
	}
	#datetimeshipping {
		margin-top: 25px;
		text-align: left;
		padding-left: 10px;
		border-bottom: 1px solid #2272b1;
		color: #222;
		position: relative;
		display: none;
		cursor: pointer;
	}
	.subvariantblock {
		position: relative;
	}
	.xpress-product-form form button {
		padding: 9px 0;
		border-radius: 0;
		margin-top: 40px;
		width: 92%;
		font-size: 1.5em;
		font-weight: 100;
		font-family: "Roboto";
		margin-left: 4%;
		margin-right: 4%;
	}
	button.primary, button[type="submit"], button.icon.primary, button.icon[type="submit"], .button.primary, .button[type="submit"], a.button.primary, a.button[type="submit"], input[type=button].primary, input[type=button][type="submit"], input[type=submit].primary, input[type=submit][type="submit"], input[type=reset].primary, input[type=reset][type="submit"] {
		margin-bottom: 0.8em;
		cursor: pointer;
		font-size: 1rem;
		font-weight: bold;
		transition: background-color 500ms ease-out, color 500ms ease-out;
		color: #fff;
		border-radius: 0.35rem;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		background: #f78828;
		border: 1px solid #da7532;
		background: linear-gradient(to bottom, #f78828 0, #dd771f 100%);
		border-radius: 4px;
		outline: 0;
		color: #f9f9f9;
		text-transform: uppercase;
		cursor: pointer;
		text-shadow: 0 0 1px rgba(0,0,0,0.33);
	}
	.formfooter {
		position: absolute;
		bottom: 10px;
		left: 0px;
		right: 0px;
	}
	.timeleft {
		font-family: "Roboto";
		font-size: 3em;
		font-weight: 100;
		color: #eaeaea;
	}
	.timeellapse>div span {
		display: block;
		font-family: "Roboto";
		font-weight: 100;
		color: #eaeaea;
	}
	.timeellapse>div {
		display: inline-block;
		margin-left: 5px;
	}
	.deltxt {
		font-size: 1.3em;
	}
	.deliveryDay {
		display: inline-block;
		font-weight: 100;
		font-family: "Roboto";
	}

	@media only screen and (min-width: 64.0625em) {
	.large-5 {
		width: 41.66667%;
	}
	}
	.product-heading {
		display: flex;
		justify-content: center;
	}
	.row .row:before, .row .row:after {
		content: " ";
		display: table;
	}

	@media only screen and (min-width: 64.0625em) {
	.large-8 {
		width: 66.66667%;
	}
	}

	@media only screen and (min-width: 64.0625em) {
	.large-pull-3 {
		position: relative;
		right: 25%;
		left: auto;
	}
	}
	.item-heading::before {
		background: url(product.css);
		width: 0;
	}
	.item-heading {
		color: #565656;
		font-family: "Roboto";
		font-weight: 300;
		line-height : normal;
	}
	h1 {
		font-size: 25.2px;
		font-weight: bold;
	}
	.product-heading div:last-child {
		align-self: center;
	}
	.prodinfobarblock {
		display: flex;
		justify-content: center;
	}
	.ui-helper-reset {
		border: 0px none;
		outline: 0px none;
		line-height: 1.3;
		text-decoration: none;
		font-size: 100%;
		list-style: outside none none;
	}
	#tabs {
		position: relative;
	}
	.column + .column:last-child, .columns + .column:last-child, .column + .columns:last-child, .columns + .columns:last-child {
		float: right;
	}
	.prodinfobarblock>.row>.columns:first-child {
		padding-right: 0;
	}

	@media only screen and (min-width: 64.0625em) {
	.large-10 {
		width: 83.33333%;
	}
	}
	.tab {
		background-color: #FFF;
		float: left;
		margin-bottom: 0px;
		width: 100%;
	}
	.item-heading::before {
		background: url("");
		width: 0;
	}
	h1::before, h1::after {
		content: "";
		height: 1px;
		width: 141px;
		display: inline-block;
		height: 1px;
		width: 137px;
		background: url("{{asset('front/assets/images/iconSpriteBg.png')}}") no-repeat -6px -542px;
		vertical-align: middle;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	*, *:before, *:after {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	@media only screen and (min-width: 64.0625em) {
	.large-4 {
		width: 33.33333%;
	}
	}
	.row .row:before, .row .row:after {
		content: " ";
		display: table;
	}

	@media only screen and (min-width: 64.0625em) {
	.large-10 {
		width: 83.33333%;
	}
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-11 {
		width: 91.66667%;
	}
	}
	.prodinfobar>.viewed {
		float: left;
	}
	.skucode {
		font-style: italic;
		font-weight: 100;
		color: #d1d1d1;
		font-size: 12px;
	}
	#tabs.ui-widget-content {
		border: none;
		background: none;
	}
	#tabs .tabs-menu, #addontabs .tabs-menu {
		background: #fff;
		margin: 0;
	}
	#tabs .ui-state-default, #tabs .ui-widget-content .ui-state-default, #tabs .ui-widget-header .ui-state-default, #tabs .ui-state-hover, #addontabs .ui-state-default, #addontabs .ui-widget-content .ui-state-default, #addontabs .ui-widget-header .ui-state-default, #addontabs .ui-state-hover {
		border: none;
		background: none;
	}
	/*#tabs ul li:first-child {
		font-size: 13px;
		max-width: 10em;
	}*/
	#tabs .ui-state-active, #tabs .ui-widget-content .ui-state-active, #tabs .ui-widget-header .ui-state-active#addontabs .ui-widget-content .ui-state-active, #addontabs .ui-widget-header .ui-state-active {
		background: #fff !important;
		border: none;
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-3 {
		width: 25%;
	}
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-5 {
		width: 41.66667%;
	}
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-4 {
		width: 33.33333%;
	}
	}
	#tab-1, #tab-2, #tab-3 {
		padding-left: 0;
	}
	#tabs ul li a {
		padding: 1em 3em;
	}
	#tabs {
		position: relative;
	}
	.row .row:after {
		clear: both;
	}
	div.scroll-pane ul li, #tabs div.scroll-pane ul li {
		max-width: 100%;
	}
	#tab-2, #tab-3 {
		display: none;
	}
	main p {
		font-size: 14px;
		color: #242424;
		line-height: 20px;
		margin-bottom: 15px;
		text-align: justify;
	}
	/*p {
		position: relative; 
	}*/
	/*p {
		margin: 0.5rem 0;
	}*/
	blockquote {
		margin: 0.5rem 0;
	}
	/*table {
		border: solid 1px #E9E9E9;
		table-layout: auto;
		width: 100%;
		border-spacing: 0;
		background: 0 0;
		margin: 0;
		margin-bottom: .8em;
	}*/
	.rc-table {
		border-color: #e4d7c5;
	}
	/*table {
		border-color: #e4d7c5;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	table tbody tr td, table tbody tr th, table tfoot tr td, table tfoot tr th, table thead tr th, table tr td {
		display: table-cell;
		line-height: 1.2857142857rem;
	}
	table td, table th, table td, table th {
		border-width: 1px 0 0 1px;
		border-color: #E9E9E9;
		border-style: solid;
	}
	table tr th, table tr td {
		color: #222222;
		font-size: 0.875rem;
		padding: 0.5625rem 0.625rem;
		text-align: left;
	}
	table td, table th, table td, table th {
		border-width: 1px 0 0 1px;
		border-color: #E9E9E9;
		border-style: solid;
	}*/
	.rc-table th, .rc-table td {
		border-width: 1px 0 0 1px;
		border-color: #E9E9E9;
		border-style: solid;
	}
	/*table th, table td {
		border-width: 1px 0 0 1px;
		border-color: #E9E9E9;
		border-style: solid;
	}*/
	table tr.even, table tr.alt {
		background: #F9F9F9;
	}
	/*table tr:nth-of-type(even) {
		background: #F9F9F9;
	}*/
	/*table tbody td a {
		color: #333;
	}*/
	a {
		display: inline-block;
		text-decoration: none;
	}
	.row .row:before, .row .row:after {
		content: " ";
		display: table;
	}
	.row .row:after {
		clear: both;
	}
	[class*="block-grid-"]:after {
		clear: both;
	}
	[class*="block-grid-"]:before, [class*="block-grid-"]:after {
		content: " ";
		display: table;
	}
	#footer .medium-block-grid-3 {
		height: 125px;
		border-bottom: 1px solid #fff;
		padding-left: 100px;
		padding-right: 100px;
	}
	#footer .medium-block-grid-3 > li {
		height: 100%;
		border-right: 1px solid #fff;
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-block-grid-3 > li:nth-of-type(3n+1) {
		clear: both;
	}
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-block-grid-3 > li:nth-of-type(1n) {
		clear: none;
	}
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-block-grid-3 > li {
		list-style: none;
		width: 33.33333%;
	}
	}
	#subscribe>h6 {
		text-align: left;
		margin-right: 0;
	}
	#brands {
		padding-bottom: 20px;
		border-bottom: 1px solid #fff;
		display: none;
	}
	#morelinks>ul>li:first-child {
		padding-left: 0;
	}
	#morelinks>ul>li {
		border-right: 1px solid #9e9e9e;
		font-size: 13px;
		line-height: 23.3px;
		padding: 0 10px 0 5px;
	}
	#morelinks>ul>li {
		display: inline;
		white-space: nowrap;
	}
	#socialtoolbar h6 {
		margin-bottom: 15px;
		margin-left: .8em;
	}
	#footer h6 {
		font-size: 0.8em;
		text-transform: uppercase;
		text-align: center;
		margin-bottom: 15px;
	}
	#subscribeform>input[type=email] {
		font-size: 14px;
		font-family: "Roboto";
		font-weight: 100;
		padding: 10.5px 6.67px 6.67px 39.64px;
		background: url("{{asset('front/assets/images/iconSpriteBg.png')}}") 16px -776px no-repeat;
		background-color: #fff;
		border-right-width: 0px;
		border-top: 1px solid #a3a5a6;
		border-bottom: 1px solid #a3a5a6;
		border-left: 1px solid #a3a5a6;
		display: inline-block;
		width: 60%;
		margin-bottom: 0;
		vertical-align: middle;
	}
	#subscribeform #htfield {
		display: none;
	}
	#subscribeform>button {
		border-radius: 0;
		font-size: .9rem;
		line-height: 1em;
		height: 2.65rem;
		display: inline-block;
	}
	#footer .medium-block-grid-3 > li {
		height: 100%;
		border-right: 1px solid #fff;
	}
	ul #socialtoolbar>ul {
		margin-left: 10px;
	}
	#socialtoolbar>ul>li {
		display: inline-block;
	}
	#socialtoolbar>ul>li>a {
		width: 30px;
		height: 30px;
		position: relative;
		overflow: hidden;
	}
	#socialtoolbar>ul>li>a>img {
		position: relative;
		top: -697px;
		max-width: 700px;
		top: -697px;
	}
	a img {
		border: none;
	}
	#tw>img {
		left: -34px;
	}
	#pt>img {
		left: -68px;
	}
	#gp>img {
		left: -101px;
	}
	child {
		border: none;
	}
	#footer .medium-block-grid-3 > li {
		height: 100%;
		border-right: 1px solid #fff;
	}
	#securetransactions {
		position: relative;
	}
	#securetransactions>.payopt {
		position: relative;
		overflow: hidden;
		height: 28px;
		width: 243px;
		margin: 15px auto;
		text-align: center;
	}
	#securetransactions .payopt>img {
		left: -145px;
		top: -737px;
		position: relative;
		max-width: 700px;
		overflow: hidden;
	}
	#securetransactions>div>img {
		left: -0;/* top: -737px; */
		bottom: 15px;
		position: relative;
		max-width: 700px;
		overflow: hidden;
	}
	#securetransactions>.walletopt {
		bottom: -5px;
		position: absolute;
		left: -28px;
		right: 0;
	}
	[class*="block-grid-"]:after {
		clear: both;
	}
	[class*="block-grid-"], [class*="block-grid-"]>li {
		margin: 0;
		padding: 0;
		text-align: center;
	}
	[class*="block-grid-"] {
		display: block;
		padding: 0;
		margin: 0 -0.625rem;
	}
	#footer [class*="block-grid-"] > li.footerlinks {
		border: none;
		text-align: left;
	}
	#footer .footerlinks>h6 {
		font-size: 11px;
		font-weight: 100;
		color: #59b5d7;
		text-transform: uppercase;
		margin-bottom: 6px;
		text-align: left;
	}
	.footerlinks>ul>li>a {
		margin: 5.5px 0;
		font-size: 0.9em;
		color: #6a6a6a;
		font-family: "Roboto";
		font-weight: 100;
	}
	.footuncollapse {
		padding-left: 100px;
		padding-right: 100px;
	}
	.top-bar-section ul>li>a {
		display: none;
	}

	@media only screen and (min-width: 40.0625em) {
	.medium-block-grid-5 > li {
		list-style: none;
		width: 20%;
	}
	}
	.productlisting #searchProductListing .pidloadeddefault {
		padding-top: 20px;
	}
	#searchProductListing .slick-list .slick-track .pidloadeddefault {
		width: 257px !important;
	}/* Controlling Width for More then  1600px */
	.header-wrapper {
		max-width: 1600px;
		margin: 0 auto;
	}
	footer {
		float: none;
		max-width: 1600px;
		display: block;
		margin: 0 auto;
		float: none;
	}
	.productsection a {
		display: block;
		margin: 0 auto;
		max-width: 1600px;
	}
	.row.uncollapse .columns {
		padding: 0;
	}
	.productlisting {
		max-width: 1600px;
		margin: 0 auto;
	}
	article ul li {
	font-size:14px%;
		line-height: 20px;
	}
	#productfrm .dropdowncontent {
		display : none;
	}
	#productfrm {
		margin-bottom: 50px;
	}
	.got-it {
		display: none;
	}
	#giftfindericon {
		display: none;
	}
	#localitypicker .localityText {
		width: 100%;
		text-align: left;
		color: #000;
		background: url({{asset('webadmin/front/assets/images/select-dropdown-icon.png')}}) no-repeat right;
	}
	#localitycontainer {
		height: 32.5%;
		position: absolute;
		background: #FFF;
		z-index: 9;
		border: 1px solid #CCC;
		display: none;
		padding: 0;
		overflow: hidden;
		box-shadow: -6px 2px 8px #FAF1EB;
		z-index: 900;
	}
	#localitycontainerwraper {
		width: 92%;
		height: 85%;
		margin: 4%;
		margin-top: 4%;
		overflow-y: auto;
		overflow-x: hidden;
	}
	#localitycontainer ul.dropdownhidden, #localitycontainer .dropdownhidden li {
		width: 100%;
		text-align: left;
		height: 30px;
	}
	#localitycontainer ul.dropdownhidden li a {
		width: 100%;
		text-align: left;
		line-height: 3;
		padding-left: 10%;
		padding-bottom: 3px;
		color: #000;
	}
	.autogrow, .autogrow:focus {/* height: auto !important; */
		padding: 0 0 0px 5px;/* padding: 0px; */
		font-family: "Roboto";
		font-weight: 100;
		border: 0 solid #888787;
		border-bottom-width: 1px;/* min-height: 0; */
		box-shadow: none;
		outline: none;
		background-color: #fff;
		resize: none;
		overflow: hidden;
		overflow-x: hidden;
		overflow-y: hidden;
	}
	.autogrow, .autogrow:focus {
		font-family: Roboto;
		font-weight: 400;
		font-size: 14px;
		box-shadow: none;
		background-color: rgb(255, 255, 255);
		resize: none;
		overflow-x: hidden;
		overflow-y: hidden;
		padding: 0px 0px 0px 5px;
		border-width: 0px 0px 1px;
		border-style: solid;
		border-color: rgb(136, 135, 135);
		border-image: initial;
		outline: none;
	}
	.internatonal-earliest-delivery {
		visibility: hidden;
	}
	.ui-tabs .ui-tabs-nav li {
		list-style: outside none none;
		float: left;
		position: relative;
		top: 0px;
		margin: 0px;
		border-bottom-width: 0px;
		padding: 0px;
		white-space: nowrap;
	}
	/*.tabs-menu a span {
		font-family: "Roboto";
		font-weight: 400;
		color: #565656;
		font-size: 1.01em;
		text-align: left;
		border-bottom: 1px solid #565656;
	}*/
	#tabs.ui-tabs .ui-tabs-nav .ui-tabs-anchor {
		/*padding: 0.45em 0em;
		text-decoration: 1.3em;
		text-align: left;*/
	}
	.tab {
		background-color: #FFF;
		float: left;
		margin-bottom: 0px;
		width: 100%;
	}
	.tab-content {
		float: left;
		padding: 30px 3%;
		/*display: none;*/
		width: 100%;
	}
	.product_description {
		float: left;
		width: 100%;
		color: #7F7F7F;
		font-family: "Roboto";
		font: 13px/22px;
	}
	.tab #tab-2 li {
		margin-top: 0;
		margin-left: 0;
	}
	.tab #tab-3 li {
		margin-top: 0;
		margin-left: 0;
	}
	.ui-tabs .ui-tabs-nav li.ui-tabs-active {
		margin-bottom: -1px;
		padding-bottom: 1px;
		background-color: #fff /*rgb(123, 205, 221);*/
	}
	.ui-tabs-anchor {
		width: 100%;
		text-align: center;
	}
	#hamburgermenu .ui-widget-content {
		color: #333;
		border: none;
		background: white;
	}
	.ui-tabs {
		position: relative;
		padding: 0.2em;
	}
	.cssImgXLarge {
		width: 0 !important;
		height: 0 !important;
		display: none;
	}
	.productimg {
		margin-bottom: 6px;
		width: 6.25em;
	}
	.prodvariant {
		color: #7bccdd;
		font-size: 16px;
		margin-top: 20px;
		font-family: 'Roboto';
		font-weight: 400;
		word-wrap: break-word;
	}
	.product-list-image {
		margin-top: 10px;
	}
	.variantItem.selectedVariant .productimg {
		border: 1px solid #58b5d7;
	}
	.product-list-image li figure figcaption {
		text-align: center;
		padding-bottom: 13px;
	}
	span.p-listname, .h-listprice {
		text-align: center;
		color: #000;
		font-size: 0.9em;
		font-family: "Roboto";
		font-weight: 600;
		margin-bottom: 3px;
	}
	#tabs .scroll-pane {
		width: 100%;
		height: 200px;
		overflow: hidden;
		outline: none;
	}
	.productimg.mainimg {
		width: 0;
		height: 0;
	}
	#ui-datepicker-div {
		display: none;
	}
	.productsection .productlisting img.u-photo {
		max-width: 400px;
	}
</style>
<link rel="stylesheet" href="{{asset('front/i1.fnp.sg/assets/topbar/src/css/common.css')}}" type="text/css"/>
<link rel="stylesheet" href="{{asset('front/i1.fnp.sg/assets/css/fnp.css')}}" type="text/css"/>
<style>
	@font-face {
		font-family: 'Roboto';
		font-weight:400;
		font-display: fallback;
		src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v15/CWB0XYA8bzo0kSThX0UTuA.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
	}
	@font-face {
	  font-family: 'Roboto';
	  font-style: normal;
	  font-weight: 300;
	  font-display: fallback;
	  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmSU5fBBc4.woff2) format('woff2');
	  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	@font-face {
	  font-family: 'Roboto';
	  font-style: normal;
	  font-weight: 500;
	  font-display: fallback;
	  src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4.woff2) format('woff2');
	  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	@font-face {
	  font-family: 'Roboto';
	  font-style: normal;
	  font-weight: 700;
	  font-display: fallback;
	  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfBBc4.woff2) format('woff2');
	  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	@font-face {
	  font-family: 'Roboto';
	  font-style: normal;
	  font-weight: 100;
	  font-display: fallback;
	  src: local('Roboto Thin'), local('Roboto-Thin'), url(https://fonts.gstatic.com/s/roboto/v18/KFOkCnqEu92Fr1MmgVxIIzI.woff2) format('woff2');
	  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	@font-face {
		font-family: 'Material Icons';
		font-style: normal;
		font-weight: 400;
		src:
			url(https://fonts.gstatic.com/s/materialicons/v40/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.woff)
			format('woff');
	}
	.material-icons {
		font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		font-size: 24px;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		-webkit-font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
		/* Support for all WebKit browsers. */
		-webkit-font-smoothing: antialiased;
		/* Support for Safari and Chrome. */
		text-rendering: optimizeLegibility;
		/* Support for Firefox. */
		-moz-osx-font-smoothing: grayscale;
		/* Support for IE. */
		font-feature-settings: 'liga';
	}

	* {
		margin: 0px;
		padding: 0px;
		outline: none;
	}

	html, body {
		height: 100%;
		font-size: 14px;
		font-family: "Roboto";
		padding: 0;
	}

	img {
		display: inline-block;
		vertical-align: middle;
		height: auto;
		max-width: 100%;
	}

	*, *:before, *:after {
		-webkit-box-sizing: border-box;
	}

	body {
		font-family: 'Roboto', sans-serif;
	}

	header {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		/*z-index: 99999;*/
		z-index: 9;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
		background: #72992f;
		transition: top ease-in-out 0.3s;
	}

	.productlisting img.u-photo.lazy {
		width: 100%;
	}

	header ul, header ul>li {
		list-style: none;
	}

	header ul>li {
		display: inline-block;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}
	/* this css is for remove autofill css */
	input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus,
		input:-webkit-autofill:active {
		-webkit-transition-delay: 9999s;
		transition-delay: 9999s;
	}

	.web-wrapper {
		margin: 0 auto;
		width: 100%;
		max-width: 1600px;
	}

	.header-wrapper {
		margin: 0 auto;
		max-width: 1366px;
		width: 100%;
		position: relative;
		padding: 0 35px;
	}
	#login-message {
		display: none;
		position: absolute;
		top: 74px;
		right: 34px;
		width: 222px; 
		box-shadow: 0 4px 40px rgba(0,0,0,0.2); 
		border-radius: 4px; 
		background: #333; 
		color: #999; 
		font-size: 16px;    
		padding: 18px 12px; 
		cursor: default;
	}
	#login-message .header-arrows{
		bottom: auto;   
		top: -6px;    
		right: 35px;    
		border-left: 7px solid transparent;    
		border-right: 7px solid transparent;    
		border-bottom: 7px solid #333;    
		border-top: 0;    
		position: absolute;
	}
	#login-message span {
		color: #fff;
		line-height: 1.5;
	} 
	#info-toolbar {
		padding: 5px;
		/*background: #608323;*/
		/*background: #729535;*/
		background: #ff3051;
		text-align: right;
		font-size: 14px;
		position: relative;
		/*z-index: 9;*/
	}
	#info-toolbar li a, #info-toolbar li {
		color: #fff;
		font-weight: 400;
		text-decoration: none;
		cursor: pointer;
	}

	#info-toolbar li {
		text-align: left;
		position: relative;
		margin: 0 8px;
		vertical-align: top;
	}

	#info-toolbar li span {
		font-weight: 400;
	}

	#info-toolbar li a i, #info-toolbar li i {
		font-size: 24px;
		vertical-align: top;
		margin-top: -4px;
		margin-left: -7px;
	}

	.info-item::after {
		position: absolute;
		width: 1px;
		height: 90%;
		top: 5%;
		right: -8px;
		background: #d5d5d5;
		content: "";
	}

	.left-side {
		float: left;
	}

	.right-side {
		float: right;
	}

	#otherOptions>a {
		font-size: 14px;
		color: #fff;
		cursor: pointer;
	}

	#otherOptions>a:hover {
		color: #126b2a;
	}

	#maintoolbar {
		/*background: #72992f;*/
		background: #94bb51;
		clear: both;
		height: 95px;
		padding: 5px;
		position: relative;
		width: 100%;
		/*z-index: 999999;*/
		z-index: 9;
	}

	#maintoolbar>.web-wrapper {
		overflow: auto;
	}

	/*--------------------------------------------------------fnp logo*/
	#fnplogo {
		margin-left: -15px;
		margin-top: -3px;
		height: 77px;
	}
	#fnplogo a {
		position: relative;
		height: 120px;
		width: 106px;
		z-index: 10;
		bottom: 32px;
	}
	#fnplogo img {
		position: absolute;
	}
	/*---------------------------------------------------------------search bar in header*/
	#searchform {
		display: inline-block;
		height: 42px;
		padding: 14px 0 12px 22px;
		position: relative;
		box-sizing: content-box;
	}

	#fnpsearch {
		font-family: roboto;
		font-weight: normal;
		color: rgba(0, 0, 0, 0.75);
		font-size: 13px;
		width: 350px;
		display: inline-block;
		margin: 0;
		height: auto;
		transition: none;
		vertical-align: middle;
		border: 1px solid #bbb;
		border-right: 0;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) inset;
		border-radius: 4px 0 0 4px;
		float: left;
		max-height: 40px;
		min-height: 40px;
		background: #fdfdfd;
		transition: all ease-in-out 0.25s;
		padding: 12px;
		box-sizing: border-box;
	}

	input[type="search" i] {
		-webkit-appearance: searchfield;
		box-sizing: border-box;
	}

	#searchform a {
		font-size: 14px;
		line-height: 37px;
		color: #2179d0;
		background-color: #fff;
		height: 35px;
		display: inline-block;
		padding-right: 12px;
		text-decoration: none;
		position: absolute;
		top: 15px;
		right: 88px;
	}

	#fnpsearch:focus+a {
		display: block;
	}

	#searchbtn, #quicksearchbtn {
		background-color: #ff3051;
		background-repeat: no-repeat;
		background-position: 15px -128px;
		min-height: 38px;
		max-height: 38px;
		width: 40px;
		vertical-align: middle;
		cursor: pointer;
		margin: 0 0 0 -1px;
		min-width: auto;
		color: #fff;
		border: 1px solid #ff3051;
		float: left;
		line-height: 40px;
		right: 0;
		border-radius: 0 4px 4px 0;
		transition: all ease-in-out 0.25s;
	}

	#searchbtn:hover {
		box-shadow: 0 3px 4px rgba(0, 0, 0, 0.5);
	}

	#searchbtn i {
		margin: 8px;
	}

	#quicksearchbtn {
		width: 25px;
		background-image: none;
		border-left: 1px solid #ffb359;
		color: #fff;
		font-size: .95em;
	}
	/*----------------------------------------------second menu right list(cart,account)*/
	#infotools {
		height: 70px;
	}

	#infotools  li {
		min-width: 85px;
		max-width: 105px;
		position: relative;
		text-align: center;
		vertical-align: middle;
	}

	#infotools li button span {
		display: block;
		margin-bottom: 5px;
		font-weight: 400;
		position: relative;
	}

	#infotools button {
		text-align: center;
		min-width: 85px;
		max-width: 105px;
		background: transparent;
		font-size: 15px;
		color: #fff;
		cursor: pointer;
		margin: 0;
		border: 0;
		font-family: 'roboto';
		padding: 6px 0px 12px 15px;
		max-height: 70px;
		width: 10px;
	}

	button#accountbtn {
		padding-right: 20px;
		padding-top: 6px;
	}

	#infotools button:hover, #infotools li:hover, #infotools li button span.cart-icon:hover,
		#currencybtn:hover::after {
		color: #126b2a;
	}

	#infotools li button span.cart-icon {
		top: 0;
		left: 0;
		bottom: 0;
		height: auto;
		width: auto;
		padding: 0;
	}

	#infotools #currency .WebRupee {
		font-size: 27px;
		margin: 0px;
		position: absolute;
		top: 10px;
		width: 60px;
	}

	#account.loaded>#accountdropdown, #currency.loaded>#currencydropdown {
		display: block;
	}

	.currtitle {
		background-color: #fff;
		padding: 15px;
		text-align: left;
		color: #59b5d7;
	}

	#cartbtn span.hasitems {
		position: absolute;
		min-width: 18px;
		height: 18px;
		background: #e53333;
		border-radius: 10px;
		text-align: center;
		color: #fff;
		font-size: 12px;
		line-height: 14px;
		top: 1px;
		left: 60%;
		padding: 2px 3px;
		display: inline-block;
	}
	/*------------------------------------------------common dilagoue box css*/
	#commondialogs {
		position: absolute;
		height: 0;
		width: 100%;
		/*overflow: hidden;*/
		z-index: 500;
		transition: all 0.3s linear;
		top: 120px;
	}

	#commondialogs.opened {
		height: 470px;
	}

	#commondialogs>div {
		background: #fff;
		display: none;
	}

	#commondialogs>div.opened {
		display: block;
		text-align: center;
	}
	/*-------------------------------------third menu bar in header*/
	#navmenubar{
		text-align: left;
		background: #f8f8f8;
		font-size: 16px !important;
		clear: both;
		max-height: 45px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.2);
		background: #fff;
	}
	.header-wrapper {
		margin: 0 auto;
		max-width: 1600px;
		width: 100%;
		position: relative;
		padding: 0 35px;
	}
	#navmenubar .header-wrapper>ul {
		display: inline-block;
		font-size: 16px;
		width:100%;
		padding :0;
	}
	#navmenubar .header-wrapper>ul>li{
		padding: 15px 15px;
	}
	#navmenubar .header-wrapper>ul>li a{
		color:#222;
		text-decoration:none;
		text-transform:uppercase;
		font-weight:500;
		font-size:14px;
		position:relative;
		display:block;
		outline: none;
	}
	#navmenubar .header-wrapper>div{
		display: none;
		padding: 0;
		background-color: #fff;
		position: absolute;
		left: -5px;
		width: auto;
		/*min-height: 345px;*/
		top:45px;
		visibility:hidden;
	}
	#navmenubar .header-wrapper > ul > li a:hover {
		color: #72992f;
	}

	@
	keyframes effect1 { 0%{
		opacity: 0;
		top: 59px;
	}

	100%{
	opacity
	:
	1;

	top
	:
	69px;


	}
	}
	@
	keyframes effect2 { 0%{
		opacity: 1;
		top: 69px;
		display: block;
	}

	100%{
	opacity
	:
	0;

	top
	:
	85px;


	display
	:none
	;


	}
	}
	/*---------------------------------on hover on account ---account drop down css*/
	#account-dropdown {
		position: absolute;
		z-index: 999;
		width: 220px;
		right: 0;
		background: #fff;
		visibility: hidden;
	}

	#account-dropdown .inner-div {
		max-height: inherit;
		margin-top: 6px;
	}

	#account-dropdown li {
		position: relative;
		padding: 0px;
		text-align: left;
	}

	#account-dropdown li a {
		color: #222;
		text-align: left;
		padding: 15px;
		text-transform: none;
		font-size: 14px;
		display: block;
		width: 100%;
	}
	/*---------------------user name in account dropdown*/
	#user-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 50px;
		min-width: 50px;
		vertical-align: middle;
		display: inline-block !important;
	}
	/*------------------------------hover on more in header--(enquire dropdown css), hover on currency in header(currency dropdown css)*/
	.arrows {
		position: absolute;
		bottom: -10px;
		right: 24px;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 10px solid #fff;
		width: 0;
		height: 0;
		-webkit-filter: drop-shadow(0px 3px 2px #ddd);
	}

	#account-dropdown .arrows {
		bottom: auto;
		top: 0px;
		right: 35px;
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;
		border-bottom: 7px solid #333;
		border-top: 0;
		width: 0;
		height: 0;
	}

	#currency:hover .currency-dropdown, #account:hover #account-dropdown,
		#enquire:hover #enquire-dropdown {
		visibility: visible;
	}

	#enquire-list li {
		margin: 0px;
	}

	.info-item #currencybtn span {
		color: #222;
		font-weight: 500;
	}

	#currency.info-item #currency-name {
		font-weight: 300;
	}

	#currencybtn #currency-sym {
		font-size: 14px;
		vertical-align: top;
		min-width: 30px;
	}
	.currencyoption {
		font-size: 14px;
		background: #fff;
		border-bottom: 1px solid #d5d5d5;
		cursor: pointer;
		color: #222;
		display: block;
	}

	#enquire-dropdown .arrows, .currency-dropdown .arrows {
		bottom: inherit;
		top: -10px;
		border-bottom: 10px solid #fff;
		border-top: 10px solid transparent;
	}

	#info-toolbar .currencyoption a {
		font-size: 14px;
		color: #222;
		font-weight: 400;
	}
	/*-----------------------------------------------------search bar drop down lisitng css*/
	#searchhintlistdiv {
		position: absolute;
		left: 205px;
		top: 54px;
		min-width: 389px;
		background-color: #fff;
		z-index: 2000;
		display: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		border-radius: 0 0 4px 4px;
	}

	i.material-icons.search-icons {
		font-size: 20px;
		vertical-align: top;
		position: absolute;
		left: 13px;
	}

	#searchhintlistdiv>p {
		margin-bottom: 0px;
		padding: 10px;
		font-size: 13px;
		color: #666;
		font-style: italic;
		background: #f8f8f8;
	}

	main {
		display: block;
		padding-top: 174px;
	}


	.empty-field {
		position: absolute;
		right: 5px;
		top: 5px;
		font-size: 20px;
	}

	.emailinput .button-api-loader {
		height: 20px;
		width: 15px;
		background: url(images/ajax-loader.gif) no-repeat 98% center;
		z-index: 1111;
	}

	.emailinput .red-info-icon {
		height: 20px;
		width: 20px;
		background: url({{asset('webadmin/front/assets/images/rounded-info-red.html')}}) no-repeat 98%
			center;
		z-index: 1111;
	}

	.emailinput .create-error-icon {
		height: 20px;
		width: 15px;
		background: url({{asset('webadmin/front/assets/images/pencil-edit-red.html')}}) no-repeat 98% center;
		z-index: 1111;
	}



	.emailinput .create-icon {
		height: 20px;
		width: 15px;
		background: url({{asset('webadmin/front/assets/images/pencil-edit-button.html')}}) no-repeat 98%
			center;
		z-index: 1111;
	}

	.emailinput .edit-pencil i {
		color: #888484f2;
		cursor: pointer;
		font-size: 18px;
		line-height: 1.2;
	}

	.processed-msg {
		font-size: 12px;
	}

	.error-color {
		color: #de2e2e !important;
	}

	.processed-msg.notification-color {
		color: #fcaf3e !important;
	}

	.component-disabled {
		pointer-events: none;
		opacity: 0.7;
	}

	input.error-color:-webkit-autofill, select:-webkit-autofill {
		-webkit-text-fill-color: #de2e2e !important;
	}

	.inputdashed::-ms-clear {
		display: none;
	}
	/*---------------------------------------max-width of header media quires*/
	@media only screen and (max-width: 1600px) {
		.header-wrapper {
			padding: 0 35px;
		}
	}

	@media only screen and (max-width: 1042px) {
		#searchform {
			padding-left: 12px;
		}
		#searchhintlistdiv {
			left: 211px;
		}
		.top_banners li {
			padding: 5px;
			margin-bottom: 20px;
		}
		.banner-text {
			display: none;
		}
		#plp_heading {
			width: 100%;
			margin-bottom: 20px;
			text-align: center;
		}
	}
	/*--------------------------------------------------Footer*/
	footer {
		background: #F2F2F2;
		color: #666;
	}

	footer ul {
		list-style: none;
	}

	footer h6 {
		text-transform: uppercase;
		font-weight: 700;
		font-size: 0.8em;
		margin-bottom: 1em;
		color: #222;
	}

	#footerline1 {
		display: table;
		width: 100%;
	}

	#connections {
		display: table-row;
		width: 100%;
	}

	ul#connections>li {
		display: table-cell;
		vertical-align: top;
		padding: 2em;
		text-align: center;
		width: 33.33%;
	}

	#footerline1, #footerline2 {
		border-bottom: 1px solid #fff;
	}

	#socialtoolbar, #securetransactions {
		border-left: 1px solid #fff;
	}

	#subscribeform>input {
		font-weight: 300;
		padding: 10.5px 6.67px 6.67px 39.64px;
		background:
			url({{asset('webadmin/front/assets/images/simpee-footer-sprite.html')}}) -210px
			10px no-repeat;
		background-color: #fff;
		border: 1px solid #a3a5a6;
		border-right-width: 0px;
		width: 15.2em;
		display: inline-block;
		min-height: 34px;
		margin: 0;
	}

	#subscribeform>button {
		border-radius: 0;
		font-size: .9rem;
		text-transform: uppercase;
		cursor: pointer;
		background: #f78828;
		color: #f37c15;
		border: 1px solid #da7532;
		padding: 0 1em;
		display: inline-block;
		height: 37px;
		margin-left: -4px;
		vertical-align: middle;
		margin-bottom: 0;
		width: auto;
	}

	#socialtoolbar>img {
		width: 165px;
		height: 30px;
		background:
			url({{asset('webadmin/front/assets/images/simpee-footer-sprite.html')}}) 0 0
			no-repeat;
	}

	#securetransactions {
		text-align: center;
	}

	#securetransactions>img {
		/*width: 241px;
		height: 62px;
		background:
			url(../assets/images/simpee-footer-sprite.html) 0 -42px
			no-repeat;*/
	}

	#footerline2, #footerline3 {
		text-align: center;
		padding: 2em 0;
	}

	#footerline3 {
		padding-bottom: 1em;
	}

	#morelinks>li {
		display: inline-block;
	}

	#morelinks>li:after {
		content: "|";
	}

	#morelinks>li:last-child:after {
		content: "";
	}

	#morelinks>li>a {
		color: #666;
		font-size: 0.9em;
		margin: 0.5em;
	}

	#footerline4 {
		text-align: center;
	}

	#copyright {
		font-size: 0.8em;
	}
	/*Secure header css*/
	.wrapper {
		width: 75%;
		margin: 0 auto;
	}

	.order-header {
		display: inline-block;
		vertical-align: middle;
		margin-bottom: 3px auto;
		color: #72992f;
		text-align: center;
		float: left;
		margin-left: 65px;
		font-size: 1.2rem;
	}

	.pagination {
		display: inline-block;
		vertical-align: middle;
		font-size: 1.2rem;
		color: #72992f;
	}

	.wraperspace {
		height: 108px;
	}

	.headerwrapper {
		width: 65%;
		margin: 0 auto;
	}

	.clearfix {
		text-align: right;
		margin-top: 20px;
		color: #fff;
	}

	.paginationnum {
		display: inline-block;
		float: right;
	}

	.fnpimg {
		width: 40%;
		text-align: left;
		display: inline-block;
	}

	.pagetitle {
		display: inline-block;
		width: 55%;
		margin-top: 25px;
	}
	/*Secure footer css*/
	#securefooter {
		position: relative;;
		background: #f2f2f2;
		bottom: 0;
		left: 0;
	}

	.mainfooter {
		float: left;
		background-color: #f2f2f2;
		margin-top: 10px;
		padding: 15px 0;
		width: 100%;
		font-size: 1.25rem;
	}

	.footertext {
		display: inline-block;
		width: 50%;
		text-align: center;
	}

	.footertext label {
		display: inline-block;
		font-size: 1.25rem;
	}

	.footerrighttext {
		display: inline-block;
		width: 50%;
		text-align: center;
	}

	.footerrighttext label {
		display: inline-block;
		font-size: 1.25rem;
	}

	.mainfooter div span {
		color: #7ebae3;
		font-size: 1.25rem;
	}

	.page-wrap {
		min-height: 100%;
		margin-bottom: -75px;
		margin-top: -97px;
	}

	.site-footer:after {
		height: 75%;
	}
	/*Fix for : unrecognized expression: [data-'Times New Roman'-abide]*/
	meta.foundation-data-attribute-namespace {
		font-family: false;
	} /*
	* OVERRIDING FOUNDATION CSS
	**/
	button {
		position: relative;
	}

	header ul, footer ul {
		margin: 0;
		line-height: normal;
	}

	header button, footer button {
		padding: 0;
	}

	#listingcontainer {
		max-width: 1600px;
	}

	#listingcontainer>.columns {
		padding-left: 35px;
		padding-right: 35px;
	}
	/*
	* Basic Loading for Home Category Product Pages's
	**/
	#mainbanner {
		min-height: 31.75vw;
		margin-bottom: 30px;
	}

	[class*="block-grid-"]:before, [class*="block-grid-"]:after {
		content: " ";
		display: table;
	}
	/* [class*="block-grid-"] {
	  display: table ;
	  padding: 0;
	  margin: 0 -0.625rem;
	} */
	.productsection h2 {
		margin-bottom: 20px;
		margin-top: 20px;
		margin-left: 35px;
		margin-right: 35px;
	}

	.productlisting a {
		border-bottom: 1px solid rgba(0, 0, 0, 0);
		line-height: 20px;
		text-decoration: none;
	}

	.productsection a {
		display: block;
		margin: 0 auto;
		max-width: 1600px;
	}

	.productsection h2 a {
		color: #31afac;
	}

	.productlisting>.medium-block-grid-5>li {
		width: 20%;
		list-style: none;
		float: left;
	}

	.productlisting>.medium-block-grid-4 li {
		width: 25%;
		list-style: none;
		float: left;
	}

	.productlisting ul.medium-block-grid-5 {
		margin-left: 35px;
		margin-right: 35px;
	}

	#mainbanner h1 {
		color: #fff;
		font-size: 3.6vw;
		font-weight: lighter;
		letter-spacing: 0.15px;
		position: absolute;
		right: 11px;
		top: 40%;
		width: 50%;
	}

	#mainbanner>.categorydescription {
		color: #fff;
		font-size: 0.8em;
		height: 140px;
		line-height: 23px;
		position: absolute;
		right: 10px;
		top: 57%;
		width: 50%;
		text-align: justify;
	}

	.menu {
		background: #666;
		margin-top: 5px;
		border: 0px solid #555;
	}

	.menu .top-bar {
		line-height: 3.375rem;
		height: 3.375rem;
	}

	.top-bar-section ul li {
		float: left;
	}

	.top-bar-section .left .content {
		display: none;
	}

	#topbarcontainer .f-dropdown.content.open {
		display: block;
		top: 47px !important;
	}

	.maintitle {
		font-size: 26px;
		text-align: center;
		margin: 10px 0 15px 0;
		font-weight: 300;
	}

	span.highlight {
		color: #59b5d7;
	}

	.mainsubtitle {
		color: #222;
		font-size: 20px;
		font-weight: 300;
		margin-top: -10px;
		text-align: center;
	}

	.overwhelm .equale li:hover, .top_banners li:hover {
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
	}

	.maintitle h1::before, .maintitle h1::after {
		content: "";
		height: 1px;
		width: 141px;
		display: inline-block;
		height: 1px;
		width: 137px;
		background: url({{asset("webadmin/front/assets/images/iconSpriteBg.png")}}) no-repeat -6px -542px;
		vertical-align: middle;
	}

	.maintitle h1::after {
		background-position: -144px -542px;
	}

	#mainbanner>.categorydescription {
		color: #fff;
		font-size: 0.8em;
		height: 140px;
		line-height: 23px;
		position: absolute;
		right: 10px;
		top: 57%;
		width: 50%;
		text-align: justify;
	}

	#categorybanner>.categorydescription {
		color: rgb(255, 255, 255);
		font-size: 0.8em;
		height: 140px;
		line-height: 23px;
		position: absolute;
		right: 10px;
		top: 39%;
		width: 50%;
		text-align: justify;
	}

	#categorybanner img {
		min-height: auto;
		max-width: 100%;
	}

	#categorybanner, #mainbanner {
		position: relative;
		margin: 0 auto;
		max-width: 1600px;
	}

	.navigation {
		margin-top: 22px;
	}

	.navigation>div {
		display: inline-block;
	}

	.leftnav {
		float: right;
		height: auto;
	}

	.navigation div nav .navmenu {
		text-decoration: none;
		color: #000;
	}

	

	#sort {
		width: 150px;
		overflow: visible;
		cursor: pointer;
		padding-top: 0px;
		padding-bottom: 0px;
		height: 25px;
		background-color: #fff;
		vertical-align: baseline;
	}

	#topbarcontainer {
		max-width: 1600px;
		width: 100%;
		z-index: 1;
	}

	.productlisting [class*="block-grid-"]>li {
		padding-top: 20px;
	}

	#tabs .scroll-pane #tab-1, #tabs .scroll-pane #tab-2, #tabs .scroll-pane #tab-3
		{
		display: none;
	}

	.reveal-modal {
		display: none;
	}

	#fnpsearch::-webkit-search-cancel-button {
		position: relative;
		right: 10px;
		display: block;
	}

	[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak,
		.x-ng-cloak {
		display: none !important;
	}

	.left {
		float: left !important;
	}

	.right {
		float: right !important;
	}

	#topbarcontainer .top-bar-section, #topbarcontainer .top-bar {
		background: #666;
	}

	#topbarcontainer .top-bar {
		max-width: 100%;
	}

	.top-bar-section ul li {
		background: none !important;
	}

	.top-bar-section li:not (.has-form ) a:not (.button ){
		background: none !important;
	}

	.checkbox input {
		opacity: 0;
	}

	h2.paymentmsg {
		margin-top: 150px;
		text-align: center;
		font-size: 2.0rem;
		color: #7ebae3;
		font-weight: 400;
	}

	h4.paymentmsg {
		margin-bottom: 150px;
		text-align: center;
		font-weight: 500;
		font-size: 18px;
	}

	.top-bar-section {
		display: none;
	}


	header input::-webkit-input-placeholder {
		color: #bbb;
	}

	header input:-moz-placeholder {
		/* Firefox 18- */
		color: #bbb;
	}

	header input::-moz-placeholder {
		/* Firefox 19+ */
		color: #bbb;
	}

	header input:-ms-input-placeholder {
		color: #bbb;
	}

	#filtersOptions {
		display: none;
	}

	.searchparam::before {
		content: ", ";
	}

	.searchresults>span:nth-child(2)::before {
		content: "";
	}

	.searchparam {
		color: #7ac4e1;
		text-transform: capitalize;
		margin-bottom: 10px;
	}

	.personalise-thum img {
		width: 100%;
	}

	md-input-container label:after {
		content: '' !important;
	}


	.infobar {
		visibility: hidden;
	}

	.prodinfobar {
		visibility: hidden;
	}
	/*css added for view cart */
	.quatityincrease {
		border: none;
		background-color: #fff;
		margin-right: 5px;
		padding-right: 5px;
		vertical-align: bottom;
	}

	.viewCartQuantity {
		border: 1px solid #999;
		border-radius: 3px;
		width: 67px;
		margin-left: 55px;
		height: 24px;
	}

	.viewitemquantity {
		display: inline-block;
		vertical-align: sub;
	}

	.quatitydecrease {
		border: none;
		background-color: #fff;
		padding-left: 8px;
		vertical-align: bottom;
	}
	/*css for delivery page cart increase */
	.deliveryviewcart {
		border: 1px solid #a198a8;;
		border-radius: 3px;
		width: 82px;
		height: 36px;
		margin-left: 154px;
		display: inline-flex;
	}

	.deliveryviewcart>.deliverycartincr {
		border: none;
		background-color: #fff;
		margin-right: 5px;
		padding-left: 5px;
		padding-right: 5px;
		vertical-align: -webkit-baseline-middle;
	}

	.deliveryviewcart>.viewcartquantity {
		display: inline-block;

		vertical-align: -webkit-baseline-middle;
		margin-top: 10px;
	}

	.deliveryviewcart>.deliverycartdecr {
		border: none;
		background-color: #fff;
		padding-left: 8px;
		vertical-align: -webkit-baseline-middle;
	}
	/* css for ordersummary page */
	.remove2 {
		position: relative;
	}

	.ordersummaryviewcart {
		right: 95px;
		top: 6px;
		border: 1px solid #999;
		border-radius: 3px;
		width: 96px;
		height: 36px;
		margin-left: 177px;
		margin-bottom: 56px;
		display: inline-flex;
		bottom: 46px;
	}

	.remove2>.ordersummaryviewcart {
		right: 95px;
		top: -2px;
		border: 1px solid #999;
		border-radius: 3px;
		width: 96px;
		height: 36px;
		margin-left: 48px;
		margin-left: 177px;
		margin-bottom: 56px;
		display: inline-flex;
		bottom: 46px;
		position: absolute;
	}

	.ordersummaryviewcart>.quantityincrease {
		font-size: 22px;
		font-weight: 200;
		border: none;
		background-color: #fff;
		margin-right: 5px;
		padding-left: 14px;
		padding-right: 8px;
		padding-top: 6%;
		vertical-align: -webkit-baseline-middle;
	}

	.ordersummaryviewcart>.ordersummaryquantity {
		display: inline-block;
		vertical-align: -webkit-baseline-middle;
		margin-top: 8px;
		margin-left: 8px;
		font-size: 14px;
	}

	.ordersummaryviewcart>.quantitydecrease {
		font-size: 22px;
		font-weight: 200;
		border: none;
		background-color: #fff;
		padding-left: -1px;
		padding-top: 6%;
		vertical-align: -webkit-baseline-middle;
	}

	.addonordersummary {
		border-bottom: aliceblue !important;
	}

	.firstaddon {
		margin-top: -37px;
	}

	.addonn-unit-quantity {
		font-size: 14px !important;
	}

	.productlisting {
		max-width: 1600px;
		margin: 0 auto;
	}

	.review-wrapper {
		margin-left: 60px;
		margin-right: 35px;
	}

	.review-wrapper .slick-prev {
		left: -20px;
	}

	.review-outer-section {
		width: 95%;
	}

	.review-section {
		height: 182px;
	}

	.customer-review, .customer-name {
		font-style: italic;
		font-size: 14px;
		font-weight: 600;
		color: #433f3f;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		/* white-space: nowrap; */
		overflow: hidden;
		line-height: 1.2;
		text-overflow: ellipsis;
	}

	.customer-review {
		height: 34px;
		width: auto;
	}

	.each-review .customer-review {
		height: 40px;
	}

	.productlisting img {
		margin-bottom: 0.5em;
		background-position: 59% 44%;
		margin: 0;
		padding: 0.5em;
		width: 100%;
	}

	.has-dropdown not-click>a {
		display: inherit
	}
	/*custom category heading css*/
	#categorybanner>h1.custom-category-heading {
		color: #222;
		font-family: 'Roboto', sans-serif;
		font-size: 3.6vw;
		/*  font-weight: lighter; */
		letter-spacing: 0.15px;
		right: 11px;
		top: 13%;
		width: 50%;
		position: unset;
	}

	.delivery-date {
		padding-top: 12px !important;
	}

	.delivery-date {
		font-size: 14px;
		font-weight: 600;
		color: #433f3f;
	}

	.delivery-area, .occassion {
		color: #7E7E7E;
		font-size: 12px;
	}

	.review {
		position: relative;
		border-radius: 0px 10px 10px 10px;
		height: 185px;
		margin: 18px;
		min-width: 330px;
		min-height: 175px;
		max-height: 195px;
		position: relative;
		background: #f7f7f7;
		margin-right: 11px;
		float: left;
	}

	.each-review .review {
		min-width: 277px;
	}

	.review:before {
		content: '';
		position: absolute;
		left: 0;
		top: 5.5%;
		width: 0;
		height: 0;
		border: 20px solid transparent;
		border-right-color: #f7f7f7;
		border-left: 0;
		border-top: 0;
		margin-top: -10px;
		margin-left: -20px;
	}

	.review .product-image {
		width: 25%;
		height: 10px;
		float: left;
		padding: 5%;
		padding-right: 0%;
	}

	.review .customer-section {
		width: 75%;
		float: right;
		padding: 5% 5% 5% 0%;
	}

	.left-pagination:hover, .right-pagination:hover {
		background: #515151;
	}

	.left-pagination {
		box-shadow: 2px 1px 2px 1px #b8b8b8;
		height: 40px;
		width: 22px;
		color: #b8b8b8;
		font-size: 20px;
		display: inline-block;
		float: left;
		border-radius: 0px 5px 5px 0px;
		margin: 0px 0px 0px 0px;
		z-index: 0;
	}

	.left-pagination::after {
		width: 16px;
		height: 20px;
		background: url({{asset('webadmin/front/assets/images/iconSpriteArrows.html')}}) no-repeat;
		background-position: -578px -47px;
		position: absolute;
		content: "";
		top: 5px;
	}

	#categorybanner>.occasion-categorydescription {
		position: unset !important;
		color: #222 !important;
		font-size: 14px !important;
		width: 100% !important;
		height: inherit !important;
	}

	ul.custom-category-ul .h-price {
		font-size: 18px;
	}

	ul.custom-category-ul .h-price span.oldprice {
		margin-right: 5px;
	}

	.right-pagination {
		box-shadow: 2px 1px 2px 1px #b8b8b8;
		height: 40px;
		width: 22px;
		color: #e6e6e6;
		font-size: 20px;
		display: inline-block;
		float: left;
		border-radius: 5px 0px 0px 5px;
		margin: 0px 0px 0px 0px;
		z-index: 0;
	}

	.right-pagination::after {
		width: 16px;
		height: 20px;
		background: url({{asset('webadmin/front/assets/images/iconSpriteArrows.html')}}) no-repeat;
		background-position: -592px -47px;
		position: absolute;
		content: "";
		top: 5px;
		left: 6px;
	}

	a.more, a.more:HOVER {
		background: none;
	}

	.top-bar-section .dropdown label {
		padding-left: 0.3rem;
	}

	.top-bar-section ul {
		height: 100% !important;
	}

	.fredsel div input, .fredsel div label {
		margin: 0;
		padding: 0 !important;
		font-size: 0.7rem !important;
		color: #515151;
		font-weight: normal !important;
		line-height: normal;
		height: auto !important;
	}

	span#deliverydatemenu {
		display: block;
	}

	.checklabel {
		display: inline-block;
		text-transform: capitalize !important;
		color: #aaa !important;
		vertical-align: 6px;
	}

	.review-wrapper .slick-list {
		max-height: 56vh;
	}

	@media ( max-width :1280px) {
		.circle {
			margin: 16px 0px 0px 3px;
		}
		.customer-full-name {
			padding-right: 0px;
		}
		.review {
			min-width: 329px;
		}
		.each-review .review {
			min-width: 261px;
		}
	}

	.customer-name {
		padding: 10px 0 10px 0;
	}

	.delivery-area {
		padding: 5px 0;
	}

	.review-wrapper .slick-prev:hover:after {
		background-position: -606px -47px;
	}

	.review-wrapper .slick-next:hover:after {
		background-position: -621px -47px;
	}

	.review-heading {
		margin-top: 35px;
		margin-bottom: 5px;
	}

	.review-heading span {
		font-size: 18px;
		color: #b2a6a6;
	}

	.slick-next:before, .slick-prev:before {
		content: '';
	}

	/*css from simpee fold for loading categories on hover moved to here */

	.sub-navmenubar {
		float: left;
		width: 100%;
		display: table;
	}

	.searchinstead {
		display: none;
	}

	.disabled {
		pointer-events: none;
	}

	.clear-both {
		clear: both;
	}
	#account-dropdown, #enquire-dropdown, .currency-dropdown, #searchhintlistdiv,#cartpanel,#login-withopt,#new-login,.otp,#password-box,.welcome-msg,.resend-otp,.login-helpsec{
		display: none;
	}
	.search-clear-pin {
		position: absolute;
		right: 52px;
		top: 25px;
		cursor: pointer;
	}
	.material-icons.search-clear-pin{
		font-size : 18px;
	}
	#otherOptions {
		height: 70px;
		padding-top: 24px;
		max-height: 70px;
		vertical-align: top;
	}
	.curr_usd, .curr_gbp, .curr_eur, .curr_aud, .curr_sgd, .curr_qar, .curr_nzd, .curr_myr, .curr_cad, .curr_aed, .curr_omr, .curr_kwd, .curr_bhd, .curr_inr {
		margin-right: 0.2em;
	}	
</style>
<script>
	var cookieDomain = ".fnp.sg";
	var assetsVersion= "v100"
	var cdnHost = "{{asset('webadmin/front/i1.fnp.sg/')}}";
	var cdnJSONHost = "index.html";
	var secureHostNameToUse = "www.fnp.sg";
	var cdnINTLHostName = "";
	var defaultCurrencyUomId ="SGD";
	var cssFilesList = ["assets/min/common.css", "assets/min/microsite.css"];
</script>
<link href="{{asset('front/i1.fnp.sg/assets/min/common.css')}}" rel="stylesheet">
<link href="{{asset('front/i1.fnp.sg/assets/min/microsite.css')}}" rel="stylesheet">
<meta name="generator" content="Apache OFBiz"/>
<link href="{{asset('webadmin/front/css/responsiveslides.css')}}" rel="stylesheet">
<link href="{{asset('webadmin/front/css/themes.css')}}" rel="stylesheet">
<link href="{{asset('webadmin/front/css/font-awesome.css')}}" rel="stylesheet">
<style>
			ul {
				margin: 0;
			}
			header.fixed_header #appbar, 
			header.fixed_header #navmenubar, 
			#mainbanner, h1::before, h1::after {
				display: none;
			}
			.back-to-top {
				position: fixed;
				right: -110%;
				bottom: 10%;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				line-height: 53px;
				color: #fff;
				background: rgba(0,0,0,0.5);
				text-align: center;
				cursor: pointer;
				transition: all ease-in-out 0.5s;
			}
			.back-to-top:after {
				position: absolute;
				content: "Go to Top";
				color: #222;
				width: 100px;
				bottom: -40px;
				left: -30px;
			}
			.back-to-top.top {
				right: 20px;
			}
			.back-to-top a:hover {
				background: rgba(0,0,0,0.8);
			}
			.blogs {
				float: left;
				width: 100%;
				margin: 0;
			}
			.blogs li {
				float: left;
				margin-right: 2%;
				width: 31%;
				list-style: none;
			}
			@font-face {
				font-family: 'Material Icons';
				font-style: normal;
				font-weight: 400;
				src: url(https://fonts.gstatic.com/s/materialicons/v38/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
			}
			.material-icons {
				font-family: 'Material Icons';
				font-weight: normal;
				font-style: normal;
				font-size: 24px;
				line-height: 1;
				letter-spacing: normal;
				text-transform: none;
				display: inline-block;
				white-space: nowrap;
				word-wrap: normal;
				direction: ltr;
				-webkit-font-feature-settings: 'liga';
				-webkit-font-smoothing: antialiased;
			}
			@font-face {
				font-family: 'Courgette';
				font-style: normal;
				font-weight: 400;
				src: local('Courgette Regular'), 
					 local('Courgette-Regular'), 
					 url(https://fonts.gstatic.com/s/courgette/v5/wEO_EBrAnc9BLjLQAUk1WPoK7Es.woff2) format('woff2');
				unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
			}
			@font-face {
				font-family: 'Courgette';
				font-style: normal;
				font-weight: 400;
				src: local('Courgette Regular'), 
					 local('Courgette-Regular'), 
					 url(https://fonts.gstatic.com/s/courgette/v5/wEO_EBrAnc9BLjLQAUk1VvoK.woff2) format('woff2');
				unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
			}
			#mainbanner {
				display: none;
			}
		    body {
				background: #fff;
			}
			.webwrapper {
				width: 100%;
				max-width: 1600px;
				padding: 0 35px;
				margin: 0 auto;
			}
			.banner-area {
				float: left;
				width: 100%;
				padding: 0 0 15px;
				/*background: url(/assets/images/custom/new-home-page/banner/bg.jpg); no-repeat; background-size:cover; background-position: center;*/
			}
			.occassions {
				float: left;
				width: 100%;
				text-align: center;
			}
			.occassions li {
				float: left;
				width: 12.5%;
				padding: 10px 5px;
				list-style: none;
				min-height: 132px;
			}
		   .occassions.brithen li {
				width: 20%;
			}
			.occassions li a {
				display: block;
			}
			.occassions li figure span.occasionlist {
				background: url({{asset('webadmin/front/assets/images/custom/new-home-page/icons/Top-Icons-17-16-oct-2019.svg')}});
				display: block;
				margin: 0 auto;
				background-repeat: no-repeat;
				background-size: 750%;
				width: 90px;
				height: 90px;
				-webkit-transition: all ease-in-out 0.25s;
				transition: all ease-in-out 0.25s;
			}
			span.occasionlist.sameday {
				background-position: 3px 10px !important;
			}
			span.occasionlist.cakes {
				background-position: -84px 5px !important
			}
			span.occasionlist.birthday {
				background-position: -168px 6px !important
			}
			span.occasionlist.flowersCombo {
				background-position: -252px 6px !important
			}
			span.occasionlist.anniversay {
				background-position: -334px -4px !important
			}
			span.occasionlist.hampers {
				background-position: -419px 6px !important
			}
			span.occasionlist.anewArrivals {
				background-position: -502px 6px !important
			}
			span.occasionlist.deals {
				background-position: -586px -4px !important
			}
			span.occasionlist.anniversary {
				background-position: 0 -76px !important
			}
			span.occasionlist.midnight {
				background-position: -80px -77px !important
			}
			.occassions li figure:hover span.occasionlist, 
			.occassions li a:hover .recipients {
				transform: translate(0px, -3px);
			}
			.occassions li figcaption {
				float: left;
				width: 100%;
				padding: 0 10px 10px;
				text-align: center;
				font-size: 15px;
				color: #222;
				line-height: 20px;
				position: relative;
				z-index: 1;
			}
			.mainbanners {
				float: left;
				width: 100%;
			}
			.mainbanners img {
				border-radius: 4px;
				box-shadow: 0 2px 5px rgba(0,0,0,0.1);
				transition: all ease-in-out 0.25s;
				padding: 4px;
				background: #fff;
			}
			.mainbanners img:hover {
				box-shadow: 0 2px 10px rgba(0,0,0,0.2);
			}
			.mainbanners .big-banner {
				float: left;
				width: 70%;
				list-style: none;
			}
			.mainbanners .big-banner img, 
			.mainbanners .small-banner img {
				width: 100%;
			}
			.mainbanners .big-banner a, 
			.mainbanners .small-banner a {
				display: block;
			}
			.mainbanners .small-banner {
				float: left;
				width: 30%;
				padding-left: 15px;
				list-style: none;
			}
			.mainbanners .small-banner ul {
				margin: 0;
				list-style: none;
			}
			.mainbanners .small-banner ul li {
				margin-bottom: 10px;
				min-width: 376px;
			}
			.middle-three-tiles-banner .mainbanners .small-banner ul li {
				margin-bottom: 13px;
			}
			.mainbanners .small-banner ul li:last-child {
				margin-bottom: 0;
			}
			.usp-strip {
				float: left;
				width: 100%;
				padding: 10px 0;
				background: #f8f8f8;
			}
			.usp-strip ul {
				display: table;
				width: 100%;
				margin: 0;
				text-align: center;
			}
			.usp-strip ul li {
				display: table-cell;
				list-style: none;
				font-size: 16px;
				color: #222;
			}
			.usp-strip ul li span {
				background: #94bb51;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				text-align: center;
				color: #fff;
				display: inline-block;
				line-height: 28px;
				margin-right: 8px;
		    }
			.usp-strip ul li span i {
				font-size: 16px; 
				vertical-align: middle;
		    }
			.categories, .middle-banners, .bottom-banner, .middle-three-tiles-banner {
				float:left; 
				width: 100%; 
				padding: 40px 0 0; 
				opacity: 1; 
				transition: all ease-in-out 0.25s;
		    }
			.categories.active, .middle-banners.active, .bottom-banner.active {
				opacity: 1;
		    }
			.category {
				float: left; 
				width: 18.4%; 
				text-align: center;
				margin-right: 2%;
		    }
		    .gift-categories .category {
				float: left; 
				width: 23%;
		    }
			.category:last-child {
				float:right; 
				margin-right: 0;
		    }
			.category a {
				display: block;
		    }
			/*.categories.round img{
		  		border-radius: 50%;
		    }*/
			.category img {
				box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
				margin-bottom: 20px; 
				transition: all ease-in-out 0.25s; 
				width: 100%; background: #fff; border-radius: 4px; padding: 4px;
		    }
			.category:hover img {
				box-shadow: 0 4px 10px rgba(0,0,0,0.3);
				transform: translate(0px, -3px);
		    }
			.category figcaption { 
				display: block; 
				color: #222; 
				font-size: 18px;
		    }
			.categories .category-title, .middle-three-tiles-banner .category-title {
				float: left;
				width: 100%; 
				padding: 20px 0px;
		    }
			.categories .category-title, 
		    .categories .category-title a, 
		    .middle-three-tiles-banner .category-title a {
				color: #222; 
				font-size: 32px; 
				padding: 10px 0; 
				display: inline-block; 
				vertical-align: middle; 
				font-weight: bold;
		    }
			/*.categories .category-title a.title, 
		    .middle-three-tiles-banner .category-title a.title {
		    	font-family: 'Courgette', cursive;
		    }*/
			.categories .category-title a.view-all, 
		    .middle-three-tiles-banner .category-title a.view-all {
				background: #94bb51;
				float: right;
				font-size: 16px;
				border-radius: 4px; 
				padding: 10px; 
				margin-top: 4px;
				text-transform: uppercase;
				color: #fff; 
				transition: all ease-in-out 0.25s;
		    }
			.categories .category-title a.view-all:hover, 
		    .middle-three-tiles-banner .category-title a.view-all:hover {
				box-shadow: 0 2px 10px rgba(0,0,0,0.2);
		    }
			.categories.best_seller .product {
				float: left; 
				width: 23.5%;
				margin-right: 2%;
		    }
			.categories.best_seller .product .infobar {
				display:none;
		    }
			.categories.best_seller .product .each-product-review div {
				display: inline-block; 
				margin: 10px 5px 0;
		    }
			.categories.best_seller .product .each-product-review .ratings-count {
				color:#ff9212;
		    }
			.categories.best_seller .product:last-child {
				float: right; 
				margin-right: 0;
		    }
			.categories.best_seller .product a {
				display: block; 
				width: 100%; 
				background: #fff; 
				border-radius: 4px;
				float: left; 
				transition: all ease-in-out 0.25s;
				box-shadow: 0 2px 5px rgba(0,0,0,0.1);
		    }
			.categories.best_seller .product a:hover {
				box-shadow: 0 2px 10px rgba(0,0,0,0.2);
		    }
			.categories.best_seller .product a img {
				padding: 5px;
		    }
			.categories.best_seller .product figcaption {
				display: block;
				text-align: center;
		    }
			.categories.best_seller .product .p-name {
				line-height: 20px !important;
				padding-left: 4px; 
				color: #909090;
				font-size: 14px; 
				margin-top: 10px;
		    }
			.categories.best_seller .product .h-price1 {
				padding-left: 4px; 
				color: #222;
				font-size: 18px; 
				min-height: 42px;
				font-weight: bold; 
				display: block;
				margin-top: 10px;
		    }
			.categories.best_seller .product .moredata { 
				font-size: 0.9em; 
				display: block;
				float: left; 
				width: 100%;
		    }
			.categories.best_seller .product .earliestdelivery {
				color: #909090;
				font-size: 13.5px;
				text-align: center; 
				margin: 0px 5px 0px 5px;
		    }
			.categories.best_seller .product .dt-delivery { 
				color: #0f9d58; 
				font-weight: bold !important; 
				font-size: 13px;
		    }
			.categories.best_seller .product .each-product-review {
				display: block; 
				float: left; 
				margin-top: 0; 
				padding-left: 0.4vw; 
				cursor: pointer; 
				width: 100%;
				text-align: center;
				margin-bottom: 10px;
		    }
			.middle-banners figure {
				float: left; 
				width: 50%; 
				padding-right: 10px;
		    }
			.middle-banners figure a {
				display:block;
		    }
			.middle-banners figure img {
				border-radius: 4px;
				padding: 4px;
				background: #fff; 
				transition: all ease-in-out 0.25s;
				box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
				width:100%;
		    }
			.middle-banners figure img:hover {
				box-shadow: 0 2px 10px rgba(0,0,0,0.2);
		    }
			.middle-banners figure:last-child {
				padding-left: 10px; 
				padding-right: 0;
		    }
		    .bottom-banner figure {
				float: left; 
				width: 100%; 
				padding-right: 10px;
		    }
			.bottom-banner figure a {
				display:block;
		    }
			.bottom-banner figure img {
				border-radius: 4px;
				padding: 4px;
				background: #fff; 
				transition: all ease-in-out 0.25s;
				box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
				width:100%;
		    }
			.bottom-banner figure img:hover {
				box-shadow: 0 2px 10px rgba(0,0,0,0.2);
		    }		  
			main .categorydescp {
				float: left;
				width: 100%;
				padding: 35px 0 0;
			}
			.categorydescp h2 {
				font-size: 13px;
				font-weight: bold !important;
				line-height: 24px;
				color: #666;
				margin-bottom: 0 !important;
			}
			.categorydescp p {
				font-size: 12px;
				line-height: 18px;
				color: #666;
			}
			.loading {
				display: none;
			}
			.middle-three-tiles-banner .mainbanners .big-banner ul, 
			.mainbanners.top_four_tiles .big-banner ul {
				margin: 0;
				list-style: none;
			}
			.middle-three-tiles-banner .mainbanners .big-banner ul li, 
			.mainbanners.top_four_tiles .big-banner ul li {
				float: left;
				width: 50%;
				padding-right: 7.5px;
			}
			.middle-three-tiles-banner .mainbanners .big-banner ul li:last-child, 
			.mainbanners.top_four_tiles .big-banner ul li:last-child {
				padding-right: 0px;
				padding-left: 7.5px;
			}
			.mainbanners.top_four_tiles .small-banner ul li {
				margin-bottom: 8px;
			}
			.ups-homepage {
				display: none;
			}
			.heading {
				float: left;
				width: 100%;
				text-align: center;
			}
			.maintitle {
				font-size: 36px;
				text-align: center;
				margin: 60px 0 25px;
				font-weight: bold;
			}
			.mainsubtitle {
				color: #222;
				font-size: 14px;
				font-weight: 400;
				margin-top: -10px;
				text-align: center;
				margin-bottom: 0;
			}
			.new-louncher .category {
				width: 23.5%;
			}
			/*.middle-banners, .middle-three-tiles-banner {
				padding-top:60px;
			}*/
			.middle-three-tiles-banner .productsection.tm-boxx .productlisting {
				max-width: 1366px;
			}
			.middle-three-tiles-banner .productsection.tm-boxx .productlisting > ul a {
				box-shadow: 0 2px 5px rgba(0,0,0,0.1);
			}
			.middle-three-tiles-banner .productsection.tm-boxx .productlisting > ul li {
				padding-top: 0;
			}
			.middle-three-tiles-banner .productsection.tm-boxx .category-title {
				padding: 10px 0;
			}
			.top-banner {
				float: left;
				width: 100%;
			}
			.top-banner a {
				display: block;
				transition: all ease-in-out 0.25s;
			}
			.top-banner a:hover {
				box-shadow: 0 2px 10px rgba(0,0,0,0.2);
			}
			.full-width-banner {
				float: left;
				width: 100%;
				margin-bottom: 0;
			}
			.top-banner .banners {
				float: left;
				width: 32.3%;
				margin-right: 1.55%;
				margin-bottom: 20px;
				margin-top: 30px;
			}
			.top-banner .banners:last-child {
				float: right;
				margin-right: 0;
			}
			.categorydescp a:hover {
				color: #0078a0;
			}
			.blogs {
				float: left;
				width: 100%;
				margin: 0;
			}
			.blogs li {
				float: left;
				margin-right: 2%;
				width: 31%;
			}
			.blogs li:last-child {
				float: right;
			}
			h6 {
				font-size: 14px;
				font-weight: bold;
				margin: 10px 0;
				line-height: 20px;
			}
			.blogs h6 i {
				display: block;
				width: 100%;
			}
			.categorydescp table, .more-info table {
				width: 100%;
			}
			.categorydescp table tr:nth-child(odd), 
			.more-info table tr:nth-child(odd) {
				background: #ccc;
			}
			.categorydescp table tr:nth-child(even), 
			.more-info table tr:nth-child(even) {
				background: #f2f2f2;
			}
			.categorydescp table th, .categorydescp table td, 
			.more-info table th, .more-info table td {
				color: #222222;
				font-size: 12px;
				padding: 5px;
				text-align: center!important;
				line-height: 20px;
			}
			.categorydescp li {
				margin-bottom: 15px;
				color: #666;
			}
			.recipientslist.occassions li figcaption {
				padding: 10px;
			}
			.recipients {
				background: url({{asset('webadmin/front/assets/images/custom/new-home-page/icons/reciepients.svg')}});
				display: block;
				margin: 0 auto;
				background-repeat: no-repeat;
				background-size: 750%;
				width: 90px;
				height: 90px;
				-webkit-transition: all ease-in-out 0.25s;
				transition: all ease-in-out 0.25s;
			}
			.recipients.boyfriend {
				background-position: -122px 0 !important
			}
			.recipients.girlfriend {
				background-position: -8px 0 !important
			}
			.recipients.husband {
				background-position: -236px 0 !important
			}
			.recipients.wife {
				background-position: -348px 0 !important
			}
			.recipients.mother {
				background-position: -460px 0 !important
			}
			.recipients.father {
				background-position: -572px 0 !important
			}
			.recipients.brother {
				background-position: -9px -114px !important
			}
			.recipients.sister {
				background-position: -119px -114px !important
			}
			.recipients.parents {
				background-position: -235px -114px !important
			}
			.recipients.boss {
				background-position: -346px -114px !important
			}
			.recipients.employees {
				background-position: -461px -114px !important
			}
			.recipients.clients {
				background-position: -573px -114px !important
			}
			.recipients.coleague {
				background-position: -10px -225px !important
			}
			.recipients.boys {
				background-position: -122px -225px !important
			}
			.recipients.girls {
				background-position: -234px -225px !important
			}
			.recipients.friend {
				background-position: -349px -225px !important
			}
			.full-width-banner img {
				border-radius: 4px 4px 0 0 !important;
			}
			.full-width-banner .slick-arrow.slick-prev {
				left: 0;
				border-radius: 0 4px 4px 0;
				box-shadow: 0 1px 3px rgba(0,0,0,0.3);
				color: #222;
				background: rgba(255,255,255,0.8) !important;
				width: 30px !important;
				height: 70px !important;
				z-index: 9;
				top: 43%;
			}
			.full-width-banner .slick-arrow.slick-next {
				right: 0;
				border-radius: 4px 0 0 4px;
				box-shadow: 0 1px 3px rgba(0,0,0,0.3);
				color: #222;
				background: rgba(255,255,255,0.8) !important;
				width: 30px !important;
				height: 70px !important;
				z-index: 9;
				top: 43%;
			}
			.full-width-banner .slick-arrow:hover {
				background: rgba(255,255,255,1) !important;
			}
			.full-width-banner .slick-arrow.slick-prev:before, 
			.full-width-banner .slick-arrow.slick-next:before {
				display: none;
			}
			.banner-with-carosal {
				float: left;
				width: 100%;
			}
			.banner-with-carosal .banner-carosal {
				float: left;
				width: 100%;
				box-shadow: 0 2px 10px rgba(0,0,0,0.2);
				max-height: 305px;
				overflow: hidden;
				opacity: 0;
			}
			.full-banner-container {
				background-repeat: no-repeat;
				background-position: center top;
				background-color: rgb(242, 242, 242);
				float: left;
				width: 100%;
				margin-bottom: 20px;
				max-height: 305px;
			}
			.full-width-banner .slick-dots {
				bottom: 5px;
			}
			.full-width-banner .slick-dots li {
				width: auto;
				height: inherit;
				margin: 0 1px;
			}
			.full-width-banner .slick-dots li button {
				width: 5px;
				height: 5px;
				background: #222;
				opacity: 0.3;
				border-radius: 50%;
				margin: 0;
				padding: 0;
			}
			.full-width-banner .slick-dots li button:after, 
			.slick-dots li.slick-active button:before {
				display: none !important;
			}
			.full-width-banner .slick-dots li.slick-active button {
				opacity: .75
			}
			.slider-nav-thumbnails {
				float: left;
				width: 100%;
				text-align: center;
				background: #fff;
				color: #222;
				text-transform: capitalize;
				position: relative;
				z-index: 9;
			}
			.slider-nav-thumbnails .slick-slide {
				border-bottom: 2px solid #fff;
				padding: 10px;
				background: #fff;
				cursor: pointer;
			}
			.slider-nav-thumbnails .slick-slide.slick-active {
				border-bottom: 2px solid #72992f;
				color: #72992f;
			}
			.slick-prev, .slick-next {
				display: none !important;
			}
			.banner-bg {
				float: left;
				width: 100%;
			}
			@media(max-width:1366px) {
				.category figcaption {
					padding: 13px 10px;
					font-size: 18px;
				}
				.full-banner-container {
					max-height: 259px;
				}
				.slick-slider {
					margin-bottom: 0;
				}
			}

			@media(max-width:1280px) {
				.category figcaption {
					padding: 12px 10px;
				}
				.mainbanners .small-banner ul li {
					min-width: inherit;
				}
			}		
		</style>

		<link rel="stylesheet" href="{{asset('front/css/datepicker.css')}}" type="text/css" />