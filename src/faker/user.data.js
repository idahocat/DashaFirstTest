import { faker } from '@faker-js/faker';

export const userCreation = (userName, userEmail, userPassword) => {
    return {
        userName: faker.person.firstName('female'),
        userEmail: faker.internet.email(),
        userPassword: faker.internet.password(),
    }
}