import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const BedroomsSchema = mongoose.Schema(
  {
    bedrooms: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bedrooms", BedroomsSchema);
