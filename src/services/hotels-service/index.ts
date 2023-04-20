import { Hotel, Room } from '@prisma/client';
import hotelsRepository from '@/repositories/hotels-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import { paymentRequired } from '@/errors/payment-required-error';

// async function verify () {

// }

async function getHotels(id: number): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findById(id);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.getTickets(enrollment.id);
  if (!ticket) throw notFoundError();

  // const payment = await hotelsRepository.getPayment (ticket.id)
  // if (!payment) throw

  if (ticket.TicketType.includesHotel === false) throw paymentRequired();
  if (ticket.TicketType.isRemote === true) throw paymentRequired();
  if (ticket.status !== 'PAID') throw paymentRequired();

  const hotel = await hotelsRepository.getHotels();
  if (!hotel) throw notFoundError();

  return hotel;
}

async function getHotelRooms(id: number, hotelId: number): Promise<Hotel & { Rooms: Room[] }> {
  const enrollment = await enrollmentRepository.findById(id);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.getTickets(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.TicketType.includesHotel === false) throw paymentRequired();
  if (ticket.TicketType.isRemote === true) throw paymentRequired();
  if (ticket.status !== 'PAID') throw paymentRequired();

  const rooms = await hotelsRepository.getHotelRooms(hotelId);
  if (!rooms) throw notFoundError();

  return rooms;
}

const hotelsService = {
  getHotels,
  getHotelRooms,
};

export default hotelsService;
