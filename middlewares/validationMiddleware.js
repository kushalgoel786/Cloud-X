import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/index.js";

// import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
// import mongoose from "mongoose";

import { File, User } from "../server.js";

// improve
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));

        if (errorMessages[0].startsWith("No job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError("Not authorized to access this route");
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateFileInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  // body("owner").notEmpty().withMessage("owner is required"),
]);

export const validateId = withValidationErrors([
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .isInt()
    /*
      const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
    */
    .withMessage("Id must be int")
    .custom(async (id, { req }) => {
      const file = await File.findOne({
        where: {
          id,
        },
      });

      if (!file) throw new NotFoundError(`No file with id ${id}`);

      const isOwner = req.user.userId === file.owner;
      const isPublic = file.is_public;

      req.file = file;

      if (isPublic) return true;

      if (!isOwner)
        throw new UnauthorizedError("Not authorized to access this route");
    }),
]);

export const validateIdOwner = withValidationErrors([
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .isInt()
    /*
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
  */
    .withMessage("Id must be int")
    .custom(async (id, { req }) => {
      const file = await File.findOne({
        where: {
          id,
        },
      });

      if (!file) throw new NotFoundError(`No file with id ${id}`);

      const isOwner = req.user.userId === file.owner;

      req.file = file;

      if (!isOwner)
        throw new UnauthorizedError("Not authorized to access this route");
    }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        throw new BadRequestError("Email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

// export const validateUpdateUserInput = withValidationErrors([
//   body("name").notEmpty().withMessage("name is required"),
//   body("email")
//     .notEmpty()
//     .withMessage("email is required")
//     .isEmail()
//     .withMessage("invalid email format")
//     .custom(async (email, { req }) => {
//       const user = await User.findOne({ email });
//       if (user && user._id.toString() !== req.user.userId) {
//         throw new BadRequestError("email already exists");
//       }
//     }),

//   body("location").notEmpty().withMessage("location is required"),
//   body("lastName").notEmpty().withMessage("last name is required"),
// ]);
