import { Observable } from "../observer/Observable.js";

export abstract class Shape extends Observable<Shape> {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) {
        super();
    }

    protected notifyChange(): void {
        this.notifyObservers(this);
    }
}
