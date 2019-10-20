import React, { useState } from 'react';
import posed from 'react-pose';
import { usePeople } from '../../hooks/usePeople';
import { Person } from '../../models/people';
import { PersonItem } from '../PersonItem/PersonItem';
import { useTheme } from '../../hooks/useTheme';
import { DetailsModel } from '../DetailsModal/DetailsModal';
import { useToggledState } from '../../hooks/useToggledState';
import { ListHeader } from '../ListHeader/ListHeader';
import { Loader } from '../Loader/Loader';
import { NetworkError } from './NetworkError';
import { useFuzzySearch } from '../../hooks/useFuzzySearch';

import './PeopleList.scss';

const PeopleContainer = posed.div({
    visible: {
        y: '0px',
        opacity: 1,
        transition: { duration: 200 },
    },
    hidden: {
        y: '100px',
        opacity: 0,
        transition: { duration: 200 },
    },
});

export const PeopleList: React.FC<{}> = props => {
    const { people, fetching, error } = usePeople();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const filteredPeople = useFuzzySearch(people, searchTerm);

    const { themed } = useTheme();

    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [isOpen, toggleModal] = useToggledState(false);
    const toggleModalWithData = (person: Person) => {
        setSelectedPerson(person);
        toggleModal();
    };

    return (
        <>
            <div className={themed('people-list-container')}>
                <ListHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {fetching && (
                    <div className={themed('loader-container')}>
                        <Loader />
                    </div>
                )}

                {error && <NetworkError message={error} />}

                <PeopleContainer
                    pose={filteredPeople.length > 0 ? 'visible' : 'hidden'}
                    className="animated-people-container"
                >
                    {filteredPeople.map((person: Person) => {
                        return (
                            <PersonItem
                                onItemClick={toggleModalWithData}
                                person={{ ...person }}
                                key={person.login.uuid}
                            />
                        );
                    })}
                </PeopleContainer>
            </div>

            {!!selectedPerson && (
                <DetailsModel
                    isOpen={isOpen}
                    toggleModal={toggleModal}
                    selectedPerson={selectedPerson}
                />
            )}
        </>
    );
};
