<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CtrateSenderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('tbl_sender')){
            Schema::create('tbl_sender',function (Blueprint $table){
                $table->bigIncrements('id');
                $table->string('sender_name');
                $table->text('sender_address');
                $table->string('state_name')->nullable();
                $table->string('city_name')->nullable();
                $table->string('country')->nullable();
                $table->string('gstin')->nullable();
                $table->string('phone_no')->nullable();
                $table->string('email_id')->nullable();
                $table->timestamps();
                $table->chrset='utf8';
                $table->collection = 'utf8_unicode_ci';
                $table->engine = 'InnoDB';
            });


            DB::table('tbl_sender')->insert([
                [
                    'sender_name'=>'Brijesh Tiwari',
                    'sender_address'=>'Asansol',
                    'state_name'=>'West Bengal',
                    'city_name'=>'Asansol',
                    'country'=>'india',
                    'gstin'=>'343434343',
                    'phone_no'=>'9851438800',
                    'email_id'=>'brijesh@gmail.com',
                    'created_at'=>date('Y-m-d'),
                    'updated_at'=>date('Y-m-d'),
                ]
            ]);

        }
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_sender');
        
    }
}
