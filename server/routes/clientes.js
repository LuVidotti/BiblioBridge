const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Cliente');
const Cliente = mongoose.model("clientes");
const verificaToken = require('../Auth/auth');

router.post('/', verificaToken, (req,res) => {
    const user = req.user;

    if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
        return res.status(400).json({message: "Erro, nome invalido"});
    }

    if(!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        return res.status(400).json({message: "Erro, email invalido"});
    }

    if(!req.body.telefone || typeof req.body.telefone === undefined || req.body.telefone === null) {
        return res.status(400).json({message: "Erro, telefone invalido"});
    }

    if(!req.body.rua || typeof req.body.rua === undefined || req.body.rua === null) {
        return res.status(400).json({message: "Erro, rua invalida"});
    }

    if(!req.body.bairro || typeof req.body.bairro === undefined || req.body.bairro === null) {
        return res.status(400).json({message: "Erro, bairro invalido"});
    }

    if(!req.body.numero || typeof req.body.numero === undefined || req.body.numero === null) {
        return res.status(400).json({message: "Erro, numero invalido"});
    }

    if(!req.body.cpf || typeof req.body.cpf === undefined || req.body.cpf === null) {
        return res.status(400).json({message: "Erro, cpf invalido"});
    }

    Cliente.findOne({cpf: req.body.cpf, idBiblioteca: user._id}).then((cliente) => {
        if(cliente) {
            return res.status(400).json({message: "Ja existe um cliente cadastrado neste cpf"});
        }

        const novoCliente = {
            nome: req.body.nome,
            telefone: req.body.telefone,
            endereco: {
                rua: req.body.rua,
                bairro: req.body.bairro,
                numero: req.body.numero
            },
            email: req.body.email,
            cpf: req.body.cpf,
            idBiblioteca: user._id
        }

        new Cliente(novoCliente).save().then((clienteSalvo) => {
            return res.status(201).json({message: "Cliente cadastrado com sucesso!!!", clienteSalvo:clienteSalvo});
        })
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

router.get("/", verificaToken, (req,res) => {
    const user = req.user;

    Cliente.find({idBiblioteca: user._id}).populate("idBiblioteca").then((clientes) => {
        return res.status(200).json(clientes);
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

router.delete('/:id', verificaToken, (req,res) => {
    const user = req.user;

    Cliente.findOneAndDelete({idBiblioteca: user._id, _id: req.params.id}).then((clienteRemovido) => {
        if(!clienteRemovido) {
            return res.status(404).json({message: "Erro ao encontrar cliente a ser deletado"});
        }

        return res.status(200).json({message: "Cliente deletado com sucesso!!!", clienteRemovido:clienteRemovido});
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

router.put("/:id", verificaToken, (req,res) => {
    const user = req.user;

    if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
        return res.status(400).json({message: "Erro, nome invalido"});
    }

    if(!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        return res.status(400).json({message: "Erro, email invalido"});
    }

    if(!req.body.telefone || typeof req.body.telefone === undefined || req.body.telefone === null) {
        return res.status(400).json({message: "Erro, telefone invalido"});
    }

    if(!req.body.rua || typeof req.body.rua === undefined || req.body.rua === null) {
        return res.status(400).json({message: "Erro, rua invalida"});
    }

    if(!req.body.bairro || typeof req.body.bairro === undefined || req.body.bairro === null) {
        return res.status(400).json({message: "Erro, bairro invalido"});
    }

    if(!req.body.numero || typeof req.body.numero === undefined || req.body.numero === null) {
        return res.status(400).json({message: "Erro, numero invalido"});
    }

    if(!req.body.cpf || typeof req.body.cpf === undefined || req.body.cpf === null) {
        return res.status(400).json({message: "Erro, cpf invalido"});
    }

    Cliente.findOne({_id: req.params.id, idBiblioteca: user._id}).then((cliente) => {
        if(!cliente) {
            return res.status(404).json({message: "cliente nao encontrado"});
        }

        cliente.nome = req.body.nome;
        cliente.telefone = req.body.telefone;
        cliente.email = req.body.email;
        cliente.endereco.rua = req.body.rua;
        cliente.endereco.bairro = req.body.bairro;
        cliente.endereco.numero = req.body.numero;
        cliente.cpf = req.body.cpf;

        Cliente.findOne({cpf: cliente.cpf, _id: {$ne: cliente._id}, idBiblioteca: user._id}).then((clienteEditado) => {
            if(clienteEditado) {
                return res.status(400).json({message: "Ja existe um cliente cadastrado neste cpf"});
            }

            cliente.save().then((cEditado) => {
                return res.status(201).json({message: "Cliente editado com sucesso!!!", cEditado:cEditado});
            })
        }).catch((erro) => {
            return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
        })
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

module.exports = router;