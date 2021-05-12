// import { calcularPrecoPrazo, consultarCep, rastrearEncomendas } from 'correios-brasil';

import axios from "axios";

export function teste() {
    // const { calcularPrecoPrazo } = require('correios-brasil');

    axios.get('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&nCdServico=04014&sCepOrigem=04848010&sCepDestino=31230340&nVlPeso=30&nCdFormato=1&nVlComprimento=30&nVlAltura=10&nVlLargura=20&nVlDiametro=35&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml')
    .then(response => console.log('Supimpa, deu certo', response))
    .catch(response => console.log('Bulhufas, deu erro', response))

}