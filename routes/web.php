<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','FrontController@index');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('admin','AdminLoginController@index')->name('adminLogin');
Route::post('Dologin','AdminLoginController@Dologin');

Route::get('admin/dashboard','AdminDshboard@index');

Route::get('admin/logout','AdminDshboard@logout');

Route::get('admin/change_password','AdminDshboard@change_password');
Route::post('admin/DoChangePassword','AdminDshboard@DoChangePassword');
Route::get('admin/category','CategoryController@index');
Route::post('admin/category/change_status','CategoryController@change_status');
Route::get('admin/category/add_category','CategoryController@AddCategory');
Route::get('admin/category/edit_category/{category_id}','CategoryController@EditCategory');
Route::post('admin/category/add_category_data','CategoryController@add_category_data');
Route::get('admin/sub-category','SubCategoryController@index');
Route::get('admin/sub-category/add-sub-category','SubCategoryController@Add_Sub_Category');
Route::post('admin/sub-category/add_sub_category_data','SubCategoryController@add_sub_category_data');
Route::get('admin/sub-category/update-sub-category/{sub_category_id}','SubCategoryController@Add_Sub_Category');
Route::post('admin/sub-category/sub_change_status','SubCategoryController@sub_change_status');

Route::get('admin/item','ItemController@index');
Route::get('admin/item/add-item','ItemController@AddItem');
Route::get('admin/item/edit-item/{item_id}','ItemController@AddItem');
Route::post('admin/item/selected-sub-cat','ItemController@selectedSubCat');
Route::post('admin/item/add-item-data','ItemController@add_item_data');
Route::post('admin/item/item-change-status','ItemController@item_change_status');
Route::get('admin/city','CityController@index');
Route::get('admin/city/edit-city/{city_id}','CityController@EditCity');
Route::post('admin/city/add-city-data/','CityController@AddCityData');
Route::post('admin/city/add-delivery-data','CityController@add_delivery_data');
Route::post('admin/city/GetDeliveryChargeDetail','CityController@GetDeliveryChargeDetail');
Route::post('admin/city/change-status','CityController@change_status');
Route::post('admin/city/change-delivery-status','CityController@change_delivery_status');
Route::get('admin/hike','HikeController@index');

Route::get('admin/hike/add-hike-price','HikeController@add_hike_price');
Route::get('admin/hike/edit-hike-price/{hike_id}','HikeController@add_hike_price');
Route::post('admin/hike/hike-price-data','HikeController@hike_price_data');
Route::post('admin/hike/change-status','HikeController@change_status');

Route::post('admin/hike/delete-hike-price','HikeController@delete_hike_price');
Route::get('admin/order','OrderController@index');
Route::get('admin/order-detail/{order_id}','OrderController@order_detail');

Route::post('admin/order/email-tamplate','OrderController@email_tamplate');
Route::post('admin/order/order-forward','OrderController@order_forward');
Route::get('admin/coupon','CouponController@index');
Route::get('admin/coupon/add-coupon','CouponController@add_coupon');
Route::get('admin/coupon/edit-coupon/{coupon_id}','CouponController@add_coupon');
Route::post('admin/coupon/change-status','CouponController@change_status');
Route::post('admin/coupon/add-coupon-data','CouponController@add_coupon_data');
Route::post('admin/coupon/delete-coupon','CouponController@delete_coupon');

Route::get('admin/card','CardController@index');
Route::get('admin/card/add-card-message','CardController@add_card_message');
Route::get('admin/card/edit-card-message/{card_id}','CardController@add_card_message');

Route::post('admin/card/add-card-data','CardController@add_card_data');
Route::post('admin/card/delete-card-message','CardController@delete_card_message');
Route::post('admin/card/change-status','CardController@change_status');

Route::get('admin/addon','AddonController@index');
Route::get('admin/addon/add-addon-item','AddonController@add_addon_item');
Route::get('admin/addon/edit-addon-item/{addon_id}','AddonController@add_addon_item');

Route::post('admin/addon/add-addon-data','AddonController@add_addon_data');
Route::post('admin/addon/change-status','AddonController@change_status');
Route::post('admin/addon/delete-add-on-item','AddonController@delete_add_on_item');

Route::get('admin/slider','SliderController@index');
Route::get('admin/slider/add-slider','SliderController@add_slider');
Route::get('admin/slider/edit-slider/{slider_id}','SliderController@add_slider');
Route::post('admin/slider/add-slider-data','SliderController@add_slider_data');

Route::post('admin/slider/change-status','SliderController@change_status');
Route::post('admin/slider/delete-slider','SliderController@delete_slider');
############## front #############
Route::get('flowers','FrontController@flowers');
Route::get('flower-type','FrontController@flower_type');
Route::get('flower-combos','FrontController@flower_combos');
Route::get('plants','FrontController@plants');
Route::get('occasion','FrontController@occasion');
Route::get('gift','FrontController@gift');
Route::get('category','FrontController@category');
Route::get('item-detail','FrontController@item_detail');