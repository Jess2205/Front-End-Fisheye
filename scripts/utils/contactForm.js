// Exemple de fonction asynchrone
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function someAsyncFunction() {
    console.log('Démarrage de la fonction asynchrone');
    
    // Simulation d'une opération asynchrone
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Success');
        }, 1000);
    });
}

// Gestion du formulaire de contact
document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM chargé, initialisation des fonctions de la modale');
    
    // Fonction pour afficher la modale
    window.displayModal = function() {
        console.log('Affichage de la modale');

        const modal = document.getElementById("contact_modal");
        const overlay = document.querySelector('.modal_overlay');
        const nameElement = document.getElementById('modal-photographer-name');

        // Remplir le nom du photographe
        const photographerName = ('Mimi Keel'); // Remplacez par une récupération dynamique si nécessaire
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
    };

    // Fonction pour fermer la modale
    window.closeModal = function() {
        console.log('Fermeture de la modale de contact.');

        const modal = document.getElementById("contact_modal");
        const overlay = document.querySelector('.modal_overlay');

        // Masquer la modale et l'overlay
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
        } else {
            console.error("L'élément avec la classe 'modal_overlay' est introuvable.");
        }

        // Remettre le focus sur le bouton "Contactez-moi"
        const contactButton = document.querySelector('.contact_button');
        if (contactButton) {
            contactButton.focus();
            console.log("Focus remis sur le bouton 'Contactez-moi'.");
        } else {
            console.error("L'élément avec la classe 'contact_button' est introuvable.");
        }
    };

    // Gestion du formulaire de contact
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêcher l'envoi réel du formulaire
            console.log('Soumission du formulaire interceptée.');

            // Récupérer les données du formulaire
            const formData = new FormData(form);
            const data = {
                'first-name': formData.get('first-name'),
                'last-name': formData.get('last-name'),
                'email': formData.get('email'),
                'message': formData.get('message')
            };

            console.log('Données du formulaire:', data);

            // Fermer la modale après soumission
            // eslint-disable-next-line no-undef
            closeModal();
        });
    } else {
        console.error("L'élément avec l'ID 'contact-form' est introuvable.");
    }
});
