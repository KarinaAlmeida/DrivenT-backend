import { ApplicationError } from '@/protocols';

export function invalidCepError(): ApplicationError {
  return {
    name: 'InvalidCepError',
    message: 'Your cep must be 8 numbers long!',
  };
}
