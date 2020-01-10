<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Log;
use Session;
use Illuminate\Support\Facades\DB;

class ItemModel extends Model
{
    protected $fillable = ['*'];
    protected $table = 'tbl_item';

 public function GetAllItem(){
 	return DB::table('tbl_item')->select('*')->get();

 }

 public function ItemDetail($id){
 	if($id !=''){
 		
 		return DB::table('tbl_item')->select('*')->where('id',$id)->get();

 	}else{
 		return NULL;
 	}

 }

	public function GetAllOccasionTpye(){
  	  return DB::table('tbl_sub_categoery')->select('*')->where('cat_id',5)->where('is_delete','1')->get();

  	}

  	public function AddItem($data = array()){
  		if($data['id']!=''){
  			DB::table('tbl_item')->where('id', $data['id'])->update($data);
	    	return $data['id'];

  		}else{
        $data['item_code']= substr(number_format(time() * mt_rand(0, 999999),0,'',''),0,6);
        return ItemModel::insertGetId($data);

  		}

  	}

///////// End Class /////////////    
}
