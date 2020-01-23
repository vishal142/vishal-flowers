<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CardData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $tbl_card_message = array(
  array('id' => '1','short_name' => 'Birthday: To a special person','description' => 'Happy birthday to a marvellous and special person. May your life be filled with beauty and laughter, today and every day.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '2','short_name' => 'Birthday: A special place in my heart','description' => 'You have a special place in my life and my heart, and I hope your birthday is every bit as wonderful as you are.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '3','short_name' => 'Birthday: Celebrate','description' => 'May this be your best birthday ever and the start of a fabulous year ahead. Enjoy and celebrate!','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '4','short_name' => 'Birthday: Birthday wishes','description' => 'May every pleasure in life come your way, today and every day. Have a fantastic birthday.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '5','short_name' => 'Anniversary: Happiness always','description' => 'May the love you found together live on and grow stronger year after year. Wishing you joy and happiness always.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '6','short_name' => 'Anniversary: Happiness always (spouse)','description' => 'The love we found together has grown stronger year after year. Happy anniversary and love always.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '7','short_name' => 'Anniversary: Sharing and caring','description' => 'The love, hopes and dreams you share are the ties that will bind you ever closer. Congratulations and best wishes on your 

anniversary.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '8','short_name' => 'Anniversary: Sharing and caring (spouse)','description' => 'The love, hopes and dreams we share are the ties that bind us ever closer. Happy anniversary to my partner, my 

love.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '9','short_name' => 'Love: A wonderful gift','description' => 'Your love is the most wonderful gift I?ve ever received. Thank you for being you.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '10','short_name' => 'Love: Now and forever','description' => 'You bring joy and happiness to my life. I love you deeply, now and forever.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '11','short_name' => 'Love: Brighter and more beautiful','description' => 'The world is shinier and brighter with you in it, and my life is more beautiful with your love.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '12','short_name' => 'Love: You fill my life','description' => 'How did I ever live without you? You have filled my life with your presence, and I love you with my entire being.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '13','short_name' => 'Love: A dream come true','description' => 'You?re a dream come true, everything I?ve ever wished for. You will always be in my heart.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '14','short_name' => 'Love: Always on my mind','description' => 'My day is filled with thoughts of you. You are always on my mind and in my heart.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '15','short_name' => 'Love: You are my joy','description' => 'You fill my life with joy and warmth. I love you more than words can express.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '16','short_name' => 'Love: Closer every day','description' => 'Side by side, hand in glove, we grow closer every day. Thank you for the love you have brought into my life.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '17','short_name' => 'Love: Love of my life','description' => 'You are the love of my life and the sunshine in my world.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '18','short_name' => 'Love: Everything seems new','description' => 'I love the way you make me feel, the way everything in life seems new. I love YOU!','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '19','short_name' => 'Love: Deeper and stronger','description' => 'My love for you grows deeper and stronger with every passing day. I thank God for bringing you into my life.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '20','short_name' => 'Love: You are everything to me','description' => 'The love in your eyes is a reflection of the feeling in my heart. You are everything to me.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '21','short_name' => 'Funeral: Condolences (male deceased)','description' => 'He will live on in our hearts and memories forever. Condolences on your loss.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '22','short_name' => 'Funeral: Condolences (female deceased)','description' => 'She will live on in our hearts and memories forever. Condolences on your loss.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '23','short_name' => 'Funeral: God bless you','description' => 'May God bless you in your sorrow and bring you comfort.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '24','short_name' => 'Funeral: Fond memories','description' => 'Wishing you peace and healing. May your fond memories help you through your sorrow.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '25','short_name' => 'Mother: My mother, my friend','description' => 'I celebrate your love and the special friendship I enjoy with you. Happy Mother?s Day.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '26','short_name' => 'Mother: To the best mother','description' => 'If I had been given the chance to choose, I would still have chosen you from among all the mothers on earth.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '27','short_name' => 'Mother: You brighten my life','description' => 'You make the world a better place and my life warmer and brighter with your love and caring. Happy Mother?s Day.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '28','short_name' => 'Mother: A mother?s love','description' => 'No love can equal a mother?s love. Thank you for always being there for me.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '29','short_name' => 'New Baby: Babies are a blessing','description' => 'Babies bring joy, promise and sunshine. Congratulations on your new arrival.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '30','short_name' => 'New Baby: Cherish these moments','description' => 'Blessings on you and your baby. Enjoy and cherish every memory as it?s made.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '31','short_name' => 'New Baby: A gift from heaven','description' => 'May your home and hearts be filled with dreams, hopes and happiness. Congratulations on your new baby.','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:53:54'),
  array('id' => '32','short_name' => 'New Baby: The wonder of a new life','description' => 'Savour the wonder and magic of your new baby. May God bless your family, now and always','status' => 'Active','user_id' => '1','created_at' => '2019-12-06 18:44:30')
);
 DB::table('tbl_card_message')->insert($tbl_card_message);
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
