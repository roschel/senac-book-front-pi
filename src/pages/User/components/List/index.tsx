import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss'
import { useHistory } from 'react-router-dom'
import makeRequest from '../../../../services/api';
import { UsersResponse } from '../../../../core/components/types/User';
import Card from '../../../Admin/components/Products/Card';
import Pagination from '../../../../core/components/Pagination';
import UserFilters, { FilterForm } from '../../../../core/components/UserFilters';


const List: React.FC = () => {
    const [productResponse, setProductsResponse] = useState<UsersResponse>();
    const [activePage, setActivePage] = useState(0);

    const history = useHistory();

    const handleCreate = () => {
        history.push('/user/create')
    }

    const getProducts = useCallback((filter?: FilterForm) => {
        const params = {
            page: activePage,
            linesPerPage: 10,
            title: filter?.name
        }

        makeRequest.get("/users", { params })
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
                <ProductFilters onSearch={filter => getProducts(filter)} />
                <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>

            <div>
                {productResponse?.content.map(product => (
                    product.status === true ? (
                        <Card product={product} onDisabled={onDisabled} buttonTitle={'INATIVAR'} />
                    ) : (
                        <Card product={product} onDisabled={onDisabled} buttonTitle={'ATIVAR'} />
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