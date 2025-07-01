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

        const { cnpj, nome, cidade, estado, compras } = body;

        const novoFornecedor = await prisma.fornecedor.create({
            data: { cnpj, nome, cidade, estado, compras },
        });

        return NextResponse.json(novoFornecedor, {
            status: 201,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error: any) {
        console.error('Erro ao cadastrar Fornecedor!:', error);

        const message = error?.message || 'Erro desconhecido';
        const code = error?.code || null;

        return NextResponse.json({
            error: 'Erro ao cadastrar Fornecedor!',
            message,
            code,
        }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}
