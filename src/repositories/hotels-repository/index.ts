import { prisma } from '@/config';

async function getHotels() {
  return prisma.hotel.findFirst();
}

async function getHotelRooms(hotelId: number) {
  return prisma.hotel.findMany({
    where: { id: hotelId },
    include: {
      Rooms: true,
    },
  });
}

// async function getPayment ( ticketId: number) {
//   return await prisma.payment.findFirst ( {
//     where: {ticketId}
//   })

// }

const hotelsRepository = {
  getHotels,
  getHotelRooms,
};

export default hotelsRepository;
