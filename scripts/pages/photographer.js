// Fonction pour obtenir les données d'un photographe en fonction de son ID
async function getPhotographerData(id) {
    console.log(`Récupération des données pour le photographe avec l'ID: ${id}`);
    
    try {
        const response = await fetch('../data/photographers.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Données récupérées:', data);
        
        // Trouver et retourner le photographe correspondant à l'ID
        const photographer = data.photographers.find(photographer => photographer.id === parseInt(id));
        const media = data.media.filter(media => media.photographerId === parseInt(id));
        
        console.log('Photographe trouvé:', photographer);
        console.log('Médias trouvés:', media);
        
        return { photographer, media };
    } catch (error) {
        console.error('Erreur lors de la récupération des données du photographe:', error);
        return { photographer: null, media: [] }; // Retourner un photographe nul et une liste de médias vide en cas d'erreur
    }
}

// Fonction pour afficher les données du photographe sur la page
function displayPhotographerData(photographer) {
    console.log('Affichage des données du photographe:', photographer);
    
    const detailsContainer = document.getElementById('photographer-details');
    
    if (!detailsContainer) {
        console.error('Le conteneur des détails du photographe est introuvable.');
        return;
    }


    // Vider le conteneur avant d'ajouter de nouveaux éléments
    detailsContainer.innerHTML = '';

    // Créer le conteneur pour les informations
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('text-container'); // Ajouter la classe 'text-container'

    // Créer et ajouter les éléments avec les données du photographe
    const nameElement = document.createElement('h2');
    nameElement.textContent = photographer.name;

    const cityElement = document.createElement('h1');
    cityElement.textContent = `${photographer.city}, ${photographer.country}`;

    const taglineElement = document.createElement('span');
    taglineElement.textContent = photographer.tagline;

    
    const portraitElement = document.createElement('img');
    portraitElement.setAttribute('src', `assets/photographers/${photographer.portrait}`);
    portraitElement.setAttribute('alt', photographer.name);
    console.log(portraitElement); // Assurez-vous que cet élément est correct


     // Ajouter les éléments au text container
     infoContainer.appendChild(nameElement);
     infoContainer.appendChild(cityElement);
     infoContainer.appendChild(taglineElement);

    // Ajouter les éléments au conteneur de détails
    detailsContainer.appendChild(infoContainer);
    detailsContainer.appendChild(portraitElement);
}

// Fonction pour afficher les médias du photographe sur la page
function displayMediaData(mediaList) {
    console.log('Affichage des médias du photographe:', mediaList);
    
    const mediaSection = document.querySelector('.gallery');
    if (!mediaSection) {
        console.error('La section des médias est introuvable.');
        return;
    }


    mediaSection.innerHTML = ''; // Vider la section des médias

    mediaList.forEach(media => {
        // Assurez-vous que la fonction mediaFactory est définie ou importée
        if (typeof mediaFactory === 'undefined') {
            console.error('La fonction mediaFactory n\'est pas définie.');
            return;
        }
        // eslint-disable-next-line no-undef
        const mediaCard = mediaFactory(media);
        mediaSection.appendChild(mediaCard.getMediaCardDOM());
    });
 }

// Fonction d'initialisation pour charger les données au chargement de la page
async function init() {
    console.log('Initialisation de la page du photographe.');

    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    if (photographerId) {
        console.log('ID du photographe trouvé dans l\'URL:', photographerId);
        const { photographer, media } = await getPhotographerData(photographerId);
        if (photographer) {
            displayPhotographerData(photographer);
            displayMediaData(media);
        } else {
            console.error('Photographe non trouvé');
        }
    } else {
        console.error('Aucun ID de photographe trouvé dans l\'URL');
    }
}

// Appel de la fonction d'initialisation
init();

fetch('../data/photographers.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de chargement du fichier JSON');
    }
    return response.json();
  })
  .then(data => console.log('Données JSON:', data))
  .catch(error => console.error('Erreur:', error));

