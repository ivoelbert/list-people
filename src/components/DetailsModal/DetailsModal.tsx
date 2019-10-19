import React, { useCallback } from 'react';
import { Person } from '../../models/people';
import { useTheme } from '../../hooks/useTheme';
import { useKeyboardEvent } from '../../hooks/useKeyboardEvent';
import posed, { PoseGroup } from 'react-pose';

import './DetailsModal.scss';

const Modal = posed.div({
    enter: {
        x: '0vw',
        transition: { duration: 150 },
    },
    exit: {
        x: '100vw',
        transition: { duration: 150 },
    },
});

const Shade = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 },
});

interface Props {
    selectedPerson: Person | null;
    isOpen: boolean;
    toggleModal: (person: Person | null) => void;
}

export const DetailsModel: React.FC<Props> = props => {
    const { isOpen, toggleModal } = props;

    const { themed } = useTheme();

    const toggleAndClean = () => {
        toggleModal(null);
    };

    // Close modal when we press 'Escape'
    const keyHandler = useCallback(
        (e: KeyboardEvent) => {
            if (isOpen) {
                toggleModal(null);
            }
        },
        [isOpen, toggleModal]
    );
    useKeyboardEvent({ Escape: keyHandler });

    return (
        <PoseGroup animateOnMount={true}>
            {isOpen && [
                <Shade key='backdrop' className={themed('modal-backdrop')} />,

                <Modal key='modal' className={themed('details-modal')}>
                    <p>MODALSITOOO</p>
                    <button onClick={toggleAndClean}>close</button>
                </Modal>,
            ]}
        </PoseGroup>
    );
};
