//Mettre le code JavaScript lié à la page photographer.html

function createPhotographerCard(photographer) {
    // Extend the template and generate the elements
    // Return the created DOM elements
  }
  
  function displayPhotographers(photographers) {
    const photographersList = document.getElementById('photographers-list');
    photographers.forEach((photographer) => {
      const photographerCard = createPhotographerCard(photographer);
      photographersList.appendChild(photographerCard);
    });
  }
  
  // Fetch the data and display the photographers
  fetch('data/photographers.json')
    .then((response) => response.json())
    .then((data) => displayPhotographers(data))
    .catch((error) => console.error(error));
  