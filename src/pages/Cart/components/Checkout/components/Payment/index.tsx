import { useEffect, useState } from 'react';
import creditCard from '../../../../../../core/assets/images/creditCard.svg'
import codeBar from '../../../../../../core/assets/images/codeBar.svg'

import { Address, Client } from '../../../../../../core/components/types/Client';
import './styles.scss'
import { getCartData } from '../../../../../../core/components/utils/cart';
import { makePrivateRequest } from '../../../../../../services/api';
import { useHistory } from 'react-router';

type Props = {
    address: Address 
}

const Payment = ({address}: Props) => {
    const [boleto, setBoleto] = useState(false);
    const [cartao, setCartao] = useState(true);
    const [customer, setCustomer] = useState<Client>()
    const history = useHistory();
    
    useEffect(() => {
        const data = getCartData(); 
        console.log(data)

        makePrivateRequest({ url: `/clients/${data.customerId}` })
            .then(response => {
            console.log(response)
            setCustomer(response.data)
      })
    }, [])

    const handleBoleto = () => {
        setBoleto(true);
        setCartao(false);
    }

    const handleCartao = () => {
        setBoleto(false);
        setCartao(true);
    }

    const handleSubmit = () => {
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
                    <img className="img-codeBar mr-2" src={codeBar} alt=""/>
                    BOLETO
                </button>
                <button
                    onClick={handleCartao}
                    className="btn btn-outline-primary"
                >
                    <img className="img-creditCard mr-2" src={creditCard} alt=""/>
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
                        />
                        <div className="dividir">
                            <input
                                className="codVer form-control mt-2"
                                type="text"
                                placeholder="CVV"
                            />
                            <input
                                className="dataVencimento form-control mt-2"
                                type="date"
                            />
                        </div>
                        <select 
                            className="parcelas form-control mt-2" 
                            placeholder="parcelas"
                        >
                            <option value="1">1 x sem juros</option>
                            <option value="2">2 x sem juros</option>
                            <option value="3">3 x sem juros</option>
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