import { Router } from "express";
import { registerUsers,addJob, loginUsers ,getAllJobs,filterJobs} from "./controller.js";
import { verifyToken } from "./middleware.js";

const router = Router();

router.get("/",registerUsers);
router.post("/login",loginUsers);
router.post("/post-job",verifyToken,addJob);
router.get("/getAll",verifyToken,getAllJobs);
router.get("/filterJob",verifyToken,filterJobs);

export default router;