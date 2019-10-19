import React from 'react';
import { Person } from '../../models/people';

import './PersonHeader.scss';

interface ButtonProps {
    onClick: () => void;
}

const BackButton: React.FC<ButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="back-button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
            >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
        </button>
    );
};

interface HeaderProps {
    person: Person;
    closeModal: () => void;
}

export const PersonHeader: React.FC<HeaderProps> = props => {
    const { person, closeModal } = props;

    return (
        <div className="person-header-container">
            <BackButton onClick={closeModal} />
            <div className="header-image-background-container">
                <img
                    className="header-image-background"
                    alt="Header background"
                    src={person.picture.large}
                />
            </div>

            <div className="basic-description-container">
                <div className="header-image-container">
                    <img
                        className="header-image"
                        alt="Header"
                        src={person.picture.large}
                    />
                </div>
                <h1>
                    {person.name.first} {person.name.last}
                </h1>
                <p>@{person.login.username}</p>
            </div>
        </div>
    );
};
