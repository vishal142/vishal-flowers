<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
  <header class="main-header">
    <!-- Logo -->
    <a href="/" class="logo" target="_blank" title="Go To Home">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <!-- <span class="logo-mini"><img src="<?php //echo $this->config->item('css_images_js_base_url');?>img/logo3.png" alt="" /></span> -->
      <!-- logo for regular state and mobile devices -->
      <!-- <span class="logo-lg"><img src="<?php //echo $this->config->item('css_images_js_base_url');?>img/logo2.png" alt="" /></span> -->
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
           <li class="dropdown user user-menu">
           </li>
          <!-- Messages: style can be found in dropdown.less-->
          
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <span class="hidden-xs">Welcome,<?php echo Session::get('currentUser')->full_name;?> </span> &nbsp;
              <i class="ace-icon fa fa-caret-down"></i>
            </a>
            
            <ul class="dropdown-menu custom-menu">
              <!-- Menu Footer-->
              <li><a href="#" class="btn-default btn-flat">Global Settings</a><li>
              <li><a href="/admin/change_password" class="btn-default btn-flat">Change Password</a><li>
              <li><a href="/admin/logout" class="btn-default btn-flat">Logout</a>
              </li>
            </ul>
            
          </li>
          <!-- Control Sidebar Toggle Button -->
        </ul>
      </div>
    </nav>
  </header>


    <!-- Forward Order Model -->
    <div class="modal fade" id="ForwardOrderModal" role="dialog">
      <div class="modal-dialog" style="width:1000px;">
      
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Forward Order no. <span id="forward_order_number"></span> To Vendor</h4>
          </div>
          <div class="modal-body">

            <form class="form-horizontal" id="frm_update_delivery" name="order_confirm" method="post" action="/admin/order/forward_order_data/" enctype="multipart/form-data">
                <div class="box-body">

                <div class="form-group">
                    <label for="inputEmail3 clockpicker" class="col-sm-3 control-label">Forward this ORDER to<span class="red">*</span></label>
                    <div class="col-sm-9">
                      <input type="text" id="forward_order_to" name="forward_order_to" placeholder="" class="col-xs-10 col-sm-5 form-control"/>
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputEmail3 clockpicker" class="col-sm-3 control-label">Email (ALT)<span class="red">*</span></label>
                    <div class="col-sm-9">
                      <input type="text" id="forward_order_email" name="forward_order_email" placeholder="" class="col-xs-10 col-sm-5 form-control"/>
                    </div>
                </div>


                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-3 control-label">Email Subject<span class="red">*</span></label>
                    <div class="col-sm-9">
                      <input type="text" id="forword_email_subject" name="forword_email_subject" placeholder="" class="col-xs-10 col-sm-5 form-control" value="" readonly="" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-3 control-label">Delivery Date <span class="red">*</span></label>
                    <div class="col-sm-9">
                      <input type="text" id="delivery_date" name="delivery_date" class="col-xs-10 col-sm-5 form-control" value="" readonly="" />
                    </div>
                </div>


                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-3 control-label">Delivery time for Florist<span class="red">*</span></label>
                    <div class="col-sm-9">
                      <input type="text" id="delivery_time_florist" name="delivery_time_florist" class="col-xs-10 col-sm-5 form-control" value="" readonly="" />
                    </div>
                </div>

                
                <input type="hidden" name="order_id" value="{{Request::segment(3)}}">
                <input type="hidden" name="delivery_id" id="update_delivery_id" value="">

                <div class="box-footer">
                  <div class="col-sm-8">
                     <button type="submit" class="btn btn-info pull-right" style="margin-right:10px;">Submit</button>
                    </div>
                </div>
              <div id="forward_order"></div>

        </div>
      </form>
            


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
        
      </div>
    </div>
    <div class="modal-overlay"></div>
   <!-- End Forward Order Model -->