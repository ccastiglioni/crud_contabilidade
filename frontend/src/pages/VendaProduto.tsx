import { useEffect, useState } from "react";

function VendaProduto() {
    const [cliente, setCliente] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState('');
    const [quantidade, setQuantidade] = useState('');
   

    const [listaClientes, setListaClientes] = useState<any[]>([]);
    const [listaProdutos, setListaProdutos] = useState<any[]>([]);

    useEffect(() => {
        async function fetchClientes() {
            const res = await fetch('/api/clientes/listar');
            const data = await res.json();
            setListaClientes(data);
        }
        fetchClientes();
    }, []);

    useEffect(() => {
        async function fetchProdutos() {
            const res = await fetch('/api/produtos/listar');
            const data = await res.json();
            setListaProdutos(data);
        }
        fetchProdutos();
    }, []);

    async function SendRequest(e: React.FormEvent) {
        e.preventDefault();

        const response = await fetch('/api/vendas/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clienteId: cliente,
                produtoId: produto,
                valor,
                quantidade,
            }),
        });

        if (response.ok) {
            alert('Venda cadastrada com sucesso!');
            setCliente('');
            setProduto('');
            setValor('');
            setQuantidade('');
  
        } else {
            const errorMsg = await response.json();
            alert('Erro ao cadastrar Venda! '+ errorMsg.message);
            console.log('Erro:', errorMsg);
        }
    }

 

    return (
        <div className="container">
            <h2 className="text-white">Venda de Produtos</h2>
            
            <form onSubmit={SendRequest}>
                <div className="mb-3">
                    <label className="form-label text-white">Cliente</label>
                    <select value={cliente} onChange={e => setCliente(e.target.value)} className="form-select">
                        <option value="">Selecione um cliente</option>
                        {listaClientes.map((f, i) => (
                            <option key={i} value={f.id}>{f.nome}</option>
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

export default VendaProduto;
