<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SubCategoryData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         DB::table('tbl_sub_categoery')->insert([
            ['cat_id'=>'1','slug'=>'rose-india','sub_cat_name'=>'Rose','description'=>'Rose Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'1','slug'=>'lilies-india','sub_cat_name'=>'Lilies','description'=>'Lilies Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'1','slug'=>'gerberas-india','sub_cat_name'=>'Gerberas','description'=>'Gerberas Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'2','slug'=>'hand-bouquet-india','sub_cat_name'=>'Hand Bouquet','description'=>'Hand Bouquet Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'2','slug'=>'flowers-in-glass-vase-india','sub_cat_name'=>'Flowers In Glass Vase','description'=>'Flowers In Glass Vase Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'1','slug'=>'tulips-india','sub_cat_name'=>'Tulips In Glass Vase','description'=>'Tulips Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'1','slug'=>'red-flowers-india','sub_cat_name'=>'Red Flowers','description'=>'Red Flowers Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'1','slug'=>'white-flowers-india','sub_cat_name'=>'White Flowers','description'=>'White Flowers Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'1','slug'=>'pink-flowers-india','sub_cat_name'=>'Pink Flowers','description'=>'Pink Flowers Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'1','slug'=>'custom-roses-india','sub_cat_name'=>'Custom Roses','description'=>'Custom Roses Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'1','slug'=>'red-flowers-india','sub_cat_name'=>'Red Flowers','description'=>'Red Flowers Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'1','slug'=>'Low-cost-bouquets-india','sub_cat_name'=>'Low Cost Bouquets','description'=>'Low Cost Bouquets Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'2','slug'=>'flowers-in-a-basket-india','sub_cat_name'=>'Flowers in a Basket','description'=>'Flowers in a Basket Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'2','slug'=>'flowers-in-a-box-india','sub_cat_name'=>'Flowers in a Box','description'=>'Flowers in a Basket Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'2','slug'=>'flower-stand-india','sub_cat_name'=>'Flower Stand','description'=>'Flower Stand Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'2','slug'=>'flower-boards-india','sub_cat_name'=>'Flower Boards','description'=>'Flower Boards Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'3','slug'=>'flowers-and-chocolates-india','sub_cat_name'=>'Flowers and Chocolates','description'=>'Flowers and Chocolates Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'4','slug'=>'Lucky-bamboo-plants-india','sub_cat_name'=>'Lucky Bamboo Plants','description'=>'Lucky Bamboo Plants Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],



            ['cat_id'=>'5','slug'=>'birthday-india','sub_cat_name'=>'Birthday','description'=>' Birthday Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'5','slug'=>'anniversary-india','sub_cat_name'=>'Anniversary','description'=>'Anniversary Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'5','slug'=>'symphaty-india','sub_cat_name'=>'Symphaty','description'=>'Symphaty Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'5','slug'=>'corporate-india','sub_cat_name'=>'Corporate','description'=>'Corporate Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'5','slug'=>'get-well-soon-india','sub_cat_name'=>'Get Well Soon','description'=>'Get Well Soon Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'5','slug'=>'congratulation-india','sub_cat_name'=>'Congratulation','description'=>'Congratulation Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'5','slug'=>'romance-india','sub_cat_name'=>'Romance','description'=>'Romance Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'5','slug'=>'sorry-india','sub_cat_name'=>'Sorry','description'=>'Sorry Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'5','slug'=>'halloween-india','sub_cat_name'=>'Halloween','description'=>'Halloween Content Coming soon...!!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'6','slug'=>'gifts-for-new-born-india','sub_cat_name'=>'Gifts For New Born','description'=>'Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'6','slug'=>'fruit-baskets-india','sub_cat_name'=>'Fruit Baskets','description'=>'Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'6','slug'=>'chocolates-india','sub_cat_name'=>'Chocolates','description'=>'Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'6','slug'=>'tedy-bears-india','sub_cat_name'=>'Tedy Bears','description'=>'Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'6','slug'=>'hampers-india','sub_cat_name'=>'Hampers','description'=>'Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'7','slug'=>'chocolate-cakes-india','sub_cat_name'=>'Chocolate Cakes','description'=>'Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
            ['cat_id'=>'7','slug'=>'anniversary-cakes-india','sub_cat_name'=>'Anniversary Cakes','description'=>'Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

            ['cat_id'=>'7','slug'=>'birthday-cakes-india','sub_cat_name'=>'Birthday Cakes','description'=>'Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],
             ['cat_id'=>'7','slug'=>'designer-cakes-india','sub_cat_name'=>'Designer Cakes','description'=>'Content Coming Soon..!!','user_id'=>'1','created_at'=>date('Y-m-d'),'updated_at'=>date('Y-m-d')],

        ]);


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::drop('tbl_sub_categoery');
    }
}
