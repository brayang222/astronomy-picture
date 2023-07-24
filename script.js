const key = 'THrvkyf0glfmOsl49ezraK3pMTY8UJ1ZlcQwDP1L';
const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

fetch(url)
.then(resp => resp.json())
.then(data => {
    const photoContainer = document.getElementById('photoContainer');
    const img = document.createElement('img');
    const input = document.createElement('input');

    input.type = 'date';
    img.src = data.url;
    photoContainer.appendChild(img);
    photoContainer.appendChild(input);

    input.addEventListener('change', function() {
        const selectedDate = this.value;
        const updatedUrl = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${selectedDate}`;

        fetch(updatedUrl)
        .then(resp => resp.json())
        .then(data => {
            img.src = data.url;
        })
        .catch(error => {
            console.log('Error al cargar la imagen:', error);
        });
    });
})
.catch(error => {
    console.log('Error al obtener los datos de la API:', error);
});