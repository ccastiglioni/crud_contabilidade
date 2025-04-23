
function VendaProduto() {

    return (
        <div>
            <div className="container">
                <h2 className="text-white"> Vendas de Produtos</h2>
                <form action="">
                    <div className="mb-3">
                        <label className="form-label text-white">Fornecedor </label>
                        <select className="form-select" name="estado" id="">
                            <option value="">Fornecedor 1</option>
                            <option value="">Fornecedor 3</option>
                            <option value="">Fornecedor 44</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Produto </label>
                        <select className="form-select" name="estado" id="">
                            <option value="">Produto 13</option>
                            <option value="">Produto 54</option>
                            <option value="">Produto 177</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-white">Valor</label>
                        <input name='valor' className="form-control" type="text" />
                    </div>

                    <div>
                        <button type="submit"> Enviar</button>
                    </div>
                </form>
            </div>

        </div>
    );
}
export default VendaProduto;