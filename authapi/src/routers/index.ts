import { NextFunction, Request, Response, Router } from "express";
import authRouter from "./auth.router";

const router = Router();

router.use("/auth", authRouter);
router.get("/test", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        a: "b"
    })
})

export default router;