import './style.scss'

import { DadosProduto } from '../CadastrarProduto/components/DadosProduto/index'

export default function CadastrarProduto() {
  return (
    <div className="container">
        <title>Senac Books</title>

      <h1>Cadastrar Produto</h1>

      <form action="">
        <DadosProduto />
        <br />
        <button className="btnCancelar">Cancelar</button>
        <button className="btnCadastrar">Cadastrar Produto</button>
      </form>
      <br />
    </div>
  )
}
