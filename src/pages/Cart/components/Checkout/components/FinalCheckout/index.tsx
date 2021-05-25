import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Orders } from '../../../../../../core/components/types/Orders';
import { CartSession, getCartData, Payment } from '../../../../../../core/components/utils/cart';
import { makePrivateRequest } from '../../../../../../services/api';
import './styles.scss';

const FinalCheckout = () => {
  const [cart, setCart] = useState<CartSession>();
  const [payment, setPayment] = useState<Payment | null>();
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [order, setOrder] = useState<Orders>();
  const history = useHistory();

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
    }

    makePrivateRequest({ url: `/orders`, data: orderPost, method: 'POST' })
      .then(response => {
        // setOrder(response.data)
        data.products.map(product => {
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
        alert("Compra finalizada com sucesso! Seu número de pedido é: " + response.data.id)
        localStorage.removeItem('cartData')
      })
      .catch(response => {
        alert("Ops, algo está errado... tente novamente mais tarde!")
        console.log(response)
      })
  }

  return (
    <div className="geral">
      <div>
        <h4>Finalizar pedido</h4>
      </div>
      <div className="row">
        <div className="card productCard">
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
        <div className="col-12 mt-2">
          <div className="card address">
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
        </div>
        <div className="col-12 mt-2">
          <div className="card payment">
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

    </div>
  )
}

export default FinalCheckout;