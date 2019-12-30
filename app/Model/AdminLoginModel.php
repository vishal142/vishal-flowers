<?php

namespace App\Model;

use Log;
use Session;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Cartalyst\Sentinel\Hashing\Sha256Hasher;
use Cartalyst\Sentinel\Users\EloquentUser as CartalystUser;
use App\Exceptions\ApplicationException;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;


class AdminLoginModel extends Model
{
    protected $fillable = ['*'];
    protected $table = 'tbl_admin';
    public $timestamps = false;

   static function chechLogin($data){
   	$res = DB::table('tbl_admin')
   	->select('*')->where('user_name',$data['username'])->where('password',md5($data['password']))->get()[0];
   	return $res;


   }

   public function registerUser($data){
   			Log::info(__METHOD__ . "Data Input==>", (array)$data);
			Sentinel::setHasher(new Sha256Hasher());
		   	$user = Sentinel::registerAndActivate($data);
		   	Log::info(__METHOD__ . "Data from M==>", (array)$user);
		    return $user;
    }

   public function checkLogin($credentials){
   		$dataReturn = array(
            'check' => NULL,
            'message' => NULL,
            'alert-type' => NULL
        );

   		Sentinel::setHasher(new Sha256Hasher());
   		$data = Sentinel::authenticate($credentials);
   		
   		if($data){
   			$user = Sentinel::getUser();
   			Log::info(__METHOD__ . "Data Input==>", (array)$user);
   			$dataReturn = array(
                            'check' => true,
                            'message' => trans('messages.login.success'),
                            'alert-type' => 'success',
                            'user_id' => $user->id
                        );


   		}else{
   			$isExist = DB::table('users')->where('email',$credentials['email'])->exists();

   			if($isExist){
   				$dataReturn = array(
                                    'check' => false,
                                    'message' => 'Enter Correct Password',
                                    'alert-type' => 'error'
                                );


   			}else{
   				$dataReturn = array(
                                    'check' => false,
                                    'message' => 'Account does not exist',
                                    'alert-type' => 'error'
                                );
   				
   			}

   		}

   		return $dataReturn;


   		}


}
