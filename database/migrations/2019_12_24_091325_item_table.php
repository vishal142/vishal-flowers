<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
 public function up()
    {
        if(!Schema::hasTable('tbl_item')){
            Schema::create('tbl_item',function(Blueprint $table){
                $table->bigIncrements('id');
                $table->bigInteger('category_id');
                $table->bigInteger('sub_cat_id');
                $table->string('item_name');
                $table->decimal('item_price',15,2);
                $table->decimal('secial_price',15,2);
                $table->Integer('price_percentage')->nullable();
                $table->enum('price_percentage_variant',['High','Low'])->nullable();
                $table->string('item_code');
                $table->Integer('packs_slot')->default(1);
                $table->string('item_image')->nullable();
                $table->text('description');
                $table->string('item_slug')->nullable();
                $table->bigInteger('stock');
                $table->double('double_the_quantity_price',15,2);
                $table->text('double_qty_description');
                $table->text('shown_short_description');
                $table->double('upgrade_option_price');
                $table->text('upgrade_option_description');
                $table->text('meta_tilte');
                $table->text('meta_description');
                $table->Integer('sequence_order');
                $table->string('occasion_type');
                $table->Integer('user_id');
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
        Schema::drop('tbl_item');
    }
}
