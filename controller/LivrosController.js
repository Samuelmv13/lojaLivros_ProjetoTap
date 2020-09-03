const express = require('express');
const router = express.Router();
const Livro = require('../model/Livro');

//Função middleware
const getLivroPorId = async (req, res, next) => {
    try {
        let livro = await Livro.findById(req.params.id);
        if(livro === null){
            res.status(404).json({erro: 'livro com o id informado não encontrado'});
        } else {
            req.livro = livro;
            next();
        }
        } catch (erro){
            res.status(500).json({erro: 'o id informado não é valido'});
        }
};


//Retornar todos os livros
router.get('/', async (req, res) => {
    res.send(await Livro.find());
});

//Retornar o livro com o id informado
router.get('/:id', getLivroPorId, async (req, res) => {
   res.json(req.livro);
});

//adicionar um livro
router.post('/', async (req, res) => {
    let livro = await Livro(req.body).save();
    res.json(livro);
});
//alterar o livro com o id informado
router.put('/:id',getLivroPorId, async (req, res) => {
    let livro = req.livro;

    livro.codigo = req.body.codigo;
    livro.titulo = req.body.titulo;
    livro.autor = req.body.autor;
    livro.isbn = req.body.isbn;
    livro.editora = req.body.editora;
    livro.numPaginas = req.body.numPaginas;
    livro.preco = req.body.numPaginas;
    await livro.save();
    res.send('O livro foi atualizado');
});
//exluir o livro informado
router.delete('/:id', getLivroPorId, async (req, res) => {
    await req.livro.delete();
    res.send('O produto foi removido');
});

module.exports = router;