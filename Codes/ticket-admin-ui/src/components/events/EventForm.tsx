import React, { useState } from 'react';
import type { IEventData } from '../../services/api';
import { createEvent } from '../../services/api';
import '../../css.css';

const EventForm: React.FC = () => {
    const [formData, setFormData] = useState<IEventData>({
        description: '',
        type: 'CONCERT',
        date: '',
        startSales: '',
        endSales: '',
        price: 0,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const eventData = {
                ...formData,
                price: parseFloat(String(formData.price)),
                date: formData.date ? `${formData.date}:00` : '',
                startSales: formData.startSales ? `${formData.startSales}:00` : '',
                endSales: formData.endSales ? `${formData.endSales}:00` : '',
            };
            await createEvent(eventData);
            setMessage('Evento criado com sucesso!');
            setFormData({
                description: '', type: 'CONCERT', date: '', startSales: '', endSales: '', price: 0,
            });
        } catch (error) {
            setMessage('Falha ao criar o evento. Verifique os dados.');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Cadastro de Novo Evento</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <input id="description" type="text" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Tipo</label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange}>
                        <option value="CONCERT">Show</option>
                        <option value="LECTURE">Palestra</option>
                        <option value="THEATER">Teatro</option>
                        <option value="COURSE">Curso</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Data do Evento</label>
                    <input id="date" type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="startSales">Início das Vendas</label>
                    <input id="startSales" type="datetime-local" name="startSales" value={formData.startSales} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="endSales">Fim das Vendas</label>
                    <input id="endSales" type="datetime-local" name="endSales" value={formData.endSales} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Preço</label>
                    <input id="price" type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" />
                </div>
                <button type="submit">Cadastrar Evento</button>
            </form>
            {message && <p className={message.includes('sucesso') ? 'message success' : 'message error'}>{message}</p>}
        </div>
    );
};

export default EventForm;