<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class OrderDetaildata extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('tbl_order_detail')->insert([
            [
                'order_id'=>'1',
                'category_id'=>'1',
                'sub_cat_id'=>'1',
                'item_id'=>'1',
                'city_id'=>'1',
                'item_name'=>'Simple Beauty',
                'quantity'=>'1',
                'item_price'=>'16.70',
                'sub_total_amount'=>'16.70',
                'qty_type'=>'double',
                'qty_type_description'=>'6 Pcs Red Rose',
                'glass_vase'=>'without',
                'order_date_time'=>date('Y-m-d', strtotime('+5 days')),
                'created_at'=>date('Y-m-d H:i:s'),
                'updated_at'=>date('Y-m-d H:i:s'),
            ],
            [
                'order_id'=>'1',
                'category_id'=>'0',
                'sub_cat_id'=>'0',
                'item_id'=>'0',
                'city_id'=>'0',
                'item_name'=>'delivery charge',
                'quantity'=>'1',
                'item_price'=>'10.00',
                'sub_total_amount'=>'10.00',
                'qty_type'=>'double',
                'qty_type_description'=>'Coming Soon..!!!',
                'glass_vase'=>'without',
                'order_date_time'=>date('Y-m-d H:i:s', strtotime('+5 days')),
                'created_at'=>date('Y-m-d H:i:s'),
                'updated_at'=>date('Y-m-d H:i:s'),
            ]
        ]);
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
