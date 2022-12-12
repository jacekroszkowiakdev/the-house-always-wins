type Fruit = {
    name: string;
    reward: number;
};

const fruits: Fruit[] = [
    {
        name: "cherry",
        reward: 10,
    },
    {
        name: "lemon",
        reward: 20,
    },
    {
        name: "orange",
        reward: 30,
    },
    {
        name: "watermelon",
        reward: 40,
    },
];

let pickOneFruit = (arr: Fruit[]) => {
    let randomFruit = arr[Math.floor(Math.random() * arr.length)];
    return randomFruit;
};

let getThreeFruits = (fn: () => Fruit): Fruit[] => {
    let returnValues: Fruit[] = [];
    for (let i = 0; i < 3; i++) {
        returnValues.push(fn());
    }
    return returnValues;
};

export default () =>
    getThreeFruits(() => {
        return pickOneFruit(fruits);
    });
