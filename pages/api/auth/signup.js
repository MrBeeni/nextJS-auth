import "@/config/db";
import User from "@/models/signupModel";
import { hash } from "bcryptjs";
const signup = async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(422).send("Already Have");
    } else {
      const result = await User.create({
        username,
        email,
        password: await hash(password, 12),
      });
      res.status(201).send(result);
    }
  } else {
    res.status(400).send("its only available for POST method");
  }
};

export default signup;
