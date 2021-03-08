import './style.scss'

import { CaixaVisual } from '../VisualizarProduto/components/CaixaVisual/index'
import { CaixaCompra } from '../VisualizarProduto/components/CaixaCompra/index'

export default function VisualizarProduto() {
    return (
        <div className="container">
                <title>Senac Books</title>

            <h1>Visualizar Produto</h1>

            <section className="teste">
                <section className="teste2">
                    <CaixaVisual />
                </section>
                <CaixaCompra />
            </section>
            <br />
        </div>
    );
}