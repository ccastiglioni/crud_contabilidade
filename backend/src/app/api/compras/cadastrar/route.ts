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

        const fornecedorId = parseInt(body.fornecedorId);
        const produtoId = parseInt(body.produtoId);

        const valor = parseInt(body.valor);
        const quantidade = parseInt(body.quantidade);

        // 🔒 Validação básica
        if (isNaN(fornecedorId) || isNaN(produtoId)) {
            throw new Error('IDs de fornecedor ou produto inválidos.');
        }

        if (isNaN(valor) || isNaN(quantidade)) {
            throw new Error('Valor ou quantidade inválida.');
        }

        const novaCompra = await prisma.compra.create({
            data: {
                fornecedorId,
                produtoId,
                valor,
                quantidade,
                icms: 0,
            }
        });

        return NextResponse.json(novaCompra, {
            status: 201,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error: any) {
        console.error('Erro ao cadastrar compra:', error);

        return NextResponse.json({
            error: 'Erro ao cadastrar compra',
            message: error.message,
            code: error.code || null
        }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}
