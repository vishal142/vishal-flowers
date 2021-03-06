<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Model\CityModel;
use App\Model\DeliveryChargeModel;
use Illuminate\Http\Request;
use Session;
use log;


class CityController extends Controller
{
    public function __construct(){
    	$this->CityModel = new CityModel();
        $this->DeliveryChargeModel = new DeliveryChargeModel();

    }

    public function index(){
    	$data['page_title'] = 'City List';
    	$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/city">City List</a></li>';
    	$data['recordset'] = $this->CityModel->GetAllCity();
    	return view('admin.city.index',$data);
    }

    public function EditCity(Request $request){
    	$data['getAllstate'] = $this->CityModel->getAllState();
        $data['AllDeliveryCharge'] = $this->DeliveryChargeModel->GetDeliveryCharge($request->city_id);
        if($request->city_id !=''){
                $data['page_title']='Update City';
                $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/category">City List</a></li><li class="active">Update City</li>';

                $data['city_detail'] = $this->CityModel->CityDetail($request->city_id)[0];
                $data['city_recordset'] = array();

        }
    	
    	return view('admin.city.add_city',$data);

    }

 public function AddCityData(Request $request){
 	$data = array(
 		'id'=>$request->city_id,
 		'city_name'=>$request->city_name,
 		'midnight_delivery'=>$request->midnight_delivery,
 		'delivery_frequency'=>$request->delivery_frequency,
 		'updated_at'=>date('Y-m-d H:i:s')
 	);
 	$this->CityModel->Addcity($data);
    if($request->city_id !=''){
            $notification = array(
                'message' => 'City Update Sucessfully',
                'alert-type' => 'success'
            );

        }else{
            $notification = array(
                'message' => 'City Add Sucessfully',
                'alert-type' => 'success'
            );

        }
        

        return Redirect::to('/admin/city')->with($notification);

 }

 function add_delivery_data(Request $request){
    $data = array(
        'id'=>$request->delivery_id,
        'city_id'=>$request->city_id,
        'from_time'=>$request->from_time,
        'to_time'=>$request->to_time,
        'delivery_charge'=>$request->delivery_charge,
        'updated_at'=>date('Y-m-d H:i:s'),
        );
    //dd($data);
    $this->DeliveryChargeModel->AddDeliveryCharge($data);
    if($request->delivery_id !=''){
            $notification = array(
                'message' => 'Delivery Charged Update Sucessfully',
                'alert-type' => 'success'
            );

        }else{
            $notification = array(
                'message' => 'Delivery Charged Added Sucessfully',
                'alert-type' => 'success'
            );

        }
        

        return Redirect::to('/admin/city/edit-city/'.$request->city_id)->with($notification);

 }


 function GetDeliveryChargeDetail(Request $request){
    $delivery_id = $request->id; 
    $city_id = $request->city_id; 
    $delivery_detail = $this->DeliveryChargeModel->GetDeliveryDetail($delivery_id);
    echo json_encode($delivery_detail);
    }
 
 public function change_status(Request $request){
    $status = $this->CityModel->CityDetail($request->city_id)[0];
        if($status->status=='Active'){
            $data = array('id'=>$request->city_id,'status'=>'Inactive');
            $this->CityModel->Addcity($data);
            echo 'Inactive';


        }

        if($status->status=='Inactive'){
            $data = array('id'=>$request->city_id,'status'=>'Active');
            $this->CityModel->Addcity($data);
            echo 'Active';

        }

 }

 public function change_delivery_status(Request $request){
    $status = $this->DeliveryChargeModel->GetDeliveryDetail($request->delivery_id)[0];
        if($status->delivery_status=='Active'){
            $data = array('id'=>$request->delivery_id,'delivery_status'=>'Inactive');
            $this->DeliveryChargeModel->AddDeliveryCharge($data);
            echo 'Inactive';


        }

        if($status->delivery_status=='Inactive'){
            $data = array('id'=>$request->delivery_id,'delivery_status'=>'Active');
            $this->DeliveryChargeModel->AddDeliveryCharge($data);
            echo 'Active';

        }


 }

 ///////////End Class /////////   
}
