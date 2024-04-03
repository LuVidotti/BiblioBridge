const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
const mongoose = require('mongoose');
require("../models/Biblioteca");
const Biblioteca = mongoose.model("bibliotecas");

function verificaToken(req,res,next) {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({message: "Login necessario para tal acao"})
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({message: "Erro, faca login novamente"});
        }

        Biblioteca.findOne({_id: decoded.idBiblioteca}).then((biblioteca) => {
            if(!biblioteca) {
                return res.status(401).json({message: "Erro, biblioteca nao encontrada"})
            }

            req.user = biblioteca;
            next()
        }).catch((erro) => {
            return res.status(500).json({errorMessage: "Erro interno no servidor, erro: "+erro});
        })
    })
}

module.exports = verificaToken;