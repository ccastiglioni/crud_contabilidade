import { useEffect, useState } from 'react';

type Produto = {
  id: number;
  nome: string;
  precoCompra: number;
  precoVenda: number;
  custoTotal: number;
  lucroEstimado: number;
  IRPJ: number;
  CSLL: number;
  PIS: number;
  COFINS: number;
  ICMS: number;
  lucroLiquido: number;
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
              <th>Lucro Bruto</th>
              <th>IRPJ</th>
              <th>CSLL</th>
              <th>PIS</th>
              <th>COFINS</th>
              <th>ICMS</th>
              <th className="text-success">Lucro Líquido</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>R$ {p.precoCompra.toFixed(2)}</td>
                <td>R$ {p.precoVenda.toFixed(2)}</td>
                <td>R$ {p.custoTotal.toFixed(2)}</td>
                <td>R$ {p.lucroEstimado.toFixed(2)}</td>
                <td>R$ {p.IRPJ.toFixed(2)}</td>
                <td>R$ {p.CSLL.toFixed(2)}</td>
                <td>R$ {p.PIS.toFixed(2)}</td>
                <td>R$ {p.COFINS.toFixed(2)}</td>
                <td>R$ {p.ICMS.toFixed(2)}</td>
                <td className={p.lucroLiquido >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                  R$ {p.lucroLiquido.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
