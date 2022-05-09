//levantar servidor con express

const express = require('express');
const path = require('path');
const aplicacion = express();
let env = require('node-env-file');//npm install node-env-file
env(__dirname + '/file.env');
//libreria echar ojo dotenv

const puerto = process.env.PUERTO || 3008;
const servidor = process.env.HOST || '127.0.0.1'

aplicacion.listen(puerto, () => {
    console.log(`Servidor Express activo en http://${servidor}:${puerto}/`);
});
aplicacion.use(express.static(path.join(__dirname, "assets")));

 aplicacion.get("/", (req,res) => {
     res.sendFile(path.join(__dirname, "/index.html"));
 });


const conejoVolador = Math.floor(Math.random () * (5-1)) +1;
const usuarios = [
        "Juan",
        "Jocelyn",
        "Astrid",
        "Maria",
        "Ignacia",
        "Javier",
        "Bryan"
    ];
aplicacion.use(`/abracadabra/juego/:usuario`, (req,res, next) => {
    const usuario = req.params.usuario;
    usuarios.includes(usuario) ? next() : res.redirect('/who.jpeg')
});
aplicacion.use(`/abracadabra/juego/:usuario`, (req,res, next) => {
 res.sendFile(path.join(__dirname, '/index.html'))
});
aplicacion.get("/abracadabra/usuarios", (req, res) => {
    res.send({ usuarios });
});
aplicacion.get("/abracadabra/conejo/:n", (req,res) => {
    req.params.n == conejoVolador ? res.redirect("/conejito.jpg") : res.redirect("/voldemort.jpg");

});
aplicacion.use((req,res) => {
    res.status(404);
    res.send("No Existe la pagina¡¡¡¡")
})

