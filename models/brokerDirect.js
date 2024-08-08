import mongoose from "mongoose";
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const BrokerDirectSchema = mongoose.Schema(
  {
    Broker_Direct: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BrokerDirect", BrokerDirectSchema);
