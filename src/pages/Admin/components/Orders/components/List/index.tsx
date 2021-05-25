import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Pagination from '../../../../../../core/components/Pagination';
import Search, { FilterForm } from '../../../../../../core/components/Search';
import { OrdersResponse } from '../../../../../../core/components/types/Client';
import { isAllowedRole } from '../../../../../../core/components/utils/auth';
import { makePrivateRequest } from '../../../../../../services/api';
import Card from '../Card';

const List: React.FC = () => {
    const [ordersResponse, setOrdersResponse] = useState<OrdersResponse>();
    const [activePage, setActivePage] = useState(0);

    const history = useHistory();

    const getOrders = useCallback((filter?: FilterForm) => {
        const params = {
            page: activePage,
            linesPerPage: 10,
            title: filter?.name
        }

        makePrivateRequest({ url: "/orders", params })
            .then(response => {
                setOrdersResponse(response.data)
                console.log(response)
            })
            .catch(error => console.log('error', error))
    }, [activePage])

    useEffect(() => {
        getOrders()
    }, [getOrders])

    const onDisabled = (orderId: number) => {
        const confirmacao = window.confirm("Deseja alterar o status do Pedido?")
        if (confirmacao) {
            makePrivateRequest({ url: `/orders/${orderId}`, method: "DELETE" })
                .then(response => {
                    alert(`${response.data}`)
                    getOrders()
                })
                .catch(() => {
                    alert(`Erro ao inativar o pedido`)
                })
        }
    }

    return (
        <div className="admin-user-list">
            <div className="d-flex mb-2">
                <Search
                    onSearch={filter => getOrders(filter)}
                    placeholder="Pedido"
                    request="orders"
                />
            </div>
            <div>
                {ordersResponse?.content.map(orders => (
                    orders.status === true ? (
                        <Card order={orders} onDisabled={onDisabled} buttonTitle={'INATIVAR'} key={orders.id} />
                    ) : (
                        <Card order={orders} onDisabled={onDisabled} buttonTitle={'ATIVAR'} key={orders.id} />
                    )
                ))}
            </div>
            {ordersResponse && (
                <Pagination
                    totalPages={ordersResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />

            )}
        </div>
    )
}

export default List;