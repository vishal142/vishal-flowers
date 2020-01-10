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
    $occasionType = implode(",",$request->occasionType);
    $data = array(
        'id'=>$request->sub_category_id,
        'category_id'=>$request->category_id,
        'sub_cat_id'=>$request->add_sub_category_id,
        'item_name'=>$request->item_name,
        'item_price'=>$request->item_price,
        'secial_price'=>$request->special_price,
        'description'=>$request->item_description,
        'stock'=>$request->stock,
        'double_the_quantity_price'=>$request->double_qty_price,
        'double_qty_description'=>$request->double_qty_description,
        'shown_short_description'=>$request->shown_short_description,
        'upgrade_option_price'=>$request->upgrade_option_price,
        'upgrade_option_description'=>$request->upgrade_option_description,
        'meta_tilte'=>$request->meta_tilte,
        'meta_description'=>$request->meta_description,
        'sequence_order'=>'0',
        'occasion_type'=>$occasionType,
        'user_id'=>Session::get('currentUser')->id,
        'created_at'=>date('Y-m-d H:i:s'),
        'updated_at'=>date('Y-m-d H:i:s')
        );
        //echo "<pre>";print_r($data); exit;
        $last_id = $this->ItemModel->AddItem($data);
        $slug_data = array('id'=>$last_id,'item_slug'=>strtolower(str_replace(" ", "-", $request->item_name.'-india')),'sequence_order'=>$last_id);
        
        $last_id = $this->ItemModel->AddItem($slug_data);
        if($request->hasFile('item_image'))
        {
            $image = $request->file('item_image');

            $imagefileName = pathinfo($image->getClientOriginalExtension(), PATHINFO_FILENAME);
            //$file = Input::file('file');
            $filename = $last_id .'.'. $image->getClientOriginalExtension();
            
            $path = public_path('uploads/item_image');
            //dd($path);
            $imagepath = $request->item_image->move($path, $filename);
            $image_data = array('id'=>$last_id,'item_image'=>$filename);
            $last_id = $this->ItemModel->AddItem($image_data);
        }



         if($request->sub_category_id !=''){
            $notification = array(
                'message' => 'Item Update Sucessfully',
                'alert-type' => 'success'
            );

        }else{
            $notification = array(
                'message' => 'Item Add Sucessfully',
                'alert-type' => 'success'
            );

        }
        

        return Redirect::to('/admin/item')->with($notification);



 }

  public function item_change_status(Request $request){
        $postData = $request->all();
        $item_id = $postData['item_id'];
        $status = $this->ItemModel->ItemDetail($item_id)[0];
        if($status->status=='Active'){
            $data = array('id'=>$item_id,'status'=>'Inactive');
            $this->ItemModel->AddItem($data);
            echo 'Inactive';


        }

        if($status->status=='Inactive'){
            $data = array('id'=>$item_id,'status'=>'Active');
            $this->ItemModel->AddItem($data);
            echo 'Active';

        }
    }


////////////////////// End Class ////////////////////////////    
}
