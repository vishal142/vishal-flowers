@extends('admin.layouts.default')
@section('title','Add item')
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

            <?php //print_r($ItemDetail->shown_short_description); ?>
            
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal" id="frm_item" name="frm_item" method="post" action="/admin/item/add-item-data" enctype="multipart/form-data">
              <div class="box-body">
                @csrf
              
             <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Item Slug</label>
                  <div class="col-sm-9">
                    <input type="text" id="" name="alias" placeholder="" class="col-xs-10 col-sm-5 form-control" value="" readonly/>
                  </div>
                </div>
                <div class="form-group has-feedback">
                  <label for="inputEmail3" class="col-sm-3 control-label">Category<span class="red">*</span></label>
                  <div class="col-sm-9">
                   <select name="category_id" id="category_id" class="form-control" onchange="select_sub_cat(this.value);" data-bv-field="category_id">
                   <option value="">Select Category </option>
                   <?php foreach($allCategory as $cat){
                    if($cat->id == $ItemDetail->category_id){
                      $selected = 'selected';
                      }else{
                        $selected ='';
                      }
                    
                    ?>
                   <option value="<?php echo $cat->id;?>" <?php echo $selected;?>><?php echo $cat->category_name;?></option>

                   <?php } ?>
                                      
                                      
               </select>
               <input type="hidden" name="" id="selected_category_id" value="<?php echo $ItemDetail->category_id;?>">
                     
                </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Sub Category<span class="red">*</span></label>
                  <div class="col-sm-9">
                   <select name ="add_sub_category_id" id="add_sub_category_id" class="form-control chosen-select">
                       <option value="">Select Sub Category </option>
                       
                   </select>
                   <input type="hidden" name="" id="selected_sub_cat_id" value="<?php echo $ItemDetail->sub_cat_id;?>">
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Item Name<span class="red">*</span></label>
                  <div class="col-sm-9">
                  	<input type="text" id="item_name" name="item_name" placeholder="item Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($ItemDetail->item_name?$ItemDetail->item_name:'');?>" />
                   
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Item Price<span class="red">*</span></label>
                  <div class="col-sm-9">
                  	<input type="text" id="item_price" name="item_price" placeholder="item Price" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($ItemDetail->item_price?$ItemDetail->item_price:'');?>" />
                   
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Special Price<span class="red">*</span></label>
                  <div class="col-sm-9">
                  	<input type="text" id="special_price" name="special_price" placeholder="item Special" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($ItemDetail->secial_price?$ItemDetail->secial_price:'');?>" />
                   
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Item Stock<span class="red">*</span></label>
                  <div class="col-sm-9">
                  	<input type="text" id="stock" name="stock" placeholder="Stock" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($ItemDetail->stock?$ItemDetail->stock:'');?>" />
                   
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">As Shown Description</label>
                  <div class="col-sm-9">
                    <input type="text" name="shown_short_description" placeholder="As Shown Description" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($ItemDetail->shown_short_description?$ItemDetail->shown_short_description : '');?>" />
                   
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Double The Quantity Price</label>
                  <div class="col-sm-9">
                    <input type="text" name="double_qty_price" placeholder="Double The Quantity Price" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($ItemDetail->double_the_quantity_price?$ItemDetail->double_the_quantity_price : '');?>" />
                   
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Double The Quantity Description</label>
                  <div class="col-sm-9">
                    <textarea name="double_qty_description" placeholder="Meta Tilte" class="col-xs-10 col-sm-5 form-control"/><?php echo htmlentities(($ItemDetail->double_qty_description?$ItemDetail->double_qty_description : ''));?></textarea>
                     
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Upgrade Option Price/Glass Vase</label>
                  <div class="col-sm-9">
                    <input type="text" name="upgrade_option_price" placeholder="Upgrade Option Price" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($ItemDetail->upgrade_option_price?$ItemDetail->upgrade_option_price : '');?>" />
                   
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Upgrade Option Description</label>
                  <div class="col-sm-9">
                    <textarea name="upgrade_option_description" placeholder="Meta Tilte" class="col-xs-10 col-sm-5 form-control"/><?php echo htmlentities(($ItemDetail->upgrade_option_description?$ItemDetail->upgrade_option_description : ''));?></textarea>
                     
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Meta Tilte</label>
                  <div class="col-sm-9">
                    <textarea name="meta_tilte" placeholder="Meta Tilte" class="col-xs-10 col-sm-5 form-control"/><?php echo htmlentities(($ItemDetail->meta_tilte?$ItemDetail->meta_tilte : ''));?></textarea>
                     
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Meta Description<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <textarea name="meta_description" placeholder="Meta Description" class="col-xs-10 col-sm-5 form-control"/><?php echo htmlentities(($ItemDetail->meta_description?$ItemDetail->meta_description : ''));?></textarea>
                     
                  </div>
                </div>
              
               <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Item Description<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <textarea name="item_description" placeholder="Description" class="col-xs-10 col-sm-5 form-control"/><?php echo htmlentities(($ItemDetail->description?$ItemDetail->description : ''));?></textarea>
                     
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Item Image <span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="file" name="item_image" placeholder="Item Image" class="col-xs-10 col-sm-5 form-control" />
                   
                  </div>
                </div>
                <?php if($ItemDetail->id !=''){ ?>

                  <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Item Image</label>
                        <div class="col-sm-9">
                          <img src="" height="100" width="150">
                        </div>
                  </div>

            <?php } ?>


            <?php echo $ItemDetail->occasion_type;?>

            <div class="form-group">
              <div class="col-sm-9">
                  <label for="inputEmail3" class="col-sm-3 control-label">Occasion Type</label>
                  <?php 
                  $occasion_type = [];
                  foreach($occasionTpye as $os){
                    $occasion_type = $ItemDetail->occasion_type;
                    //print_r().'<br>';
                    //exit;
                    $occasion = explode(',',$occasion_type);
                    //print_r($occasion_type);
                    //exit;
                    $checked = in_array($os->id,$occasion);
                    ?>
                    <?php echo $os->sub_cat_name; ?><input type="checkbox" name="occasionType[]" id="tag_1" value="<?php echo $os->id;?>" <?php echo ($checked ? 'checked' : '');?>>
                  <?php }?>

                 
                </div>
              </div>

                


        <input type="hidden" name="sub_category_id" value="<?php echo ($ItemDetail->id?$ItemDetail->id:'');?>">
               
                
              </div>
              <!-- /.box-body -->
			  <?php $back_link = '/admin/item'; ?>
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

  @section('script')
@stop
<script type="application/javascript">
$(document).ready(function() {
	select_sub_cat($('#selected_category_id').val());
    $('#frm_item').bootstrapValidator({
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

            add_sub_category_id: {
                validators: {
                    notEmpty: {
                        message: 'Sub Category name is required and cannot be empty'
                    }
                }
            },
            item_name: {
                validators: {
                    notEmpty: {
                        message: 'Item name is required and cannot be empty'
                    }
                }
            },
            item_price: {
	                validators: {
	                    notEmpty: {
	                        message: 'Item Price is required and cannot be empty'
	                    }
	                }
	            },

	        special_price: {
                validators: {
                    notEmpty: {
                        message: 'Special Price is required and cannot be empty'
                    }
                }
            },
            stock: {
                validators: {
                    notEmpty: {
                        message: 'Item Stock is required and cannot be empty'
                    }
                }
            },

            meta_description: {
                validators: {
                    notEmpty: {
                        message: 'Meta Description is required and cannot be empty'
                    }
                }
            },

            item_description: {
                validators: {
                    notEmpty: {
                        message: 'Item Description is required and cannot be empty'
                    }
                }
            },
            // item_image :{
            // 	validators: {
            //         notEmpty: {
            //             message: 'Item Image is required and cannot be empty'
            //         }
            //     }

            // }

        }
    });
});

 function select_sub_cat(val){
 	var id = $('#selected_sub_cat_id').val();
 	$.ajax({
	    method:'POST',
	    url:'/admin/item/selected-sub-cat',
	    data:{'category_id':val,'sub_cat_id':id,'_token':$('meta[name="csrf-token"]').attr('content')},
	    success:function(data){
	      //alert(data);
	      $('#add_sub_category_id').html(data).trigger('chosen:updated');

	    }
	  });


 }


</script>


@stop