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

///////// End Class /////////////    
}
