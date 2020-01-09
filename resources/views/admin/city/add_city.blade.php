@extends('admin.layouts.default')
@section('title','Update City')
@section('content')
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
      <div class="row1">
        <div class="col-md-12">
          <!-- Horizontal Form -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title"><?php //echo $page_title; ?></h3>
            </div>
            
            
            <div class="col-xs-12">
          		
            </div>
            <?php //print_r($cms_detail); ?>
            
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal" id="frm_user" name="frm_user" method="post" action="/admin/city/add-city-data/" enctype="multipart/form-data">
              <div class="box-body">
                @csrf
                

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">State Name</label>
                  <div class="col-sm-9">
                    <select name="state_id" id="midnight_delivery" class="form-control" disabled>
                        <option value="">Select State</option>
                        <?php foreach($getAllstate as $state): ?>
                        <option value="<?=$state->id;?>" <?=$state->id == $city_detail->state_id ? ' selected="selected"' : '';?>><?=$state->state_name;?></option>
                      <?php endforeach;?>
                        
                    </select>
                  </div>
          </div>
              
             <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">City Name <span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" id="" name="city_name" placeholder="" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($city_detail->city_name?$city_detail->city_name : '');?>" required="" readonly=""/>
                  </div>
              </div>


           <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Midnight Delivery</label>
                  <div class="col-sm-9">
                    <select name="midnight_delivery" id="midnight_delivery" class="form-control">
                        <option value="">Select Midnight Delivery</option>
                        <option value="Yes" <?=$city_detail->midnight_delivery == 'Yes' ? ' selected="selected"' : '';?>>Yes</option>
                        <option value="No" <?=$city_detail->midnight_delivery == 'No' ? ' selected="selected"' : '';?>>No</option>
                    </select>
                  </div>
          </div>

          <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Delivery Frequency</label>
                  <div class="col-sm-9">
                    <select name="delivery_frequency" id="midnight_delivery" class="form-control">
                        <option value="">Select Delivery Frequency</option>
                        <option value="same_day" <?=$city_detail->delivery_frequency == 'same_day' ? ' selected="selected"' : '';?>>Same Day</option>
                        <option value="next_day" <?=$city_detail->delivery_frequency == 'next_day' ? ' selected="selected"' : '';?>>Next Day</option>

                        <option value="day_after" <?=$city_detail->delivery_frequency == 'day_after' ? ' selected="selected"' : '';?>>Day After</option>

                    </select>
                  </div>
          </div>




        <input type="hidden" name="city_id" value="<?php echo ($city_detail->id?$city_detail->id : '');?>">
               
                
              </div>
              <!-- /.box-body -->
			  <?php $back_link = '/admin/city'; ?>
              <div class="box-footer">
              	<div class="col-sm-8">


                    <a class="btn btn-default pull-right" href="<?php echo $back_link; ?>" style="margin-right:10px;">Cancel</a>
                    <button type="submit" class="btn btn-info pull-right" style="margin-right:10px;">Submit</button>
                  </div>
              </div>
              <!-- /.box-footer -->
            </form>

              <form class="form-horizontal" id="frm_delivery" name="frm_user" method="post" action="/admin/city/add-delivery-data" enctype="multipart/form-data">
               @csrf
              <div class="box-body">

              <div class="form-group">
                  <label for="inputEmail3 clockpicker" class="col-sm-3 control-label">From Time<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" id="from_time" name="from_time" placeholder="" class="col-xs-10 col-sm-5 form-control" value="" readonly="" />
                  </div>
              </div>

              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">To Time<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" id="single-input" name="to_time" placeholder="" class="col-xs-10 col-sm-5 form-control" value="" readonly="" />
                  </div>
              </div>

              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Delivery Charge<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" id="" name="delivery_charge" placeholder="Delivery Charge" class="col-xs-10 col-sm-5 form-control" value=""/>
                  </div>
              </div>

              <input type="hidden" name="city_id" value="{{request()->route('city_id')}}">
              <input type="hidden" name="delivery_id" id="delivery_id" value="">
              <div class="box-footer">
                <div class="col-sm-8">
                   <button type="submit" class="btn btn-info pull-right" style="margin-right:10px;">Submit</button>
                  </div>
              </div>


      </div>
    </form>

            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>SL #</th>
                  <th>City Name</th>
                  <th>From Time</th>
                  <th>To Time</th>
                  <th>Delivery Charge</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                 <?php

        if($AllDeliveryCharge)
        {
        $startRecord ='0';
        $i = '1';
          foreach($AllDeliveryCharge as $row1)
          {
            //$editLink = str_replace("{{ID}}",$recordset[$i]['id'],$edit_link);
            //$deleteLink = str_replace("{{ID}}",$recordset[$i]['id'],$delete_link);
            //$activeLink = str_replace("{{ID}}",$recordset[$i]['id'],$active_link);
            $editLink = 'admin/category/add_category/'.$row1->id;
        ?>
                <tr id="tr<?php echo $row1->id; ?>">
                  <td><?php echo $i; ?></td>
                 
                  <td><?php echo $row1->city_id; ?></td>
                  <td><?php echo $row1->from_time; ?></td>
                 <td><?php echo $row1->to_time; ?></td>
                  <td><?php echo $row1->delivery_charge; ?></td>
                  <td><a href="javascript:void(0);" onclick="change_delivery_status('<?php echo $row1->id; ?>');" id="cng_status<?php echo $row1->id; ?>" class="<?php echo ($row1->delivery_status =='Active')?'activebutton':'inactivebutton';?>"><?php echo ($row1->delivery_status =='Active')?'Active':'Inactive';?></a></td>

                  <td>
                  <a class="btn btn-xs btn-info" href="#" title="Update Delivery Charge" data-toggle="modal" data-target="#myModal" onclick="GetDeliveryCharge('<?php echo $row1->id; ?>')"><i class="ace-icon fa fa-pencil bigger-120"></i> </a> 
                 
                 <!-- <a class="btn btn-xs btn-danger" href="javascript:void(0);" title="Delete User" onclick="delete_user('<?php //echo $row1['id']; ?>');"> <i class="ace-icon fa fa-trash-o bigger-120"></i> </a> -->
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

            </div>
          <!-- /.box -->
        </div>
      </div>
      <!-- /.row1 -->
    </section>
    <!-- /.content -->
  </div>

 <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Update Delivery Charge </h4>
        </div>
        <div class="modal-body">

          <form class="form-horizontal" id="frm_update_delivery" name="frm_user" method="post" action="/admin/city/add-delivery-data" enctype="multipart/form-data">
            @csrf
              <div class="box-body">

              <div class="form-group">
                  <label for="inputEmail3 clockpicker" class="col-sm-3 control-label">From Time<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" id="update_from_time" name="from_time" placeholder="" class="col-xs-10 col-sm-5 form-control" value="" readonly="" required="" />
                  </div>
              </div>

              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">To Time<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" id="update_to_time" name="to_time" placeholder="" class="col-xs-10 col-sm-5 form-control" value="" readonly="" required="" />
                  </div>
              </div>

              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Delivery Charge<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" id="update_delivery_charge1" name="delivery_charge"value="1" placeholder="Delivery Charge" class="col-xs-10 col-sm-5 form-control" required=""/>
                  </div>
              </div>

              <input type="hidden" name="city_id" value="{{request()->route('city_id')}}">
              <input type="hidden" name="delivery_id" id="update_delivery_id" value="">

              <div class="box-footer">
                <div class="col-sm-8">
                   <button type="submit" class="btn btn-info pull-right" style="margin-right:10px;">Submit</button>
                  </div>
              </div>


      </div>
    </form>
          


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
<!-- End Modal -->
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
            midnight_delivery: {
                validators: {
                    notEmpty: {
                        message: 'Midnight Delivery is required and cannot be empty'
                    }
                }
            },

           delivery_frequency: {
                validators: {
                    notEmpty: {
                        message: 'Delivery Frequency is required and cannot be empty'
                    }
                }
            },
          }
    });
});


function change_delivery_status(id){
  
  if(confirm("Are you sure to change status of this record?"))
  {
    $.ajax({
      url : '/admin/city/change-delivery-status',
      type : 'POST',
      data : {'delivery_id':id},
      //dataType : 'json',
      beforeSend : function(jqXHR, settings ){
        //alert(url);
      },
      success : function(data, textStatus, jqXHR){
        //alert(data);
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

</script>

<script type="application/javascript">
$(document).ready(function() {
    $('#frm_delivery').bootstrapValidator({
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
            from_time: {
                validators: {
                    notEmpty: {
                        message: 'From time is required and cannot be empty'
                    }
                }
            },

           to_time: {
                validators: {
                    notEmpty: {
                        message: 'To time is required and cannot be empty'
                    }
                }
            },

          delivery_charge: {
                validators: {
                    notEmpty: {
                        message: 'Delivery charge is required and cannot be empty'
                    }
                }
            },

          }
    });
});

 function GetDeliveryCharge(val){
  var city_id = '{{request()->route('city_id')}}';
  $.ajax({
      type:'POST',
      url:'/admin/city/GetDeliveryChargeDetail',
      data:{'id':val,'city_id':city_id},
      dataType: "json",
      success: function(data){
       $('#update_from_time').val(data[0].from_time);
       $('#update_to_time').val(data[0].to_time);
       $('#update_delivery_charge1').val(data[0].delivery_charge);
       $('#update_delivery_id').val(data[0].id);

      }
  });

 }

</script>
<script type="text/javascript">
 var input = $('#single-input').clockpicker({
  placement: 'bottom',
  align: 'left',
  autoclose: true,
  'default': 'now'
});

 var input = $('#from_time').clockpicker({
  //twelvehour: true,
  placement: 'bottom',
  align: 'left',
  autoclose: true,
  'default': 'now'
});

 var input = $('#update_from_time').clockpicker({
  placement: 'bottom',
  align: 'left',
  autoclose: true,
  'default': 'now'
});

 var input = $('#update_to_time').clockpicker({
  placement: 'bottom',
  align: 'left',
  autoclose: true,
  'default': 'now'
});

</script>

@stop