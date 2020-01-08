<?php

namespace App\Model;
use Log;
use Session;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class CityModel extends Model
{
    protected $fillable = ['*'];
    protected $table = 'tbl_city';


    public function GetAllCity(){
    	$res = DB::table('tbl_city')->select('*')->get();
    	return $res;
    }

    public function CityDetail($city_id){

    	$res = DB::table('tbl_city')->select('*')->where('id',$city_id)->get();
    	return $res;

    }

    public function getAllState(){
    	$res = DB::table('tbl_state')->select('*')->get();
    	return $res;
    }

    public function Addcity($data = array()){
   	if($data['id'] !=''){
      DB::table('tbl_city')->where('id', $data['id'])->update($data);
	    return $data['id'];
    }else{

    	return CityModel::insertGetId($data);
    }


   }



}
