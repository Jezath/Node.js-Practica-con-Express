//importaciones
const express = require('express');
const { matematicas } = require('../datos/cursos').infoCursos; //desestructuramos el objeto matematicas
//ruta
const routerMatematicas = express.Router();

//matematicas
routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(matematicas));
})
routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultados = matematicas.filter(cursos => cursos.tema === tema);

    if(resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de ${tema}`);
    }

    res.send(JSON.stringify(resultados));
})

//exportamos
module.exports = routerMatematicas;
