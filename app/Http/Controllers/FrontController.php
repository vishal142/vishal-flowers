<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\FrontModel;
use log;
use Session;
class FrontController extends Controller
{
    public function __construct(){
    	$this->FrontModel = new FrontModel();

    }
    public function index(){
    	return view('front.index');
    }
}
