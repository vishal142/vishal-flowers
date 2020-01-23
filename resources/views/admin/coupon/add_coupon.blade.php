@extends('admin.layouts.default')
@section('title','Add Category')
@section('content')
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
        <div class="col-md-12">
          <!-- Horizontal Form -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title"></h3>
            </div>
            
            
            <div class="col-xs-12">
			
            </div>

            <?php //dd($CategoryDetail); ?>
            
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal" id="frm_user" name="frm_user" method="post" action="/admin/coupon/add-coupon-data" enctype="multipart/form-data">
              <div class="box-body">
                @csrf
              
             <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Coupon Code<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="coupon_code" placeholder="Category Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($CouponDetail->coupon_code?$CouponDetail->coupon_code:'');?>" onblur=""/> 
                    </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Coupon Type <span class="red">*</span></label>
                  <div class="col-sm-9">
                   <select name ="coupon_type" id="coupon_type" class="form-control" onchange="">
                   <option value="">Select Coupon Type</option>
                   <option value="flat" <?=$CouponDetail->coupon_type == 'flat' ? ' selected="selected"' : '';?>>Flat</option>
                  <option value="percentage" <?=$CouponDetail->coupon_type == 'percentage' ? ' selected="selected"' : '';?>>Percentage</option>
               
               </select>
                      </div>
                </div>


                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Coupon Value<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="number" name="coupon_value" placeholder="Category Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($CouponDetail->coupon_value?$CouponDetail->coupon_value:'');?>" onblur=""/> 
                    </div>

                </div>


                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Description<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <textarea name="description" placeholder="Description" class="col-xs-10 col-sm-5 form-control"/><?php echo ($CouponDetail->description?$CouponDetail->description:'');?></textarea>
                     
                  </div>
                </div>

                


        <input type="hidden" name="coupon_id" value="<?php echo ($CouponDetail->id?$CouponDetail->id:'');?>">
               
                
              </div>
              <!-- /.box-body -->
			  <?php $back_link = '/admin/coupon'; ?>
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
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
<script>
  
   CKEDITOR.replace( '',{
    allowedContent: true,
  });
  </script>

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
           coupon_code: {
                validators: {
                    notEmpty: {
                        message: 'Coupon code is required and cannot be empty'
                    }
                }
            },
            coupon_type: {
                validators: {
                    notEmpty: {
                        message: 'Coupon type is required and cannot be empty'
                    }
                }
            },
            coupon_value: {
                validators: {
                    notEmpty: {
                        message: 'Coupon value is required and cannot be empty'
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
 var cat_id ='';
 var v_error     = '1px solid #f32517';
 var v_ok        = '1px solid green';
 $.ajax({
    type:"POST",
    url:'<?php echo '/admin/category/category_check';?>',
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

</script>

@section('script')
@stop

@stop