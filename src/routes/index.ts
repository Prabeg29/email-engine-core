import { Router } from 'express';

import outlookRoute from './outlook.route';

const router: Router = Router();

router.get('/ping', (_req, res) => res.json({ message: 'pong' }));
router.use('/outlook', outlookRoute)

export default router;
