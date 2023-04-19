import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import ticketsController from '@/controllers/ticket-controller';
import { ticketSchema } from '@/schemas/ticket-schema';

const ticketRouter = Router();

ticketRouter
  .all('/*', authenticateToken)
  .get('/types', ticketsController.getTypes)
  .get('/', ticketsController.getUserTicket)
  .post('/', validateBody(ticketSchema), ticketsController.postTickets);

export { ticketRouter };
