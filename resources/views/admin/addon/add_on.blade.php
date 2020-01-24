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
            <form class="form-horizontal" id="frm_user" name="frm_user" method="post" action="/admin/addon/add-addon-data" enctype="multipart/form-data">
              <div class="box-body">
                @csrf
              
             <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Addon Name<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="addon_name" placeholder="Addon Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($AddonDetail->addon_name?$AddonDetail->addon_name:'');?>" onblur=""/> 
                    </div>

                </div>

               


                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Price<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="price" placeholder="Price" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($AddonDetail->addon_price?$AddonDetail->addon_price:'');?>" onblur=""/> 
                    </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label"><?php echo($AddonDetail->id ==''?'Add':'Update');?> Image <span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="file" id="" name="addonfile" placeholder="" class="col-xs-10 col-sm-5 form-control"/>
                  </div>
                </div>

                <?php if($AddonDetail->id !=''){ ?>

                      <div class="form-group">
                          <label for="inputEmail3" class="col-sm-3 control-label">Addon Image</label>
                          <div class="col-sm-9">
                          <img src="{{URL::to('uploads/addon/'.$AddonDetail->image)}}" height="200" width="200">
                          </div>
                      </div>

                <?php } ?>

                


        <input type="hidden" name="addon_id" value="<?php echo ($AddonDetail->id?$AddonDetail->id:'');?>">
               
                
              </div>
              <!-- /.box-body -->
        <?php $back_link = '/admin/addon'; ?>
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
           addon_name: {
                validators: {
                    notEmpty: {
                        message: 'Addon name is required and cannot be empty'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: 'Price is required and cannot be empty'
                    }
                }
            },

            <?php if($AddonDetail->id ==''){ ?>
            addonfile:{
                validators: {
                            notEmpty: {
                                message: 'Addon image is required and cannot be empty'
                            }
                        }
              },

            <?php } ?>
           
    
         }
    });
});
</script>
@stop