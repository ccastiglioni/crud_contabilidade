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
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setProdutos(data);
      } else {
        setProdutos([]); // evita erro se vier objeto de erro
        console.error('Erro: retorno inesperado da API', data);
      }
    })
    .catch(err => {
      setProdutos([]);
      console.error('Erro ao carregar produtos', err);
    });
}, []);


  return (
    <div className="dark-container">
      <div className="dark-card">
        <h2>📦 Produtos Cadastrados</h2>
        <div className="mb-4" style={{ fontSize: '0.95em', color: '#aaa' }}>
  <strong>Cálculo do Lucro Líquido no Lucro Presumido:</strong><br />
  <span>
    <b>Base Presumida:</b> 8% da receita bruta para comércio (<code>precoVenda × 0.08</code>)<br />
    <b>IRPJ:</b> 15% da base presumida (<code>basePresumida × 0.15</code>)<br />
    <b>CSLL:</b> 9% da base presumida (<code>basePresumida × 0.09</code>)<br />
    <b>PIS:</b> 0,65% da receita bruta (<code>precoVenda × 0.0065</code>)<br />
    <b>COFINS:</b> 3% da receita bruta (<code>precoVenda × 0.03</code>)<br />
    <b>ICMS a recolher:</b> Débito - Crédito (<code>(precoVenda × icmsDébito%) - (precoCompra × icmsCrédito%)</code>)<br />
    <b>Lucro Líquido:</b> Lucro Bruto - Impostos e ICMS<br />
  </span>
  <span style={{ fontSize: '0.9em', color: '#ccc' }}>
    * Considerando alíquota de comércio (8%). Para serviços, use 32% como base.
  </span>
</div>


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
            {(produtos || []).map((p) => (
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
