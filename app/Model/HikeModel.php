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

    
//////// End Class////////
}
