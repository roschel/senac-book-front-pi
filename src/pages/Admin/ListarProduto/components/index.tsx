import { AiOutlineSearch } from 'react-icons/ai';
import './../components/style.scss';
import React from 'react';
import DataTable from 'react-data-table-component';
import { colunas, listagemProduto, paginationOptions } from './Table';

export function ListProduct() {
     return (

        <article className="container">

            <input className="titulo" type="text" placeholder="Título" />
            <button type="submit">
                <AiOutlineSearch className="search" />
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

            <br />
            <DataTable
                columns={colunas}
                data={listagemProduto}
                title="teste"
                pagination
                paginationComponentOptions={paginationOptions}
                fixedHeader
            />
        </article>


    );
}