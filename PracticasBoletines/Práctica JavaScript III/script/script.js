
// Función para obtener las personas del archivo JSON
async function obtenerPersonas() {
    try {
        const response = await fetch('personas.json');
        const personas = await response.json();
        return personas;
    } catch (e) {
        console.error(e);
    }
}


// Función para agregar una persona al archivo JSON
async function agregarPersona(nombre, apellido) {
    try {

        const form = document.getElementById('form-persona');
        const personas = await obtenerPersonas();
        console.log(personas);
        const nuevaPersona = { nombre, apellido };
        personas.push(nuevaPersona);
        const json = JSON.stringify(personas);

        // Guardar en localStorage
        let personsLocalStorage = JSON.parse(localStorage.getItem('personas')) || [];
        personsLocalStorage.push(nuevaPersona);
        localStorage.setItem('personas', JSON.stringify(personsLocalStorage));

        // Guardar en sessionStorage
        let personsSessionStorage = JSON.parse(sessionStorage.getItem('personas')) || [];
        personsSessionStorage.push(nuevaPersona);
        sessionStorage.setItem('personas', JSON.stringify(personsSessionStorage));

        // Guardado en archivo JSON
        await fetch('personas.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaPersona)
        })
        .then(() => {
            console.log('Datos guardados correctamente.');
            
            // Leer nuevamente 
            fetch('personas.json')
                .then(response => response.json())
                .then(data => {
                    console.log('Datos actualizados:', data);
                    
                })
                .catch(error => console.error('Error al leer los datos:', error));
        })
        .catch(error => console.error('Error al guardar los datos:', error));
            
        form.reset();


        
    } catch (error) {
        console.error(error);
    }
}

// Función para eliminar una persona del archivo JSON
async function eliminarPersona(nombre) {
    try {
        const personas = await obtenerPersonas();
        const indice = personas.findIndex(persona => persona.nombre === nombre);
        if (indice !== -1) {
            personas.splice(indice, 1);
            const json = JSON.stringify(personas);
            await fetch('personas.json', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: json
            });
        }
    } catch (error) {
        console.error(error);
    }
}

// Función para recuperar todas las personas del archivo JSON
async function recuperarPersonas() {
    try {
        const localStorageData = document.getElementById('localStorageData');
        const sessionStorageData = document.getElementById('sessionStorageData');

        localStorageData.textContent = localStorage.getItem('personas') || '[]';


        sessionStorageData.textContent = sessionStorage.getItem('personas') || '[]';

        const personas = await obtenerPersonas();
        const listaPersonas = document.getElementById('personas-recuperadas');
        listaPersonas.innerHTML = '';
        personas.forEach(persona => {
            const elemento = document.createElement('li');
            elemento.textContent = `${persona.nombre} ${persona.apellido}`;
            listaPersonas.appendChild(elemento);
        });
    } catch (error) {
        console.error(error);
    }
}
// Función para obtener las personas del localStorage
function obtenerPersonasLocalStorage() {
    return JSON.parse(localStorage.getItem('personas')) || [];
}

// Función para agregar una persona al localStorage
function agregarPersonaLocalStorage(nombre, apellido) {
    const personas = obtenerPersonasLocalStorage();
    const nuevaPersona = { nombre, apellido };
    personas.push(nuevaPersona);
    localStorage.setItem('personas', JSON.stringify(personas));
}

// Función para eliminar una persona del localStorage
function eliminarPersonaLocalStorage(nombre) {
    const personas = obtenerPersonasLocalStorage();
    const indice = personas.findIndex(persona => persona.nombre === nombre);

}


    // Eventos
    document.getElementById('form-persona').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        await agregarPersona(nombre, apellido);

    });

    document.getElementById('recuperar-personas').addEventListener('click', recuperarPersonas);
