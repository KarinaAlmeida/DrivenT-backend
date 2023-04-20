import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import hotelsController from '@/controllers/hotels-controller';

const hotelRouter = Router();

hotelRouter
  .all('/*', authenticateToken)
  .get('/', hotelsController.getHotels)
  .get('/:hotelId', hotelsController.getHotelRooms);

export { hotelRouter };
