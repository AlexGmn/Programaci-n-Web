
// Obtener las personas del archivo JSON
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
async function agregarPersona(nombre, apellido, edad, correo) {
    try {

        const form = document.getElementById('form-persona');
        const personas = await obtenerPersonas();
        console.log(personas);
        const nuevaPersona = { nombre, apellido, edad, correo };
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
            method: 'POST',
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
        const localStorageList = document.getElementById('localStorageList');
        const sessionStorageList = document.getElementById('sessionStorageList');
        const personasJson = document.getElementById('personas-recuperadas');

        // Mostrar personas de localStorage
        const localStoragePersons = getLocalStoragePersons();
        if (localStoragePersons.length > 0) {
            displayPersons(localStoragePersons, localStorageList, true, deletePersonLocal);
        }

        // Mostrar personas de sessionStorage
        const sessionStoragePersons = getSessionStoragePersons();
        if (sessionStoragePersons.length > 0) {
            displayPersons(sessionStoragePersons, sessionStorageList, true, deletePersonSession);
        }

        // Mostrar personas de archivo json
        const personas = await obtenerPersonas();
        if (personas.length > 0) {
            displayPersons(personas, personasJson, false);
        }
        
    } catch (error) {
        console.error(error);
    }
}

function displayPersons(persons, tbody, showActions, deleteFunction) {
    tbody.innerHTML = '';

    persons.forEach((person, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = person.nombre;
        row.appendChild(nameCell);

        const apell = document.createElement('td');
        apell.textContent = person.apellido;
        row.appendChild(apell);

        const ageCell = document.createElement('td');
        ageCell.textContent = person.edad;
        row.appendChild(ageCell);

        const correo = document.createElement('td');
        correo.textContent = person.correo;
        row.appendChild(correo);

        if (showActions) {
            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editPerson(index)); 
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => deleteFunction(person, index)); 
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
        }


        tbody.appendChild(row);
    });
}


// Función para obtener personas de localStorage
function getLocalStoragePersons() {
    const localStorageData = localStorage.getItem('personas');
    return localStorageData ? JSON.parse(localStorageData) : [];
}

// Función para obtener personas de sessionStorage
function getSessionStoragePersons() {
    const sessionStorageData = sessionStorage.getItem('personas');
    return sessionStorageData ? JSON.parse(sessionStorageData) : [];
}

// Función para editar una persona (simplemente un ejemplo, puedes implementar la lógica según tus necesidades)
function editPerson(index) {
    const localStoragePersons = getLocalStoragePersons();
    
    // Obtener la persona correspondiente al índice
    const localStoragePerson = localStoragePersons[index];
    
    alert(`Editando persona: ${localStoragePerson.nombre}, ${localStoragePerson.apellido}`);
}


// Función para eliminar una persona
function deletePersonLocal(person, index) {
    
    const localStoragePersons = getLocalStoragePersons();

    // Obtener la persona correspondiente al índice
    const localStoragePerson = localStoragePersons[index];

    if (confirm(`¿Seguro que deseas eliminar a ${localStoragePerson.name}?`)) {
        // Eliminar la persona de localStorage
        localStoragePersons.splice(index, 1);
        localStorage.setItem('persons', JSON.stringify(localStoragePersons));
        displayPersons(localStoragePersons, localStorageList, true, deletePersonLocal);
    }
}

function deletePersonSession(person, index) {
    
    const sessionStoragePersons = getSessionStoragePersons();

    // Obtener la persona correspondiente al índice
    const sessionStoragePerson = sessionStoragePersons[index];

    if (confirm(`¿Seguro que deseas eliminar a ${person.name}?`)) {
        // Eliminar la persona de sessionStorage
        sessionStoragePersons.splice(index, 1);
        sessionStorage.setItem('persons', JSON.stringify(sessionStoragePersons));
        displayPersons(sessionStoragePersons, sessionStorageList, true, deletePersonSession);
    }
}

    // Eventos
    document.getElementById('form-persona').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const edad = document.getElementById('edad').value;
        const correo = document.getElementById('correo').value;
        await agregarPersona(nombre, apellido, edad, correo);

    });

    document.getElementById('recuperar-personas').addEventListener('click', recuperarPersonas);
