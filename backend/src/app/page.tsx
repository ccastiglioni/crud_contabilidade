'use client';

import { useEffect, useState } from 'react';

type Produto = {
    id: number;
    nome: string;
    precoCompra: number;
    precoVenda: number;
    icmsCredito: number;
    icmsDebito: number;
    criadoEm: string;
};

export default function Home() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        fetch('/api/produtos/listar')
            .then((res) => res.json())
            .then((data) => {
                console.log('Resposta da API:', data);
                setProdutos(data);
            });
    }, []);


    console.log(produtos)

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Produtos Cadastrados</h1>
            {produtos.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                <table border={1} cellPadding={8}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Compra</th>
                            <th>Venda</th>
                            <th>ICMS Crédito</th>
                            <th>ICMS Débito</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nome}</td>
                                <td>{p.precoCompra}</td>
                                <td>{p.precoVenda}</td>
                                <td>{p.icmsCredito}</td>
                                <td>{p.icmsDebito}</td>
                                <td>{new Date(p.criadoEm).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
