const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Livro = new Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    editora: {
        type: String,
        required: true
    },
    dataPublicacao: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    }
})

mongoose.model("livros", Livro);