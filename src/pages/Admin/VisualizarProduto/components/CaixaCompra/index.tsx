import './style.scss'

// import { AiFillStar } from 'react-icons/ai'
// import { AiFillPicture } from 'react-icons/ai'
// import { AiOutlinePlus } from 'react-icons/ai'
// import { FiMinus } from 'react-icons/fi'

export function CaixaCompra() {
    return (
        <article className="container">
            <strong>Título</strong>
            <p>Qtd Estrelas</p>
            <strong>Estrelas</strong>
            <div className="boxInfo">
                <div className="boxImg">
                    {/* <AiFillPicture className={styles.imagem} /> */}
                </div>
                <div className="boxInfoText">
                    <label>Autor: </label>
                    <label>Edição: </label>
                    <label>Ano: </label>
                    <label>Editora: </label>
                    <label>Qtd. Pág: </label>
                    <label>Dimensão:  x  x  cm</label>
                </div>
            </div>
            <div className="qtdPreco">
                <label className="qtdLab">Qtd. disponível: </label>
                <label className="precoLab">Preço: </label>
            </div>
            <div className="qtdCompra">
                <button>
                    {/* <FiMinus className="imgMenos" /> */}
                    </button>
                <label className="qtdNum">1</label>
                <button>
                    {/* <AiOutlinePlus className={styles.imgMais} /> */}
                    </button>
            </div>
            <button className="comprar">Comprar</button>
        </article>
    );
}