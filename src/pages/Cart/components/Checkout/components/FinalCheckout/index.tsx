import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartSession, getCartData, Payment } from '../../../../../../core/components/utils/cart';
import { makePrivateRequest } from '../../../../../../services/api';
import './styles.scss';

const FinalCheckout = () => {
  const [cart, setCart] = useState<CartSession>();
  const [payment, setPayment] = useState<Payment | null>();
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [orderId, setOrderId] = useState(0)
  const history = useHistory();

  const notifySuccess = (orderId: number, userId: number) => {
    toast.success(`Compra finalizada com sucesso! Seu número de pedido é: ${orderId}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      onClose: () => finish(userId),
    })
  };

  const notifyError = () => {
    toast.error('Ops, algo está errado... tente novamente mais tarde!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  };


  useEffect(() => {
    const data = getCartData()

    setCart(data)
    setPaymentMethod(data.paymentMethod)

    if (data.payment) {
      makePrivateRequest({ url: `/payment/${data.payment}` })
        .then((response) => {
          console.log(response)
          setPayment(response.data)
        })
    } else {
      setPayment(null)
    }

  }, [])

  const handleBack = () => {
    history.push('/cart/checkout')
  }

  const handleSubmit = () => {
    const data = getCartData()
    const prod: Object[] = []
    data.products.forEach(element => {
      prod.push(
        {
          id: element.product.id,
          quantity: element.sellQuantity
        }
      )
    });

    const orderPost = {
      client: {
        id: data.customerId
      },
      payment: data.payment ? { id: data.payment } : null,
      address: {
        id: data.address?.id
      },
      value: data.value,
      shipping: data.shipping,
      totalValue: data.totalValue,
      status: true,
      orderStatus: "AGUARDANDO PAGAMENTO"
    }

    makePrivateRequest({ url: `/orders`, data: orderPost, method: 'POST' })
      .then(response => {
        data.products.forEach(product => {
          let orderDetails = {
            product: product.product,
            quantity: product.sellQuantity,
            order: response.data
          }
          console.log(orderDetails)
          makePrivateRequest({
            url: `orders/details`,
            method: 'POST',
            data: orderDetails
          })
            .then(res => {
              console.log('order_details', res)
            })
            .catch(error => {
              console.log("error", error)
            })
        })
        // history.push(`/client/${data.customerId}/orders`)
        // setOrderId(data.customerId ?? 0)
        notifySuccess(response.data.id, data.customerId ?? 0)
        localStorage.removeItem('cartData')
      })
      .catch(response => {
        notifyError()
        console.log(response)
      })
  }

  const finish = (orderId: number) => {
    history.push(`/client/${orderId}/orders`)
  }

  return (
    <div className="geral-final-checkout">
      <div>
        <h4>Finalizar pedido</h4>
      </div>
      <div className="info-final-checkout">
        <div className="card card-color-final-checkout productCard">
          <h5 className="cardTitle"><strong>Produtos</strong></h5>
          <div className="title-products col-12">
            <h6 className="col-3"><strong>Nome: </strong></h6>
            <h6 className="col-3"><strong>Valor Uni.</strong></h6>
            <h6 className="col-3"><strong>Qtd. </strong></h6>
            <h6 className="col-3"><strong>Valor Total</strong></h6>
          </div>
          {cart?.products.map(product => (
            <div className="info-products col-12">
              <h6 className="col-3">{product.product.title}</h6>
              <h6 className="col-3"><strong>RS </strong>{product.product.price.toFixed(2).replace(".", ",")}</h6>
              <h6 className="col-3">{product.sellQuantity}</h6>
              <h6 className="col-3"><strong>R$ </strong>{(product.sellQuantity * product.product.price).toFixed(2).replace(".", ",")}</h6>
            </div>
          ))}
          <div className="frete col-12 mt-5">
            <h6 className="col-6"><strong>frete: R$ </strong>{cart?.shipping && (cart?.shipping.toFixed(2).replace(".", ","))}</h6>
            <h6 className="valorTotal col-6"><strong>Total do pedido: R$ </strong>{cart?.totalValue && (cart?.totalValue.toFixed(2).replace(".", ","))}</h6>
          </div>
        </div>
        <div className="card card-color-final-checkout address">
          <h5 className="cardTitle"><strong>Endereço de entrega</strong></h5>
          <div className="pular">
            <h6 className="mr-3"><strong>Rua: </strong> {cart?.address?.address} </h6>
            <h6><strong>Nº: </strong> {cart?.address?.number} </h6>
          </div>
          <div className="pular">
            <h6 className="mr-3"><strong>CEP: </strong> {cart?.address?.zipCode} </h6>
            <h6><strong>Bairro: </strong> {cart?.address?.neighborhood} </h6>
          </div>
          <div className="pular">
            <h6 className="mr-3"><strong>Cidade: </strong> {cart?.address?.city} </h6>
            <h6><strong>UF: </strong> {cart?.address?.state} </h6>
          </div>
        </div>
        <div className="card card-color-final-checkout payment">
          <h5 className="cardTitle"><strong>Forma de pagamento</strong></h5>
          {!payment ? (
            <div className="boleto">
              <h6>Boleto bancário</h6>
              <h6><strong>Vencimento: </strong> {format(new Date().setDate(new Date().getDate() + 2), "dd/MM/yyyy")} </h6>
            </div>

          ) : (

            <div className="cartao">
              <h6>Cartão de crédito</h6>
              <h6><strong>Final do cartao: </strong>{payment.numberCard.slice(12, 16)}</h6>
              <h6><strong>Nº de parcelas: </strong>{paymentMethod}</h6>
            </div>
          )}
        </div>
      </div>
      <div className="botoes col-12">
        <button
          className="btn btn-primary col-2 mt-3 mr-3"
          onClick={handleBack}
        >
          Voltar
        </button>
        <button
          className="btn btn-primary col-2 mt-3"
          onClick={handleSubmit}
        >
          Finalizar pedido
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        style={{ width: "auto", color: "var(--white-equals)" }}
      />
    </div>
  )
}

export default FinalCheckout;