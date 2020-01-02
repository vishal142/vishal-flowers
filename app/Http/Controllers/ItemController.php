<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Model\ItemModel;
use Session;
use Log;


class ItemController extends Controller
{
	public function __construct(){
		$this->ItemModel = new ItemModel();

	}

    public function index(){
    	$data['recordset'] = $this->ItemModel->GetAllItem();
    	return view('admin.item.index',$data);
    }

    public function AddItem(){
    	echo "Here";
    }

    public function EditItem(){
    	echo "Here";
    }
}
