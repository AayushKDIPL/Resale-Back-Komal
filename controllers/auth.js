import User from "../models/user.js";
import { comparePassword, hashPassword } from "../utils/auth.js";
import { createJwtToken, verifyToken } from "../utils/jwt.js";
import crypto from "crypto"
import { sendForgotEmail } from "../utils/sms.js";

const AuthController = {
  login: async (req, res) => {
    try {
      const { admin, password } = req.body;

      if (!admin || !password)
        throw new Error("Admin and password is required !");

      const user = await User.findOne({
        admin,
      });

      if (!user) throw new Error("Admin Not Found!");

      const isAuthorised = await comparePassword(password, user.password);
      if (!isAuthorised) throw new Error("Invalid Credentials !");

      const accesstoken = createJwtToken(
        admin,
        user.tokenVersion,
        user._id
      );

      res.status(200).json({
        message: {
          accesstoken,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Invalid Login" });
    }
  },
  logout: async (req, res) => {
    try {
      const JWT = req.headers["authorization"];
      const tokenDetails = await verifyToken(
        JWT,
        process.env.ACCESS_TOKEN_SECRET
      );
      if (!tokenDetails)
        return res.status(401).json({ message: "Unauthorised" });

      await User.findByIdAndUpdate(tokenDetails.id, {
        tokenVersion: tokenDetails.tokenVersion + 1,
      });

      return res.status(200).json({ message: "Signout success" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error. Try again");
    }
  },
  forgotPin: async (req, res) => {
    try {
      const { email } = req.body;
      if(!email) throw new Error("Email is required !");

      crypto.randomBytes(32, async (err, buffer) => {
        if (err) console.log(err);

        const resetToken = buffer.toString("hex");
        const user = await User.findOne({
          email: req.body.email,
        }).select("email name");

        if (!user)
          return res.status(400).json({ message: "User does not exist" });

        user.resetToken = resetToken;
        user.expireToken = Date.now() + 3600000;
        await user.save();
        await sendForgotEmail(user.email, resetToken);

        return res
          .status(200)
          .json({ message: `http://localhost:3000/updatePassword/${resetToken}` });
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  resetPin: async (req, res) => {
    try {
      const { password, token } = req.body;
      if (!token || !password) throw new Error("token or password is required !");

      const user = await User.findOne({
        resetToken: token,
        expireToken: { $gt: Date.now() },
      });

      if (!user) throw new Error({ message: "Link is expired" });
      const hashedPassword = await hashPassword(password);
      await User.findByIdAndUpdate(user._id, {
        resetToken: "",
        expireToken: "",
        password: hashedPassword,
      });

      res.status(200).json({ message: "Pin reset successfully!" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default AuthController;
