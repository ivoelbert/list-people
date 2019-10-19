import React, { useState } from 'react';
import { usePeople } from '../../hooks/usePeople';
import { Person } from '../../models/people';
import { PersonItem } from '../PersonItem/PersonItem';
import { useTheme } from '../../hooks/useTheme';
import { DetailsModel } from '../DetailsModal/DetailsModal';
import { useToggledState } from '../../hooks/useToggledState';
import { ListHeader } from '../ListHeader/ListHeader';

import './PeopleList.scss';

interface ErrorProps {
    message: string;
}

const NetworkErrorComponent: React.FC<ErrorProps> = props => {
    const { message } = props;
    const { themed } = useTheme();

    return (
        <div className={themed('error-message-container')}>
            <svg
                className={themed('error-message-icon')}
                xmlns="http://www.w3.org/2000/svg"
                width="128px"
                height="128px"
                viewBox="0 0 24 24"
            >
                <path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4c-1.29-1.29-2.84-2.13-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24C7.81 10.89 6.27 11.73 5 13v.01L6.99 15c1.36-1.36 3.14-2.04 4.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z" />
            </svg>

            <h2 className={themed('error-title')}>Oh no!</h2>
            <p className={themed('error-message')}>
                Could not get people information.
            </p>
            <p className={themed('error-message')}>{message}</p>
        </div>
    );
};

export const PeopleList: React.FC<{}> = props => {
    const { people, fetching, error } = usePeople();
    const { themed } = useTheme();

    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [isOpen, toggleModal] = useToggledState(false);
    const toggleModalWithData = (person: Person | null) => {
        setSelectedPerson(person);
        toggleModal();
    };

    return (
        <>
            <div className={themed('people-list-container')}>
                <ListHeader />
                {error && <NetworkErrorComponent message={error} />}
                {people.map((person: Person) => {
                    return (
                        <PersonItem
                            onItemClick={toggleModalWithData}
                            person={{ ...person }}
                            key={person.login.uuid}
                        />
                    );
                })}
            </div>

            <DetailsModel
                isOpen={isOpen}
                toggleModal={toggleModalWithData}
                selectedPerson={selectedPerson}
            />
        </>
    );
};
