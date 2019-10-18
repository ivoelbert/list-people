import React from 'react';
import { Person } from '../models/people';
import { useTheme } from '../hooks/useTheme';

import './DetailsModel.scss';

interface Props {
    selectedPerson: Person | null;
    isOpen: boolean;
    toggleModal: (person: Person | null) => void;
}

export const DetailsModel: React.FC<Props> = props => {
    const { isOpen, toggleModal } = props;

    const { themed } = useTheme();

    const mainClass: string = `details-modal ${isOpen ? 'open' : 'closed'}`;

    const toggleAndClean = () => {
        toggleModal(null);
    }

    return (
        <>
            {isOpen && <div className={themed('modal-backdrop')}></div>}

            <div className={themed(mainClass)}>
                <p>MODALSITOOO</p>
                <button onClick={toggleAndClean}>close</button>
            </div>
        </>
    );
};
