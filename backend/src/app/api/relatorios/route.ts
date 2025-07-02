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

// Função para cálculo Lucro Presumido (comércio, 8%)
function calculaLucroPresumido(p) {
    const precoVenda = p.precoVenda;
    const precoCompra = p.precoCompra;
    const icmsDebito = p.icmsDebito;
    const icmsCredito = p.icmsCredito;
    const lucroEstimado = p.lucroEstimado ?? (precoVenda - precoCompra);

    const basePresumida = precoVenda * 0.08; // 8% comércio
    const IRPJ = basePresumida * 0.15;
    const CSLL = basePresumida * 0.09;
    const PIS = precoVenda * 0.0065;
    const COFINS = precoVenda * 0.03;
    const ICMS = (precoVenda * (icmsDebito / 100)) - (precoCompra * (icmsCredito / 100));

    const lucroLiquido = lucroEstimado - IRPJ - CSLL - PIS - COFINS - ICMS;

    return {
        IRPJ, CSLL, PIS, COFINS, ICMS, lucroLiquido
    };
}

export async function GET() {
    try {
        const produtos = await prisma.produto.findMany();

        const produtosComLucro = produtos.map((p) => {
            const { IRPJ, CSLL, PIS, COFINS, ICMS, lucroLiquido } = calculaLucroPresumido(p);
            return {
                ...p,
                IRPJ,
                CSLL,
                PIS,
                COFINS,
                ICMS,
                lucroLiquido
            };
        });

        return NextResponse.json(produtosComLucro, {
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
