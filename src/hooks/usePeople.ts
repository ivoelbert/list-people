import { useEffect, useState, useCallback } from 'react';
import { Person, APIResult, comparePeople } from '../models/people';
import axios from 'axios';

const ENDPOINT: string =
    'https://randomuser.me/api/?seed=peoplefinder&results=100';

interface PeopleFetch {
    people: Person[];
    fetching: boolean;
    error: string | null;
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

    return { people, fetching, error };
};
