<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class HikePriceDate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('tbl_hike_price')->insert([
            ['title'=>'Valentine day','hike_value'=>'30','start_date'=>date('Y-m-d', strtotime('+4 days')),'end_date'=>date('Y-m-d', strtotime('+4 days 23:59:59')),'created_at'=>date('Y-m-d H:i:s')]
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
