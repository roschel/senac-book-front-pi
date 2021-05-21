import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Orders } from '../../../../../../core/components/types/Client';
import { User } from '../../../../../../core/components/types/User';
import { isAllowedRole } from '../../../../../../core/components/utils/auth';
import { makePrivateRequest } from '../../../../../../services/api';
import plusButton from '../../../../../../core/assets/images/plusButton.svg'
import './styles.scss';
import ModalOrders from '../ModalOrders';

type ParamsType = {
    clientId: string
}

type Props = {
    order: Orders;
}

const Card = ({ order }: Props) => {

    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        if (showModal) {
            setShowModal(false)
        } else {
            setShowModal(true)
        }
    }

    return (
        <div>
            <>

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
                        <button
                            className="btn btn-primary plus-button"
                            onClick={handleModal}
                        >
                            <img src={plusButton} alt="" />
                        </button>
                    </div>
                </div>


                {showModal &&
                    <ModalOrders />
                }

            </>
        </div>

    )

}

export default Card;