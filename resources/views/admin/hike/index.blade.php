@extends('admin.layouts.default')
@section('title','Hike Price')
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
                        Hike Price Delete Successfully
                    <br>
                </div>
           
            <div class="box-header">
              <h3 class="box-title pull-right">
              
            <a class="btn btn-success btn-sm" href="/admin/hike/add-hike-price"> <i class="ace-icon fa glyphicon-plus white" title="Add User"></i> Add New </a>
             
              </h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>SL #</th>
                  <th>Title</th>
                  <th>Parentage</th>
                  <th>Start Date</th>
                  <th>End Date</th>
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
						//$editLink = str_replace("{{ID}}",$recordset[$i]['id'],$edit_link);
						//$deleteLink = str_replace("{{ID}}",$recordset[$i]['id'],$delete_link);
						//$activeLink = str_replace("{{ID}}",$recordset[$i]['id'],$active_link);
						$editLink = '/admin/hike/edit-hike-price/'.$row->id;
				?>

                <tr id="tr<?php echo $row->id;?>">
                  <td><?php echo $i; ?></td>
                  <td><?php echo ucfirst($row->title);?></td>
                  <td><?php echo $row->hike_value;?> %</td>
                  <td><?php echo $row->start_date;?></td>
                  <td><?php echo ucfirst($row->end_date);?></td>

                  <td><a href="javascript:void(0);" onclick="change_status('<?php echo $row->id;?>');" id="cng_status<?php echo $row->id;?>" class="<?php echo ($row->status=='Active')?'activebutton':'inactivebutton';?>"><?php echo ($row->status=='Active')?'Active':'Inactive';?></a></td>

                  <td><a class="btn btn-xs btn-info" href="<?php echo $editLink;?>" title="Edit <?php echo ucfirst($row->id);?>"> <i class="ace-icon fa fa-pencil bigger-120"></i> </a>
                  <a class="btn btn-xs btn-danger" href="javascript:void(0);" title="Delete Hike Price" onclick="delete_user('<?php echo $row->id; ?>');"> <i class="ace-icon fa fa-trash-o bigger-120"></i> </a>
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
			url : baseurl+'/admin/hike/change-status',
			type : 'POST',
			data : {'hike_id':id},
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
	if(confirm("Are you sure to delete of this Hike Price ?"))
	{
		$.ajax({
			url : '/admin/hike/delete-hike-price',
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