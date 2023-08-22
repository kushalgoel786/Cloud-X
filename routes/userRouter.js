import { Router } from "express";
 
import {
  getCurrentUser,
  // updateUser,
} from "../controllers/userController.js";

// import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getCurrentUser);

// router.patch(
//   "/update-user",
//   checkForTestUser,
//   upload.single("avatar"),
//   validateUpdateUserInput,
//   updateUser
// );

export default router;
