const key = 'THrvkyf0glfmOsl49ezraK3pMTY8UJ1ZlcQwDP1L';
const urlNasa = `https://api.nasa.gov/planetary/apod?api_key=${key}`;
const btn = document.createElement('button');

// ------------- API NASA --------------------------------

fetch(urlNasa)
.then(resp => resp.json())
.then(data => {
  const photoContainer =
    document.getElementById(
      "photoContainer"
    );
  const img =
    document.createElement("img");
  const input =
    document.createElement("input");
  const expli =
    document.createElement("h3");

  input.type = "date";
  img.src = data.hdurl;
  expli.textContent = data.explanation;
  photoContainer.appendChild(img);
  photoContainer.appendChild(input);
  photoContainer.appendChild(btn);
  photoContainer.appendChild(expli);

  input.addEventListener(
    "change",
    function () {
      const selectedDate = this.value;
      const updatedUrl = `${urlNasa}&date=${selectedDate}`;

      fetch(updatedUrl)
        .then((resp) => resp.json())
        .then((data) => {
          img.src = data.url;
          expli.textContent =
            data.explanation;
        })
        .catch((error) => {
          console.log(
            "Error al cargar la imagen:",
            error
          );
        });
    }
  );

  // ----------------- TRADUCTOR --------------------------
  let en = false;

  btn.classList.add("btn");
  btn.innerHTML =
    '<i class="fa-solid fa-repeat"></i><h2>es</h2>';

  btn.addEventListener("click", () => {
    en = !en;

    const sourceLanguage = en ? 'en' : 'es';
    const targetLanguage = en ? 'es' : 'en';

    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
	    method: 'POST',
	    headers: {
		   'content-type': 'application/x-www-form-urlencoded',
		   'X-RapidAPI-Key': 'd432e9af6bmsh90229f604ceafd1p16b94cjsnfd0f82b2e7cc',
		    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	    },
	    body: new URLSearchParams({
		    source_language: sourceLanguage,
	  	  target_language: targetLanguage,
		    text: data.explanation
  	  })
    };
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
       expli.textContent = data.data.translatedText;
      });
      
      en === true
      ? btn.innerHTML = '<i class="fa-solid fa-repeat"></i><h2>en</h2>'
      : btn.innerHTML = '<i class="fa-solid fa-repeat"></i><h2>es</h2>';
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
    star.style.left = x + '%';
    star.style.top = y + '%';

    // Agregar un retraso aleatorio a la animación de cada estrella
    star.style.animationDelay = getRandomDelay() + 's';

    starsContainer.appendChild(star);
  }

  // --------------------------- GALAXIES ------------------

  const numGalaxies = 20; // Número de galaxias diferentes
  const galaxySizeRange = { min: 5, max: 35 }; // Rango de tamaño de galaxias en píxeles

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
    galaxy.style.left = x + '%';
    galaxy.style.top = y + '%';

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
