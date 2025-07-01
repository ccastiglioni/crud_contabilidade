import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

/* 
Essa função trata requisições HTTP do tipo OPTIONS, que são enviadas automaticamente pelo navegador antes de requisições POST, PUT, DELETE etc., 
Quando há CORS (CORS significa Cross-Origin Resource Sharing. Ele é um mecanismo de segurança(é uma regra de segurança implementada pelos navegadores para proteger o usuário) usado pelos navegadores para proteger o usuário de aplicações maliciosas) envolvido 
O que o navegador faz?
Antes de enviar a requisição POST, ele pergunta ao servidor:
"Ei, backend, você aceita receber dados de outro domínio?"
Essa pergunta é enviada como uma requisição OPTIONS.
Se o servidor não responder com os headers certos, o navegador bloqueia a requisição, mesmo que o backend esteja funcionando perfeitamente.
OBS: O navegador só considera a "mesma origem" se todos esses forem idênticos: Protocolo(http OK) Domínio(localhost OK) e Porta (Front 80 e Back 3000),são diferentes, logo tem que aplicar o OPTION
*/
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

    const preco = parseFloat(precoCompra);
    const icms = parseFloat(icmsCredito);
    const custoTotal = preco + (preco * (icms / 100));

    const novoProduto = await prisma.produto.create({
      data: {
        nome, 
        precoCompra,
        precoVenda,
        icmsCredito,
        icmsDebito,
        custoTotal
      },
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
    return NextResponse.json({
      error: 'Erro ao cadastrar produto',
      message: error.message,
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
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


