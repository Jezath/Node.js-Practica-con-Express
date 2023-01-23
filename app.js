const express = require('express');
const app = express();
//importar objetos
const { infoCursos } = require('./datos/cursos.js');

//router
const routerProgramacion = require('./router/programacion');
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./router/matematicas');
app.use('/api/cursos/matematicas', routerMatematicas);

//sin router
app.get('/', (req, res) => {
    res.send('Mi primer servidor con Express. Cursos 💻')
});
app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
})

//servidor escuchando
const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto: ${PUERTO}`);
});