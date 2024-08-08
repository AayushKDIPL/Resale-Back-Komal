import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const DealSchema = mongoose.Schema(
  {
    deal: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Deal", DealSchema);
