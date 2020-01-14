<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblShipping extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_shipping', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('receiver_name');
            $table->text('receiver_address');
            $table->string('receiver_mobile');
            $table->string('email');
            $table->string('zip_code')->nullable();
            $table->string('country_name')->nullable();
            $table->string('state_name')->nullable();
            $table->enum('location_type',['Office','Home','Hospital','School','Other'])->nullable();
            $table->text('message_on_card');
            $table->string('signature')->nullable();
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
        Schema::dropIfExists('tbl_shipping');
    }
}
