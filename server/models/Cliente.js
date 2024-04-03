const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cliente = new Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    endereco: {
        rua: {
            type: String,
            required: true
        },
        bairro: {
            type: String,
            required: true
        },
        numero: {
            type: Number,
            required: true
        }
    },
    email: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    idBiblioteca: {
        type: Schema.Types.ObjectId,
        ref: "bibliotecas"
    }
});

mongoose.model("clientes", Cliente);