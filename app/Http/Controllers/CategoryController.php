<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\CategoryModel;
use Session;
use log;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Support\Facades\Redirect;


class CategoryController extends Controller
{
	public function __construct(){
		$this->CategoryModel = new CategoryModel();

	}

    public function index(){

    	$allCategory = $this->CategoryModel->GetAllCategory();
    	return view('admin.category.index',['recordset'=>$allCategory]);
    }

    public function change_status(Request $request){
    	$postData = $request->all();
    	$category_id = $postData['category_id'];
        $status = $this->CategoryModel->CategoryDetail($category_id)[0];
        if($status->status=='Active'){
            $data = array('id'=>$category_id,'status'=>'Inactive');
            $this->CategoryModel->AddCategoery($data);
            echo 'Inactive';


        }

        if($status->status=='Inactive'){
            $data = array('id'=>$category_id,'status'=>'Active');
            $this->CategoryModel->AddCategoery($data);
            echo 'Active';

        }
    }

    public function AddCategory($category_id=''){
        $data['page_title']='Add Category';
        $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/category">Category List</a></li><li class="active">Add Category</li>';
        $succmsg = '';
        $errmsg = '';
        
        return view('admin.category.add_category',$data);

    }

    public function EditCategory($category_id=''){
        if($category_id !=''){
                $data['page_title']='Update Category';
                $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/category">Category List</a></li><li class="active">Update Category</li>';

                $data['CategoryDetail'] = $this->CategoryModel->CategoryDetail($category_id)[0];

        }
        $succmsg = '';
        $errmsg = '';
        
        return view('admin.category.edit_category',$data);

    }

    public function add_category_data(Request $request){
        
        $data = array(
            'id'=>$request->category_id,
            'category_name'=>$request->category_name,
            'description'=>$request->description,
            'user_id'=>Session::get('currentUser')->id,
        );

        $last_id = $this->CategoryModel->AddCategoery($data);
        $slug_data = array('id'=>$last_id,'category_slug'=>strtolower(str_replace(" ", "-", $request->category_name.'-india')));
        
        $this->CategoryModel->AddCategoery($slug_data,'category_slug');

        if($request->category_id !=''){
            $notification = array(
                'message' => 'Category Update Sucessfully',
                'alert-type' => 'success'
            );

        }else{
            $notification = array(
                'message' => 'Category Add Sucessfully',
                'alert-type' => 'success'
            );

        }
        

        return Redirect::to('/admin/category')->with($notification);
    }

//////////// End Class ////////////////
}
