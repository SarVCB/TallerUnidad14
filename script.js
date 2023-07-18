function mostrarConsultorio() {
  var tipoSeleccionado = document.getElementById("tipo").value;
  var consultorioSection = document.getElementById("consultorioSection");
  var labelConsultorio = document.getElementById("labelConsultorio");

  if (tipoSeleccionado === "paciente") {
    consultorioSection.style.display = "none";
    labelConsultorio.style.display = "none";
  } else {
    consultorioSection.style.display = "block";
    labelConsultorio.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("formulario");
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    
    var tipo = document.getElementById("tipo").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var cedula = document.getElementById("cedula").value;
    var correo = document.getElementById("correo").value;
    var consultorio = document.getElementById("consultorio").value;
    var especialidad = document.getElementById("especialidad").value;

    var datosFormulario = {
      tipo: tipo,
      nombre: nombre,
      apellido: apellido,
      cedula: cedula,
      correo: correo,
      consultorio: consultorio,
      especialidad: especialidad
    };

    fetch("/api/guardar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosFormulario)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert("¡El formulario se ha guardado exitosamente!");
    })
    .catch(error => {
      console.error("Error al guardar el formulario:", error);
      alert("Ocurrió un error al guardar el formulario");
    });
  });
});