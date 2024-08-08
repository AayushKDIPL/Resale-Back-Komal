import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const BudgetSchema = mongoose.Schema(
  {
    budget: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Budget", BudgetSchema);
