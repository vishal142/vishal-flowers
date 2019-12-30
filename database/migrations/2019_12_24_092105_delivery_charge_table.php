<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DeliveryChargeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    
    public function up()
    {
        if(!Schema::hasTable('tbl_delivery_charges')){
            Schema::create('tbl_delivery_charges',function(Blueprint $table){
                $table->bigIncrements('id');
                $table->bigInteger('city_id');
                $table->time('from_time');
                $table->time('to_time');
                $table->double('delivert_charge',15,2);
                $table->enum('delivery_status',['Active','Inactive'])->default('Active');
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
        Schema::drop('tbl_delivery_charges');
    }
}
