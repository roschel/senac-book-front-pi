import React, { useCallback, useEffect, useState } from 'react'
import Search from '../../../../../../core/components/Search';
import ProductFilters, { FilterForm } from '../../../../../../core/components/Search';
import makeRequest from '../../../../../../services/api';

const List = () => {
  const [productResponse, setProductsResponse] = useState();
  const [activePage, setActivePage] = useState(0);

  const getUsers = useCallback((filter?: FilterForm) => {
    const params = {
      page: activePage,
      linesPerPage: 10,
      title: filter?.name
    }

    makeRequest.get("/users", { params })
      .then(response => setProductsResponse(response.data))
  }, [activePage])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <div>
      <Search 
        onSearch={filter => getUsers(filter)} 
        placeholder="usuário" 
        request="users" 
      />
    </div>
  )
}

export default List;