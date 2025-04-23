import { useState } from "react";

function CadastraClientes() {
    const [nome, setNome] = useState('');
    const [doc, setDocument] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');

    async function Sendrequest(evt: React.FormEvent) {
        evt.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/clientes/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    cpfCnpj: doc,
                    cidade,
                    estado
                })
            });

            if (response.ok) {
                alert('Cliente cadastrado com sucesso!');
                setNome('');
                setDocument('');
                setCidade('');
                setEstado('');
            } else {
                alert('Erro ao cadastrar cliente.');
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro inesperado. Tente novamente.');
        }
    }

    return (
        <div className="container text-white">
            <h2>Cadastro de Clientes</h2>
            <form onSubmit={Sendrequest}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input onChange={e => setNome(e.target.value)} value={nome} type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">CPF/CNPJ</label>
                    <input onChange={e => setDocument(e.target.value)} value={doc} type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select value={estado} onChange={e => setEstado(e.target.value)} className="form-select" >
                        <option value="">Selecione o estado</option>
                        <option value="RS">RS</option>
                        <option value="SP">SP</option>
                        <option value="PR">PR</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Cidade</label>
                    <select value={cidade} onChange={e => setCidade(e.target.value)} className="form-select" >
                        <option value="">Selecione a cidade</option>
                        <option value="Santa Maria">Santa Maria</option>
                        <option value="São Luiz">São Luiz</option>
                        <option value="Santiago">Santiago</option>
                    </select>
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default CadastraClientes;
