<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StateData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('tbl_state')->insert([
            ['short_name'=>'AP','state_name'=>'Arunachal Pradesh','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'AS','state_name'=>'Assam','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['short_name'=>'BR','state_name'=>'Bihar','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['short_name'=>'CT','state_name'=>'Chhattisgarh','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'GA','state_name'=>'Goa','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'GJ','state_name'=>'Gujarat','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'HR','state_name'=>'Haryana','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'HP','state_name'=>'Himachal Pradesh','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'JK','state_name'=>'Jammu and Kashmir','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'JH','state_name'=>'Jharkhand','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'KA','state_name'=>'Karnataka','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'KL','state_name'=>'Kerala','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'MP','state_name'=>'Madhya Pradesh','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'MH','state_name'=>'Maharashtra','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'MN','state_name'=>'Manipur','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'ML','state_name'=>'Meghalaya','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'MZ','state_name'=>'Mizoram','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'NL','state_name'=>'Nagaland','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'OR','state_name'=>'Odisha','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'PB','state_name'=>'Punjab','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['short_name'=>'RJ','state_name'=>'Rajasthan','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'SK','state_name'=>'Sikkim','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'TN','state_name'=>'Tamil Nadu','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'TG','state_name'=>'Telangana','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'TR','state_name'=>'Tripura','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'UP','state_name'=>'Uttar Pradesh','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'UT','state_name'=>'Uttarakhand','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'WB','state_name'=>'West Bengal','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'AN','state_name'=>'Andaman and Nicobar Islands','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'CH','state_name'=>'Chandigarh','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'DN','state_name'=>'Dadra and Nagar Haveli','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'DD','state_name'=>'Daman and Diu','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'LD','state_name'=>'Lakshadweep','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'DL','state_name'=>'National Capital Territory of Delhi','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['short_name'=>'PY','state_name'=>'Puducherry','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
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
