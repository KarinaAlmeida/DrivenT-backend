import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import { paymentRequired } from '@/errors/payment-required-error';

async function getBooking(id: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.getTickets(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true || ticket.status === 'RESERVED')
    throw paymentRequired();

  const booking = await bookingRepository.getBooking();
  if (!booking || booking.length === 0) throw notFoundError();

  return booking;
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
