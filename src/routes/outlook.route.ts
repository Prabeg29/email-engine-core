import { Router } from 'express';

import * as OutLookController from '../controllers/outlook.controller';

const router: Router = Router();

router.get('/connect', OutLookController.connect);
router.get('/save-user', OutLookController.saveUser);

export default router;
