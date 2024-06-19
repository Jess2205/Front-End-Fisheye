// Fonction pour obtenir les données d'un photographe en fonction de son ID
async function getPhotographerData(id) {
    try {
        const response = await fetch('data/photographers.json');
        const data = await response.json();
        // Trouver et retourner le photographe correspondant à l'ID
        return {
            photographer: data.photographers.find(photographer => photographer.id === parseInt(id)),
            media: data.media.filter(media => media.photographerId === parseInt(id))
        };
    } catch (error) {
        console.error('Error fetching photographer data:', error);
    }
}

// Fonction pour afficher les données du photographe sur la page
function displayPhotographerData(photographer) {
    const detailsContainer = document.getElementById('photographer-details');
    
    // Vider le conteneur avant d'ajouter de nouveaux éléments
    detailsContainer.innerHTML = '';

    // Créer et ajouter les éléments avec les données du photographe
    const nameElement = document.createElement('h2');
    nameElement.textContent = photographer.name;

    const cityElement = document.createElement('p');
    cityElement.textContent = `${photographer.city}, ${photographer.country}`;

    const taglineElement = document.createElement('p');
    taglineElement.textContent = photographer.tagline;

    const portraitElement = document.createElement('img');
    portraitElement.setAttribute('src', `assets/photographers/${photographer.portrait}`);
    portraitElement.setAttribute('alt', photographer.name);

    // Ajouter les éléments au conteneur de détails
    detailsContainer.appendChild(nameElement);
    detailsContainer.appendChild(cityElement);
    detailsContainer.appendChild(taglineElement);
    detailsContainer.appendChild(portraitElement);
}

// Fonction pour afficher les médias du photographe sur la page
function displayMediaData(mediaList) {
    const mediaSection = document.querySelector('.media-section');
    mediaSection.innerHTML = ''; // Vider la section des médias

    mediaList.forEach(media => {
        const mediaCard = mediaFactory(media);
        mediaSection.appendChild(mediaCard.getMediaCardDOM());
    });
}

// Fonction d'initialisation pour charger les données au chargement de la page
async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    if (photographerId) {
        const { photographer, media } = await getPhotographerData(photographerId);
        if (photographer) {
            displayPhotographerData(photographer);
            displayMediaData(media);
        } else {
            console.error('Photographer not found');
        }
    } else {
        console.error('No photographer ID found in URL');
    }
}

// Appel de la fonction d'initialisation
init();
