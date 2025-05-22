// server/controllers/userController.js
import User from '../models/user.js';

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
