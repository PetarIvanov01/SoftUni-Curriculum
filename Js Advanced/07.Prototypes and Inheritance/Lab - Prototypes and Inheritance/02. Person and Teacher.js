function personAndTeacher() {

    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email
        }

    }
    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email)
            this.subject = subject
        }

    }
    const person1 = new Person('ivan', 'ivan@gamil.com');
    const teacher = new Teacher('mitka', 'mitka@dam.com', 'math')

    return {
        Person,
        Teacher
    }
}
const result = personAndTeacher()
// console.log(result);