import React from 'react';
import { useTheme } from '../hooks/useTheme';

import './ListHeader.scss';
import { ToggleButton } from './ToggleButton';

interface Props {}

export const ListHeader: React.FC<Props> = () => {
    const { themed, toggleTheme, theme } = useTheme();

    return (
        <header className={themed('list-header-container')}>
            <div className='title-and-theme'>
                <h1 className={themed('list-title')}>People</h1>
                <ToggleButton checked={theme === 'dark'} onChange={toggleTheme} />
            </div>
            <p className={themed('list-description')}>
                You can search for someone, no need for a perfect match!
            </p>
        </header>
    );
};
