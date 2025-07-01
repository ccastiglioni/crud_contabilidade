import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const fornecedor = await prisma.fornecedor.findMany({
            orderBy: { id: 'desc' },
        });

        return NextResponse.json(fornecedor);
    } catch (error) {
        console.error('Erro ao buscar fornecedor:', error); // log completo
        return NextResponse.json({ error: 'Erro ao buscar fornecedor' }, { status: 500 });
    }

}
