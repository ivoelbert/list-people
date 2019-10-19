import { useEffect, useState, useCallback } from 'react';
import { Person, APIResult } from '../models/people';
import axios from 'axios';

const ENDPOINT: string =
    'https://randomuser.me/api/?seed=peoplefinder&results=100';

interface PeopleFetch {
    people: Person[],
    fetching: boolean,
    error: string | null,
}

const comparePeople = (p1: Person, p2: Person): number => {
    const p1FullName = `${p1.name.first} ${p1.name.last}`;
    const p2FullName = `${p2.name.first} ${p2.name.last}`;

    return p1FullName.localeCompare(p2FullName);
}

export const usePeople = (): PeopleFetch => {
    const [people, setPeople] = useState<Person[]>([]);
    const [fetching, setFetching] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const _fetchData = async (): Promise<void> => {
        try {
            const { data } = await axios.get<APIResult>(ENDPOINT);

            setFetching(false);
            setPeople(data.results.sort(comparePeople));
        } catch (err) {
            setFetching(false);
            setError(`Network Error`);
        }
    };

    const fetchData = useCallback(_fetchData, [ENDPOINT]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {people, fetching, error};
};
