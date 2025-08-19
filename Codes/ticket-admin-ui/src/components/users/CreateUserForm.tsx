import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/api";
import type { IUserData } from "../../services/api";
import '../../App.css';

const CreateUserForm = () => {
    const [formData, setFormData] = useState<IUserData>({
        name: '',
        email: '',
        password: '',
        creditCardNumber: '',
        city: ''
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.password) {
            alert('O campo de senha é obrigatório.');
            return;
        }

        try {
            await createUser(formData);
            alert('Usuário cadastrado com sucesso!');
            navigate('/users');
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar o usuário. Verifique o console para mais detalhes.');
        }
    };

    return (
        <div className="form-container">
            <h3>Cadastro de Novo Usuário</h3>
            <form onSubmit={handleCreateUser}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="creditCardNumber">Número do Cartão de Crédito</label>
                    <input
                        type="text"
                        name="creditCardNumber"
                        id="creditCardNumber"
                        value={formData.creditCardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">Cidade</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CreateUserForm;