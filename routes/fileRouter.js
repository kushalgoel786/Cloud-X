import { Router } from "express";
const router = Router();
import {
  getAllFiles,
  addFile,
  getFile,
  deleteFile,
} from "../controllers/fileController.js";

import {
  validateFileInput,
  validateIdParam,
} from "../middlewares/validationMiddleware.js";

router.route("/").get(getAllFiles).post(validateFileInput, addFile);

router
  .route("/:id")
  .get(validateIdParam, getFile)
  .delete(validateIdParam, deleteFile);
// .patch(checkForTestUser, validateFileInput, validateIdParam, updateJob)

export default router;
