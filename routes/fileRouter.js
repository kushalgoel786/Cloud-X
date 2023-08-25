import { Router } from "express";
const router = Router();
import {
  getAllFiles,
  addFile,
  getFile,
  deleteFile,
  updateFile,
  downloadFile,
} from "../controllers/fileController.js";

import {
  validateFileInput,
  validateId,
  validateIdOwner,
} from "../middlewares/validationMiddleware.js";

router.route("/").get(getAllFiles).post(validateFileInput, addFile);

router
  .route("/:id")
  .get(validateId, getFile)
  .delete(validateIdOwner, deleteFile)
  // .patch(validateFileInput, validateIdOwner, updateFile);
  .patch(validateIdOwner, updateFile);

router.route("/:id/download").get(validateId, downloadFile);

export default router;
