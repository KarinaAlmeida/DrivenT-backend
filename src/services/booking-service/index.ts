import { Room } from '@prisma/client';
import bookingRepository from '@/repositories/booking-repository';
// import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
// import ticketRepository from '@/repositories/ticket-repository';
import { forbiddenError } from '@/errors/forbidden-required-error';

async function getBooking(id: number): Promise<{ Room: Room; id: number }> {
  const bookings = await bookingRepository.getBooking(id);

  if (!bookings) throw notFoundError();

  return bookings;
}

async function postBooking() {
  const booking = await bookingRepository.postBooking();
  return booking;
}

async function updateBooking() {
  const booking = await bookingRepository.updateBooking();
  return booking;
}

const bookingService = {
  getBooking,
  postBooking,
  updateBooking,
};

export default bookingService;
