import { useEffect, useState } from "react";

function CompraProduto() {
    const [fornecedor, setFornecedor] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valorIcms, setvalorIcms] = useState('0');
    const [icmsARecolher, setIcmsARecolher] = useState('0');

    const [listaFornecedores, setListaFornecedores] = useState<any[]>([]);
    const [listaProdutos, setListaProdutos] = useState<any[]>([]);

    useEffect(() => {
        async function fetchFornecedores() {
            try {
                const res = await fetch('/api/fornecedores/listar');
                const data = await res.json();
                setListaFornecedores(data);
            } catch (error) {
                console.error('Erro ao carregar fornecedores:', error);
            }
        }
        fetchFornecedores();
    }, []);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const res = await fetch('/api/produtos/listar');
                const data = await res.json();
                setListaProdutos(data);
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
            }
        }
        fetchProdutos();
    }, []);

    // ATENÇÃO: Recalcula ICMS toda vez que mudar produto, valor ou quantidade
        useEffect(() => {
            if (!produto) {
                setvalorIcms('0');
                setIcmsARecolher('0');
                return;
            }
            const produtoSelecionado = listaProdutos.find(p => p.id === parseInt(produto));
            if (produtoSelecionado) {
                // Usa valor digitado APENAS para compra
                const precoCompra = valor && parseFloat(valor) > 0 ? parseFloat(valor) : produtoSelecionado.precoCompra;
                // SEMPRE usa precoVenda cadastrado no produto para débito
                const precoVenda = produtoSelecionado.precoVenda;
                const icmsCredito = produtoSelecionado.icmsCredito;
                const icmsDebito = produtoSelecionado.icmsDebito;
                const qtd = quantidade ? parseInt(quantidade) : 1;

                // Crédito ICMS (COMPRA)
                const credito = precoCompra * qtd * (icmsCredito / 100);
                // Débito ICMS (VENDA)
                const debito = precoVenda * qtd * (icmsDebito / 100);
                
                console.log('debito: ',debito)
                // ICMS a recolher (venda - compra)
                const aRecolher = debito - credito;
                console.log('aRecolher: ',aRecolher)

                setvalorIcms(credito.toFixed(2));
                setIcmsARecolher(aRecolher.toFixed(2));
            } else {
                setvalorIcms('0');
                setIcmsARecolher('0');
            }
        }, [produto, valor, quantidade, listaProdutos]);


    async function SendRequest(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/compras/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fornecedorId: fornecedor,
                    produtoId: produto,
                    valor,
                    quantidade
                })
            });

            if (response.ok) {
                alert('Compra Efetuada com sucesso!');
                setFornecedor('');
                setProduto('');
                setValor('');
                setQuantidade('');
            } else {
                alert('Erro ao cadastrar a compra! ');
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro inesperado. Tente novamente.');
        }
    }

    return (
        <div className="container">
            <h2 className="text-white">Compra de Produtos</h2>

            <p className="text-white">
                Valor Crédito de ICMS: R$ {valorIcms}
                <br />
                <span style={{ fontSize: '0.99em', color: '#aaf' }}>
                    ICMS a recolher no Momento venda desse produto: <b>R$ {icmsARecolher}</b>
                </span>
            </p>

            <form onSubmit={SendRequest}>
                <div className="mb-3">
                    <label className="form-label text-white">Fornecedor</label>
                    <select value={fornecedor} onChange={e => setFornecedor(e.target.value)} className="form-select">
                        <option value="">Selecione um fornecedor</option>
                        {listaFornecedores.map((fornec, i) => (
                            <option key={i} value={fornec.id}> {fornec.nome} </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label text-white">Produto</label>
                    <select value={produto} onChange={e => setProduto(e.target.value)} className="form-select">
                        <option value="">Selecione um produto</option>
                        {listaProdutos.map((p, i) => (
                            <option key={i} value={p.id}>{p.nome}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label text-white">Quantidade</label>
                    <input
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
                        className="form-control"
                        type="number"
                        min="1"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-white">Valor (por unidade)</label>
                    <input
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                        className="form-control"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Valor unitário da compra"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}

export default CompraProduto;
