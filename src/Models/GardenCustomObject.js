export class Garden {
    constructor(username, gold = 800, plants = [], lastWatered = Date.now()) {
        this.username = username;
        this.gold = gold;
        this.plants = plants;
        this.lastWatered = lastWatered
    }
}

export const gardenConverter = {
    toFirestore: (garden) => {
        return {
            username: garden.username,
            gold: garden.gold,
            plants: garden.plants,
            lastWatered: garden.lastWatered,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Garden(data.username, data.gold, data.plants, data.lastWatered);
    }
};