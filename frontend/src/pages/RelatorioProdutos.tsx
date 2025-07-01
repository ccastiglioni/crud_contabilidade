import { useEffect, useState } from 'react';

type Produto = {
  id: number;
  nome: string;
  precoCompra: number;
  precoVenda: number;
  custoTotal: number;
};

export default function RelatorioProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    fetch('http://localhost/api/relatorios')
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error('Erro ao carregar produtos', err));
  }, []);

  return (
     <div className="dark-container">
            <div className="dark-card">
      <h2>📦 Produtos Cadastrados</h2>
      <table className="table table-striped table-bordered table-dark">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço Compra</th>
            <th>Preço Venda</th>
            <th>Custo Total</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>R$ {p.precoCompra.toFixed(2)}</td>
              <td>R$ {p.precoVenda.toFixed(2)}</td>
              <td>R$ {p.custoTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-5">💰 Cálculo de Lucro</h2>
      <table className="table table-striped table-bordered table-success">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço Venda</th>
            <th>Custo Total</th>
            <th>Lucro</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => {
            const lucro = p.precoVenda - p.custoTotal;
            return (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>R$ {p.precoVenda.toFixed(2)}</td>
                <td>R$ {p.custoTotal.toFixed(2)}</td>
                <td className={lucro >= 0 ? 'text-success' : 'text-danger'}>
                  R$ {lucro.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}
