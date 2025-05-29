import ApiError from './ApiError.js';

export default function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ error: err.message });
  }

  console.error(err); // непредвиденная ошибка — логируем
  return res
    .status(500)
    .json({ error: 'Internal Server Error' });
}
