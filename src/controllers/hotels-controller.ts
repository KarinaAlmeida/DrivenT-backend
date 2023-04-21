import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const id = req.userId;
    const hotels = await hotelsService.getHotels(id);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    next(error);
  }
}

async function getHotelRooms(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const id = req.userId;
    const { hotelId } = req.params;
    const hotels = await hotelsService.getHotelRooms(id, parseInt(hotelId));
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const hotelsController = {
  getHotels,
  getHotelRooms,
};

export default hotelsController;
