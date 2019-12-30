<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('tbl_admin'))
        {
                Schema::create('tbl_admin', function (Blueprint $table) {
                    $table->bigIncrements('id');
                    $table->char('user_name',100);
                    $table->char('password',250);
                    $table->char('full_name',250);
                    $table->enum('status',['Active','Inactive'])->default('Active');
                    $table->timestamps();
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
        Schema::dropIfExists('tbl_admin');
    }
}
