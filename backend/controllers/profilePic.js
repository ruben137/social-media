import ProfilePic from "../models/picture.js";
import fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

export const savePic = async (req, res) => {
  const { name } = req.body;
  const prevProfilePic = await ProfilePic.findOne({ name });

  if (prevProfilePic) {
    const arr = prevProfilePic.url.split("/");

    await unlinkAsync(`storage/imgs/${arr[arr.length - 1]}`);
    await ProfilePic.findByIdAndDelete(prevProfilePic._id);
  }
  const image = new ProfilePic({
    name,
  });
  try {
    if (req.file) {
      console.log(req.file)
      const { filename } = req.file;
      image.setUrl(filename);
    }
    const storedImage = await image.save();

    res.status(200).send({ storedImage });
  } catch (error) {
    res.status(404).json({message:error})
    console.log(error);
  }
};
