<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $table = 'products';
    public $timestamps = false;

    public function categories() {
    	return $this->belongsTo('App\Categories', 'cate_id', 'id');
    }
}
