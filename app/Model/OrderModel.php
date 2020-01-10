<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use log;
use Session;

class OrderModel extends Model
{
    protected $table = 'tbl_order';
    protected $fillable = ['*'];

    public function GetAllOrder(){
    	$res = DB::table('tbl_order')->select('*')->get();
    	return $res;
    }
}
