import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const vendas = await prisma.venda.findMany({
            orderBy: { id: 'desc' },
            include: {
                produto: true,
            },
        });


        return NextResponse.json(vendas);

    } catch (error) {
        console.error('Erro ao buscar vendas:', error); // log completo
        return NextResponse.json({ error: 'Erro ao buscar vendas' }, { status: 500 });
    }
}



