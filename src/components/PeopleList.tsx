import React, { useState } from 'react';
import { usePeople } from '../hooks/usePeople';
import { Person } from '../models/people';
import { PersonItem } from './PersonItem';
import { useTheme } from '../hooks/useTheme';
import { DetailsModel } from './DetailsModel';
import { useToggledState } from '../hooks/useToggledState';
import { ListHeader } from './ListHeader';

import './PeopleList.scss';

export const PeopleList: React.FC<{}> = props => {
    const { people, fetching, error } = usePeople();
    const { themed } = useTheme();

    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [isOpen, toggleModal] = useToggledState(false);
    const toggleModalWithData = (person: Person | null) => {
        setSelectedPerson(person);
        toggleModal();
    }

    return (
        <>
            <div className={themed('people-list-container')}>
                <ListHeader />
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
