import React, { useEffect, useState } from 'react'
import makeRequest from '../../../services/api'
import {ReactComponent as SearchIcon} from '../../assets/images/search-icon.svg'
import './styles.scss'

export type FilterForm = {
  name?: string;
}

type Props = {
  onSearch: (filter: FilterForm) => void;
}

const UserFilters = ({onSearch}: Props) => {
  const [, setName]= useState('');

  useEffect(() =>{
    makeRequest.get('/users')
  })

  const handleChangeName = (name:string) => {
    setName(name);

    onSearch({name})
  }

  return(
    <div className="card-base user-filters-container">
      <div className="input-search">
        <input 
          type="text"
          className="form-control mr-2"
          placeholder="Pesquisar usuário"
          onChange={e => handleChangeName(e.target.value)}
        />
        <SearchIcon />
      </div>
    </div>
  )
}

export default UserFilters