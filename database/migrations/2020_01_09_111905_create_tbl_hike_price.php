<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblHikePrice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('tbl_hike_price')){
            Schema::create('tbl_hike_price', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->integer('hike_value');
            $table->enum('hike_varient',['High','Low'])->default('High');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
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
        Schema::dropIfExists('tbl_hike_price');
    }
}
