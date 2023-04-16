import { ApplicationError } from '@/protocols';

export function ticketNotFound(): ApplicationError {
  return {
    name: 'TicketNotFound',
    message: 'NO TICKET WAS FOUND',
  };
}
