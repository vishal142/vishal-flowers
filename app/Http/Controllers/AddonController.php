<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Library\helper as Helpers;
use App\Model\AddonModel;
use Log;
use Session;
use DB;

class AddonController extends Controller
{
    public function __construct(){
    	$this->AddonModel = new AddonModel();
    	error_reporting(0);
    }

    public function index(){
    	$data['page_title'] = 'Manage Add-on';
    	$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/coupon">Addon List</a></li>';
    	$data['recordset'] = $this->AddonModel->GetAllAddonItem();
    	return view('admin.addon.index',$data);
    }

    public function add_addon_item($addon_id = ''){
    	if($addon_id !=''){
    		$data['page_title'] = 'Edit Add-On Item';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/addon">Add-on List</a></li><li class="active">Edit Add-On Item</li>';
            $data['AddonDetail'] = $this->AddonModel->AddonDetail($addon_id)[0];

    	}else{
    		$data['page_title'] = 'Add Add-On Item';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/addon">Add-on List</a></li><li class="active">Add Add-On Item</li>';
            $data['AddonDetail'] = array();

    	}

    	return view('admin.addon.add_on',$data);

    }

    public function add_addon_data(Request $request){
    	$data = array(
    		'id'=>$request->addon_id,
    		'addon_name'=>$request->addon_name,
    		'addon_price'=>$request->price,
    	);

    	$last_id = $this->AddonModel->AddonItem($data);

    	###########File Upload ###############

    	if($request->hasFile('addonfile'))
        {
            $image = $request->file('addonfile');

            $imagefileName = pathinfo($image->getClientOriginalExtension(), PATHINFO_FILENAME);
            //$file = Input::file('file');
            $filename = $last_id .'.'. $image->getClientOriginalExtension();
            
            $path = public_path('uploads/addon');
            //dd($path);
            $imagepath = $request->addonfile->move($path, $filename);
            $image_data = array('id'=>$last_id,'image'=>$filename);
            $last_id = $this->AddonModel->AddonItem($image_data);
        }

        ################ End File Upload ##########################


        if($request->addon_id !=''){
            $notification = array(
                'message' => 'Addon Item Update Sucessfully',
                'alert-type' => 'success'
            );

        }else{
            $notification = array(
                'message' => 'Addon Item Add Sucessfully',
                'alert-type' => 'success'
            );

        }
        

        return Redirect::to('/admin/addon')->with($notification);

    }

    public function change_status(Request $request){
    	$status = $this->AddonModel->AddonDetail($request->addon_id)[0];
    	if($status->status=='Active'){
    		$data = array('id'=>$request->addon_id,'status'=>'Inactive');
            $this->AddonModel->AddonItem($data);
            echo 'Inactive';

    	}
    	if($status->status=='Inactive'){
    		$data = array('id'=>$request->addon_id,'status'=>'Active');
             $this->AddonModel->AddonItem($data);
             echo 'Active';

    	}


    }


    public function delete_add_on_item(Request $request){
    	$status = $this->AddonModel->AddonDetail($request->id)[0];
    	$image_url = public_path('uploads/addon/'.$status->image);      
   		unlink($image_url);
    	$this->AddonModel->DeleteAddonItem($request->id);
    	echo true;
    }

    


}
