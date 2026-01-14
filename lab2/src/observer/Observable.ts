import { Observer } from "./Observer.js";

export class Observable<T> {
    private observers: Set<Observer<T>> = new Set();

    public addObserver(observer: Observer<T>): void {
        this.observers.add(observer);
    }

    public removeObserver(observer: Observer<T>): void {
        this.observers.delete(observer);
    }

    protected notifyObservers(subject: T): void {
        for (const observer of this.observers) {
            observer.update(subject);
        }
    }
}
