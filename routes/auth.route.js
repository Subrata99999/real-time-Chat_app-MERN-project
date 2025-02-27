import express from "express";
import { login, logout, signup,  } from "../controllers/auth.controller.js";

import { protectRoute } from "../middleeware/auth.middleware.js";

const router = express.Router();

const PORT= process.env.PORT


router.post("/signup", signup );
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, );

export default router;