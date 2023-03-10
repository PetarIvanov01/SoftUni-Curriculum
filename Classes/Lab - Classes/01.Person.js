class Person {
    constructor(firstName, lastName, age, email) {
        this.firstName = firstName,
            this.lastName = lastName,
            this.age = age,
            this.email = email
    }
    toString() {
        return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`
    }
}
let person = new Person('Anna', 'Simpson', 22, 'anna@yahoo.com');
console.log(person.toString());

// This is a example of the problem solved with function
// function Person(firstName, lastName, age, email) {

//     this.firstName = firstName,
//         this.lastName = lastName,
//         this.age = age,
//         this.email = email

//     Person.prototype.toString = function () {
//         return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`;
//     };
// }
