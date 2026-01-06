import { Router } from "express";
import * as UserService from "./users.service";

const router = Router();

router.get("/me", UserService.me);

export default router;
