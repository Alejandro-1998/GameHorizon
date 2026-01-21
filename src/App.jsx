import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import JuegoDetallesPage from './pages/JuegoDetallesPage';
import { FavoritesProvider } from './context/FavoritesContext';

import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Ruta Página de Inicio */}
            <Route index element={<HomePage />} />
            {/* Ruta Catálogo */}
            <Route path="catalogo" element={<CatalogoPage />} />
            {/* Ruta Favoritos */}
            <Route path="favoritos" element={<FavoritesPage />} />
            {/* Ruta Detalles Juego */}
            <Route path="game/:id" element={<JuegoDetallesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
