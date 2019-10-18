import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface Props {}

export const ListHeader: React.FC<Props> = () => {
    const { themed, toggleTheme } = useTheme();

    return (
        <header>
            <h1>People</h1>
            <span>
                <button onClick={toggleTheme}>theme</button>
            </span>
            <p>You can search for someone, no need for a perfect match!</p>
            <input></input>
        </header>
    );
};
