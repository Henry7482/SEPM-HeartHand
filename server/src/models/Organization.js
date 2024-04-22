import mongoose from 'mongoose';
// import { Number } from 'mongoose/lib/schema/index';

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true
  },
  address : {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  keywords: {
    type: Array,
    required: true
  },
});

const dashboardDB = mongoose.connection.useDb("dashboard");
const Organization = dashboardDB.model('Organization', organizationSchema);
export default Organization;
