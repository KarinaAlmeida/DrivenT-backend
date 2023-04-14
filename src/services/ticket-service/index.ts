import { Ticket, TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getType(): Promise<TicketType[]> {
  const result = await ticketRepository.getType();
  return result;
}

async function getTickets(id_user: number): Promise<
  Ticket & {
    TicketType: TicketType;
  }
> {
  const enrollmentId = await enrollmentRepository.findWithAddressByUserId(id_user);
  if (!enrollmentId) throw new Error();
  const tickets = await ticketRepository.getTickets(enrollmentId.id);
  if (!tickets) throw new Error();
  return tickets;
}

const ticketsService = {
  getType,
  getTickets,
};

export default ticketsService;
