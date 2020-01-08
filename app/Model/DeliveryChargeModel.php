<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Log;
Use Session;

class DeliveryChargeModel extends Model
{
   	protected $fillable = ['*'];
    protected $table = 'tbl_delivery_charges';

        public function AddDeliveryCharge($data = array()){
        if($data['id'] !=''){
          DB::table('tbl_delivery_charges')->where('id', $data['id'])->update($data);
            return $data['id'];
        }else{

            return DeliveryChargeModel::insertGetId($data);
        }
    }
}
