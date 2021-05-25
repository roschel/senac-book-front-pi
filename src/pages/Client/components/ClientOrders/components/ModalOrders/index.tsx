import { format } from 'date-fns';
import { useState } from 'react';
import { Payment } from '../../../../../../core/components/utils/cart';
import { Modal } from 'react-bootstrap';
import { Orders } from '../../../../../../core/components/types/Orders';

type Props = {
  order: Orders
}

const ModalOrders = ({ order }: Props) => {

  const [show, setShow] = useState(true);
  const [payment, setPayment] = useState<Payment | null>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>

      <Modal
        show={show}
        onHide={handleClose}
        size={"xl"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card p-2">
            <div className="d-flex mb-2">
              <h5><strong>Produtos</strong></h5>
            </div>
            <div className="col-12 titulos-produto d-flex">
              <h6 className="col-3"><strong>Nome: </strong></h6>
              <h6 className="col-3"><strong>Valor R$</strong></h6>
              <h6 className="col-3"><strong>Qtd. </strong></h6>
              <h6 className="col-3"><strong>Total R$</strong></h6>
            </div>
            {order && order.orderDetails.map(product => (
              <div className="col-12 infor-produto d-flex">
                <h6 className="col-3">{product.product.title}</h6>
                <h6 className="col-3"><strong>RS </strong>{(product.product.price).toFixed(2).replace(".", ",")}</h6>
                <h6 className="col-3">{product.quantity}</h6>
                <h6 className="col-3"><strong>R$ </strong>{(product.quantity * product.product.price).toFixed(2).replace(".", ",")}</h6>
              </div>
            ))}
            <div className="col-12 mt-5 d-flex">
              <h6 className="col-6"><strong>frete: R$ </strong>{order.shipping && (order.shipping.toFixed(2).replace(".", ","))}</h6>
              <h6 className="col-6"><strong>Total geral: R$ </strong>{order.totalValue && (order.totalValue.toFixed(2).replace(".", ","))}</h6>
            </div>
          </div>
          <div className="col-12 mt-2 card">
            <h5 className="haha"><strong>Endereço de entrega</strong></h5>
            <div className="infor-address">
            <div className="justify-content-center d-flex">
                <h6 className="mr-3"><strong>Rua: </strong> {order.address.address} </h6>
                <h6><strong>Nº: </strong> {order.address?.number} </h6>
              </div>
              <div className="justify-content-center d-flex">
                <h6 className="mr-3"><strong>CEP: </strong> {order.address?.zipCode} </h6>
                <h6><strong>Bairro: </strong> {order.address?.neighborhood} </h6>
              </div>
              <div className="justify-content-center d-flex">
                <h6 className="mr-3"><strong>Cidade: </strong> {order.address?.city} </h6>
                <h6><strong>UF: </strong> {order.address?.state} </h6>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 card">
            <div className="infor-payment">
              <h5 className="haha"><strong>Forma de pagamento</strong></h5>
              {!payment ? (
                <div className="payment-method align-items-center d-flex flex-column">
                  <h6>Boleto bancário</h6>
                  <h6><strong>Vencimento: </strong> {format(new Date().setDate(new Date().getDate() + 2), "dd/MM/yyyy")} </h6>
                </div>

              ) : (

                <div className="payment-method align-items-center d-flex flex-column">
                  <h6>Cartão de crédito</h6>
                  <h6><strong>Final do cartao: </strong>{"xxxx-xxxx-xxxx-" + order.payment.numberCard.slice(12, 16)}</h6>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            Close
            </button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ModalOrders;