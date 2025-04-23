import { useState } from 'react';

export default function CadastroProduto() {
    const [form, setForm] = useState({
        nome: '',
        precoCompra: '',
        precoVenda: '',
        icmsCredito: '',
        icmsDebito: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/produtos/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: form.nome,
                precoCompra: parseFloat(form.precoCompra),
                precoVenda: parseFloat(form.precoVenda),
                icmsCredito: parseFloat(form.icmsCredito),
                icmsDebito: parseFloat(form.icmsDebito)
            })
        });

        if (response.ok) {
            alert('Produto cadastrado com sucesso!');
            setForm({ nome: '', precoCompra: '', precoVenda: '', icmsCredito: '', icmsDebito: '' });
        } else {
            alert('Erro ao cadastrar produto.');
        }
    };

    return (
        <div className="container mt-5 text-white">
            <h1 className="mb-4">Cadastro de Produtos</h1>
            <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '500px' }}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input name="nome" value={form.nome} onChange={handleChange} required className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Preço de Compra</label>
                    <input name="precoCompra" value={form.precoCompra} onChange={handleChange} type="number" step="0.01" required className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Preço de Venda</label>
                    <input name="precoVenda" value={form.precoVenda} onChange={handleChange} type="number" step="0.01" required className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Percentual de ICMS Crédito</label>
                    <input name="icmsCredito" value={form.icmsCredito} onChange={handleChange} type="number" step="0.01" required className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Percentual de ICMS Débito</label>
                    <input name="icmsDebito" value={form.icmsDebito} onChange={handleChange} type="number" step="0.01" required className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
            </form>
        </div>
    );

}
