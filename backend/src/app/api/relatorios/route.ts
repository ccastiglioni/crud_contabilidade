import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function OPTIONS() {
    return NextResponse.json({}, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}

export async function GET() {
    try {
        const produtos = await prisma.produto.findMany();
        return NextResponse.json(produtos, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar produtos' }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}
