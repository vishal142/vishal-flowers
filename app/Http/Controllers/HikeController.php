<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Model\HikeModel;
use Log;
use session;

class HikeController extends Controller
{
    public function __construct(){
    	$this->HikeModel = new HikeModel();
    	 error_reporting(0);
    }

    public function index(){
    	$data['page_title'] = 'Hike List';
    	$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/hike">Hike List</a></li>';
    	$data['recordset'] = $this->HikeModel->GetAllHike();
    	return view('admin.hike.index',$data);
    }

    public function add_hike_price($id=''){
    	if($id !=''){
            $data['hikeDetail'] = $this->HikeModel->GethikeDetail($id)[0];
            $data['page_title'] = 'Edit Item';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/item">Item List</a></li><li class="active">Edit Item</li>';

        }else{
            $data['page_title'] = 'Add Item';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/item">Item List</a></li><li class="active">Add Item</li>';
            $data['hikeDetail'] = array();

        }

        
        return view('admin.hike.add_hike_price',$data);

    }


 function hike_price_data(Request $request){
 	$date_end = date("Y-m-d 23:59:59", strtotime($request->start));
 	$data = array(
 		'id'=>$request->id,
 		'title'=>$request->title,
 		'hike_value'=>$request->hike_value,
 		'start_date'=>$request->start,
 		'end_date'=>$date_end,
 		'updated_at'=>date('Y-m-d H:i:s')
 	);
 	$this->HikeModel->AddHikePrice($data);

 	if($request->id !=''){
            $notification = array(
                'message' => 'Hike Price Update Sucessfully',
                'alert-type' => 'success'
            );

        }else{
            $notification = array(
                'message' => 'Hike Price Add Sucessfully',
                'alert-type' => 'success'
            );

        }

       return redirect::to('/admin/hike')->with($notification);

 }

 function change_status(Request $request){
 	 $status = $this->HikeModel->GethikeDetail($request->hike_id)[0];
        if($status->status=='Active'){
            $data = array('id'=>$request->hike_id,'status'=>'Inactive');
            $this->HikeModel->AddHikePrice($data);
            echo 'Inactive';


        }

        if($status->status=='Inactive'){
            $data = array('id'=>$request->hike_id,'status'=>'Active');
            $this->HikeModel->AddHikePrice($data);
            echo 'Active';

        }


 }

////////// End Class //////////////////

}
