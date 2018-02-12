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
Route::get('login', 'MainController@login')->name('login');
Route::get('logout', 'MainController@logout');
Route::post('login-act', 'MainController@loginAct')->name('login-act');

Route::prefix('dashboard') -> middleware('manageLogin') -> group(function() {
  Route::get('/', 'MainController@dashboard');
  Route::get('/{path}', 'MainController@dashboard')->where('path', '.*');
});

Route::get('/', 'ClientController@homepage');
Route::get('/{path}', 'ClientController@homepage')->where('path', '.*');
// Route::get('checklogin', 'MainController@checklogin');