<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Validator;
use App\Products;
use App\Categories;
use App\Contact;
use App\Company;

class MainController extends Controller
{
  function login() {
    if (Auth::check()) {
      return redirect('/dashboard');
    } else {
      return view('login');  
    }
  }

  function loginAct(Request $request) {
    $email = $request->email;
    $pass = $request->pass;
    if (Auth::attempt(['email' => $email, 'password' => $pass])) {
      return 'login';
    } else {
      return response()->json(['msg'=> 'login fail'], 400);
    }
  }

  function logout() {
    Auth::logout();
    return redirect()->route('login');
  }

  function dashboard() {
    return view('manage.dashboard');
  }

  function getAllProduct() {
    $productArr = [];
    $products = Products::where('deleted', False)->orderBy('id', 'desc')->get();
    $categories = Categories::where('deleted', False)->get()->toArray();
    foreach ($products as $key) {
      $cate_id = $key -> cate_id;
      $cate = Categories::find($cate_id);
      $keyArr = $key->toArray();
      $keyArr['cate_name'] = $cate->name;
      array_push($productArr, $keyArr);
    }

    $data = [
      'products' => $productArr,
      'categories' => $categories
    ];
    return $data;
  }

  function deleteProducts(Request $request) {
    $id = $request -> product_id;
    $products = Products::find($id);
    $products -> deleted = True;
    $products -> save();
  }

  function getProduct(Request $request) {
    $id = $request->id;
    $product = Products::find($id);
    $cates = Categories::where('deleted', False)->get();
    $data = [
        'product' => $product,
        'categories' => $cates
    ];
    return $data;
  }

  function updateProduct(Request $request) {
    $id = $request -> id;
    $product = Products::find($id);

    if ($request -> name != $product -> name) {
      $this->validate($request,
        [
          'name' => 'unique:products,name',
        ],
        [
          'name.unique' => 'Sản phẩm đã tồn tại'
        ]
      );
    }

    if ($request -> file) {
      $exploded = explode(',', $request -> file);
      $decode = base64_decode($exploded[1]);

      if (strpos($exploded[0], 'jpeg') || strpos($exploded[0], 'jpg')) {
        $extension = 'jpg';
      } elseif (strpos($exploded[0], 'png')) {
        $extension = 'png';
      } else {
        exit();
      }

      $fileName = str_random().date('Y-m-d-H:i:s').'.'.$extension;
      // $path = public_path().'/images/products/'.$fileName;
      // file_put_contents($path, $decode);
      Storage::disk('uploadProducts')->put($fileName,  $decode);
      Storage::disk('uploadProducts')->delete($product -> images);
      // File::delete(public_path().'/images/products/' . $product -> images);
      $product -> images = $fileName;
    }

    $product -> name = $request -> name;
    $product -> parameter = null;
    if ($request -> parameter) {
      $product -> parameter = $request -> parameter;
    }
    $product -> desc = $request -> desc;
    $product -> cate_id = $request -> cate_id;
    $product -> save();
  }

  function insertProduct(Request $request) {
    $this->validate($request,
      [
      'name' => 'unique:products,name',
      ],
      [
        'name.unique' => 'Sản phẩm đã tồn tại'
      ]
    );

    $cate_id = $request -> cate_id;
    $param = $request -> parameter;
    $name = $request -> name;
    $desc = $request -> desc;

    if ($request -> file) {
      $exploded = explode(',', $request -> file);
      $decode = base64_decode($exploded[1]);

      if (strpos($exploded[0], 'jpeg') || strpos($exploded[0], 'jpg')) {
        $extension = 'jpg';
      } elseif (strpos($exploded[0], 'png')) {
        $extension = 'png';
      } else {
        exit();
      }

      $fileName = str_random().date('Y-m-d-H:i:s').'.'.$extension;
      Storage::disk('uploadProducts')->put($fileName,  $decode);
    }

    Products::insert([
      'cate_id' => $cate_id,
      'images' => $fileName,
      'parameter' => $param,
      'name' => $name,
      'desc' => $desc,
      'deleted' => False
    ]);
  }

  function getAllCate() {
    $cate = Categories::where('deleted', False)->get();
    return $cate;
  }

  function saveCate(Request $request) {
    $id = $request -> id;
    $cate = Categories::find($id);
    $cate -> name = $request -> name;
    $cate -> save();
  }

  function delCate(Request $request) {
    $id = $request -> id;
    $cate = Categories::find($id);
    $cate -> deleted = True;
    $cate -> save();
  }

  function addCate(Request $request) {
    $this->validate($request,
      [
      'name' => 'unique:categories,name',
      ],
      [
        'name.unique' => 'Loại sản phẩm đã tồn tại'
      ]
    );

    Categories::insert([
      'name' => $request -> name,
      'deleted' => False
    ]);
  }

  function getContact() {
    $contact = Contact::find(1);
    return $contact;
  }

  function updateContact(Request $request) {
    $contact = Contact::find(1);
    if ($request -> images) {
      $exploded = explode(',', $request -> images);
      $decode = base64_decode($exploded[1]);

      if (strpos($exploded[0], 'jpeg') || strpos($exploded[0], 'jpg')) {
        $extension = 'jpg';
      } elseif (strpos($exploded[0], 'png')) {
        $extension = 'png';
      } else {
        exit();
      }

      $fileName = str_random().'.'.$extension;
      Storage::disk('uploadPublic')->put($fileName,  $decode);
      Storage::disk('uploadPublic')->delete($contact -> images);
      $contact -> images = $fileName;
    }

    $contact -> name = $request -> name;
    $contact -> position = $request -> position;
    $contact -> phone = $request -> phone;
    $contact -> fax = $request -> fax;
    $contact -> email = $request -> email;
    $contact -> adrress = $request -> address;
    $contact -> save();
  }

  function getCompany() {
    $company = Company::find(1);
    return $company;
  }

  function updateCompany(Request $request) {
    $company = Company::find(1);
    $company -> name = $request -> name;
    $company -> phone = $request -> phone;
    $company -> fax = $request -> fax;
    $company -> email = $request -> email;
    $company -> website = $request -> website;
    $company -> address = $request -> address;
    $company -> facebook = $request -> facebook;
    $company -> facebook_message = $request -> facebook_message;
    $company -> save();
  }

  function getDeleted() {
    $products = Products::where('deleted', True)->get()->toArray();
    $categories = Categories::where('deleted', True)->get()->toArray();
    $data = [
      'products' => $products,
      'categories' => $categories
    ];

    return $data;
  }

  function recoverProducts(Request $request) {
    $products = Products::find($request -> id);
    $products -> deleted = False;
    $products -> save();
  }

  function recoverCate(Request $request) {
    $cate = Categories::find($request -> id);
    $cate -> deleted = False;
    $cate -> save();
  }
}
