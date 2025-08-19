import axios from 'axios';

// Tipos para os dados que enviaremos para a API
export interface IEventData {
  description: string;
  type: 'LECTURE' | 'CONCERT' | 'THEATER' | 'COURSE';
  date: string;
  startSales: string;
  endSales: string;
  price: number;
}

export interface ISaleData {
  userId: string;
  eventId: string;
}

export interface ISaleStatusUpdate {
    newStatus: 'PENDING' | 'PAID' | 'CANCELED' | 'REFUNDED';
}


export interface IUserData {
  name: string;
  email: string;
  password?: string;
  creditCardNumber: string;
  city: string;
}

// Configuração do Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// --- Funções para Eventos ---
export const createEvent = (data: IEventData) => apiClient.post('/events', data);
export const getAllEvents = () => apiClient.get('/events');

// --- Funções para Vendas ---
export const getAllSales = () => apiClient.get('/sales');
export const createSale = (data: ISaleData) => apiClient.post('/sales', data);
export const updateSaleStatus = (saleId: string, data: ISaleStatusUpdate) =>
  apiClient.patch(`/sales/${saleId}/status`, data);

// --- Funções para Usuários (CRUD completo) ---
export const getAllUsers = () => apiClient.get('/users');
export const getUserById = (id: string) => apiClient.get(`/users/${id}`);
export const createUser = (data: IUserData) => apiClient.post('/users', data);
export const updateUser = (data: { id: string } & IUserData) => apiClient.put('/users', data);
export const deleteUser = (id: string) => apiClient.delete('/users/remove', { data: { id } });