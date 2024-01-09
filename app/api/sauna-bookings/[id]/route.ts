import { patchSaunaSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({}, { status: 401 });
  // }
  const body = await request.json();
  const validation = patchSaunaSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { message, shareSauna, bookedByUserId } = body;

  if (bookedByUserId) {
    const user = await prisma.user.findUnique({
      where: { id: bookedByUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }
  }
  const booking = await prisma.sauna.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!booking) {
    return NextResponse.json({ error: "Invalid booking" }, { status: 404 });
  }

  const updatedBooking = await prisma.sauna.update({
    where: { id: booking.id },
    data: {
      message,
      shareSauna,
    },
  });

  return NextResponse.json(updatedBooking, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({}, { status: 401 });
  // }
  const booking = await prisma.sauna.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!booking) {
    return NextResponse.json({ error: "Invalid booking" }, { status: 404 });
  }

  await prisma.sauna.delete({ where: { id: booking.id } });

  return NextResponse.json({});
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({}, { status: 401 });
  // }

  const saunaBooking = await prisma.sauna.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json(saunaBooking, { status: 201 });
}
