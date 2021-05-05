import './styles.scss'

const OrderSummary = () => {
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