/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as initExampleController from '@/api/internal/init-example/controller';
import * as alimentoController from '@/api/internal/alimento/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Init-Example routes - /api/internal/init-example
 */
router.get('/init-example', initExampleController.listHandler);
router.post('/init-example', initExampleController.createHandler);
router.get('/init-example/:id', initExampleController.getHandler);
router.put('/init-example/:id', initExampleController.updateHandler);
router.delete('/init-example/:id', initExampleController.deleteHandler);

/**
 * @rule {be-route-configuration}
 * Alimento routes - /api/internal/alimento
 */
router.get('/alimento', alimentoController.listHandler);
router.post('/alimento', alimentoController.createHandler);
router.get('/alimento/:id', alimentoController.getHandler);
router.put('/alimento/:id', alimentoController.updateHandler);
router.delete('/alimento/:id', alimentoController.deleteHandler);

export default router;
