@extends('admin.layouts.default')
@section('title','Add Iten Hike Price')
@section('content')
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/resources/demos/style.css">
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

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
        <div class="col-md-12">
          <!-- Horizontal Form -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title"></h3>
            </div>
            
            
            

            <?php //print_r($hikeDetail); ?>
            
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal" id="frm_user" name="frm_user" method="post" action="/admin/hike/hike-price-data" enctype="multipart/form-data">
              <div class="box-body">
                @csrf
              
               <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Title<span class="red">*</span></label>
                  <div class="col-sm-9">
                    <input type="text" name="title" placeholder="Title" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($hikeDetail->title?$hikeDetail->title : '');?>">
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Start Date<span class="red">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input type="text" name="start" placeholder="Start Date" class="col-xs-10 col-sm-5 form-control datepicker" value="<?php echo ($hikeDetail->start_date?$hikeDetail->start_date : '');?>">
                  </div>

                </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">High Percentage<span class="red">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input type="text" name="hike_value" placeholder="High Percentage" class="col-xs-10 col-sm-5 form-control" value="<?php echo ($hikeDetail->hike_value?$hikeDetail->hike_value : '');?>">
                  </div>

                </div>

                


        <input type="hidden" name="id" value="<?php echo ($hikeDetail->id?$hikeDetail->id: '');?>">
               
                
              </div>
              <!-- /.box-body -->
        <?php $back_link = '/admin/hike';?>
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
           title: {
                validators: {
                    notEmpty: {
                        message: 'Title is required and cannot be empty'
                    }
                }
            },
      
       start: {
                validators: {
                    notEmpty: {
                        message: 'Start date is required and cannot be empty'
                    }
                }
            },



      value: {
                validators: {
                    between: {
                        min: 1,
                        max: 99,
                        message: 'The number of floors must be between 1 and 99'
                    },
                    integer: {
                        message: 'The value is not an integer'
                    },
                    notEmpty: {
                        message: 'Parentage is required and cannot be empty'
                    }
                }
            },

    
         }
    });

    $('.datepicker').datepicker({
      changeMonth:true,
      changeYear:true,
      dateFormat:'yy-mm-dd',
      //minDate: new Date('<?php //echo $financial_year_srart;?>'),
      //maxDate: new Date('<?php //echo $financial_year_end;?>'),
      //minDate: -70,
      //maxDate:0,
      //maxDate: "+1M +1D"
      //minDate:'0d'
      })
});


</script>
@section('script')
@stop

@stop