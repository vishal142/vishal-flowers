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

		   
           
            <div class="box-header">
              <h3 class="box-title pull-right">
              </h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>SL #</th>
                  <th>Order No</th>
                  <th>Invoice No</th>
                  <th>Dalivery Date</th>
                  <th>Receiver Name</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
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
                  <td><a href="/admin/order-detail/<?php echo $row->id;?>"><?php echo $row->oder_no;?></a></td>
                  <td><?php echo $row->invoice_no;?></td>
                  <td><?php echo $row->delivery_date;?></td>
                  <td><?php echo $row->shipping_id;?></td>
                  <td><?php echo $row->order_amount;?></td>
                  <td><?php echo ucfirst($row->order_status);?></td>
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