export default class Queue {

    elements = [];

    constructor() {
    }

    enqueue(call) {
        this.elements.push(call);
    }

    dequeue(call) {
        if (this.elements.length <= 0)
        {
            return null;
        }
        return this.elements.shift()
    }

    isEmpty() {
        return this.elements.length == 0;
    }

    peek() {
        return !this.elements.isEmpty() ? this.elements[0] : false;
    }

    length() {
        return this.elements.length;
    }
}