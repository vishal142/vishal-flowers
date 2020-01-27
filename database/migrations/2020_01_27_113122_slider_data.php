<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SliderData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('tbl_slider')->insert([
            [
                'name'=>'Vishal-Slider',
                'image'=>'1.jpg',
                'created_at'=>date('Y-m-d H:i:s')
            ],
            [
                'name'=>'Vishal-Slider',
                'image'=>'2.jpg',
                'created_at'=>date('Y-m-d H:i:s')
            ],
            [
                'name'=>'Vishal-Slider',
                'image'=>'3.jpg',
                'created_at'=>date('Y-m-d H:i:s')
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
