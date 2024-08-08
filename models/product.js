import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const ProductSchema = mongoose.Schema(
  {
    customer_name: { ...validations(String) },
    empName: { ...validations(String) },
    customer_mobile: { ...validations(String) },
    budget_range: { ...validations(String) },
    pin: { ...validations(Boolean, {default: false}) },
    uuid: {...validations(String, {default: uuidv4()})},
    property_type: { ...validations(String) },
    sale_rent: { ...validations(String) },
    builder_name: { ...validations(String) },
    project_name: { ...validations(String) },
    location: { ...validations(String) },
    city: { ...validations(String) },
    property_size: { ...validations(String) },
    bedrooms: { ...validations(String) },
    demand: { ...validations(String) },
    registration_status: { ...validations(String) },
    unit_no: { ...validations(String) },
    tower: { ...validations(String) },
    floor: { ...validations(String) },
    facing: { ...validations(String) },
    furnishing_status: { ...validations(String) },
    no_of_parking: { ...validations(String) },
    construction_status: { ...validations(String) },
    video_link: { ...validations(String) },
    broker_direct_inventory: { ...validations(String) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);
