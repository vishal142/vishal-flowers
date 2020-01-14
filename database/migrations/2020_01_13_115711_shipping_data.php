<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class ShippingData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('tbl_shipping')->insert([
            ['receiver_name'=>'Vishal Gupta',
             'receiver_address'=>'Bengal Eco Intelligent Park,EM Block,Unit-16,15th Floor,Sector-5',
             'receiver_mobile'=>'7501553047',
             'email'=>'vishal143.niit@gmail.com',
             'zip_code'=>'700091',
             'country_name'=>'india',
             'state_name'=>'West Bengal',
             'location_type'=>'office',
             'message_on_card'=>'Happy Birth day Bro',
             'signature'=>'Vishal Gupta',
             'created_at'=>date('Y-m-d H:i:s'),
             'updated_at'=>date('Y-m-d H:i:s')
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
