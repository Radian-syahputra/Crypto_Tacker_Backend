import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/response";
import { registerService, loginService, getMeService } from "./service";
import { AuthRequest } from "../../middleware/authMiddleware";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return errorResponse(res, 400, "Semua Input Fileds Harus Di Isi");
    }
    const newUser = await registerService(username, email, password);

    return successResponse(res, 201, "Register Berhasil", {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    return errorResponse(res, 400, (error as Error).message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, 400, "Semua Input Fileds Harus Di Isi");
    }

    const { token, user } = await loginService(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari dalam milidetik
    });

    return successResponse(res, 200, "Login Berhasil", {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return errorResponse(res, 400, (error as Error).message);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return successResponse(res, 200, "Logout Berhasil");
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return errorResponse(res, 401, "Unauthorized");
    }

    const user = await getMeService(userId);
    if (!user) {
      return errorResponse(res, 404, "User tidak ditemukan");
    }

    return successResponse(res, 200, "Berhasil", {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return errorResponse(res, 400, (error as Error).message);
  }
};
