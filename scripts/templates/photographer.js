


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait, id } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        // Créer un lien pour l'image et le titre
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('aria-label', name);
        link.classList.add('photographer-link');

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', ""); // Texte alternatif vide pour accessibilité
        img.classList.add('photographer-img');

        const h2 = document.createElement('h2');
        h2.textContent = name;

        // Ajouter l'image et le titre dans le lien
        link.appendChild(img);
        link.appendChild(h2);

        // Créer un conteneur pour le texte
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;

        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;

        const pricing = document.createElement('p');
        pricing.textContent = `${price}€/jour`;

        // Ajouter le texte dans le conteneur
        textContainer.appendChild(location);
        textContainer.appendChild(taglineElement);
        textContainer.appendChild(pricing);

        // Ajouter le lien et le conteneur de texte dans l'article
        article.appendChild(link);
        article.appendChild(textContainer);

        return article;
    }

    function getPhotographerHeaderDOM() {
        const header = document.createElement('div');
        header.classList.add('photograph-header');

        const detailsSection = document.createElement('section');
        detailsSection.setAttribute('id', 'photographer-details');

        const infoContainer = document.createElement('div');
        
        const h2 = document.createElement('h2');
        h2.textContent = name;

        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;

        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);
        img.classList.add('photographer-img');

        infoContainer.appendChild(h2);
        infoContainer.appendChild(location);
        infoContainer.appendChild(taglineElement);

        detailsSection.appendChild(infoContainer);
        detailsSection.appendChild(img);

        const contactButton = document.createElement('button');
        contactButton.classList.add('contact_button');
        contactButton.textContent = 'Contactez-moi';

        header.appendChild(detailsSection);
        header.appendChild(contactButton);

        return header;
    }

    return { name, picture, getUserCardDOM, getPhotographerHeaderDOM };
}

