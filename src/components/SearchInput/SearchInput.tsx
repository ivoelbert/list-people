import React from 'react';
import { useTheme } from '../../hooks/useTheme';

import './SearchInput.scss';

interface ClearProps {
    onClick: () => void;
}
const ClearButton: React.FC<ClearProps> = (props) => {
    const { onClick } = props;
    const { themed } = useTheme();

    return (
        <button className='clear-button' onClick={onClick}>
            <svg
                className={themed('clear-icon')}
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
            >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
        </button>
    );
};

interface Props {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchInput: React.FC<Props> = (props) => {
    const { searchTerm, setSearchTerm } = props;
    const { themed } = useTheme();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setSearchTerm(value);
    };

    const clearQuery = (): void => {
        setSearchTerm('');
    }

    return (
        <div className={themed('search-input-container')}>
            <input
                placeholder="Search by name or surname"
                value={searchTerm}
                onChange={onChange}
                className={themed('search-input')}
            />
            {searchTerm.length > 0 && <ClearButton onClick={clearQuery} />}
        </div>
    );
};
