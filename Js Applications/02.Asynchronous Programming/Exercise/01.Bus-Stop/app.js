function getInfo() {
    const btn = document.getElementById('submit');
    const field = document.getElementById('stopId').value

    const url = `http://localhost:3030/jsonstore/bus/businfo/${field}`;
    const parrent = document.getElementById('stopName');
    const busesStops = document.getElementById('buses');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error')
            }
            return response.json();
        })
        .then(value => {
            appendElements(value);
        })
        .catch(error => {
            catchErrors(error);
        })

    function appendElements(value) {

        busesStops.innerHTML = ''
        let stName = value.name;
        let busTime = value.buses;

        parrent.textContent = stName;

        for (const key in busTime) {
            let li = document.createElement('li');
            li.textContent = `Bus ${key} arrives in ${busTime[key]} minute`;
            busesStops.appendChild(li)
        }
    }

    function catchErrors(error) {
        parrent.textContent = 'Error';
        busesStops.innerHTML = ''
    }
}