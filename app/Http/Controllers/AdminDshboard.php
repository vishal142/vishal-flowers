<?php

namespace App\Http\Controllers;
use Log;
use Session;
use App\Library\helper as Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use App\Model\AdminDashboardModel;
use Cartalyst\Sentinel\Hashing\Sha256Hasher;
use Cartalyst\Sentinel\Users\EloquentUser as CartalystUser;
class AdminDshboard extends Controller
{
	public function __construct(){
		$this->AdminDashboardModel = new AdminDashboardModel();

	}
	
    
    static function index(Request $request){
    	Log::info(__METHOD__ . "Session ==>", (array)Session::get('currentUser')->full_name);
        $name = Helpers::fooFormatText('vishal');
    	return view('admin.dashboard',['name'=>$name]);
    }

    public function logout(){
    	Sentinel::logout(null, true);
    	$notification = array(
                'message' => 'Logout Successfully',
                'alert-type' =>'success',
            );
    	return Redirect::to('/admin')->with($notification);
    }
    
    public function change_password(){
    	return view('admin.change_password');
    }

    public function DoChangePassword(Request $resquest){

    	$user_email = Session::get('currentUser')->email;
    	$user_oldpassword = Session::get('currentUser')->password;
    	
    	$credentials = ['login' => $user_email];
    	
    	Sentinel::getUser();
    	$resquest->old_password;
    	if($resquest->new_password == $resquest->confirm_new_password){

    		$olduserdata = Sentinel::findByCredentials($credentials);

    		if ($olduserdata) {
                Sentinel::setHasher(new Sha256Hasher());
                Sentinel::update($olduserdata, array('password'=>$resquest->new_password));
            }
            $notification = array(
                'message' => 'Password changed successfully',
                'alert-type' => 'success'
            );

            return Redirect::to('admin/change_password')->with($notification);

    	}else{
    		$notification = array(
                'message' => 'New Password And Old Password Not Match',
                'alert-type' =>'error',
            );

    		return Redirect::to('admin/change_password')->with($notification);
    	}
    	
    	
    }

}
