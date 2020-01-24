<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="treeview {{ (request()->segment(2) == 'dashboard') ? 'active' : '' }}">
          <a href="/admin/dashboard">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
          </a>
        </li>

        <li class="treeview {{ (request()->segment(2) == 'category') ? 'active' : '' }}">
          <a href="/admin/category">
            <i class="fa fa-dashboard"></i> <span>Category</span>
          </a>
        </li>

        <li class="treeview {{ (request()->segment(2) == 'sub-category') ? 'active' : '' }}">
          <a href="/admin/sub-category">
            <i class="fa fa-dashboard"></i> <span>Sub-Category</span>
          </a>
        </li>

        <li class="treeview {{ (request()->segment(2) == 'item') ? 'active' : '' }}">
          <a href="/admin/item">
            <i class="fa fa-dashboard"></i> <span>Item List</span>
          </a>
        </li>

        <li class="treeview {{ (request()->segment(2) == 'city') ? 'active' : '' }}">
          <a href="/admin/city">
            <i class="fa fa-dashboard"></i> <span>City List</span>
          </a>
        </li>
    
    <li class="treeview {{ (request()->segment(2) == 'hike') ? 'active' : '' }}">
          <a href="/admin/hike">
            <i class="fa fa-dashboard"></i> <span>Hike List</span>
          </a>
        </li>
    <li class="treeview {{ (request()->segment(2) == 'order') ? 'active' : '' }}">
          <a href="/admin/order">
            <i class="fa fa-dashboard"></i> <span>Order List</span>
          </a>
    </li>

    <li class="treeview {{ (request()->segment(2) == 'coupon') ? 'active' : '' }}">
          <a href="/admin/coupon">
            <i class="fa fa-dashboard"></i> <span>Coupon List</span>
          </a>
    </li>

    <li class="treeview {{ (request()->segment(2) == 'card') ? 'active' : '' }}">
          <a href="/admin/card">
            <i class="fa fa-dashboard"></i> <span>Manage Card Message</span>
          </a>
    </li>

    <li class="treeview {{ (request()->segment(2) == 'addon') ? 'active' : '' }}">
          <a href="/admin/addon">
            <i class="fa fa-dashboard"></i> <span>Manage Add-on List</span>
          </a>
    </li>


    </ul>
    </section>
    <!-- /.sidebar -->
  </aside>