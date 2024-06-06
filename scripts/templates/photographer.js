

// scripts/templates/photographer.js

function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;

    function getUserCardDOM() {
        const article = document.createElement('article');

        // Créer un conteneur pour l'image et le titre
        const imgTitleContainer = document.createElement('div');
        imgTitleContainer.classList.add('img-title-container');

        const img = document.createElement('img');
        img.setAttribute('src', `assets/photographers/${portrait}`);
        img.setAttribute('alt', name);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        // Ajouter l'image et le titre dans le conteneur
        imgTitleContainer.appendChild(img);
        imgTitleContainer.appendChild(h2);

        // Créer un conteneur pour le texte
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;

        const tag = document.createElement('p');
        tag.textContent = tagline;

        const pricing = document.createElement('p');
        pricing.textContent = `${price}€/jour`;

        // Ajouter le texte dans le conteneur
        textContainer.appendChild(location);
        textContainer.appendChild(tag);
        textContainer.appendChild(pricing);

        // Ajouter les conteneurs dans l'article
        article.appendChild(imgTitleContainer);
        article.appendChild(textContainer);
        

        return article;
    }

    return { getUserCardDOM };
}
