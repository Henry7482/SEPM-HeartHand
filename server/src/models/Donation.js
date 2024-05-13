import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },
  order_code: {
    type: String,
    required: true,
  },
  sender_name: {
    type: String,
    required: true,
  },

  product_name: {
    type: String,
    required: true,
  },

  product_category: {
    type: String,
    required: true,
  },
  product_quantity: {
    type: Number,
    required: true,
  },
  organization_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const deliveryDB = mongoose.connection.useDb("delivery");
const Donation = deliveryDB.model("donation", donationSchema);

export default Donation;
