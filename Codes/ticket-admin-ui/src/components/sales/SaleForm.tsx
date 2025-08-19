// SaleForm.tsx
import React, { useState, useEffect } from 'react';
import { createSale, getAllEvents, getAllUsers } from '../../services/api';
import '../../App.css';

interface IUser {
  id: string;
  name: string;
  email: string;
}
interface IEvent {
  id: string;
  description: string;
}

const SaleForm: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getAllUsers();
        const eventsRes = await getAllEvents();
        setUsers(usersRes.data);
        setEvents(eventsRes.data);
        if (usersRes.data.length > 0) setSelectedUser(usersRes.data[0].id);
        if (eventsRes.data.length > 0) setSelectedEvent(eventsRes.data[0].id);
      } catch (error) {
        console.error("Erro ao buscar dados para o formulário:", error);
        setMessage('Não foi possível carregar os usuários ou eventos.');
        setMessageType('error');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!selectedUser || !selectedEvent) {
      setMessage('Por favor, selecione um usuário e um evento.');
      setMessageType('error');
      return;
    }

    setSubmitting(true);
    try {
      await createSale({ userId: selectedUser, eventId: selectedEvent });
      setMessage('Venda cadastrada com sucesso!');
      setMessageType('success');
    } catch (error) {
      console.error(error);
      setMessage('Falha ao cadastrar a venda.');
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container card">
      <h2>Cadastro de Nova Venda</h2>

      {message && (
        <p role="status" aria-live="polite" className={messageType === 'success' ? 'message success' : 'message error'}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user-select">Usuário</label>
          <select
            id="user-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            aria-required="true"
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="event-select">Evento</label>
          <select
            id="event-select"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            aria-required="true"
          >
            {events.map(event => (
              <option key={event.id} value={event.id}>
                {event.description}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={!users.length || !events.length || submitting} aria-disabled={!users.length || !events.length || submitting}>
          {submitting ? 'Enviando...' : 'Cadastrar Venda'}
        </button>
      </form>
    </div>
  );
};

export default SaleForm;
