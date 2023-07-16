export interface User {
    login: {
        uuid: string;
    }
    id: {
        name: string;
        value: string;
    }
    gender: string;
    name: {
        first: string;
        last: string;
    }
    email: string;
    picture: {
        thumbnail: string;
    }
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: string;
    };
    phone: string;
    cell: string;
}