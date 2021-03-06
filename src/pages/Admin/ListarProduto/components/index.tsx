// import { AiOutlineSearch } from 'react-icons/ai';
import './../components/style.scss';
import Table from './Table';
import React from 'react';
// import {FiChevronRight, FiChevronsRight, FiChevronLeft, FiChevronsLeft} from 'react-icons/fi';


export function ListProduct() {
    let data = [
        {
            titulo: 'Aaaaaaa', Editora: 'bbbbbbb', Autor: 'ccccccc', categoria: 'ddddddd', QtdEtq: 'eeeeeee',
            Status: 'fffffff', Preço: 'ggggggg', 
            Editar: 'hhhhhhh', InativarReativar: 'iiiiiii', Visualizar:'jjjjjjj'
        }
    ];

    return (

        <article className="container">

            <input className="titulo" type="text" placeholder="Título" />
            <button type="submit">
                {/* <AiOutlineSearch className="search" /> */}
                </button>
            <br />

            <select className="categoria" name="categoria" id="cat">
                <option value="Policial">Policial</option>
                <option value="Romance">Romance</option>
                <option value="Terror">Terror</option>
                <option value="Ficcao">Ficção</option>
                <option value="Culinaria">Culinária</option>
            </select>
            <br />
            <input className="editora" type="text" placeholder="Editora" />
            <br />

            
            <button className="button">
                <a href="cadastrarProduto">Cadastrar Produto</a>
            </button>
            
            <br/>
            <Table data={data} />
            <div className="buttonsLabel">
            <button className="buttonsLeft" type={'submit'}>
                {/* <FiChevronsLeft></FiChevronsLeft> */}
                </button>
            <button className="buttonLeft" type={'submit'}>
                {/* <FiChevronLeft></FiChevronLeft> */}
                </button>
            <label className="labelPags">1</label>
            <button className="buttonsRight" type={'submit'}>
                {/* <FiChevronRight></FiChevronRight> */}
                </button>
            <button className="buttonRight" type={'submit'}>
                {/* <FiChevronsRight></FiChevronsRight> */}
                </button>
            </div>

            
        </article>


    );
}