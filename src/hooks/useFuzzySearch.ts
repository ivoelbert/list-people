import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Person } from '../models/people';
import { useDebounce } from './useDebounce';

const options = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 48,
    minMatchCharLength: 1,
    keys: ['name.first', 'name.last'],
};

export const useFuzzySearch = (people: Person[], term: string): Person[] => {
    const [fuse, setFuse] = useState<Fuse<Person>>(
        () => new Fuse<Person>(people, options)
    );
    const [result, setResult] = useState<Person[]>(people);

    const debouncedTerm: string = useDebounce<string>(term, 200);

    useEffect(() => {
        console.log('OH NO!');
        setFuse(new Fuse<Person>(people, options));
    }, [people]);

    useEffect(() => {
        setResult(debouncedTerm.length > 0 ? fuse.search(debouncedTerm) : people);
    }, [people, fuse, debouncedTerm]);

    return result;
};
