import axios from "axios";
import Donation from "../../models/Donation.js";

const cancelDeliveryOrder = async (req, res) => {
    // Add headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      ShopId: "5047918",
      Token: "9865968a-0e0b-11ef-bfe9-c2d25c6518ab",
    },
  };

//   Create a delivery order
  let dataCancel;
  console.log("Cancel Delivery Order", req.body.order_code);
  await axios
    .post(
      "https://online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel",
      { order_codes: [req.body.order_code] },
      config
    )
    .then((response) => {
      console.log("Response from cancel: ", response.data);
      dataCancel = response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      res.status(error.response.status).send({
        message: "Error in canceling Delivery Order",
        error: error.response.data,
      });
    });

    res.status(200).send({ message: "Delivery Order canceled successfully", dataCancel });

};

export default cancelDeliveryOrder;