import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah digunakan" },
        { status: 400 }
      );
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Hilangkan password dari respons
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "Pendaftaran berhasil", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saat registrasi:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat pendaftaran" },
      { status: 500 }
    );
  }
}