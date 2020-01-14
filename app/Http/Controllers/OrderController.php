<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\OrderModel;
use App\Library\helper as Helpers;
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

    public function order_detail($order_id=''){
    	if($order_id !=''){
            $data['orderDetail'] = $this->OrderModel->GetOrderDetail($order_id)[0];
            $data['page_title'] = 'Update Order';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/item">Order List</a></li><li class="active">Update Order</li>';
            $shippinng = Helpers::perticularFlied('tbl_order','shipping_id',array('id'=>$order_id));
            $data['receiverDetail'] = $this->OrderModel->GetReciverDetail($shippinng[0]->shipping_id)[0];

        }else{
            $data['page_title'] = 'Add Order';
            $data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/item">Order List</a></li><li class="active">Add Order</li>';
            $data['orderDetail'] = array();
            $data['receiverDetail'] = array();

        }

        return view('admin.order.add_order',$data);


    }
}
