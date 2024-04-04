const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Livro');
const Livro = mongoose.model("livros");
const verificaToken = require('../Auth/auth');

router.post("/", verificaToken, (req,res) => {
    const user = req.user;

    if(!req.body.titulo || typeof req.body.titulo === undefined || req.body.titulo === null) {
        return res.status(400).json({message: "Erro, titulo invalido"});
    }

    if(!req.body.autor || typeof req.body.autor === undefined || req.body.autor === null) {
        return res.status(400).json({message: "Erro, autor invalido"});
    }

    if(!req.body.editora || typeof req.body.editora === undefined || req.body.editora === null) {
        return res.status(400).json({message: "Erro, editora invalida"});
    }

    if(!req.body.dataPublicacao || typeof req.body.dataPublicacao === undefined || req.body.dataPublicacao === null) {
        return res.status(400).json({message: "Erro, data de publicacao invalida"});
    }

    if(!req.body.quantidade || typeof req.body.quantidade === undefined || req.body.quantidade === null) {
        return res.status(400).json({message: "Erro, quantidade invalida"});
    }

    Livro.findOne({titulo: req.body.titulo, idBiblioteca: user._id}).then((livro) => {
        if(livro) {
            return res.status(400).json({message: "Ja existe um livro cadastrado com este titulo"});
        }

        const novoLivro = {
            titulo: req.body.titulo,
            autor: req.body.autor,
            editora: req.body.editora,
            dataPublicacao: req.body.dataPublicacao,
            quantidade: req.body.quantidade,
            idBiblioteca: user._id
        }

        new Livro(novoLivro).save().then((livroSalvo) => {
            return res.status(201).json({message: "Livro cadastrado com sucesso!!!", livroSalvo:livroSalvo});
        }).catch((erro)=> {
            return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
        })
    }).catch((erro)=> {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

router.get('/', verificaToken, (req,res) => {
    const user = req.user;

    Livro.find({idBiblioteca: user._id}).populate("idBiblioteca").then((livros) => {
        return res.status(200).json(livros);
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

router.get('/:titulo', verificaToken, (req,res) => {
    const pesquisa = RegExp(req.params.titulo, "i");
    const user = req.user;

    Livro.find({titulo: pesquisa, idBiblioteca: user._id}).populate("idBiblioteca").then((livros) => {
        return res.status(200).json(livros);
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

router.put('/:id', verificaToken, (req,res) => {
    const user = req.user;

    if(!req.body.titulo || typeof req.body.titulo === undefined || req.body.titulo === null) {
        return res.status(400).json({message: "Erro, titulo invalido"});
    }

    if(!req.body.autor || typeof req.body.autor === undefined || req.body.autor === null) {
        return res.status(400).json({message: "Erro, autor invalido"});
    }

    if(!req.body.editora || typeof req.body.editora === undefined || req.body.editora === null) {
        return res.status(400).json({message: "Erro, editora invalida"});
    }

    if(!req.body.dataPublicacao || typeof req.body.dataPublicacao === undefined || req.body.dataPublicacao === null) {
        return res.status(400).json({message: "Erro, data de publicacao invalida"});
    }

    if(!req.body.quantidade || typeof req.body.quantidade === undefined || req.body.quantidade === null) {
        return res.status(400).json({message: "Erro, quantidade invalida"});
    }

    Livro.findOne({_id: req.params.id, idBiblioteca: user._id}).then((livro) => {
        if(!livro) {
            return res.status(404).json({message: "Livro nao encontrado"});
        }

        livro.titulo = req.body.titulo;
        livro.autor = req.body.autor;
        livro.editora = req.body.editora;
        livro.dataPublicacao = req.body.dataPublicacao;
        livro.quantidade = req.body.quantidade;

        Livro.findOne({titulo: livro.titulo, _id: {$ne: livro._id}, idBiblioteca: user._id}).then((livroDuplicado) => {
            if(livroDuplicado) {
                return res.status(400).json({message: "Ja existe um livro cadastrado com este titulo"})
            }

            livro.save().then((livroEditado) => {
                return res.status(201).json({message: "Livro editado com sucesso!!!", livroEditado:livroEditado});
            }).catch((erro) => {
                return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
            })
        }).catch((erro) => {
            return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
        })
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

router.delete('/:id', verificaToken, (req,res) => {
    const user = req.user;

    Livro.deleteOne({_id: req.params.id, idBiblioteca: user._id}).then((livroDeletado) => {
        return res.status(200).json({message: "Livro deletado com sucesso!!!", livroDeletado:livroDeletado});
    }).catch((erro) => {
        return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
    })
})

module.exports = router;