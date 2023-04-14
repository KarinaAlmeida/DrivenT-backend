import { Router } from 'express';
import { authenticateToken } from '@/middlewares';

const paymentRouter = Router();

paymentRouter
  .all('/*', authenticateToken)
  .get('/') //payments?ticketId=1
  .post('/process');

export { paymentRouter };
