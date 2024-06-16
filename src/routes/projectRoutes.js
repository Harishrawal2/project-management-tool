import express from 'express'
import { createProject } from '../controllers/projectController.js';
import { authToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createProject', authToken, createProject)

export default router