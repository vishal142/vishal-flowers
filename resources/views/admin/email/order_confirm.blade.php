<html lang="en">
<head>
  <title>Order Confirm Mail</title>
</head>

<body>
<div style="background-color:#ffffff">
<div style="margin: 0 auto; padding: 30px 15px; width: 70%;">
    <h3>Saesha Flower</h3>
     
    Tank you for choosing Saesha Flower for you fioral needs.We greatly appreciate your bussinness.

    <br>
    <br>
    
    <table class="table">
      <thead>
        <th>SL No </th>
        <th>Image</th>
        <th>Product Description</th>
        <th>Qty</th>
        <th>Unit Price</th> 
        <th>Amount</th> 
      </thead>
      <tbody>
        <?php if($orderDetailData)
        { 
          $startRecord ='0';
          $total = '0';
          $i = '1';
         foreach($orderDetailData as $row)
          {
            $oreder_id = $row->order_id;
            $total += $row->sub_total_amount;

            $item_name = (new \App\Library\helper)->perticularFlied('tbl_item','*',array('id'=>$row->item_id))[0];
            

            ?>
            <tr id="tr<?php echo $row->id; ?>">
                  <td><?php echo $i; ?></td>
                  <td>
                    <?php if($item_name->item_image !=''){ ?>
                    <a href="/admin/item/edit-item/<?php echo $item_name->id;?>" title="Item-Detail" target="_blank">
                    <img src="{{ URL::to('/uploads/item_image/'.$item_name->item_image)}}" width="100" height="80"></a>
                  <?php } ?>
                  </td>

                  <td>
                  <?php echo($item_name->item_name==''?ucfirst($row->item_name):$item_name->item_name); ?>
                  </td>
                  <td><?php echo $row->quantity; ?></td>
                  <td><?php echo $row->item_price; ?></td>
                  <td><?php echo $row->sub_total_amount; ?></td>
            </tr>
      <?php 
       $i++;
      } ?>

      <tr>
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><?php echo number_format($total,2); ?></td>
                  
                </tr>

    <?php } ?>
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
      Date Ordered :&nbsp;<?php echo date('d-m-Y H:i:s',strtotime($odeder_data->order_date_time));?> <br>
      Delivery Date:&nbsp;<?php echo date('d-m-Y',strtotime($odeder_data->delivery_date));?><br>
      Delivety Time :<?php echo $delivery_time->from_time .'-'.$delivery_time->to_time;?><br>
      Delivery Adderss: <?php echo $shipping_data->receiver_address;?><br>
      Email: <?php echo $shipping_data->email;?><br>
      Mob: <?php echo $shipping_data->receiver_mobile;?><br>
      

      <h3>Git Message</h3>
      <?php echo $shipping_data->message_on_card;?> <br>

      Signature :<?php echo $shipping_data->signature;?><br>

      <hr>

  <h3>Disclaimer :- </h3>

1) The picture displayed on the website are indicate in nature.The flower chosen
by the color would remain the same , although the filter or follage used to prepare
the Arrangements & Bunches may differ <br>

2) communication : We may contact you for issues, if any with regard to your order Please check your mail from time to time for any correspondence. We may also contact the recipent.<br>

3) Terms & Conditions : Please make sure you have read our Terms & condition and aware of the same



</div>
</div>


</body>