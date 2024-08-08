import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const BuilderSchema = mongoose.Schema(
  {
    builder: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Builder", BuilderSchema);
