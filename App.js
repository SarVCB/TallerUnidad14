const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", //admin
  password: '', //admin
  database: "consultorio_db"
});

db.connect(err => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

app.use(express.static("public"));
app.use(express.json());

// Ruta para guardar los datos del formulario
app.post("/api/guardar", (req, res) => {
  const tipo = req.body.tipo;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const cedula = req.body.cedula;
  const correo = req.body.correo;
  const consultorio = req.body.consultorio;
  const especialidad = req.body.especialidad;

  const sql = "INSERT INTO consultorio (tipo, nombre, apellido, cedula, correo, consultorio, especialidad) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [tipo, nombre, apellido, cedula, correo, consultorio, especialidad];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al guardar el formulario:", err);
      res.status(500).json({ error: "Error al guardar el formulario" });
    } else {
      res.json({ success: true });
    }
  });
});

// Ruta para obtener todos los datos del formulario
app.get("/api/consultorio", (req, res) => {
  const sql = "SELECT * FROM consultorio";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener los datos del consultorio:", err);
      res.status(500).json({ error: "Error al obtener los datos del consultorio" });
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
