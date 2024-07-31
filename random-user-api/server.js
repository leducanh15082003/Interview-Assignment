const express = require('express');
const { faker } = require('@faker-js/faker');
const cors = require('cors');

const app = express();
app.use(cors());

const generateUser = () => ({
    gender: faker.person.gender(),
    name: {
        title: faker.person.prefix(),
        first: faker.person.firstName(),
        last: faker.person.lastName(),
    },
    location: {
        street: {
            number: faker.location.buildingNumber(),
            name: faker.location.street(),
        },
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        postcode: faker.location.zipCode(),
        coordinates: {
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
        },
        timezone: {
            offset: faker.date.recent().toISOString(),
            description: faker.lorem.sentence(),
        },
    },
    email: faker.internet.email(),
    login: {
        uuid: faker.string.uuid(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        salt: faker.string.alphanumeric(8),
        md5: faker.string.alphanumeric(32),
        sha1: faker.string.alphanumeric(40),
        sha256: faker.string.alphanumeric(64),
    },
    dob: {
        date: faker.date.past({ years: 50 }).toISOString(),
        age: faker.number.int({ min: 18, max: 80 }),
    },
    registered: {
        date: faker.date.past({ years: 10 }).toISOString(),
        age: faker.number.int({ min: 1, max: 10 }),
    },
    phone: faker.phone.number(),
    cell: faker.phone.number(),
    id: {
        name: faker.string.alpha({ length: 3 }),
        value: faker.string.alpha({ length: 10 }),
    },
    picture: {
        large: faker.image.avatar(),
        medium: faker.image.avatar(),
        thumbnail: faker.image.avatar(),
    },
    nat: faker.location.countryCode(),
});

const generateUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(generateUser());
    }
    return users;
};

const users = generateUsers(100);

app.get('/api/users', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = users.slice(startIndex, endIndex);

    res.json({
        results,
        info: {
            page,
            totalPages: Math.ceil(users.length / limit),
            results: users.length,
        },
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
