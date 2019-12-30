<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OrderDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('tbl_order_detail')){
            Schema::create('tbl_order_detail',function(Blueprint $table){
                $table->bigIncrements('id');
                $table->bigInteger('order_id');
                $table->bigInteger('category_id');
                $table->bigInteger('sub_cat_id');
                $table->bigInteger('item_id');
                $table->bigInteger('city_id');
                $table->string('item_name');
                $table->Integer('quantity');
                $table->decimal('item_price',15,2);
                $table->decimal('sub_total_amount',15,2);
                $table->enum('qty_type',['single','double'])->default('single');
                $table->text('qty_type_description');
                $table->enum('glass_vase',['with','without'])->default('without');
                $table->dateTime('order_date_time');
                $table->timestamps();
                $table->charset = 'utf8';
                $table->collation = 'utf8_unicode_ci';
                $table->engine = 'InnoDB';

            });


        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tbl_order_detail');
    }
}
