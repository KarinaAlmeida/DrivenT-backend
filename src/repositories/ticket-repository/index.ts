import { Ticket, TicketType } from '@prisma/client';
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

const ticketRepository = {
  getType,
  getTickets,
};

export default ticketRepository;
