import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function CreateUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/createUser", {name, email, age})
        .then(result => {
            console.log(result)
            navigate("/")
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <Link to="/" className="btn btn-secondary">Voltar</Link>
                    <h2 className="text-center">Criar novo usuário</h2>
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" className="form-control" placeholder="Qual seu nome?" id="name" 
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Qual seu email?" id="email"
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="form-label">Idade</label>
                        <input type="number" className="form-control" placeholder="Qual sua idade?" id="age"
                        onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary d-flex mx-auto">Criar</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;