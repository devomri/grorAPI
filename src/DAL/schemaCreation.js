import * as q from 'q';
import { User, userSchema } from '../model/user';
import { Organization, organizationSchema } from '../model/organization';
import { Restaurant, restaurantSchema } from '../model/restaurant';
import { Feedback, feedbackSchema } from '../model/feedback';
import { Menu, menuSchema } from '../model/menu'
import { Purchase, purchaseSchema } from '../model/purchase';

export const generateGrorSchema = () => {
    createIndices();

    return fillSchemaData();
};

const createIndices = () => {
    userSchema.index({"id": 1}, { unique: true });
    userSchema.index({"email": 1}, { unique: true });

    organizationSchema.index({"id": 1}, { unique: true });

    restaurantSchema.index({"id": 1}, { unique: true });
    restaurantSchema.index({ "name": 1});

    feedbackSchema.index({"id": 1}, { unique: true });
    feedbackSchema.index({"userId": 1});
    feedbackSchema.index({"text": "text"});

    menuSchema.index({"restaurant_id": 1});

    purchaseSchema.index({"id": 1}, { unique: true });
};

const fillSchemaData = () => {
    return insertOrganizations()
        .then(() => { return insertUsers()})
        .then(() => { return insertRestaurants() })
        .then(() => { return insertMenus() })
        .then(() => { return insertFeedbacks() });
};

const insertOrganizations = () => {
    const idfOrganization =
        new Organization({
            id: "26d5eac7-a91c-4fae-a254-3bcd4195d854",
            name: "IDF",
            location: "Tel-Aviv",
            description: "The most important organization is Israel",
            contacts: [
                {
                    firstName: "Gadi",
                    lastName: "Eizenkot",
                    jobTitle: "Chief of General Staff",
                    phoneNumber: "050-5412484"
                },
                {
                    firstName: "Avigdor",
                    lastName: "Lieberman",
                    jobTitle: " Defense Minister",
                    phoneNumber: "050-6522484"
                }
            ]
        }).save();

    const googleOrganization =
        new Organization({
            id: "2636c284-2c02-44e4-af1c-b4133b1a7dfe",
            name: "Google",
            location: "Tel-Aviv",
            description: "Small company in Tel-Aviv,",
            contacts: [
                {
                    firstName: "Larry",
                    lastName: "Page",
                    jobTitle: "founder",
                    phoneNumber: "052-5412484"
                }
            ]
        }).save();

    return q.all([googleOrganization, idfOrganization]);
};

const insertUsers = () => {
    return new User({
            id: "e1436d32-d8b6-44ff-99b2-c617bc2da183",
            email: "hazan@burgas.com",
            password: "$2a$10$LQgL1Es4SzPx4VeAl1a65eEs5pDnfPn6xgyApBY.Xdujbc7ULo0x2",
            firstName: "Oren",
            lastName: "Hazan",
            organizationId: "2636c284-2c02-44e4-af1c-b4133b1a7dfe",
            phoneNumber: "050-5555555"
        }).save();
};

const insertRestaurants = () => {
    const shawarmaHertzel =
        new Restaurant({
            id: "0a87d86a-ec20-4a1c-b676-c08b5b17e90d",
            name: "Shawarma Hertzel",
            phoneNumber: "03-9885412",
            location: "Tel-Aviv",
            minimumOrderPrice: 100,
            minimumSalePrice: 1000,
            manager: {
                firstName: "Hertzel",
                lastName: "Levi",
                phoneNumber: "054-8554112"
            }
        }).save();

    const river =
        new Restaurant({
            id: "44085169-b327-4314-b08d-4600d4077f25",
            name: "River",
            phoneNumber: "03-9854712",
            location: "Tel-Aviv",
            minimumOrderPrice: 50,
            minimumSalePrice: 100,
            manager: {
                firstName: "Moshe",
                lastName: "Cohen",
                phoneNumber: "054-8554112"
            }
        }).save();

    return q.all([shawarmaHertzel, river]);
};

const insertMenus = () => {
    const riverMenu =
        new Menu({
            restaurantId: "44085169-b327-4314-b08d-4600d4077f25", // River
            items: [
                {
                    id: "44f6df0a-87ac-4c2a-b14c-2beb77ae6c60",
                    name: "Esh Velehava - Noodles",
                    description: "spicy noodles",
                    price: 60
                },
                {
                    id: "dbc4c586-a2f9-4e66-ad8e-d25ce20166be",
                    name: "Sashimi",
                    description: "Tuna shushi",
                    price: 80
                },
                {
                    id: "a23c440e-5f2a-4bc0-a781-f4255248f55b",
                    name: "Pad-Tahi",
                    description: "Rice with an egg",
                    price: 30
                }
            ]
        }).save();

    const hertzelMenu =
        new Menu({
            restaurantId: "0a87d86a-ec20-4a1c-b676-c08b5b17e90d", // Shawarma hertzel
            items: [
                {
                    id: "421f3f86-fadd-4440-af81-cab3714d7a13",
                    name: "Shawarma in pita",
                    description: "pita cabab",
                    price: 32
                },
                {
                    id: "598fd981-1388-46a2-ba52-4c47194d5fe9",
                    name: "Shawarma in lafa",
                    description: "lafa cabab",
                    price: 38
                },
                {
                    id: "8cb38ed6-7a14-416a-bfa4-e87c7a5a6c25",
                    name: "Shawarma in a plate",
                    description: "plate cabab",
                    price: 38
                }
            ]
        }).save();

    return q.all([hertzelMenu, riverMenu]);
};

const insertFeedbacks = () => {
    const goodFeedback =
        new Feedback({
            id: "5c1901d8-699f-48c0-9676-c74c33312430",
            restaurantId: "0a87d86a-ec20-4a1c-b676-c08b5b17e90d",
            userId: "e1436d32-d8b6-44ff-99b2-c617bc2da183",
            feedbackDate: new Date(),
            text: "The best Shawarma in town",
            rank: 10
        }).save();

    const badFeedback =
        new Feedback({
            id: "b4be92d3-720f-415a-b2f8-b69979342e6f",
            restaurantId: "0a87d86a-ec20-4a1c-b676-c08b5b17e90d",
            userId: "e1436d32-d8b6-44ff-99b2-c617bc2da183",
            feedbackDate: new Date(),
            text: "Expensive as Manhattan, tastes like Gaza",
            rank: 1
        }).save();

    return q.all([goodFeedback, badFeedback]);
};

