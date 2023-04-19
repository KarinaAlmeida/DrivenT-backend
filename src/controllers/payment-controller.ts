import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payment-service';
import { PaymentObj, ticketId } from '@/protocols';

async function getPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { ticketId } = req.query as ticketId;
    const { userId } = req;
    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const paid = await paymentService.getPayment(parseInt(ticketId), userId);

    return res.status(httpStatus.OK).send(paid);
  } catch (error) {
    next(error);
  }
}

async function postPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const data = req.body as PaymentObj;
    if (!data.ticketId || !data.cardData) return res.sendStatus(httpStatus.BAD_REQUEST);
    const id = req.userId;
    const payment = await paymentService.postPayment(data, id);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}

const paymentController = {
  getPayment,
  postPayment,
};

export default paymentController;
