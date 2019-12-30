<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>@yield('title')</title>
  <meta name="csrf-token" content="{{csrf_token()}}">
  <link rel="icon" href="{{asset('admin_asset/img/favicon.ico" type="image/x-icon')}}" />
  <link rel="shortcut icon" href="{{asset('admin_asset/img/favicon.ico')}}" type="image/x-icon" />
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="{{asset('admin_asset/bootstrap/css/bootstrap.min.css')}}">

<link rel="stylesheet" type="text/css" href="{{asset('admin_asset/css/bootstrap-clockpicker.min.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('admin_asset/css/github.min.css')}}">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
  
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

  <!-- Ionicons -->
  <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="{{asset('admin_asset/plugins/datatables/dataTables.bootstrap.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{asset('admin_asset/css/AdminLTE.min.css')}}">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="{{asset('admin_asset/css/skins/_all-skins.min.css')}}">
  
  <link rel="stylesheet" href="{{asset('admin_asset/css/bootstrapValidator.min.css')}}"/>
  
  <link rel="stylesheet" href="{{asset('admin_asset/css/custom_style.css')}}"/>
  
 <!--  <link rel="stylesheet" href="<?php //echo $this->config->item('css_images_js_base_url');?>plugins/iCheck/square/blue.css"> -->
  <link href="{{asset('admin_asset/froala/css/froala_editor.pkgd.min.css')}}" rel="stylesheet" />

  <link rel="stylesheet" href="{{asset('admin_asset/tokenize/css/tokenize2.css')}}">
 <script src="{{asset('admin_asset/js/jquery.2.1.1.min.js')}}"></script>
    <script src="http://code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
	<!-- Bootstrap 3.3.6 -->

  <script type="text/javascript" src="{{asset('admin_asset/js/jquery.min.js')}}"></script>

	<script src="{{asset('admin_asset/bootstrap/js/bootstrap.min.js')}}"></script>

  <script type="text/javascript" src="{{asset('admin_asset/js/bootstrap-clockpicker.min.js')}}"></script>

	<script type="text/javascript" src="{{asset('admin_asset/js/bootstrapValidator.min.js')}}"> </script>
    <script src="{{asset('admin_asset/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js')}}"></script>
    <script src="{{asset('admin_asset/plugins/datatables/jquery.dataTables.min.js')}}"></script>
	<script src="https://cdn.datatables.net/buttons/1.2.4/js/dataTables.buttons.min.js" type="text/javascript"></script>
    <script src="https://cdn.datatables.net/buttons/1.2.4/js/buttons.flash.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js" type="text/javascript"></script>
    <script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.24/build/pdfmake.min.js" type="text/javascript"></script>
    <script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.24/build/vfs_fonts.js" type="text/javascript"></script>
    <script src="https://cdn.datatables.net/buttons/1.2.4/js/buttons.html5.min.js" type="text/javascript"></script>
    <script src="https://cdn.datatables.net/buttons/1.2.4/js/buttons.print.min.js" type="text/javascript"></script>
    <script src="{{asset('admin_asset/plugins/datatables/dataTables.bootstrap.min.js')}}"></script>
    <script src="{{asset('admin_asset/tokenize/js/tokenize2.js')}}"></script>
    <script src="{{asset('admin_asset/froala/js/froala_editor.pkgd.min.js')}}"></script>
    <script src="{{asset('admin_asset/ckeditor/ckeditor.js')}}"></script>

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"></script>
</head>