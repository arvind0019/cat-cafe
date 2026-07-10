import express from 'express';
import { crudController } from '../controllers/crudController.js';
import { adminOnly, protect } from '../middleware/auth.js';

export function buildCrudRoutes(Model, searchable = [], options = {}) {
  const router = express.Router();
  const controller = crudController(Model, searchable);
  const writeGuard = options.publicWrite ? [] : [protect, adminOnly];
  router.get('/', controller.list);
  router.get('/:id', controller.get);
  router.post('/', ...writeGuard, controller.create);
  router.put('/:id', ...writeGuard, controller.update);
  router.delete('/:id', ...writeGuard, controller.remove);
  return router;
}
