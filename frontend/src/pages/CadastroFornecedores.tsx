import { useState } from "react";

function CadastraFornecedores() {
    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    //const [compras, setCompras] = useState('')

    async function Sendrequest(evt: React.FormEvent) {
        evt.preventDefault();

        try {

            const response = await fetch('http://localhost:3000/api/fornecedores/cadastrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome,
                    cnpj,
                    cidade,
                    estado
                })
            })

            if (response.ok) {
                alert('Cliente cadastrado com sucesso!');
                setNome('');
                setCnpj('');
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
        <div>
            <div className="container text-white">
                <h2>Cadastra Fornecedores</h2>
                <form onSubmit={Sendrequest} action="" >
                    <div className="mb-3">
                        <label className="form-label">Nome </label>
                        <input value={nome} onChange={e => setNome(e.target.value)} className="form-control" type="text" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">CPF/CNPJ </label>
                        <input value={cnpj} onChange={e => setCnpj(e.target.value)} className="form-control" type="text" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Estado </label>
                        <select value={estado} onChange={e => setEstado(e.target.value)} className="form-select" name="estado" id="">
                            <option value="">..Selecione</option>
                            <option value="RS">RS</option>
                            <option value="SP">SP</option>
                            <option value="PR">PR</option>
                            <option value="GO">GO</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cidade </label>
                        <select value={cidade} onChange={e => setCidade(e.target.value)} className="form-select" name="cidade" id="">
                            <option value="">..Selecione</option>
                            <option value="santa maria">santa maria</option>
                            <option value="são luiz">são luiz</option>
                            <option value="santiago">santiago</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit"> Enviar</button>
                    </div>
                </form>
            </div>

        </div>
    );
}
export default CadastraFornecedores;