const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
    codigo: Number,
    titulo: String,
    autor: String,
    isbn: Number,
    editora: String,
    numPaginas: Number,
    preco: Number
});

module.exports = mongoose.model('Livro', livroSchema);
