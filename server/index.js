const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors()) //permite o frontend acessar o backend
app.use(express.json()) // força o formato json

// Conexão com o banco de dados
mongoose.connect('DB_URL_AQUI')

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err))
})

app.get('/findUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({_id:id})
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))
})

app.post('/createUser', async (req, res) => {
    UserModel.create(req.body) //criando direto com o body
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id //atualizando separadamente com os dados do body
    UserModel.findByIdAndUpdate({_id:id}, {name: req.body.name, email: req.body.email, age: req.body.age})
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))
})

app.delete('/destroyUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({_id:id})
        .then(res => res.json(res))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Server is now live on port 3001')
})