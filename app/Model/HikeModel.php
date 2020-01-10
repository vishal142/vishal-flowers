<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class HikeModel extends Model
{
    protected $fillable = ['*'];
    protected $table = 'tbl_hike_price';

    public function GetAllHike(){
    	$res = DB::table('tbl_hike_price')->select('*')->get();
    	return $res;
    }

  public function GethikeDetail($id){
  	$res = DB::table('tbl_hike_price')->select('*')->get();
  	return $res;

  }

   public function AddHikePrice($data = array()){
   	if($data['id'] !=''){
      DB::table('tbl_hike_price')->where('id', $data['id'])->update($data);
	    return $data['id'];
    }else{

    	return HikeModel::insertGetId($data);
    }


   }

   public function DeleteHikePrice($id){
   	DB::table('tbl_hike_price')->where('id', '=', $id)->delete();
   	return true;

   }

    
//////// End Class////////
}
