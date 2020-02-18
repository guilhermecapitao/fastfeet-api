import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';

import authMiddleware from './app/middlewares/auth';
import adminUser from './app/middlewares/adminUser';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientController.store);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliverymans', adminUser, DeliverymanController.store);
routes.get('/deliverymans', adminUser, DeliverymanController.index);
routes.put('/deliverymans/:id', adminUser, DeliverymanController.update);
routes.delete('/deliverymans/:id', adminUser, DeliverymanController.delete);

routes.post('/order', OrderController.store);

export default routes;