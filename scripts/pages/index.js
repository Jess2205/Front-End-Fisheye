 // scripts/pages/index.js

async function getPhotographers() {
    try {
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


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

