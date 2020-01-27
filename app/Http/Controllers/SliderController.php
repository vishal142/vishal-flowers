<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Model\SliderModel;
use App\Library\helper as Helpers;
use Log;
use Session;
class SliderController extends Controller
{
    public function __construct(){
    	$this->SliderModel = new SliderModel();
    	error_reporting(0);
    }

    public function index(){
    	$data['page_title'] = 'Manage Add-on';
    	$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/coupon">Addon List</a></li>';
    	$data['recordset'] = $this->SliderModel->GetAllSlider();
    	return view('admin.slider.index',$data);
    }

    public function add_slider($slider_id = ''){
    	if($slider_id !=''){
    		$data['page_title'] = 'Edit Slider';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/slider">Slider List</a></li><li class="active">Edit Add-On Item</li>';
            $data['SliderDetail'] = $this->SliderModel->SliderDetail($slider_id)[0];

    	}else{
    		$data['page_title'] = 'Add Slider';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/slider">Slider List</a></li><li class="active">Add Slider</li>';
            $data['SliderDetail'] = array();

    	}

    	return view('admin.slider.add_slider',$data);

    }

    public function add_slider_data(Request $request){
    	$data = array(
    		'id'=>$request->slider_id,
    		'name'=>$request->slider_name,
    	);

    	$last_insert_id = $this->SliderModel->AddSlider($data);

    	###########File Upload ###############
    	if($request->hasFile('sliderfile')){
    		$image  = $request->file('sliderfile');
    		$imageFileName = pathinfo($image->getClientOriginalExtension(),PATHINFO_FILENAME);
    		$filename = $last_insert_id.'.'.$image->getClientOriginalExtension();
    		$path = public_path('uploads/slider');
    		$imagepath = $request->sliderfile->move($path, $filename);
            $image_data = array('id'=>$last_id,'name'=>$request->slider_name,'image'=>$filename);
            $last_id = $this->SliderModel->AddSlider($image_data);
    	}

    	################ End File Upload ##########################

    	if($request->slider_id !=''){
            $notification = array(
                'message' => 'Slider Update Sucessfully',
                'alert-type' => 'success'
            );

        }else{
            $notification = array(
                'message' => 'Slider Add Sucessfully',
                'alert-type' => 'success'
            );

        }
        

        return Redirect::to('/admin/slider')->with($notification);

    }

    public function change_status(Request $request){
    	$status = $this->SliderModel->SliderDetail($request->slider_id)[0];
    	if($status->status=='Active'){
    		$data = array('id'=>$request->slider_id,'status'=>'Inactive');
            $this->SliderModel->AddSlider($data);
            echo 'Inactive';

    	}
    	if($status->status=='Inactive'){
    		$data = array('id'=>$request->slider_id,'status'=>'Active');
            $this->SliderModel->AddSlider($data);
             echo 'Active';

    	}

    }

    public function delete_slider(Request $request){
    	$status = $this->SliderModel->SliderDetail($request->id)[0];
    	$image_url = public_path('uploads/slider/'.$status->image);
    	unlink($image_url);
    	//$this->SliderModel->DeleteSlider($request->id);
    	echo true;


    }
}
