<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\facades\DB;
use Log;
use Seesion;

class AddonModel extends Model
{
    protected $fillable = ['*'];
    protected $table = 'tbl_addon';

    public function GetAllAddonItem(){
    	return AddonModel::all();
    }

    public function AddonDetail($id){
    	return DB::table('tbl_addon')->select('*')->where('id',$id)->get();

    }

    public function AddonItem($data){
    	if($data['id'] !=''){
    		$data['updated_at'] = date('Y-m-d H:i:s');
    		DB::table('tbl_addon')->where('id',$data['id'])->update($data);
    		return $data['id'];


    	}else{
    		  $data['created_at'] = date('Y-m-d H:i:s');
    		return AddonModel::insertGetId($data);


    	}

    }

    public function DeleteAddonItem($id){
    	return AddonModel::where('id',$id)->delete();

    }

}
