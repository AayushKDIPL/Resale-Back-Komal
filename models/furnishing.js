import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const FurnishingSchema = mongoose.Schema(
  {
    furnishing: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Furnishing", FurnishingSchema);
