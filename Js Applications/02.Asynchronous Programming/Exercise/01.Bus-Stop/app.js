function getInfo() {

    const stopId = document.getElementById("stopId").value;
    const stopNameEl = document.getElementById("stopName");
    const busesEl = document.getElementById("buses");

    // Clear previous result
    stopNameEl.textContent = "";
    busesEl.innerHTML = "";

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
        .then(response => response.json())
        .then(data => {
            stopNameEl.textContent = data.name;
            Object.entries(data.buses).forEach(([busId, time]) => {
                const li = document.createElement("li");
                li.textContent = `Bus ${busId} arrives in ${time} minutes`;
                busesEl.appendChild(li);
            });
        })
        .catch(error => {
            console.error(error);
            stopNameEl.textContent = "Error";
        });

}