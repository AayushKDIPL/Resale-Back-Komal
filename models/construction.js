import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const ConstructionSchema = mongoose.Schema(
  {
    construction: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Construction", ConstructionSchema);
