import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      include: {
        compras: { select: { quantidade: true } },
        vendas:  { select: { quantidade: true } },
      },
      orderBy: { id: 'desc' }
    });

    // Calcula saldo (quantidade em estoque) para cada produto
    const produtosComSaldo = produtos.map((p) => {
      const totalComprado = p.compras.reduce((soma, c) => soma + c.quantidade, 0);
      const totalVendido  = p.vendas.reduce((soma, v) => soma + v.quantidade, 0);
      return {
        ...p,
        quantidade: totalComprado - totalVendido,
      };
    });

    return NextResponse.json(produtosComSaldo, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
}
