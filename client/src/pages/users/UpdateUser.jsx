import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3001/updateUser/"+id, {name, email, age})
        .then(result => {
            console.log(result)
            navigate("/")
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:3001/findUser/"+id)
            .then(result => {
                setName(result.data.name),
                setEmail(result.data.email),
                setAge(result.data.age)
            })
            .catch(err => {
                console.log(err)
                navigate("/")
            })
    }, [])

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <Link to="/" className="btn btn-secondary">Voltar</Link>
                    <h2 className="text-center">Editando <b>{name ?? ''}</b></h2>
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" className="form-control" placeholder="Qual seu nome?" id="name" value={name ?? ''}
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Qual seu email?" id="email" value={email ?? ''}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="form-label">Idade</label>
                        <input type="number" className="form-control" placeholder="Qual sua idade?" id="age" value={age ?? 0}
                        onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary d-flex mx-auto">Salvar</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;