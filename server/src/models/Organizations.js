import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone_number: {
    type: Int16Array,
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

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;
