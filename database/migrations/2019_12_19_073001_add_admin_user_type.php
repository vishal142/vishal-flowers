<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddAdminUserType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('UPDATE `users` SET `user_type` = "Admin" WHERE `id` = 1');

       DB::statement('ALTER TABLE `users` ADD `full_name` VARCHAR(250) NULL AFTER `user_type`');
      DB::statement('UPDATE `users` SET `full_name` = "Vishal Gupta" WHERE `id` = 1');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
