<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CouponData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('tbl_coupon')->insert([
            [
                'coupon_code'=>'XXX',
                'coupon_type'=>'percentage',
                'coupon_value'=>'10',
                'description'=>'Content Coming Soon...!!!',
                'user_id'=>'1',
                'created_at'=>date('Y-m-d H:i:s'),
                'updated_at'=>date('Y-m-d H:i:s'),

            ],
            [
                'coupon_code'=>'C1',
                'coupon_type'=>'flat',
                'coupon_value'=>'20',
                'description'=>'Content Coming Soon...!!!',
                'user_id'=>'1',
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
        
    }
}
