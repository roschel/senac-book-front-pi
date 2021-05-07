import axios from 'axios'
import { useEffect } from 'react'
import { makeRequest } from '../../../../services/api'

import { calcularPrecoPrazo } from 'correios-brasil';
import './styles.scss'

const OrderSummary = () => {
    // useEffect(() => {
    //     let args = {
    //     // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
    //     sCepOrigem: '05588001',
    //     sCepDestino: '30380472',
    //     nVlPeso: '1',
    //     nCdFormato: '1',
    //     nVlComprimento: '20',
    //     nVlAltura: '20',
    //     nVlLargura: '20',
    //     nCdServico: ['04014', '04510'], //Array com os códigos de serviço
    //     nVlDiametro: '0',
    //     };

    //     console.log('fazendo requisição')
    //     calcularPrecoPrazo(args).then((response) => {
    //         console.log(response)
    //     })
    // }, [])

    const url = () => {
        console.log('fazendo requisição')
        axios.defaults.baseURL = 'https://ws.correios.com.br';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
        axios.get("/calculador/CalcPrecoPrazo.aspx?nCdServico=04014&sCepOrigem=04848010&sCepDestino=31230340&nVlPeso=1&nCdFormato=1&nVlComprimento=30&nVlAltura=10&nVlLargura=20&nVlDiametro=35&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml")
            .then(response => {
                console.log(response)
            })
            .catch(response => {
                console.log(response)
            })
    }

    useEffect(() => {
        url()
    }, [])

    return (
        <div className="card container">
            <h5><strong>resumo do pedido</strong></h5>
            <div className="card-body row">
                <h6 className="col-6">1 produto</h6>
                <h6 className="col-6 valor">R$ 49,99</h6>
                <h6 className="col-6"><em>frete</em></h6>
                <h6 className="col-6 valor">R$ 12,99</h6>

                <div className="linha col-12"></div>
                <h5 className="col-6"><strong>total</strong></h5>
                <h5 className="col-6 valor"><strong>R$ 62,98</strong></h5>
            </div>
            <button className="btn btn-primary mb-3">Finalizar pedido</button>
            <div className="frete card col 12 mb-2">
                <h6 className="calcular"><strong>Calcular frete</strong></h6>
                <input 
                    className='mb-2'
                    type="text"                
                    placeholder="ex: 12345-678"
                />
                <button className="btn btn-outline-primary mb-2">Calcular</button>
            </div>
        </div>
    )
}

export default OrderSummary;