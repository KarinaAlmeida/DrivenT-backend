import { Ticket, TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getType(): Promise<TicketType[]> {
  const result = await ticketRepository.getType();
  return result;
}

async function getTickets(id: number): Promise<Ticket & { TicketType: TicketType }> {
  const enrollmentId = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollmentId) throw new Error();
  const tickets = await ticketRepository.getTickets(enrollmentId.id);
  if (!tickets) throw new Error();
  return tickets;
}

async function postTicket(id: number, ticketTypeId: number): Promise<Ticket & { TicketType: TicketType }> {
  const enrollmentId = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollmentId) throw new Error();
  const tickets = await ticketRepository.postTicket(enrollmentId.id, ticketTypeId);
  if (!tickets) throw new Error();
  return tickets;
}

const ticketsService = {
  getType,
  getTickets,
  postTicket,
};

export default ticketsService;
