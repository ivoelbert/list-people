import React from 'react';
import { useTheme } from '../../hooks/useTheme';

import './Loader.scss';

export const Loader: React.FC = () => {
    const { themed } = useTheme();

    return (
        <div className={themed("lds-ring")}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
