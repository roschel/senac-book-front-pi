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
            {productsResponse?.content.map(book => (
              <span onClick={() => showProductDetails(book.id)}>
                <ProductCard product={book} key={book.id} />
              </span>
            ))}
          </div>
          {productsResponse && (
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