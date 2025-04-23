import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <a className="navbar-brand" href="/">Contabilidade</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">


                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="cadastrosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Cadastros
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="cadastrosDropdown">
                                <li><Link className="dropdown-item" to="/cadastrar-produto">Produtos</Link></li>
                                <li><Link className="dropdown-item" to="/cadastrar-cliente">Clientes</Link></li>
                                <li><Link className="dropdown-item" to="/cadastrar-fornecedor">Fornecedores</Link></li>
                            </ul>
                        </li>

                        {/* Abas principais */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/compras">Compras</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/vendas">Vendas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/relatorios">Relatórios</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}
