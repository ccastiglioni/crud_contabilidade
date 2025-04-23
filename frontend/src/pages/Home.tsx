import { useEffect, useState } from 'react';

export default function Home() {
    const [produtos, setProdutos] = useState<string[]>([]);
    const [clientes, setClientes] = useState<string[]>([]);
    const [fornecedores, setFornecedores] = useState<string[]>([]);
    const [compras, setCompras] = useState<string[]>([]);

    async function fetchDados() {
        try {
            const [resProdutos, resClientes, resFornecedores, resCompras] = await Promise.all([
                fetch('/api/produtos/listar'),
                fetch('/api/clientes/listar'),
                fetch('/api/fornecedores/listar'),
                fetch('/api/compras/listar'),
            ]);
            //O .ok é true se o res.status estiver entre 200 e 299,
            if (!resProdutos.ok || !resClientes.ok || !resFornecedores.ok) {
                throw new Error('Erro ao buscar dados da API');
            }

            const produtosData = await resProdutos.json();
            const clientesData = await resClientes.json();
            const fornecedoresData = await resFornecedores.json();
            const comprasData = await resCompras.json();
            //console.log(comprasData)

            setProdutos(produtosData.map((p: any) => `${p.nome} (${p.quantidade})`));
            setClientes(clientesData.map((c: any) => c.nome));
            setFornecedores(fornecedoresData.map((f: any) => f.nome));
            setCompras(
                comprasData.map((comp: any) =>
                    `${comp.produto.nome} | Qtde: ${comp.quantidade} ${new Date(comp.criadoEm).toLocaleDateString('pt-BR')}`
                )
            );

        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    useEffect(() => {
        fetchDados();
    }, []);

    return (
        <div className="dark-container">
            <div className="dark-card">
                <h1>Bem-vindo à ContábilPro</h1>

                <hr className="hrcunt" />

                <div className="containerGrid">
                    <div className="gridItem">
                        <h3>🛒 Produtos</h3>
                        <ul>{produtos.map((p, i) => <li key={i}>{p}</li>)}</ul>
                    </div>
                    <div className="gridItem">
                        <h3>👥 Clientes</h3>
                        <ul>{clientes.map((c, i) => <li key={i}>{c}</li>)}</ul>
                    </div>
                    <div className="gridItem">
                        <h3>🏢 Fornecedores</h3>
                        <ul>{fornecedores.map((f, i) => <li key={i}>{f}</li>)}</ul>
                    </div>
                </div>
                <hr className="hrcunt" />
                <div className="containerGrid">
                    <div className="gridItem">
                        <h3>Compras</h3>
                        <ul>{compras.map((p, i) => <li key={i}> {p}</li>)}</ul>
                    </div>
                    <div className="gridItem">
                        <h3>Vendas</h3>
                        <ul>{clientes.map((c, i) => <li key={i}>{i}</li>)}</ul>
                    </div>
                    <div className="gridItem">
                        <h3>Relatório </h3>
                        <ul>{fornecedores.map((f, i) => <li key={i}> {i + i} </li>)}</ul>
                    </div>
                </div>

            </div>
        </div>
    );


}
