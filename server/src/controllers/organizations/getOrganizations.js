import Organization from '../../models/Organizations.js';

const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrganizationById = async (req, res) => {
    const { id } = req.params;
    try {
      const organization = await Organization.findById(id);
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
      res.status(200).json(organization);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export { getOrganizations, getOrganizationById };
  