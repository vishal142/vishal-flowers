<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('tbl_state')){
            Schema::create('tbl_state', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('short_name');
                $table->string('state_name');
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
        Schema::dropIfExists('tbl_state');
    }
}
