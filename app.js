// Initialize Cloud Firestore through Firebase
firebase.initializeApp({    
    apiKey: "AIzaSyBx3nk9AoPNDFe5GPJxluiDM29JjbhWgns",
    authDomain: "unidad2abd.firebaseapp.com",
    projectId: "unidad2abd",
  });
  
  var db = firebase.firestore();

  //Codigo para agregar registros a mi colección
  function Agregar() {
      var Nombre = document.getElementById('Nombre').value;
      var Apellidos = document.getElementById('Apellidos').value;
      var CURP = document.getElementById('CURP').value;
      var Edad = document.getElementById('Edad').value;
      var Domicilio = document.getElementById('Domicilio').value;
      var Municipio = document.getElementById('Municipio').value;
  
  
    
      console.log(Nombre, Apellidos, CURP, Edad, Domicilio, Municipio);
        db.collection("Usuarios").add({
        Nombre: Nombre,
        Apellidos: Apellidos,
        CURP: CURP,
        Edad: Edad,
        Domicilio: Domicilio,
        Municipio: Municipio

        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('Nombre').value = '';
            document.getElementById('Apellidos').value = '';
            document.getElementById('CURP').value = '';              
            document.getElementById('Edad').value = '';
            document.getElementById('Domicilio').value = '';
            document.getElementById('Municipio').value = '';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
  }

  //Codigo para Leer o Mostrar registros de mi colección
  //Leer el id de la tabla
  var tabla = document.getElementById('tabla');

  db.collection("Usuarios").onSnapshot((querySnapshot) => {
      tabla.innerHTML = ''; //Limpiar mi tabla
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().last}`);
        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().Nombre}</td>
            <td>${doc.data().Apellidos}</td>
            <td>${doc.data().CURP}</td>
            <td>${doc.data().Edad}</td>
            <td>${doc.data().Domicilio}</td>
            <td>${doc.data().Municipio}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="Editar('${doc.id}','${doc.data().Nombre}','${doc.data().Apellidos}','${doc.data().CURP}',
            '${doc.data().Edad}','${doc.data().Domicilio}','${doc.data().Municipio}')">Editar</button></td>

    
        `
        });
    });

    //borrar documento
    function eliminar(id){
        db.collection("Usuarios").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    //Editar Documento
    function editar(id, Nombre, Apellidos, CURP, Edad, Domicilio, Municipio){
        console.log(id);
        var Nombre = document.getElementById('Nombre').value = Nombre;
        var Apellidos = document.getElementById('Apellidos').value = Apellidos;
        var boton = document.getElementById('boton');
        var CURP = document.getElementById('Curp').value = CURP;
        var Edad = document.getElementById('Edad').value = Edad;
        var Domicilio = document.getElementById('Domicilio').value = Domicilio;
        var Municipio = document.getElementById('Municipio').value = Municipio;
        
        boton.innerHTML = 'editar';

        boton.onclick = function(){
            var washingtonRef = db.collection("Usuarios").doc(id);

            var Nombre = document.getElementById('Nombre').value;
            var Apellidos = document.getElementById('Apellidos').value;
            var CURP = document.getElementById('Curp').value;
            var Edad = document.getElementById('Edad').value;
            var Domicilio = document.getElementById('Domicilio').value;
            var Municipio = document.getElementById('Municipio').value;

            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                Nombre: Nombre,
                Apellidos: Apellidos,
                CURP: CURP,
                Edad: Edad,
                Domicilio: Domicilio,
                Municipio: Municipio

            })
            .then(() => {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Agregar';
                window.location.reload();
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
    }