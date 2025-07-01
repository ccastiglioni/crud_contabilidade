import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function OPTIONS() {
    return NextResponse.json({}, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { cpfCnpj, nome, cidade, estado } = body;

        const novoCliente = await prisma.cliente.create({
            data: { cpfCnpj, nome, cidade, estado },
        });

        return NextResponse.json(novoCliente, {
            status: 201,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        return NextResponse.json({ error: 'Erro ao cadastrar cliente' }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}
