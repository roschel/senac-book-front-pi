import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import plusButton from '../../../../core/assets/images/plusButton.svg'
import { Orders } from '../../../../core/components/types/Client'
import { makePrivateRequest } from '../../../../services/api'
import { format } from 'date-fns'

import './styles.scss'

type ParamsType = {
    clientId: string
}

const ClientOrders = () => {
    const { clientId } = useParams<ParamsType>();
    const [orders, setOrders] = useState<Orders[]>();

    useEffect(() => {
        makePrivateRequest({ url: `/orders/client/${clientId}` })
            .then((response) => {
                const ordersResponse = response.data as Orders[]
                ordersResponse.forEach(order => {
                    order.createdAt = format(new Date, "dd/MM/yyyy")
                })
                setOrders(ordersResponse)
            })
    }, [])

    return (
        <div>
            {orders && orders.map(order => (
                <div className="geral-client row mb-2">
                    <div className="cabecalho col-12">
                        <h6 className="col-3"><strong>ID</strong></h6>
                        <h6 className="col-3"><strong>Data</strong></h6>
                        <h6 className="col-3"><strong>Valor Total</strong></h6>
                        <h6 className="col-3"><strong>Status</strong></h6>
                    </div>
                    <div className="infos col-12">
                        <h6 className="col-3">{order.id}</h6>
                        <h6 className="col-3">{order.createdAt}</h6>
                        <h6 className="col-3">{order.totalValue.toFixed(2).replace('.', ',')}</h6>
                        <h6 className="col-3">{order.status ? 'Aguardando pagamento' : 'Pedido Finalizado'}</h6>
                        <button className="btn btn-primary plus-button">
                            <img src={plusButton} alt="" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ClientOrders;