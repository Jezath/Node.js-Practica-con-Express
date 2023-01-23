//importaciones
const express = require('express');
const { programacion } = require('../datos/cursos').infoCursos;
//ruta
const routerProgramacion = express.Router();
//procesar cuerpo tipo json
routerProgramacion.use(express.json());

//programacion
routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(programacion));
})

routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(cursos => cursos.lenguaje === lenguaje);

    if(resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
    }

    console.log(req.query.ordenar);
    if (req.query.ordenar === 'vistas') {
        return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)));
    }
    res.send(JSON.stringify(resultados));
})
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultados = programacion.filter(cursos => cursos.lenguaje === lenguaje && cursos.nivel === nivel);

    if(resultados.length === 0) {
        return res.status(204).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
    }

    res.send(JSON.stringify(resultados));
});

//POST
routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.json(programacion);
});
//PUT
routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
    //buscamos el indice del objeto en el array curso
    const indice = programacion.findIndex(curso => curso.id == id);
    if(indice >= 0) {
        programacion[indice] = cursoActualizado;
        res.send(JSON.stringify(programacion));
    }
})
//PATH
routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;
    
    const indice = programacion.findIndex(curso => curso.id == id);

    if(indice >= 0) {
        const cursoAmodificar = programacion[indice];
        //permite modificar solo unas propiedades del objeto que cambiemos
        Object.assign(cursoAmodificar, infoActualizada);
    }
    res.send(JSON.stringify(programacion));
})
//DELETE
routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    if(indice >= 0) {
        //splice permite eliminar elemento de un 
        //array le pasamos el indice y el id
        programacion.splice(indice, 1)
    }
    res.send(JSON.stringify(programacion));
})

module.exports = routerProgramacion;