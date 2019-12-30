<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;
use App\Model\AdminLoginModel;
use Illuminate\Support\Facades\Redirect;
use Log;
use Session;
use Cartalyst\Sentinel\Hashing\Sha256Hasher;
use Cartalyst\Sentinel\Users\EloquentUser as CartalystUser;
use App\Exceptions\ApplicationException;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;

class AdminLoginController extends Controller
{


	public function __construct()
    {
        //$this->middleware('auth');
        $this->AdminLoginModel = new AdminLoginModel();
    }
   

    public function index(){
   		return view('admin.adminLogin');
    }

    public function Dologin(Request $request){

    	$post['email'] = $request->username;
    	$post['password'] = $request->password;
    	$userData = $this->AdminLoginModel->checkLogin($post);
    	if($userData['check']){

    		#Get User Logined name
			$userName = DB::table('users')->select('full_name')->where('id',$userData['user_id'])->first();
			// This will help to slow notification/alert after logged in success in landing page
            $notification = array(
                'message' => 'Welcome Admin',
                'alert-type' => $userData['alert-type'],
                'user-name' => $userName,
            );

           /* $request->session()->put('currentUser', Sentinel::getUser());
            $request->session()->put('user_id',$userData['user_id']);*/

            Session([
            	'currentUser' => Sentinel::getUser(),
            	'user_id'=>$userData['user_id']
            ]);

            
            # Empty throttle table
            DB::table('throttle')->truncate();

            return Redirect::to('/admin/dashboard')->with($notification);


    	}else{
    		$notification = array(
                'message' => $userData['message'],
                'alert-type' => $userData['alert-type']
            );
            return Redirect::to('/admin')->with($notification);
    	}

    }

}
