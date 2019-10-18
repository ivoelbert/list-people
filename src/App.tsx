import React from 'react';
import { useTheme } from './hooks/useTheme';
import './App.scss';

const App: React.FC = () => {
    const { themed } = useTheme();
    return (
        <div className={themed('app-container')}>
            FIND PEOPLE!
        </div>
    );
};

export default App;
