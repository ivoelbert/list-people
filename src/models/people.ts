export interface Person {
    gender: string;
    name: { title: string; first: string; last: string };
    location: {
        street: { number: number; name: string };
        city: string;
        state: string;
        country: string;
        postcode: number;
        coordinates: { latitude: string; longitude: string };
        timezone: {
            offset: string;
            description: string;
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: { date: string; age: number };
    registered: { date: string; age: number };
    phone: string;
    cell: string;
    id: { name: string; value: string };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}

export interface APIResult {
    results: Person[];
}

export const comparePeople = (p1: Person, p2: Person): number => {
    const p1FullName = `${p1.name.first} ${p1.name.last}`;
    const p2FullName = `${p2.name.first} ${p2.name.last}`;

    return p1FullName.localeCompare(p2FullName);
};

/*
 *   Assumes the array is sorted by the 'comparePeople' function, just to be quicker.
 *   We'll remove people with the same full name.
 */
export const removeDuplicatedPeople = (people: Person[]): Person[] => {
    return people.filter((person: Person, idx: number): boolean => {
        // The first one can't be duplicated!
        if (idx === 0) {
            return true;
        }

        const p1FullName = `${person.name.first} ${person.name.last}`;
        const p2FullName = `${people[idx - 1].name.first} ${people[idx - 1].name.last}`;

        return p1FullName !== p2FullName;
    });
};
