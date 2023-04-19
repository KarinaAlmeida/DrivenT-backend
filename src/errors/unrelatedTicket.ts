import { ApplicationError } from '@/protocols';

export function unrelatedTicket(): ApplicationError {
  return {
    name: 'UnrelatedTicket',
    message: 'This ticket does not belong to this user',
  };
}
