@extends('admin.layouts.default')
@section('content')

<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        <?php //echo $page_title; ?>
      </h1>
      <ol class="breadcrumb">
        <?php //echo $breadcrumb; ?>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <!-- Horizontal Form -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title"><?php //echo $page_title; ?></h3>
            </div>
            
            
            <div class="col-xs-12">
			
            </div>
            
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal" id="change_password_frm" name="change_password_frm" method="post" action="{{url('/admin/DoChangePassword')}}">
            	{{csrf_field()}}
              <div class="box-body" style="width:100%; float:left;">
              
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Old Password <span class="red">*</span></label>
                  

                  <div class="col-sm-5">
                    <input type="password" class="form-control" id="inputEmail3" placeholder="Old Password" id="old_password" name="old_password">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-3 control-label">New Password <span class="red">*</span></label>

                  <div class="col-sm-5">
                    <input type="password" class="form-control" id="inputPassword3" placeholder="New Password" id="new_password" name="new_password">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-3 control-label">Confirm New Password <span class="red">*</span></label>

                  <div class="col-sm-5">
                    <input type="password" class="form-control" id="inputPassword3" placeholder="Confirm New Password" id="confirm_new_password" name="confirm_new_password">
                  </div>
                </div>
                
              </div>
              <!-- /.box-body -->
              <div class="box-footer">
              	<div class="col-sm-8">
                <button type="submit" class="btn btn-info" style="margin-left: 78%">Submit</button>
                    <a class="btn btn-default pull-right" href="">Cancel</a>
                    
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
    $('#change_password_frm').bootstrapValidator({
  		framework: 'bootstrap',
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
            old_password: {
                validators: {
                    notEmpty: {
                        message: 'Old Password is required and cannot be empty'
                    }
                }
            },
            new_password: {
                validators: {
                    notEmpty: {
                        message: 'New Password is required and cannot be empty'
                    },
					stringLength: {
                        min: 6,
                        message: 'Password must be atleast 6 characters long'
                    }
                }
            },
			confirm_new_password: {
                validators: {
                    notEmpty: {
                        message: 'Confirm New Password is required and cannot be empty'
                    },
					identical: {
						field : 'new_password',
						message : 'New Password and Confirm New Password must be same'
					}
                }
            },
        }
    });
});
</script>
@section('script')
@stop
@stop