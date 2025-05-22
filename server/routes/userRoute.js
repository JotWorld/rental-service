// server/routes/userRoute.js

import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = Router();

// GET /users — получить всех пользователей
router.get('/', getAllUsers);

// GET /users/:id — получить пользователя по ID
router.get('/:id', getUserById);

// POST /users — создать нового пользователя
router.post('/', createUser);

// PUT /users/:id — обновить данные пользователя по ID
router.put('/:id', updateUser);

// DELETE /users/:id — удалить пользователя по ID
router.delete('/:id', deleteUser);

export default router;
