import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const LocationSchema = mongoose.Schema(
  {
    location: { ...validations(String) },
    city: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Location", LocationSchema);
