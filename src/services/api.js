const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

/**
 * Obtiene una lista de videojuegos populares.
 * @param {number} page
 * @param {number} pageSize
 */
export const getPopularGames = async (page = 1, pageSize = 12) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&ordering=-added&page_size=${pageSize}&page=${page}`);
        if (!response.ok) {
            throw new Error('Error al obtener los juegos populares');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { results: [], count: 0 };
    }
};

/**
 * Obtiene los juegos en tendencia (Top 2025).
 */
export const getTrendingGames = async () => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&dates=2025-01-01,2025-12-31&ordering=-added&page_size=5`);
        if (!response.ok) {
            throw new Error('Error al obtener los juegos en tendencia');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

/**
 * Busca videojuegos por nombre.
 * @param {string} query
 * @param {number} page
 * @param {number} pageSize
 */
export const searchGames = async (query, page = 1, pageSize = 24) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${query}&page_size=${pageSize}&page=${page}`);
        if (!response.ok) {
            throw new Error('Error al buscar juegos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { results: [], count: 0 };
    }
};

/**
 * Obtiene los detalles de un videojuego específico.
 * @param {string|number} id
 */
export const getGameDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del juego');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Obtiene los detalles de un publisher específico.
 * @param {string|number} id
 */
export const getPublisherDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/publishers/${id}?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del publisher');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Obtiene lista de juegos con filtros avanzados.
 * @param {object} params
 */
export const getGames = async ({ page = 1, pageSize = 24, search = '', genre = '', platform = '', ordering = '-added', dates = '', ids = '', tags = '', publishers = '' }) => {
    try {
        const queryParams = new URLSearchParams({
            key: API_KEY,
            page: page.toString(),
            page_size: pageSize.toString(),
            ordering: ordering,
        });

        if (search) queryParams.append('search', search);
        if (genre) queryParams.append('genres', genre);
        if (platform) queryParams.append('parent_platforms', platform); // parent_platforms para filtrar por Padres (PC, PlayStation, etc)
        if (dates) queryParams.append('dates', dates);
        if (ids) queryParams.append('ids', ids);
        if (tags) queryParams.append('tags', tags);
        if (publishers) queryParams.append('publishers', publishers);

        const response = await fetch(`${BASE_URL}/games?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error('Error al obtener juegos');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return { results: [], count: 0 };
    }
};

export const getGenres = async () => {
    try {
        const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        return [];
    }
};

export const getPlatforms = async () => {
    try {
        // Obtenemos plataformas padre para simplificar (PC, PlayStation, Xbox, etc)
        const response = await fetch(`${BASE_URL}/platforms/lists/parents?key=${API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        return [];
    }
};

export const getTags = async (search = '') => {
    try {
        const query = search ? `&search=${search}` : '';
        const response = await fetch(`${BASE_URL}/tags?key=${API_KEY}&page_size=20${query}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        return [];
    }
};

export const getPublishers = async (search = '', page = 1, pageSize = 24) => {
    try {
        const query = search ? `&search=${search}` : '';
        const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=${pageSize}${query}`);
        const data = await response.json();
        return data; // Return full data for pagination { count, results, ... }
    } catch (error) {
        return { results: [], count: 0 };
    }
};

/**
 * Obtiene las capturas de pantalla de un juego.
 * @param {string|number} id
 */
export const getGameScreenshots = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Error al obtener capturas');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};
