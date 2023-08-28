const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //unique: true não permite que o mesmo email seja cadastrado mais de uma vez
    age: { type: Number }
})

const UserModel = mongoose.model('users', UsersSchema)
module.exports = UserModel