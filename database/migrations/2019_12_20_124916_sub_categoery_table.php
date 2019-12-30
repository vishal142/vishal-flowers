<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SubCategoeryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('tbl_sub_categoery')){
            Schema::create('tbl_sub_categoery',function(Blueprint $table){
                $table->bigIncrements('id');
                $table->bigInteger('cat_id');
                $table->string('slug',250)->nullable();
                $table->char('sub_cat_name',250);
                $table->mediumText('description');
                $table->enum('is_delete',['0','1'])->default('1');
                $table->enum('status',['Active','Inactive'])->default('Active');
                $table->integer('user_id');
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
       Schema::dropifExists('tbl_sub_categoery');
    }
}
