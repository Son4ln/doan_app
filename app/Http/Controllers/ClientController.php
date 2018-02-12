<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Products;
use App\Categories;
use App\Contact;
use App\Company;

class ClientController extends Controller
{
  function homepage() {
    return view('homepage.homepage');
  }

  function getCategories() {
    $cate = Categories::where('deleted', False)->get();
    return $cate;
  }

  function getProductsByLimit() {
    $products = Products::where('deleted', False) ->inRandomOrder() -> take(8) -> get();
    return $products;
  }

  function getCompany() {
    $company = Company::find(1);
    return $company;
  }

  function getContact() {
    $contact = Contact::find(1);
    return $contact;
  }

  function getProduct(Request $request) {
    $id = $request -> id;
    $product = Products::where([['deleted', False], ['id', $id]])->first();
    $related_products = Products::where([
      ['deleted', False],
      ['cate_id', $product -> cate_id],
      ['id', '!=' , $id]])
    ->inRandomOrder() -> take(4)->get();
    $data = [
      'product' => $product,
      'related' => $related_products
    ];
    return $data;
  }

  function getProductsByCate(Request $request) {
    $skip = 0;
    if ($request -> skip) {
      $skip = $request -> skip;
    }

    if ($request -> cate_id) {
      $cate_id = $request -> cate_id;
      $products = Products::where([['cate_id', $cate_id], ['deleted', False]])
      -> orderBy('id', 'desc')
      -> skip($skip)
      -> take(12)
      -> get();
    } else {
      $products = Products::where('deleted', False)
      -> orderBy('id', 'desc')
      -> skip($skip)
      -> take(12)
      -> get();
    }

    if (count($products) > 0) {
      return $products;
    } else {
      return response()->json(['msg'=> 'products not found'], 400);
    }
    
  }

  function searchBox(Request $request) {
    $value = $request -> value;
    $result = [];
    if ($value != '') {
      $result = Products::where('name', 'like', "%$value%")->get();
      if (count($result) == 0) {
        return response()->json(['msg' => 'not found'], 400);
      }
    }
    
    return $result;
  }
}
