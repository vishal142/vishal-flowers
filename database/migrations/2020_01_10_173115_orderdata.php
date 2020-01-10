<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class Orderdata extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('tbl_order')->insert([
            ['oder_no'=>'FR-8325208052019182117','invoice_no'=>'VG-000001','user_id'=>'1','delivery_date'=>date('Y-m-d', strtotime('+5 days')),'city_id'=>'588','delivery_charged_id'=>'1',
            'shipping_id'=>'1','sender_id'=>'1','discount_amount'=>'0','order_amount'=>'26.70','order_status'=>'pending','payment_method_name'=>'paypal','payment_status'=>'received','order_date_time'=>date('Y-m-d H:i:s')]

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
