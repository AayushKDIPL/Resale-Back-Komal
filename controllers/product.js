import Product from "../models/product.js";
import { removeImage } from "../utils/common.js";

const ProductsController = {
  getProducts: async (req, res) => {
    try {
      // if (!req.query.page || !req.query.limit)
      //   throw new Error("Page, Limit is required !");

      const skipUsers = (req.query.page - 1) * req.query.limit;
      const ITEM_PER_PAGE = req.query.page * req.query.limit;

      const products = await Product.find({
        ...(req.query.subcategory
          ? { subcategory: req.query.subcategory }
          : {}),
      })
        .sort({ priority: -1 })
        .skip(skipUsers)
        .limit(req.query.limit);

      const totalProducts = await Product.find({
        ...(req.query.subcategory
          ? { subcategory: req.query.subcategory }
          : {}),
      }).count();

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
      const data = await Product.findById(req.params._id);
      if (!data) throw new Error("Product not found");
      return res.status(200).json({ message: data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  addProduct: async (req, res) => {
    try {
        // Extract data from the request body
        const { data } = req.body;
        console.log(data);

        // Log the incoming data for debugging
        console.log('Incoming data:', data);

        // Check if data is an array
        if (!Array.isArray(data)) {
            return res.status(400).json({ message: 'Data should be an array' });
        }

        // Validate and create products
        const products = await Product.insertMany(data);

        // Send a success response
        return res.status(200).json({ message: 'Products added successfully', products, status: 'ok' });
    } catch (err) {
        // Log any errors
        console.log('Error:', err);

        // Send an error response
        res.status(400).json({ message: err.message, status: 'error' });
    }
},



addSingleProduct: async (req, res) => {
  try {
      // Extract data from the request body
      const { data } = req.body;
      console.log(data.location, data.customerName);
      // Log the incoming data for debugging
      // Validate and create products
      const products = await Product.create({
        customer_name: data.customerName,
        customer_mobile: data.mobileNo,
        budget_range: data.budgetRange,
        empName: data.empName,
        property_type: data.propertyType,
        sale_rent: data.saleRent,
        builder_name: data.builderName,
        project_name: data.projectName,
        location: data.location,
        city: data.city,
        property_size: data.propertySize,
        bedrooms: data.bedrooms,
        demand: data.demand,
        registration_status: data.registrationStatus,
        unit_no: data.unitNo,
        tower: data.tower,
        floor: data.floor,
        facing: data.facing,
        furnishing_status: data.furnishingStatus,
        no_of_parking: data.noOfParking,
        construction_status: data.constructionStatus,
        video_link: data.videoLink,
        broker_direct_inventory: data.brokerDirectInventory,
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



  
  updateProduct: async (req, res) => {
    try {
      let params = { ...req.body.data };
      const updatedProduct = await Product.findByIdAndUpdate(
        req.body._id,
        params,
        { new: true }
      );

      return res.status(200).json({ message: updatedProduct, status: 'ok' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      let product = await Product.findById(req.params._id);
      if (!product) throw new Error("Invalid call");
      removeImage("uploads/products/", product.image);
      await Product.findByIdAndDelete(req.params._id);

      return res
        .status(200)
        .json({ message: "Deleted Successfully", status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
  searchProduct: async (req, res) => {
    try {
      const { searchValue } = req.body;
      let products = await Product.find({
        ...(searchValue
          ? { name: { $regex: searchValue, $options: "i" } }
          : {}),
      });

      return res.status(200).json({ message: products, status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default ProductsController;
