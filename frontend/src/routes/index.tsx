import { Route, Routes } from 'react-router-dom';
import CadastraClientes from '../pages/CadastroClientes';
import CadastraFornecedores from '../pages/CadastroFornecedores';
import CadastroProduto from '../pages/CadastroProduto';
import CompraProduto from '../pages/CompraProduto';
import Home from '../pages/Home';
import RelatorioProdutos from '../pages/RelatorioProdutos';
import VendaProduto from '../pages/VendaProduto';
export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastrar-produto" element={<CadastroProduto />} />
            <Route path="/cadastrar-cliente" element={<CadastraClientes />} />
            <Route path="/cadastrar-fornecedor" element={<CadastraFornecedores />} />
            <Route path="/compras" element={<CompraProduto />} />
            <Route path="/vendas" element={<VendaProduto />} />
            <Route path="/relatorios" element={<RelatorioProdutos />} />

        </Routes>
    )
}