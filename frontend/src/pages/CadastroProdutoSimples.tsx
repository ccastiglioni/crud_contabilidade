import { useState } from 'react';

export default function CadastroProdutoSimples() {
    const [nome, setNome] = useState('');
    const [precoCompra, setPrecoCompra] = useState('');
    const [precoVenda, setPrecoVenda] = useState('');
    const [icmsCredito, setIcmsCredito] = useState('');
    const [icmsDebito, setIcmsDebito] = useState('');

    /*
    const handleSubmit_arrow = async (e: React.FormEvent) => {  // async: transforma a função inteira em algo especial: ela retorna automaticamente uma Promise
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/produtos/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                precoCompra: parseFloat(precoCompra),
                precoVenda: parseFloat(precoVenda),
                icmsCredito: parseFloat(icmsCredito),
                icmsDebito: parseFloat(icmsDebito)
            })
        });

        if (response.ok) {
            alert('Produto cadastrado com sucesso!');
            setNome('');
            setPrecoCompra('');
            setPrecoVenda('');
            setIcmsCredito('');
            setIcmsDebito('');
        } else {
            alert('Erro ao cadastrar produto.');
        }
    };

*/

    async function handleSubmit_func(e: React.FormEvent) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/produtos/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    precoCompra: parseFloat(precoCompra),
                    precoVenda: parseFloat(precoVenda),
                    icmsCredito: parseFloat(icmsCredito),
                    icmsDebito: parseFloat(icmsDebito)
                })
            });

            if (response.ok) {
                alert('Produto cadastrado com sucesso!');
                setNome('');
                setPrecoCompra('');
                setPrecoVenda('');
                setIcmsCredito('');
                setIcmsDebito('');
            } else {
                alert('Erro ao cadastrar produto.');
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro inesperado. Tente novamente.');
        }
    }


    return (
        <div style={{ padding: '2rem' }}>
            <h1>Cadastro de Produto (Simples)</h1>
            <form onSubmit={handleSubmit_func} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <label>Nome</label>
                <input value={nome} onChange={e => setNome(e.target.value)} required />

                <label>Preço de Compra</label>
                <input type="number" step="0.01" value={precoCompra} onChange={e => setPrecoCompra(e.target.value)} required />

                <label>Preço de Venda</label>
                <input type="number" step="0.01" value={precoVenda} onChange={e => setPrecoVenda(e.target.value)} required />

                <label>ICMS Crédito</label>
                <input type="number" step="0.01" value={icmsCredito} onChange={e => setIcmsCredito(e.target.value)} required />

                <label>ICMS Débito</label>
                <input type="number" step="0.01" value={icmsDebito} onChange={e => setIcmsDebito(e.target.value)} required />

                <button type="submit" style={{ marginTop: '1rem' }}>Cadastrar</button>
            </form>
        </div>
    );
}
