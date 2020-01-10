<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\OrderModel;
use Log;
use Session;

class OrderController extends Controller
{
	public function __construct(){
		$this->OrderModel = new OrderModel();
	}
    
    public function index(){
    	$data['page_title'] = 'Order List';
    	$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/order">Home</a></li><li><a href="/admin/order">Order List</a></li>';
    	$data['recordset'] = $this->OrderModel->GetAllOrder();
    	return view('admin.order.index',$data);
    }

    public function order_detail($order_id){
    	echo $order_id;

    }
}
