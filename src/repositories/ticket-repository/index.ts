import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getType() {
  return prisma.ticketType.findMany();
}

async function getTickets(enrollmentId: number): Promise<
  Ticket & {
    TicketType: TicketType;
  }
> {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function postTicket(
  enrollmentId: number,
  ticketTypeId: number,
  id?: number,
): Promise<Ticket & { TicketType: TicketType }> {
  const createTicket = prisma.ticket.upsert({
    where: {
      id: id || 0,
    },
    create: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED,
    },
    update: {
      status: TicketStatus.RESERVED,
    },
    include: {
      TicketType: true,
    },
  });
  return createTicket;
}

const ticketRepository = {
  getType,
  getTickets,
  postTicket,
};

export default ticketRepository;
