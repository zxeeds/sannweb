// app/api/user/transactions/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Ambil riwayat transaksi pengguna
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Ambil 10 transaksi terakhir saja
    });

    // Tambahkan nama game (ini hanya contoh, Anda perlu menyesuaikan dengan model database Anda)
    const transactionsWithGameInfo = await Promise.all(
      transactions.map(async (tx) => {
        // Di sini Anda dapat mengambil informasi game dari database jika memiliki model Game
        // Atau gunakan hardcoded mapping untuk contoh
        const gameNames = {
          'mobile-legends': 'Mobile Legends',
          'free-fire': 'Free Fire',
          'pubg-mobile': 'PUBG Mobile',
          'genshin-impact': 'Genshin Impact',
        };

        return {
          ...tx,
          gameName: gameNames[tx.gameId] || tx.gameId,
        };
      })
    );

    return NextResponse.json({ transactions: transactionsWithGameInfo });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}