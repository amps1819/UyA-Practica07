'use strict';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMxJAZX0rjs-wrbkvQN6-LOA4kVfOBQqo",
    authDomain: "club-de-lectura-645b6.firebaseapp.com",
    databaseURL: "https://club-de-lectura-645b6.firebaseio.com",
    projectId: "club-de-lectura-645b6",
    storageBucket: "club-de-lectura-645b6.appspot.com",
    messagingSenderId: "2742318667"
}
firebase.initializeApp(config);
// Referencia a la base de datos
var database = firebase.database();
var seccion = 'libros';

/*// Check de promesas
var promesa = new Promise((resolve,reject) => {resolve(true)});
promesa.then(() => {
    alert('Éxito!!!')
}).catch((error) => {
    alert('Fracaso!!!')
});
*/

function resetINS() {
    document.getElementById('autor').value = '';
    document.getElementById('año').value = '';
    document.getElementById('título').value = '';
}

function resetREC() {
    document.getElementById('autorRE').innerHTML = '';
    document.getElementById('añoRE').innerHTML = '';
    document.getElementById('títuloRE').innerHTML = '';
}


$('#insertarF').submit(() => {
    //Referencia a la entrada libros/[...]
    var entrada = document.getElementById('identificador').value;
    var referencia = database.ref(seccion+'/'+entrada);

    referencia.set({
        autor: document.getElementById('autor').value,
        año: document.getElementById('año').value,
        título: document.getElementById('título').value
    }).then(() => {
        document.getElementById('informacion').innerHTML = '<span class="green">Entrada introducida correctamente.</span>';
        // Borro los datos del formulario de inserción
        resetINS();
    }).catch(error => {
        document.getElementById('informacion').innerHTML = '<span class="red">No se ha podido introducir la entrada. '+error+'</span>';
    });

    // Para cancelar el submit
    return false;
});

$('#recogerF').submit(() => {
    // Referencia a la entrada libros/[...]
    var entrada = document.getElementById('identificadorRE').value;
    var referencia = database.ref(seccion+'/'+entrada);

    // Borro los datos del formulario de recogida
    resetREC();

    referencia.once('value', snapshot => {
        if (snapshot.val()) {
            document.getElementById('autorRE').innerHTML = snapshot.val().autor;
            document.getElementById('añoRE').innerHTML = snapshot.val().año;
            document.getElementById('títuloRE').innerHTML = snapshot.val().título;
        }
        else {
            document.getElementById('informacionRE').innerHTML = '<span class="red">No se ha podido leer la entrada. Error: no existe la entrada</span>';
            // Le pongo un tapón a la respuesta para neutralizar el then y el catch
            return new Promise;
            //alert('TEST!');
            //return new Promise((resolve,reject) => { return reject('Error: no se encuentra la entrada.'); });
            //return Promise.reject(new Error('Error: no se encuentra la entrada.'));
        }
    }).then(() => {
        document.getElementById('informacionRE').innerHTML = '<span class="green">Entrada leída correctamente.</span>';
    }).catch(error => {
        document.getElementById('informacionRE').innerHTML = '<span class="red">No se ha podido leer la entrada. '+error+'</span>';
    });

    // Para cancelar el submit
    return false;
});

/*// Aviso cuando haya una modificación en la entrada libros/[prueba]
referencia = database.ref(seccion+'/prueba');
referencia.on('value', (snapshot) => {
    alert('La entrada '+referencia+' se acaba de actualizar.');
});
*/
/*// Reglas [Realtime Database] <====
{
  "rules": {
    "libros": {
    	"$libro": {
      	".read": true,
		    ".write": true,
				// Comprueba que todas las entradas dentro de /libros/ tengan los campos: autor, año y título
        ".validate": "newData.hasChildren(['autor', 'año', 'título'])"
      }
    }
  }
}
*/
