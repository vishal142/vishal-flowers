<?php //dd($OrderData); ?>
<html lang="en">
<head>
  <title>Forward Order</title>
</head>

<body>
<div style="background-color:#ffffff">
<div style="margin: 0 auto; padding: 30px 15px; width: 70%;">
    <h3>
      Dear (--Vendor Name --),
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

            $item_data = (new \App\Library\helper)->perticularFlied('tbl_item',array('item_image','id'),array('id'=>$row->item_id))[0];
            //dd($item_data->item_image);

            if($row->category_id!=''){

            $oreder_id = $row->order_id;
            $total += $row->sub_total_amount;


          ?>
        <tr>

          <td style="text-align: center;">
           <a href="/admin/item/edit-item/<?php echo $item_data->id;?>" title="Item-Detail" target="_blank"> 
              <img src="{{ URL::to('/uploads/item_image/'.$item_data->item_image)}}" width="100" height="80">
           </a>

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
   $odeder_data = (new \App\Library\helper)->perticularFlied('tbl_order','*',array('id'=>$order_id))[0];
   $shipping_data = (new \App\Library\helper)->perticularFlied('tbl_shipping','*',array('id'=>$odeder_data->shipping_id))[0];

   $delivery_time = (new \App\Library\helper)->perticularFlied('tbl_delivery_charges','*',array('id'=>$odeder_data->delivery_charged_id))[0];

   ?>
   <h3>Delivery Information</h3>
   Recipient Name :&nbsp;<?php echo $shipping_data->receiver_name;?><br>
   Date Ordered :&nbsp; <?php echo date('d-m-Y H:i:s',strtotime($odeder_data->order_date_time));?><br>
   Delivery Date:&nbsp;<?php echo date('d-m-Y',strtotime($odeder_data->delivery_date));?><br>
      Delivety Time :<?php echo $delivery_time->from_time .'-'.$delivery_time->to_time;?><br>
      Delivery Adderss: <?php echo $shipping_data->receiver_address;?><br>
      Email: <?php echo $shipping_data->email;?><br>
      Mob: <?php echo $shipping_data->receiver_mobile;?><br>
    <h3>Delivery address :</h3>
    <?php echo $shipping_data->receiver_address;?>
    <h3>Git Message</h3>
      <?php echo $shipping_data->message_on_card;?> <br>

      Signature :<?php echo $shipping_data->signature;?><br>

   <hr>
  With Regards,<br>
  Team Saesha Flower
</div>
</div>


</body>