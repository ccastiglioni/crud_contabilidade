import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const compras = await prisma.compra.findMany({
            orderBy: { id: 'desc' },
            include: {
                produto: true,
                fornecedor: true,
            },
        });


        return NextResponse.json(compras);

    } catch (error) {
        console.error('Erro ao buscar compras:', error); // log completo
        return NextResponse.json({ error: 'Erro ao buscar compras' }, { status: 500 });
    }
}



