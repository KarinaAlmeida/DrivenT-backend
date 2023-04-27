import { Hotel, Room } from '@prisma/client';
import hotelsRepository from '@/repositories/hotels-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import { forbiddenError } from '@/errors/forbidden-required-error';

async function getHotels(id: number): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.getTickets(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true || ticket.status === 'RESERVED')
    throw forbiddenError();

  const hotel = await hotelsRepository.getHotels();
  if (!hotel || hotel.length === 0) throw notFoundError();

  return hotel;
}

async function getHotelRooms(id: number, hotelId: number): Promise<Hotel & { Rooms: Room[] }> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketRepository.getTickets(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true || ticket.status === 'RESERVED')
    throw forbiddenError();

  const rooms = await hotelsRepository.getHotelRooms(hotelId);
  if (!rooms) throw notFoundError();

  return rooms;
}

const hotelsService = {
  getHotels,
  getHotelRooms,
};

export default hotelsService;
