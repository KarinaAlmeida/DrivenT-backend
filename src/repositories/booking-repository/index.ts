import { prisma } from '@/config';

async function getBooking() {
  return prisma.booking.findMany();
}

async function postBooking() {
  return prisma.booking.findMany();
}

async function updateBooking() {
  return prisma.booking.findMany();
}

const bookingRepository = {
  getBooking,
  postBooking,
  updateBooking,
};

export default bookingRepository;
