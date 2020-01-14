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

    public function GetOrderDetail($order_id){
    	$res = DB::table('tbl_order')->select('*')->where('id',$order_id)->get();
    	return $res;

    }

    public function GetReciverDetail($shipping_id){
    	$res = DB::table('tbl_shipping')->select('*')->where('id',$shipping_id)->get();
    	return $res;

    }

 ///////////////End Class///////////////
}
