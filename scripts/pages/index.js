
// scripts/pages/index.js

// Fonction pour récupérer les photographes depuis le fichier JSON

async function getPhotographers() {
    try {
        console.log('Début de la récupération des photographes.');
        const response = await fetch('data/photographers.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Données récupérées :', data);

        return { photographers: data.photographers };
    } catch (error) {
        console.error('Erreur lors de la récupération des photographes :', error);
        return { photographers: [] }; // Retourner un tableau vide en cas d'erreur
    }

}

// Fonction pour créer une carte de photographe
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createPhotographerCard(photographer) {
    const article = document.createElement('article');
    article.setAttribute('tabindex', '0'); // Rendre l'article focusable
    article.setAttribute('aria-labelledby', `photographer-${photographer.id}`);

    article.innerHTML = `
        <h1 id="photographer-${photographer.id}">${photographer.name}</h1>
        <img src="${photographer.picture}" alt="Portrait de ${photographer.name}"/>
        <h2>${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p>
        <a href="contact.html?photographer=${photographer.id}" aria-label="Contacter ${photographer.name}">Contactez-moi</a>
    `;

    

    // Gestion des événements clavier pour l'article
    article.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            window.location.href = `contact.html?photographer=${photographer.id}`;
        }
    });

    return article;
}

// Fonction pour afficher les données des photographes sur la page
async function displayData(photographers) {
    console.log('Début de l\'affichage des photographes.');
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        console.log('Affichage du photographe :', photographer.name);

        

        if (typeof photographerTemplate === 'undefined') {
            console.error('La fonction photographerTemplate n\'est pas définie.');
            return;
        }
        // eslint-disable-next-line no-undef
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Fonction d'initialisation, appelée au chargement de la page
async function init() {
    // Récupère les datas des photographes
    console.log('Initialisation de la page d\'accueil.');
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

// Appel de la fonction d'initialisation
init();

