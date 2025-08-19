import React, { useState, useEffect } from 'react';
import type { ISaleStatusUpdate } from '../../services/api';
import { getAllSales, updateSaleStatus } from '../../services/api';
import '../../App.css';

interface IEvent {
    description: string;
}
interface ISale {
    id: string;
    userId: string;
    event: IEvent;
    purchaseDate: string;
    purchaseStatus: 'PENDING' | 'PAID' | 'CANCELED' | 'REFUNDED';
}

const SalesList: React.FC = () => {
    const [sales, setSales] = useState<ISale[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSales = async () => {
        try {
            const response = await getAllSales();
            setSales(response.data);
        } catch (error) {
            console.error("Erro ao buscar vendas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const handleStatusChange = async (saleId: string, newStatus: ISaleStatusUpdate['newStatus']) => {
        try {
            await updateSaleStatus(saleId, { newStatus });
            alert('Status atualizado com sucesso!');
            fetchSales();
        } catch (error) {
            alert('Falha ao atualizar o status.');
            console.error(error);
        }
    };

    if (loading) return <p>Carregando vendas...</p>;

    return (
        <div className="table-container">
            <h2>Lista de Vendas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID da Venda</th>
                        <th>ID do Usuário</th>
                        <th>Evento</th>
                        <th>Data da Compra</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.userId}</td>
                            <td>{sale.event.description}</td>
                            <td>{new Date(sale.purchaseDate).toLocaleString()}</td>
                            <td>
                                <select
                                    value={sale.purchaseStatus}
                                    onChange={(e) => handleStatusChange(sale.id, e.target.value as ISale['purchaseStatus'])}
                                >
                                    <option value="PENDING">Pendente</option>
                                    <option value="PAID">Pago</option>
                                    <option value="CANCELED">Cancelado</option>
                                    <option value="REFUNDED">Estornado</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesList;