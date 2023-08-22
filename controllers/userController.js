import { StatusCodes } from "http-status-codes";
import { User } from "../server.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.userId } });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

/*
export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  res.status(StatusCodes.OK).json({ msg: 'updated user' });
};
*/
