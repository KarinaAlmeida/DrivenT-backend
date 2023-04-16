import { Payment } from '@prisma/client';
import paymentRepository from '@/repositories/payment-repository';
import { ticketNotFound } from '@/errors/ticketNotFound';
import { unrelatedTicket } from '@/errors/unrelatedTicket';
import { PaymentObj } from '@/protocols';
import ticketRepository from '@/repositories/ticket-repository';

async function getPayment(ticketId: number, id: number): Promise<Payment> {
  const ticket = await paymentRepository.getTicketsById(ticketId);

  if (!ticket) throw ticketNotFound();

  if (id !== ticket.Enrollment.userId) throw unrelatedTicket();

  return await paymentRepository.getPayment(ticketId);
}

async function postPayment(data: PaymentObj, id: number): Promise<Payment> {
  const status = 'PAID';
  const ticket = await paymentRepository.getTicketsById(data.ticketId);

  if (!ticket) throw ticketNotFound();

  if (id !== ticket.Enrollment.userId) throw unrelatedTicket();

  const payment = await paymentRepository.postPayment(data, ticket.TicketType.price);

  await ticketRepository.postTicket(ticket.ticketTypeId, ticket.enrollmentId, status, ticket.id);
  return payment;
}

const paymentService = {
  getPayment,
  postPayment,
};

export default paymentService;
