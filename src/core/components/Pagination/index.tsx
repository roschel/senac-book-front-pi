import React from 'react';
import { ReactComponent as ArrowIcon } from '../../assets/images/arrow.svg'
import './styles.scss'

import ReactPaginate from 'react-paginate';


type Props = {
    totalPages: number;
    activePage: number;
    onChange: (item: number) => void;
}

const Pagination = ({ totalPages, activePage, onChange }: Props) => {
    
    const renderIcon = (type: 'previous' | 'next') => (
        <ArrowIcon
            className={`pagination-${type}`}
        />
    )

    return (
        <div className="pagination-container">

            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={selectItem => onChange(selectItem.selected)}
                containerClassName="pagination"
                previousLabel={renderIcon("previous")}
                nextLabel={renderIcon("next")}
                pageLinkClassName="pagination-item"
                breakClassName="pagination-item"
                activeLinkClassName="active"
                previousClassName={`page-active`}
                nextClassName={`page-active`}
                disabledClassName="page-inactive"
            />
        </div>
    );
}

export default Pagination;