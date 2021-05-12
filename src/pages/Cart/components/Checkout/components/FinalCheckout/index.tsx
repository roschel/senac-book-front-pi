import { useHistory } from 'react-router'
import './styles.scss'

const FinalCheckout = () => {
    const history = useHistory();

    const handleBack = () => {
        history.push('/cart/checkout')
    }

    return (
        <div className="geral container">
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
                    <div className="info-products col-12">
                        <h6 className="col-3">Testando Nome </h6>
                        <h6 className="col-3"><strong>RS </strong>49,99</h6>
                        <h6 className="col-3">2</h6>
                        <h6 className="col-3"><strong>R$ </strong>98,98</h6>
                    </div>
                    <div className="frete col-12 mt-5">
                        <h6 className="col-6"><strong>frete: R$ </strong>00,00</h6>
                        <h6 className="valorTotal col-6"><strong>Total do pedido: R$ </strong>00,00</h6>
                    </div>
                </div>
                <div className="col-12 mt-2">
                    <div className="card address">
                        <h5 className="cardTitle"><strong>Endereço de entrega</strong></h5>
                        <div className="pular">
                            <h6 className="mr-3"><strong>Rua: </strong></h6>
                            <h6><strong>Nº: </strong></h6>
                        </div>
                        <div className="pular">
                            <h6 className="mr-3"><strong>CEP: </strong></h6>
                            <h6><strong>Bairro: </strong></h6>
                        </div>
                        <div className="pular">
                            <h6 className="mr-3"><strong>Cidade: </strong></h6>
                            <h6><strong>UF: </strong></h6>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-2">
                    <div className="card payment">
                        <h5 className="cardTitle"><strong>Forma de pagamento</strong></h5>
                        <div className="boleto">
                            <h6>Boleto bancário</h6>
                            <h6><strong>Vencimento: </strong></h6>
                        </div>
                        <div className="cartao">
                            <h6>Cartão de crédito</h6>
                            <h6><strong>Final do cartao: </strong>-00</h6>
                            <h6><strong>Nº de parcelas: </strong>X</h6>
                        </div>
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
                >
                    Finalizar pedido
                </button>
            </div>
            
        </div>
    )
}

export default FinalCheckout;