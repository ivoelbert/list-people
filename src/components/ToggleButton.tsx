import React from 'react';

import './ToggleButton.scss';

interface Props {
    checked: boolean;
    onChange: () => void;
}

export const ToggleButton: React.FC<Props> = props => {
    const { checked, onChange } = props;

    return (
        <label className="switch">
            <input checked={checked} onChange={onChange} type="checkbox" />
            <span className="slider round">
                <svg
                    className="theme-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15px"
                    height="15px"
                    viewBox="0 0 24 24"
                >
                    <path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z" />
                </svg>

                <div className='icon-background'/>
            </span>
        </label>
    );
};
