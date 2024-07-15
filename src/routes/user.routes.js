const { Router } = require("express");
const router = Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const upload = require("../middlewares/multer"); 

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

module.exports = router;