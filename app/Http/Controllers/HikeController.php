<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\HikeModel;
use Log;
use session;

class HikeController extends Controller
{
    public function __construct(){
    	$this->HikeModel = new HikeModel();
    }

    public function index(){
    	$data['page_title'] = 'Hike List';
    	$data['breadcrumb'] = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="/admin/dashboard">Home</a></li><li><a href="/admin/hike">Hike List</a></li>';
    	$data['recordset'] = $this->HikeModel->GetAllHike();
    	return view('admin.hike.index',$data);
    }



////////// End Class //////////////////

}
