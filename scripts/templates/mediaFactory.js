// mediaFactory.js
function mediaFactory(media) {
    const { id, photographerId, title, image, video, likes, date, price } = media;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        const mediaElement = document.createElement(image ? 'img' : 'video');
        const mediaSrc = `assets/media/${image ? image : video}`;
        const mediaType = image ? 'image' : 'video';

        mediaElement.setAttribute('src', mediaSrc);
        mediaElement.setAttribute('alt', title);
        mediaElement.classList.add('media');

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const likesElement = document.createElement('span');
        likesElement.textContent = `${likes} ❤`;
        likesElement.classList.add('likes');

        article.appendChild(mediaElement);
        article.appendChild(titleElement);
        article.appendChild(likesElement);

        return article;
    }

    return { getMediaCardDOM };
}
