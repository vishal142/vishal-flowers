<?php //dd($OrderData); ?>
<html lang="en">
<head>
  <title>Forward Order</title>
</head>

<body>
<div style="background-color:#ffffff">
<div style="margin: 0 auto; padding: 30px 15px; width: 70%;">
    <h3>
    

    </h3>
     
    <h3>Please process the Order no <?php echo $OrderData->oder_no;?></h3><br>
    <h5>Below are the detail of the order to be processed </h5>

    <br>
    <br>
    <?php //print_r();?>
    
    <table class="table">
      <thead>
        <th style="text-align: center;">Order No: <?php echo $OrderData->oder_no; ?></th>
        <th></th>
        <th style="text-align: center;">Delivery Date: <?php echo date('d-m-Y',strtotime($OrderData->delivery_date));?></th> 
      </thead>
      <tbody>
        <?php 

         $orderDetailData = (new \App\Library\helper)->perticularFlied('tbl_order_detail','*',array('order_id'=>$OrderData->id));

        if($orderDetailData)
        { 
          $startRecord ='0';
          $total = '0';
          $i = '1';
          foreach($orderDetailData as $row)
          {

            $item_data = (new \App\Library\helper)->perticularFlied('tbl_item','item_image',array('id'=>$row->item_id))[0];
            //dd($item_data->item_image);

            if($row->category_id!=''){

            $oreder_id = $row->order_id;
            $total += $row->sub_total_amount;


          ?>
        <tr>

          <td style="text-align: center;">
            
          <img src="{{ URL::to('/uploads/item_image/'.) }}" height="60" width="80">
           <!-- <img src="http://localhost/saesha_flower/img.php?img=item_image/1_1505197156_432.jpg&amp;mode=cm&amp;w=60&amp;h=60" alt="Photo"> -->

          </td>

          
          <td style="text-align: center;">
            Product ID #<?php echo $row->item_id;?>
            <br/>
            <span style="font-size: 11px;"><?php echo $row->qty_type_description;?>
            </span>
            <p><b><?php echo $row->glass_vase.'  ';?></b>Glass Vase</p>
            </td>
          <td style="text-align: center;"><?php echo $row->quantity;?>Pc(s)</td>

        </tr>
        <?php 
       $i++;
      } 

    }

    }?>
        
      </tbody>
      

    </table>

   <hr>
   <?php 
   $odeder_data = (new \App\Library\helper)->perticularFlied('tbl_order','*',array('id'=>1))[0];
   $shipping_data = (new \App\Library\helper)->perticularFlied('tbl_shipping','*',array('id'=>$odeder_data->shipping_id))[0];

   ?>
   <h3>Delivery Information</h3>
   Recipient Name :&nbsp;<?php echo $shipping_data->receiver_name;?><br>
   <hr>
  With Regards,<br>
  Team Saesha Flower
</div>
</div>


</body>