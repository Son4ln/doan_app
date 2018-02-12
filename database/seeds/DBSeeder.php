<?php

use Illuminate\Database\Seeder;

class DBSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
     //    DB::table('categories')->insert([
     //    	[
     //        'name' => 'Categories 1',
     //        'deleted' => False
     //    	],
     //    	[
     //        'name' => 'Categories 2',
     //        'deleted' => False
     //    	],
     //    	[
     //        'name' => 'Categories 3',
     //        'deleted' => False
     //    	]
    	// ]);

        DB::table('contact')->insert([
            [
            'images' => null,
            'name' => 'ĐỖ VĂN ANH',
            'position' => 'Giám Đốc',
            'phone' => '0162 778 9968',
            'fax' => '(0650) 3789157',
            'email' => 'dovananh1968@yahoo.com.vn',
            'adrress' => '29/18 Bình Phú, Bình Chuẩn, Thuận An, Bình Dương'
            ]
        ]);

        DB::table('company_info')->insert([
            [
            'name' => 'CÔNG TY TNHH MTV THƯƠNG MẠI DỊCH VỤ ĐỖ AN',
            'phone' => '0162 778 9968',
            'fax' => '(0650) 3789157',
            'email' => 'anhnhatphap@gmail.com',
            'website' => 'http://doan.bizz.vn',
            'address' => '29/18 Bình Phú, Bình Chuẩn, Thuận An, Bình Dương',
            'facebook' => '',
            'facebook_message' => 'https://www.facebook.com/messages/t/son4ln'
            ]
        ]);

    	// DB::table('products')->insert([
    	// 	[
    	// 		'cate_id' => 1,
     //            'images' => '1.jpg',
    	// 		'parameter' => null,
    	// 		'name' => 'Product 1',
    	// 		'desc' => 'Description 1',
    	// 		'deleted' => False
    	// 	],
    	// 	[
    	// 		'cate_id' => 2,
     //            'images' => '1.jpg',
    	// 		'parameter' => null,
    	// 		'name' => 'Product 2',
    	// 		'desc' => 'Description 2',
    	// 		'deleted' => False
    	// 	],
    	// 	[
    	// 		'cate_id' => 3,
     //            'images' => '1.jpg',
    	// 		'parameter' => null,
    	// 		'name' => 'Product 3',
    	// 		'desc' => 'Description 3',
    	// 		'deleted' => False
    	// 	],
    	// 	[
    	// 		'cate_id' => 1,
     //            'images' => '1.jpg',
    	// 		'parameter' => null,
    	// 		'name' => 'Product 4',
    	// 		'desc' => 'Description 4',
    	// 		'deleted' => False
    	// 	],
    	// 	[
    	// 		'cate_id' => 2,
     //            'images' => '1.jpg',
    	// 		'parameter' => null,
    	// 		'name' => 'Product 5',
    	// 		'desc' => 'Description 5',
    	// 		'deleted' => False
    	// 	],
    	// 	[
    	// 		'cate_id' => 3,
     //            'images' => '1.jpg',
    	// 		'parameter' => null,
    	// 		'name' => 'Product 6',
    	// 		'desc' => 'Description 6',
    	// 		'deleted' => False
    	// 	],
    	// 	[
    	// 		'cate_id' => 1,
     //            'images' => '1.jpg',
    	// 		'parameter' => null,
    	// 		'name' => 'Product 7',
    	// 		'desc' => 'Description 7',
    	// 		'deleted' => False
    	// 	],
    	// 	[
    	// 		'cate_id' => 2,
     //            'images' => '1.jpg',
    	// 		'parameter' => null,
    	// 		'name' => 'Product 8',
    	// 		'desc' => 'Description 8',
    	// 		'deleted' => False
    	// 	],
    	// 	[
    	// 		'cate_id' => 3,
     //            'images' => '1.jpg',
    	// 		'parameter' => null,
    	// 		'name' => 'Product 9',
    	// 		'desc' => 'Description 9',
    	// 		'deleted' => False
    	// 	],
    	// 	[
    	// 		'cate_id' => 1,
     //            'images' => '1.jpg',
    	// 		'parameter' => null,
    	// 		'name' => 'Product 10',
    	// 		'desc' => 'Description 10',
    	// 		'deleted' => False
    	// 	]
    	// ]);

        DB::table('users')->insert([
            'name' => 'Đỗ Văn Anh',
            'email' => 'anhnhatphap@gmail.com',
            'password' => bcrypt('dovananh01627789968'),
        ]);
    }
}
