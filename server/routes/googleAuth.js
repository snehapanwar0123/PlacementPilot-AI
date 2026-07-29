import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL;

// Redirect user to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${CLIENT_URL}/`,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.redirect(`${CLIENT_URL}/auth/google/success?token=${token}`);
  }
);

export default router;