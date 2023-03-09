class List {
    constructor() {
        this.elements = [];
        this.size = this.elements.length;
    }

    add(element) {
        this.elements.push(element);
        this.elements.sort((a, b) => a - b);
        this.size++
        return this;
    }

    remove(index) {
        if (index >= 0 && index < this.elements.length) {
            this.size--
            return this.elements.splice(index, 1);
        }
    }

    get(index) {
        if (index >= 0 && index < this.elements.length) {
            return this.elements[index];
        }
    }

}
let list = new List();
list.add(5);
console.log(list.get(0));
list.add(3);
console.log(list.get(0));
list.remove(0);
console.log(list.get(0));
console.log(list.size);

