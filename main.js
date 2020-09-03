const express = require('express');
const bodyParser = require('body-parser');
const db = require('./confDB/db');
 
db.on('error' , (error) => console.log(error));
db.once('open', async () => {
    console.log('A conexão com o DB está aberta');
    const app = express();
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use('/livros', require('./controller/LivrosController'));
    app.use('/usuarios', require('./controller/UsuariosController'));
    app.listen(3000, () => {
        console.log('Servidor no ar no endereço: http://localhost:3000');
    });
});