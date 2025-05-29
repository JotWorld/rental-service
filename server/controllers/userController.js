import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id','username','email','userType','avatar','createdAt'] });
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id','username','email','userType','avatar','createdAt']
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const registration = async (req, res, next) => {
  try {
    const { email, password, userType, username } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }

    const avatarImage = `/static/${req.file.filename}`;

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      userType,
      username,
      avatar: avatarImage,
      password: hashPassword
    });

    res.json({
      user: {
        id:        user.id,
        email:     user.email,
        username:  user.username,
        avatarUrl: user.avatar,
        isPro:     user.userType === 'pro'
      }
    });
  } catch (error) {
    next(ApiError.internal('Ошибка регистрации'));
  }
};
export const createUser = async (req, res) => {
  try {
    const { username, email, password, userType, avatar } = req.body;
    const user = await User.create({ username, email, password, userType, avatar });
    res.status(201).json({ id: user.id, username: user.username, email: user.email });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    const user = await User.findByPk(id, { attributes: ['id','username','email','userType','avatar'] });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return next(ApiError.badRequest('Пользователь не найден'));
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return next(ApiError.badRequest('Неверный пароль'));
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token });
  } catch (e) {
    return next(ApiError.internal('Ошибка авторизации' + e));
  }
}
export function checkAuth(req, res) {
  const user = req.user;
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  return res.json({
    id:       user.id,
    email:    user.email,
    username: user.username,
    avatar:   user.avatar,
    isPro:    user.userType === 'pro',
    token
  });
}
export function logout(_req, res) {
  return res.status(401).json({ message: 'Успешный выход' });
}
