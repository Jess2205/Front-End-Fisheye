function mediaFactory(media) {
    const { id, photographerId, title, image, video, likes, date, price } = media;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.classList.add('media-item');

        // Création de l'élément media (image ou vidéo)
        const mediaElement = document.createElement(image ? 'img' : 'video');
        const mediaSrc = `assets/media/${image ? image : video}`;
        
        mediaElement.setAttribute('src', mediaSrc);
        mediaElement.setAttribute('alt', title);
        mediaElement.classList.add('media');

        // Puis votre code pour mediaFactory.js
function mediaFactory(media) {
    const { id, title, image, video } = media;

    

    // Ajout d'un gestionnaire d'événement pour ouvrir la lightbox au clic
    mediaElement.addEventListener('click', () => openLightbox(id));

    return mediaElement;
}


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
