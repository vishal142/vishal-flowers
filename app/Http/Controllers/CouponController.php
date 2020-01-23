<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Library\helper as Helpers;
use App\Model\CouponModel;
use Log;
use DB;
use Session;

class CouponController extends Controller
{
    public function __construct(){
    	$this->CouponModel = new CouponModel();
    	error_reporting(0);
    }

    public function index(){
    	$data['page_title'] = 'Coupon List';
    	$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/coupon">Coupon List</a></li>';
    	$data['recordset'] = $this->CouponModel->GetAllCoupon();
    	return view('admin.coupon.index',$data);
    }

    public function add_coupon($coupon_id=''){
    	if($coupon_id !=''){
    		$data['page_title'] = 'Edit Coupon';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/coupon">Coupon List</a></li><li class="active">Edit Coupon</li>';
            $data['CouponDetail'] = $this->CouponModel->CouponDetail($coupon_id)[0];

    	}else{
    		$data['page_title'] = 'Add Coupon';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/coupon">Coupon List</a></li><li class="active">Add Coupon</li>';
            $data['CouponDetail'] = array();

    	}

    	return view('admin.coupon.add_coupon',$data);

    }

    public function change_status(Request $request){
    	$status = $this->CouponModel->CouponDetail($request->coupon_id)[0];
        if($status->status=='Active'){
            $data = array('id'=>$status->id,'status'=>'Inactive');
            $this->CouponModel->AddCoupon($data);
            echo 'Inactive';


        }

        if($status->status=='Inactive'){
            $data = array('id'=>$status->id,'status'=>'Active');
           $this->CouponModel->AddCoupon($data);
            echo 'Active';

        }

    }

    public function add_coupon_data(Request $request){
    	$data = array(
    		'id'=>$request->coupon_id,
    		'coupon_code'=>$request->coupon_code,
    		'coupon_type'=>$request->coupon_type,
    		'coupon_value'=>$request->coupon_value,
    		'description'=>$request->description,
    		'user_id'=>Session::get('currentUser')->id,
    	);

    	$this->CouponModel->AddCoupon($data);
    	if($request->coupon_id !=''){
            $notification = array(
                'message' => 'Coupon Update Sucessfully',
                'alert-type' => 'success'
            );

        }else{
            $notification = array(
                'message' => 'Coupon Add Sucessfully',
                'alert-type' => 'success'
            );

        }

        return Redirect::to('/admin/coupon')->with($notification);

    }


    public function delete_coupon(Request $request){
    	$this->CouponModel->DeleteCoupon($request->id);
    	echo true;
    	

    }
}
