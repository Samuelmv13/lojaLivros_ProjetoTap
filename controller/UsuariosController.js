const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario');

//Função middleware
const getUsuarioPorId = async (req, res, next) => {
    try {
        let usuario = await Usuario.findById(req.params.id);
        if(usuario === null){
            res.status(404).json({erro: 'usuário com o id informado não encontrado'});
        } else {
            req.usuario = usuario;
            next();
        }
        } catch (erro){
            res.status(500).json({erro: 'o id informado não é valido'});
        }
};


//Retornar todos os usuários
router.get('/', async (req, res) => {
    res.send(await Usuario.find());
});

//Retornar o usuário com o id informado
router.get('/:id', getUsuarioPorId, async (req, res) => {
   res.json(req.usuario);
});

//adicionar um usuário
router.post('/', async (req, res) => {
    let usuario = await Usuario(req.body).save();
    res.json(usuario);
});
//alterar o usuário com o id informado
router.put('/:id',getUsuarioPorId, async (req, res) => {
    let usuario = req.usuario;

    usuario.nome = req.body.nome;
    usuario.cpf = req.body.cpf;
    usuario.email = req.body.email;
    usuario.telefone = req.body.telefone;

    await usuario.save();
    res.send('O Usuário foi atualizado');
});
//exluir o usuário informado
router.delete('/:id', getUsuarioPorId, async (req, res) => {
    await req.usuario.delete();
    res.send('O usuário foi removido');
});

module.exports = router;