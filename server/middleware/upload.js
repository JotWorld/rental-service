
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const staticDir  = path.resolve(__dirname, '..', 'static');


if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, staticDir),
  filename:   (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, uuidv4() + ext);
  }
});

export default multer({ storage });
