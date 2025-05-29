
import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';
import User from '../models/user.js';

export async function authenticateToken(req, _res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return next(ApiError.unauthorized('Нет токена'));
    }
    const token = header.split(' ')[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) return next(ApiError.unauthorized('Пользователь не найден'));
    req.user = user;
    next();
  } catch {
    next(ApiError.unauthorized('Недействительный токен'));
  }
}
