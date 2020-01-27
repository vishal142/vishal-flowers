<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Log;
use Session;
class SliderModel extends Model
{
    protected $fillable = ['*'];
    protected $table = 'tbl_slider';

    public function GetAllSlider(){
    	return DB::table('tbl_slider')->select('*')->orderBy('id','DESC')->get();
    }

    public function SliderDetail($id){
    	return DB::table('tbl_slider')->select('*')->where('id',$id)->get();

    }

    public function AddSlider($data = array()){
    	if($data['id'] !=''){
    	  $data['updated_at'] = date('Y-m-d H:i:s');
    	  DB::table('tbl_slider')->where('id',$data['id'])->update($data);
    	  return $data['id'];

    	}else{
    		$data['created_at'] = date('Y-m-d H:i:s');
    		return SliderModel::insertGetId($data);
    	}

    }

    public function DeleteSlider($id){
    	DB::table('tbl_slider')->where('id','=',$id)->delete();
    	return true;

    }
}
