<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Exceptions\ApplicationException;
use Log;
use Session;
class SubCategoryModel extends Model
{
	protected $fillable = ['*'];
	protected $table = 'tbl_sub_categoery';
    public $timestamps = false;

    public function GetAllSubCategory(){
    	$res = DB::table('tbl_sub_categoery')->select('*')
    	//->join('tbl_category','tbl_category.id','=','tbl_sub_categoery.cat_id')
    	->get();
    	return $res;
    }

    public function GetSubCategoryDetail($sub_cat_id){
    	$res = DB::table('tbl_sub_categoery')->select('*')->where('id',$sub_cat_id)->get();
    	return $res;

    }

       public function AddSubCategory($data = array()){
			   	if($data['id'] !=''){
			      DB::table('tbl_sub_categoery')->where('id', $data['id'])->update($data);
				    return $data['id'];
			    }else{

			    	return SubCategoryModel::insertGetId([
			    		'cat_id'=>$data['cat_id'],
			    		'sub_cat_name'=>$data['sub_cat_name'],
			    		'description'=>$data['description'],
			    		'user_id'=>$data['user_id'],
			    		'created_at'=>date('Y-m-d H:i:s'),
			    		'updated_at'=>date('Y-m-d H:i:s')
			    	]);
			    }
		}


}
