export const events = [
    {
        id: 1,
        title: "Gaming Expo 2025",
        location: "New York",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        date: "2025-06-15",
        description: "El evento de gaming más grande del año. Descubre los últimos lanzamientos y tecnología."
    },
    {
        id: 2,
        title: "Indie Game Developers Meetup",
        location: "San Francisco",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
        date: "2025-07-20",
        description: "Conecta con desarrolladores indie, comparte ideas y prueba demos exclusivas."
    },
    {
        id: 3,
        title: "Esports Championship",
        location: "Los Angeles",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
        date: "2025-08-10",
        description: "La final del campeonato mundial. Los mejores equipos compiten por la gloria."
    },
    {
        id: 4,
        title: "Retro Gaming Night",
        location: "Madrid",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        date: "2025-09-05",
        description: "Una noche para recordar los clásicos. Torneos de arcade, música chiptune y más."
    },
    {
        id: 5,
        title: "VR Showcase",
        location: "Tokyo",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        date: "2025-10-12",
        description: "Experimenta el futuro del gaming con las últimas novedades en Realidad Virtual."
    }
];

export const fetchEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(events);
        }, 500);
    });
};
