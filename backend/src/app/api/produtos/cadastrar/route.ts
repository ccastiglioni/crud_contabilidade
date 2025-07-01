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
    const { nome, precoCompra, precoVenda, icmsCredito, icmsDebito } = body;

    const novoProduto = await prisma.produto.create({
      data: { nome, precoCompra, precoVenda, icmsCredito, icmsDebito },
    }); 

    return NextResponse.json(novoProduto, {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Erro ao cadastrar produto', message: error.message },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

