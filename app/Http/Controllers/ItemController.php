<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Model\ItemModel;
use App\Model\CategoryModel;
use Session;
use Log;
use App\Library\helper as Helpers;

class ItemController extends Controller
{
	public function __construct(){
		$this->ItemModel = new ItemModel();
        $this->CategoryModel = new CategoryModel();
        error_reporting(0);

	}

    public function index(){
    	$data['recordset'] = $this->ItemModel->GetAllItem();
    	return view('admin.item.index',$data);
    }

    public function AddItem($id =''){
        $data['allCategory'] = $this->CategoryModel->GetAllCategory();
        $data['occasionTpye'] = $this->ItemModel->GetAllOccasionTpye();

        if($id !=''){
            $data['ItemDetail'] = $this->ItemModel->ItemDetail($id)[0];
            $data['page_title'] = 'Edit Item';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/item">Item List</a></li><li class="active">Edit Item</li>';

        }else{
            $data['page_title'] = 'Add Item';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/item">Item List</a></li><li class="active">Add Item</li>';
            $data['ItemDetail'] = array();

        }

        
        return view('admin.item.additem',$data);
    }

    public function EditItem(){
    	echo "Here";
    }

    public function selectedSubCat(Request $request){
        $data = Helpers::perticularFlied('tbl_sub_categoery','*',array('cat_id'=>$request->category_id));
        echo '<option value="">Select Sub Category</option>';
        foreach($data as $sub_cat){
        if($sub_cat->id == $request->sub_cat_id){
            $selected = 'selected';

        }else{
            $selected = '';
        }

        echo '<option value="'.$sub_cat->id.'" '.$selected.'>'.$sub_cat->sub_cat_name.'</option>';

    }
        
       

    }

 public function add_item_data(Request $request){
    dd($request->input());

 }

////////////////////// End Class ////////////////////////////    
}
