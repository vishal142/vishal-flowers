<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Library\helper as Helpers;
use App\Model\CardModel;
use Log;
use Session;
use DB;

class CardController extends Controller
{
    public function __construct(){
    	$this->CardModel = new CardModel();
    	error_reporting(0);
    }

    public function index(){
    	$data['page_title'] = 'Manage Card Message';
    	$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/coupon">Manage Card Message</a></li>';
    	$data['recordset'] = $this->CardModel->GetAllCardMessage();
    	return view('admin.card.index',$data);
    }

    public function add_card_message($card_id =''){
        if($card_id!=''){
            $data['page_title'] = 'Edit Card Message';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/coupon">Coupon List</a></li><li class="active">Edit Card Message</li>';
            $data['CardDetail'] = $this->CardModel->CardDetail($card_id)[0];


        }else{
            $data['page_title'] = 'Add Card Message';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/coupon">Coupon List</a></li><li class="active">Edit Card Message</li>';
            $data['CardDetail'] = array();

        }

        return view('admin.card.add_card',$data);

    }

    public function add_card_data(Request $request){
        $data = array(
            'id'=>$request->card_id,
            'short_name'=>$request->short_name,
            'description'=>$request->description,
            'user_id'=>Session::get('currentUser')->id,
        );

       $this->CardModel->AddCardMessage($data);

       if($request->card_id !=''){
            $notification = array(
                'message' => 'Card Message Update Sucessfully',
                'alert-type' => 'success'
            );

        }else{
            $notification = array(
                'message' => 'Card Message Add Sucessfully',
                'alert-type' => 'success'
            );

        }

        return Redirect::to('/admin/card')->with($notification);


    }

    public function delete_card_message(Request $request){
        $this->CardModel->DeleteCardMessage($request->id);
        echo true;

    }

    public function change_status(Request $request){
        $status = $this->CardModel->CardDetail($request->card_id)[0];
        if($status->status=='Active'){
            $data = array('id'=>$status->id,'status'=>'Inactive');
            $this->CardModel->AddCardMessage($data);
            echo 'Inactive';


        }

        if($status->status=='Inactive'){
            $data = array('id'=>$status->id,'status'=>'Active');
           $this->CardModel->AddCardMessage($data);
            echo 'Active';

        }

    }
}
