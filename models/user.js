import mongoose from "mongoose";

let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const userSchema = mongoose.Schema(
  {
    admin: { ...validations(String) },
    role: {
      ...validations(String, {
        enum: ["ADMIN"],
        default: "ADMIN"
      }),
    },
    password: { ...validations(String) },
    tokenVersion: { ...validations(Number, { default: 0 }) },
    resetToken: String,
    expireToken: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);