import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const id = req.userId;
    const booking = await bookingService.getBooking(id);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

async function postBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const booking = await bookingService.postBooking();
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const booking = await bookingService.updateBooking();
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

const bookingController = {
  getBooking,
  postBooking,
  updateBooking,
};

export default bookingController;
