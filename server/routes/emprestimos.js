const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require('../models/Emprestimo');
const Emprestimo = mongoose.model("emprestimos");
require("../models/Cliente");
const Cliente = mongoose.model("clientes");
require('../models/Livro');
const Livro = mongoose.model("livros");
const verificaToken = require('../Auth/auth');

function verificaAtraso(dataAtual, dataDevolucao) {
    const dataAtualMs = dataAtual.getTime();
    const dataDevolucaoMs = dataDevolucao.getTime();

    if(dataAtualMs > dataDevolucaoMs) {
        return "atrasado"
    } else {
        return "pendente"
    }
}

router.post('/', verificaToken, (req,res) => {
    const user = req.user;

    if(!req.body.idCliente || typeof req.body.idCliente === undefined || req.body.idCliente === null) {
        return res.status(400).json({message: "Erro, cliente invalido"});
    }

    if(!req.body.idLivro || typeof req.body.idLivro === undefined || req.body.idLivro === null) {
        return res.status(400).json({message: "Erro, livro invalido"});
    }

    if(!req.body.dataDevolucaoPrevista || typeof req.body.dataDevolucaoPrevista === undefined || req.body.dataDevolucaoPrevista === null) {
        return res.status(400).json({message: "Erro, data de devolucao invalida"});
    }

    Livro.findOne({_id: req.body.idLivro, idBiblioteca: user._id}).then((livro) => {
        if(livro.quantidade === 0) {
            return res.status(400).json({message: "Nao ha mais exemplares deste livro disponiveis no momento"});
        }

        livro.quantidade = livro.quantidade - 1;

        livro.save().then(() => {
            const novoEmprestimo = {
                idCliente: req.body.idCliente,
                idLivro: req.body.idLivro,
                idBiblioteca: user._id,
                dataDevolucaoPrevista: req.body.dataDevolucaoPrevista
            };
    
            new Emprestimo(novoEmprestimo).save().then((emprestimoSalvo) => {
                return res.status(201).json({message: "Empréstimo cadastrado com sucesso!!!", emprestimoSalvo: emprestimoSalvo});
            }).catch((erro) => {
                return res.status(500).json({errorMessage: "Erro interno no servidor ao salvar o empréstimo", erro: erro});
            });
        })
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

router.get('/', verificaToken, (req,res) => {
    const user = req.user;

    Emprestimo.find({idBiblioteca: user._id}).populate("idCliente").populate("idLivro").then((emprestimos) => {
        const dataAtual = Date.now();

        emprestimos.forEach((emprestimo) => {
            emprestimo.status = verificaAtraso(new Date(dataAtual), new Date(emprestimo.dataDevolucaoPrevista));
            emprestimo.save();
        })

        return res.status(200).json(emprestimos);
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

router.delete("/:id", verificaToken, (req,res) => {
    const user = req.user;

    Emprestimo.deleteOne({_id: req.params.id, idBiblioteca: user._id}).then((emprestimoDeletado) => {
        return res.status(200).json({message: "Emprestimo deletado com sucesso!!!", emprestimoDeletado:emprestimoDeletado});
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})


module.exports = router;