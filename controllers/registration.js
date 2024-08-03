import registration from "../models/registration.js";
import { removeImage } from "../utils/common.js";

const registrationController = {
  getProducts: async (req, res) => {
    try {
      // if (!req.query.page || !req.query.limit)
      //   throw new Error("Page, Limit is required !");

      const skipUsers = (req.query.page - 1) * req.query.limit;
      const ITEM_PER_PAGE = req.query.page * req.query.limit;

      const products = await registration.find({})
        .sort({ priority: -1 })
        .skip(skipUsers)
        .limit(req.query.limit);

      const totalProducts = await registration.find({}).count();

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
      const data = await registration.findById(req.params._id);
      if (!data) throw new Error("Product not found");
      return res.status(200).json({ message: data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  addProduct: async (req, res) => {
    try {
        // Extract data from the request body
        const { registration_status } = req.body;

        // Log the incoming data for debugging
        console.log('Incoming data:', registration_status);

        // Validate and create products
        const products = await registration.create({
            registration: registration_status
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
      let product = await registration.findById(req.params._id);
      if (!product) throw new Error("Invalid call");
      await registration.findByIdAndDelete(req.params._id);

      return res
        .status(200)
        .json({ message: "Deleted Successfully", status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default registrationController;
