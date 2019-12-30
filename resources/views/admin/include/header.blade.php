<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
  <header class="main-header">
    <!-- Logo -->
    <a href="#" class="logo" target="_blank" title="Go To Home">
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