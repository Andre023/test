import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../services/api";
import '../../css.css';

export interface IUser {
    id: string;
    name: string;
    email: string;
}

const UserList = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getAllUsers().then(response => {
            setUsers(response.data);
        });
    }, []);

    const handleDeleteUser = async (id: string) => {
        if (!window.confirm("Deseja realmente excluir este usuário?")) {
            return;
        }
        try {
            await deleteUser(id);
            alert('Usuário excluído com sucesso!');
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            alert('Erro ao excluir o usuário!');
            console.error(error);
        }
    };

    return (
        <div>
            <div className="center-content">
                <h3>Lista de Usuários</h3>
                <div className="action-links">
                    <Link to={`/users/new`} className="button-link">Inserir Novo Usuário</Link>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><Link to={`/users/update/${user.id}`} className="button-link">Atualizar</Link></td>
                            <td><button onClick={() => handleDeleteUser(user.id)} className="button-delete">Excluir</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;