import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const clientes = await prisma.cliente.findMany({
            orderBy: { id: 'desc' },
        });

        return NextResponse.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error); // log completo
        return NextResponse.json({ error: 'Erro ao buscar cliente' }, { status: 500 });
    }

}
