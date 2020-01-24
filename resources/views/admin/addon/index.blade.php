@extends('admin.layouts.default')
@section('title','Addon Items')
@section('content')

<?php 
//print_r($recordset);
//exit;
 ?>
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        <?php echo $page_title; ?>
      </h1>
      <ol class="breadcrumb">
        <?php echo $breadcrumb; ?>
      </ol>
    </section>
	
	<?php //print_r($page_title);?>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box box-info">

		   
		    <div class="alert alert-danger" id="user_delete" style="display:none">
                    <button type="button" class="close" data-dismiss="alert">
                        <i class="ace-icon fa fa-times"></i>
                    </button>
                        Add On Item Delete Successfully
                    <br>
                </div>
           
            <div class="box-header">
              <h3 class="box-title pull-right">
              
            <a class="btn btn-success btn-sm" href="/admin/addon/add-addon-item"> <i class="ace-icon fa glyphicon-plus white" title="Add Coupon"></i> Add New </a>
             
              </h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>SL #</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                 <?php
				if($recordset)
				{

				$startRecord ='0';
				$i = '1';
					foreach($recordset as $row)
					{
						//print_r($row);
						
						$editLink = '/admin/addon/edit-addon-item/'.$row->id;
				?>

                <tr id="tr<?php echo $row->id;?>">
                  <td><?php echo $i; ?></td>
                  <td><img src="{{URL::to('uploads/addon/'.$row->image)}}" height="60" width="80"></td>
                  <td><?php echo ucfirst($row->addon_name);?></td>
                  <td><?php echo number_format($row->addon_price,2);?></td>
                  <td><a href="javascript:void(0);" onclick="change_status('<?php echo $row->id;?>');" id="cng_status<?php echo $row->id;?>" class="<?php echo ($row->status=='Active')?'activebutton':'inactivebutton';?>"><?php echo ($row->status=='Active')?'Active':'Inactive';?></a></td>

                  <td><a class="btn btn-xs btn-info" href="<?php echo $editLink;?>" title="Edit <?php echo ucfirst($row->coupon_code);?>"> <i class="ace-icon fa fa-pencil bigger-120"></i> </a>

                  <a class="btn btn-xs btn-danger" href="javascript:void(0);" title="Delete <?php echo ucfirst($row->coupon_code);?>" onclick="delete_user('<?php echo $row->id; ?>');"> <i class="ace-icon fa fa-trash-o bigger-120"></i> </a>
                   </td>
                
                </tr>
                <?php
                $i++;
					}
				}
				else
				{
				?>
                <tr>
                  <td colspan="8">No Records Found</td>
                </tr>
                <?php } ?>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
 @section('script')
 @stop
<script>
$(window).load(function(e) {
	$('#example1 th:nth-child(1)').removeClass('sorting').removeClass('no_sort sorting_asc').css('width','21px');
	$('#example1 th:nth-child(7)').removeClass('sorting').removeClass('no_sort sorting_asc');
});

function change_status(id){
	
	if(confirm("Are you sure to change status of this record?"))
	{
		$.ajax({
			url : baseurl+'/admin/addon/change-status',
			type : 'POST',
			data : {'addon_id':id},
			//dataType : 'json',
			beforeSend : function(jqXHR, settings ){
				//alert(url);
			},
			success : function(data, textStatus, jqXHR){
				$('#cng_status'+id).removeClass('activebutton').removeClass('inactivebutton').addClass(data.toLowerCase()+'button');
				$('#cng_status'+id).html(data);
			},
			/*complete : function(jqXHR, textStatus){
				alert(3);
			},*/
			error : function(jqXHR, textStatus, errorThrown){
			}
		});
	}
}

function delete_user(id,editID){
	if(confirm("Are you sure to delete of this Addon-Item ?"))
	{
		$.ajax({
			url : baseurl+'/admin/addon/delete-add-on-item',
			type : 'POST',
			data : 'id=' + id,
			//dataType : 'json',
			beforeSend : function(jqXHR, settings ){
				//alert(url);
			},
			success : function(data, textStatus, jqXHR){
				//alert(data);
				
				$('#tr'+id).slideUp("slow", function() { $('#tr'+id).remove();});
				$("#user_delete").show();
			},
			/*complete : function(jqXHR, textStatus){
				alert(3);
			},*/
			error : function(jqXHR, textStatus, errorThrown){
			}
		});
	}
}


</script>


@stop