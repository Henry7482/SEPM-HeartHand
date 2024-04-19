import Organization from '../../models/Organizations.js';

const createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;
    const organization = new Organization({ name, description });
    const savedOrganization = await organization.save();
    res.status(201).json(savedOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createOrganization;
