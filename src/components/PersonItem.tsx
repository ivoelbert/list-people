import React from 'react';
import { Person } from '../models/people';
import { useTheme } from '../hooks/useTheme';

import './PersonItem.scss';

interface Props {
    person: Person;
    onItemClick: (person: Person) => void;
}

export const PersonItem: React.FC<Props> = (props: Props) => {
    const { person, onItemClick } = props;
    const { picture, name } = person;
    const { first: firstName, last: lastName } = name;

    const { themed } = useTheme();

    const onClick: React.MouseEventHandler = (event: React.MouseEvent) => {
        onItemClick(person);
        event.preventDefault();
    };

    return (
        <div className="person-item-container">
            <a
                href="/"
                onClick={onClick}
                className={themed('person-item-link')}
            >
                <img
                    src={picture.thumbnail}
                    alt={`${firstName} ${lastName} thumbnail`}
                />
                <span className={themed('person-name')}>
                    {firstName} {lastName}
                </span>
            </a>
        </div>
    );
};
