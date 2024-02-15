export {}

interface Vehicle {
    name: string;
    color: string;
}

interface Movable {
    start();
    stop();
}

interface Flyable {
    fly();
}

class Airplane implements Vehicle, Movable, Flyable {
    constructor(
        public name: string, 
        public color: string
    ) {

    }
    start() {
        console.log("start!");
    }
    stop() {
        console.log("stop!");
    }
    fly() {
        console.log("fly!");
    }
}

class Car implements Vehicle, Movable {
    constructor(
        public name: string,
        public color: string
    ) {}

    start() {
        console.log("start!");
    }
    stop() {
        console.log("stop!");
    }
}

function run() {
    const v1 = new Airplane("AirBus", "white");
    const v2 = new Car("Prius", "black");

    v1.fly();
    v2.start();
}

run();