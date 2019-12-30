<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('tbl_city')){
            Schema::create('tbl_city',function(Blueprint $table){
                $table->bigIncrements('id');
                $table->string('city_name');
                $table->enum('midnight_delivery',['Yes','No'])->default('No');
                $table->enum('delivery_frequency',['same_day','next_day','day_after'])->default('same_day');
                $table->enum('status',['Active','Inactive'])->default('Active');
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
        Schema::drop('tbl_city');
    }
}
