import propertyType from "../models/propertyType.js";
import { removeImage } from "../utils/common.js";

const PropertyController = {
  getProducts: async (req, res) => {
    try {
      // if (!req.query.page || !req.query.limit)
      //   throw new Error("Page, Limit is required !");

      const skipUsers = (req.query.page - 1) * req.query.limit;
      const ITEM_PER_PAGE = req.query.page * req.query.limit;

      const products = await propertyType.find({})
        .sort({ priority: -1 })
        .skip(skipUsers)
        .limit(req.query.limit);

      const totalProducts = await propertyType.find({}).count();

      res.status(200).send({
        succss: true,
        message: products,
        totalProducts,
        hasNextPage: ITEM_PER_PAGE < totalProducts,
        hasPreviousPage: req.query.page > 1,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getProduct: async (req, res) => {
    try {
      const data = await propertyType.findById(req.params._id);
      if (!data) throw new Error("Product not found");
      return res.status(200).json({ message: data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  addProduct: async (req, res) => {
    try {
        // Extract data from the request body
        const { property_type } = req.body;

        // Log the incoming data for debugging
        console.log('Incoming data:', property_type);

        // Validate and create products
        const products = await propertyType.create({
            property_type: property_type
        });

        // Send a success response
        return res.status(200).json({ message: 'Products added successfully', products, status: 'ok' });
    } catch (err) {
        // Log any errors
        console.log('Error:', err);

        // Send an error response
        res.status(400).json({ message: err.message, status: 'error' });
    }
},

  deleteProduct: async (req, res) => {
    try {
      let product = await propertyType.findById(req.params._id);
      if (!product) throw new Error("Invalid call");
      await propertyType.findByIdAndDelete(req.params._id);

      return res
        .status(200)
        .json({ message: "Deleted Successfully", status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default PropertyController;
