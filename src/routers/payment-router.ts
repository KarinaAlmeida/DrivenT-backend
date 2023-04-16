import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import paymentcontroller from '@/controllers/payment-controller';

const paymentRouter = Router();

paymentRouter
  .all('/*', authenticateToken)
  .get('/', paymentcontroller.getPayment) //payments?ticketId=1
  .post('/process', paymentcontroller.postPayment);

export { paymentRouter };
