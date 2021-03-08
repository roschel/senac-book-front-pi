import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '../../../pages/Admin/components/Products/Card/index';
import { Link } from 'react-router-dom';
import './styles.scss';

const Search = () => {

    

    return (
        <div className="product-search">
            <input className="input-product-search" type="search" placeholder="Digite o Título do Livro"/>
        </div>
    )
}

export default Search;