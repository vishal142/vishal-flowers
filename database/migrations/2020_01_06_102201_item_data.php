<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ItemData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::table('tbl_item')->insert([
        ['category_id'=>'1','sub_cat_id'=>'1','item_name'=>'Simple Beauty','item_price'=>'16.70','secial_price'=>'15','item_code'=>'787987','item_image'=>'1.jpg','description'=>'This classic hand-tied bouquet of 6 fresh long-stemmed red roses wrapped in lush greenery makes a simple and elegant statement and is a must for the rose lover. Why not send these quality blooms to a deserving someone today bunch of 6 Red Roses with Gypsophelia & Net Packing','item_slug'=>'simple-beauty-1','stock'=>20,'double_the_quantity_price'=>'30','double_qty_description'=>'Bunch of 12 Red Roses Net Packing','shown_short_description'=>'Bunch of 6 Red Roses Net Packing','upgrade_option_price'=>'10','upgrade_option_description'=>'Upgrade Option Description Coming Soon..!!','meta_tilte'=>'Meta Description Coming Soon...!!!','meta_description'=>'Meta Description Coming Soon...!!!','sequence_order'=>'1','occasion_type'=>'19,26,27','user_id'=>'1','created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
        ['category_id'=>'2','sub_cat_id'=>'4','item_name'=>'Viberant Love','item_price'=>'17.50','secial_price'=>'0','item_code'=>'145519','item_image'=>'2.jpg','description'=>'This classic hand-tied bouquet of 12 fresh long-stemmed red roses wrapped in lush greenery makes a simple and elegant statement and is a must for the rose lover. Why not send these quality blooms to a deserving someone today bunch of 12 Red Roses with Gypsophelia & Net Packing','item_slug'=>'viberant-love-2','stock'=>'15','double_the_quantity_price'=>'30','double_qty_description'=>'Double Content Coming Soon...!!!','shown_short_description'=>'Single Content Coming Soon...!','upgrade_option_price'=>'10','upgrade_option_description'=>'Upgrade Option Description Coming Soon..!!','meta_tilte'=>'Meta Description Coming Soon...!!!','meta_description'=>'Meta Description Coming Soon...!!!','sequence_order'=>'2','occasion_type'=>'20,21,23,27','user_id'=>'1','created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
        ['category_id'=>'1','sub_cat_id'=>'1','item_name'=>'Perfect Love','item_price'=>'26.60','secial_price'=>'0','item_code'=>'141622','item_image'=>'3.jpg','description'=>'A splendid arrangement of 1 dozen mixed colored roses. Blooming gift for your loved one.','item_slug'=>'perfect-love-3','stock'=>'15','double_the_quantity_price'=>'50','double_qty_description'=>'Double Content Coming Soon...!!!','shown_short_description'=>'Single Content Coming Soon...!','upgrade_option_price'=>'10','upgrade_option_description'=>'Upgrade Option Description Coming Soon..!!','meta_tilte'=>'Meta Description Coming Soon...!!!','meta_description'=>'Meta Description Coming Soon...!!!','sequence_order'=>'3','occasion_type'=>'21,25,26','user_id'=>'1','created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],

        ['category_id'=>'1','sub_cat_id'=>'1','item_name'=>'Only Love','item_price'=>'15.23','secial_price'=>'0','item_code'=>'145824','item_image'=>'4.jpg','description'=>'Sometimes love is simple. With this gift, it can be elegant and beautiful as well. Send this 1 stem Ecuadorian roses to the one who stands out in your life. This single red rose is arranged with eucalyptus, fern, and ophiopogon grass.','item_slug'=>'only-love-4','stock'=>'15','double_the_quantity_price'=>'26','double_qty_description'=>'Double Content Coming Soon...!!!','shown_short_description'=>'Single Content Coming Soon...!','upgrade_option_price'=>'10','upgrade_option_description'=>'Upgrade Option Description Coming Soon..!!','meta_tilte'=>'Meta Description Coming Soon...!!!','meta_description'=>'Meta Description Coming Soon...!!!','sequence_order'=>'4','occasion_type'=>'19,20,21,22,23,24,25,26','user_id'=>'1','created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],

        ['category_id'=>'1','sub_cat_id'=>'2','item_name'=>'Birds Of Paradise','item_price'=>'110','secial_price'=>'0','item_code'=>'146257','item_image'=>'5.jpg','description'=>'Content Coming Soon...!','item_slug'=>'birds-of-paradise-5','stock'=>'15','double_the_quantity_price'=>'200','double_qty_description'=>'Double Content Coming Soon...!!!','shown_short_description'=>'Single Content Coming Soon...!','upgrade_option_price'=>'10','upgrade_option_description'=>'Upgrade Option Description Coming Soon..!!','meta_tilte'=>'Meta Description Coming Soon...!!!','meta_description'=>'Meta Description Coming Soon...!!!','sequence_order'=>'5','occasion_type'=>'19,21,22,23,24,26','user_id'=>'1','created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
        ['category_id'=>'1','sub_cat_id'=>'2','item_name'=>'Gracious Lily','item_price'=>'60','secial_price'=>'0','item_code'=>'619612','item_image'=>'6.jpg','description'=>'Content Coming Soon...!','item_slug'=>'gracious-lily-6','stock'=>'20','double_the_quantity_price'=>'110','double_qty_description'=>'Double Content Coming Soon...!!!','shown_short_description'=>'Single Content Coming Soon...!','upgrade_option_price'=>'10','upgrade_option_description'=>'Upgrade Option Description Coming Soon..!!','meta_tilte'=>'Meta Description Coming Soon...!!!','meta_description'=>'Meta Description Coming Soon...!!!','sequence_order'=>'6','occasion_type'=>'19,20,21,24,25,26,27','user_id'=>'1','created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],

        ['category_id'=>'7','sub_cat_id'=>'33','item_name'=>'Chocolate flavor','item_price'=>'45','secial_price'=>'0','item_code'=>'649655','item_image'=>'7.jpg','description'=>'Content Coming Soon...!','item_slug'=>'gracious-lily-6','stock'=>'20','double_the_quantity_price'=>'85','double_qty_description'=>'Double Content Coming Soon...!!!','shown_short_description'=>'Single Content Coming Soon...!','upgrade_option_price'=>'10','upgrade_option_description'=>'Upgrade Option Description Coming Soon..!!','meta_tilte'=>'Meta Description Coming Soon...!!!','meta_description'=>'Meta Description Coming Soon...!!!','sequence_order'=>'7','occasion_type'=>'19,20,22,25','user_id'=>'1','created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
        ['category_id'=>'7','sub_cat_id'=>'34','item_name'=>'Anniversary Cakes','item_price'=>'80','secial_price'=>'0','item_code'=>'127188','item_image'=>'8.jpg','description'=>'Content Coming Soon...!','item_slug'=>'anniversary-cakes-8','stock'=>'20','double_the_quantity_price'=>'170','double_qty_description'=>'Double Content Coming Soon...!!!','shown_short_description'=>'Single Content Coming Soon...!','upgrade_option_price'=>'10','upgrade_option_description'=>'Upgrade Option Description Coming Soon..!!','meta_tilte'=>'Meta Description Coming Soon...!!!','meta_description'=>'Meta Description Coming Soon...!!!','sequence_order'=>'8','occasion_type'=>'20','user_id'=>'1','created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],
        ['category_id'=>'7','sub_cat_id'=>'35','item_name'=>'Dedication Cake','item_price'=>'35','secial_price'=>'0','item_code'=>'413581','item_image'=>'9.jpg','description'=>'Content Coming Soon...!','item_slug'=>'dedication-cake-9','stock'=>'20','double_the_quantity_price'=>'65','double_qty_description'=>'Double Content Coming Soon...!!!','shown_short_description'=>'Single Content Coming Soon...!','upgrade_option_price'=>'10','upgrade_option_description'=>'Upgrade Option Description Coming Soon..!!','meta_tilte'=>'Meta Description Coming Soon...!!!','meta_description'=>'Meta Description Coming Soon...!!!','sequence_order'=>'9','occasion_type'=>'19,20,24,25,26,27','user_id'=>'1','created_at'=>date('Y-m-d H:i:s'),'updated_at'=>date('Y-m-d H:i:s')],

       ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        
    }
}
