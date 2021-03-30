import React, { useCallback, useEffect, useState } from 'react'
import Search from '../../../../../../core/components/Search';
import ProductFilters, { FilterForm } from '../../../../../../core/components/Search';
import makeRequest from '../../../../../../services/api';

const List = () => {
  const [userResponse, setUserResponse] = useState();
  const [activePage, setActivePage] = useState(0);

  const getUsers = useCallback((filter?: FilterForm) => {
    const params = {
      page: activePage,
      linesPerPage: 10,
      title: filter?.name
    }

    makeRequest.get("/users", { params })
      .then(response => setUserResponse(response.data))
  }, [activePage])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const onDisabled = (userId: number) => {
    const confirmacao = window.confirm("Deseja alterar o status do usuário?")
    if (confirmacao) {
        makeRequest.delete(`/products/${userId}`)
            .then(response => {
                alert(`${response.data}`)
                getUsers()
            })
            .catch(() => {
                alert(`Erro ao inativar o usuário`)
            })
    }
}

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