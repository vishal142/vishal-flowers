<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TableAddon extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('tbl_addon')){
            Schema::create('tbl_addon',function (Blueprint $table){
                $table->bigIncrements('id');
                $table->string('addon_name');
                $table->double('addon_price',15,2);
                $table->string('image')->nullable();
                $table->enum('status',['Active','Inactive'])->default('Active');
                $table->timestamps();
                $table->chrset = 'utf8';
                $table->collection = 'utf8_unicode_ci';
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
        Schema::dropIfExists('tbl_addon');
    }
}
