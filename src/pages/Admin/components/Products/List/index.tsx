import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss'
import { useHistory } from 'react-router-dom'
import { makeRequest } from '../../../../../services/api';
import { ProductsResponse } from '../../../../../core/components/types/Product';
import Card from '../Card';
import Pagination from '../../../../../core/components/Pagination';
import { FilterForm } from '../../../../../core/components/Search';
import Search from '../../../../../core/components/Search';
import { Flip, toast, ToastContainer } from 'react-toastify';


const List: React.FC = () => {
  const [productResponse, setProductsResponse] = useState<ProductsResponse>();
  const [activePage, setActivePage] = useState(0);

  const history = useHistory();

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  };

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
          notifySuccess(`${response.data}`)
          getProducts()
        })
        .catch(() => {
          notifyError(`Erro ao inativar o produto`)
        })
    }
  }

  return (
    <div className="admin-products-list">
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
        <Pagination
          totalPages={productResponse.totalPages}
          activePage={activePage}
          onChange={page => setActivePage(page)}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        style={{ width: "auto", color: "var(--white-equals)" }}
      />
    </div>
  )
}
export default List;