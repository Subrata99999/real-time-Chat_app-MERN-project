import express from "express";
import { login, logout, signup, updateProfile , checkauth} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

const PORT= process.env.PORT


router.post("/signup", signup );
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/checkauth",protectRoute , checkauth);


export default router;