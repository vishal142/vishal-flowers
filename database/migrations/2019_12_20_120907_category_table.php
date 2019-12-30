<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       if (!Schema::hasTable('category_slug'))
        {
                Schema::create('tbl_category', function (Blueprint $table) {
                    $table->bigIncrements('id');
                    $table->string('category_slug',250)->nullable();
                    $table->string('category_name',250);
                    $table->string('description',250);
                    $table->enum('status',['Active','Inactive'])->default('Active');
                    $table->string('user_id',10);
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
     Schema::dropIfExists('tbl_category');
    }
}
