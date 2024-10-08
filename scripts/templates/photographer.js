
export function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait, id } = data;
    const picture = `assets/photographers/${portrait}`;

    console.log(`Création du modèle pour le photographe: ${name}`);
    
    function getUserCardDOM() {
        console.log('Création de la carte utilisateur pour le photographe:', name);

        const article = document.createElement('article');

        // Créer un lien pour l'image et le titre
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('aria-label', name);
        link.classList.add('photographer-link');

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `Portrait de ${name}`); // Texte alternatif descriptif
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

        const taglineElement = document.createElement('span');
        taglineElement.textContent = tagline;

        const pricing = document.createElement('td');
        pricing.textContent = `${price}€/jour`;

        // Ajouter le texte dans le conteneur
        textContainer.appendChild(location);
        textContainer.appendChild(taglineElement);
        textContainer.appendChild(pricing);

        // Ajouter le lien et le conteneur de texte dans l'article
        article.appendChild(link);
        article.appendChild(textContainer);

        console.log('Carte utilisateur créée:', article);
        
        return article;
    }

    function getPhotographerHeaderDOM() {
        console.log('Création de l\'en-tête du photographe:', name);
        
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
        img.setAttribute('alt', `Portrait de ${name}`); // Texte alternatif descriptif
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

        console.log('En-tête du photographe créé:', header);
        
        return header;
    }

    return { name, picture, getUserCardDOM, getPhotographerHeaderDOM };
}

