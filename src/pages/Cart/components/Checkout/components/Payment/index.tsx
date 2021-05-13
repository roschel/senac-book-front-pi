import { useEffect, useState } from 'react';
import creditCard from '../../../../../../core/assets/images/creditCard.svg'
import codeBar from '../../../../../../core/assets/images/codeBar.svg'

import { Address, Client } from '../../../../../../core/components/types/Client';
import './styles.scss'
import { getCartData, ProductsCart, saveCartData } from '../../../../../../core/components/utils/cart';
import { makePrivateRequest } from '../../../../../../services/api';
import { useHistory } from 'react-router';
import { Product } from '../../../../../../core/components/types/Product';
import { saveSessionData } from '../../../../../../core/components/utils/auth';

type Props = {
  address: Address
}

const Payment = ({ address }: Props) => {
  const [boleto, setBoleto] = useState(false);
  const [cartao, setCartao] = useState(false);
  const [customer, setCustomer] = useState<Client>()
  const [numberCard, setNumberCard] = useState<string>();
  const [cvv, setCvv] = useState<number>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const [plots, setPlots] = useState('');
  const [value, setValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  // const [shipping, setShipping] = useState<number>();
  const [client, setClient] = useState<number>();

  const history = useHistory();

  useEffect(() => {
    const data = getCartData();
    setClient(data.customerId)
    // setShipping(10)

    let sum = 0;

    data.products.forEach(product => {
      sum += product.sellQuantity * product.product.price
    })

    setValue(sum)

    if (true) {
      setTotalValue(sum + (data.shipping ?? 0))
    }


    makePrivateRequest({ url: `/clients/${data.customerId}` })
      .then(response => {
        console.log(response)
        setCustomer(response.data)
      })
  }, [])

  const handleCvv = (cvv: string) => {
    setCvv(parseInt(cvv))
  }

  const handleNumberCard = (numberCard: string) => {
    setNumberCard(numberCard)
  }

  const handleExpiration = (expirationDate: string) => {
    console.log(expirationDate)
    setExpirationDate(expirationDate)
  }

  const handleBoleto = () => {
    setBoleto(true);
    setCartao(false);
  }

  const handleCartao = () => {
    setBoleto(false);
    setCartao(true);
  }

  const handleSelect = (event: string) => {
    setPlots(event)
  }

  const handleSubmit = () => {
    console.log('boleto', boleto, 'cartao', cartao)
    if (!boleto && !cartao) {
      alert("selecione um método de pagamento")
      return
    }

    if (cartao) {
      if (plots === "-1" || plots === '') {
        alert("Selecione uma opção de pagamento")
        return
      }

      if (expirationDate === '') {
        alert("Selecione uma data de vencimento")
        return
      }

      if (!cvv) {
        alert("Selecione um codigo de segurança")
        return
      }
    }
    const cartData = getCartData()

    console.log(cartData);
    

    cartData["value"] = value
    // cartData["shipping"] = shipping
    cartData["totalValue"] = totalValue
    cartData["paymentMethod"] = plots


    if (cartao) {
      const payLoad = {
        numberCard,
        validThru: expirationDate,
        cvv,
        status: true,
        client: {
          id: client
        }
      }
      console.log('payload', payLoad)

      makePrivateRequest({ url: `/payment`, data: payLoad, method: 'POST' })
        .then(response => {
          console.log(response)
          cartData["payment"] = response.data.id
        })
        .finally(() => {
          saveCartData(cartData)
        }
        )
      console.log('cartdata', cartData)
    } else {
      saveCartData(cartData)
    }


    history.push('/finalCheckout')
  }

  return (
    <div>
      <h4 className="titulo">Escolha a forma de pagamento</h4>
      <div className="botao">
        <button
          onClick={handleBoleto}
          className="btn btn-outline-primary mr-2"
        >
          <img className="img-codeBar mr-2" src={codeBar} alt="" />
                    BOLETO
                </button>
        <button
          onClick={handleCartao}
          className="btn btn-outline-primary"
        >
          <img className="img-creditCard mr-2" src={creditCard} alt="" />
                    CARTÃO DE CRÉDITO
                </button>
      </div>
      <div className="opcoes">
        {boleto ?
          <div className="boleto mt-3">
            <h4>Dados do boleto</h4>
            <div className="dividir">
              <h6 className="firstName">{customer?.firstName}</h6>
              <h6>{customer?.lastName}</h6>
            </div>
            <h6>{customer?.cpf}</h6>
            <h6 className="addressBoleto mt-2 mb-2"><strong>Endereço de entrega</strong></h6>
            <div className="dividir">
              <h6 className="rua mr-3"><strong>Rua: </strong>{address?.address}</h6>
              <h6><strong>Nº: </strong>{address?.number}</h6>
            </div>
            <div className="dividir">
              <h6 className="cep mr-3"><strong>CEP: </strong>{address?.zipCode}</h6>
              <h6><strong>Bairro: </strong>{address?.neighborhood}</h6>
            </div>
            <div className="dividir">
              <h6 className="cidade mr-3"><strong>Cidade: </strong>{address?.city}</h6>
              <h6><strong>UF: </strong>{address?.state}</h6>
            </div>
            <button
              className="save btn btn-primary mt-4"
              onClick={handleSubmit}
            >
              Salvar e finalizar compra
                        </button>
          </div> :
          <div className="cartao">
            <input
              className="numCartao form-control mt-3"
              type="text"
              placeholder="Número do cartão"
              onBlur={e => handleNumberCard(e.target.value)}
            />
            <div className="dividir">
              <input
                className="codVer form-control mt-2"
                type="number"
                placeholder="CVV"
                onBlur={e => handleCvv(e.target.value)}
              />
              <input
                className="dataVencimento form-control mt-2"
                type="month"
                onBlur={e => handleExpiration(e.target.value)}
              />
            </div>
            <select
              className="parcelas form-control mt-2"
              placeholder="parcelas"
              onChange={e => handleSelect(e.target.value)}
            >
              <option value="-1">Selecione uma opção</option>
              <option value="1">1 x sem juros - R$ {value.toFixed(2).replace(".", ",")}</option>
              <option value="2">2 x sem juros - R$ {(value / 2).toFixed(2).replace(".", ",")}</option>
              <option value="3">3 x sem juros - R$ {(value / 3).toFixed(2).replace(".", ",")}</option>
            </select>
            <button
              className="save btn btn-primary mt-4"
              onClick={handleSubmit}
            >
              Salvar e finalizar compra
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Payment;