const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const rotaBibliotecas = require('./routes/bibliotecas');

//config
    //body-parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //mongoose
    mongoose.connect(`mongodb+srv://${db_user}:${db_password}@cluster0.qflbnri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
        console.log("conectado ao banco dde dados com sucesso!!!");
    }).catch((erro) => {
        console.log("Erro ao se conectar ao banco de dados, erro: "+erro);
    })


//rotas
app.use("/bibliotecas", rotaBibliotecas);

app.get('/', (req,res) => {
    res.send("Ola mundo");
})

//server
app.listen(PORT, () => {
    console.log("Servidor rodando na porta 3000");
})