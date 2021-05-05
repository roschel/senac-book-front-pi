import { useState } from "react"
import lixeira from '../../../../../src/core/assets/images/lixeira.svg'
import './styles.scss'

const ProductCard = () => {
    const [counter, setCounter] = useState(1);

    const onAdd = () => {
        setCounter(counter + 1);
    }

    const onDecrement = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    }

    const removeProduct = () => {
        console.log('remover')
    }

    return (
        <div className="card card-geral">
            <div className="card-body">
                <div className="geral row">
                    <div className="card card-image">
                        <img src="http://books.google.com/books/content?id=Red7DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" alt="imagem" />
                    </div>
                    
                    <div className="col-8 teste">
                        <div className="titulos">
                            <h6 className="titulo-produto"><strong>produto</strong></h6>
                            <h6 className="titulo-qtd"><strong>qtd.</strong></h6>
                            <h6 className="titulo-preco"><strong>preço</strong></h6>
                        </div>

                        <div className="row infos mt-3">
                            <label className="nomeLivro col-4">Admnistração Geral e Profissional</label>

                            <div className="quantidade col-1">
                                <button
                                    className="decrementar btn btn-primary"
                                    onClick={onDecrement}
                                >
                                    -
                                </button>
                                <h5 className="qtd">{counter}</h5>
                                <button
                                    className="incrementar btn btn-primary"
                                    onClick={onAdd}
                                >
                                    +
                                </button>
                            </div>

                            <div className="preco col-4">
                                <label><strong>R$ 49,99</strong></label>
                                <button 
                                    className="remove btn btn-danger"
                                    onClick={removeProduct}>
                                        <img src={lixeira} alt="remover"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;