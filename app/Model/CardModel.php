<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Log;
use Session;
class CardModel extends Model
{
    protected $fillable = ['*'];
    protected $table = 'tbl_card_message';

    public function GetAllCardMessage(){
    	return DB::table('tbl_card_message')->select('*')->orderBy('id', 'desc')->get();
    }

    public function CardDetail($id){
    	return DB::table('tbl_card_message')->select('*')->where('id',$id)->get();

    }

    public function AddCardMessage($data = array()){
    	if($data['id'] !=''){
    		$data['updated_at']= date('Y-m-d H:i:s');
			DB::table('tbl_card_message')->where('id', $data['id'])->update($data);
	    	return $data['id'];

    	}else{
    			$data['created_at']= date('Y-m-d H:i:s');
				return CardModel::insertGetId($data);

    	}

    }

    public function DeleteCardMessage($id){
    	return CardModel::where('id', $id)->delete();

    }
}
