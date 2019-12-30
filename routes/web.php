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

Route::get('/', function () {
    return view('welcome');
});

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