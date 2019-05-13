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


$('#login').submit(() => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        alert('Error '+error.code+': '+error.message);
    });

    // Simulate a mouse click:
    window.location.href = "./form.html";
    // Simulate an HTTP redirect:
    //window.location.replace("./form.html");
    
    // Para cancelar el submit
    return false;
});
