const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Emprestimo = new Schema({
    IdCliente: {
        type: Schema.Types.ObjectId,
        ref: "clientes"
    },
    idLivro: {
        type: Schema.Types.ObjectId,
        ref: "livros"
    },
    dataEmprestimo: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default: "pendente"
    },
    dataDevolucao: {
        type: Date
    },
    idBiblioteca: {
        type: Schema.Types.ObjectId,
        ref: "bibliotecas"
    }
})

mongoose.model("emprestimos", Emprestimo);