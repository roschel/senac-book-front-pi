import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { notify } from '../../../../../core/components/Navbar';
import Pagination from '../../../../../core/components/Pagination';
import Search, { FilterForm } from '../../../../../core/components/Search';
import { ProductsResponse } from '../../../../../core/components/types/Product';
import { makeRequest } from '../../../../../services/api';
import Card from '../Card';
import './styles.scss';


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

    makeRequest({ url: "/products", params })
      .then(response => setProductsResponse(response.data))
  }, [activePage])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const onDisabled = (productId: number) => {
    const confirma = window.confirm("Deseja alterar o status do produto?")
    if (confirma) {
      makeRequest({ url: `/products/${productId}`, method: "delete" })
        .then(response => {
          notify("success", `${response.data}`)
          getProducts()
        })
        .catch(() => {
          notify("error", `Erro ao inativar o produto`)
        })
    }
  }

  return (
    <div className="admin-products-list container-list">
      <div className="d-flex mb-2 justify-content-between">
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
            <Card product={product} onDisabled={onDisabled} buttonTitle={'INATIVAR'} key={product.id} />
          ) : (
            <Card product={product} onDisabled={onDisabled} buttonTitle={'ATIVAR'} key={product.id} />
          )
        ))}
      </div>
      {productResponse && (
        <div className="books-pagination">
          <Pagination
            totalPages={productResponse.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        </div>
      )}
    </div>
  )
}
export default List;