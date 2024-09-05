// Fonction pour obtenir les paramètres de l'URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fonction pour charger les données du photographe
async function loadPhotographerData() {
    const photographerId = parseInt(getQueryParam('id'), 10);

    if (isNaN(photographerId)) {
        console.error('ID du photographe invalide ou manquant dans l\'URL.');
        return;
    }

    try {
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du fichier JSON');
        }

        const json = await response.json();
        if (!json.photographers || !Array.isArray(json.photographers)) {
            throw new Error('Les données du fichier JSON ne contiennent pas un tableau de photographes');
        }

        // Trouver le photographe par ID
        const photographer = json.photographers.find(p => p.id === photographerId);

        if (photographer) {
            // Afficher la modale avec le nom du photographe
            displayModal(photographer.name);
        } else {
            console.error('Photographe non trouvé');
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données du photographe:', error);
    }
}

// Fonction pour afficher la modale
function displayModal(photographerName) {
    console.log('Affichage de la modale');

    const modal = document.getElementById("contact_modal");
    const overlay = document.querySelector('.modal_overlay');
    const nameElement = document.getElementById('modal-photographer-name');

    if (nameElement) {
        nameElement.textContent = photographerName;
        console.log('Nom du photographe affiché dans la modale:', photographerName);
    } else {
        console.error("L'élément avec l'ID 'modal-photographer-name' est introuvable.");
    }

    // Afficher la modale et l'overlay
    if (modal) {
        modal.style.display = "flex";
        modal.setAttribute('aria-hidden', 'false');
    } else {
        console.error("L'élément avec l'ID 'contact_modal' est introuvable.");
    }

    if (overlay) {
        overlay.setAttribute('aria-hidden', 'false');
        overlay.classList.add('active');
        console.log("Overlay affiché.");
    } else {
        console.error("L'élément avec la classe 'modal_overlay' est introuvable.");
    }

    document.getElementById('first-name').focus();

    // Ajouter un gestionnaire d'événements pour la touche "Esc"
    document.addEventListener('keydown', handleKeyPress);

    // Piéger le focus dans la modale
    trapFocus(modal);
}

// Fonction pour fermer la modale
function closeModal() {
    console.log('Fermeture de la modale de contact.');

    const modal = document.getElementById("contact_modal");
    const overlay = document.querySelector('.modal_overlay');

    if (modal) {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        console.log("Modale cachée.");
    } else {
        console.error("L'élément avec l'ID 'contact_modal' est introuvable.");
    }

    if (overlay) {
        overlay.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('active');
        console.log("Overlay caché.");
    }

    const contactButton = document.querySelector('.contact_button');
    if (contactButton) {
        contactButton.focus();
        console.log("Focus remis sur le bouton 'Contactez-moi'.");
    } else {
        console.error("L'élément avec la classe 'contact_button' est introuvable.");
    }

    // Retirer le gestionnaire d'événements pour la touche "Esc"
    document.removeEventListener('keydown', handleKeyPress);
}

// Gestion de la touche "Esc" pour fermer la modale
function handleKeyPress(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// Fonction pour piéger le focus dans la modale
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll('input, button, textarea');
    const firstFocusableElement = focusableElements[0]; // Premier élément focusable
    const lastFocusableElement = focusableElements[focusableElements.length - 1]; // Dernier élément focusable

    modal.addEventListener('keydown', function(event) {
        const isTabPressed = (event.key === 'Tab' || event.keyCode === 9);

        if (!isTabPressed) {
            return;
        }

        if (event.shiftKey) { // Si "Shift + Tab"
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else { // Si juste "Tab"
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
    });
}

// Attacher l'événement de clic au bouton "Contactez-moi"
document.addEventListener("DOMContentLoaded", function() {
    const contactButton = document.querySelector('.contact_button');
    if (contactButton) {
        contactButton.addEventListener('click', loadPhotographerData);
    } else {
        console.error("L'élément avec la classe 'contact_button' est introuvable.");
    }

    // Gestion du formulaire de contact
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêcher l'envoi réel du formulaire
            console.log('Soumission du formulaire interceptée.');

            const formData = new FormData(form);
            const data = {
                'first-name': formData.get('first-name'),
                'last-name': formData.get('last-name'),
                'email': formData.get('email'),
                'message': formData.get('message')
            };

            console.log('Données du formulaire:', data);

            closeModal();
        });
    } else {
        console.error("L'élément avec l'ID 'contact-form' est introuvable.");
    }
});
