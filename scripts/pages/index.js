
// scripts/pages/index.js

// Fonction pour récupérer les photographes depuis le fichier JSON

async function getPhotographers() {
    try {
        console.log('Début de la récupération des photographes.');
        const response = await fetch('/data/photographers.json');

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

