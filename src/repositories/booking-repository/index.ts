import { Room } from '@prisma/client';
import { prisma } from '@/config';

async function findById(roomId: number): Promise<Room> {
  return await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

async function countSpots(roomId: number) {
  return await prisma.booking.count({
    where: {
      roomId,
    },
  });
}

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

async function postBooking(id: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: id,
      roomId,
    },
  });
}

async function updateBooking(id: number, roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
      userId: id,
    },
  });
}

const bookingRepository = {
  getBooking,
  postBooking,
  updateBooking,
  findById,
  countSpots,
};

export default bookingRepository;
