import { useEffect, useState } from 'react';

export default function Home() {
    const [produtos, setProdutos] = useState<string[]>([]);
    const [clientes, setClientes] = useState<string[]>([]);
    const [fornecedores, setFornecedores] = useState<string[]>([]);
    const [compras, setCompras] = useState<string[]>([]);
    const [vendas, setVendas] = useState<string[]>([]);


    async function fetchDados() {
        try {
            const [resProdutos, resClientes, resFornecedores, resCompras, resVendas] = await Promise.all([
                fetch('/api/produtos/listar'),
                fetch('/api/clientes/listar'),
                fetch('/api/fornecedores/listar'),
                fetch('/api/compras/listar'),
                fetch('/api/vendas/listar'),
            ]);

            if (!resProdutos.ok || !resClientes.ok || !resFornecedores.ok || !resCompras.ok || !resVendas.ok) {
                throw new Error('Erro ao buscar dados da API');
            }

            const produtosData = await resProdutos.json();
            const clientesData = await resClientes.json();
            const fornecedoresData = await resFornecedores.json();
            const comprasData = await resCompras.json();
            const vendasData = await resVendas.json(); // 👈 novo

            setProdutos(produtosData.map((p: any) => `${p.nome} (${p.quantidade})`));
            setClientes(clientesData.map((c: any) => c.nome));
            setFornecedores(fornecedoresData.map((f: any) => f.nome));
            setCompras(
                comprasData.map((comp: any) =>
                    `${comp.produto.nome} | Qtde: ${comp.quantidade} - ${new Date(comp.criadoEm).toLocaleDateString('pt-BR')}`
                )
            );
            setVendas(
                vendasData.map((venda: any) =>
                    `${venda.produto.nome} | Qtde: ${venda.quantidade} - ${new Date(venda.criadoEm).toLocaleDateString('pt-BR')}`
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
                <h2>Bem-vindo à ContábilPro</h2>
                     <div className="card-tax-info">
                        <strong>Regime Tributário: Lucro Presumido</strong><br />
                        <span style={{ color: '#b6e3ff', fontWeight: 400, fontSize: '0.97em' }}>
                                Este sistema está configurado para empresas enquadradas no Lucro Presumido, utilizado principalmente por médias empresas.<br />
                        </span>
                    </div>

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
                        <ul>{compras.map((c, i) => <li key={i}>{c}</li>)}</ul>
                    </div>
                    <div className="gridItem">
                        <h3>Vendas</h3>
                        <ul>{vendas.map((v, i) => <li key={i}>{v}</li>)}</ul>
                    </div>
                    <div className="gridItem">
                        <h3>Relatório</h3>
                        <ul>
                            <li>Total de Compras: {compras.length}</li>
                            <li>Total de Vendas: {vendas.length}</li>
                        </ul>
                    </div>

                </div>

            </div>
                <footer className="footer-tax-info">
                <strong>Como funciona?</strong><br />
                <ul style={{ listStyle: "disc", textAlign: "left", display: "inline-block", margin: 0, paddingLeft: 20 }}>
                    <li>A base de cálculo dos impostos é presumida pelo governo (normalmente <b>8%</b> da receita para comércio e <b>32%</b> para serviços).</li>
                    <li>Os principais impostos apurados aqui são: <b>IRPJ</b>, <b>CSLL</b>, <b>PIS</b>, <b>COFINS</b> e <b>ICMS</b>.</li>
                    <li>O cálculo do lucro, custos e impostos segue os percentuais estabelecidos pela legislação vigente.</li>
                </ul>
                </footer>
            
        </div>
    );


}
