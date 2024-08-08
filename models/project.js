import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const ProjectSchema = mongoose.Schema(
  {
    project: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", ProjectSchema);
