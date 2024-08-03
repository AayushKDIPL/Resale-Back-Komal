import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const PropertySchema = mongoose.Schema(
  {
    property_type: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", PropertySchema);
