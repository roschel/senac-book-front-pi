import React from 'react';
import { ReactComponent as ArrowIcon } from '../../assets/images/arrow.svg'
import './styles.scss'
import { generateList } from '../utils/list';
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";



type Props = {
    totalPages: number;
    activePage: number;
    onChange: (item: number) => void;
}

const Pagination = ({ totalPages, activePage, onChange }: Props) => {
    const items = generateList(totalPages);
    const previousClass = totalPages > 0 && activePage > 0 ? 'page-active' : 'page-inactive'
    const nextClass = (activePage+1) < totalPages ? 'page-active' : 'page-inactive'

    return (
        <div className="pagination-container">
            <FiChevronsLeft
                className={`pagination-initial ${previousClass}`}
                onClick={() => onChange(0)}
                size={40}
            />
            <ArrowIcon
                className={`pagination-previous ${previousClass}`}
                onClick={() => onChange(activePage - 1)}
            />
            {items.map(item => (
                <div
                    className={`pagination-item ${item === activePage ? 'active' : ''}`}
                    key={item}
                    onClick={() => onChange(item)}
                >
                    {item + 1}
                </div>
            ))}

            <ArrowIcon
                className={`pagination-next ${nextClass}`}
                onClick={() => onChange(activePage + 1)}
            />
            <FiChevronsRight
                className={`pagination-next ${nextClass}`}
                onClick={() => onChange(totalPages - 1)}
                size={40}
            />
        </div>
    );
}

export default Pagination;