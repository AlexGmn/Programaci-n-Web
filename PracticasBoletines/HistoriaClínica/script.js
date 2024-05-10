const formulario = document.getElementById('formulario');
const fotoInput = document.getElementById('foto');
const selectPais = document.getElementById('pais');
const selectCiudad = document.getElementById('ciudad');
const citiesPais = {
  'ecuadorCities' : ['Quito', 'Guayaquil', 'Cuenca', 'Manta', 'Loja', 'Esmeraldas'],
  'argentinaCities' : ['Buenos Aires', 'Cordoba', 'Rosario', 'Mendoza', 'Salta', 'Bariloche'],
  'colombiaCities' : ['Bogota', 'Medellin', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'], 
  'peruCities': ['Lima', 'Cusco', 'Arequipa', 'Trujillo', 'Iquitos', 'Piura']
};
const tablaHijos = document.getElementById('tablaHijos');
const btnAgregarHijo = document.getElementById('agregarHijo');


function validarCedula(cedula) {
    // Verificar que la cédula tenga 10 dígitos
    if (cedula.length !== 10 || isNaN(cedula)) {
        return false;
    }

    // Obtener los primeros 9 dígitos de la cédula
    var digitos = cedula.substring(0, 9);

    // Calcular el dígito verificador
    var suma = 0;
    for (var i = 0; i < digitos.length; i++) {
        var digito = parseInt(digitos[i]);
        if (i % 2 === 0) { 
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }
        suma += digito;
    }
    var residuo = suma % 10;
    var digitoVerificador = residuo === 0 ? 0 : 10 - residuo;

    // Comparar el dígito verificador calculado con el último dígito de la cédula
    return digitoVerificador === parseInt(cedula[9]);
}

// Función para mostrar la vista previa de la imagen al seleccionar un archivo
fotoInput.addEventListener('change', function(event) {
    var imagen = document.getElementById('imagen-preview');
    imagen.src = URL.createObjectURL(event.target.files[0]);
    imagen.style.display = 'block';
});

// Función para calcular la edad exacta a partir de la fecha de nacimiento
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario

    var fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    var hoy = new Date();

    var edadMilisegundos = hoy - fechaNacimiento;
    var edad = new Date(edadMilisegundos);

    var años = edad.getFullYear() - 1970;
    var meses = edad.getMonth();
    var dias = edad.getDate() - 1;
    var horas = edad.getHours() - 1;

    console.log('Edad:', años, 'años,', meses, 'meses,', dias, 'días y', horas, 'horas.');
});


document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario automáticamente

    var cedula = document.getElementById('cedula').value;
    if (validarCedula(cedula)) {
        alert('La cédula es válida.');
    } else {
        alert('La cédula no es válida.');
    }
});

//mostrar las ciudades según el país seleccionado

selectPais.addEventListener('change', () => {
  const pais = selectPais.value;

  selectCiudad.innerHTML = '';
  citiesPais[pais].forEach(ciudad => {
    const option = document.createElement('option');
    option.text = ciudad;
    selectCiudad.add(option);
  });
});


// Añadir nuevos hijos a la tabla

btnAgregarHijo.addEventListener('click', () => {
  
    const childName = prompt('Ingrese el nombre del hijo');
    const childAge = prompt('Ingrese la edad del hijo');
  
    if (childName && childAge) {
      agregarHijo(childName, childAge);
    }
});

 
  // Función para agregar un nuevo hijo
function agregarHijo(name, age) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const ageCell = document.createElement('td');
  
    nameCell.textContent = name;
    ageCell.textContent = age;
  
    row.appendChild(nameCell);
    row.appendChild(ageCell);
    tablaHijos.appendChild(row);
  }
  
 