function solve(param1, param2) {

    let data = JSON.parse(param1);
    let [key, value] = param2.split('-');
    let counter = 0
    
    data.forEach(obj => filtered.call(obj));



    function filtered() {

        if (this[key] === value || key === 'all') {

            return console.log(`${counter++}. ${this.first_name} ${this.last_name} - ${this.email}`);

        }

    }

}
solve(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
    }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
    },
    {
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
    }]`,
    'gender-Female')