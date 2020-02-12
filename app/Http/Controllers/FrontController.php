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
        $sub_cat_id = Helpers::perticularFlied('tbl_sub_categoery',array('id','sub_cat_name'),array('slug'=>$slug,'status'=>'active'))[0];
        $data['item_list'] = Helpers::perticularFlied('tbl_item','*',array('status'=>'active','sub_cat_id'=>$sub_cat_id->id,'status'=>'Active'),array('order_by'=>'sequence_order','offset'=>'ASC'));
       $data['sub_categoery_name'] = $sub_cat_id->sub_cat_name;
       return view('front.flowers-listing',$data);
    	
    }

    public function flower_type(Request $request){
        $slug = $request->sl;
        $sub_cat_id = Helpers::perticularFlied('tbl_sub_categoery',array('id','sub_cat_name'),array('slug'=>$slug,'status'=>'active'))[0];
        $data['item_list'] = Helpers::perticularFlied('tbl_item','*',array('status'=>'active','sub_cat_id'=>$sub_cat_id->id,'status'=>'Active'),array('order_by'=>'sequence_order','offset'=>'ASC'));
        $data['sub_categoery_name'] = $sub_cat_id->sub_cat_name;
       return view('front.flowers-type',$data);

    }

    public function flower_combos(Request $request){
        $slug = $request->sl;
        $sub_cat_id = Helpers::perticularFlied('tbl_sub_categoery',array('id','sub_cat_name'),array('slug'=>$slug,'status'=>'active'))[0];
        $data['item_list'] = Helpers::perticularFlied('tbl_item','*',array('status'=>'active','sub_cat_id'=>$sub_cat_id->id,'status'=>'Active'),array('order_by'=>'sequence_order','offset'=>'ASC'));
        $data['sub_categoery_name'] = $sub_cat_id->sub_cat_name;
       return view('front.flowers-combos',$data);

    }

    public function plants(Request $request){
        $slug = $request->sl;
        $sub_cat_id = Helpers::perticularFlied('tbl_sub_categoery',array('id','sub_cat_name'),array('slug'=>$slug,'status'=>'active'))[0];
        $data['item_list'] = Helpers::perticularFlied('tbl_item','*',array('status'=>'active','sub_cat_id'=>$sub_cat_id->id,'status'=>'Active'),array('order_by'=>'sequence_order','offset'=>'ASC'));
         $data['sub_categoery_name'] = $sub_cat_id->sub_cat_name;
       return view('front.plants',$data);

    }

    public function occasion(Request $request){
        $slug = $request->sl;
        $sub_cat_id = Helpers::perticularFlied('tbl_sub_categoery',array('id','sub_cat_name'),array('slug'=>$slug,'status'=>'active'))[0];
        $data['item_list'] = Helpers::OccasionTypeResult($sub_cat_id->id);
        $data['sub_categoery_name'] = $sub_cat_id->sub_cat_name;
       return view('front.occasion',$data);
        
    }
    public function gift(Request $request){
       $slug = $request->sl;
        $sub_cat_id = Helpers::perticularFlied('tbl_sub_categoery',array('id','sub_cat_name'),array('slug'=>$slug,'status'=>'active'))[0];
        $data['item_list'] = Helpers::perticularFlied('tbl_item','*',array('status'=>'active','sub_cat_id'=>$sub_cat_id->id,'status'=>'Active'),array('order_by'=>'sequence_order','offset'=>'ASC'));
        $data['sub_categoery_name'] = $sub_cat_id->sub_cat_name;
       return view('front.gift',$data);

    }

    public function category(Request $request){
        $slug = $request->sl;
        $cat_id = Helpers::perticularFlied('tbl_category',array('id','category_name'),array('category_slug'=>$slug,'status'=>'active'))[0];
        $data['item_list'] = Helpers::perticularFlied('tbl_item','*',array('status'=>'active','category_id'=>$cat_id->id,'status'=>'Active'));
        $data['category_name'] = $cat_id->category_name;
       return view('front.category',$data);

    }

    public function item_detail(Request $request){
        echo $slug = $request->sl;

    }
}
