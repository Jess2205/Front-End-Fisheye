// Fonction pour obtenir l'ID du photographe depuis l'URL
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

function displayMedia(mediaArray) { // Rendu des médias
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Efface tout contenu existant
    setupKeyboardAccessibility(); // Initialisation de l'accessibilité au clavier


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

let currentMediaIndex = 0;
let mediaItems = [];

// Fonction pour ouvrir la lightbox
function openLightbox(mediaId) {
    const lightbox = document.getElementById('lightbox');
    const mediaItemsElements = document.querySelectorAll('.media-item img, .media-item video');
    mediaItems = Array.from(mediaItemsElements); // Récupère tous les médias dans le DOM

    currentMediaIndex = mediaItems.findIndex(item => item.getAttribute('data-id') == mediaId);

    const mediaItem = mediaItems[currentMediaIndex];

    if (!mediaItem) return;

    // Enlève l'attribut aria-hidden pour rendre la lightbox accessible
    lightbox.setAttribute('aria-hidden', 'false');

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

    // Ajouter le titre du média à la lightbox
    const mediaTitle = mediaItem.getAttribute('alt');
    document.querySelector('.lightbox-title').textContent = mediaTitle;
    
    // Affichage de la lightbox
    lightbox.classList.remove('hidden');
    lightbox.style.display = 'flex'; // Assurez-vous que la Lightbox est visible
    lightbox.style.opacity = '1';

    // Focus sur le premier élément interactif de la lightbox
    document.querySelector('.lightbox-close').focus();
}

// Fonction pour passer au média suivant
function nextMedia() {
    if (mediaItems.length > 0) {
        currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
        const newMediaId = mediaItems[currentMediaIndex].getAttribute('data-id');
        openLightbox(newMediaId);
    }
}

// Fonction pour passer au média précédent
function prevMedia() {
    if (mediaItems.length > 0) {
        currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
        const newMediaId = mediaItems[currentMediaIndex].getAttribute('data-id');
        openLightbox(newMediaId);
    }
}

// Fonction pour configurer l'accessibilité au clavier
function setupKeyboardAccessibility() {
    const mediaItemsElements = document.querySelectorAll('.media-item img, .media-item video');

    mediaItemsElements.forEach((mediaItem) => {
        mediaItem.setAttribute('tabindex', '0'); // Rendre l'élément focusable

        // Gestionnaire de clic pour ouvrir la lightbox
        mediaItem.addEventListener('click', (event) => {
            const mediaId = mediaItem.getAttribute('data-id');
            openLightbox(mediaId);
            event.stopPropagation(); // Empêche la propagation de l'événement au parent (comme les likes)
        });

        // Gestionnaire de touche (Enter ou Espace) pour ouvrir la lightbox
        mediaItem.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                const mediaId = mediaItem.getAttribute('data-id');
                openLightbox(mediaId);
                event.preventDefault(); // Empêche l'action par défaut (comme la sélection de texte ou le scroll)
                event.stopPropagation(); // Empêche la propagation vers d'autres événements (comme les likes)
            }
        });
    });
}


document.querySelector('.lightbox-next').addEventListener('click', nextMedia);
document.querySelector('.lightbox-prev').addEventListener('click', prevMedia);
document.querySelector('.lightbox-close').addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    lightbox.style.opacity = '0';
    lightbox.style.display = 'none'; // Assurez-vous que la Lightbox est cachée
});

document.querySelector('.lightbox-next').setAttribute('tabindex', '0');
document.querySelector('.lightbox-prev').setAttribute('tabindex', '0');
document.querySelector('.lightbox-close').setAttribute('tabindex', '0');


document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevMedia();
        } else if (e.key === 'ArrowRight') {
            nextMedia();
        } else if (e.key === 'Escape') {
            document.querySelector('.lightbox-close').click(); // Simule un clic sur le bouton de fermeture
            // Remet aria-hidden pour masquer la lightbox des lecteurs d'écran
            lightbox.setAttribute('aria-hidden', 'true');
            lightbox.style.display = 'none';
            lightbox.style.opacity = '0';
        }
    }
});

// Appeler la fonction pour configurer l'accessibilité au clavier
setupKeyboardAccessibility();

function mediaFactory(media) {
    const { id, title, image, video, likes } = media;

    const mediaElement = document.createElement(image ? 'img' : 'video');
    const mediaSrc = `assets/media/${image ? image : video}`;
    
    mediaElement.setAttribute('src', mediaSrc);
    mediaElement.setAttribute('alt', title);
    mediaElement.classList.add('media');
    mediaElement.setAttribute('data-id', id);
    mediaElement.setAttribute('tabindex', '0'); // Permettre la navigation clavier

    mediaElement.addEventListener('click', () => openLightbox(id));

    // Gestion du focus clavier pour ouvrir la lightbox
    mediaElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            openLightbox(id); // Ouvre la lightbox lors de la touche "Entrée" ou "Espace"
            event.preventDefault(); // Empêche le comportement par défaut du navigateur
        }
    });

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.classList.add('media-item');

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const likesContainer = document.createElement('div');
        likesContainer.classList.add('likes-container');

        const likesElement = document.createElement('span');
        likesElement.classList.add('likes-count');
        likesElement.textContent = likes;

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '&#10084;';

        likeButton.addEventListener('click', (event) => {
            likesElement.textContent = parseInt(likesElement.textContent) + 1;
            updateTotalLikes();
            event.stopPropagation();
        });

        likesContainer.appendChild(likesElement);
        likesContainer.appendChild(likeButton);

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
