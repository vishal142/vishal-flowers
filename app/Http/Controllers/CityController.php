<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Model\CityModel;
use Illuminate\Http\Request;
use Session;
use log;


class CityController extends Controller
{
    public function __construct(){
    	$this->CityModel = new CityModel();

    }

    public function index(){
    	$data['page_title'] = 'City List';
    	$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/city">City List</a></li>';
    	$data['recordset'] = $this->CityModel->GetAllCity();
    	return view('admin.city.index',$data);
    }

    public function EditCity(Request $request){
    	$data['getAllstate'] = $this->CityModel->getAllState();
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
 		'state_id'=>$request->state_id,
 		'city_name'=>$request->city_name,
 		'midnight_delivery'=>$request->midnight_delivery,
 		'delivery_frequency'=>$request->delivery_frequency,
 		'updated_at'=>date('Y-m-d H:i:s')
 	);
 	dd($data);

 }

 ///////////End Class /////////   
}
