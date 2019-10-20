import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Person, comparePeople, removeDuplicatedPeople } from '../models/people';
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

    const debouncedTerm: string = useDebounce<string>(term, 150);

    useEffect(() => {
        setFuse(new Fuse<Person>(people, options));
    }, [people]);

    useEffect(() => {
        const termsToSearch = debouncedTerm
            .split(/\s/)
            .filter((term: string) => term.length > 0);

        if (termsToSearch.length === 0) {
            setResult(people);
            return;
        }

        const mergedSearches: Person[] = termsToSearch
            .map((t: string) => fuse.search(t))
            .flat()
            .sort(comparePeople);

        const normalizedResults = removeDuplicatedPeople(mergedSearches);

        setResult(normalizedResults);
    }, [people, fuse, debouncedTerm]);

    return result;
};
