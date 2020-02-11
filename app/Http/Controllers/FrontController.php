<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Library\helper as Helpers;
use App\FrontModel;
use log;
use Session;
class FrontController extends Controller
{
    public function __construct(){
    	$this->FrontModel = new FrontModel();
        error_reporting(0);

    }
    public function index(){
    	return view('front.index');
    }

    public function flowers(Request $request){
    	$slug = $request->sl;
        $sub_cat_id = Helpers::perticularFlied('tbl_sub_categoery','*',array('slug'=>$slug,'status'=>'active'))[0];
        $data['item_list'] = Helpers::perticularFlied('tbl_item','*',array('status'=>'active','sub_cat_id'=>$sub_cat_id->id,'status'=>'Active'),array('order_by'=>'sequence_order','offset'=>'ASC'));
       return view('front.flowers-listing',$data);
    	
    }

    public function flower_type(Request $request){
        echo $slug = $request->sl;

    }

    public function flower_combos(Request $request){
        echo $slug = $request->sl;

    }

    public function plants(Request $request){
        echo $slug = $request->sl;

    }

    public function occasion(Request $request){
        echo $slug = $request->sl;
        
    }
    public function gift(Request $request){
         echo $slug = $request->sl;

    }

    public function category(Request $request){
        echo $slug = $request->sl;

    }

    public function item_detail(Request $request){
        echo $slug = $request->sl;

    }
}
