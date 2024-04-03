const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Biblioteca");
const Biblioteca = mongoose.model("bibliotecas");
const bcrypt = require('bcryptjs');

router.post('/', (req,res) => {
    if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
        return res.status(400).json({message: "Erro, nome invalido"});
    }

    if(!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        return res.status(400).json({message: "Erro, e-mail invalido"});
    }

    if(!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
        return res.status(400).json({message: "Erro, senha invalida"});
    }

    if(req.body.senha.length < 4) {
        return res.status(400).json({message: "Erro, senha muito curta"});
    }

    if(req.body.senha2 !== req.body.senha) {
        return res.status(400).json({message: "Erro, as senhas devem coincidir"});
    }

    Biblioteca.findOne({email: req.body.email}).then((biblioteca) => {
        if(biblioteca) {
            return res.status(400).json({message: "Este e-mail ja esta cadastrado"})
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.senha, salt);

        const novaBiblioteca = {
            nome: req.body.nome,
            email: req.body.email,
            senha: hash
        }

        new Biblioteca(novaBiblioteca).save().then((bibliotecaSalva) => {
            return res.status(201).json({message: "Biblioteca cadastrada com sucesso!!!", bibliotecaSalva:bibliotecaSalva});
        })

    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})



module.exports = router;