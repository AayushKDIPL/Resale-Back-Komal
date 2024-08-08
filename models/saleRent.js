import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const SaleRentSchema = mongoose.Schema(
  {
    sale_rent: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SaleRent", SaleRentSchema);
