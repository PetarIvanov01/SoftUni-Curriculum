function takeInformation() {

    let url = 'http://localhost:3030/jsonstore/collections/students'
    let form = document.getElementById('form');
    document.getElementById('submit').addEventListener('click', submit);

    async function submit(event) {

        event.preventDefault();
        let inputFields = new FormData(form);

        let students = {
            firstName: inputFields.get('firstName'),
            lastName: inputFields.get('lastName'),
            facultyNumber: inputFields.get('facultyNumber'),
            grade: inputFields.get('grade'),
        };

        if (students.firstName == '' || students.lastName == '' || students.facultyNumber == '' || students.grade.length == 0 || isNaN(students.grade)) {
            throw new Error('All fields must be filled.')
        }

        await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(students)
        })
        document.querySelectorAll('[type=text]').forEach(e => e.value = "");
        
    }
    
    getStudents()

    async function getStudents() {

        let thead = document.querySelector('#results tbody');
        let response = await fetch(url);
        let data = await response.json();

        let arrData = Object.values(data);

        for (let i = 0; i < arrData.length; i++) {

            let el = arrData[i];
            let fisrtName = el.firstName
            let lastName = el.lastName
            let facultyNumber = el.facultyNumber
            let grade = el.grade

            let tr = document.createElement('tr')

            let tdFirst = document.createElement('td')
            tdFirst.textContent = fisrtName
            let tdLast = document.createElement('td')
            tdLast.textContent = lastName
            let tdNum = document.createElement('td')
            tdNum.textContent = facultyNumber
            let tdGrade = document.createElement('td')
            tdGrade.textContent = grade

            tr.appendChild(tdFirst)
            tr.appendChild(tdLast)
            tr.appendChild(tdNum)
            tr.appendChild(tdGrade)

            thead.appendChild(tr);
        }

    }

}
takeInformation();

