import React, { useCallback, useState } from 'react';
import './styles.scss'
import { useHistory } from 'react-router-dom'
import makeRequest from '../../../../../services/api';

const List = () => {
    const [productResponse, setProductsResponse] = useState(0);
    const [activePage, setActivePage] = useState(0);
    
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create')
    }

    const getProducts = useCallback(()=>{
        const params = {
            page: activePage,
            linesPerPage: 5
        }
        
        makeRequest.get("/products", {params})
        .then(response=>setProductsResponse(response.data))
    }, [activePage])
    
    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div>
                
            </div>
        </div>
    )
}

export default List;