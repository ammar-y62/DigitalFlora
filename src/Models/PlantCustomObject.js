export class Plant {
    types = ["Blue Iris", "Shishito Pepper", "Pink Foxglove", "Himalayan Blue Poppy", "Pink Lotus", "Yellow Moss Sorrel", "Wild Arum", "Tiger Lily"];
    rewards = [100, 200, 300, 400, 500];

    // This constructor uses default values so that we can specify either only username (for a new Plant)
    // or we can specify all options when creating a Plant instance from the firebase DB
    constructor(id, condition = "Alive and Healthy", stage = 1,
                type = 'null', expiration = Date.now(),
                age = Date.now(), reward = 0) {

        this.id = id;
        this.condition = condition;
        this.stage = stage;
        if(type === 'null'){
            this.type = this.types[Math.floor(Math.random() * this.types.length)]
        }else{
            this.type = type;
        }if(reward === 0){
            this.reward = this.rewards[Math.floor(Math.random() * this.rewards.length)]
        }else{
            this.reward = reward;
        }this.expiration = expiration;
        this.age = age;

        this.lifeCheck()
    }

    lifeCheck(){
        const currentDate = Date.now();
        const diffExp = Math.abs(currentDate - this.expiration);
        const expDays = Math.ceil(diffExp / (1000 * 60 * 60 * 24));
        const diffAge = Math.abs(currentDate - this.age);
        const ageDays = Math.ceil(diffAge / (1000 * 60 * 60 * 24));

        if (expDays < 3){
            if(ageDays > 1 && ageDays < 2) {
                this.stage = 1;
                return true
            } else if(ageDays >= 2 && ageDays < 3){
                this.stage = 2;
                return true;
            }else if(ageDays >= 3 && ageDays < 4){
                this.stage = 3;
                return true;
            }else if(ageDays >= 4 && ageDays < 6){
                this.stage = 4;
                return true;
            }else if(ageDays >= 6 && ageDays < 8){
                this.stage = 5;
                return true;
            }else if(ageDays >= 8 && ageDays < 11){
                this.stage = 6;
                return true;
            }else if(ageDays >= 11 && ageDays < 12){
                this.stage = 7;
                return true;
            }
            else {
                this.stage = 0;
                this.age = Date.now()
                return true;
            }
        }
        else {
            this.condition = "Dead";
            return false;
        }
    }

    water(){
        if (this.lifeCheck()){
            this.expiration = Date.now();
            return this.reward;
        }

        else {
            return 0;
        }
    }
}

export const plantConverter = {
    toFirestore: (plant) => {
        return {
            id: plant.id,
            condition: plant.condition,
            stage: plant.stage,
            type: plant.type,
            expiration: plant.expiration,
            age: plant.age,
            reward: plant.reward
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Plant(data.id, data.condition, data.stage, data.type, data.expiration, data.age, data.reward);
    }
};
