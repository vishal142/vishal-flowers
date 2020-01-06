<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Model\SubCategoryModel;
use App\Exceptions\ApplicationException;
use App\Model\CategoryModel;
use Illuminate\Support\Facades\Redirect;
use Log;
use Session;
use App\Library\helper as Helpers;

class SubCategoryController extends Controller
{
    public function __construct(){
    	$this->SubCategoryModel = new SubCategoryModel();
    	$this->CategoryModel = new CategoryModel();
    	error_reporting(0);
    
    }

    public function index(){
    	$allSubCategory = $this->SubCategoryModel->GetAllSubCategory();
    	//print_r($allSubCategory);
    	return view('admin.sub_category.index',['recordset'=>$allSubCategory]);
    }

    public function Add_Sub_Category($id=''){

    	$data['allCategory'] = $this->CategoryModel->GetAllCategory();
    	
    	if($id !=''){
    		$data['page_title'] = 'Edit Sub Category';
    		$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/sub-category">Sub Category List</a></li><li class="active">Edit Sub Category</li>';
    		$data['SubCategoryDetail'] = $this->SubCategoryModel->GetSubCategoryDetail($id)[0];
    		print_r($data['SubCategoryDetail']);

    	}else{
    		$data['page_title'] = 'Add Sub Category';
    		$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/sub-category">Sub Category List</a></li><li class="active">Add Sub Category</li>';
    		$data['SubCategoryDetail'] = '';

    	}
    	
    	return view('admin.sub_category.add_sub_category',$data);
    	
    }

    public function add_sub_category_data(Request $request){
    	$data = array(
    		'id'=>$request->sub_category_id,
    		'cat_id'=>$request->category_id,
    		'sub_cat_name'=>$request->sub_category_name,
    		'description'=>$request->description,
    		'created_at'=>date('Y-m-d H:i:s'),
    		'updated_at'=>date('Y-m-d H:i:s'),
    		'user_id'=>Session::get('currentUser')->id,
    		);

    		$last_id = $this->SubCategoryModel->AddSubCategory($data);

    		$slug_data = array('id'=>$last_id,'slug'=>strtolower(str_replace(" ", "-", $request->sub_category_name.'-india')));
        
        $this->SubCategoryModel->AddSubCategory($slug_data);

    		if($request->sub_category_id !=''){
            $notification = array(
                'message' => 'Sub Category Update Sucessfully',
                'alert-type' => 'success'
            );

        }else{
            $notification = array(
                'message' => 'Sub Category Add Sucessfully',
                'alert-type' => 'success'
            );

        }
        

        return Redirect::to('/admin/sub-category')->with($notification);

    }
 function sub_change_status(Request $request){
    $status = $this->SubCategoryModel->GetSubCategoryDetail($request->sub_category_id)[0];
    if($status->status=='Active'){
            $data = array('id'=>$request->sub_category_id,'status'=>'Inactive');
            $this->SubCategoryModel->AddSubCategory($data);
            echo 'Inactive';
        }

        if($status->status=='Inactive'){
            $data = array('id'=>$request->sub_category_id,'status'=>'Active');
            $this->SubCategoryModel->AddSubCategory($data);
            echo 'Active';
        }
    
    


 }


 ///////////////// End Class ////////////////////////
}
