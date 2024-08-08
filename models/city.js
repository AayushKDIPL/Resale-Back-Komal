import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const CitySchema = mongoose.Schema(
  {
    city: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("City", CitySchema);
