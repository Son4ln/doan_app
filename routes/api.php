<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('get-products', 'MainController@getAllProduct') -> middleware('apiLogin');

Route::middleware('auth:api')->get('get-products', 'MainController@getAllProduct');
Route::middleware('auth:api')->put('delete-products', 'MainController@deleteProducts');
Route::middleware('auth:api')->get('get-product/{id}', 'MainController@getProduct');
Route::middleware('auth:api')->put('update-product/{id}', 'MainController@updateProduct');
Route::middleware('auth:api')->post('insert-product', 'MainController@insertProduct');
Route::middleware('auth:api')->get('get-categories', 'MainController@getAllCate');
Route::middleware('auth:api')->put('save-categories/{id}', 'MainController@saveCate');
Route::middleware('auth:api')->put('del-categories/{id}', 'MainController@delCate');
Route::middleware('auth:api')->post('add-categories', 'MainController@addCate');
Route::middleware('auth:api')->get('get-contact', 'MainController@getContact');
Route::middleware('auth:api')->put('update-contact', 'MainController@updateContact');
Route::middleware('auth:api')->get('get-company', 'MainController@getCompany');
Route::middleware('auth:api')->put('update-company', 'MainController@updateCompany');
Route::middleware('auth:api')->get('get-deleted', 'MainController@getDeleted');
Route::middleware('auth:api')->put('recover-products/{id}', 'MainController@recoverProducts');
Route::middleware('auth:api')->put('recover-cate/{id}', 'MainController@recoverCate');

//client
Route::get('client-get-products-limit', 'ClientController@getProductsByLimit');
Route::get('client-get-categories', 'ClientController@getCategories');
Route::get('client-get-company', 'ClientController@getCompany');
Route::get('client-get-contact', 'ClientController@getContact');
Route::get('client-get-product/{id}', 'ClientController@getProduct');

Route::get('client-get-products', 'ClientController@getProductsByCate');
Route::post('client-get-products', 'ClientController@getProductsByCate');
Route::post('search', 'ClientController@searchBox');


