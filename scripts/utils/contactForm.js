function displayModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.querySelector('.modal_overlay'); // Ajout d'une référence à l'overlay
    const nameElement = document.getElementById('photographerName'); // Référence à l'élément du nom du photographe
    

    modal.style.display = "block";
    overlay.classList.add('active'); // Activer l'overlay
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('first-name').focus(); // Mettre le focus sur le premier champ du formulaire
}



function closeModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.querySelector('.modal_overlay'); // Ajout d'une référence à l'overlay

    modal.style.display = "none";
    overlay.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.querySelector('.contact_button').focus(); // Retourner le focus sur le bouton "Contactez-moi"
}




