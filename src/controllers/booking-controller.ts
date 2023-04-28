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
    const id = req.userId;
    const { roomId } = req.body;
    if (!roomId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const bookings = await bookingService.postBooking(id, parseInt(roomId));

    return res.status(httpStatus.OK).send({ bookingId: bookings });
  } catch (error) {
    next(error);
  }
}

async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const id = req.userId;
    const { roomId } = req.body;
    const { bookingId } = req.params;

    if (!roomId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const booking = await bookingService.updateBooking(id, parseInt(roomId), parseInt(bookingId));
    return res.status(httpStatus.OK).send({ bookingId: booking });
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
