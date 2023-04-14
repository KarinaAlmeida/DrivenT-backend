import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import ticketsController from '@/controllers/ticket-controller';

const ticketRouter = Router();

ticketRouter
  .all('/*', authenticateToken)
  .get('/types', ticketsController.getTypes)
  .get('/', ticketsController.getUserTicket)
  .post('/');

export { ticketRouter };
