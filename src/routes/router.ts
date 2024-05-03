import express from 'express';
import { Controller } from '../controller/controller';

const router = express.Router();

const controller = new Controller();

router.get('/ping', controller.ping);
router.post('/solve', controller.solve);

export default router;