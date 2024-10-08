// Obtiene la URL actual
const urlActual = window.location.href;

// Obtiene el nombre de la carpeta de la URL actual
var carpetaNombre = window.location.pathname.split('/').pop();

// Verifica si no hay un nombre de carpeta en la URL
if (!carpetaNombre) {
    // Genera un nombre aleatorio si no existe un nombre de carpeta
    carpetaNombre = generarCadenaAleatoria();
    
    // Redirige la página a la nueva URL con el nombre de la carpeta generado
    window.location.href = urlActual + carpetaNombre;
} else {
    // Si ya existe un nombre de carpeta, procede a crear la carpeta con ese nombre
    crearCarpeta(carpetaNombre);
}

// Función para generar una cadena aleatoria de 3 caracteres
function generarCadenaAleatoria() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
    for (let i = 0; i < 3; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        cadenaAleatoria += caracterAleatorio;
    }
    return cadenaAleatoria;
}

// Función para crear la carpeta llamando al backend
function crearCarpeta(nombreCarpeta) {
    $.ajax({
        url: 'crearCarpeta.php', // Ruta del archivo PHP que crea la carpeta
        type: 'POST', // Puedes usar POST o GET según tus necesidades
        data: { nombreCarpeta: nombreCarpeta }, // Envía el nombre de la carpeta como datos
        success: function(response) {
            console.log('Carpeta creada.'); // Mensaje de éxito (puedes personalizarlo)
        },
        error: function() {
            console.log('Error al crear la carpeta.'); // Mensaje de error (puedes personalizarlo)
        }
    });
}


// Función para generar una cadena aleatoria de 3 caracteres
function generarCadenaAleatoria() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
    for (let i = 0; i < 3; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        cadenaAleatoria += caracterAleatorio;
    }
    return cadenaAleatoria;
}

// Manejo de archivos 
const dropArea = document.getElementById('drop-area');
const Form = document.getElementById('form');

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
});

// Función para manejar los archivos seleccionados
function handleFiles(files) {
    if (files.length > 0) {
        console.log('Archivos seleccionados:');
        [...files].forEach(file => {
            console.log(file.name);
            // llamar a la función
            uploadFiles(files);
        });
    }
}

// Función para subir archivos al servidor
function uploadFiles(files) {
    const formData = new FormData();
    [...files].forEach(file => formData.append('archivo[]', file));

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total) * 100;
            console.log(`Subida: ${percentComplete}%`);
        }
    };
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Archivos subidos con éxito');
            // Puedes realizar acciones adicionales
        } else {
            console.error('Error al subir los archivos');
        }
    };

    xhr.open('POST', Form.action, true);
    xhr.send(formData);
}

// Manejo de envío
Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = Form.querySelector('#archivo');
    const files = fileInput.files;
    if (files.length > 0) {
        uploadFiles(files);
    } else {
        alert('Por favor, seleccione un archivo primero.');
    }
});
