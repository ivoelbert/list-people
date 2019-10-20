import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { SearchInput } from '../SearchInput/SearchInput';

import './ListHeader.scss';

interface Props {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const ListHeader: React.FC<Props> = props => {
    const { themed, toggleTheme, theme } = useTheme();

    return (
        <header className={themed('list-header-container')}>
            <div className="title-and-theme">
                <h1 className={themed('list-title')}>People</h1>
                <ToggleButton
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
            </div>
            <p className={themed('list-description')}>
                You can search for someone, no need for a perfect match!
            </p>
            <SearchInput {...props} />
        </header>
    );
};
