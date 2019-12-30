<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Model\AdminLoginModel;

class AdminData extends Migration
{
    protected $AdminLoginModel;
    public function __construct()
    {
        //$this->middleware('auth');
        $this->AdminLoginModel = new AdminLoginModel();
    }

    public function up()
    {
        $data = array(
            'email'=>'admin@gmail.com',
            'password'=>'123456',
            'first_name'=>'Vishal',
            'last_name'=>'Gupta',
            'user_type'=>'Superadmin'
            
        );

        $this->AdminLoginModel->registerUser($data);
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
