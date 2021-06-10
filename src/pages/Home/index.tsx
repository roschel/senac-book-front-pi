import { CircularProgress, LinearProgress } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import Pagination from '../../core/components/Pagination';
import Search, { FilterForm } from '../../core/components/Search';
import { ProductsResponse } from '../../core/components/types/Product';
import { makeRequest } from '../../services/api';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import './styles.scss';

const Home: React.FC = () => {
  const [productsResponse, setProductResponse] = useState<ProductsResponse>();
  const [activePage, setActivePage] = useState(0);
  const [productId, setProductId] = useState('');
  const [showModal, setShowModal] = useState(false);

  const getProducts = useCallback((filter?: FilterForm) => {
    const params = {
      page: activePage,
      title: filter?.name
    }

    makeRequest({ url: "/products", params })
      .then(response => setProductResponse(response.data))
      .catch(error => {
        setTimeout(() => {
          getProducts()
        }, 5 * 1000);
      })
  }, [activePage])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  function showProductDetails(productId: number) {
    setProductId(productId.toString());
    setShowModal(true);
  }

  return (
    <>
      <div className="home-container">
        <div className="search">
          <Search
            onSearch={filter => getProducts(filter)}
            placeholder="produto"
            request="products"
          />
        </div>
        <div className="books-container">
          <div className="books-catalog">
            {productsResponse ? productsResponse.content.map(book => (
              <span onClick={() => showProductDetails(book.id)}>
                <ProductCard product={book} key={book.id} />
              </span>
            )) : (
              <div className="loading">
                <h2>
                  <em>Carregando Produtos...</em>
                </h2>
                <CircularProgress />
              </div>
            )}
          </div>
          {productsResponse && productsResponse.totalPages > 0 && (
            <div className="books-pagination">
              <Pagination
                totalPages={productsResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
              />
            </div>
          )}
        </div>
      </div>
      <ProductDetails productId={productId} showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default Home