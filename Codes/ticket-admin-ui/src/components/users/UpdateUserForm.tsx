import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../services/api";
import '../../App.css';

const UpdateUserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            getUserById(id).then(response => {
                const { name, email, creditCardNumber, city } = response.data;
                setName(name);
                setEmail(email);
                setCreditCardNumber(creditCardNumber || '');
                setCity(city || '');
            });
        }
    }, [id]);

    const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!id) return;
        const data = { id, name, email, creditCardNumber, city };
        try {
            await updateUser(data);
            alert('Usuário atualizado com sucesso!');
            navigate('/users');
        } catch (error) {
            alert('Erro ao atualizar o usuário!');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h3>Atualização de Usuário</h3>
            <form onSubmit={handleUpdateUser}>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
};

export default UpdateUserForm;