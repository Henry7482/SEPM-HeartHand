import axios from "axios";
import Donation from "../../models/Donation.js";

const createDeliveryOrder = async (req, res) => {
  try {
    const data = {
      payment_type_id: 1,
      note: req.body.note,
      required_note: "CHOXEMHANGKHONGTHU",
      from_name: req.body.sender.name,
      from_phone: req.body.sender.phone,
      from_address: req.body.sender.address,
      from_ward_name: req.body.sender.ward,
      from_district_name: req.body.sender.district,
      from_province_name: req.body.sender.province,
      return_phone: req.body.sender.phone,
      return_address: req.body.sender.address,
      return_district_id: null,
      return_ward_code: "",
      client_order_code: "",
      to_name: req.body.organization.name,
      to_phone: req.body.organization.phone,
      to_address: req.body.organization.address,
      to_ward_code: req.body.organization.ward_code,
      to_district_id: req.body.organization.district_id,
      cod_amount: 0,
      content: req.body.content,
      weight: req.body.package.weight,
      length: req.body.package.length,
      width: req.body.package.width,
      height: req.body.package.height,
      pick_station_id: null,
      deliver_station_id: null,
      insurance_value: req.body.package.insurance_value,
      service_id: req.body.service_id,
      service_type_id: 2,
      coupon: null,
      pick_shift: req.body.pick_shift,
      items: req.body.items,
    };

    //   console.log("Data:", data);
    //   res.status(204).send("Data received");

    // Add headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        ShopId: "5047918",
        Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
      },
    };

    // Create a delivery order
    let dataCreate;
    await axios
      .post(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
        data,
        config
      )
      .then((response) => {
        console.log("Response from create: ", response.data);
        dataCreate = response.data;
      })
      .catch((error) => {
        console.log(error.response.data);
        res.status(error.response.status).send({
          message: "Error in creating Delivery Order",
          error: error.response.data,
        });
        return;
      });

    if (!dataCreate) {
      res.status(500).send({ message: "Failed to create delivery order" });
      return;
    }

    // Create a donation document
    try {
      await Donation.create({
        donor_id: req.userID,
        order_code: dataCreate.data.order_code,
        sender_name: req.body.sender.name,
        product_name: req.body.items[0].name,
        product_category: req.body.items[0].category.level1,
        product_quantity: req.body.items[0].quantity,
        organization_name: req.body.organization.name,
        description: req.body.content,
        items: req.body.items,
      });
      res
        .status(200)
        .send({ "Delivery Order created successfully": dataCreate });
    } catch (error) {
      console.log(error);
      res.status(400).send({ "Error in creating Donation in database": error });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ "Error in creating Donation in database": error });
  }
};

export default createDeliveryOrder;
