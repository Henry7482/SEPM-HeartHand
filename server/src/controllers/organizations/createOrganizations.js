import Organization from "../../models/Organization.js";
import { uploadImageToCloudinary } from "../../services/uploadImages.js";

const createOrganizations = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      console.log("No file uploaded.");
      req.body.imageURL = "";
    }

    const imageUrl = await uploadImageToCloudinary(file.buffer);
    // console.log('Image URL:', imageUrl);
    req.body.imageURL = imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    req.body.imageURL = "";
  }

  try {
    const {
      name,
      phone_number,
      address,
      ward,
      district,
      province,
      email,
      website,
      keywords,
      imageURL,
    } = req.body;
    const organization = new Organization({
      name,
      phone_number,
      address,
      ward,
      district,
      province,
      email,
      website,
      keywords: keywords || [],
      imageURL: req.body.imageURL,
    });
    const savedOrganization = await organization.save();
    res.status(201).json(savedOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createOrganizations;
