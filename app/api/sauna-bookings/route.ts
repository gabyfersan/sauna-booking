import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { saunaSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({}, { status: 401 });
  // }
  const body = await request.json();

  const validation = saunaSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newSaunaBooking = await prisma.sauna.create({
    data: {
      bookedAtDateAndTime: body.bookedAtDateAndTime,
      message: body.message,
      shareSauna: body.shareSauna,
      bookedByUserId: body.bookedByUserId,
    },
  });

  return NextResponse.json(newSaunaBooking, { status: 201 });
}

export async function GET(request: NextRequest) {
  const allSaunaBookings = await prisma.sauna.findMany({
    where: {
      bookedAtDateAndTime: {
       // lte: "2013-12-29T10:00:00Z",
        gte: "2023-12-29T14:00:00Z",
      },
    },
    orderBy: { bookedAtDateAndTime: "desc" },
  });

  return NextResponse.json(allSaunaBookings, { status: 201 });
}
