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

        const produtoId = parseInt(body.produtoId);
        const clienteId = parseInt(body.clienteId);  
        const valor = parseFloat(body.valor);
        const quantidade = parseInt(body.quantidade);

        if (isNaN(produtoId) || isNaN(clienteId) || isNaN(valor) || isNaN(quantidade)) {
            throw new Error('Campos inválidos: cliente, produto, valor ou quantidade.');
        }

        // Busca o produto para pegar o ICMS de débito e estoque atual
        const produto = await prisma.produto.findUnique({
            where: { id: produtoId },
        });

        if (!produto) {
            throw new Error('Produto não encontrado.');
        }

        // Validação de estoque mínimo
        const compras = await prisma.compra.findMany({
            where: { produtoId },
        });
        const vendas = await prisma.venda.findMany({
            where: { produtoId },
        });

        const totalComprado = compras.reduce((soma, c) => soma + c.quantidade, 0);
        const totalVendido = vendas.reduce((soma, v) => soma + v.quantidade, 0);
        const estoqueAtual = totalComprado - totalVendido;

        if (quantidade > estoqueAtual) {
            throw new Error(`Estoque insuficiente. Disponível: ${estoqueAtual}`);
        }

        // Cálculo do ICMS débito
        const icms = valor * (produto.icmsDebito / 100);

        // Registra a venda COM clienteId
        const novaVenda = await prisma.venda.create({
            data: {
                produtoId,
                clienteId, 
                valor,
                quantidade,
                icms,
            }
        });

        return NextResponse.json(novaVenda, {
            status: 201,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error: any) {
        console.error('Erro ao cadastrar venda:', error);
        //console.debug('payload:', data);

        return NextResponse.json({
            error: 'Erro ao cadastrar venda',
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
