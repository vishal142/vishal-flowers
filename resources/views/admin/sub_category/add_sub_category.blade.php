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

            <?php //print_r($SubCategoryDetail->cat_id); ?>
            
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal" id="frm_user" name="frm_user" method="post" action="/admin/sub-category/add_sub_category_data" enctype="multipart/form-data">
              <div class="box-body">
                @csrf
              
             <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Sub-Category Slug</label>
                  <div class="col-sm-9">
                    <input type="text" id="" name="alias" placeholder="" class="col-xs-10 col-sm-5 form-control" value="" readonly/>
                  </div>
                </div>
                <div class="form-group has-feedback">
                  <label for="inputEmail3" class="col-sm-3 control-label">Category<span class="red">*</span></label>
                  <div class="col-sm-9">
                   <select name="category_id" id="category_id" class="form-control" onchange="" data-bv-field="category_id">
                   <option value="">Select Category </option>
                   <?php foreach($allCategory as $cat){
                    if($cat->id == $SubCategoryDetail->cat_id){
                      $selected = 'selected';
                      }else{
                        $selected ='';
                      }
                    
                    ?>
                   <option value="<?php echo $cat->id;?>" <?php echo $selected;?>><?php echo $cat->category_name;?></option>

                   <?php } ?>
                                      
                                      
               </select>
                     
                </div>
                </div>
                
                

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Sub-Category Name<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="sub_category_name" placeholder="Sub-Category Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($SubCategoryDetail->sub_cat_name?$SubCategoryDetail->sub_cat_name:'');?>" onblur="chk_categoery(this.value)"/> 
                    <span id="error" style="display:block; color: red"></span>
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Description<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <textarea name="description" placeholder="Description" class="col-xs-10 col-sm-5 form-control"/><?php echo ($SubCategoryDetail->description?$SubCategoryDetail->description:'');?></textarea>
                     
                  </div>
                </div>

                


        <input type="hidden" name="sub_category_id" value="<?php echo ($SubCategoryDetail->id?$SubCategoryDetail->id:'');?>">
               
                
              </div>
              <!-- /.box-body -->
			  <?php $back_link = '/admin/sub-category'; ?>
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
           category_id: {
                validators: {
                    notEmpty: {
                        message: 'Category name is required and cannot be empty'
                    }
                }
            },

            sub_category_name: {
                validators: {
                    notEmpty: {
                        message: 'Sub Category name is required and cannot be empty'
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