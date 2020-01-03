<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CategoryData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        DB::table('tbl_category')->insert([
            ['category_slug'=>'flowers-india','category_name'=>'Flowers','description'=>'Flowers Content Coming Soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['category_slug'=>'flower-types-india','category_name'=>'Flower Types','description'=>'Flower Types Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['category_slug'=>'flower-combos-india','category_name'=>'Flower Combos','description'=>'Flower Combos Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['category_slug'=>'plants-india','category_name'=>'Plants','description'=>'Plants Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['category_slug'=>'occasion-india','category_name'=>'Occasion','description'=>'Occasion Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['category_slug'=>'gifts-india','category_name'=>'Gifts','description'=>'Gift Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['category_slug'=>'cakes-india','category_name'=>'Cakes','description'=>'Cakes Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],


            ]);
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
         Schema::drop('tbl_category');
    }
}
