import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApplicationError } from '@/protocols';

export function handleApplicationErrors(
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err.name === 'CannotEnrollBeforeStartDateError') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === 'ConflictError' || err.name === 'DuplicatedEmailError') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === 'InvalidCredentialsError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === 'UnauthorizedError' || err.name === 'UnrelatedTicket') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === 'NotFoundError' || err.name === 'TicketNotFound') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === 'InvalidCepError') {
    return res.status(httpStatus.NO_CONTENT).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err.name);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
