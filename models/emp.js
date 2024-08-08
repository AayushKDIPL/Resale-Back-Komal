import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const EmployeeSchema = mongoose.Schema(
  {
    employee: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Employee", EmployeeSchema);
