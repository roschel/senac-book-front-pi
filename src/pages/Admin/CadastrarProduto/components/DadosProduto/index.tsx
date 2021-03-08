import './style.scss'

import { ImagensProduto } from '../ImagensProduto/index'

export function DadosProduto() {
    return (
        <article className="container">
            <section className="ladoEsquerdo">
                <input className="titulo" type="text" placeholder="Título" />
                <input className="autor" type="text" placeholder="Autor" />
                <input className="editora" type="text" placeholder="Editora" />
                <select className="categoria" name="categoria" id="cat">
                    <option value="Policial">Policial</option>
                    <option value="Romance">Romance</option>
                    <option value="Terror">Terror</option>
                    <option value="Ficcao">Ficção</option>
                    <option value="Culinaria">Culinária</option>
                </select>
                <input className="qtdPag" type="number" placeholder="Qtd Páginas" />
                <input className="edicao" type="text" placeholder="Edição" />
                <select className="qtdEstrelas" name="estrelas" id="cat">
                    <option value="1">1 estrela</option>
                    <option value="2">2 estrelas</option>
                    <option value="3">3 estrelas</option>
                    <option value="4">4 estrelas</option>
                    <option value="5">5 estrelas</option>
                </select>
                <input className="ano" type="number" placeholder="Ano" />
                <input className="dimensao" type="text" placeholder="Dimensões do Produto" />
                <select className="status" name="status" id="status">
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                </select>
                <input className="qtdEstoque" type="number" placeholder="Qtd Estoque" />
                <input className="preco" type="number" placeholder="Preço" />
                <br />
            </section>
            <section className="ladoDireito">
                <textarea className="descricao" name="descricao" id="descricao" placeholder="Descrição do produto" />
                <ImagensProduto />
            </section>
        </article>
    );
}