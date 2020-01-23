<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardMessageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_card_message', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('short_name');
            $table->text('description');
            $table->enum('status',['Active','Inactive'])->default('Active');
            $table->Integer('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_card_message');
    }
}
