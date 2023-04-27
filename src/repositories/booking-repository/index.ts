import { Room } from '@prisma/client';
import { prisma } from '@/config';

async function getBooking(id: number): Promise<{ Room: Room; id: number }> {
  return await prisma.booking.findFirst({
    where: {
      userId: id,
    },
    select: {
      id: true,
      Room: true,
    },
  });
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
