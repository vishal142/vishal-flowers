<?php

namespace App\Model;
use Log;
use Session;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CategoryModel extends Model
{
	protected $fillable = ['*']; 
	protected $table = 'tbl_category';
    public $timestamps = false;
    
    public function GetAllCategory(){
    	$res = DB::table('tbl_category')->select('*')->get();
    	return $res;

    }

   public function CategoryDetail($cat_id=''){
   	if($cat_id !=''){
   	$res = DB::table('tbl_category')->select('*')->where('id',$cat_id)->get();
   	return $res;
   }else{
   	return false;
   }

   }

   public function AddCategoery($data = array()){
   	if($data['id'] !=''){
      DB::table('tbl_category')->where('id', $data['id'])->update($data);
	    return $data['id'];
    }else{

    	return CategoryModel::insertGetId([
    		'category_name'=>$data['category_name'],
    		'description'=>$data['description'],
    		'user_id'=>$data['user_id'],
    		'created_at'=>date('Y-m-d H:i:s'),
    		'updated_at'=>date('Y-m-d H:i:s')
    	]);
    }


   }
}
