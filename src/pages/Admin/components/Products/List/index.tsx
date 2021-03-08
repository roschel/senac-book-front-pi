import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss'
import { useHistory } from 'react-router-dom'
import makeRequest from '../../../../../services/api';
import { ProductsResponse } from '../../../../../core/components/types/Product';
import Card from '../Card';
import Pagination from '../../../../../core/components/Pagination';
import ProductFilters, { FilterForm } from '../../../../../core/components/ProductFilters';

const List: React.FC = () => {
    const [productResponse, setProductsResponse] = useState<ProductsResponse>();
    const [activePage, setActivePage] = useState(0);
    
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create')
    }

    const getProducts = useCallback((filter?:FilterForm)=>{
        const params = {
            page: activePage,
            linesPerPage: 10,
            title: filter?.name
        }
        
        makeRequest.get("/products", {params})
        .then(response=>setProductsResponse(response.data))
    }, [activePage])
    
    useEffect(()=>{
        getProducts()
    }, [getProducts])

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <ProductFilters onSearch={filter => getProducts(filter)}/>
            <div>
                {productResponse?.content.map(product=>(
                    <Card product={product}/>
                ))}
            </div>
            {productResponse && (
                <Pagination
                    totalPages={productResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
    )
}

export default List;