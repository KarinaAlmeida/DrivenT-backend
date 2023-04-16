import { Payment, TicketType, Ticket, Enrollment } from '@prisma/client';
import { prisma } from '@/config';
import { PaymentObj } from '@/protocols';

async function getTicketsById(ticketId: number): Promise<
  Ticket & {
    Enrollment: Enrollment;
    TicketType: TicketType;
  }
> {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: {
      Enrollment: true,
      TicketType: true,
    },
  });
}

async function getPayment(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function postPayment(data: PaymentObj, price: number): Promise<Payment> {
  return prisma.payment.create({
    data: {
      ticketId: data.ticketId,
      value: price,
      cardIssuer: data.cardData.issuer,
      cardLastDigits: data.cardData.number.toString().slice(-4),
    },
  });
}

const paymentRepository = {
  getPayment,
  postPayment,
  getTicketsById,
};

export default paymentRepository;
