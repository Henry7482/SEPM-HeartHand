import axios from "axios";

const createDeliveryOrder = async (req, res) => {
  const data = {
    payment_type_id: 1,
    note: req.body.note,
    required_note: "CHOXEMHANGKHONGTHU",
    from_name: req.body.sender.name,
    from_phone: req.body.sender.phone,
    from_addreqs: req.body.sender.address,
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
    content: `Donation from ${req.body.sender.name} to ${req.body.organization.name}`,
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

  const config = {
    headers: {
      "Content-Type": "application/json",
      ShopId: "5047918",
      Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
    },
  };

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
      res.status(error.response.status).send({message: "Error in creating Delivery Order", error: error.response.data});
    });

  if (dataCreate && dataCreate.code === 200) {
    let dataCancel;
    console.log("Create Delivery Order");
    await axios
      .post(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel",
        { order_codes: [dataCreate.data.order_code] },
        config
      )
      .then((response) => {
        console.log("Response from cancel: ", response.data);
        dataCancel = response;
      
      })
      .catch((error) => {
        console.log(error.response.data);
        res.status(error.response.status).send({message: "Error in canceling Delivery Order", error: error.response.data});
      });

    if (dataCancel && dataCancel.status === 200) {
      console.log("Cancel Delivery Order");
      res.status(200).send("Delivery Order created and canceled");
    } else {
        console.log(dataCancel);
      res.status(400).send("Error in canceling Delivery Order");
    }
  }
};

export default createDeliveryOrder;

// const data = {
//     payment_type_id: 2,
//     note: "Tintest 123",
//     required_note: "CHOXEMHANGKHONGTHU",
//     from_name: "Phuc Trong test",
//     from_phone: "0987654321",
//     from_address: "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
//     from_ward_name: "Phường 14",
//     from_district_name: "Quận 10",
//     from_province_name: "HCM",
//     return_phone: "0332190444",
//     return_address: "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
//     return_district_id: null,
//     return_ward_code: "",
//     client_order_code: "",
//     to_name: "tui test",
//     to_phone: "0987654321",
//     to_address: "73 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
//     to_ward_code: "20308",
//     to_district_id: 1444,
//     cod_amount: 0,
//     content: "Theo New York Times",
//     weight: 200,
//     length: 1,
//     width: 19,
//     height: 10,
//     pick_station_id: 1444,
//     deliver_station_id: null,
//     insurance_value: 5000000,
//     service_id: 0   ,
//     service_type_id: 2,
//     coupon: null,
//     pick_shift: [2],
//     items: [
//         {
//             name: "Áo Polo",
//             code: "Polo123",
//             quantity: 1,
//             price: 200000,
//             length: 12,
//             width: 12,
//             height: 12,
//             weight: 1200,
//             category: {
//                 level1: "Áo"
//             }
//         }
//     ]
// };
