import React from 'react';
import { Link } from 'react-router-dom';
import { Orders } from '../../../../../../core/components/types/Client';
import { isAllowedRole } from '../../../../../../core/components/utils/auth';
import './styles.scss';

type Props = {
    order: Orders;
    onDisabled: (orderId: number) => void;
    buttonTitle: string;
}

const Card = ({ order, onDisabled, buttonTitle }: Props) => {

    return (
        <div className="card-base order-card-admin">
            <div className="row">
                <div className="col-7">
                    <h3 className="order-card-id-admin">
                        <strong>
                            {order.id}
                        </strong>
                    </h3>
                    <div className="order-card-date">
                        <label className="order-card-date-label">Data do Pedido:</label>
                        <label>{order.createdAt}</label>
                    </div>
                    <div>
                        <label className="order-card-totalValue-label">
                            <strong>
                                Valor Total:
                            </strong>
                        </label>
                        <label>{order.totalValue}</label>
                    </div>
                    <div>
                        <label className="order-card-status-label">
                            <strong>
                                Status:
                            </strong>
                        </label>
                        <label>{order.status ? 'Aguardando pagamento' : 'Pedido Finalizado'}</label>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-danger ml-2"
                        onClick={() => onDisabled(order.id)}
                    >
                        {buttonTitle}
                    </button>
                </div>
            </div>
        </div>

    )

}

export default Card;