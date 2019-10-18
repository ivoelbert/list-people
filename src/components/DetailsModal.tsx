import React, { useCallback } from 'react';
import { Person } from '../models/people';
import { useTheme } from '../hooks/useTheme';

import './DetailsModal.scss';
import { useKeyboardEvent } from '../hooks/useKeyboardEvent';

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
    };

    // Close modal when we press 'Escape'
    const keyHandler = useCallback(
        (e: KeyboardEvent) => {
            if (isOpen) {
                toggleAndClean();
            }
        },
        [isOpen, toggleModal]
    );
    useKeyboardEvent({ Escape: keyHandler });

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
