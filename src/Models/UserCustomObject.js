export class User {
    constructor(username, hash) {
        this.username = username;
        this.hash = hash;
    }
}

export const userConverter = {
    toFirestore: (user) => {
        return {
            username: user.username,
            hash: user.hash
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.username, data.hash);
    }
};