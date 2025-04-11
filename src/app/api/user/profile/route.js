// app/api/user/profile/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { name, phone } = await request.json();

    // Validasi input
    if (!name) {
      return NextResponse.json(
        { error: "Nama wajib diisi" },
        { status: 400 }
      );
    }

    // Update data user
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        phone, // Perlu menambahkan field phone di model User jika belum ada
      },
    });

    // Menghilangkan password dari response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: "Profil berhasil diperbarui",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memperbarui profil" },
      { status: 500 }
    );
  }
}