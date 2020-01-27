<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SliderTableCreate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('tbl_slider')){
            Schema::create('tbl_slider', function (Blueprint $table){
                $table->bigIncrements('id');
                $table->string('name');
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
         Schema::dropIfExists('tbl_slider');
    }
}
