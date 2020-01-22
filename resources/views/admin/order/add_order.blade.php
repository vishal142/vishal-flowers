@extends('admin.layouts.default')
@section('title','Update Order')
@section('content')
<style>
  .text-color-red {
    color: red;
    font-weight: bold;
}

.text-color-blue {
    color: blue;
    font-weight: bold;
}

.text-color-green {
    color: green;
    font-weight: bold;
}


</style>
<!--end Sidebar-->
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

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-4">
          <!-- Horizontal Form -->
          <div class="box box-info" style="min-height: 789px;">
            <div class="box-header with-border">
              <h3 class="box-title">Order Detail</h3>
            </div>
            
            
            <div class="col-xs-12">
			     
            </div>

            <?php //print_r($orderDetail); ?>
            
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal" id="frm_user" name="frm_user" method="post" action="<?php '/admin/order/order_data/'; ?>" enctype="multipart/form-data">
              <div class="box-body">
                
             <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Order Number<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="oder_no" placeholder="Category Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($orderDetail->oder_no?$orderDetail->oder_no : '');?>" onblur="chk_categoery(this.value)" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Invoice Number<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="invoice_no" placeholder="Invoice Number" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($orderDetail->invoice_no?$orderDetail->invoice_no : '');?>" onblur="chk_categoery(this.value)" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Order Date Time<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="order_date" placeholder="Order Date" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($orderDetail->invoice_no?date('d-M-Y H:i:s',strtotime($orderDetail->order_date_time)): '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Order Amount<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="order_amount" placeholder="Order Amount" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($orderDetail->order_amount?$orderDetail->order_amount: '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <?php 
                if($orderDetail->order_status =='pending'){
                  $text_color = 'text-color-red';

                }

                if($orderDetail->order_status =='payment_due'){
                  $text_color = 'text-color-red';

                }

                if($orderDetail->order_status =='delivered'){
                  $text_color = 'text-color-blue';

                }


                if($orderDetail->order_status =='confirm'){
                  $text_color = 'text-color-green';

                }

                if($orderDetail->order_status =='canceled'){
                  $text_color = 'text-color-red';

                }

                if($orderDetail->payment_status =='received'){
                  $text_color1 = 'text-color-blue';

                }

                if($orderDetail->payment_status =='not_received'){
                  $text_color1 = 'text-color-red';

                }

                ?>
       <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Order Status<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="order_amount" placeholder="Order Amount" class="col-xs-10 col-sm-5 form-control <?php echo $text_color;?>" value="<?php echo ($orderDetail->order_status?ucfirst($orderDetail->order_status): '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Payment Status<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="order_amount" placeholder="Order Amount" class="col-xs-10 col-sm-5 form-control <?php echo $text_color1;?>" value="<?php echo ($orderDetail->payment_status?ucfirst($orderDetail->payment_status): '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Delivery Date<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="order_amount" placeholder="Order Amount" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($orderDetail->delivery_date?date('d-M-Y',strtotime($orderDetail->delivery_date)): '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>


                <input type="hidden" name="order_id" value="<?php echo ($orderDetail->id?$orderDetail->id : '');?>">
               
                
              </div>
              <!-- /.box-body -->
			      <?php $back_link = '/admin/order';?>
              <div class="box-footer">
              	<div class="col-sm-8">
                  <a class="btn btn-default pull-right" href="<?php echo $back_link; ?>" style="margin-right:10px;">Cancel</a>
                    <button type="submit" class="btn btn-info pull-right" style="margin-right:10px;" id="sub">Submit</button>
                  </div>
              </div>
              <!-- /.box-footer -->
            </form>
          </div>
          <!-- /.box -->
        </div>
        <div class="col-md-4">
          <!-- Horizontal Form -->
          <div class="box box-info" style="min-height: 789px;">
            <div class="box-header with-border">
              <h3 class="box-title">Receiver Detail</h3>
            </div>
            <?php //dd($receiverDetail); ?>
            
            <!-- /.box-header -->
            <!-- form start -->
            
              <div class="box-body">
                
             <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Receiver name<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="receiver_name" placeholder="Receiver name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($receiverDetail->receiver_name?$receiverDetail->receiver_name : '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Receiver Address<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <textarea name="receiver_addess" placeholder="Receiver Addess" class="col-xs-10 col-sm-5 form-control" readonly="" /><?php echo ($receiverDetail->receiver_address?$receiverDetail->receiver_address: '');?></textarea>
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">City<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="city" placeholder="City Name" class="col-xs-10 col-sm-5 form-control" value="" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Area<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="area" placeholder="Order Date" class="col-xs-10 col-sm-5 form-control" value="" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Zip Code<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="zip_code" placeholder="Zip Code" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($receiverDetail->zip_code?$receiverDetail->zip_code: '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">State<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="state_name" placeholder="State Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($receiverDetail->state_name?$receiverDetail->state_name: '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Country<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="country_name" placeholder="Country Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($receiverDetail->country_name?$receiverDetail->country_name: '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Phone No<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="receiver_mobile" placeholder="Phone No" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($receiverDetail->receiver_mobile?$receiverDetail->receiver_mobile: '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Message on card<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <textarea name="message_on_card" placeholder="Message on card" class="col-xs-10 col-sm-5 form-control" readonly=""><?php echo ($receiverDetail->message_on_card?$receiverDetail->message_on_card: '');?></textarea>
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Signature Name <span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="order_amount" placeholder="Signature Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($receiverDetail->signature?$receiverDetail->signature: '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Preffer Delivery Time<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="order_amount" placeholder="Order Amount" class="col-xs-10 col-sm-5 form-control" value="" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Location Type<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="order_amount" placeholder="Location Type" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($receiverDetail->location_type?$receiverDetail->location_type: '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>



                <input type="hidden" name="order_id" value="<?php echo ($orderDetail->id?$orderDetail->id: '');?>">
               
                
              </div>
              <!-- /.box-body -->

              <!-- /.box-footer -->
            </form>
          </div>
          <!-- /.box -->
        </div>
        <div class="col-md-4">
          <!-- Horizontal Form -->
          <div class="box box-info" style="min-height: 789px;">
            <div class="box-header with-border">
              <h3 class="box-title">Sender Detail</h3>
            </div>
             <?php //print_r($orderDetail);

             $senderData = (new \App\Library\helper)->perticularFlied('tbl_sender','*',array('id'=>$orderDetail->sender_id))[0];
             ?>
            
            <!-- /.box-header -->
            <!-- form start -->
            <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Sender Name<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="sender_name" placeholder="Sender Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($senderData->sender_name?$senderData->sender_name : '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Address<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <textarea name="sender_address" placeholder="Address" class="col-xs-10 col-sm-5 form-control" readonly="" /><?php echo ($senderData->sender_address ? $senderData->sender_address : '');?></textarea>  
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">City<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="city_name" placeholder="City" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($senderData->city_name?$senderData->city_name: '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Gstin No<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="gstin" placeholder="Gstin No" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($senderData->gstin?$senderData->gstin: '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">State<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="state_name" placeholder="State" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($senderData->state_name ? $senderData->state_name : '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Country<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="country" placeholder="Country" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($senderData->country ? ucfirst($senderData->country) : '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Phone<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="phone_no" placeholder="Phone" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($senderData->phone_no?$senderData->phone_no: '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Email id<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="email_id" placeholder="Order Amount" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($senderData->email_id?$senderData->email_id : '');?>" readonly="" /> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>


                <input type="hidden" name="order_id" value="<?php echo ($orderDetail->id?$orderDetail->id: '');?>">
               
                
              </div>
              <!-- /.box-body -->
            
              <!-- /.box-footer -->
        </div>

        <div class="clearfix"></div>

      <div class="col-md-4">
                <!-- Horizontal Form -->
                <div class="box box-info" style="min-height: 373px;">
                  <div class="box-header with-border">
                    <h3 class="box-title">Send Mail</h3>
                  </div>
                  

                  <?php //print_r($orderDetail); ?>
                  
                  <!-- /.box-header -->
                  <!-- form start -->
                  <?php  //print_r($receiverDetail['email']);?>
                  
                    <div class="box-body">
                      
                               <div class="form-group">
                                    <a href="" class="col-sm-12 control-label" data-toggle="modal" data-target="#updateOrderModal" onclick="OrderSatatus('<?php echo ($orderDetail->id?$orderDetail->id : '');?>','<?php echo ($receiverDetail->email?$receiverDetail->email : '');?>')">Send Confirmation Mail</a>
                                </div>

                              <?php 
                              $deliveryData = (new \App\Library\helper)->perticularFlied('tbl_delivery_charges','*',array('id'=>$orderDetail->delivery_charged_id))[0];

                                $deliveryTime = $deliveryData->from_time.' Hrs' .' - '.$deliveryData->to_time.' Hrs';
                               ?>

                              <div class="form-group">
                                    <a href="" class="col-sm-10 control-label" data-toggle="modal" data-target="#ForwardOrderModal" onclick="OrderForward('<?php echo ($orderDetail->id?$orderDetail->id : '');?>','<?php echo ($orderDetail->oder_no?$orderDetail->oder_no : '');?>','<?php echo ($deliveryTime?$deliveryTime: '');?>','<?php echo ($orderDetail->delivery_date?$orderDetail->delivery_date : '');?>')">Forward Order</a>
                                </div>

                            <?php if($orderDetail->order_status =='delivered'){
                            }else{?>
                            <div class="form-group">
                                    <a href="" class="col-sm-6 control-label" data-toggle="modal" data-target="#DeliveredOrderModal" onclick="OrderDelivered('<?php echo ($orderDetail->id?$orderDetail->id: '');?>','<?php echo ($orderDetail->oder_no?$orderDetail->oder_no : '');?>','<?php echo ($deliveryTime?$deliveryTime: '');?>')">Order Deliverd</a>
                            </div>
                          <?php };?>
                     </div>
                    <!-- /.box-body -->
                  
                    <!-- /.box-footer -->
                 
                </div>
                <!-- /.box -->
      </div>

      <div class="col-md-8 pull-right">
          <!-- Horizontal Form -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">Product Price Description</h3>
            </div>
            <div class="box-body">
             <?php 

             $orderDetailData = (new \App\Library\helper)->perticularFlied('tbl_order_detail','*',array('order_id'=>$orderDetail->id));
             //print_r($orderDetailData);
             ?>
            
            <!-- /.box-header -->
            <!-- form start -->
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>SL #</th>
                  <th>Image</th>
                  <th>Name of product / Services</th>
                  <th>Quantity</th>
                  <th>Item Price</th>
                  <th>Taxable Value/Sub Total</th>
                </tr>
                </thead>
                <tbody>
                  <?php
                  if($orderDetailData)
                  {
                  
                  //print_r($orderDetailData);
                  $startRecord ='0';
                  $total = '0';
                  $i = '1';
                  foreach($orderDetailData as $row)
                  {
                  $total += $row->sub_total_amount;


                  

                  ?>
                  <tr id="tr<?php echo $row->id;?>">
                  <td><?php echo $i; ?></td>
                  <?php if($row->item_id !='0'){
                    $item_name = (new \App\Library\helper)->perticularFlied('tbl_item',array('item_image'),array('id'=>$row->item_id));
                   ?>
                    <td><img src="{{ URL::to('/uploads/item_image/'.$item_name[0]->item_image)}}" width="100" height="80"></td>

                   <?php }else{ ?>
                    <td></td>

                   <?php } ?>
                  

                  <td><?php echo ucfirst($row->item_name);?></td>
                  <td><?php echo $row->quantity; ?></td>
                  <td><?php echo $row->item_price; ?></td>
                  <td><?php echo $row->sub_total_amount; ?></td>
                  </tr>
                  <?php
                  $i++;
                  }?>

                  <tr>
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><?php echo number_format($total,2); ?></td>

                  </tr>


                  <?php }
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
            
              <!-- /.box-footer -->
            </div>
        </div>

        

      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>

  <!-- Update Order Model -->
  <div class="modal fade" id="updateOrderModal" role="dialog">
    <div class="modal-dialog" style="width:1000px;">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Send Order Confirmation </h4>
        </div>
        <div class="modal-body">

          <form class="form-horizontal" id="frm_update_delivery" name="order_confirm" method="post" action="" enctype="multipart/form-data">
              <div class="box-body">

              <div class="form-group">
                  <label for="inputEmail3 clockpicker" class="col-sm-3 control-label">Email To<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" id="receiver_email" name="receiver_email" placeholder="" class="col-xs-10 col-sm-5 form-control" value="" readonly="" />
                  </div>
              </div>

              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Email Subject<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" id="email_subject" name="email_subject" placeholder="" class="col-xs-10 col-sm-5 form-control" value="Saesha Flower - Order Confirmation" readonly="" />
                  </div>
              </div>

              
              <input type="hidden" name="order_id" value="{{Request::segment(3)}}">
              

              <div class="box-footer">
                <div class="col-sm-8">
                   <button type="submit" class="btn btn-info pull-right" style="margin-right:10px;">Submit</button>
                  </div>
              </div>
            <div id="email_tamplete"></div>

        </div>
        </form>
          


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
  </div>
  <!---End Model -->
      
    </div>
  </div>


@section('script')
@stop

<script type="application/javascript">
$(document).ready(function() {
    $('#frm_user').bootstrapValidator({
  		framework: 'bootstrap',
		  excluded: [':disabled'],
        err: {
            container: function($field, validator) {
                return $field.parent().next('#messages');
            }
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
           category_name: {
                validators: {
                    notEmpty: {
                        message: 'Category name is required and cannot be empty'
                    }
                }
            },
      
       description: {
                validators: {
                    notEmpty: {
                        message: 'Description is required and cannot be empty'
                    }
                }
            },
		
         }
    });
});

function chk_categoery(val){
 var cat_id ='<?php echo ($orderDetail->id?$orderDetail->id : '');?>';
 var v_error     = '1px solid #f32517';
 var v_ok        = '1px solid green';
 $.ajax({
    type:"POST",
    url:'/admin/category/category_check',
    data:{'cat_id':cat_id,'category_name':val},
    success: function(data){
      if(data==1)
        { 
          //$("#name").val('');
           $("#name").css('border',v_error);
           $('#error').show();   
          $('#error').html("Category name already exists").slideDown(1000);
          $('#sub').prop('disabled',true);
          return false; 
           
           //$('.alert_mssg').html("Duplicate location").fadeIn(1000).fadeOut(3000);
          //$('#update_location_'+btn_val).val('');
        }else{
          $("#name").css('border',v_ok);
          $('#error').slideUp(1000);
          $('#sub').prop('disabled',false);
        }
    }
 });
}

function OrderSatatus(val,receiver_email){
    $.ajax({
      type:'POST',
      url:'/admin/order/email-tamplate',
      data:{'order_id':val},
      //dataType: "json",
      success: function(data){
        $("#email_tamplete").html(data.html);
        $('#receiver_email').val(receiver_email);
      }
  });
}

function OrderForward(val,order_no,delivery_time,delivery_date){

  $.ajax({
      type:'POST',
      url:'/admin/order/order-forward',
      data:{'order_id':val},
      //dataType: "json",
      success: function(data){
        $("#forward_order").html(data.html);
        $('#forward_order_number').html(order_no);
        $('#forword_email_subject').val('Order from Expressssions - Order no '+order_no);
        $('#delivery_date').val(delivery_date);
        $('#delivery_time_florist').val(delivery_time);
        
      }
  });
  

}

function OrderDelivered(val,order_no,delivery_time){
 $.ajax({
      type:'POST',
      url:'/admin/order/order_delivery',
      data:{'order_id':val},
      //dataType: "json",
      success: function(data){
        $('#delivered_order_number').val('Order Number - '+order_no);
        
        
      }
  });

}

</script>
@stop