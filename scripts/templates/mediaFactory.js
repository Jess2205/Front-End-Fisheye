

function getPhotographerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', function() {
    const photographerId = getPhotographerIdFromUrl(); // Récupère l'ID du photographe depuis l'URL

    fetch('data/photographers.json')
        .then(response => response.json())
        .then(data => {
            const mediaArray = data.media.filter(media => media.photographerId == photographerId);
            displayMedia(mediaArray);
            initSort(mediaArray);  // Initialise le tri au chargement
        })
        .catch(error => console.error('Erreur lors du chargement des données:', error));
});



function displayMedia(mediaArray) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Efface tout contenu existant

    mediaArray.forEach(media => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        gallery.appendChild(mediaCardDOM);
    });

    // Mise à jour du total des "j'aime" après affichage
    updateTotalLikes();
}

function initSort(mediaArray) {
    document.getElementById('sort').addEventListener('change', function() {
        const sortBy = this.value;

        switch(sortBy) {
            case 'date':
                mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'popularity':
                mediaArray.sort((a, b) => b.likes - a.likes);
                break;
            case 'title':
                mediaArray.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        // Réaffiche les médias triés
        displayMedia(mediaArray);
    });
}

// Les fonctions `mediaFactory`, `updateTotalLikes`, `openLightbox`, etc. restent les mêmes

let currentMediaIndex = 0;
let mediaItems = [];

function mediaFactory(media) {
    const { id, title, image, video, likes } = media;

    // Création de l'élément media (image ou vidéo)
    const mediaElement = document.createElement(image ? 'img' : 'video');
    const mediaSrc = `assets/media/${image ? image : video}`;
    
    mediaElement.setAttribute('src', mediaSrc);
    mediaElement.setAttribute('alt', title);
    mediaElement.classList.add('media');

    // Ajouter un attribut data-id pour faciliter l'identification du média
    mediaElement.setAttribute('data-id', id);

    // Lors de la création d'un média (image ou vidéo), ajouter un événement de clic pour ouvrir la lightbox
    mediaElement.addEventListener('click', () => openLightbox(id));

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.classList.add('media-item');

        // Création des éléments titre et likes
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const likesContainer = document.createElement('div');
        likesContainer.classList.add('likes-container');

        const likesElement = document.createElement('span');
        likesElement.classList.add('likes-count');
        likesElement.textContent = likes;

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '&#10084;'; // icône cœur

        // Gestion du clic sur le bouton like
        likeButton.addEventListener('click', () => {
            likesElement.textContent = parseInt(likesElement.textContent) + 1;
            updateTotalLikes();
        });

        likesContainer.appendChild(likesElement);
        likesContainer.appendChild(likeButton);

        // Ajout des éléments au DOM
        article.appendChild(mediaElement);
        article.appendChild(titleElement);
        article.appendChild(likesContainer);

        return article;
    }

    return { getMediaCardDOM };
}

// Fonction pour mettre à jour le total des "j'aime"
function updateTotalLikes() {
    const likeElements = document.querySelectorAll('.likes-count');
    let totalLikes = 0; // Replacez par la valeur initiale si nécessaire

    likeElements.forEach(likeElement => {
        totalLikes += parseInt(likeElement.textContent, 10);
    });

    document.querySelector('.total-likes').textContent = totalLikes;
}

// Appeler la fonction pour initialiser le total des "j'aime" lors du chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    updateTotalLikes();
});

// Fonction pour ouvrir la lightbox avec le média sélectionné
function openLightbox(mediaId) {
    const lightbox = document.getElementById('lightbox');
    const mediaItemsElements = document.querySelectorAll('.media-item img, .media-item video');
    mediaItems = Array.from(mediaItemsElements); // Récupère tous les médias dans le DOM

    currentMediaIndex = mediaItems.findIndex(item => item.getAttribute('data-id') == mediaId);

    const mediaItem = mediaItems[currentMediaIndex];

    if (!mediaItem) return;

    // Remplir la lightbox avec le média sélectionné
    if (mediaItem.tagName === 'IMG') {
        document.querySelector('.lightbox-image').src = mediaItem.src;
        document.querySelector('.lightbox-image').style.display = 'block';
        document.querySelector('.lightbox-video').style.display = 'none';
    } else if (mediaItem.tagName === 'VIDEO') {
        document.querySelector('.lightbox-video source').src = mediaItem.src;
        document.querySelector('.lightbox-video').load();
        document.querySelector('.lightbox-image').style.display = 'none';
        document.querySelector('.lightbox-video').style.display = 'block';
    }

    // Affichage de la lightbox
    lightbox.classList.remove('hidden');
    lightbox.style.opacity = '1';
}

// Fonction pour passer au média suivant
function nextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
    openLightbox(mediaItems[currentMediaIndex].getAttribute('data-id'));
}

// Fonction pour passer au média précédent
function prevMedia() {
    currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
    openLightbox(mediaItems[currentMediaIndex].getAttribute('data-id'));
}

// Attacher les événements pour les boutons "suivant" et "précédent"
document.querySelector('.lightbox-next').addEventListener('click', () => {
    if (mediaItems.length > 0) nextMedia();
});
document.querySelector('.lightbox-prev').addEventListener('click', () => {
    if (mediaItems.length > 0) prevMedia();
});

// Ajout de la gestion de la fermeture de la lightbox 
document.querySelector('.lightbox-close').addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    lightbox.style.opacity = '0';
});
