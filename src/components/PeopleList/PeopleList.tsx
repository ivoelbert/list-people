import React, { useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import { usePeople } from '../../hooks/usePeople';
import { Person } from '../../models/people';
import { PersonItem } from '../PersonItem/PersonItem';
import { useTheme } from '../../hooks/useTheme';
import { DetailsModel } from '../DetailsModal/DetailsModal';
import { useToggledState } from '../../hooks/useToggledState';
import { ListHeader } from '../ListHeader/ListHeader';
import { Loader } from '../Loader/Loader';
import { NetworkError } from './NetworkError';

import './PeopleList.scss';

const PeopleContainer = posed.div({
    enter: {
        y: '0vh',
        opacity: 1,
        transition: { duration: 250 },
    },
    exit: {
        y: '100vh',
        opacity: 0,
        transition: { duration: 250 },
    },
});

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

                {fetching && (
                    <div className={themed('loader-container')}>
                        <Loader />
                    </div>
                )}

                {error && <NetworkError message={error} />}

                <PoseGroup>
                    {people.length > 0 && (
                        <PeopleContainer className='animated-people-container' key="container">
                            {people.map((person: Person) => {
                                return (
                                    <PersonItem
                                        onItemClick={toggleModalWithData}
                                        person={{ ...person }}
                                        key={person.login.uuid}
                                    />
                                );
                            })}
                        </PeopleContainer>
                    )}
                </PoseGroup>
            </div>

            <DetailsModel
                isOpen={isOpen}
                toggleModal={toggleModalWithData}
                selectedPerson={selectedPerson}
            />
        </>
    );
};
