import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
// import enrollmentsService from '@/services/ticket-service';
import ticketService from '@/services/ticket-service';

export async function getTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const allTickets = await ticketService.getType();

    return res.status(httpStatus.OK).send(allTickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const id = req.userId;
    const allTickets = await ticketService.getTickets(id);

    return res.status(httpStatus.OK).send(allTickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

// async function postTickets() {}

const ticketsController = {
  getTypes,
  getUserTicket,
};

export default ticketsController;
