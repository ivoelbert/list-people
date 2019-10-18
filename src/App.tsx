import React from 'react';
import { PeopleList } from './components/PeopleList/PeopleList';
import { useTheme } from './hooks/useTheme';
import './App.scss';

const App: React.FC = () => {
    const { themed } = useTheme();

    return (
        <div className={themed('app-container')}>
            <PeopleList />
        </div>
    );
};

export default App;
