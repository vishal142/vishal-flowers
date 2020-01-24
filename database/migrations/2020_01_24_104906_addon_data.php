<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddonData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('tbl_addon')->insert([
            [
                'addon_name'=>'Chocolate Basket',
                'addon_price'=>'16.20',
                'image'=>'1.jpg',
                'created_at'=>date('Y-m-d H:i:s'),
            ],
            [
                'addon_name'=>'Dairy Milk Silk',
                'addon_price'=>'8.20',
                'image'=>'2.jpg',
                'created_at'=>date('Y-m-d H:i:s'),
            ],
            [
                'addon_name'=>'24 Inches Teddy',
                'addon_price'=>'6.20',
                'image'=>'3.jpg',
                'created_at'=>date('Y-m-d H:i:s'),
            ],
            [
                'addon_name'=>'2 Ft Teddy Bear (60 cm)',
                'addon_price'=>'7.50',
                'image'=>'4.jpg',
                'created_at'=>date('Y-m-d H:i:s'),
            ],
            [
                'addon_name'=>'Hershey',
                'addon_price'=>'9.20',
                'image'=>'5.jpg',
                'created_at'=>date('Y-m-d H:i:s'),
            ],
            [
                'addon_name'=>'Small Teddy Bear',
                'addon_price'=>'3.60',
                'image'=>'6.jpg',
                'created_at'=>date('Y-m-d H:i:s'),
            ],
            [
                'addon_name'=>'Snickers Chocolate',
                'addon_price'=>'10',
                'image'=>'7.jpg',
                'created_at'=>date('Y-m-d H:i:s'),
            ],
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
