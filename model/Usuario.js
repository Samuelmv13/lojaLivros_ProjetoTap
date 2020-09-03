const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: String,
    cpf: Number,
    email: String,
    telefone: Number
});

module.exports = mongoose.model('Usuario', usuarioSchema);