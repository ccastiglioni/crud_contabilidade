import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
/* ANTIGO
export async function GET() {
    try {
        const produtos = await prisma.produto.findMany({
            orderBy: { id: 'desc' },
            });
            
            return NextResponse.json(produtos);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error); // log completo
                return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
                }
        }
*/

export async function GET() {
    try {
        const produtos = await prisma.produto.findMany({
            orderBy: { id: 'desc' },
            include: {
                compras: {
                    select: { quantidade: true },
                },
            },
        });

        /*  com REDUCE :
         const produtosComQuantidade = produtos.map((produto) => {
            const totalQuantidade = produto.compras.reduce((soma, c) => soma + c.quantidade, 0);
            return {
                id: produto.id,
                nome: produto.nome,
                quantidade: totalQuantidade,
            };
        }); */

        const produtosComQuantidade = produtos.map((dbproduto) => {
            let totalQuantidade = 0;

            for (let i = 0; i < dbproduto.compras.length; i++) {
                totalQuantidade = totalQuantidade + dbproduto.compras[i].quantidade;
            }

            return {
                id: dbproduto.id,
                nome: dbproduto.nome,
                icmscredito: dbproduto.icmsCredito,
                icmsdebito: dbproduto.icmsDebito,
                quantidade: totalQuantidade,
            };
        });


        return NextResponse.json(produtosComQuantidade);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
    }
}
