import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/userModel.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { username: oldUser.userName, id: oldUser._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { userName, email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    const usernameExist = await UserModal.findOne({ userName });

    if (oldUser)
      return res.status(400).json({ message: "Email already exists" });

    if (usernameExist)
      return res.status(400).json({ message: "Username already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      userName,
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { username: result.userName, id: result._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
