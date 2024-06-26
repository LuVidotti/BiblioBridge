const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Biblioteca = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
})

mongoose.model("bibliotecas", Biblioteca);