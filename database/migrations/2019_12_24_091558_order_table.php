<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
public function up()
    {
        if(!Schema::hasTable('tbl_order')){
            Schema::create('tbl_order',function(Blueprint $table){
                $table->bigIncrements('id');
                $table->string('payment_id')->nullable();
                $table->string('txn_id')->nullable();
                $table->string('currency_code')->nullable();
                $table->bigInteger('oder_no');
                $table->string('invoice_no');
                $table->Integer('user_id');
                $table->dateTime('delivery_date');
                $table->bigInteger('city_id');
                $table->bigInteger('delivery_charged_id')->comment('tbl_delivery_charges');
                $table->bigInteger('shipping_id')->comment('tbl_shipping,Receiver Detail');
                $table->Integer('sender_id')->nullable();
                $table->enum('payment_mode',['cod','online'])->default('online');
                $table->string('coupon')->nullable();
                $table->decimal('discount_amount',15,2);
                $table->decimal('order_amount',15,2);
                $table->enum('order_status',['pending','confirm','canceled','delivered','payment_due'])->default('payment_due');
                $table->string('payment_method_name');
                $table->enum('payment_status',['received','not_received'])->default('not_received');
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
        Schema::drop('tbl_order');
    }
}
