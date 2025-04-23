import { useEffect, useState } from "react";

function CompraProduto() {
    const [fornecedor, setFornecedor] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valorIcms, setvalorIcms] = useState('0');

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

    async function SendRequest(e: React.FormEvent) {
        e.preventDefault();
        //console.log({ fornecedor, produto, valor, quantidade });
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

    useEffect(() => {
        // Só roda se ambos tiverem valor preenchido
        if (!produto || !valor) return;

        const produtoSelecionado = listaProdutos.find(p => p.id === parseInt(produto));

        if (produtoSelecionado) {
            const base = parseFloat(valor);
            const icms = produtoSelecionado.icmscredito;

            const valorFinal = base * (icms / 100);
            setvalorIcms(valorFinal.toFixed(2));
        }
    }, [produto, valor, listaProdutos]);

    return (
        <div className="container">
            <h2 className="text-white">Compra de Produtos</h2>
            <p className="text-white"> Valor Credito de ICMS : {valorIcms} </p>
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
                    <label className="form-label text-white">Valor</label>
                    <input
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Quantidade</label>
                    <input
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
                        className="form-control"
                        type="text"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}

export default CompraProduto;
