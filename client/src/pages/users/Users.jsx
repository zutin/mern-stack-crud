import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
    
    const [users, setUsers] = useState([])

    const handleDestroy = (id) => {
        axios.delete("http://localhost:3001/destroyUser/"+id)
        .then(res => {
            console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:3001/")
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-primary">Criar Usuário</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Idade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className="btn btn-primary">Editar</Link>
                                        <button className="btn btn-danger" onClick={(e) => handleDestroy(user._id)}>Excluir</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Users;