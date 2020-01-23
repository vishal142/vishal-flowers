<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Log;
use Session;


class CouponModel extends Model
{
   protected $fillable = ['*'];
   protected $table = 'tbl_coupon';

   public function GetAllCoupon(){
   		return DB::table('tbl_coupon')->select('*')->get();

   }

   public function CouponDetail($id){
   	if($id !=''){
   		return DB::table('tbl_coupon')->select('*')->where('id',$id)->get();

   	}else{
   		return NULL;

   	}
 }

	public function AddCoupon($data = array())
	{
		if($data['id']!='')
		{
			$data['updated_at']= date('Y-m-d H:i:s');
			DB::table('tbl_coupon')->where('id', $data['id'])->update($data);
	    	return $data['id'];

			}else{
				 $data['created_at']= date('Y-m-d H:i:s');
				 return CouponModel::insertGetId($data);

		}

	}

	public function DeleteCoupon($id){
		return CouponModel::where('id', $id)->delete();

	}
	

}
