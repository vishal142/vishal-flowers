<?php
namespace App\Library;

use Illuminate\Support\Facades\URL;
use Log;
use Crypt;
use DB;
use Session;

class Helper
{
	public static function fooFormatText(string $string)
    {
        return strtoupper($string);
    }

    public static function GetCategoryName(int $id){
    	

    }


    static function perticularFlied($table,$fliedName,$where=array()){
    	return DB::table($table)->select($fliedName)->where($where)->get();
	}


	
}