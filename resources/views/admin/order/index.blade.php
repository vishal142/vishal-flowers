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
                  <th>Payment Method</th>
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
						
						$editLink = '/admin/hike/edit-hike-price/'.$row->id;
						$reciverobj = (new \App\Library\helper)->perticularFlied('tbl_shipping','receiver_name',array('id'=>$row->shipping_id));
						$ReciverName = json_decode($reciverobj);

					 $cityObj = (new \App\Library\helper)->perticularFlied('tbl_city','city_name',array('id'=>$row->city_id));
					 $cityName = json_decode($cityObj);
				?>

                <tr id="tr<?php echo $row->id;?>">
                  <td><?php echo $i; ?></td>
                  <td><a href="/admin/order-detail/<?php echo $row->id;?>"><?php echo $row->oder_no;?></a></td>
                  <td><?php echo $row->invoice_no;?></td>
                  <td><?php echo $row->delivery_date;?></td>
                  <td><?php echo $ReciverName[0]->receiver_name.'<br><p style="color:red;">'.ucfirst($cityName[0]->city_name).'</p></center>';?></td>
                  <td><?php echo $row->order_amount;?></td>
                 <td><?php
                   echo ($row->order_status =='pending'?'<b><p style="color:red;">Pending</p></b>':''); 
                   echo ($row->order_status =='payment_due'?'<b><p style="color:red;">Payment Due</p></b>':''); 

                   echo ($row->order_status =='delivered'?'<b><p style="color:blue;">Delivered</p></b>':'');

                   echo ($row->order_status =='confirm'?'<b><p style="color:green;">Confirm</p></b>':'');

                   echo ($row->order_status =='canceled'?'<b><p style="color:red;">Canceled</p></b>':'');

                   ?></td>
                   <td>
                   	<?php
                    if($row->payment_status =='not_received'){

                     echo '<b><center style="color:red;">'.ucfirst($row->payment_method_name).'<br>'.ucfirst($row->payment_status =='not_received'?'Due':'').'</center></b>'; 
                    }

                    if($row->payment_status =='received'){

                     echo '<b><center style="color:blue;">'.ucfirst($row->payment_method_name).'<br>'.ucfirst($row->payment_status =='received'?'Received':'').'</center></b>'; 
                    }

                    ?>
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