import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="full-width-content mt-4">
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
}

export default App;
