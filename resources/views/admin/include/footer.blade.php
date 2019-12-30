

  <footer class="main-footer">
    <strong>Copyright &copy; <?php echo date('Y'); ?> <a href="#">Saesha Flower </a>.</strong> All rights reserved.
</footer>




</div>
<!-- ./wrapper -->

<!-- DataTables -->

<!-- SlimScroll -->
<!-- <script src="<?php //echo $this->config->item('css_images_js_base_url');?>plugins/slimScroll/jquery.slimscroll.min.js"></script> -->
<!-- FastClick -->
<!-- <script src="<?php //echo $this->config->item('css_images_js_base_url');?>plugins/fastclick/fastclick.js"></script> -->
<!-- AdminLTE App -->
<script src="{{asset('admin_asset//js/app.min.js')}}"></script>
<!-- AdminLTE for demo purposes -->
<script src="{{asset('admin_asset/js/demo.js')}}"></script>

<!-- page script -->

<script type="text/javascript">
  $(function () {
    $("#example1").DataTable();
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false
    });
  });
</script>

</body>
</html>