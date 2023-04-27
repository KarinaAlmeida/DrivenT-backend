import { Room } from '@prisma/client';
import hotelsService from '../hotels-service';
import bookingRepository from '@/repositories/booking-repository';
import { notFoundError } from '@/errors';
import { forbiddenError } from '@/errors/forbidden-required-error';

async function roomAvailable(roomId: number) {
  const rooms = await bookingRepository.findById(roomId);
  if (!rooms) throw notFoundError();

  const spotsReserved = await bookingRepository.countSpots(roomId);

  if (spotsReserved >= rooms.capacity) throw forbiddenError();

  return rooms;
}

async function getBooking(id: number): Promise<{ Room: Room; id: number }> {
  const bookings = await bookingRepository.getBooking(id);

  if (!bookings) throw notFoundError();

  return bookings;
}

async function postBooking(id: number, roomId: number) {
  await hotelsService.ticketAndPayment(id);
  await roomAvailable(roomId);

  const booking = await bookingRepository.postBooking(id, roomId);
  return booking;
}

async function updateBooking(id: number, roomId: number, bookingId: number) {
  const hasBooking = await bookingRepository.getBooking(id);
  if (!hasBooking) throw forbiddenError();

  const booking = await bookingRepository.updateBooking(id, roomId, bookingId);
  return booking;
}

const bookingService = {
  getBooking,
  postBooking,
  updateBooking,
};

export default bookingService;
