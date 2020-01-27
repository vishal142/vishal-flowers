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
            <form class="form-horizontal" id="frm_user" name="frm_user" method="post" action="/admin/slider/add-slider-data" enctype="multipart/form-data">
              <div class="box-body">
                @csrf
              
             <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Slider Name<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="slider_name" placeholder="Slider Name" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($SliderDetail->name?$SliderDetail->name:'');?>" onblur=""/> 
                    </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label"><?php echo($SliderDetail->id ==''?'Add Slider':'Update Slider');?> Image <span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="file" id="" name="sliderfile" placeholder="" class="col-xs-10 col-sm-5 form-control"/>
                  </div>
                </div>

                <?php if($SliderDetail->id !=''){ ?>

                      <div class="form-group">
                          <label for="inputEmail3" class="col-sm-3 control-label">Slider Image</label>
                          <div class="col-sm-9">
                          <img src="{{URL::to('uploads/slider/'.$SliderDetail->image)}}" height="200" width="800">
                          </div>
                      </div>

                <?php } ?>

                


        <input type="hidden" name="slider_id" value="<?php echo ($SliderDetail->id?$SliderDetail->id:'');?>">
               
                
              </div>
              <!-- /.box-body -->
        <?php $back_link = '/admin/slider'; ?>
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
           slider_name: {
                validators: {
                    notEmpty: {
                        message: 'Slider name is required and cannot be empty'
                    }
                }
            },
            

            <?php if($SliderDetail->id ==''){ ?>
            sliderfile:{
                validators: {
                            notEmpty: {
                                message: 'Slider image is required and cannot be empty'
                            }
                        }
              },

            <?php } ?>
           
    
         }
    });
});
</script>
@stop