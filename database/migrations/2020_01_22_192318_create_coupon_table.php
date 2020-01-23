<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCouponTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_coupon', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('coupon_code');
            $table->enum('coupon_type',['percentage','flat'])->default('percentage');
            $table->Integer('coupon_value');
            $table->text('description');
            $table->Integer('user_id');
            $table->enum('status',['Active','Inactive'])->default('Active');
            $table->timestamps();
            $table->chrset='utf8';
            $table->collection = 'utf8_unicode_ci';
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_coupon');
    }
}
