import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const id = req.userId;
  try {
    const hotels = hotelsService.getHotels(id);
    res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  try {
    const id = req.userId;
    const { hotelId } = req.params;
    const hotels = hotelsService.getHotelRooms(parseInt(hotelId), id);
    res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

const hotelsController = {
  getHotels,
  getHotelRooms,
};

export default hotelsController;
