import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveriedController from './app/controllers/DeliveriedController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';
import adminUser from './app/middlewares/adminUser';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientController.store);

routes.post('/files', upload.single('file'), FileController.store);

/**
 * DeliverymanController
 */
routes.post('/deliverymans', adminUser, DeliverymanController.store);
routes.get('/deliverymans', adminUser, DeliverymanController.index);
routes.put('/deliverymans/:id', adminUser, DeliverymanController.update);
routes.delete('/deliverymans/:id', adminUser, DeliverymanController.delete);

/**
 * OrderController
 */
routes.post('/order', adminUser, OrderController.store);
routes.get('/order', adminUser, OrderController.index);
routes.put('/order/:id', adminUser, OrderController.update);
routes.delete('/order/:id', adminUser, OrderController.delete);

/**
 * DeliveryController
 */
routes.get('/deliveryman/:id/deliver', DeliveryController.index);
routes.delete('/delivery/:id/cancel-delivery', DeliveryController.delete);
routes.put(
  '/deliveryman/:deliverymanId/delivery/:id/start',
  DeliveryController.update
);

/**
 * DeliveriedController
 */
routes.get('/deliveryman/:id/deliveries', DeliveriedController.index);
routes.put(
  '/deliveryman/:deliverymanId/delivery/:id/end',
  DeliveriedController.update
);

/**
 * DeliveryProblemController
 */
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/problems/:id', DeliveryProblemController.index);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

export default routes;
