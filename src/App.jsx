import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import JuegoDetallesPage from './pages/JuegoDetallesPage';

import PublisherPage from './pages/PublisherPage';
import PublisherCatalogPage from './pages/PublisherCatalogPage';
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
            {/* Ruta Detalles Publisher */}
            <Route path="publishers/:id" element={<PublisherPage />} />
            {/* Ruta Catálogo Publishers */}
            <Route path="publishers" element={<PublisherCatalogPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
