import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss'
import { useHistory } from 'react-router-dom'
import makeRequest from '../../../../../services/api';
import { ProductsResponse } from '../../../../../core/components/types/Product';
import Card from '../Card';
import Pagination from '../../../../../core/components/Pagination';
import { FilterForm } from '../../../../../core/components/Search';
import Search from '../../../../../core/components/Search';


const List: React.FC = () => {
    const [productResponse, setProductsResponse] = useState<ProductsResponse>();
    const [activePage, setActivePage] = useState(0);

    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create')
    }

    const getProducts = useCallback((filter?: FilterForm) => {
        const params = {
            page: activePage,
            linesPerPage: 10,
            title: filter?.name
        }

        makeRequest.get("/products", { params })
            .then(response => setProductsResponse(response.data))
    }, [activePage])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    const onDisabled = (productId: number) => {
        const confirma = window.confirm("Deseja alterar o status do produto?")
        if (confirma) {
            makeRequest.delete(`/products/${productId}`)
                .then(response => {
                    alert(`${response.data}`)
                    getProducts()
                })
                .catch(() => {
                    alert(`Erro ao inativar o produto`)
                })
        }
    }

    return (
        <div className="admin-products-list">
            <div className="d-flex mb-2">
                <Search 
                  onSearch={filter => getProducts(filter)} 
                  placeholder="produto"  
                  request="products"
                />
                <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>

            <div>
                {productResponse?.content.map(product => (
                    product.status === true ? (
                        <Card product={product} onDisabled={onDisabled} buttonTitle={'INATIVAR'} key={product.id}/>
                    ) : (
                        <Card product={product} onDisabled={onDisabled} buttonTitle={'ATIVAR'} key={product.id}/>
                    )
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