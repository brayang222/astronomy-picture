const key = 'THrvkyf0glfmOsl49ezraK3pMTY8UJ1ZlcQwDP1L';
const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

fetch(url)
.then(resp => resp.json())
.then(data => {
    const photoContainer = document.getElementById('photoContainer');
    const img = document.createElement('img');
    const input = document.createElement('input');
    const expli = document.createElement('h3')


    input.type = 'date';
    img.src = data.hdurl;
    expli.textContent = data.explanation;
    photoContainer.appendChild(img);
    photoContainer.appendChild(input);
    photoContainer.appendChild(expli);
    

    input.addEventListener('change', function() {
        const selectedDate = this.value;
        const updatedUrl = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${selectedDate}`;

        fetch(updatedUrl)
        .then(resp => resp.json())
        .then(data => {
            img.src = data.url;
            expli.textContent = data.explanation;

        })
        .catch(error => {
            console.log('Error al cargar la imagen:', error);
        });
    });
})
.catch(error => {
    console.log('Error al obtener los datos de la API:', error);
});

// ------------------ STARS ---------------

document.addEventListener("DOMContentLoaded", () => {
  const numStars = 300;

  function getRandomSize() {
    return Math.floor(Math.random() * 3) + 1; // Tamaños aleatorios de 1 a 3 px
  }

  function getRandomDelay() {
    return Math.random() * 7; // Retrasos aleatorios de 0 a 7 segundos
  }

  const starsContainer = document.getElementById('stars');
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = getRandomSize();
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    star.style.left = x + 'vw';
    star.style.top = y + 'vh';

    // Agregar un retraso aleatorio a la animación de cada estrella
    star.style.animationDelay = getRandomDelay() + 's';

    starsContainer.appendChild(star);
  }

  const numGalaxies = 10; // Número de galaxias diferentes
  const galaxySizeRange = { min: 20, max: 50 }; // Rango de tamaño de galaxias en píxeles

  // Array con las rutas de las imágenes de galaxias
  const galaxyImages = [
    "galaxias/galaxia.jpeg",
    "galaxias/galaxia2.jpeg",
    "galaxias/galaxia3.jpg",
    "galaxias/galaxia4.jpeg",
    "galaxias/galaxia5.jpeg",
    "galaxias/galaxia6.jpeg",
    "galaxias/galaxia7.jpeg",
    "galaxias/galaxia8.jpeg",
    "galaxias/galaxia4.jpeg",
    "galaxias/galaxia3.jpg"
    // Agrega aquí las rutas de las demás imágenes de galaxias
    // Por ejemplo: "ruta/a/tu/galaxia-3.jpg", "ruta/a/tu/galaxia-4.jpg", ...
  ];

  const galaxiesContainer = document.getElementById('galaxies');

  function getRandomPosition() {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    return { x, y };
  }

  for (let i = 0; i < numGalaxies; i++) {
    createGalaxy();
  }

  function createGalaxy() {
    const galaxy = document.createElement('div');
    galaxy.classList.add('galaxy');

    const size = getRandomRang();
    galaxy.style.width = size + 'px';
    galaxy.style.height = size + 'px';

    const { x, y } = getRandomPosition();
    galaxy.style.left = x + 'vw';
    galaxy.style.top = y + 'vh';

    const randomIndex = Math.floor(Math.random() * galaxyImages.length);
    galaxy.style.backgroundImage = `url(${galaxyImages[randomIndex]})`;

    galaxiesContainer.appendChild(galaxy);
  }

  function getRandomRang() {
    const minSize = galaxySizeRange.min;
    const maxSize = galaxySizeRange.max;
    return Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
  }
});
