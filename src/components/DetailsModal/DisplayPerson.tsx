import React from 'react';
import { Person } from '../../models/people';
import { useTheme } from '../../hooks/useTheme';
import { PersonHeader } from './PersonHeader';

import './DisplayPerson.scss';

const LocationIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" />
    </svg>
);

const EmailIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

const PhoneIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
    </svg>
);

interface InfoProps {
    person: Person;
}
const PersonInfo: React.FC<InfoProps> = props => {
    const { themed } = useTheme();

    const { person } = props;
    const { location, email, cell } = person;
    const { city, state, country } = location;

    return (
        <div className={themed('person-info-container')}>
            <div className="info-piece">
                <div className="icon-and-heading">
                    <LocationIcon />
                    <h3>Location</h3>
                </div>
                <p>
                    {city}, {state}, {country}
                </p>
            </div>

            <div className="info-piece">
                <a href={`mailto: ${email}`}>
                    <div className="icon-and-heading">
                        <EmailIcon />
                        <h3>Email Address</h3>
                    </div>
                    <p>{email}</p>
                </a>
            </div>

            <div className="info-piece">
                <a href={`tel:${cell}`}>
                    <div className="icon-and-heading">
                        <PhoneIcon />
                        <h3>Phone Number</h3>
                    </div>
                    <p>{cell}</p>
                </a>
            </div>
        </div>
    );
};

interface Props {
    person: Person;
    closeModal: () => void;
}

export const DisplayPerson: React.FC<Props> = props => {
    const { person, closeModal } = props;

    return (
        <div>
            <PersonHeader person={person} closeModal={closeModal} />
            <PersonInfo person={person} />
        </div>
    );
};
