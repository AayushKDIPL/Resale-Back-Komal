import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const RegistrationSchema = mongoose.Schema(
  {
    registration: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Registration", RegistrationSchema);
