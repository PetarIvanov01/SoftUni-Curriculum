function solve() {

    const mainField = document.querySelector('.info');
    const depBtn = document.getElementById('depart');
    const arvBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot',
    }

    async function depart() {

        arvBtn.disabled = false;

        const ulr = ` http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        const promise = await fetch(ulr);
        
        if (promise.status !== 200) {
            mainField.textContent = 'Error';
            arvBtn.disabled = true;
            depBtn.disabled = true;
        }

        stop = await promise.json();

        mainField.textContent = `Next stop ${stop.name}`;
        depBtn.disabled = true;

    }

    function arrive() {

        depBtn.disabled = false;
        mainField.textContent = `Arriving at ${stop.name}`;
        arvBtn.disabled = true;
        
    }

    return {
        depart,
        arrive
    };
}

let result = solve();