import express from "express";
import { upload } from "../libs/storage.js";
import { savePic } from "../controllers/profilePic.js";


const router = express.Router();

router.post("/profilepic", upload.single("image"), savePic);

export default router;
