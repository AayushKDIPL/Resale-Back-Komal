import express from "express";
import BedroomsController from "../controllers/bedrooms.js";
import multer from "multer";
import fs from "fs"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = `uploads/products`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },

  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + "webp");
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "images", maxCount: 10 },
]);

export const router = express.Router();

router.get("/", BedroomsController.getProducts);// Done
router.get("/:_id", BedroomsController.getProduct);// Done
router.post("/", BedroomsController.addProduct);// Done
router.delete("/:_id", BedroomsController.deleteProduct);// Done
